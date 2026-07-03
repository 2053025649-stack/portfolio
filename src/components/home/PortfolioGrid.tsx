import { PortfolioItem } from '@/lib/types'
import PortfolioCard from './PortfolioCard'

interface PortfolioGridProps { projects: PortfolioItem[] }

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-surface-faint text-lg tracking-wide">暂无作品</p>
        <p className="text-surface-faint/60 text-sm mt-2 tracking-wide">作品正在更新中，敬请期待</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
      {projects.map((project, i) => (
        <PortfolioCard
          key={project.slug}
          project={project}
          index={i}
        />
      ))}
    </div>
  )
}
