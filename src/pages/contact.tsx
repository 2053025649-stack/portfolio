import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { getPageContent } from '@/lib/content'
import { PageContent } from '@/lib/types'

interface ContactProps { content: PageContent }

export default function Contact({ content }: ContactProps) {
  return (
    <Layout seo={{ title: '联系我', description: '合作咨询' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-32">
        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl font-display text-white mb-10 tracking-wide">{content.title || '联系我'}</h1>
          <div className="prose-invert" dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
        </motion.div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
  const content = await getPageContent('contact.md')
  return { props: { content } }
}
