import { motion } from 'framer-motion'
import { Category } from '@/lib/types'

const TABS: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: '全部作品' },
  { key: 'ad', label: '广告' },
  { key: 'live', label: '直播' },
  { key: 'inhouse', label: 'Inhouse作品' },
  { key: 'story', label: 'DJI｜如影故事' },
]

interface CategoryFilterProps { active: 'all' | Category; onChange: (c: 'all' | Category) => void }

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button key={tab.key} onClick={() => onChange(tab.key)} className={`relative px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base tracking-widest transition-colors duration-300 rounded-full ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {tab.label}
            {isActive && <motion.span className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-full" layoutId="filter-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
          </button>
        )
      })}
    </div>
  )
}
