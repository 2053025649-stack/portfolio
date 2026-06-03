# 个人作品集网站

广告导演 / 直播导演作品展示网站。暗色调、奈飞风格，支持电脑和手机浏览。

## 快速开始

### 安装（只需一次）

```bash
npm install
```

### 预览网站

```bash
npm run dev
```

打开浏览器访问 `http://localhost:3000`

### 发布上线

```bash
npm run deploy
```

首次发布前需要登录 Vercel（只需一次）：

```bash
npx vercel login
```

然后绑定自定义域名（可选）：

```bash
npx vercel domain add your-domain.com
```

## 如何添加新作品

1. 在终端运行：

```bash
npm run new-project
```

2. 根据提示输入作品信息（作品名、分类、客户、年份、YouTube视频ID）

3. 脚本会自动创建项目文件夹，位置在：

```
content/portfolio/你的作品名称/
```

4. 把你的图片文件放入该文件夹：

| 文件名 | 用途 | 建议尺寸 |
|--------|------|---------|
| `cover.jpg` | 详情页封面大图 | 1920×1080 |
| `thumbnail.jpg` | 首页卡片缩略图 | 800×450 |
| `still-01.jpg`, `still-02.jpg` ... | 静帧截图 | 1920×1080 |
| `brand-logo.png` | 品牌 Logo（可选） | 200px 宽透明 PNG |

5. 用任意文本编辑器打开 `index.md` 编辑描述文字

6. 预览：`npm run dev`

7. 满意后发布：`npm run deploy`

## 如何修改作品

打开 `content/portfolio/作品名称/index.md`，编辑文字内容后保存，运行 `npm run deploy` 即可。

## 如何修改个人信息

| 文件 | 内容 |
|------|------|
| `content/site.json` | 姓名、职位、社交账号 |
| `content/about.md` | 关于我页面 |
| `content/contact.md` | 联系我页面 |

## 换电脑怎么办

1. 把整个项目文件夹复制到新电脑
2. 运行 `npm install`
3. 运行 `npx vercel login`
4. 一切照旧

## 注意事项

- 图片建议先压缩（推荐 [TinyPNG](https://tinypng.com/)），单张不超过 500KB
- YouTube 视频只需提供视频 ID 即可（例如 `https://www.youtube.com/watch?v=dQw4w9WgXcQ` 中的 `dQw4w9WgXcQ`）
- YouTube 在中国大陆可能无法直接访问，可考虑使用 Bilibili 嵌入
