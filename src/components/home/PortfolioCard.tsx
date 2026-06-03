import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'

const CATEGORY_LABEL: Record<string, string> = {
  ad: '广告', live: '直播', tutorial: 'Inhouse作品', story: 'Inhouse作品', inhouse: 'Inhouse作品',
}

interface PortfolioCardProps { project: PortfolioItem; index: number }

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/portfolio/${project.slug}`}>
        <motion.div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-dark-700 cursor-pointer" whileHover={{ scale: 1.02 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <img src={`${project.imageBase}${project.thumbnail}`} alt={project.title} className="w-full h-full object-cover transition-transform duration-700" style={{ objectPosition: project.thumbnailPosition, transform: `scale(${project.thumbnailScale})` }} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-accent mb-2">{CATEGORY_LABEL[project.category]}</span>
            <h3 className="text-lg md:text-xl font-display text-white leading-snug">{project.title}</h3>
            <p className="text-xs text-gray-400 mt-1 tracking-wide">{project.client} &middot; {project.year}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
