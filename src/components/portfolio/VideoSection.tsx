'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoItem {
  label: string
  url: string
}

interface VideoSectionProps {
  xinpianchangUrl: string | null
  multiVideo: VideoItem[]
  externalUrl: string | null
  externalLabel: string | null
}

function VideoPlayer({ url }: { url: string }) {
  const [showVideo, setShowVideo] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showVideo) return
    const observer = new IntersectionObserver(
      () => {},
      { rootMargin: '200px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [showVideo])

  if (!showVideo) {
    return (
      <motion.button
        onClick={() => setShowVideo(true)}
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark-700 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center group-hover:bg-white/[0.15] transition-colors duration-300">
            <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-[3px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
        </div>
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-surface-muted group-hover:text-surface-light text-sm tracking-wider transition-colors duration-300">
          点击播放视频
        </p>
      </motion.button>
    )
  }

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark-900"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        src={url}
        title="作品视频"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  )
}

export default function VideoSection({ xinpianchangUrl, multiVideo, externalUrl, externalLabel }: VideoSectionProps) {
  const allVideos: VideoItem[] = multiVideo.length > 0
    ? multiVideo
    : xinpianchangUrl
      ? [{ label: '正片', url: xinpianchangUrl }]
      : []
  const hasVideo = allVideos.length > 0
  const [activeIndex, setActiveIndex] = useState(0)

  const currentUrl = hasVideo ? allVideos[activeIndex].url : null

  // External link mode
  if (!hasVideo && externalUrl) {
    return (
      <section className="py-10 md:py-14 border-t border-white/[0.06]">
        <h3 className="text-2xl md:text-3xl font-display text-surface-light mb-6 tracking-wide">观看成片</h3>
        <motion.a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark-700 cursor-pointer group flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-dark-900" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center group-hover:bg-white/[0.15] transition-colors duration-300">
              <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
            <span className="text-surface-light/80 group-hover:text-surface-light text-sm md:text-base tracking-wider transition-colors duration-300">
              {externalLabel || '在外部网站观看'}
            </span>
          </div>
        </motion.a>
      </section>
    )
  }

  // Placeholder mode
  if (!hasVideo && !externalUrl) {
    return (
      <section className="py-10 md:py-14 border-t border-white/[0.06]">
        <h3 className="text-2xl md:text-3xl font-display text-surface-light mb-6 tracking-wide">观看成片</h3>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-dark-900" />
          <span className="relative z-10 text-surface-muted/30 text-sm tracking-wider">视频即将上线</span>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 md:py-14 border-t border-white/[0.06]">
      <p className="text-accent text-xs tracking-[0.2em] uppercase mb-6">Watch</p>
      <h3 className="text-xl md:text-2xl font-display text-surface-light mb-6 tracking-wide">观看成片</h3>

      {/* Tab bar — only show with multiple videos */}
      {allVideos.length > 1 && (
        <div className="flex gap-2 mb-6">
          {allVideos.map((v, i) => (
            <button
              key={v.url}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 text-sm tracking-wider rounded-full transition-colors duration-300 ${
                i === activeIndex
                  ? 'bg-white/10 text-surface-light'
                  : 'text-surface-muted hover:text-sage'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <VideoPlayer url={allVideos[activeIndex].url} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
