import { motion } from 'framer-motion'

interface HomeViewProps { name: string; title: string; onEnter: () => void }

export default function HomeView({ name, title, onEnter }: HomeViewProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center">
        <h1 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-display text-sage-light leading-none tracking-tight">{name}</h1>
        <p className="mt-4 text-sm md:text-base text-sage-muted tracking-[0.15em] uppercase">{title}</p>
      </motion.div>
      <motion.button onClick={onEnter} className="mt-16 text-sage-muted hover:text-sage-light text-sm tracking-[0.2em] uppercase transition-colors duration-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        [ Enter ]
      </motion.button>
    </div>
  )
}
