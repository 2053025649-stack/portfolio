import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { href: '/', label: '首页' },
  { href: '/?category=featured', label: '精选作品' },
  { href: '/?category=aigc', label: 'AIGC' },
  { href: '/?category=ad', label: '广告作品' },
  { href: '/?category=live', label: '直播作品' },
  { href: '/?category=inhouse', label: 'Inhouse作品' },
  { href: '/?category=other', label: '其他作品' },
]

interface MobileMenuProps { onClose: () => void }

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[60] bg-dark-900 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex justify-end px-6 py-4">
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-sm tracking-widest uppercase p-2" aria-label="关闭菜单">关闭</button>
      </div>
      <nav className="flex-1 flex flex-col items-center justify-center gap-6">
        {NAV_ITEMS.map((item, i) => {
          const isActive = router.asPath === item.href
          return (
            <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Link href={item.href} onClick={onClose} className={`font-display text-3xl tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>{item.label}</Link>
            </motion.div>
          )
        })}
      </nav>
      <div className="text-center pb-10 text-gray-500 text-xs tracking-wider">&copy; {new Date().getFullYear()} Director</div>
    </motion.div>
  )
}
