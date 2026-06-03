'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PortfolioItem } from '@/lib/types'

const CATEGORY_LABEL: Record<string, string> = {
  ad: '广告作品',
  live: '直播作品',
  tutorial: 'Inhouse作品',
  story: 'Inhouse作品',
  inhouse: 'Inhouse作品',
}

interface ProjectHeroProps {
  project: PortfolioItem
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0.5])

  const alignLeft = project.coverAlign === 'left' || project.category === 'tutorial' || project.category === 'story'
  const coverSrc = `${project.imageBase}${project.coverImage}`
  const isVideo = project.coverImage.endsWith('.mp4')

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale, opacity }}
      >
        {isVideo ? (
          <video
            src={coverSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: project.coverPosition, transform: `scale(${project.coverScale})` }}
          />
        ) : (
          <img
            src={coverSrc}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: project.coverPosition, transform: `scale(${project.coverScale})` }}
          />
        )}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-800/30 to-dark-800" />

      {/* Content */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center pt-28 pb-12 md:pb-16">
        <div className={`max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full flex ${alignLeft ? 'justify-start' : 'justify-end'}`}>
          <div className={`${alignLeft ? 'text-left' : 'text-right'} ${project.contentWide ? 'max-w-4xl' : 'max-w-3xl'}`}>
            <motion.span
              className="inline-block text-accent text-xs tracking-[0.2em] uppercase mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {CATEGORY_LABEL[project.category]}
            </motion.span>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-display text-sage-light leading-none whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {project.title}
            </motion.h1>

            {project.role && (
              <motion.p
                className="mt-3 text-xs md:text-sm text-accent/80 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {project.role}
              </motion.p>
            )}
            <motion.p
              className="mt-1.5 text-xs md:text-sm text-sage-muted tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {project.client} · {project.year}
            </motion.p>

            {/* Description text */}
            {project.contentHtml && (
              <motion.div
                className="mt-8 md:mt-10 text-sm md:text-base text-sage-muted leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div
                  className="space-y-3 [&_h2]:text-base [&_h2]:md:text-lg [&_h2]:font-display [&_h2]:text-sage-light [&_h2]:mt-0 [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:md:text-base [&_h3]:text-sage-light/80 [&_h3]:mt-0 [&_h3]:mb-1 [&_p]:text-sage-muted [&_p]:leading-relaxed [&_p]:text-sm [&_p]:md:text-base "
                  dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
