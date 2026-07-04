import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const portfolioDir = path.join(root, 'content', 'portfolio')

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png']

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const basename = path.basename(filePath, ext)
  const dir = path.dirname(filePath)
  const originalSize = fs.statSync(filePath).size

  const image = sharp(filePath)
  const metadata = await image.metadata()

  // Determine max width based on filename
  const isThumbnail = basename === 'thumbnail'
  const maxWidth = isThumbnail ? 800 : 1920

  let pipeline = image
  // Only resize if image is wider than max
  if (metadata.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth)
  }

  // Output as JPEG at quality 80 for photos
  const outPath = path.join(dir, `${basename}_compressed${ext}`)

  if (ext === '.png') {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(outPath)
  } else {
    await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(outPath)
  }

  const compressedSize = fs.statSync(outPath).size
  const savings = ((1 - compressedSize / originalSize) * 100).toFixed(0)

  // Replace original with compressed
  fs.unlinkSync(filePath)
  fs.renameSync(outPath, filePath)

  return { file: path.relative(portfolioDir, filePath), original: originalSize, compressed: compressedSize, savings }
}

async function main() {
  const results = []

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
        results.push(full)
      }
    }
  }
  walk(portfolioDir)

  console.log(`找到 ${results.length} 张图片，开始压缩...\n`)

  let totalOriginal = 0
  let totalCompressed = 0

  for (const file of results) {
    try {
      const r = await compressImage(file)
      totalOriginal += r.original
      totalCompressed += r.compressed
      const marker = Number(r.savings) > 50 ? '🔥' : Number(r.savings) > 20 ? '✅' : '➖'
      console.log(`${marker} ${r.file}: ${(r.original/1024).toFixed(0)}KB → ${(r.compressed/1024).toFixed(0)}KB (-${r.savings}%)`)
    } catch (e) {
      console.log(`❌ ${path.relative(portfolioDir, file)}: ${e.message}`)
    }
  }

  const totalSavings = ((1 - totalCompressed / totalOriginal) * 100).toFixed(0)
  console.log(`\n总计: ${(totalOriginal/1024/1024).toFixed(1)}MB → ${(totalCompressed/1024/1024).toFixed(1)}MB (-${totalSavings}%)`)
}

main()
