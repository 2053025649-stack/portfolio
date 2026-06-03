import { PortfolioItem } from '@/lib/types'
import PortfolioCard from './PortfolioCard'

interface PortfolioGridProps { projects: PortfolioItem[] }

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return <div className="text-center py-20"><p className="text-gray-500 text-lg tracking-wide">暂无作品</p></div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
      {projects.map((project, i) => <PortfolioCard key={project.slug} project={project} index={i} />)}
    </div>
  )
}
