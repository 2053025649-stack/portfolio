import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SEO, { SEOProps } from './SEO'

interface LayoutProps {
  children: ReactNode
  seo?: SEOProps
}

export default function Layout({ children, seo }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-800 text-gray-200 flex flex-col">
      <SEO {...seo} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
