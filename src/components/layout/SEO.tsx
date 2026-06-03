import Head from 'next/head'

export interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
}

export default function SEO({ title, description, ogImage }: SEOProps) {
  const siteName = '付浩洋 — 广告导演 / 直播导播'
  const fullTitle = title ? `${title} — ${siteName}` : siteName
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || '广告导演 / 直播导演作品集'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || '广告导演 / 直播导演作品集'} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
