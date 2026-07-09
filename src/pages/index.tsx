import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import PortfolioGrid from '@/components/home/PortfolioGrid'

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

const PARTNER_LOGOS = [
  { name: '华为', file: 'huawei.png' },
  { name: '大疆创新', file: 'dji.png' },
  { name: '宝利来', file: 'polaroid.png' },
  { name: '浙江省卫健委', file: 'zhejiang-health.png' },
  { name: '杭州师范大学', file: 'hznu.png' },
  { name: '赤尾', file: 'chiwei.png' },
  { name: '邮政储蓄银行', file: 'psbc.png' },
  { name: '爷爷不泡茶', file: 'grandpa-tea.png' },
  { name: '泡泡玛特', file: 'popmart.png' },
  { name: '人民网', file: 'people-daily.png' },
  { name: '央视网', file: 'cctv.png' },
  { name: '新华网', file: 'xinhua.png' },
  { name: '科大讯飞', file: 'iflytek.png' },
  { name: '杭州亚运会', file: 'asiad.png' },
  { name: '可画', file: 'canva.png' },
  { name: '浙江传媒学院', file: 'zhchuan.png' },
]

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
          <section className="h-screen p-3 sm:p-4 md:p-6">
            <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
              {/* Video background */}
              <video
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
              />

              {/* Noise overlay */}
              <div className="noise-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none" />

              {/* Gradient overlay — stronger bottom for mobile readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 sm:to-black/60" />

              {/* Hero content — centered vertically, bottom-biased on mobile */}
              <div className="absolute inset-0 z-10 flex items-end sm:items-center p-5 sm:p-6 md:p-10 lg:p-16 pb-10 sm:pb-6">
                <div className="flex flex-col items-start max-w-4xl w-full">
                  {/* Name + description block */}
                  <div className="inline-block">
                    <WordsPullUp
                      text={config.directorName}
                      className="text-[26vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[14vw] 2xl:text-[12vw] font-medium leading-[0.85] tracking-[-0.04em]"
                      style={{ color: '#E1E0CC' }}
                    />

                    <motion.p
                      className="text-right text-[11px] sm:text-sm md:text-base mt-2 sm:mt-2 md:mt-4 pr-[2.5em] sm:pr-[3em]"
                      style={{ lineHeight: 1.3, color: '#E1E0CC', opacity: 0.7 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {config.siteDescription}
                    </motion.p>
                  </div>

                  {/* Actions — stacked on mobile, row on desktop */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-6 md:mt-8 w-full sm:w-auto">
                    {/* 查看精选作品 */}
                    <motion.a
                      href="/?category=featured"
                      className="inline-flex items-center gap-2 bg-primary rounded-full text-black font-medium text-xs sm:text-sm md:text-base pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 group hover:gap-3 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span>查看精选作品</span>
                      <span className="bg-black rounded-full w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </span>
                    </motion.a>

                    {/* Contact info */}
                    <motion.div
                      className="flex flex-col gap-0.5 sm:gap-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a href={`mailto:${config.email}`} className="text-[11px] sm:text-sm md:text-base transition-colors duration-300" style={{ color: '#E1E0CC', opacity: 0.7 }}>
                        {config.email}
                      </a>
                      <span className="text-[11px] sm:text-xs md:text-sm" style={{ color: '#E1E0CC', opacity: 0.5 }}>微信：通过邮箱联系获取</span>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* Brand strip — subtle scrolling logos at bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-3 sm:pb-4 md:pb-5 pointer-events-none">
                <div className="overflow-hidden mb-2 sm:mb-3">
                  <div
                    className="flex gap-8 sm:gap-10 md:gap-14 items-center opacity-30"
                    style={{ animation: 'scroll-filmstrip 40s linear infinite', width: 'max-content' }}
                  >
                    {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => {
                      const isPopmart = logo.file === 'popmart.png'
                      return (
                        <div key={i} className="flex-shrink-0 h-3.5 sm:h-4 md:h-5 flex items-center">
                          <img
                            src={`/brands/${logo.file}`}
                            alt={logo.name}
                            className="h-full w-auto object-contain"
                            style={isPopmart ? { opacity: 0.8 } : { filter: 'brightness(0) invert(0.9)' }}
                            draggable={false}
                          />
                        </div>
                      )
                    })}
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
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => { if (e.target === e.currentTarget) setActivePanel(null) }}
              >
                <div className="w-full max-w-5xl flex gap-12 lg:gap-16 px-6 md:px-10 py-12">
                  {/* Left — content */}
                  <div className="flex-1 min-w-0">
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

                  {/* Right — brand logos */}
                  <div className="hidden md:flex flex-col justify-center gap-12 w-72 lg:w-96 flex-shrink-0">
                    <div>
                      <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5 block">Inhouse</span>
                      <div className="flex gap-12 items-center">
                        <div className="w-40 flex items-center justify-center">
                          <img src="/brands/huawei.png" alt="华为" className="w-full h-auto object-contain" style={{ filter: 'brightness(0) invert(0.9)', opacity: 0.7 }} />
                        </div>
                        <div className="w-24 flex items-center justify-center">
                          <img src="/brands/dji.png" alt="大疆创新" className="w-full h-auto object-contain" style={{ filter: 'brightness(0) invert(0.9)', opacity: 0.7 }} />
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-white/[0.06]">
                      <span className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-5 block">Partners</span>
                      <div className="grid grid-cols-4 gap-5 gap-y-6">
                        {PARTNER_LOGOS.slice(2).map((logo) => {
                          const isPopmart = logo.file === 'popmart.png'
                          return (
                            <div key={logo.file} className="flex items-center justify-center">
                              <img
                                src={`/brands/${logo.file}`}
                                alt={logo.name}
                                className="w-full h-auto max-h-8 object-contain"
                                style={isPopmart ? { opacity: 0.8 } : { filter: 'brightness(0) invert(0.9)', opacity: 0.55 }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Side nav — horizontal at bottom on mobile, vertical on right on md+ */}
          <div className="fixed md:right-6 lg:right-10 md:top-1/2 md:-translate-y-1/2 z-40 flex md:flex-col gap-5 md:gap-7 bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0">
            <button onClick={() => togglePanel('experience')} className="group flex items-center gap-2 md:gap-3">
              <span className={`hidden md:block w-[2px] h-10 lg:h-12 transition-all duration-500 ${activePanel === 'experience' ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/40'}`} />
              <span className={`text-xs md:hidden tracking-[0.15em] transition-all duration-500 ${activePanel === 'experience' ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}>工作经历</span>
              <span className={`hidden md:block text-sm md:text-base tracking-[0.15em] transition-all duration-500 ${activePanel === 'experience' ? 'text-white' : 'text-white/50 group-hover:text-white/85'}`} style={{ writingMode: 'vertical-rl' }}>工作经历</span>
            </button>
            <span className="hidden md:block w-[2px] h-3 bg-white/10" />
            <span className="md:hidden text-white/20 text-xs">|</span>
            <button onClick={() => togglePanel('awards')} className="group flex items-center gap-2 md:gap-3">
              <span className={`hidden md:block w-[2px] h-10 lg:h-12 transition-all duration-500 ${activePanel === 'awards' ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/40'}`} />
              <span className={`text-xs md:hidden tracking-[0.15em] transition-all duration-500 ${activePanel === 'awards' ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}>获奖情况</span>
              <span className={`hidden md:block text-sm md:text-base tracking-[0.15em] transition-all duration-500 ${activePanel === 'awards' ? 'text-white' : 'text-white/50 group-hover:text-white/85'}`} style={{ writingMode: 'vertical-rl' }}>获奖情况</span>
            </button>
          </div>

          {/* Scroll indicator */}
          {!activePanel && (
            <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
              <motion.div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </motion.div>
          )}

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
