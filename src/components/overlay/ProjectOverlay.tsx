import { useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PortfolioItem } from '@/lib/types'
import { useBodyScrollLock, useEscapeKey } from '@/lib/hooks'

interface ProjectOverlayProps {
  project: PortfolioItem | null
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ProjectOverlay({ project, index, total, onClose, onPrev, onNext }: ProjectOverlayProps) {
  const isOpen = project !== null

  useBodyScrollLock(isOpen)

  const hk = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onPrev, onNext])

  useEscapeKey(onClose, isOpen)

  // Arrow key navigation
  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', hk)
    return () => window.removeEventListener('keydown', hk)
  }, [isOpen, hk])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
          <motion.div className="relative w-full max-w-4xl mx-6 p-8 md:p-12" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-0 right-0 text-surface-muted hover:text-surface-light text-sm tracking-wider transition-colors" aria-label="关闭">[关闭]</button>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-display text-surface-light mb-8" style={{ lineHeight: 0.85, letterSpacing: '-0.02em' }}>{project.title.split('｜')[0]}</h2>
            {project.title.includes('｜') && <p className="text-3xl md:text-5xl lg:text-[3.5rem] font-display text-surface-muted/60 -mt-4 mb-8" style={{ lineHeight: 0.85 }}>{project.title.split('｜')[1]}</p>}
            <div className="grid grid-cols-3 gap-4 text-sm mb-10 pb-8 border-b border-white/[0.06]">
              <div><p className="text-surface-muted/50 text-xs uppercase tracking-wider mb-1">Category</p><p className="text-surface">{project.category}</p></div>
              <div><p className="text-surface-muted/50 text-xs uppercase tracking-wider mb-1">Client</p><p className="text-surface">{project.client}</p></div>
              <div><p className="text-surface-muted/50 text-xs uppercase tracking-wider mb-1">Year</p><p className="text-surface">{project.year}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <Link href={`/portfolio/${project.slug}`} className="text-sm text-surface-light tracking-wider hover:opacity-70 transition-opacity flex items-center gap-2" onClick={onClose}>查看详情 <span className="text-surface-muted text-xs">&rarr;</span></Link>
              <div className="flex items-center gap-6 text-sm text-surface-muted">
                <button onClick={onPrev} className="hover:text-surface-light transition-colors" aria-label="上一个">&larr;</button>
                <span className="text-xs tracking-wider">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                <button onClick={onNext} className="hover:text-surface-light transition-colors" aria-label="下一个">&rarr;</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
