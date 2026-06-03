import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { PortfolioItem, SiteConfig, PageContent, Category } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const PORTFOLIO_DIR = path.join(CONTENT_DIR, 'portfolio')

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown)
  return result.toString()
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(CONTENT_DIR, 'site.json')
  if (!fs.existsSync(filePath)) {
    return {
      siteName: '作品集',
      siteDescription: '广告导演作品集',
      siteUrl: 'https://example.com',
      directorName: '导演姓名',
      directorTitle: '广告导演',
      email: '',
    }
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as SiteConfig
}

export function getAllProjectSlugs(): string[] {
  ensureDir(PORTFOLIO_DIR)
  return fs
    .readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

export async function getAllProjects(): Promise<PortfolioItem[]> {
  const slugs = getAllProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))
  return projects.sort((a, b) => a.order - b.order)
}

export async function getProjectsByCategory(category: Category): Promise<PortfolioItem[]> {
  const all = await getAllProjects()
  return all.filter((p) => p.category === category)
}

export async function getFeaturedProjects(): Promise<PortfolioItem[]> {
  const all = await getAllProjects()
  return all.filter((p) => p.featured).sort((a, b) => a.order - b.order)
}

export async function getProjectBySlug(slug: string): Promise<PortfolioItem> {
  const filePath = path.join(PORTFOLIO_DIR, slug, 'index.md')
  if (!fs.existsSync(filePath)) {
    throw new Error(`Project not found: ${slug}`)
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const contentHtml = await markdownToHtml(content)

  return {
    slug,
    title: data.title || '',
    subtitle: data.subtitle || '',
    category: data.category || 'ad',
    role: data.role || '',
    client: data.client || '',
    year: data.year || new Date().getFullYear(),
    order: data.order || 99,
    coverPosition: data.coverPosition || 'center',
    coverScale: data.coverScale || 1,
    coverAlign: data.coverAlign || '',
    xinpianchangUrl: data.xinpianchangUrl || data.xinpianchang || null,
    multiVideo: data.multiVideo || [],
    externalUrl: data.externalUrl || null,
    externalLabel: data.externalLabel || null,
    coverImage: data.coverImage || 'cover.jpg',
    thumbnail: data.thumbnail || 'thumbnail.jpg',
    thumbnailPosition: data.thumbnailPosition || 'center',
    thumbnailScale: data.thumbnailScale || 1,
    contentWide: data.contentWide || false,
    customLayout: data.customLayout || '',
    tags: data.tags || [],
    featured: data.featured || false,
    brandLogo: data.brandLogo || null,
    stills: (data.stills || []).map((s: string | { file: string; ratio?: string }) =>
      typeof s === 'string' ? { file: s } : s
    ),
    stillRatio: data.stillRatio || '4/3',
    contentHtml,
    imageBase: `/content/portfolio/${slug}/`,
    videoLinks: data.videoLinks || [],
  }
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: PortfolioItem | null; next: PortfolioItem | null }> {
  const all = await getAllProjects()
  const index = all.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  }
}

export async function getPageContent(filename: string): Promise<PageContent> {
  const filePath = path.join(CONTENT_DIR, filename)
  if (!fs.existsSync(filePath)) {
    return { title: '', contentHtml: '' }
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const contentHtml = await markdownToHtml(content)
  return {
    title: data.title || '',
    contentHtml,
  }
}
