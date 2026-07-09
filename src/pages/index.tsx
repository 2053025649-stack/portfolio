import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import PortfolioGrid from '@/components/home/PortfolioGrid'
import BrandShowcase from '@/components/home/BrandShowcase'
import ExperienceTimeline from '@/components/home/ExperienceTimeline'
import WordsPullUp from '@/components/effects/WordsPullUp'
import { getAllProjects, getSiteConfig, getPageContent } from '@/lib/content'
import { PortfolioItem, SiteConfig, PageContent } from '@/lib/types'
import { CATEGORY_LABEL } from '@/lib/constants'

interface HomeProps {
  projects: PortfolioItem[]
  config: SiteConfig
  awards: PageContent
}

const HOME_CATEGORY_LABEL: Record<string, string> = {
  ...CATEGORY_LABEL,
  featured: '精选作品',
  aigc: 'AIGC',
}

export default function Home({ projects, config, awards }: HomeProps) {
  const router = useRouter()
  const raw = router.query.category
  const activeCategory = (typeof raw === 'string' && ['ad', 'live', 'tutorial', 'story', 'inhouse', 'featured', 'aigc', 'other'].includes(raw))
    ? raw
    : null

  const [activePanel, setActivePanel] = useState<'experience' | 'awards' | null>(null)

  const togglePanel = (panel: 'experience' | 'awards') => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  const filtered = useMemo(() => {
    if (!activeCategory) return []
    if (activeCategory === 'inhouse') return projects.filter((p) => p.category === 'tutorial' || p.category === 'story')
    if (activeCategory === 'featured') return projects.filter((p) => p.featured)
    if (activeCategory === 'aigc') return []
    if (activeCategory === 'other') return projects.filter((p) => p.category === 'other')
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory, projects])

  return (
    <Layout seo={{ description: config.siteDescription }}>
      {!activeCategory && (
        <>
          {/* ── Prisma-style Hero ── */}
          <section className="h-screen p-4 md:p-6">
            <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
              {/* Video background */}
              <video
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
              />

              {/* Noise overlay */}
              <div className="noise-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

              {/* Hero content — center-left aligned */}
              <div className="absolute inset-0 z-10 flex items-center p-6 md:p-10 lg:p-16">
                <div className="flex flex-col items-start max-w-4xl">
                  {/* Name + description block — description right-aligns to the name's width */}
                  <div className="inline-block">
                    <WordsPullUp
                      text={config.directorName}
                      className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[14vw] 2xl:text-[12vw] font-medium leading-[0.9] tracking-[-0.04em]"
                      style={{ color: '#E1E0CC' }}
                    />

                    <motion.p
                      className="text-right text-xs sm:text-sm md:text-base mt-2 md:mt-4 pr-[3em]"
                      style={{ lineHeight: 1.2, color: '#E1E0CC', opacity: 0.7 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {config.siteDescription}
                    </motion.p>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-6 mt-6 md:mt-8">
                    {/* 查看精选作品 */}
                    <motion.a
                      href="/?category=featured"
                      className="inline-flex items-center gap-2 bg-primary rounded-full text-black font-medium text-sm sm:text-base pl-5 pr-2 py-2 group hover:gap-3 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span>查看精选作品</span>
                      <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </span>
                    </motion.a>

                    {/* Contact info */}
                    <motion.div
                      className="flex flex-col gap-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a href={`mailto:${config.email}`} className="text-sm md:text-base transition-colors duration-300" style={{ color: '#E1E0CC', opacity: 0.7 }}>
                        {config.email}
                      </a>
                      <span className="text-xs md:text-sm" style={{ color: '#E1E0CC', opacity: 0.5 }}>微信：通过邮箱联系获取</span>
                    </motion.div>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* Side panel overlay (experience / awards) */}
          <AnimatePresence mode="wait">
            {activePanel && (
              <motion.div
                key={activePanel}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => { if (e.target === e.currentTarget) setActivePanel(null) }}
              >
                <div className="w-full max-w-2xl px-6 py-12">
                  <motion.p
                    className="text-accent text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    {activePanel === 'experience' ? 'Experience' : 'Honors'}
                  </motion.p>
                  {activePanel === 'experience' ? (
                    <ExperienceTimeline />
                  ) : (
                    <div
                      className="text-white/85 leading-[2] text-sm md:text-base [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-display [&_h3]:text-white [&_h3]:mb-6 [&_h3]:tracking-wide [&_p]:mb-5 [&_p]:leading-[2] [&_p]:tracking-[0.02em] [&_strong]:text-white [&_strong]:font-medium [&_strong]:tracking-wide [&_br]:block [&_br]:content-[''] [&_br]:mb-3 break-words"
                      dangerouslySetInnerHTML={{ __html: awards.contentHtml }}
                    />
                  )}
                  <motion.button
                    onClick={() => setActivePanel(null)}
                    className="mt-8 text-[10px] tracking-[0.25em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    ✕ 收起
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Side nav buttons — experience / awards */}
          <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-7">
            <button onClick={() => togglePanel('experience')} className="group flex items-center gap-3">
              <span className={`w-[2px] h-10 md:h-12 transition-all duration-500 ${activePanel === 'experience' ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/40'}`} />
              <span className={`text-sm md:text-base tracking-[0.15em] transition-all duration-500 ${activePanel === 'experience' ? 'text-white' : 'text-white/50 group-hover:text-white/85'}`} style={{ writingMode: 'vertical-rl' }}>工作经历</span>
            </button>
            <button onClick={() => togglePanel('awards')} className="group flex items-center gap-3">
              <span className={`w-[2px] h-10 md:h-12 transition-all duration-500 ${activePanel === 'awards' ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/40'}`} />
              <span className={`text-sm md:text-base tracking-[0.15em] transition-all duration-500 ${activePanel === 'awards' ? 'text-white' : 'text-white/50 group-hover:text-white/85'}`} style={{ writingMode: 'vertical-rl' }}>获奖情况</span>
            </button>
          </div>

          {/* Scroll indicator */}
          {!activePanel && (
            <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
              <motion.div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}

          {/* Brand showcase — all screens */}
          <BrandShowcase />
        </>
      )}

      {activeCategory && (
        <section id="portfolio-section" className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-20 md:pb-32">
          <motion.div className="mb-10 md:mb-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white tracking-wide leading-[1.2] text-balance">{HOME_CATEGORY_LABEL[activeCategory]}</h2>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <PortfolioGrid projects={filtered} />
            </motion.div>
          </AnimatePresence>
        </section>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [projects, config, awards] = await Promise.all([
    getAllProjects(), getSiteConfig(), getPageContent('awards.md'),
  ])
  return { props: { projects, config, awards } }
}
