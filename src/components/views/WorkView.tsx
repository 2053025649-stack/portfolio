import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'

interface WorkViewProps { projects: PortfolioItem[]; onProjectClick: (project: PortfolioItem) => void }

export default function WorkView({ projects, onProjectClick }: WorkViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
  const currentProject = projects[displayIndex]

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') setActiveIndex((p) => Math.max(0, p - 1))
      if (e.key === 'ArrowDown') setActiveIndex((p) => Math.min(projects.length - 1, p + 1))
      if (e.key === 'Enter' && currentProject) onProjectClick(currentProject)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [projects.length, onProjectClick, currentProject])

  return (
    <div className="h-full flex">
      <div className="flex-1 relative bg-dark-900">
        <AnimatePresence mode="wait">
          <motion.div key={displayIndex} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <img src={`/content/portfolio/${currentProject.slug}/cover.jpg`} alt={currentProject.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14">
              <p className="text-sage-muted text-xs tracking-[0.15em] uppercase mb-2">{currentProject.client} · {currentProject.year}</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-sage-light tracking-wide">{currentProject.title}</h2>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-[14vw] max-w-[140px] h-full overflow-y-auto border-l border-white/[0.06] bg-dark-900 scrollbar-none">
        <div className="flex flex-col py-[calc(50vh-2.5vh)]">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              onClick={() => { setActiveIndex(i); onProjectClick(project) }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full overflow-hidden cursor-pointer group flex-shrink-0"
              style={{ aspectRatio: '16/11', height: '5vh' }}
            >
              <img src={`/content/portfolio/${project.slug}/${project.thumbnail}`} alt={project.title} className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110" loading="lazy" onError={(e) => { const el = e.currentTarget; el.style.display = 'none'; const p = el.parentElement; if (p && !p.querySelector('.sf')) { const fb = document.createElement('div'); fb.className = 'sf absolute inset-0 bg-dark-600'; p.appendChild(fb) } }} />
              <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${activeIndex === i ? 'bg-sage-light' : 'bg-transparent group-hover:bg-white/20'}`} />
              <div className={`absolute inset-0 transition-colors duration-300 ${activeIndex === i ? 'bg-white/[0.03]' : 'bg-transparent group-hover:bg-white/[0.05]'}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 right-[calc(14vw+1.5rem)] text-sage-muted/40 text-xs tracking-[0.15em]">{String(displayIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</div>
    </div>
  )
}
