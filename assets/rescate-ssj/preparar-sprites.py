# Prepara los sprites del comodín «Rescate SSJ» a partir de la hoja de 8 poses (2 filas × 4).
# Uso: python -I preparar-sprites.py hoja.webp assets/rescate-ssj
# Separa cada pose por transparencia, quita el halo semitransparente, alinea todas por los pies
# (base de los championes) en cuadros del mismo tamaño y arma una tira horizontal + el retrato.
import sys, json, os
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGBA")
cells=[(48,364,19,500),(434,723,19,500),(779,1098,19,500),(1164,1482,19,500),(27,349,518,998),(381,767,518,998),(815,1102,518,998),(1193,1503,518,998)]
names=["reposo","entrada","preparacion","ssj","carga","disparo","recuperacion","victoria"]
sprites=[]
for (x0,x1,y0,y1) in cells:
    c = im.crop((x0-6,y0-6,x1+7,y1+7))
    px=c.load(); W,H=c.size
    # alpha binario: fuera el halo semitransparente, el dibujo queda opaco
    for y in range(H):
        for x in range(W):
            r,g,b,a=px[x,y]
            px[x,y]=(r,g,b,255) if a>=128 else (0,0,0,0)
    # componentes conexas: se descartan motas sueltas
    seen=[[False]*W for _ in range(H)]; comps=[]
    for y in range(H):
        for x in range(W):
            if px[x,y][3] and not seen[y][x]:
                st=[(x,y)]; seen[y][x]=True; pts=[]
                while st:
                    a,b=st.pop(); pts.append((a,b))
                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)):
                        u,v=a+dx,b+dy
                        if 0<=u<W and 0<=v<H and not seen[v][u] and px[u,v][3]:
                            seen[v][u]=True; st.append((u,v))
                comps.append(pts)
    comps.sort(key=len, reverse=True)
    dropped=[len(p) for p in comps[1:] if len(p)<40]
    for p in comps[1:]:
        if len(p)<40:
            for a,b in p: px[a,b]=(0,0,0,0)
    bb=c.getbbox(); c=c.crop(bb); px=c.load(); W,H=c.size
    bot=H-1
    shoes=[x for y in range(H-60,H) for x in range(W) if px[x,y][3] and min(px[x,y][:3])>200]
    ax=(min(shoes)+max(shoes))/2
    sprites.append((c,ax,len(comps),dropped))
L=max(ax for c,ax,*_ in sprites); R=max(c.size[0]-ax for c,ax,*_ in sprites); T=max(c.size[1] for c,*_ in sprites)
pad=4
FW=int(round(L+R))+2*pad; FH=T+pad
FW+=FW%2
AX=pad+L
strip=Image.new("RGBA",(FW*len(sprites),FH),(0,0,0,0))
meta={"frameW":FW,"frameH":FH,"anchorX":round(AX),"anchorY":FH-1,"poses":names,"offsets":[]}
for i,(c,ax,nc,dr) in enumerate(sprites):
    ox=int(round(AX-ax)); oy=FH-c.size[1]
    strip.paste(c,(i*FW+ox,oy),c)
    meta["offsets"].append([ox,oy,c.size[0],c.size[1]])
    print(names[i],"comps",nc,"dropped",dr)
os.makedirs(out,exist_ok=True)
# 128 colores sin tramado: el original trae ruido de compresión, a la vista queda igual y pesa ~100 KB
strip.quantize(colors=128,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE).save(os.path.join(out,"poses.png"),optimize=True)
# retrato: cabeza de la pose de reposo
c0,ax0,*_=sprites[0]
head=c0.crop((0,0,c0.size[0],int(c0.size[1]*0.52)))
hb=head.getbbox(); head=head.crop(hb)
s=max(head.size); sq=Image.new("RGBA",(s,s),(0,0,0,0)); sq.paste(head,((s-head.size[0])//2,s-head.size[1]),head)
sq.quantize(colors=64,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.NONE).save(os.path.join(out,"retrato.png"),optimize=True)
print(json.dumps(meta))
