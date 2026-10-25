# Prepara los sprites del comodín «Cambiar pregunta» (el que dispara a la pregunta)
# a partir de la hoja de 4 poses (2 filas × 2): reposo, preparación / apuntando, disparando.
# Uso: python -I preparar-sprites.py hoja.webp assets/cambio-disparo
# La hoja ya trae el fondo transparente, pero con ruido semitransparente de compresión:
# se pasa a alfa binario, se descartan motas sueltas (el fogonazo sí se conserva: son bloques
# grandes), se alinean las poses por los pies en cuadros del mismo tamaño y se arma una tira
# horizontal + el retrato. Imprime las medidas que usa script.js (ELIAS en la sección del comodín).
import sys, json, os
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGBA")
# cajas (x0, x1, y0, y1) medidas sobre la hoja original de 1296 × 1213
cells = [(165, 487, 41, 635), (690, 1052, 41, 635), (94, 567, 651, 1185), (659, 1252, 651, 1185)]
names = ["reposo", "preparacion", "apuntando", "disparando"]
MOTA = 40  # componentes más chicas que esto (en píxeles) son residuos del fondo

sprites = []
for (x0, x1, y0, y1) in cells:
    c = im.crop((x0 - 6, y0 - 6, x1 + 7, y1 + 7))
    px = c.load(); W, H = c.size
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            px[x, y] = (r, g, b, 255) if a >= 128 else (0, 0, 0, 0)
    seen = [[False] * W for _ in range(H)]; comps = []
    for y in range(H):
        for x in range(W):
            if px[x, y][3] and not seen[y][x]:
                st = [(x, y)]; seen[y][x] = True; pts = []
                while st:
                    a, b = st.pop(); pts.append((a, b))
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
                        u, v = a + dx, b + dy
                        if 0 <= u < W and 0 <= v < H and not seen[v][u] and px[u, v][3]:
                            seen[v][u] = True; st.append((u, v))
                comps.append(pts)
    comps.sort(key=len, reverse=True)
    dropped = [len(p) for p in comps[1:] if len(p) < MOTA]
    for p in comps[1:]:
        if len(p) < MOTA:
            for a, b in p: px[a, b] = (0, 0, 0, 0)
    c = c.crop(c.getbbox()); px = c.load(); W, H = c.size
    # ancla: punto medio entre los championes (blancos) en la franja de abajo
    shoes = [x for y in range(H - 50, H) for x in range(W) if px[x, y][3] and min(px[x, y][:3]) > 200]
    ax = (min(shoes) + max(shoes)) / 2
    # fogonazo: píxeles naranja/amarillos (solo en la pose de disparo)
    fuego = [(x, y) for y in range(H) for x in range(W) if px[x, y][3] and px[x, y][0] > 200 and px[x, y][1] > 120 and px[x, y][2] < 90]
    sprites.append((c, ax, fuego, len(comps), dropped))

L = max(ax for c, ax, *_ in sprites); R = max(c.size[0] - ax for c, ax, *_ in sprites); T = max(c.size[1] for c, *_ in sprites)
pad = 4
FW = int(round(L + R)) + 2 * pad; FW += FW % 2
FH = T + pad
AX = pad + L
strip = Image.new("RGBA", (FW * len(sprites), FH), (0, 0, 0, 0))
meta = {"w": FW, "h": FH, "ancla": [round(AX), FH - 1], "poses": names}
for i, (c, ax, fuego, nc, dr) in enumerate(sprites):
    ox = int(round(AX - ax)); oy = FH - c.size[1]
    strip.paste(c, (i * FW + ox, oy), c)
    print(names[i], "tamaño", c.size, "componentes", nc, "descartadas", dr, "fogonazo px", len(fuego))
    if fuego:
        xs = [x for x, y in fuego]; ys = [y for x, y in fuego]
        # boca del caño: borde izquierdo del fogonazo, a su altura media
        meta["boca"] = [ox + min(xs), oy + round((min(ys) + max(ys)) / 2)]
        meta["fogonazo"] = [ox + min(xs), oy + min(ys), ox + max(xs), oy + max(ys)]
os.makedirs(out, exist_ok=True)
strip.quantize(colors=128, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(os.path.join(out, "poses.png"), optimize=True)
# retrato: cabeza de la pose de reposo
c0 = sprites[0][0]
head = c0.crop((0, 0, c0.size[0], int(c0.size[1] * 0.5)))
head = head.crop(head.getbbox())
s = max(head.size); sq = Image.new("RGBA", (s, s), (0, 0, 0, 0)); sq.paste(head, ((s - head.size[0]) // 2, s - head.size[1]), head)
sq.quantize(colors=64, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(os.path.join(out, "retrato.png"), optimize=True)
print(json.dumps(meta))
