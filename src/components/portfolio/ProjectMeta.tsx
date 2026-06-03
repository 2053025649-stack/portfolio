import { PortfolioItem } from '@/lib/types'

const CATEGORY_LABEL: Record<string, string> = {
  ad: '广告',
  live: '直播',
  tutorial: 'Inhouse作品',
  story: 'Inhouse作品',
  inhouse: 'Inhouse作品',
}

interface ProjectMetaProps {
  project: PortfolioItem
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4 py-6 md:py-8 border-b border-white/[0.06]">
      <span className="px-3 py-1.5 text-xs tracking-wider rounded-full bg-white/[0.04] text-sage border border-white/[0.06]">
        {CATEGORY_LABEL[project.category]}
      </span>
      <span className="text-sm text-sage-muted tracking-wide">{project.client}</span>
      <span className="text-sm text-sage-muted/70">{project.year}</span>
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs text-sage-muted/70 tracking-wide px-2 py-1"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
