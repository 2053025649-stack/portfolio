import { motion } from 'framer-motion'
import { SiteConfig, PageContent } from '@/lib/types'

interface AboutViewProps { config: SiteConfig; experience: PageContent; awards: PageContent }

export default function AboutView({ config, experience, awards }: AboutViewProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center px-6 md:px-10 lg:px-16 py-20">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-display text-sage-light leading-none tracking-tight mb-8">{config.directorName}</h2>
              <p className="text-sm md:text-base text-sage-muted leading-relaxed mb-8 max-w-md">{config.directorTitle}</p>
              {config.email && (
                <div className="flex gap-4 text-xs text-sage-muted tracking-wider">
                  <a href={`mailto:${config.email}`} className="hover:text-sage-light transition-colors">Email</a>
                  {config.instagram && <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sage-light transition-colors">Instagram</a>}
                  {config.bilibili && <a href={config.bilibili} target="_blank" rel="noopener noreferrer" className="hover:text-sage-light transition-colors">Bilibili</a>}
                </div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="space-y-12">
              {experience.contentHtml && (
                <div>
                  <h3 className="text-xs text-sage-muted tracking-[0.15em] uppercase mb-6">工作经历</h3>
                  <div className="text-sm text-sage-muted leading-relaxed space-y-3 [&_strong]:text-sage-light [&_p]:text-sage-muted" dangerouslySetInnerHTML={{ __html: experience.contentHtml }} />
                </div>
              )}
              {awards.contentHtml && (
                <div>
                  <h3 className="text-xs text-sage-muted tracking-[0.15em] uppercase mb-6">获奖经历</h3>
                  <div className="text-sm text-sage-muted leading-relaxed space-y-2 [&_strong]:text-accent" dangerouslySetInnerHTML={{ __html: awards.contentHtml }} />
                </div>
              )}
            </motion.div>
          </div>
          <motion.p className="mt-16 text-xs text-sage-muted/40 tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>&copy; {new Date().getFullYear()}</motion.p>
        </div>
      </div>
    </div>
  )
}
