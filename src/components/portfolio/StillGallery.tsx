'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'
import Lightbox from '@/components/ui/Lightbox'

interface StillGalleryProps {
  project: PortfolioItem
}

export default function StillGallery({ project }: StillGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (project.stills.length === 0) return null

  return (
    <>
      <section className="py-10 md:py-14 border-t border-white/[0.06]">
        <p className="text-accent text-xs tracking-[0.2em] uppercase mb-6">Stills</p>
        <h3 className="text-xl md:text-2xl font-display text-sage-light mb-6 tracking-wide">作品静帧</h3>
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mr-4 snap-x snap-mandatory scrollbar-none">
          {project.stills.map((still, i) => (
            <motion.button
              key={still.file}
              className="flex-shrink-0 w-56 md:w-64 rounded-lg overflow-hidden bg-dark-700 snap-start cursor-pointer group relative"
              style={{ aspectRatio: still.ratio || project.stillRatio }}
              onClick={() => setLightboxIndex(i)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={`${project.imageBase}${still.file}`}
                alt={`静帧 ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs tracking-widest uppercase bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  放大查看
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <Lightbox
        images={project.stills.map((s) => `${project.imageBase}${s.file}`)}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
