import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Noto Serif SC — subset to latin + chinese-simplified; display=swap prevents FOIT */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap&subset=chinese-simplified,latin"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* Skip-to-content for keyboard users */}
        <a href="#main-content" className="skip-link">
          跳到内容
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
