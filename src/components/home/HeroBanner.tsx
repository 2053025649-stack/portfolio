import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'

interface HeroBannerProps {
  featured: PortfolioItem | null
  directorName: string
  directorTitle: string
}

export default function HeroBanner({ featured, directorName, directorTitle }: HeroBannerProps) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-end pb-12 md:pb-20">
      <div className="absolute inset-0 bg-dark-900">
        {featured ? (
          <>
            <img src={`${featured.imageBase}${featured.coverImage}`} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-dark-800/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-dark-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
          </div>
        )}
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="max-w-2xl">
          <motion.p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>{directorTitle}</motion.p>
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] text-balance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>{directorName}</motion.h1>
          {featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8 md:mt-10">
              <Link href={`/portfolio/${featured.slug}`} className="inline-flex items-center gap-3 group">
                <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300 tracking-wide">查看精选作品 →</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
      <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}>
        <motion.div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
    </section>
  )
}
