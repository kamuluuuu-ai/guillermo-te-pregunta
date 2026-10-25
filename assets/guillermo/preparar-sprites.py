# Prepara las 16 caras de Guillermo a partir de la hoja aprobada (4 columnas × 4 filas).
# Uso: python -I preparar-sprites.py hoja.webp assets/guillermo
# La hoja es pixel art agrandado: cada píxel del dibujo es un bloque de unos 11 × 12 píxeles,
# con bordes suaves y ruido de compresión, y la grilla no es exacta (varía de una cara a otra).
# Achicada en el navegador se ve borrosa, así que cada cara se lleva a su grilla real:
#   1. alfa binario y se descartan motas sueltas (la gota de sudor y la nube de aire quedan);
#   2. se buscan las líneas de la grilla de esa cara (donde cambia el color), con separación
#      de 9 a 14 píxeles;
#   3. cada bloque pasa a ser un píxel: el color del medio del bloque (mediana) y opaco si la
#      mayoría del bloque lo es. No se agrega ni se inventa nada: es el mismo dibujo, nítido.
# Después las caras se alinean contra la primera (pelo y campera iguales), así el parpadeo y
# los cambios de cara no saltan. Imprime las medidas que usa script.js (GUILLE).
import sys, json, os
import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert("RGBA")).astype(np.int16)
opaco = im[:, :, 3] >= 128
MOTA = 40           # componentes más chicas que esto (en píxeles de la hoja) son residuos del fondo
PASO = (9, 14)      # separación posible entre líneas de la grilla (en píxeles de la hoja)
SUB = 2             # cada bloque de la grilla se parte en SUB × SUB píxeles
BUSCA = 6           # corrimiento máximo al alinear (en píxeles de la tira)
nombres = ["espera", "parpadeo", "alegria", "animo", "pensando", "sorpresa", "molesto", "enojado",
           "furioso", "mordida", "mordidaFinal", "lleno", "alivio", "nervioso", "asustado", "aturdido"]

def bandas(v):
    out, s = [], None
    for i, c in enumerate(v):
        if c and s is None: s = i
        if not c and s is not None: out.append((s, i)); s = None
    if s is not None: out.append((s, len(v)))
    return out

cols, filas = bandas(opaco.any(0)), bandas(opaco.any(1))
assert len(cols) == 4 and len(filas) == 4, (cols, filas)

def limpiar(rgba):
    a = rgba[:, :, 3] >= 128
    H, W = a.shape
    visto = np.zeros_like(a)
    for y in range(H):
        for x in range(W):
            if a[y, x] and not visto[y, x]:
                pila, pts = [(x, y)], []
                visto[y, x] = True
                while pila:
                    u, v = pila.pop(); pts.append((u, v))
                    for du in (-1, 0, 1):
                        for dv in (-1, 0, 1):
                            p, q = u + du, v + dv
                            if 0 <= p < W and 0 <= q < H and a[q, p] and not visto[q, p]:
                                visto[q, p] = True; pila.append((p, q))
                if len(pts) < MOTA:
                    for u, v in pts: a[v, u] = False
    rgba = rgba.copy()
    rgba[:, :, 3] = np.where(a, 255, 0)
    rgba[~a] = 0
    return rgba

# líneas de la grilla en un eje: los cortes con más cambio de color, separados entre PASO[0] y PASO[1]
def cortes(g):
    g = np.convolve(g, [1, 2, 1], "same")
    L = len(g)
    mejor = np.full(L + 1, -np.inf); antes = np.full(L + 1, -1)
    for k in range(PASO[1] + 1): mejor[k] = g[k] if k < L else 0
    for k in range(1, L + 1):
        v = g[k] if k < L else 0
        for d in range(PASO[0], PASO[1] + 1):
            j = k - d
            if j >= 0 and mejor[j] + v > mejor[k]: mejor[k], antes[k] = mejor[j] + v, j
    fin = max(range(L - PASO[1], L + 1), key=lambda k: mejor[k])
    out = [fin]
    while antes[out[-1]] >= 0: out.append(antes[out[-1]])
    return out[::-1]

