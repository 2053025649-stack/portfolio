export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-dark-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Director. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
