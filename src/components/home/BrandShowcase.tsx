'use client'

import { useRef, useState } from 'react'

interface Brand {
  name: string
  file: string
}

const INHOUSE_BRANDS: Brand[] = [
  { name: '华为', file: 'huawei.png' },
  { name: '大疆创新', file: 'dji.svg' },
]

const PARTNER_BRANDS: Brand[] = [
  { name: '宝利来', file: 'polaroid.jpeg' },
  { name: '浙江省卫健委', file: 'zhejiang-health.svg' },
  { name: '杭州师范大学', file: 'hznu.jpg' },
  { name: '赤尾', file: 'chiwei.png' },
  { name: '邮政储蓄银行', file: 'psbc.png' },
  { name: '爷爷不泡茶', file: 'grandpa-tea.png' },
  { name: '泡泡玛特', file: 'popmart.svg' },
  { name: '人民网', file: 'people-daily.png' },
  { name: '央视网', file: 'cctv.png' },
  { name: '新华网', file: 'xinhua.png' },
  { name: '科大讯飞', file: 'iflytek.png' },
  { name: '杭州亚运会', file: 'asiad.png' },
  { name: '可画', file: 'canva.svg' },
]

function BrandBar({ brands, speed = 30 }: { brands: Brand[]; speed?: number }) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="group/bar overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-8 md:gap-12 items-center ${isPaused ? '[animation-play-state:paused]' : ''}`}
        style={{
          animation: `scroll-filmstrip ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={`${brand.file}-${i}`}
            className="flex-shrink-0 flex items-center"
          >
            <div className="bg-white/[0.04] rounded-xl px-4 py-2.5 flex items-center justify-center ring-1 ring-white/[0.04] hover:bg-white/[0.07] transition-colors duration-400">
              <img
                src={`/brands/${brand.file}`}
                alt={brand.name}
                className="h-7 md:h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandShowcase() {
  return (
    <section className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-display text-white tracking-wide mb-3">
            合作品牌
          </h2>
          <p className="text-sm text-surface-muted tracking-wide">
            Inhouse 品牌与长期合作伙伴
          </p>
        </div>

        {/* Inhouse — prominent static row */}
        <div className="mb-10 md:mb-14">
          <span className="text-[10px] tracking-[0.2em] uppercase text-surface-faint mb-5 block">
            Inhouse
          </span>
          <div className="flex gap-6 md:gap-10 items-center">
            {INHOUSE_BRANDS.map((brand) => (
              <div key={brand.file} className="bg-white/[0.05] rounded-2xl px-6 py-4 flex items-center justify-center ring-1 ring-white/[0.06]">
                <img
                  src={`/brands/${brand.file}`}
                  alt={brand.name}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Partners — scrolling marquee */}
        <div className="pt-8 md:pt-10 border-t border-white/[0.03]">
          <span className="text-[10px] tracking-[0.2em] uppercase text-surface-faint mb-5 block">
            Partners
          </span>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <BrandBar brands={PARTNER_BRANDS.slice(0, 8)} speed={35} />
      <div className="mt-6 md:mt-8">
        <BrandBar brands={PARTNER_BRANDS.slice(7)} speed={30} />
      </div>
    </section>
  )
}
