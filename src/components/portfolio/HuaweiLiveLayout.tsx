'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PortfolioItem } from '@/lib/types'
import Lightbox from '@/components/ui/Lightbox'

// ── Noise overlay ──────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
      <svg className="w-full h-full">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}

// ── Glass card ──────────────────────────────────────────────
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 lg:p-12 ${className}`}
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)' }}
    >
      {children}
    </div>
  )
}

// ── Section heading ─────────────────────────────────────────
function SectionHeading({ overline, title, subtitle }: { overline: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 md:mb-16">
      <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-accent/70 mb-4 block">
        {overline}
      </span>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-display text-white tracking-wide leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-white/40 leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}

// ── Image placeholder ───────────────────────────────────────
function ImagePlaceholder({ aspect = '16/9', label = '' }: { aspect?: string; label?: string }) {
  return (
    <div
      className="rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center overflow-hidden relative group"
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent" />
      <span className="text-white/10 text-xs tracking-[0.2em] uppercase group-hover:text-white/20 transition-colors duration-500">
        {label || 'Image'}
      </span>
    </div>
  )
}

// ── Stat card ───────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 rounded-xl border border-white/[0.04] bg-white/[0.01]">
      <div className="text-3xl md:text-4xl lg:text-5xl font-display text-white tracking-wide">{value}</div>
      <div className="mt-2 text-[11px] md:text-xs text-white/30 tracking-[0.15em] uppercase">{label}</div>
    </div>
  )
}

// ── Gallery filmstrip ──────────────────────────────────────
function GalleryFilmstrip({ images, imageBase, onImageClick, reverse = false }: {
  images: string[]
  imageBase: string
  onImageClick: (index: number) => void
  reverse?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="group/track overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className={`flex gap-3 md:gap-4 py-1 ${isPaused ? '[animation-play-state:paused]' : ''}`}
        style={{
          animation: `scroll-filmstrip 45s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          width: 'max-content',
        }}
      >
        {[...images, ...images].map((img, i) => (
          <button
            key={`${img}-${i}`}
            onClick={() => onImageClick(i % images.length)}
            className="relative flex-shrink-0 w-48 md:w-64 lg:w-72 rounded-md bg-dark-700 group/img cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:z-20 hover:shadow-2xl hover:shadow-black/50"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src={`${imageBase}${img}`}
              alt={`视觉集锦 ${(i % images.length) + 1}`}
              className="w-full h-full object-cover rounded-md transition-all duration-500 group-hover/img:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-md bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main layout ─────────────────────────────────────────────
interface HuaweiLiveLayoutProps {
  project: PortfolioItem
}

export default function HuaweiLiveLayout({ project }: HuaweiLiveLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const coverSrc = `${project.imageBase}${project.coverImage}`

  return (
    <>
      <NoiseOverlay />

      <article className="relative">
        {/* ── HERO ─────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          {/* BG image */}
          <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
            <img
              src={coverSrc}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900" />
          </motion.div>

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-accent/80 mb-6 block">
                Live Production
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-display text-white leading-[1.05] tracking-tight max-w-4xl">
                {project.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm text-white/40 tracking-widest uppercase">
                <span className="text-accent/70">{project.role}</span>
                <span className="text-white/15">/</span>
                <span>{project.client}</span>
                <span className="text-white/15">/</span>
                <span>{project.year}</span>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="mt-20 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <motion.div
                  className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
                  animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── OVERVIEW / INTRO ─────────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionHeading
                overline="Overview"
                title="项目概述"
                subtitle="这里放置项目概述文字。介绍直播项目的整体规模、目标与核心理念，为读者构建整体认知框架。"
              />
              <div className="space-y-4 text-sm md:text-base text-white/50 leading-relaxed">
                <p>
                  此处为详细项目背景段落。可以描述品牌方的需求、直播活动的挑战、
                  以及团队如何制定整体策略应对这些挑战。保持文字简洁有力，
                  突出关键决策与创意亮点。
                </p>
                <p>
                  第二段可以深入技术层面或创意执行的细节。例如多机位切换方案、
                  AR/XR 技术的应用、实时包装系统的搭建等。让读者了解项目背后的专业深度。
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePlaceholder aspect="4/3" label="Key Visual" />
            </motion.div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <GlassCard>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              <StatCard value="3000h+" label="直播时长" />
              <StatCard value="6" label="机位部署" />
              <StatCard value="12款" label="产品发布" />
              <StatCard value="破万级" label="在线观看" />
            </div>
          </GlassCard>
        </section>

        {/* ── CASE STUDY BLOCK 1 ───────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading
              overline="Case Study 01"
              title="导播方案"
              subtitle="从前期策划到现场执行，完整的导播方案设计与技术实现路径。"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="h-full">
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent/60 block mb-4">01</span>
                <h3 className="text-lg md:text-xl font-display text-white tracking-wide mb-3">机位规划</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  此处描述多机位部署方案，包括主舞台、产品特写、观众反应与航拍机位的配置逻辑。
                </p>
                <ImagePlaceholder aspect="16/9" />
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="h-full">
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent/60 block mb-4">02</span>
                <h3 className="text-lg md:text-xl font-display text-white tracking-wide mb-3">实时包装</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  每个产品发布环节独立的视觉包装设计，AR 实时特效与实景融合的技术实现。
                </p>
                <ImagePlaceholder aspect="16/9" />
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="h-full">
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent/60 block mb-4">03</span>
                <h3 className="text-lg md:text-xl font-display text-white tracking-wide mb-3">转场设计</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  流畅的环节切换节奏，视觉转场与音效配合，确保直播节奏张弛有度。
                </p>
                <ImagePlaceholder aspect="16/9" />
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ── FULL-WIDTH IMAGE ─────────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImagePlaceholder aspect="21/9" label="Full Width Showcase" />
          </motion.div>
          <p className="mt-6 text-center text-xs md:text-sm text-white/25 tracking-wide">
            图注文字 · Caption goes here
          </p>
        </section>

        {/* ── CASE STUDY BLOCK 2 ───────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              overline="Case Study 02"
              title="执行亮点"
              subtitle="直播全程的关键执行细节与技术突破点。"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ImagePlaceholder aspect="4/3" label="Execution Photo" />
            </motion.div>
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <span className="text-accent/60 text-[10px] tracking-[0.25em] uppercase">Highlight 01</span>
                <h3 className="text-xl md:text-2xl font-display text-white mt-2 mb-3 tracking-wide">零失误执行</h3>
                <p className="text-sm md:text-base text-white/45 leading-relaxed">
                  全程直播零失误的详细执行记录。描述团队如何在高压环境下保持稳定输出，
                  以及应急预案的部署与实时调整过程。
                </p>
              </div>
              <div>
                <span className="text-accent/60 text-[10px] tracking-[0.25em] uppercase">Highlight 02</span>
                <h3 className="text-xl md:text-2xl font-display text-white mt-2 mb-3 tracking-wide">技术融合</h3>
                <p className="text-sm md:text-base text-white/45 leading-relaxed">
                  AR 特效与实景画面的无缝融合。阐述实时渲染管线的搭建、
                  虚实结合的视觉呈现效果，以及观众端的沉浸式体验反馈。
                </p>
              </div>
              <div>
                <span className="text-accent/60 text-[10px] tracking-[0.25em] uppercase">Highlight 03</span>
                <h3 className="text-xl md:text-2xl font-display text-white mt-2 mb-3 tracking-wide">团队协作</h3>
                <p className="text-sm md:text-base text-white/45 leading-relaxed">
                  多部门协同作战的幕后故事。从导演组、摄像组到技术保障，
                  各环节高效沟通配合的实战经验。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TECH SPEC GRID ───────────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard>
              <SectionHeading
                overline="Tech Specs"
                title="技术规格"
                subtitle="使用的核心设备与技术参数。"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                {[
                  ['摄像系统', 'ARRI / RED / SONY'],
                  ['镜头组', 'Cooke / Angénieux'],
                  ['切换台', 'Blackmagic / Ross'],
                  ['包装系统', 'Unreal Engine / Notch'],
                  ['信号传输', '12G-SDI / NDI'],
                  ['监看系统', '4K HDR Monitor'],
                  ['音频系统', 'Dolby Atmos'],
                  ['备份方案', '双链路冗余'],
                ].map(([k, v]) => (
                  <div key={k} className="p-4 rounded-lg border border-white/[0.03] bg-white/[0.005]">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-2">{k}</div>
                    <div className="text-white/60 font-medium tracking-wide">{v}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ── GALLERY FILMSTRIP ───────────────────── */}
        <section className="relative z-10 py-12 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <SectionHeading
              overline="Gallery"
              title="视觉集锦"
              subtitle="直播过程中的精彩瞬间与幕后花絮。鼠标悬停暂停滚动。"
            />
            <div className="overflow-hidden space-y-3 md:space-y-4">
              {/* Row 1 */}
              <GalleryFilmstrip
                images={Array.from({ length: 10 }, (_, i) => `still-${String(i + 1).padStart(2, '0')}.jpg`)}
                imageBase={project.imageBase}
                onImageClick={(i) => setLightboxIndex(i)}
              />
              {/* Row 2 — reverse direction */}
              <GalleryFilmstrip
                images={Array.from({ length: 10 }, (_, i) => `still-${String(i + 11).padStart(2, '0')}.jpg`)}
                imageBase={project.imageBase}
                onImageClick={(i) => setLightboxIndex(i + 10)}
                reverse
              />
              {/* Row 3 */}
              <GalleryFilmstrip
                images={Array.from({ length: 10 }, (_, i) => `still-${String(i + 21).padStart(2, '0')}.jpg`)}
                imageBase={project.imageBase}
                onImageClick={(i) => setLightboxIndex(i + 20)}
              />
            </div>
          </div>
        </section>

        <Lightbox
          images={Array.from({ length: 30 }, (_, i) => `${project.imageBase}still-${String(i + 1).padStart(2, '0')}.jpg`)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />

        {/* ── OUTRO / CREDITS ──────────────────────── */}
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent/50 block mb-8">Credits</span>
            <h2 className="text-3xl md:text-5xl font-display text-white tracking-wide mb-8">{project.client}</h2>
            <div className="space-y-2 text-sm text-white/30 tracking-wide leading-relaxed">
              <p>导演 Director: 付浩洋</p>
              <p>摄影 Cinematographer: ——</p>
              <p>剪辑 Editor: ——</p>
              <p>调色 Colorist: ——</p>
              <p>制作 Production: ——</p>
            </div>
          </motion.div>
        </section>
      </article>
    </>
  )
}
