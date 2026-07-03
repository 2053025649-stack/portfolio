'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'

interface ProjectNavProps {
  prev: PortfolioItem | null
  next: PortfolioItem | null
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null

  return (
    <nav className="border-t border-white/[0.06] py-10 md:py-14">
      <div className="grid grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/portfolio/${prev.slug}`}>
            <motion.div
              className="group"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs tracking-[0.15em] uppercase text-surface-muted/70">← 上一个</span>
              <p className="mt-2 text-sm md:text-base text-surface group-hover:text-surface-light transition-colors duration-300">
                {prev.title}
              </p>
            </motion.div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/portfolio/${next.slug}`} className="text-right">
            <motion.div
              className="group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs tracking-[0.15em] uppercase text-surface-muted/70">下一个 →</span>
              <p className="mt-2 text-sm md:text-base text-surface group-hover:text-surface-light transition-colors duration-300">
                {next.title}
              </p>
            </motion.div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