def a_grilla(px):
    rgb = px[:, :, :3].astype(float) * (px[:, :, 3:] > 0)
    gx = np.abs(np.diff(rgb, axis=1)).sum(2).sum(0); gx = np.concatenate([[0], gx])
    gy = np.abs(np.diff(rgb, axis=0)).sum(2).sum(1); gy = np.concatenate([[0], gy])
    cx, cy = cortes(gx), cortes(gy)
    # los bordes también son líneas: el dibujo puede empezar antes del primer corte
    if cx[0] > PASO[0] // 2: cx = [max(0, cx[0] - (cx[1] - cx[0]))] + cx
    if cy[0] > PASO[0] // 2: cy = [max(0, cy[0] - (cy[1] - cy[0]))] + cy
    # cada bloque se parte en SUB × SUB: los detalles finos (sonrisa, ojos cerrados, cruces)
    # son más finos que un bloque y así no se pierden
    cx = [round(cx[k] + (cx[k + 1] - cx[k]) * t / SUB) for k in range(len(cx) - 1) for t in range(SUB)] + [cx[-1]]
    cy = [round(cy[k] + (cy[k + 1] - cy[k]) * t / SUB) for k in range(len(cy) - 1) for t in range(SUB)] + [cy[-1]]
    H, W = len(cy) - 1, len(cx) - 1
    out = np.zeros((H, W, 4), np.uint8)
    for j in range(H):
        for i in range(W):
            y0, y1, x0, x1 = cy[j], cy[j + 1], cx[i], cx[i + 1]
            my, mx = max(1, (y1 - y0) // 4), max(1, (x1 - x0) // 4)
            b = px[y0 + my:y1 - my, x0 + mx:x1 - mx]
            if b.size == 0: continue
            a = b[:, :, 3] > 0
            if a.mean() < 0.5: continue
            out[j, i, :3] = np.median(b[a][:, :3], axis=0)
            out[j, i, 3] = 255
    return out, (np.diff(cx).mean(), np.diff(cy).mean())

caras = []
for (y0, y1) in filas:
    for (x0, x1) in cols:
        g, paso = a_grilla(limpiar(im[y0:y1, x0:x1]))
        caras.append(g)
        print(nombres[len(caras) - 1], "grilla", g.shape[1], "×", g.shape[0], "paso %.1f × %.1f" % paso)

# alineación: para cada cara, el corrimiento que más coincide con la primera (silueta y color)
M = BUSCA + 2
H = max(c.shape[0] for c in caras) + 2 * M
W = max(c.shape[1] for c in caras) + 2 * M
def en_marco(c, dx, dy):
    out = np.zeros((H, W, 4), np.int16)
    h, w = c.shape[:2]
    y = M + dy + (H - 2 * M - h)  # apoyadas abajo (la campera)
    x = M + dx + (W - 2 * M - w) // 2
    out[y:y + h, x:x + w] = c
    return out
R = en_marco(caras[0], 0, 0); Ra = R[:, :, 3] > 0
corr = [(0, 0, 0)]
for c in caras[1:]:
    def costo(dx, dy):
        C = en_marco(c, dx, dy); Ca = C[:, :, 3] > 0
        difcol = (np.abs(R[:, :, :3] - C[:, :, :3]).sum(2) > 90) & Ra & Ca
        return int((Ra ^ Ca).sum() + difcol.sum())
    corr.append(min(((dx, dy, costo(dx, dy)) for dy in range(-BUSCA, BUSCA + 1) for dx in range(-BUSCA, BUSCA + 1)), key=lambda t: t[2]))

marcos = [en_marco(c, dx, dy) for c, (dx, dy, _) in zip(caras, corr)]
union = np.zeros((H, W), bool)
for f in marcos: union |= f[:, :, 3] > 0
ys, xs = np.where(union)
y_a, y_b, x_a, x_b = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
FW, FH = int(x_b - x_a), int(y_b - y_a)

tira = np.zeros((FH, FW * 16, 4), np.uint8)
for i, f in enumerate(marcos):
    tira[:, i * FW:(i + 1) * FW] = f[y_a:y_b, x_a:x_b].astype(np.uint8)
    print(nombres[i], "corrimiento", corr[i][:2], "diferencia", corr[i][2])

def cuadro(i): return tira[:, i * FW:(i + 1) * FW].astype(np.int16)

# boca: centro del interior rojo de la boca abierta
def boca(i):
    f = cuadro(i)
    r, g, b, a = f[:, :, 0], f[:, :, 1], f[:, :, 2], f[:, :, 3]
    m = (a > 0) & (r > 110) & (g < 90) & (b < 100) & (r - g > 70)
    m[int(FH * 0.85):] = False
    ys, xs = np.where(m)
    return [round(float(np.median(xs)) + 0.5, 1), round(float(np.median(ys)) + 0.5, 1)]

# ojos de la cara de espera: los dos bloques negros dentro de la piel
f0 = cuadro(0)
negro = (f0[:, :, 3] > 0) & (f0[:, :, :3].max(2) < 50)
piel = (f0[:, :, 3] > 0) & (f0[:, :, 0] > 200) & (f0[:, :, 1] > 140) & (f0[:, :, 2] < 170)
filas_piel = np.where(piel.sum(1) > FW * 0.3)[0]
ojos = negro.copy(); ojos[:filas_piel.min()] = False; ojos[int(FH * 0.75):] = False
ys, xs = np.where(ojos & (np.arange(FW)[None, :] > FW * 0.25) & (np.arange(FW)[None, :] < FW * 0.75))
meta = {"w": FW, "h": FH, "caras": nombres,
        "boca": {"mordida": boca(9), "mordidaFinal": boca(10), "alivio": boca(12)},
        "ojos": [round(float(xs.mean()) + 0.5, 1), round(float(ys.mean()) + 0.5, 1)]}

os.makedirs(out, exist_ok=True)
Image.fromarray(tira, "RGBA").save(os.path.join(out, "caras.png"), optimize=True)
print(json.dumps(meta))
