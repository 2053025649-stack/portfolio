'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LightboxProps {
  images: string[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = currentIndex !== null

  const goTo = useCallback(
    (dir: number) => {
      if (currentIndex === null) return
      const next = currentIndex + dir
      if (next >= 0 && next < images.length) onNavigate(next)
    },
    [currentIndex, images.length, onNavigate]
  )

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goTo])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase z-10 px-3 py-2"
          >
            关闭
          </button>

          {/* Counter */}
          <span className="absolute top-4 left-4 md:top-6 md:left-6 text-white/40 text-sm tracking-wider z-10">
            {currentIndex! + 1} / {images.length}
          </span>

          {/* Image */}
          <motion.img
            key={currentIndex}
            src={images[currentIndex!]}
            alt={`静帧 ${currentIndex! + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation arrows */}
          {currentIndex! > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(-1) }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-4xl md:text-5xl font-light p-2"
              aria-label="上一张"
            >
              ←
            </button>
          )}
          {currentIndex! < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(1) }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-4xl md:text-5xl font-light p-2"
              aria-label="下一张"
            >
              →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
