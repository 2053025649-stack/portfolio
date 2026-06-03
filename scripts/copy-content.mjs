import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'content')
const publicDir = path.join(root, 'public', 'content')

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm']

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else if (entry.isFile() && IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) fs.copyFileSync(s, d)
  }
}

const pf = path.join(contentDir, 'portfolio')
if (fs.existsSync(pf)) {
  for (const p of fs.readdirSync(pf, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    copyDir(path.join(pf, p.name), path.join(publicDir, 'portfolio', p.name))
  }
}
console.log('Content files copied to public/')
