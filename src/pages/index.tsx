import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PortfolioGrid from '@/components/home/PortfolioGrid'
import { getAllProjects, getSiteConfig, getPageContent } from '@/lib/content'
import { PortfolioItem, SiteConfig, PageContent } from '@/lib/types'

interface HomeProps {
  projects: PortfolioItem[]
  config: SiteConfig
  experience: PageContent
  awards: PageContent
}

const CATEGORY_LABEL: Record<string, string> = {
  ad: '广告作品',
  live: '直播作品',
  inhouse: 'Inhouse作品',
  tutorial: 'Inhouse作品',
  story: 'DJI｜如影故事',
  featured: '精选作品',
  aigc: 'AIGC',
  other: '其他作品',
}

export default function Home({ projects, config, experience, awards }: HomeProps) {
  const router = useRouter()
  const raw = router.query.category
  const activeCategory = (typeof raw === 'string' && ['ad', 'live', 'tutorial', 'story', 'inhouse', 'featured', 'aigc', 'other'].includes(raw))
    ? raw
    : null

  const [activePanel, setActivePanel] = useState<'experience' | 'awards' | null>('experience')
  const featured = useMemo(() => projects.find((p) => p.featured) || null, [projects])

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

  const bgImage = config.heroImage || (featured ? `${featured.imageBase}${featured.coverImage}` : null)

  return (
    <Layout seo={{ description: config.siteDescription }}>
      {!activeCategory && (
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-dark-900">
            {bgImage ? (
              <>
                <img src={bgImage} alt="" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-dark-800/30" />
              </>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
            )}
          </div>

          <div className="relative z-10 min-h-screen flex items-center py-20 md:py-24">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center md:items-center">
              <motion.div className={`flex flex-col items-center md:items-start text-center md:text-left ${activePanel === 'awards' ? 'md:flex-1' : 'md:flex-1'}`} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <motion.div animate={{ x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="md:ml-0">
                  <motion.p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>{config.directorTitle}</motion.p>
                  <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>{config.directorName}</motion.h1>
                  <motion.div className="mt-5 flex flex-col gap-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
                    <a href="mailto:fuhaoyang2003@163.com" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wide">fuhaoyang2003@163.com</a>
                    <span className="text-sm text-gray-500 tracking-wide">微信：通过邮箱联系获取</span>
                  </motion.div>
                  {featured && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-8 md:mt-10">
                      <a href="/?category=featured" className="inline-flex items-center gap-3 group text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300 tracking-wide">查看精选作品 →</a>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                {activePanel && (
                  <motion.div
                    key={activePanel}
                    className={`flex-1 flex items-center md:items-start justify-center md:justify-start mt-10 md:mt-0 md:overflow-y-auto md:max-h-[80vh] md:mr-12 ${activePanel === 'awards' ? 'md:flex-[2.5] md:mr-0 md:ml-8' : ''}`}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`w-full py-8 md:py-12 ${activePanel === 'awards' ? 'max-w-4xl lg:max-w-6xl' : 'max-w-md lg:max-w-lg'}`}>
                      <div className="pl-8 md:pl-10 lg:pl-12">
                        <motion.p className="text-accent text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>{activePanel === 'experience' ? 'Experience' : 'Honors'}</motion.p>
                        <div className="text-white/85 leading-[2] text-sm md:text-base [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-display [&_h3]:text-white [&_h3]:mb-6 [&_h3]:tracking-wide [&_p]:mb-5 [&_p]:leading-[2] [&_p]:tracking-[0.02em] [&_strong]:text-white [&_strong]:font-medium [&_strong]:tracking-wide [&_br]:block [&_br]:content-[''] [&_br]:mb-3" dangerouslySetInnerHTML={{ __html: activePanel === 'experience' ? experience.contentHtml : awards.contentHtml }} />
                        <motion.button onClick={() => setActivePanel(null)} className="mt-8 text-[10px] tracking-[0.25em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>✕ 收起</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

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

          {!activePanel && (
            <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
              <motion.div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
          )}
        </section>
      )}

      {activeCategory && (
        <section id="portfolio-section" className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-20 md:pb-32">
          <motion.div className="mb-8 md:mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Portfolio</p>
            <h2 className="text-2xl md:text-3xl font-display text-white tracking-wide">{CATEGORY_LABEL[activeCategory]}</h2>
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
  const [projects, config, experience, awards] = await Promise.all([
    getAllProjects(), getSiteConfig(), getPageContent('experience.md'), getPageContent('awards.md'),
  ])
  return { props: { projects, config, experience, awards } }
}
