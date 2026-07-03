import { Category } from './types'

export const CATEGORY_LABEL: Record<Category, string> = {
  ad: '广告作品',
  live: '直播作品',
  tutorial: 'Inhouse作品',
  story: 'DJI｜如影故事',
  inhouse: 'Inhouse作品',
  other: '其他作品',
}

export const CATEGORY_SHORT: Record<Category, string> = {
  ad: '广告',
  live: '直播',
  tutorial: 'Inhouse作品',
  story: 'Inhouse作品',
  inhouse: 'Inhouse作品',
  other: '其他',
}

export interface NavItem {
  href: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/?category=featured', label: '精选' },
  { href: '/?category=aigc', label: 'AIGC' },
  { href: '/?category=ad', label: '广告' },
  { href: '/?category=live', label: '直播' },
  { href: '/?category=inhouse', label: 'Inhouse作品' },
  { href: '/?category=other', label: '其他' },
]
