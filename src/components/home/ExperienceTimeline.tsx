import { motion } from 'framer-motion'

interface ExperienceEntry {
  period: string
  organization: string
  role: string
  current?: boolean
}

const EXPERIENCES: ExperienceEntry[] = [
  { period: '2025.6 — 至今', organization: '华为终端 电商直播组', role: '直播技术支持', current: true },
  { period: '2024.8',        organization: '电影《镖人》',       role: '宣传组' },
  { period: '2024.6 — 2025.1', organization: '大疆创新 产品应用技术支持', role: '视频制作' },
  { period: '2022 — 2024',   organization: '独立导演',            role: '' },
]

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Vertical gradient line */}
      <div className="absolute left-0 top-1 bottom-4 w-px bg-gradient-to-b from-accent/50 via-accent/25 to-transparent" />

      <div className="space-y-8 md:space-y-10">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            className="relative pl-6 group cursor-default"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.12,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Dot on the line */}
            <motion.span
              className={
                exp.current
                  ? 'absolute left-0 top-[0.35rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,165,116,0.35)]'
                  : 'absolute left-0 top-[0.35rem] -translate-x-1/2 w-2 h-2 rounded-full border border-accent/25 bg-dark-800 group-hover:border-accent/50 group-hover:bg-accent/20 transition-all duration-500'
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.12,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Content */}
            <span className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-accent/55 mb-1 block">
              {exp.period}
            </span>
            <h4 className="text-sm md:text-base font-medium text-surface/90 tracking-wide group-hover:text-surface transition-colors duration-500">
              {exp.organization}
            </h4>
            {exp.role && (
              <span className="text-xs md:text-sm text-surface-muted tracking-wide mt-0.5 block">
                {exp.role}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
