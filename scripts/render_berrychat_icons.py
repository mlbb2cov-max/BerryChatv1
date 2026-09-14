import zlib
import struct
import math
import os

def write_png(filename, width, height, rgba_data):
    """Write an RGBA bytearray to a valid PNG file using pure standard library."""
    png = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png += struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)

    raw_lines = bytearray()
    for y in range(height):
        raw_lines.append(0)  # filter type 0
        start = y * width * 4
        raw_lines.extend(rgba_data[start:start + width * 4])

    compressed = zlib.compress(raw_lines, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)

    iend_crc = zlib.crc32(b'IEND')
    png += struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)

    with open(filename, 'wb') as f:
        f.write(png)

def cubic_bezier(p0, p1, p2, p3, steps=24):
    points = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1.0 - t
        x = mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0]
        y = mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1]
        points.append((x, y))
    segments = []
    for i in range(len(points) - 1):
        segments.append((points[i], points[i+1]))
    return segments

def dist_to_segment(px, py, seg):
    (x1, y1), (x2, y2) = seg
    dx = x2 - x1
    dy = y2 - y1
    l2 = dx*dx + dy*dy
    if l2 == 0:
        return math.hypot(px - x1, py - y1)
    t = max(0.0, min(1.0, ((px - x1)*dx + (py - y1)*dy) / l2))
    proj_x = x1 + t * dx
    proj_y = y1 + t * dy
    return math.hypot(px - proj_x, py - proj_y)

def render_barrychat_icon(size, is_maskable=False):
    # Base canvas coordinates: 512x512
    # If maskable, scale down to 76% and center
    scale = 0.76 if is_maskable else 0.90
    target_scale = (size / 512.0) * scale
    offset_x = (size - 512.0 * target_scale) / 2.0
    offset_y = (size - 512.0 * target_scale) / 2.0

    # Build branch segments
    branch_segments = []
    # Straight lines
    branch_segments.append(((120, 295), (62, 260)))
    branch_segments.append(((215, 258), (215, 288)))
    branch_segments.append(((388, 180), (378, 226)))
    branch_segments.append(((428, 248), (420, 262)))

    # Curves
    branch_segments.extend(cubic_bezier((72, 350), (95, 315), (150, 268), (215, 258)))
    branch_segments.extend(cubic_bezier((215, 258), (240, 180), (275, 145), (350, 118)))
    branch_segments.extend(cubic_bezier((350, 118), (375, 90), (395, 55), (405, 22)))
    branch_segments.extend(cubic_bezier((350, 118), (375, 140), (388, 175), (388, 190)))
    branch_segments.extend(cubic_bezier((388, 180), (405, 205), (418, 240), (428, 248)))
    branch_segments.extend(cubic_bezier((428, 248), (450, 255), (475, 255), (498, 242)))

    # Berries
    # (cx, cy, radius, fill_color)
    berries = [
        (68, 435, 54, (234, 142, 136)),   # #ea8e88 coral pink
        (212, 365, 56, (246, 201, 122)),  # #f6c97a apricot yellow
        (412, 342, 56, (234, 142, 136)),  # #ea8e88 coral pink
    ]

    notches = [
        ((68, 462), (68, 482)),
        ((212, 394), (212, 414)),
        ((412, 371), (412, 391)),
    ]

    branch_color = (74, 67, 76)  # #4a434c charcoal
    stroke_w_half = 8.5
    notch_w_half = 7.5

    rgba = bytearray(size * size * 4)

    for y in range(size):
        for x in range(size):
            # Default white background
            r, g, b, a = 255, 255, 255, 255

            # Map pixel (x, y) back to 512x512 space
            bx = (x - offset_x) / target_scale
            by = (y - offset_y) / target_scale

            # 1. Branch distance
            min_branch_d = 999.0
            for seg in branch_segments:
                d = dist_to_segment(bx, by, seg)
                if d < min_branch_d:
                    min_branch_d = d

            # 2. Check berries
            # Each berry has fill + outer stroke + notch
            # Process branch first
            if min_branch_d <= stroke_w_half + 1.2:
                # Anti-alias branch against background
                alpha = max(0.0, min(1.0, (stroke_w_half + 0.6 - min_branch_d) * target_scale))
                if alpha > 0:
                    r = int(r * (1.0 - alpha) + branch_color[0] * alpha)
                    g = int(g * (1.0 - alpha) + branch_color[1] * alpha)
                    b = int(b * (1.0 - alpha) + branch_color[2] * alpha)

            # Process berries (drawn on top)
            for (cx, cy, br, fill_c) in berries:
                d_center = math.hypot(bx - cx, by - cy)
                outer_r = br + stroke_w_half

                # Inside berry or stroke
                if d_center <= outer_r + 1.2:
                    # Is it on the stroke?
                    d_stroke = abs(d_center - br)
                    if d_stroke <= stroke_w_half + 0.6:
                        # Stroke pixel
                        st_alpha = max(0.0, min(1.0, (stroke_w_half + 0.6 - d_stroke) * target_scale))
                        r = int(r * (1.0 - st_alpha) + branch_color[0] * st_alpha)
                        g = int(g * (1.0 - st_alpha) + branch_color[1] * st_alpha)
                        b = int(b * (1.0 - st_alpha) + branch_color[2] * st_alpha)
                    elif d_center < br - stroke_w_half:
                        # Fully inside berry fill
                        r, g, b = fill_c[0], fill_c[1], fill_c[2]

            # Process notches (calyx lines)
            for seg in notches:
                d_notch = dist_to_segment(bx, by, seg)
                if d_notch <= notch_w_half + 0.8:
                    n_alpha = max(0.0, min(1.0, (notch_w_half + 0.5 - d_notch) * target_scale))
                    r = int(r * (1.0 - n_alpha) + branch_color[0] * n_alpha)
                    g = int(g * (1.0 - n_alpha) + branch_color[1] * n_alpha)
                    b = int(b * (1.0 - n_alpha) + branch_color[2] * n_alpha)

            idx = (y * size + x) * 4
            rgba[idx] = r
            rgba[idx + 1] = g
            rgba[idx + 2] = b
            rgba[idx + 3] = a

    return rgba

os.makedirs('public', exist_ok=True)
print("Rendering Berrychat PWA icons with white background...")

# 512x512
pwa_512 = render_barrychat_icon(512, is_maskable=False)
write_png('public/pwa-512x512.png', 512, 512, pwa_512)
print("Saved public/pwa-512x512.png")

# 512x512 maskable (safe zone padding)
pwa_maskable = render_barrychat_icon(512, is_maskable=True)
write_png('public/pwa-maskable-512x512.png', 512, 512, pwa_maskable)
print("Saved public/pwa-maskable-512x512.png")

# 192x192
pwa_192 = render_barrychat_icon(192, is_maskable=False)
write_png('public/pwa-192x192.png', 192, 192, pwa_192)
print("Saved public/pwa-192x192.png")

# 180x180 apple touch icon
pwa_apple = render_barrychat_icon(180, is_maskable=False)
write_png('public/apple-touch-icon.png', 180, 180, pwa_apple)
print("Saved public/apple-touch-icon.png")

# 64x64 favicon
pwa_64 = render_barrychat_icon(64, is_maskable=False)
write_png('public/favicon.ico', 64, 64, pwa_64)
print("Saved public/favicon.ico")

print("All Berrychat icons generated successfully!")
