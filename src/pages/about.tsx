import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { getPageContent, getSiteConfig } from '@/lib/content'
import { PageContent, SiteConfig } from '@/lib/types'

interface AboutProps {
  content: PageContent
  config: SiteConfig
}

export default function About({ content, config }: AboutProps) {
  return (
    <Layout seo={{ title: '关于我', description: '广告导演 / 直播导演' }}>
      <article className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-32">

        {/* ── Hero ── */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.08] tracking-wide text-balance mb-8">
            {config.directorName}
          </h1>
          <p className="text-xl md:text-2xl text-surface-muted leading-relaxed max-w-2xl">
            {config.directorTitle} — {config.siteDescription}
          </p>
        </motion.div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Side accent bar — visual anchor */}
          <motion.div
            className="hidden lg:block lg:col-span-1"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            <div className="w-[2px] h-full bg-gradient-to-b from-accent via-accent/40 to-transparent rounded-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="prose-invert"
              dangerouslySetInnerHTML={{ __html: content.contentHtml }}
            />
          </motion.div>

          {/* Side info card */}
          <motion.aside
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-28 space-y-8 p-8 rounded-2xl border border-white/[0.06] bg-dark-700/50 backdrop-blur-sm">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-surface-faint block mb-3">联系</span>
                <a href={`mailto:${config.email}`} className="text-sm text-surface hover:text-accent transition-colors duration-300 block mb-2">
                  {config.email}
                </a>
                {config.wechat && (
                  <p className="text-sm text-surface-muted">微信: {config.wechat}</p>
                )}
              </div>

              {config.bilibili && (
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-surface-faint block mb-3">关注</span>
                  <a href={config.bilibili} target="_blank" rel="noopener noreferrer" className="text-sm text-surface hover:text-accent transition-colors duration-300">
                    Bilibili →
                  </a>
                </div>
              )}

              {config.instagram && (
                <div>
                  <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-surface hover:text-accent transition-colors duration-300">
                    Instagram →
                  </a>
                </div>
              )}

              {/* Decorative element */}
              <div className="pt-6 border-t border-white/[0.04]">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-[2px] rounded-full"
                      style={{
                        opacity: 1 - i * 0.3,
                        background: `linear-gradient(90deg, ${i === 0 ? '#d4a574' : i === 1 ? '#aa8860' : '#887050'}, transparent)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const [content, config] = await Promise.all([
    getPageContent('about.md'),
    getSiteConfig(),
  ])
  return { props: { content, config } }
}
