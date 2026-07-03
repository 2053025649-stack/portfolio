'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface DecryptedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  speed?: number
  chars?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const DEFAULT_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function DecryptedText({
  text,
  className = '',
  delay = 0,
  duration = 2,
  speed = 40,
  chars = DEFAULT_CHARS,
  as: Tag = 'p',
}: DecryptedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!isInView || started) return
    setStarted(true)

    const timeout = setTimeout(() => {
      let frame = 0
      const totalFrames = Math.floor((duration * 1000) / speed)
      const interval = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const revealed = Math.floor(progress * text.length)

        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (i < revealed) return char
              if (char === ' ') return ' '
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(''),
        )

        if (frame >= totalFrames) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, started, text, duration, speed, chars, delay])

  return (
    <Tag ref={ref} className={className}>
      {display}
    </Tag>
  )
}
