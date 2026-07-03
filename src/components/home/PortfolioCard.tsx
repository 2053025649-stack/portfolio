import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'
import { CATEGORY_SHORT } from '@/lib/constants'

interface PortfolioCardProps {
  project: PortfolioItem
  index: number
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 6) * 0.06 + Math.floor(index / 6) * 0.02,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/portfolio/${project.slug}`}>
        <motion.div
          className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-dark-700 cursor-pointer"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={`${project.imageBase}${project.thumbnail}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              objectPosition: project.thumbnailPosition,
              transform: `scale(${project.thumbnailScale})`,
            }}
            loading={index < 6 ? 'eager' : 'lazy'}
          />

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
              {CATEGORY_SHORT[project.category]}
            </span>
            <h3 className="text-lg md:text-xl font-display text-white leading-snug">
              {project.title}
            </h3>
            <p className="text-xs text-surface-muted mt-1 tracking-wide">
              {project.client} &middot; {project.year}
            </p>
          </div>

          {/* Featured badge — shown on hover when project is featured */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent">精选</span>
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  )
}
