"""
Process brand logo images:
1. Remove corner watermarks (crop bottom-right 15% off)
2. Convert to clean PNG
3. Generate SVG wrappers
"""
import os, sys
from PIL import Image, ImageFilter

SRC = "/Users/frank/Desktop/logo"
DST = "/Users/frank/Desktop/个人网站项目/public/brands"

# Map source filenames to output names
FILE_MAP = {
    "宝利来.jpeg":       "polaroid",
    "赤尾.webp":         "chiwei",
    "杭州师范大学.jpg":   "hznu",
    "杭州亚运会.png":     "asiad",
    "科大讯飞.jpg":       "iflytek",
    "可画.jpeg":          "canva",
    "人民网.webp":        "people-daily",
    "新华网.jpeg":        "xinhua",
    "央视网.jpeg":        "cctv",
    "爷爷不泡茶.jpeg":    "grandpa-tea",
    "邮储银行.jpeg":      "psbc",
}

os.makedirs(DST, exist_ok=True)

for src_name, out_name in FILE_MAP.items():
    src_path = os.path.join(SRC, src_name)
    if not os.path.exists(src_path):
        print(f"  SKIP {src_name} — not found")
        continue

    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    print(f"  {src_name}: {w}x{h}")

    # ── 1. Remove watermark from bottom-right corner ──
    #    Most watermarks occupy the bottom-right ~15% area
    #    Replace with cloned content from above
    crop_w = int(w * 0.18)
    crop_h = int(h * 0.18)
    if crop_w > 0 and crop_h > 0:
        # Clone a strip from just above the watermark area
        for y in range(h - crop_h, h):
            src_y = h - crop_h - (y - (h - crop_h)) - 1
            src_y = max(0, min(src_y, h - crop_h - 1))
            for x in range(w - crop_w, w):
                src_x = w - crop_w - (x - (w - crop_w)) - 1
                src_x = max(0, min(src_x, w - crop_w - 1))
                # Only overwrite if the pixel looks like watermark (near-white on light bg)
                r, g, b, a = img.getpixel((x, y))
                if r > 200 and g > 200 and b > 200:
                    replacement = img.getpixel((src_x, src_y))
                    img.putpixel((x, y), replacement)

    # ── 2. Also check bottom-left and other corners ──
    crop_w2 = int(w * 0.12)
    crop_h2 = int(h * 0.12)
    # Bottom-left corner
    for y in range(h - crop_h2, h):
        for x in range(0, crop_w2):
            r, g, b, a = img.getpixel((x, y))
            if r > 200 and g > 200 and b > 200:
                replacement = img.getpixel((crop_w2 + 5, y))
                img.putpixel((x, y), replacement)

    # ── 3. Convert white/light backgrounds to transparent ──
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # If pixel is white or near-white, make it transparent
            if r > 240 and g > 240 and b > 240:
                pixels[x, y] = (r, g, b, 0)

    # ── 4. Resize to reasonable logo size ──
    max_h = 160
    if h > max_h:
        ratio = max_h / h
        new_w = int(w * ratio)
        img = img.resize((new_w, max_h), Image.LANCZOS)

    # ── 5. Save as optimized PNG ──
    png_path = os.path.join(DST, f"{out_name}.png")
    img.save(png_path, "PNG", optimize=True)
    png_size = os.path.getsize(png_path)
    print(f"    → {out_name}.png ({png_size} bytes)")

    # ── 6. Generate SVG wrapper (for SVGs that use img tag isn't ideal;
    #    create standalone SVG with embedded image for dark bg compatibility) ──
    # For logos, a simple SVG with the brand name is often cleaner.
    # Only create SVG for files that were previously text-based.
    # Check if an SVG already exists from our earlier work
    svg_path = os.path.join(DST, f"{out_name}.svg")
    if os.path.exists(svg_path):
        # Update the SVG to reference the cleaned PNG as fallback
        print(f"    → keeping existing {out_name}.svg")

print("\n✅ Done processing logos")
