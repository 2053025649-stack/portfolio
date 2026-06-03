export type Category = 'ad' | 'live' | 'tutorial' | 'story' | 'inhouse' | 'other'

export interface PortfolioItem {
  slug: string
  title: string
  subtitle: string
  category: Category
  role: string
  client: string
  year: number
  order: number

  coverPosition: string
  coverScale: number
  coverAlign: string
  xinpianchangUrl: string | null
  multiVideo: { label: string; url: string }[]
  externalUrl: string | null
  externalLabel: string | null
  coverImage: string
  thumbnail: string
  thumbnailPosition: string
  thumbnailScale: number
  contentWide: boolean
  customLayout: string

  tags: string[]
  featured: boolean
  brandLogo: string | null
  stills: { file: string; ratio?: string }[]
  stillRatio: string

  contentHtml: string
  imageBase: string
  videoLinks: VideoLinkGroup[]
}

export interface VideoLink {
  label: string
  url: string
  image: string
}

export interface VideoLinkGroup {
  category: string
  items: VideoLink[]
}

export interface SiteConfig {
  siteName: string
  siteDescription: string
  siteUrl: string
  directorName: string
  directorTitle: string
  email: string
  heroImage?: string
  wechat?: string
  instagram?: string
  bilibili?: string
}

export interface PageContent {
  title: string
  contentHtml: string
}
