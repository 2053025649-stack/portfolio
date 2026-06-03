import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const portfolioDir = path.join(root, 'content', 'portfolio')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve))
}

async function main() {
  console.log('\n🎬 创建新作品\n' + '='.repeat(40))

  const title = await ask('作品名称：')
  const category = await ask('分类 (ad=广告 / live=直播)：')
  const client = await ask('客户名称：')
  const year = await ask('年份：')
  const xinpianchangUrl = await ask('新片场嵌入链接 (可选，直接回车跳过)：')

  // Generate slug from title (keep Chinese, just remove special chars)
  const slug = title
    .trim()
    .replace(/[\/\\?%*:|"<>]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase() || 'untitled'

  const projectDir = path.join(portfolioDir, slug)
  fs.mkdirSync(projectDir, { recursive: true })

  const md = `---
title: "${title}"
category: ${category || 'ad'}
client: "${client}"
year: ${year || new Date().getFullYear()}
order: 99
xinpianchangUrl: "${xinpianchangUrl}"
coverImage: "cover.jpg"
thumbnail: "thumbnail.jpg"
tags: []
featured: false
stills: []
---

## 项目背景

请在此处填写项目背景介绍。

## 创意理念

请在此处填写创意理念。

## 幕后制作

请在此处填写幕后制作细节。
`

  fs.writeFileSync(path.join(projectDir, 'index.md'), md, 'utf-8')

  console.log('')
  console.log('✅ 项目已创建！')
  console.log('')
  console.log('📁 文件位置：')
  console.log(`   content/portfolio/${slug}/`)
  console.log('')
  console.log('📝 下一步：')
  console.log('   1. 将图片文件放入上述文件夹：')
  console.log('      - cover.jpg     (封面大图，建议 1920×1080)')
  console.log('      - thumbnail.jpg (卡片缩略图，建议 800×450)')
  console.log('      - still-01.jpg, still-02.jpg ... (静帧截图)')
  console.log('      - brand-logo.png (品牌 Logo，可选)')
  console.log('')
  console.log('   2. 编辑 index.md 完善作品描述')
  console.log('   3. 运行 npm run dev 在浏览器预览')
  console.log('   4. 运行 npm run deploy 发布上线')
  console.log('')

  rl.close()
}

main().catch((err) => {
  console.error(err)
  rl.close()
  process.exit(1)
})
