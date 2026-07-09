'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Segment {
  text: string
  className: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  delay?: number
  stagger?: number
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  delay = 0,
  stagger = 0.08,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  // Flatten all segments into a single word array, preserving per-word className
  const items: { word: string; className: string }[] = []
  for (const seg of segments) {
    const segWords = seg.text.trim().split(/\s+/)
    for (const w of segWords) {
      items.push({ word: w, className: seg.className })
    }
  }

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.2em] ${item.className}`}
          initial={hydrated ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
          animate={
            isInView
              ? { y: 0, opacity: 1 }
              : { y: 20, opacity: 0 }
          }
          transition={{
            delay: delay + i * stagger,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  )
}
