/* =========================================================
   GUILLERMO TE PREGUNTA · CÓDIGO COMPARTIDO
   Lo usan el juego (script.js) y la pantalla de la clase
   (proyector.js): configuración de Supabase, sonidos, las caras
   de Guillermo, los sprites de Kamil, Elías y Rappi, los efectos
   de las escenas y el ranking. Se carga antes que ellos.
   Cada página tiene que tener #mascot, #bubble, #bubble-text y #fx.
   ========================================================= */

/* ---------------------------------------------------------
   RANKING COMPARTIDO (Supabase): quién hizo enojar menos a Guillermo
   Pegá acá la «Project URL» y la clave «anon public» del proyecto
   (Supabase → Project Settings → API). La clave anon es pública:
   la tabla solo deja leer y agregar (ver supabase/ranking.sql).
   Mientras estén vacías, el ranking no aparece.
   --------------------------------------------------------- */
const RANKING = {
  url: "https://sepjaagggjfcfmfonlxc.supabase.co",
  clave: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcGphYWdnZ2pmY2ZtZm9ubHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5Njk1MDYsImV4cCI6MjEwODU0NTUwNn0.hw5Fd_PB_ikR_G_Fe7gW63OZNtvhmmu3KHbGZOc0TFw",
  mostrar: 10   // cuántos puestos se ven
};

const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = (list) => list[Math.floor(Math.random() * list.length)];
// como pick, pero no repite la última frase que salió de esa misma lista
const ultimaFrase = new Map();
function pickSin(list) {
  if (list.length < 2) return list[0];
  let i;
  do { i = Math.floor(Math.random() * list.length); } while (i === ultimaFrase.get(list));
  ultimaFrase.set(list, i);
  return list[i];
}
const fill = (text, data) => text.replace(/\{(\w+)\}/g, (_, k) => data[k]);

/* ---------- localStorage (con protección por si está bloqueado) ---------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("gtp." + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("gtp." + key, JSON.stringify(value)); } catch (e) { /* sin almacenamiento */ }
  }
};

/* ---------- sonidos 8 bits con Web Audio (se crean al primer clic) ---------- */
const sound = {
  on: store.get("sound", true),
  ctx: null,
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  tone(freq, start, dur, type = "square", vol = 0.06, destino) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(destino || ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  },
  play(name, enCanal) {
    if (!this.on || !this.ensure()) return;
    const seq = {
      click: [[660, 0, 0.05]],
      good: [[660, 0, 0.08], [880, 0.08, 0.08], [1320, 0.16, 0.14]],
      bad: [[300, 0, 0.12, "triangle", 0.1], [220, 0.12, 0.2, "triangle", 0.1]],
      hint: [[990, 0, 0.06], [740, 0.07, 0.1]],
      tick: [[1200, 0, 0.03, "square", 0.03]],
      start: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.2]],
      end: [[784, 0, 0.12], [659, 0.12, 0.12], [523, 0.24, 0.12], [1047, 0.4, 0.3]],
      moto: [[90, 0, 0.35, "sawtooth", 0.07], [110, 0.3, 0.35, "sawtooth", 0.07], [130, 0.6, 0.4, "sawtooth", 0.07], [120, 1.0, 0.6, "sawtooth", 0.05]],
      crash: [[180, 0, 0.08, "square", 0.09], [70, 0.06, 0.18, "triangle", 0.12]],
      chomp: [[150, 0.12, 0.06, "square", 0.12], [90, 0.19, 0.08, "square", 0.12], [160, 0.32, 0.06, "square", 0.1], [80, 0.39, 0.12, "square", 0.1]],
      // enojo: se prepara (gruñido que sube), muerde (ñam crocante), alivio (suspiro)
      windup: [[110, 0, 0.12, "sawtooth", 0.05], [140, 0.12, 0.12, "sawtooth", 0.05], [180, 0.24, 0.14, "sawtooth", 0.06]],
      growl: [[70, 0, 0.3, "sawtooth", 0.07], [90, 0.3, 0.3, "sawtooth", 0.08], [120, 0.6, 0.3, "sawtooth", 0.09], [160, 0.9, 0.35, "sawtooth", 0.1]],
      nam: [[210, 0, 0.03, "square", 0.11], [120, 0.03, 0.07, "square", 0.12], [260, 0.1, 0.03, "square", 0.08], [90, 0.13, 0.08, "triangle", 0.1]],
      namBig: [[120, 0, 0.1, "square", 0.14], [60, 0.08, 0.28, "triangle", 0.16], [200, 0.12, 0.04, "square", 0.1]],
      relief: [[660, 0, 0.12, "triangle", 0.05], [520, 0.12, 0.22, "triangle", 0.05]],
      // Rescate SSJ: entra, junta energía, se transforma, carga, dispara, impacta, el panel se arma y festeja
      ssjEntra: [[330, 0, 0.05], [392, 0.1, 0.05], [330, 0.2, 0.05], [392, 0.3, 0.05], [523, 0.42, 0.1]],
      ssjAura: [110, 131, 147, 165, 196, 220, 262, 294, 330, 392, 440, 523].map((f, i) => [f, i * 0.1, 0.12, "sawtooth", 0.045]),
      kame: [[294, 0, 0.22, "triangle", 0.07], [330, 0.3, 0.22, "triangle", 0.07], [370, 0.6, 0.22, "triangle", 0.07], [392, 0.9, 0.3, "triangle", 0.07], [110, 0, 1.25, "sawtooth", 0.02]],
      beam: [[880, 0, 0.08, "sawtooth", 0.06], [660, 0.06, 0.5, "sawtooth", 0.07], [520, 0.4, 0.45, "square", 0.05]],
      ssjTransforma: [[523, 0, 0.5, "triangle", 0.06], [659, 0.05, 0.5, "triangle", 0.05], [784, 0.1, 0.55, "triangle", 0.05], [1047, 0.18, 0.6, "triangle", 0.04], [65, 0, 0.6, "sawtooth", 0.05]],
      ssjImpacto: [[1200, 0, 0.05, "square", 0.08], [200, 0.04, 0.2, "triangle", 0.12], [90, 0.1, 0.25, "triangle", 0.1]],
      restore: [[880, 0, 0.07, "square", 0.04], [1175, 0.07, 0.07, "square", 0.04], [1397, 0.14, 0.07, "square", 0.04], [1760, 0.21, 0.16, "square", 0.04]],
      // Elías: entra, prepara el arma, dispara (volumen moderado), rompe la pregunta y se arma la nueva
      eliasEntra: [[392, 0, 0.05], [494, 0.09, 0.05], [587, 0.18, 0.07]],
      eliasCarga: [[1400, 0, 0.025, "square", 0.04], [900, 0.09, 0.03, "square", 0.045]],
      eliasDisparo: [[1600, 0, 0.03, "square", 0.07], [220, 0.02, 0.09, "square", 0.08], [70, 0.05, 0.22, "triangle", 0.1]],
      eliasRompe: [880, 740, 622, 523, 440, 370, 311, 262].map((f, i) => [f, i * 0.045, 0.05, "square", 0.04]),
      eliasArma: [[523, 0, 0.06, "square", 0.035], [659, 0.06, 0.06, "square", 0.035], [784, 0.12, 0.1, "square", 0.035]],
      ssjVictoria: [[784, 0, 0.08], [988, 0.08, 0.08], [1175, 0.16, 0.08], [1568, 0.26, 0.22]]
    }[name];
    const destino = enCanal ? this.abrirCanal() : null;
    if (seq) seq.forEach(([f, s, d, t, v]) => this.tone(f, s, d, t, v, destino));
  },
  // canal aparte para la escena del Rescate SSJ: al cortarlo se callan también los sonidos ya programados
  canal: null,
  abrirCanal() {
    if (!this.canal) {
      this.canal = this.ctx.createGain();
      this.canal.connect(this.ctx.destination);
    }
    return this.canal;
  },
  callar() {
    if (!this.canal) return;
    this.canal.disconnect();
    this.canal = null;
  }
};

