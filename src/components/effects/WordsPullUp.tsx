'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  showAsterisk?: boolean
  style?: React.CSSProperties
}

export default function WordsPullUp({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  showAsterisk = false,
  style,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  const words = text.split(' ')

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`} style={style}>
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1
        return (
          <span key={wi} className="inline-block mr-[0.25em] relative">
            <motion.span
              className="inline-block"
              initial={hydrated ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
              animate={
                isInView
                  ? { y: 0, opacity: 1 }
                  : { y: 20, opacity: 0 }
              }
              transition={{
                delay: delay + wi * stagger,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {isLast && showAsterisk && (
              <sup
                className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none"
                style={{ pointerEvents: 'none' }}
              >
                *
              </sup>
            )}
          </span>
        )
      })}
    </div>
  )
}
