# Prepara las 16 caras de Guillermo a partir de la hoja aprobada (4 columnas × 4 filas).
# Uso: python -I preparar-sprites.py hoja.webp assets/guillermo
# La hoja trae fondo transparente con bordes semitransparentes de compresión: se pasa a alfa
# binario y se descartan motas sueltas (la gota de sudor y la nube de aire son grandes: quedan).
# Las caras se alinean registrando cada una contra la primera (pelo y campera iguales), así el
# parpadeo y los cambios de cara no saltan. No se reescala ni se redibuja nada.
# Imprime las medidas que usa script.js (GUILLE en la sección de Guillermo).
import sys, json, os
import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert("RGBA")).astype(np.int16)
opaco = im[:, :, 3] >= 128
MOTA = 40     # componentes más chicas que esto (en píxeles) son residuos del fondo
BUSCA = 24    # corrimiento máximo que se prueba al alinear (en píxeles)
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

celdas = []
for (y0, y1) in filas:
    for (x0, x1) in cols:
        celdas.append((x0, y0, limpiar(im[y0:y1, x0:x1])))

# alineación: para cada cara, el corrimiento que más coincide con la primera (silueta y color)
def lienzo(c, dx, dy, W, H, ox, oy):
    out = np.zeros((H, W, 4), np.int16)
    x0, y0, px = c
    h, w = px.shape[:2]
    X, Y = x0 - ox + dx, y0 - oy + dy
    out[Y:Y + h, X:X + w] = px
    return out

# marco de trabajo relativo a cada celda: todas se superponen sobre la celda de referencia
ref_x0, ref_y0, ref = celdas[0]
M = BUSCA + 40
W = max(c[2].shape[1] for c in celdas) + 2 * M
H = max(c[2].shape[0] for c in celdas) + 2 * M
def en_marco(c, dx, dy):
    x0, y0, px = c
    out = np.zeros((H, W, 4), np.int16)
    h, w = px.shape[:2]
    out[M + dy:M + dy + h, M + dx:M + dx + w] = px
    return out

R = en_marco(celdas[0], 0, 0)
Ra = R[:, :, 3] > 0
corr = []
for i, c in enumerate(celdas):
    if i == 0: corr.append((0, 0, 0)); continue
    def costo(dx, dy):
        C = en_marco(c, dx, dy)
        Ca = C[:, :, 3] > 0
        difcol = (np.abs(R[:, :, :3] - C[:, :, :3]).sum(2) > 90) & Ra & Ca
        return int((Ra ^ Ca).sum() + difcol.sum())
    # primero de a 3 píxeles y después fino alrededor del mejor
    gruesa = min(((dx, dy, costo(dx, dy)) for dy in range(-BUSCA, BUSCA + 1, 3) for dx in range(-BUSCA, BUSCA + 1, 3)), key=lambda t: t[2])
    corr.append(min(((dx, dy, costo(dx, dy)) for dy in range(gruesa[1] - 3, gruesa[1] + 4) for dx in range(gruesa[0] - 3, gruesa[0] + 4)), key=lambda t: t[2]))

marcos = [en_marco(c, dx, dy) for c, (dx, dy, _) in zip(celdas, corr)]
union = np.zeros((H, W), bool)
for f in marcos: union |= f[:, :, 3] > 0
ys, xs = np.where(union)
pad = 4
x_a, x_b = xs.min() - pad, xs.max() + 1 + pad
y_a, y_b = ys.min() - pad, ys.max() + 1
# ancho par y centrado en la campera (franja de abajo de la primera cara)
base = marcos[0][y_b - 12:y_b, :, 3] > 0
bx = np.where(base.any(0))[0]
centro = (bx.min() + bx.max() + 1) / 2
medio = max(centro - x_a, x_b - centro)
x_a, x_b = int(np.floor(centro - medio)), int(np.ceil(centro + medio))
FW, FH = int(x_b - x_a), int(y_b - y_a)
FW += FW % 2

tira = np.zeros((FH, FW * 16, 4), np.uint8)
meta = {"w": FW, "h": FH, "caras": nombres}
for i, f in enumerate(marcos):
    tira[:, i * FW:i * FW + (x_b - x_a)] = f[y_a:y_b, x_a:x_b].astype(np.uint8)
    print(nombres[i], "corrimiento", corr[i][:2], "diferencia", corr[i][2])

def cuadro(i): return tira[:, i * FW:(i + 1) * FW].astype(np.int16)

# boca: interior rojo oscuro de la boca abierta (mordida y mordida final)
def boca(i):
    f = cuadro(i)
    r, g, b, a = f[:, :, 0], f[:, :, 1], f[:, :, 2], f[:, :, 3]
    m = (a > 0) & (r > 120) & (g < 90) & (b < 100) & (r - g > 80)
    m[int(FH * 0.85):] = False
    ys, xs = np.where(m)
    return [int(round((xs.min() + xs.max()) / 2)), int(round((ys.min() + ys.max()) / 2)), int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]

meta["boca"] = {"mordida": boca(9), "mordidaFinal": boca(10), "alegria": boca(2)}
# ojos de la cara de espera (píxeles casi negros dentro de la cara, para ubicar el centro de la cara)
f0 = cuadro(0)
piel = (f0[:, :, 3] > 0) & (f0[:, :, 0] > 220) & (f0[:, :, 1] > 150) & (f0[:, :, 1] < 215) & (f0[:, :, 2] < 170)
ys, xs = np.where(piel)
meta["piel"] = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
# cuello: primera fila (desde arriba de la piel) donde empieza la capucha beige a lo ancho
capucha = (f0[:, :, 3] > 0) & (np.abs(f0[:, :, 0] - 235) < 25) & (np.abs(f0[:, :, 1] - 220) < 25) & (np.abs(f0[:, :, 2] - 195) < 30)
filas_cap = [y for y in range(FH) if capucha[y].sum() > 6]
meta["capucha"] = filas_cap[0] if filas_cap else None

os.makedirs(out, exist_ok=True)
img = Image.fromarray(tira, "RGBA")
img.quantize(colors=128, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(os.path.join(out, "caras.png"), optimize=True)
print(json.dumps(meta))