/* =========================================================
   GUILLERMO EN PIXEL ART
   Las 16 caras salen de la hoja aprobada, llevadas a su
   grilla de píxeles y alineadas en una tira de 52 × 52 por
   cara (assets/guillermo/caras.png, ver preparar-sprites.py).
   Se muestran a escala entera para que se vean nítidas.
   Todas comparten el mismo cuadro: cambiar de cara no mueve
   ni agranda la cabeza.
   ========================================================= */
const GUILLE = {
  src: "assets/guillermo/caras.png",
  w: 52, h: 52,                  // un cuadro de la tira, en píxeles del dibujo
  caras: ["espera", "parpadeo", "alegria", "animo", "pensando", "sorpresa", "molesto", "enojado",
    "furioso", "mordida", "mordidaFinal", "lleno", "alivio", "nervioso", "asustado", "aturdido"],
  cabeza: 45,                    // recorte de la cabeza que sale volando: hasta el cuello de la capucha
  cara: [26, 31],                // centro de la cara (entre los ojos y la boca)
  boca: { mordida: [26.5, 37.5], mordidaFinal: [28.5, 37.5], alivio: [27.5, 38.5] }
};

const EXPRESIONES = {
  espera: "Guillermo, sonriendo tranquilo y esperando",
  parpadeo: "Guillermo, sonriendo tranquilo y esperando",
  alegria: "Guillermo, feliz y riéndose con la boca abierta",
  animo: "Guillermo, guiñando un ojo para darte ánimo",
  pensando: "Guillermo, pensando con la mano en el mentón",
  sorpresa: "Guillermo, sorprendido con la boca abierta",
  molesto: "Guillermo, molesto: cejas bajas y la boca apretada",
  enojado: "Guillermo, enojado con el ceño fruncido y la boca para abajo",
  furioso: "Guillermo, furioso, apretando los dientes",
  mordida: "Guillermo con la boca bien abierta, listo para morder",
  mordidaFinal: "Guillermo abre una boca gigante para comerse el panel",
  lleno: "Guillermo masticando, lleno y contento",
  alivio: "Guillermo, aliviado: cierra los ojos y suelta el aire",
  nervioso: "Guillermo, nervioso y sudando",
  asustado: "Guillermo, asustado con la boca abierta",
  aturdido: "Guillermo, mareado, con los ojos en cruz"
};

