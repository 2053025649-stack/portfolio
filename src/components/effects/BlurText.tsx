'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function BlurText({
  text,
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.04,
  as: Tag = 'p',
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split('').map((char, ci) => {
            const idx = wi * 10 + ci
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={hydrated ? { filter: 'blur(10px)', opacity: 0, y: 20 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
                animate={
                  isInView
                    ? { filter: 'blur(0px)', opacity: 1, y: 0 }
                    : { filter: 'blur(10px)', opacity: 0, y: 20 }
                }
                transition={{
                  delay: delay + idx * stagger,
                  duration,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
