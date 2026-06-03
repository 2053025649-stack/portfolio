import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { getPageContent } from '@/lib/content'
import { PageContent } from '@/lib/types'

interface AboutProps { content: PageContent }

export default function About({ content }: AboutProps) {
  return (
    <Layout seo={{ title: '关于我', description: '广告导演 / 直播导演' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-32">
        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-4">About</p>
          <h1 className="text-3xl md:text-5xl font-display text-white mb-10 tracking-wide">{content.title || '关于我'}</h1>
          <div className="prose-invert" dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
        </motion.div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const content = await getPageContent('about.md')
  return { props: { content } }
}