// una cara con otra descripción (para las actuaciones): cara("mordida", "Guillermo muerde el panel")
const cara = (nombre, label) => ({ nombre, label: label || EXPRESIONES[nombre] });
const nombreCara = (mood) => (typeof mood === "string" ? mood : mood.nombre);

// pinta una cara en el elemento (en .chomper el CSS deja ver solo la cabeza)
function pintarCara(el, mood) {
  let s = el.firstElementChild;
  if (!s || !s.classList.contains("guille-cara")) {
    el.innerHTML = '<span class="guille-cara" aria-hidden="true"></span>';
    s = el.firstElementChild;
  }
  const i = Math.max(0, GUILLE.caras.indexOf(nombreCara(mood)));
  s.style.backgroundPosition = `${(i * 100) / (GUILLE.caras.length - 1)}% 0`;
}

// las medidas del cuadro van al CSS (proporción de la mascota y del recorte de la cabeza)
document.documentElement.style.setProperty("--guille-w", GUILLE.w);
document.documentElement.style.setProperty("--guille-h", GUILLE.h);
document.documentElement.style.setProperty("--guille-cabeza", GUILLE.cabeza);
new Image().src = GUILLE.src; // precarga: el primer cambio de cara no parpadea

/* =========================================================
   RAPPI EN PIXEL ART (comodín de la evaluación)
   Cuadrícula de 52 × 43: repartidor con campera naranja y caja
   de reparto, en su moto, mirando a la derecha.
   ========================================================= */
const RAPPI_PALETA = {
  K: "#140d1c", // contorno
  H: "#17110d", // pelo enrulado oscuro
  h: "#3a2a20", // brillo del pelo
  S: "#c98f62", // piel
  s: "#a8714a", // sombra de piel
  E: "#140d0a", // ojo y ceja
  M: "#8a4b3b", // boca
  W: "#ffffff", // franjas reflectivas
  O: "#ff5a1f", // naranja del uniforme, la caja y la moto
  o: "#c23c0e", // sombra naranja
  Y: "#ff9a5c", // brillo naranja
  P: "#23314f", // pantalón
  N: "#111116", // asiento, puños y zapatillas
  B: "#2b2f3a", // chasis
  b: "#4a5060", // motor y manubrio
  L: "#ffe066", // farol
  R: "#0d0d12", // cubierta
  G: "#9aa3b5", // llanta y horquilla
  g: "#5c6475", // centro de la rueda
  X: "#8b93a3", // caño de escape
  x: "#5c6475"  // punta del escape
};

const RAPPI_SPRITE = [
  "...................KKHhHHKHHhKK.....................",
  "..................KHHHHHHHHHHHHK....................",
  ".................KHHhHHHHHhHHHHHK...................",
  "................KHHHHHHhHHHHHhHHHK..................",
  "................KHhHHHHHHHHHHHHHHK..................",
  "................KHHHHhHHHHHSHHSHK...................",
  "................KHHHHHHHHSSSSSSSK...................",
  "................KHhHHHHSSSSEEEESK...................",
  "................KHHHHHSSSSSSWEESK...................",
  ".................KHHHssSSSSSWEESSK..................",
  ".................KHHHsSsSSSSSSSSSK..................",
  "...KKKKKKKKKKKKK..KHHssSSSSSSSsSSK..................",
  "..KOOOOOOOOOOOOOK..KHsSSSSSSSSSsK...................",
  "..KOOOOOOOOOOOOooK..KsSSSSSSSMMSK...................",
  "..KOOWWWWWWWWWOooK..KsSSSSSSSSSSK...................",
  "..KOOWWWWWWWWWOooK...KsSSSSSSSsK....................",
  "..KOOOOOOOOOOOOooK....KssSSSssK.....................",
  "..KOOOOOOOOOOOOooKKKKKKsssssKK......................",
  "..KOOOOOOOOOOOOooooOOOOWWWWWK....KKKKK..............",
  "..KOOOOOOOOOOOOooooOOOOOOOOOKKK.KNNNNbK.............",
  "..KOOYYYYYYYYYOooooOOOOOOOOOOOOKKSSSbbKKKK..........",
  "..KOOOOOOOOOOOOooooWWWWWOOOOOOOOOSSSOOOOOOK.........",
  "..KOOOOOOOOOOOOooooOOOOOOOOOOOOOOSSSOOOOOLLK........",
  "..KooooooooooooooooOOOOOOOOOKOOOOOOOOOOOLLLLK.......",
  "..KooooooooooooooooOOOOOOOOOKKKKKKKKOOOOLLLLK.......",
  "..KoooooooooooooooooooooooooOOOOOOOOOOOOLLLLK.......",
  "...KKKKKKKKKKKKKoooPPPPPPPPPPPPYYYYOOOOOOOKK........",
  "....KKKKKKKKNNNNoooPPPPPPPPPPPPOOOOOOOOOOOKKKKK.....",
  "...KOOOOOOOONNNNNNNPPPPPPPPPPPPPWWOOKOOOOOOOOOOK....",
  "..KOOKKKKKKKKKKKKKKKKKKKOOOOPPPPOOOOKKKGGGKKKKOOK...",
  "...KK...KKRRRKKKBBBBBBBBOoooPPPPoooOK.KGGRRRKKOOK...",
  ".......KRRRRRRRKBBBBBBBBOOOOPPPPOOOOK.KRRRRRRRKK....",
  "..KKKKKRRRGGGRRRBBBBBBbbbbbbPPPPBBKK.KRRRGGGRRRK....",
  ".KxxXXRRGGRRRGGRRBBBBBbbbbbbPPPPBBK.KRRGGRRRGGRRK...",
  ".KxxXXRRGRRGRRGRRBBBbbbbbbbbNNNNNNK.KRRGRRGRRGRRK...",
  "..KKKRRGRRRgRRRGRRbbbbbbbbbbNNNNNNKKRRGRRRgRRRGRRK..",
  "....KRRGRGgggGRGRRKKKKKKKKKKKKKKKK.KRRGRGgggGRGRRK..",
  "....KRRGRRRgRRRGRRK................KRRGRRRgRRRGRRK..",
  ".....KRRGRRGRRGRRK..................KRRGRRGRRGRRK...",
  ".....KRRGGRRRGGRRK..................KRRGGRRRGGRRK...",
  "......KRRRGGGRRRK....................KRRRGGGRRRK....",
  ".......KRRRRRRRK......................KRRRRRRRK.....",
  "........KKRRRKK........................KKRRRKK......"
];

