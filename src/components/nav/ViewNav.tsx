type ViewName = 'home' | 'about' | 'work'

interface ViewNavProps { currentView: ViewName; onNavigate: (view: ViewName) => void }

const ITEMS: { key: ViewName; label: string }[] = [
  { key: 'home', label: 'Index' },
  { key: 'about', label: 'About' },
  { key: 'work', label: 'Work' },
]

export default function ViewNav({ currentView, onNavigate }: ViewNavProps) {
  if (currentView === 'home') return null
  return (
    <nav className="fixed top-[35px] right-[38px] md:right-[50px] z-40 flex gap-6 md:gap-8">
      {ITEMS.map((item) => (
        <button key={item.key} onClick={() => onNavigate(item.key)} className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${currentView === item.key ? 'text-sage-light' : 'text-sage-muted hover:text-sage'}`}>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
