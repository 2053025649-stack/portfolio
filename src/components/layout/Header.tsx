import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import MobileMenu from './MobileMenu'
import { NAV_ITEMS } from '@/lib/constants'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-dark-800/80 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-lg md:text-xl font-display tracking-wide text-white hover:text-accent transition-colors duration-300">
            Portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = router.pathname === item.href.split('?')[0] && (!item.href.includes('category') || router.asPath === item.href)
              return (
                <Link key={item.href} href={item.href}
                  className={`relative px-4 py-2 text-sm tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-surface-muted hover:text-white'}`}
                >
                  {item.label}
                  {isActive && <motion.span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-accent rounded-full" layoutId="nav-indicator" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                </Link>
              )
            })}
          </nav>
          <button onClick={() => setIsOpen(true)} className="md:hidden flex flex-col gap-1.5 p-2 -mr-2" aria-label="打开菜单">
            <motion.span className="block w-5 h-[1.5px] bg-white origin-center" animate={isOpen ? { rotate: 45, y: -2 } : {}} />
            <motion.span className="block w-5 h-[1.5px] bg-white" animate={isOpen ? { opacity: 0 } : {}} />
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