function pixelSVG(rows, palette) {
  let rects = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let run = 1;
      while (row[x + run] === c) run++;
      if (c !== ".") rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${palette[c]}"/>`;
      x += run;
    }
  });
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" shape-rendering="crispEdges">${rects}</svg>`;
}

const guillermo = {
  el: $("#mascot"),
  bubble: $("#bubble"),
  text: $("#bubble-text"),
  mood: "espera",
  draw(mood) { pintarCara(this.el, mood); },
  // mood: nombre de EXPRESIONES o una cara con otra descripción, hecha con cara()
  set(mood, animate) {
    this.mood = typeof mood === "string" ? mood : "actuando";
    this.draw(mood);
    this.el.setAttribute("aria-label", typeof mood === "string" ? EXPRESIONES[mood] : mood.label);
    if (animate && !reduceMotion.matches) {
      this.el.classList.remove("jump", "shake");
      void this.el.offsetWidth; // reinicia la animación
      this.el.classList.add(animate);
    }
  },
  // Mientras muerde, Guillermo está ocupado: lo que se le pida decir queda para cuando termina.
  // importante (la pista) se lee igual al instante.
  say(message, mood, animate, importante) {
    if (mordida.actuando) {
      mordida.diferido = { importante, hacer: () => this.decir(message, mood, animate) };
      if (importante) this.text.textContent = message;
      return;
    }
    this.decir(message, mood, animate);
  },
  decir(message, mood, animate) {
    this.text.textContent = message;
    if (mood) this.set(mood, animate);
    if (!reduceMotion.matches) {
      this.bubble.classList.remove("pop");
      void this.bubble.offsetWidth;
      this.bubble.classList.add("pop");
    }
  },
  startBlinking() {
    setInterval(() => {
      if (this.mood !== "espera" || reduceMotion.matches || document.hidden) return;
      this.draw("parpadeo");
      setTimeout(() => { if (this.mood === "espera") this.draw("espera"); }, 160);
    }, 3200);
  }
};

/* ---------- estado de los mordiscos ---------- */
const mordida = {
  gen: 0,             // cambia al reiniciar: corta cualquier actuación vieja
  cola: [],           // mordiscos esperando su turno (se hacen de a uno)
  corriendo: false,
  actuando: false,    // Guillermo está en plena actuación (lo que diga, espera)
  diferido: null,
  marcas: [],         // mordiscos que quedan en el panel hasta el final de la ronda
  bocados: [],        // los bocados del mordisco final
  siguiente: 0,       // próximo lugar de ENOJO.lugares
  timers: new Set(),
  anims: new Set(),
  nodos: new Set(),
  alComido: null      // qué hacer al tocar «Ver resultados» después del final
};

// espera ms; devuelve false si mientras tanto se reinició (cambio de modo, salir, etc.)
function esperar(ms) {
  const gen = mordida.gen;
  return new Promise((resolve) => {
    const t = setTimeout(() => { mordida.timers.delete(t); resolve(gen === mordida.gen); }, ms);
    mordida.timers.add(t);
  });
}
function tarea(fn, ms) {
  const gen = mordida.gen;
  const t = setTimeout(() => { mordida.timers.delete(t); if (gen === mordida.gen) fn(); }, ms);
  mordida.timers.add(t);
}
function animar(el, frames, opts) {
  if (!el.animate) return null;
  const a = el.animate(frames, opts);
  mordida.anims.add(a);
  a.addEventListener("finish", () => mordida.anims.delete(a));
  return a;
}
function nodoFx(className) {
  const n = document.createElement("div");
  n.className = className;
  $("#fx").appendChild(n);
  mordida.nodos.add(n);
  return n;
}
function quitarNodo(n) {
  n.remove();
  mordida.nodos.delete(n);
}
function efimero(n, anim, ms) {
  if (anim) anim.addEventListener("finish", () => quitarNodo(n));
  setTimeout(() => quitarNodo(n), ms + 300); // por si la pestaña no anima (segundo plano)
}

