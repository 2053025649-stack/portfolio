import { useState, useRef, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { motion, useMotionValue } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import ProjectHero from '@/components/portfolio/ProjectHero'
import ProjectMeta from '@/components/portfolio/ProjectMeta'
import VideoSection from '@/components/portfolio/VideoSection'
import VideoLinksGrid from '@/components/portfolio/VideoLinksGrid'
import ProjectNav from '@/components/portfolio/ProjectNav'
import Lightbox from '@/components/ui/Lightbox'
import HuaweiLiveLayout from '@/components/portfolio/HuaweiLiveLayout'
import { getProjectBySlug, getAllProjectSlugs, getAdjacentProjects } from '@/lib/content'
import { PortfolioItem } from '@/lib/types'

interface PortfolioPageProps { project: PortfolioItem; prev: PortfolioItem | null; next: PortfolioItem | null }

const CYCLE_DURATION = 45000

function StillFilmstrip({ stills, imageBase, stillRatio, onImageClick }: {
  stills: { file: string; ratio?: string }[]; imageBase: string; stillRatio: string; onImageClick: (index: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [isPaused, setIsPaused] = useState(false)
  const pausedRef = useRef(false)
  useEffect(() => { pausedRef.current = isPaused }, [isPaused])
  useEffect(() => {
    const track = trackRef.current; if (!track) return
    const setWidth = track.scrollWidth / 2
    const speed = setWidth / CYCLE_DURATION
    let currentX = 0, lastTime = performance.now(), raf: number
    const animate = () => {
      const now = performance.now()
      if (!pausedRef.current) { const delta = now - lastTime; currentX -= speed * delta; currentX = ((currentX % setWidth) + setWidth) % setWidth - setWidth; x.set(currentX) }
      lastTime = now; raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [stills.length, x])
  return (
    <div className="group/track overflow-hidden py-6 md:py-8 -my-6 md:-my-8" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <motion.div ref={trackRef} className="flex gap-3 md:gap-4" style={{ x }}>
        {[...stills, ...stills].map((still, i) => (
          <button key={`${still.file}-${i}`} onClick={() => onImageClick(i % stills.length)} className="relative flex-shrink-0 w-48 md:w-64 lg:w-72 rounded-md bg-dark-700 group/img cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:z-20 hover:shadow-2xl hover:shadow-black/50" style={{ aspectRatio: still.ratio || stillRatio }}>
            <img src={`${imageBase}${still.file}`} alt={`Stills ${(i % stills.length) + 1}`} className="w-full h-full object-cover rounded-md transition-all duration-500 group-hover/img:brightness-110" loading="lazy" />
            <div className="absolute inset-0 rounded-md bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </motion.div>
    </div>
  )
}

export default function PortfolioPage({ project, prev, next }: PortfolioPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (project.customLayout === 'huawei-live') {
    return (
      <Layout seo={{ title: project.title, description: `${project.client} · ${project.year}`, ogImage: `${project.imageBase}${project.coverImage}` }}>
        <HuaweiLiveLayout project={project} />
      </Layout>
    )
  }

  return (
    <Layout seo={{ title: project.title, description: `${project.client} · ${project.year} · ${project.tags.join(', ')}`, ogImage: `${project.imageBase}${project.coverImage}` }}>
      <article>
        <ProjectHero project={project} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <ProjectMeta project={project} />
          </motion.div>
          {project.stills.length > 0 && (
            <motion.div className="pb-10 md:pb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <h3 className="text-2xl md:text-3xl font-display text-surface-light mb-6 tracking-wide">静帧</h3>
              <StillFilmstrip stills={project.stills} imageBase={project.imageBase} stillRatio={project.stillRatio} onImageClick={(i) => setLightboxIndex(i)} />
            </motion.div>
          )}
          <VideoLinksGrid groups={project.videoLinks} imageBase={project.imageBase} />
          {(project.xinpianchangUrl || project.externalUrl || project.category === 'story' || project.multiVideo.length > 0) && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <VideoSection xinpianchangUrl={project.xinpianchangUrl} multiVideo={project.multiVideo} externalUrl={project.externalUrl} externalLabel={project.externalLabel} />
            </motion.div>
          )}
          <ProjectNav prev={prev} next={next} />
        </div>
        <Lightbox images={project.stills.map((s) => `${project.imageBase}${s.file}`)} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })), fallback: false }
}

export const getStaticProps: GetStaticProps<PortfolioPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const project = await getProjectBySlug(slug)
  const { prev, next } = await getAdjacentProjects(slug)
  return { props: { project, prev, next } }
}
