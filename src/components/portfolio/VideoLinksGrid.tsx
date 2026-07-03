'use client'

import { motion } from 'framer-motion'
import { VideoLinkGroup } from '@/lib/types'

interface VideoLinksGridProps {
  groups: VideoLinkGroup[]
  imageBase: string
}

export default function VideoLinksGrid({ groups, imageBase }: VideoLinksGridProps) {
  if (groups.length === 0) return null

  return (
    <section className="py-10 md:py-14 border-t border-white/[0.06]">
      <h3 className="text-2xl md:text-3xl font-display text-surface-light mb-8 tracking-wide">作品列表</h3>

      {groups.map((group) => (
        <div key={group.category} className="mb-10">
          <h4 className="text-sm text-surface-muted tracking-wider mb-5 font-medium">
            {group.category}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {group.items.map((link, i) => (
              <motion.a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-700 cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={`${imageBase}${link.image}`}
                  alt={link.label}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 flex flex-col items-center gap-2">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                    <span className="text-white text-xs tracking-widest">点击观看</span>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-xs md:text-sm text-surface-light/90 tracking-wide">
                    {link.label}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