function estaVisible(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 700;
  return r.width > 0 && r.bottom > r.height * 0.45 && r.top < vh - r.height * 0.45;
}

// migas que saltan (mordiscos)
function migas(x, y, ox, oy, cantidad) {
  if (reduceMotion.matches) return;
  const colores = ["#0a0d22", "#2f3d8f", "#18225a", "#202c6e", "#2f3d8f", "#ffd23f"];
  for (let k = 0; k < cantidad; k++) {
    const m = nodoFx("miga" + (k % 3 === 0 ? " chica" : ""));
    m.style.background = colores[k % colores.length];
    // salen hacia afuera del panel, se abren y caen
    const a = Math.atan2(oy, ox) + (Math.random() - 0.5) * 2.2;
    const v = 40 + Math.random() * 70;
    const dx = Math.cos(a) * v, dy = Math.sin(a) * v - 30;
    const frames = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
      transform: `translate(${x + dx * t}px, ${y + dy * t + 260 * t * t}px) rotate(${t * 180}deg)`,
      opacity: t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3
    }));
    const dur = 650 + Math.random() * 350;
    efimero(m, animar(m, frames, { duration: dur, easing: "linear", fill: "forwards" }), dur);
  }
}

function cartel(texto, x, y, clase = "nam-pop", ms = 650) {
  const n = nodoFx(clase);
  n.textContent = texto;
  const anim = reduceMotion.matches
    ? animar(n, [{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`, opacity: 1 }, { transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`, opacity: 0 }], { duration: ms, easing: "steps(2)", fill: "forwards" })
    : animar(n, [
      { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0.4)`, opacity: 1 },
      { transform: `translate(${x}px, ${y - 14}px) translate(-50%, -50%) scale(1.15)`, opacity: 1, offset: 0.25 },
      { transform: `translate(${x}px, ${y - 22}px) translate(-50%, -50%) scale(1)`, opacity: 1, offset: 0.75 },
      { transform: `translate(${x}px, ${y - 30}px) translate(-50%, -50%) scale(1)`, opacity: 0 }
    ], { duration: ms, easing: "steps(8)", fill: "forwards" });
  efimero(n, anim, ms);
}

const SSJ = {
  src: "assets/rescate-ssj/poses.png",
  w: 396, h: 486,
  ancla: [182, 485], // punto medio entre los championes, sobre el piso
  poses: ["reposo", "entrada", "preparacion", "ssj", "carga", "disparo", "recuperacion", "victoria"],
  manos: { carga: [126, 304], disparo: [374, 262] }, // dónde está la energía, en píxeles del cuadro
  img: null
};

// el Rescate va siempre en su versión larga, aunque el sistema pida menos movimiento
// (el resto del juego sí sigue esa preferencia). Para volver a respetarla: return reduceMotion.matches
const escenaCorta = () => false;

// tiempos de cada momento (ms); con menos movimiento va la versión corta
const TIEMPOS_SSJ = {
  normal: { entrada: 550, plantado: 240, prepara: 600, anticipa: 140, transforma: 650, carga: 1000, viaje: 260, impacto: 800, recupera: 400, victoria: 550, salida: 360 },
  reducido: { entrada: 0, plantado: 250, prepara: 0, anticipa: 0, transforma: 550, carga: 0, viaje: 0, impacto: 600, recupera: 0, victoria: 550, salida: 0 }
};

const FASES_SSJ = {
  entrada: "Llega Kamil",
  transformacion: "Transformación",
  carga: "Carga el Kamehameha",
  disparo: "¡Kamehameha!",
  impacto: "Guillermo se calma",
  recuperacion: "Panel restaurado"
};

// carga la hoja una sola vez; la escena espera hasta 1,5 s a que esté lista
function hojaSSJ() {
  if (!SSJ.img) {
    SSJ.img = new Image();
    SSJ.img.src = SSJ.src;
    SSJ.lista = (SSJ.img.decode ? SSJ.img.decode() : Promise.resolve()).then(() => true, () => false);
  }
  return Promise.race([SSJ.lista, new Promise((r) => setTimeout(() => r(false), 1500))]);
}

// hoja de poses ya preparada (assets/cambio-disparo/preparar-sprites.py): 4 cuadros de 604 × 599
// alineados por los pies. El dibujo mira a la derecha y el fogonazo ya viene en la pose «disparando».
const ELIAS = {
  nombre: "Elías", // se puede cambiar: los textos del comodín salen de acá
  src: "assets/cambio-disparo/poses.png",
  w: 604, h: 599,
  ancla: [194, 598],  // punto medio entre los championes, sobre el piso
  boca: [466, 296],   // boca del caño (donde nace el fogonazo)
  atras: 190,         // cuánto ocupa el cuerpo detrás del ancla…
  adelante: 140,      // …y adelante (sin contar el brazo con el arma)
  poses: ["reposo", "preparacion", "apuntando", "disparando"],
  img: null
};

// tiempos de cada momento (ms): la versión completa dura unos 3,5 s
const TIEMPOS_ELIAS = {
  normal: { entrada: 420, plantado: 220, prepara: 420, apunta: 620, retroceso: 110, bala: 80, rompe: 720, arma: 520, baja: 240, salida: 380 },
  reducido: { entrada: 200, plantado: 0, prepara: 0, apunta: 450, retroceso: 0, bala: 0, rompe: 260, arma: 260, baja: 0, salida: 200 }
};

const disparo = { enEscena: false, raf: 0, reemplazo: null };

function hojaElias() {
  if (!ELIAS.img) {
    ELIAS.img = new Image();
    ELIAS.img.src = ELIAS.src;
    ELIAS.lista = (ELIAS.img.decode ? ELIAS.img.decode() : Promise.resolve()).then(() => true, () => false);
  }
  return Promise.race([ELIAS.lista, new Promise((r) => setTimeout(() => r(false), 1500))]);
}

// pinta la pregunta como una grilla de píxeles (muestreando lo que hay debajo) en un canvas de la capa de efectos
function pixelesDe(card) {
  const r = card.getBoundingClientRect();
  const c = Math.max(7, Math.round(Math.sqrt((r.width * r.height) / 1500)));
  const estilos = new Map();
  const fondo = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (!estilos.has(n)) estilos.set(n, getComputedStyle(n));
      const bg = estilos.get(n).backgroundColor;
      if (bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg)) return bg;
      if (n === card) break;
    }
    return "#0f1640";
  };
  const conTexto = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const celdas = [];
  const inerte = card.inert;
  card.inert = false; // solo para medir (es sincrónico: nadie llega a tocar nada)
  for (let y = r.top; y < r.bottom - 1; y += c) {
    for (let x = r.left; x < r.right - 1; x += c) {
      const el = document.elementFromPoint(x + c / 2, y + c / 2);
      if (!el || !card.contains(el)) continue;
      const color = conTexto(el) && Math.random() < 0.3 ? getComputedStyle(el).color : fondo(el);
      celdas.push({ x, y, color });
    }
  }
  card.inert = inerte;
  return { c, celdas, r };
}

function lienzoFx() {
  const cv = nodoFx("pixeles");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.remove(); // nodoFx crea un div: lo cambiamos por un canvas
  mordida.nodos.delete(cv);
  const canvas = document.createElement("canvas");
  canvas.className = "pixeles";
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  $("#fx").appendChild(canvas);
  mordida.nodos.add(canvas);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { canvas, ctx };
}

// anima la grilla: «rompe» (salen volando desde el impacto) o «arma» (vuelven a su lugar)
function animarPixeles(px, origen, modo, ms) {
  const gen = mordida.gen;
  const { canvas, ctx } = lienzoFx();
  const parts = px.celdas.map((p) => {
    const dx = p.x - origen.x, dy = p.y - origen.y;
    const d = Math.hypot(dx, dy) || 1;
    const fuerza = (260 + Math.random() * 420) * (modo === "rompe" ? 1 : 0.6);
    return { ...p, vx: (dx / d) * fuerza + (Math.random() - 0.5) * 120, vy: (dy / d) * fuerza - 120 - Math.random() * 160,
      demora: modo === "rompe" ? Math.min(0.35, d / 1400) : Math.random() * 0.35 };
  });
  return new Promise((resolve) => {
    const t0 = performance.now();
    const cuadro = (ahora) => {
      if (gen !== mordida.gen) return resolve(false);
      const t = (ahora - t0) / ms;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        // de a saltos de 1/12: se mueve «a cuadritos», como el resto del juego
        const k = Math.floor(Math.max(0, Math.min(1, (t - p.demora) / (1 - p.demora))) * 12) / 12;
        const u = modo === "rompe" ? k : 1 - k; // 0 = en su lugar, 1 = lejos
        const s = u * 0.9;
        const x = p.x + p.vx * s, y = p.y + p.vy * s + 700 * s * s;
        ctx.globalAlpha = modo === "rompe" ? 1 - u * u : 1 - u;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(x), Math.round(y), px.c, px.c);
      });
      if (t < 1) disparo.raf = requestAnimationFrame(cuadro);
      else { disparo.raf = 0; quitarNodo(canvas); resolve(true); }
    };
    disparo.raf = requestAnimationFrame(cuadro);
  });
}

// llama hecha con píxeles (dos cuadros que se alternan); es una capa aparte, sin fondo
function auraSVG(cuadro) {
  const W = 30, H = 40;
  const dentro = (x, y) => {
    const dx = (x + 0.5 - 15) / 13.5, dy = (y + 0.5 - 25) / 14.5;
    if (dx * dx + dy * dy <= 1) return true;
    const alto = (x + cuadro * 2) % 5 === 0 ? 12 : (x + cuadro) % 3 === 0 ? 7 : 3; // largo de cada lengua de fuego
    const tope = 25 - 14.5 * Math.sqrt(Math.max(0, 1 - dx * dx));
    return Math.abs(dx) < 0.85 && y >= tope - alto * (1 - Math.abs(dx)) && y < tope + 1;
  };
  const rows = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => {
    if (!dentro(x, y)) return ".";
    const borde = [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, -2]].some(([a, b]) => !dentro(x + a, y + b));
    return borde ? "U" : "O";
  }));
  return pixelSVG(rows.map((r) => r.join("")), { O: "#ffd23f22", U: "#ffe066b0" }).replace("<svg ", '<svg preserveAspectRatio="none" ');
}

// chispas cuadradas que suben desde los pies alrededor del cuerpo
function chispas(E, cantidad, ms) {
  if (escenaCorta()) return;
  const colores = ["#ffd23f", "#fff5b0", "#ffb627"];
  const ancho = (E.ext[0] + E.ext[1]) * 0.8;
  const alto = SSJ.h * E.s;
  for (let i = 0; i < cantidad; i++) {
    const n = nodoFx("chispa");
    n.style.background = colores[i % colores.length];
    const sx = E.x + (Math.random() - 0.5) * ancho, sy = E.y - Math.random() * alto * 0.5;
    const sube = alto * (0.3 + Math.random() * 0.4);
    const dur = 600 + Math.random() * 400;
    efimero(n, animar(n, [
      { transform: `translate(${sx}px, ${sy}px)`, opacity: 1 },
      { transform: `translate(${sx + (Math.random() - 0.5) * 12}px, ${sy - sube}px)`, opacity: 0 }
    ], { duration: dur, delay: Math.random() * Math.max(0, ms - dur), easing: "steps(6)", fill: "both" }), ms);
  }
}

// chispas azules que se juntan en la esfera mientras carga
function converger(p, radio, cantidad, ms) {
  for (let i = 0; i < cantidad; i++) {
    const n = nodoFx("chispa chica");
    n.style.background = ["#ffffff", "#9fe2ff", "#4fb8ff"][i % 3];
    const a = (i / cantidad) * Math.PI * 2 + Math.random() * 0.4;
    const dur = 420 + Math.random() * 200;
    efimero(n, animar(n, [
      { transform: `translate(${p.x + Math.cos(a) * radio}px, ${p.y + Math.sin(a) * radio}px)`, opacity: 0 },
      { transform: `translate(${p.x + Math.cos(a) * radio * 0.5}px, ${p.y + Math.sin(a) * radio * 0.5}px)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${p.x}px, ${p.y}px)`, opacity: 0 }
    ], { duration: dur, delay: (i / cantidad) * (ms - dur), easing: "steps(5)", fill: "both" }), ms);
  }
}

// resplandor suave que se abre una sola vez (transformación): sin destellos rápidos
function brillo(p, d, color) {
  const n = nodoFx("ssj-brillo");
  n.style.width = n.style.height = `${d}px`;
  n.style.setProperty("--c", color);
  const en = (k) => `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${k})`;
  efimero(n, animar(n, [
    { transform: en(0.4), opacity: 0 },
    { transform: en(0.9), opacity: 0.55, offset: 0.4 },
    { transform: en(1.15), opacity: 0 }
  ], { duration: escenaCorta() ? 400 : 700, easing: "steps(6)", fill: "forwards" }), 800);
}

// golpe del rayo: anillo de píxeles y un cartel
function impacto(p, ancho) {
  const n = nodoFx("ssj-impacto");
  n.style.width = n.style.height = `${ancho * 1.3}px`;
  const en = (k) => `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${k})`;
  efimero(n, animar(n, escenaCorta()
    ? [{ transform: en(1), opacity: 0.9 }, { transform: en(1), opacity: 0 }]
    : [{ transform: en(0.3), opacity: 1 }, { transform: en(1), opacity: 0.9, offset: 0.5 }, { transform: en(1.3), opacity: 0 }],
  { duration: 600, easing: "steps(5)", fill: "forwards" }), 700);
  cartel("¡PAF!", p.x, p.y - ancho * 0.5, "nam-pop kame-txt grande", 800);
  sacudir(5);
}

// estrellitas que giran sobre la cabeza de Guillermo mareado
function estrellas(g, ms) {
  const cx = g.left + g.width / 2, cy = g.top + g.height * 0.04;
  for (let i = 0; i < 3; i++) {
    const n = nodoFx("estrella");
    const frames = Array.from({ length: 13 }, (_, p) => {
      const a = ((p / 12) * 2 + i / 3) * Math.PI * 2;
      return { transform: `translate(${cx + Math.cos(a) * g.width * 0.34}px, ${cy + Math.sin(a) * g.width * 0.08}px)` };
    });
    efimero(n, animar(n, frames, { duration: ms, easing: "steps(24)", fill: "forwards" }), ms);
  }
}

const RAPPI = { velocidad: 520, ruedaDelantera: 42 / 52, ruedaTrasera: 11 / 52 };

/* ---------- ranking compartido: quién hizo enojar menos a Guillermo ---------- */
// orden: menos errores, mejor nota, menos comodines, quién llegó primero
// pedido a una tabla de Supabase (REST); devuelve la respuesta sin leer: cada uno decide qué hacer
function supabase(tabla, consulta = "", opciones = {}) {
  return fetch(`${RANKING.url.replace(/\/+$/, "")}/rest/v1/${tabla}${consulta}`, {
    ...opciones,
    headers: { apikey: RANKING.clave, Authorization: `Bearer ${RANKING.clave}`, "Content-Type": "application/json", ...opciones.headers }
  });
}

const ranking = {
  activo: () => !!(RANKING.url && RANKING.clave),
  orden: "errores.asc,nota.desc,comodines.asc,creado.asc",
  async pedir(consulta, opciones = {}) {
    const r = await supabase("ranking", consulta, opciones);
    if (!r.ok) throw new Error(`ranking: ${r.status}`);
    return r.json();
  },
  top() {
    return this.pedir(`?select=id,nombre,personaje,errores,nota,comodines,comido&order=${this.orden}&limit=${RANKING.mostrar}`);
  },
  // agrega el resultado y devuelve su id y en qué puesto quedó
  async anotar(fila) {
    const [nueva] = await this.pedir("", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(fila) });
    const ids = await this.pedir(`?select=id&order=${this.orden}&limit=1000`);
    return { id: nueva.id, puesto: ids.findIndex((x) => x.id === nueva.id) + 1 };
  }
};

// personaje del ranking: el retrato de Kamil, Elías o Rappi, o la foto sin perfil
const PERSONAJES = ["kamil", "elias", "rappi"];
// foto sin perfil en pixel art (18 × 18, como la cabeza de Rappi): fondo violeta oscuro y silueta violeta clara
const SIN_PERFIL = pixelSVG([
  "gggggggggggggggggg",
  "gggggggooooggggggg",
  "ggggggowwwwogggggg",
  "gggggowwwwwwoggggg",
  "ggggowwwwwwwsogggg",
  "ggggowwwwwwwsogggg",
  "ggggowwwwwwwsogggg",
  "ggggowwwwwwwsogggg",
  "gggggowwwwwsoggggg",
  "ggggggowwwwogggggg",
  "ggggggoooooogggggg",
  "ggggoowwwwwwoogggg",
  "gggowwwwwwwwwsoggg",
  "ggowwwwwwwwwwwsogg",
  "gowwwwwwwwwwwwwsog",
  "gowwwwwwwwwwwwwsog",
  "owwwwwwwwwwwwwwwso",
  "owwwwwwwwwwwwwwwso",
], { g: "#2e1a6b", o: "#180d3d", w: "#c4b0ff", s: "#9d82f2" });
const rappiCabeza = () => pixelSVG(RAPPI_SPRITE.slice(0, 18).map((r) => r.slice(18, 36)), RAPPI_PALETA);
function avatarHTML(personaje) {
  if (personaje === "kamil") return `<img src="assets/rescate-ssj/retrato.png" alt="">`;
  if (personaje === "elias") return `<img src="assets/cambio-disparo/retrato.png" alt="">`;
  if (personaje === "rappi") return rappiCabeza();
  return SIN_PERFIL;
}
const nombrePersonaje = (p) => ({ kamil: "Kamil", elias: ELIAS.nombre, rappi: "Rappi" })[p] || "Sin personaje";
const personajeElegido = () => {
  const v = document.querySelector('input[name="personaje"]:checked')?.value;
  return PERSONAJES.includes(v) ? v : null;
};

function pintarRanking(list, filas, propio) {
  list.innerHTML = "";
  filas.forEach((f, k) => {
    const li = document.createElement("li");
    li.className = [f.id === propio && "propio", k < 3 && "podio"].filter(Boolean).join(" ");
    li.innerHTML = `<span class="rk-pos"></span><span class="rk-avatar avatar" role="img"></span><span class="rk-nombre"></span><span class="rk-dato"></span>`;
    li.querySelector(".rk-pos").textContent = ["🥇", "🥈", "🥉"][k] || `${k + 1}.`;
    const avatar = li.querySelector(".rk-avatar");
    avatar.innerHTML = avatarHTML(f.personaje);
    avatar.dataset.avatar = f.personaje || "";
    avatar.setAttribute("aria-label", nombrePersonaje(f.personaje));
    li.querySelector(".rk-nombre").textContent = f.nombre;
    li.querySelector(".rk-dato").textContent = [
      f.errores === 0 ? "No lo enojó" : `${f.errores} ${f.errores === 1 ? "error" : "errores"}`,
      f.nota ? `nota ${f.nota}` : f.progreso, // en la pantalla de la clase, quien sigue jugando todavía no tiene nota
      f.comido && "se comió el panel"
    ].filter(Boolean).join(" · ");
    list.appendChild(li);
  });
}

/* ---------- pantalla de la clase: salas y eventos (ver supabase/clase.sql) ---------- */
// id único para cada evento, partida y dispositivo (si se reintenta un envío, Supabase no lo duplica)
function nuevoId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 15) | 64;
  b[8] = (b[8] & 63) | 128;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

// códigos de 4 caracteres sin los que se confunden (0/O, 1/I)
const SALA = { letras: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", largo: 4, horas: 12 };
const normalizarSala = (txt) => (txt || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, SALA.largo);
const salaValida = (c) => c.length === SALA.largo && [...c].every((l) => SALA.letras.includes(l));

// la sala existe y sigue abierta: true / false; null si no se pudo preguntar (sin conexión)
async function salaAbierta(codigo) {
  try {
    const r = await supabase("salas", `?select=codigo,creada&codigo=eq.${codigo}`);
    if (!r.ok) return null;
    const [s] = await r.json();
    return !!s && Date.now() - new Date(s.creada).getTime() < SALA.horas * 3600e3;
  } catch {
    return null;
  }
}
