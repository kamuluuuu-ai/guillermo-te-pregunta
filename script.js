/* =========================================================
   Guillermo te pregunta · lógica del juego
   ---------------------------------------------------------
   ¿Querés cambiar las preguntas? Editá solo estas dos listas:
     1) PREGUNTAS    → modo principal (4 opciones, 1 correcta)
     2) AFIRMACIONES → minijuego de verdadero o falso
   ========================================================= */

/* ---------------------------------------------------------
   1) PREGUNTAS DEL MODO PRINCIPAL (de demostración)
   Cada pregunta tiene:
     categoria   → texto que aparece en la etiqueta
     pregunta    → el enunciado
     opciones    → exactamente 4 textos
     correcta    → posición de la opción correcta (0, 1, 2 o 3)
     pista       → lo que dice Guillermo al pedir pista
     explicacion → se muestra después de responder
   Las opciones se mezclan solas en cada partida.
   --------------------------------------------------------- */
const PREGUNTAS = [
  // Cultura general
  {
    categoria: "Cultura general",
    pregunta: "¿Cuál es la capital de Uruguay?",
    opciones: ["Montevideo", "Salto", "Paysandú", "Maldonado"],
    correcta: 0,
    pista: "Tiene el puerto más importante del país… y un Cerro famoso.",
    explicacion: "Montevideo es la capital y la ciudad más poblada de Uruguay."
  },
  {
    categoria: "Cultura general",
    pregunta: "¿En qué año ganó Uruguay el primer Mundial de fútbol?",
    opciones: ["1930", "1950", "1924", "1934"],
    correcta: 0,
    pista: "Fue el mismo año en que se inauguró el Estadio Centenario.",
    explicacion: "El primer Mundial se jugó en Uruguay en 1930 y lo ganó la Celeste."
  },
  {
    categoria: "Cultura general",
    pregunta: "¿Quién escribió «Don Quijote de la Mancha»?",
    opciones: ["Miguel de Cervantes", "Lope de Vega", "Gabriel García Márquez", "Jorge Luis Borges"],
    correcta: 0,
    pista: "Era español y vivió en los siglos XVI y XVII.",
    explicacion: "Miguel de Cervantes publicó el Quijote en dos partes, en 1605 y 1615."
  },
  {
    categoria: "Cultura general",
    pregunta: "¿Cuál es el océano más grande del planeta?",
    opciones: ["Pacífico", "Atlántico", "Índico", "Ártico"],
    correcta: 0,
    pista: "Su nombre suena tranquilo, pero es gigante.",
    explicacion: "El océano Pacífico cubre cerca de un tercio de la superficie de la Tierra."
  },
  {
    categoria: "Cultura general",
    pregunta: "¿Cuántos departamentos tiene Uruguay?",
    opciones: ["19", "18", "20", "23"],
    correcta: 0,
    pista: "Es un número impar, entre 15 y 20.",
    explicacion: "Uruguay está dividido en 19 departamentos."
  },
  {
    categoria: "Cultura general",
    pregunta: "¿Qué continente tiene más países?",
    opciones: ["África", "Asia", "Europa", "América"],
    correcta: 0,
    pista: "Ahí está el desierto del Sahara.",
    explicacion: "África tiene 54 países reconocidos, más que cualquier otro continente."
  },

  // Ciencia
  {
    categoria: "Ciencia",
    pregunta: "¿Qué gas absorben las plantas para hacer la fotosíntesis?",
    opciones: ["Dióxido de carbono", "Oxígeno", "Nitrógeno", "Helio"],
    correcta: 0,
    pista: "Es el mismo gas que nosotros largamos al exhalar.",
    explicacion: "Las plantas toman dióxido de carbono (CO₂) y, con luz, producen azúcar y oxígeno."
  },
  {
    categoria: "Ciencia",
    pregunta: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Mercurio", "Venus", "Marte", "Tierra"],
    correcta: 0,
    pista: "Comparte nombre con un metal líquido de los termómetros viejos.",
    explicacion: "Mercurio es el primer planeta del sistema solar y también el más chico."
  },
  {
    categoria: "Ciencia",
    pregunta: "¿Cuál es el símbolo químico del oro?",
    opciones: ["Au", "Ag", "Or", "Go"],
    correcta: 0,
    pista: "Viene del latín «aurum».",
    explicacion: "El símbolo Au viene de «aurum». Ag es la plata."
  },
  {
    categoria: "Ciencia",
    pregunta: "¿A qué temperatura hierve el agua a nivel del mar?",
    opciones: ["100 °C", "90 °C", "80 °C", "120 °C"],
    correcta: 0,
    pista: "Es un número redondo de tres cifras.",
    explicacion: "A nivel del mar el agua hierve a 100 °C. En la altura hierve a menos temperatura."
  },
  {
    categoria: "Ciencia",
    pregunta: "¿Qué órgano bombea la sangre por todo el cuerpo?",
    opciones: ["El corazón", "Los pulmones", "El hígado", "El estómago"],
    correcta: 0,
    pista: "Late unas 70 veces por minuto.",
    explicacion: "El corazón es un músculo que impulsa la sangre por arterias y venas."
  },
  {
    categoria: "Ciencia",
    pregunta: "¿Cuál es el hueso más largo del cuerpo humano?",
    opciones: ["Fémur", "Tibia", "Húmero", "Radio"],
    correcta: 0,
    pista: "Está en el muslo.",
    explicacion: "El fémur, el hueso del muslo, es el más largo y uno de los más fuertes."
  },

  // Informática
  {
    categoria: "Informática",
    pregunta: "¿Qué significa la sigla CPU?",
    opciones: ["Unidad central de procesamiento", "Computadora personal unida", "Control de programas útiles", "Copia de punto único"],
    correcta: 0,
    pista: "Es el «cerebro» de la computadora.",
    explicacion: "CPU (Central Processing Unit) es el procesador: ejecuta las instrucciones de los programas."
  },
  {
    categoria: "Informática",
    pregunta: "¿Cuántos bits tiene un byte?",
    opciones: ["8", "4", "16", "10"],
    correcta: 0,
    pista: "Es el doble de 4.",
    explicacion: "Un byte son 8 bits, y con él se pueden representar 256 valores distintos."
  },
  {
    categoria: "Informática",
    pregunta: "¿Qué lenguaje se usa para darle estilo (colores, tamaños) a una página web?",
    opciones: ["CSS", "HTML", "SQL", "Python"],
    correcta: 0,
    pista: "Sus siglas significan «hojas de estilo en cascada».",
    explicacion: "HTML arma la estructura, CSS le da el estilo y JavaScript agrega comportamiento."
  },
  {
    categoria: "Informática",
    pregunta: "En sistema binario, ¿cuánto vale el número 101?",
    opciones: ["5", "3", "101", "6"],
    correcta: 0,
    pista: "Sumá 4 + 0 + 1.",
    explicacion: "101 en binario es 1×4 + 0×2 + 1×1 = 5."
  },
  {
    categoria: "Informática",
    pregunta: "¿Qué tipo de programa es Linux?",
    opciones: ["Un sistema operativo", "Un navegador web", "Un antivirus", "Una planilla de cálculo"],
    correcta: 0,
    pista: "Es de la misma familia que Windows o macOS.",
    explicacion: "Linux es un sistema operativo libre que se usa en servidores, celulares (Android) y PC."
  },
  {
    categoria: "Informática",
    pregunta: "En programación, ¿qué es un «bug»?",
    opciones: ["Un error en el programa", "Un tipo de virus", "Un lenguaje nuevo", "Una pieza de la placa madre"],
    correcta: 0,
    pista: "Es lo que buscás cuando hacés «debugging».",
    explicacion: "Un bug es un error o falla en el código que hace que el programa funcione mal."
  },

  // Matemática
  {
    categoria: "Matemática",
    pregunta: "¿Cuánto es 7 × 8?",
    opciones: ["56", "54", "64", "48"],
    correcta: 0,
    pista: "5, 6, 7, 8… ¡el resultado tiene los primeros dos!",
    explicacion: "7 × 8 = 56. Truco: 5-6-7-8 → 56 = 7 × 8."
  },
  {
    categoria: "Matemática",
    pregunta: "¿Cuál es el 25 % de 200?",
    opciones: ["50", "25", "75", "40"],
    correcta: 0,
    pista: "El 25 % es lo mismo que la cuarta parte.",
    explicacion: "25 % es un cuarto: 200 ÷ 4 = 50."
  },
  {
    categoria: "Matemática",
    pregunta: "¿Cuántos lados tiene un hexágono?",
    opciones: ["6", "5", "8", "7"],
    correcta: 0,
    pista: "Pensá en las celdas de un panal de abejas.",
    explicacion: "«Hexa» significa seis: el hexágono tiene 6 lados."
  },
  {
    categoria: "Matemática",
    pregunta: "¿Cuál es la raíz cuadrada de 81?",
    opciones: ["9", "8", "7", "18"],
    correcta: 0,
    pista: "¿Qué número multiplicado por sí mismo da 81?",
    explicacion: "9 × 9 = 81, entonces la raíz cuadrada de 81 es 9."
  },
  {
    categoria: "Matemática",
    pregunta: "Un triángulo tiene un ángulo de 90° y otro de 45°. ¿Cuánto mide el tercero?",
    opciones: ["45°", "90°", "60°", "30°"],
    correcta: 0,
    pista: "Los ángulos de un triángulo siempre suman 180°.",
    explicacion: "180° − 90° − 45° = 45°."
  },
  {
    categoria: "Matemática",
    pregunta: "¿Cuál de estos números es primo?",
    opciones: ["13", "15", "21", "27"],
    correcta: 0,
    pista: "Un primo solo se divide por 1 y por sí mismo.",
    explicacion: "13 solo es divisible por 1 y por 13. Los otros se dividen por 3 o por 5."
  }
];

/* ---------------------------------------------------------
   2) AFIRMACIONES DEL MINIJUEGO (de demostración)
   texto → la afirmación
   v     → true si es verdadera, false si es falsa
   --------------------------------------------------------- */
const AFIRMACIONES = [
  { texto: "El Sol es una estrella.", v: true },
  { texto: "La Luna tiene luz propia.", v: false },
  { texto: "Un byte tiene 8 bits.", v: true },
  { texto: "El agua está formada por hidrógeno y oxígeno.", v: true },
  { texto: "Los murciélagos son aves.", v: false },
  { texto: "Montevideo es la capital de Uruguay.", v: true },
  { texto: "El Río de la Plata separa a Uruguay de Chile.", v: false },
  { texto: "7 × 6 = 42.", v: true },
  { texto: "La mitad de 150 es 70.", v: false },
  { texto: "HTML es un lenguaje para manejar bases de datos.", v: false },
  { texto: "Un triángulo tiene tres lados.", v: true },
  { texto: "A Marte se lo conoce como el planeta rojo.", v: true },
  { texto: "Las arañas son insectos.", v: false },
  { texto: "El número 0 es par.", v: true },
  { texto: "La Tierra tarda un día en dar la vuelta al Sol.", v: false },
  { texto: "El corazón humano tiene cuatro cavidades.", v: true },
  { texto: "Python es un lenguaje de programación.", v: true },
  { texto: "9 es un número primo.", v: false },
  { texto: "El sonido viaja más rápido que la luz.", v: false },
  { texto: "Un hexágono tiene seis lados.", v: true },
  { texto: "Las ballenas son mamíferos.", v: true },
  { texto: "La memoria RAM guarda los datos aunque se apague la computadora.", v: false },
  { texto: "El Everest es la montaña más alta sobre el nivel del mar.", v: true },
  { texto: "100 dividido 4 es 20.", v: false },
  { texto: "El hielo flota en el agua.", v: true },
  { texto: "Los pingüinos viven en el Polo Norte.", v: false },
  { texto: "La fotosíntesis produce oxígeno.", v: true },
  { texto: "En binario, el número 2 se escribe 10.", v: true },
  { texto: "Un año bisiesto tiene 365 días.", v: false },
  { texto: "El cuadrado de 5 es 25.", v: true },
  { texto: "Uruguay limita con Brasil y Argentina.", v: true },
  { texto: "El oro se oxida con facilidad.", v: false },
  { texto: "El teclado es un dispositivo de entrada.", v: true },
  { texto: "La impresora es un dispositivo de entrada.", v: false },
  { texto: "Júpiter es el planeta más grande del sistema solar.", v: true },
  { texto: "Una persona adulta tiene 206 huesos.", v: true },
  { texto: "3/4 es mayor que 0,8.", v: false },
  { texto: "«www» son las siglas de World Wide Web.", v: true },
  { texto: "El mate se prepara con yerba.", v: true },
  { texto: "Un ángulo recto mide 180°.", v: false },
  { texto: "Los virus informáticos contagian a las personas.", v: false },
  { texto: "La sangre se oxigena en los pulmones.", v: true },
  { texto: "El número pi es exactamente 3,14.", v: false },
  { texto: "Un decágono tiene diez lados.", v: true },
  { texto: "La Luna es más grande que la Tierra.", v: false },
  { texto: "El wifi funciona con ondas de radio.", v: true },
  { texto: "Un kilómetro tiene 100 metros.", v: false },
  { texto: "Las plantas también respiran.", v: true },
  { texto: "Colón llegó a América en 1492.", v: true },
  { texto: "El cero es un número negativo.", v: false },
  { texto: "«123456» es una contraseña segura.", v: false },
  { texto: "A nivel del mar, el agua hierve a 50 °C.", v: false },
  { texto: "Un litro equivale a 1000 mililitros.", v: true },
  { texto: "La Antártida es el continente más frío.", v: true }
];

/* ---------------------------------------------------------
   AJUSTES DEL JUEGO
   --------------------------------------------------------- */
const AJUSTES = {
  preguntasPorPartida: 10,
  puntosAcierto: 100,
  bonusRacha: 10,        // extra por cada acierto seguido…
  bonusRachaMax: 50,     // …hasta este tope
  costoPista: 25,
  segundosDesafio: 60,
  puntosDesafio: 10,
  bonusDesafio: 5,
  bonusDesafioMax: 25
};

/* ---------------------------------------------------------
   FRASES DE GUILLERMO
   --------------------------------------------------------- */
const FRASES = {
  bienvenida: "¡Soy Guillermo! ¿Te animás a poner a prueba lo que sabés?",
  instrucciones: "Es facilito: leés, pensás y elegís. Si te trancás, pedime una pista.",
  arranque: ["¡Arrancamos! Vamos con la primera.", "¡Dale que va! Primera pregunta."],
  pregunta: ["A ver esta…", "Pensala tranqui.", "Esta me encanta.", "¿Qué decís?", "Vamos con otra."],
  acierto: ["¡Bien ahí!", "¡Excelente, crack!", "¡Esa es! Sabés un montón.", "¡Joya! Seguimos.", "¡Impecable!"],
  racha: ["¡Estás on fire! Racha de {n}.", "¡{n} seguidas! No te para nadie."],
  error: ["¡Casi! Probá de nuevo en la que viene.", "No pasa nada, así se aprende.", "Uh, esa era difícil. ¡Vamos que la próxima sale!", "Tranqui, ahora ya te la sabés."],
  pistaUsada: "Ya te di la pista de esta: {p}",
  desafioIntro: "¡Este es mi desafío! 60 segundos de verdadero o falso. ¿Estás pronto?",
  desafioArranque: "¡Ya! ¿Verdadero o falso?",
  desafioAcierto: ["¡Bien!", "¡Eso!", "¡Sí!", "¡Joya!"],
  desafioError: ["¡Ups! Seguí, seguí.", "No pasa nada, ¡dale!", "¡A la próxima!"],
  desafioFin: "¡Tiempo! Mirá cómo te fue.",
  desafioSinMas: "¡Me dejaste sin afirmaciones! Sos una máquina."
};

/* =========================================================
   A partir de acá está la lógica. No hace falta tocarla
   para cambiar preguntas.
   ========================================================= */

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
  tone(freq, start, dur, type = "square", vol = 0.06) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  },
  play(name) {
    if (!this.on || !this.ensure()) return;
    const seq = {
      click: [[660, 0, 0.05]],
      good: [[660, 0, 0.08], [880, 0.08, 0.08], [1320, 0.16, 0.14]],
      bad: [[300, 0, 0.12, "triangle", 0.1], [220, 0.12, 0.2, "triangle", 0.1]],
      hint: [[990, 0, 0.06], [740, 0.07, 0.1]],
      tick: [[1200, 0, 0.03, "square", 0.03]],
      start: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.2]],
      end: [[784, 0, 0.12], [659, 0.12, 0.12], [523, 0.24, 0.12], [1047, 0.4, 0.3]]
    }[name];
    if (seq) seq.forEach(([f, s, d, t, v]) => this.tone(f, s, d, t, v));
  }
};

/* =========================================================
   GUILLERMO EN PIXEL ART
   Cuadrícula de 24 × 29. Cada letra es un color de PALETA
   ("." = transparente). Se dibuja como SVG con bordes nítidos.
   ========================================================= */
const PALETA = {
  K: "#140d1c", // contorno
  H: "#3a2418", // pelo castaño oscuro
  h: "#5e3c27", // brillo del pelo
  S: "#f3cba9", // piel
  s: "#d9a37f", // sombra de piel
  B: "#22150e", // cejas gruesas
  E: "#1a110d", // ojos oscuros
  W: "#ffffff", // brillo
  M: "#d9827a", // labios
  m: "#7a2e33", // boca abierta
  F: "#b5764f", // pecas / lunares
  P: "#f19c95", // cachetes
  C: "#eadfb8", // capucha beige
  c: "#c7b585", // sombra de capucha
  J: "#1d2833", // campera oscura
  j: "#34465a", // brillo de campera
  Z: "#6b7a88"  // cierre
};

const SPRITE_BASE = [
  ".......KKKKKKKKKK.......",
  ".....KKHHHHHHHHHHKK.....",
  "...KKHHHHHhhHHHHHHHKK...",
  "..KHHHhhHHHHHHHHHhhHHK..",
  ".KHHHHHHHHHHHHHHHHHHHHK.",
  ".KHHHHHHHhHHHHHHHHHHHHK.",
  ".KHHHHHHHHHHHHHHHHHHHHK.",
  ".KHHHSSSSSHHHHhHHHHHHHK.",
  ".KHSSSSSSSSSSSSSSSHHHHK.",
  ".KHSSBBBBBSSSSBBBBBSSHK.",
  ".KSSBBBBBBSSSSBBBBBBSSK.",
  ".KSSSSSSSSSSSSSSSSSSSSK.",
  "KsSSSSWEESSSSSSWEESSSSsK",
  "KsSSSSEEESSSSSSEEESSSSsK",
  "KsSSSSSSSSSSSSSSSSSSSSsK",
  ".KSSSFSSSSSssSSSSSFSSSK.",
  ".KSSSSSSSSSSSSSSSSSSSSK.",
  ".KSSSSSSMSSSSSSMSSSSSSK.",
  ".KSSSSSSSMMMMMMSSSSSSSK.",
  "..KSSSSSSSSSSSSSSSSSSK..",
  "...KsSSSSSSSSSSSSSSsK...",
  ".CCCKKsSSSSSSSSSSsKKCCC.",
  "CCCCcCCKKKssssKKKCCcCCCC",
  "JCCCCcCCCKKKKKKCCCcCCCCJ",
  "JJJCCCcCCCJZZJCCCcCCCJJJ",
  "JJJJCCCCCJJZZJJCCCCCJJJJ",
  "JJjJJJCCJJJZZJJJCCJJJjJJ",
  "JjJJJJJJJJJZZJJJJJJJJJjJ",
  "JjJJJJJJJJJZZJJJJJJJJJjJ"
];

// Cada expresión reemplaza el interior (columnas 2 a 21) de algunas filas.
const EXPRESIONES = {
  espera: { label: "Guillermo, sonriendo y esperando", rows: {} },
  parpadeo: {
    label: "Guillermo, sonriendo y esperando",
    rows: { 12: "SSSSSSSSSSSSSSSSSSSS", 13: "SSSSEEESSSSSSEEESSSS" }
  },
  alegria: {
    label: "Guillermo, feliz con los ojos cerrados de alegría",
    rows: {
      12: "SSSSSESSSSSSSSESSSSS",
      13: "SSSSESESSSSSSESESSSS",
      15: "SPPFSSSSSssSSSSSFPPS",
      17: "SSSSSSmWWWWWWmSSSSSS",
      18: "SSSSSSSmMMMMmSSSSSSS"
    }
  },
  animo: {
    label: "Guillermo, guiñando un ojo para darte ánimo",
    rows: {
      9: "HSSSSSBBSSSSBBSSSSSH",
      10: "SSBBBBBSSSSSSBBBBBSS",
      12: "SSSSSSSSSSSSSWEESSSS",
      13: "SSSSEEESSSSSSEEESSSS",
      15: "SPPFSSSSSssSSSSSFPPS"
    }
  },
  pensando: {
    label: "Guillermo, pensando con una ceja levantada",
    rows: {
      8: "HSSSSSSSSSSSBBBBBHHH",
      9: "HSSBBBBBSSSSSSSSSSSH",
      10: "SSBBBBBBSSSSSSSSSSSS",
      12: "SSSSSWESSSSSSSWESSSS",
      17: "SSSSSSSSSSSSSSSSSSSS",
      18: "SSSSSSSSSSMMMSSSSSSS"
    }
  },
  sorpresa: {
    label: "Guillermo, sorprendido con la boca abierta",
    rows: {
      8: "HSSBBBBBSSSSBBBBBHHH",
      9: "HSSSSSSSSSSSSSSSSSSH",
      10: "SSSSSSSSSSSSSSSSSSSS",
      17: "SSSSSSSSSmmSSSSSSSSS",
      18: "SSSSSSSSSmmSSSSSSSSS"
    }
  }
};

function spriteSVG(mood) {
  const rows = SPRITE_BASE.slice();
  const over = EXPRESIONES[mood].rows;
  Object.keys(over).forEach((r) => {
    const row = rows[r];
    rows[r] = row.slice(0, 2) + over[r] + row.slice(22);
  });
  let rects = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (row[x + run] === ch) run++;
      if (ch !== ".") rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETA[ch]}"/>`;
      x += run;
    }
  });
  return `<svg viewBox="0 0 24 29" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${rects}</svg>`;
}

const guillermo = {
  el: $("#mascot"),
  bubble: $("#bubble"),
  text: $("#bubble-text"),
  mood: "espera",
  cache: {},
  draw(mood) {
    if (!this.cache[mood]) this.cache[mood] = spriteSVG(mood);
    this.el.innerHTML = this.cache[mood];
  },
  set(mood, animate) {
    this.mood = mood;
    this.draw(mood);
    this.el.setAttribute("aria-label", EXPRESIONES[mood].label);
    if (animate && !reduceMotion.matches) {
      this.el.classList.remove("jump", "shake");
      void this.el.offsetWidth; // reinicia la animación
      this.el.classList.add(animate);
    }
  },
  say(message, mood, animate) {
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

/* =========================================================
   PANTALLAS
   ========================================================= */
let current = "start";

function show(name, focusEl) {
  document.querySelectorAll("[data-screen]").forEach((s) => { s.hidden = true; s.classList.remove("enter"); });
  const screen = $("#screen-" + name);
  screen.hidden = false;
  if (!reduceMotion.matches) screen.classList.add("enter");
  current = name;
  (focusEl || $("#panel")).focus({ preventScroll: true });
  if (window.innerWidth <= 820) window.scrollTo({ top: 0, behavior: "auto" });
}

function updateRecords() {
  $("#best-quiz").textContent = store.get("bestQuiz", 0);
  $("#best-challenge").textContent = store.get("bestChallenge", 0);
  $("#c-best-intro").textContent = store.get("bestChallenge", 0);
}

function bump(el, value) {
  el.textContent = value;
  if (reduceMotion.matches) return;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function goHome() {
  stopChallenge();
  updateRecords();
  show("start");
  guillermo.say(FRASES.bienvenida, "espera");
}

/* =========================================================
   MODO PRINCIPAL: PREGUNTAS
   ========================================================= */
const quiz = { deck: [], index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, answered: false, hintUsed: false, mistakes: [] };

function startQuiz() {
  stopChallenge();
  const total = Math.min(AJUSTES.preguntasPorPartida, PREGUNTAS.length);
  quiz.deck = shuffle(PREGUNTAS).slice(0, total).map((q) => ({
    ...q,
    mezcla: shuffle(q.opciones.map((texto, i) => ({ texto, ok: i === q.correcta })))
  }));
  Object.assign(quiz, { index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, mistakes: [] });
  $("#q-score").textContent = "0";
  $("#q-streak").textContent = "0";
  sound.play("start");
  show("quiz", $("#q-text"));
  renderQuestion(pick(FRASES.arranque));
}

function renderQuestion(intro) {
  const q = quiz.deck[quiz.index];
  const total = quiz.deck.length;
  quiz.answered = false;
  quiz.hintUsed = false;

  $("#q-progress").textContent = `${quiz.index + 1}/${total}`;
  $("#q-bar").style.width = `${(quiz.index / total) * 100}%`;
  $("#q-category").textContent = q.categoria;
  $("#q-text").textContent = q.pregunta;
  $("#q-feedback").hidden = true;
  $("#next-btn").hidden = true;

  const hint = $("#hint-btn");
  hint.disabled = false;
  hint.textContent = `💡 Pista (−${AJUSTES.costoPista})`;

  const box = $("#q-options");
  box.innerHTML = "";
  q.mezcla.forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option";
    b.dataset.index = i;
    b.innerHTML = `<span class="key" aria-hidden="true">${i + 1}</span><span class="label"></span><span class="mark"></span>`;
    b.querySelector(".label").textContent = opt.texto;
    b.addEventListener("click", () => answerQuestion(i));
    box.appendChild(b);
  });

  guillermo.say(intro || pick(FRASES.pregunta), "espera");
  $("#q-text").focus({ preventScroll: true });
}

function answerQuestion(i) {
  if (quiz.answered || current !== "quiz") return; // bloqueo: una sola respuesta por pregunta
  quiz.answered = true;

  const q = quiz.deck[quiz.index];
  const chosen = q.mezcla[i];
  const right = q.mezcla.find((o) => o.ok);
  const buttons = $("#q-options").querySelectorAll(".option");

  buttons.forEach((b, j) => {
    b.disabled = true;
    const opt = q.mezcla[j];
    if (opt.ok) { b.classList.add("correct"); b.querySelector(".mark").textContent = "✓ Correcta"; }
    else if (j === i) { b.classList.add("wrong"); b.querySelector(".mark").textContent = "✗ Tu respuesta"; }
    else b.classList.add("dim");
  });
  $("#hint-btn").disabled = true;

  const fb = $("#q-feedback");
  fb.hidden = false;
  if (chosen.ok) {
    quiz.streak++;
    quiz.correct++;
    quiz.bestStreak = Math.max(quiz.bestStreak, quiz.streak);
    const bonus = Math.min((quiz.streak - 1) * AJUSTES.bonusRacha, AJUSTES.bonusRachaMax);
    const cost = quiz.hintUsed ? AJUSTES.costoPista : 0;
    const earned = AJUSTES.puntosAcierto + bonus - cost;
    quiz.score += earned;
    const extras = [bonus && `+${bonus} de racha`, cost && `−${cost} por la pista`].filter(Boolean);
    fb.className = "feedback good";
    $("#q-feedback-title").textContent = `✔ ¡Correcto! +${earned}` + (extras.length ? ` (${extras.join(", ")})` : "");
    $("#q-feedback-answer").textContent = `La respuesta es: ${right.texto}`;
    sound.play("good");
    const msg = quiz.streak >= 3 ? fill(pick(FRASES.racha), { n: quiz.streak }) : pick(FRASES.acierto);
    guillermo.say(msg, "alegria", "jump");
  } else {
    quiz.streak = 0;
    quiz.mistakes.push({ pregunta: q.pregunta, elegida: chosen.texto, correcta: right.texto, explicacion: q.explicacion });
    fb.className = "feedback bad";
    $("#q-feedback-title").textContent = "✘ Esta no era";
    $("#q-feedback-answer").textContent = `La respuesta correcta es: ${right.texto}`;
    sound.play("bad");
    guillermo.say(pick(FRASES.error), "animo", "shake");
  }
  $("#q-feedback-expl").textContent = q.explicacion;
  bump($("#q-score"), quiz.score);
  bump($("#q-streak"), quiz.streak);
  $("#q-bar").style.width = `${((quiz.index + 1) / quiz.deck.length) * 100}%`;

  const next = $("#next-btn");
  next.textContent = quiz.index + 1 < quiz.deck.length ? "Siguiente ▶" : "Ver resultados ▶";
  next.hidden = false;
  next.focus({ preventScroll: true });
}

function useHint() {
  if (quiz.answered || quiz.hintUsed || current !== "quiz") return;
  quiz.hintUsed = true; // el costo se descuenta de los puntos de esta pregunta si la acertás
  const hint = $("#hint-btn");
  hint.disabled = true;
  hint.textContent = "💡 Pista usada";
  sound.play("hint");
  guillermo.say("Pista: " + quiz.deck[quiz.index].pista, "pensando");
}

function nextQuestion() {
  if (!quiz.answered || current !== "quiz") return;
  sound.play("click");
  quiz.index++;
  if (quiz.index < quiz.deck.length) renderQuestion();
  else showResults();
}

function showResults() {
  const total = quiz.deck.length;
  const best = store.get("bestQuiz", 0);
  const isRecord = quiz.score > best;
  if (isRecord) store.set("bestQuiz", quiz.score);
  updateRecords();

  $("#r-score").textContent = quiz.score;
  $("#r-correct").textContent = `${quiz.correct}/${total}`;
  $("#r-streak").textContent = quiz.bestStreak;
  $("#r-record").hidden = !isRecord;

  const list = $("#r-review");
  list.innerHTML = "";
  if (!quiz.mistakes.length) {
    const li = document.createElement("li");
    li.className = "review-empty";
    li.textContent = "★ ¡Perfecto! No hay nada para repasar.";
    list.appendChild(li);
  }
  quiz.mistakes.forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML = `<p class="rq"></p><p class="ra"><span class="rx"></span><br>Correcta: <strong></strong></p><p class="re"></p>`;
    li.querySelector(".rq").textContent = m.pregunta;
    li.querySelector(".rx").textContent = `✘ Respondiste: ${m.elegida}`;
    li.querySelector("strong").textContent = `✔ ${m.correcta}`;
    li.querySelector(".re").textContent = m.explicacion;
    list.appendChild(li);
  });

  const ratio = quiz.correct / total;
  let msg;
  if (ratio === 1) msg = "¡Perfecto! ¡10 de 10! Sos una enciclopedia con patas.";
  else if (ratio >= 0.7) msg = `¡Bien ahí! ${quiz.correct} de ${total}. Repasá las que fallaste y vas por el récord.`;
  else if (ratio >= 0.4) msg = `${quiz.correct} de ${total}. ¡Vas bien! Mirá el repaso y probá de nuevo.`;
  else msg = `${quiz.correct} de ${total}. ¡Tranqui! Leé las explicaciones y la próxima sale mejor.`;

  sound.play("end");
  show("results");
  guillermo.say(isRecord ? msg + " ¡Y es nuevo récord!" : msg, ratio >= 0.4 ? "alegria" : "animo", "jump");
}

/* =========================================================
   MINIJUEGO: EL DESAFÍO DE GUILLERMO
   ========================================================= */
const ch = { running: false, timer: null, pending: null, endAt: 0, lastSecond: 0, deck: [], index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, answered: 0, locked: false, exhausted: false };

function challengeIntro() {
  stopChallenge();
  updateRecords();
  show("challenge-intro");
  guillermo.say(FRASES.desafioIntro, "espera");
}

function startChallenge() {
  stopChallenge();
  Object.assign(ch, {
    running: true, deck: shuffle(AFIRMACIONES), index: 0, score: 0, streak: 0, bestStreak: 0,
    correct: 0, answered: 0, locked: false, exhausted: false,
    endAt: performance.now() + AJUSTES.segundosDesafio * 1000, lastSecond: AJUSTES.segundosDesafio
  });
  $("#c-score").textContent = "0";
  $("#c-streak").textContent = "0";
  setTfDisabled(false);
  sound.play("start");
  show("challenge", $("#c-text"));
  guillermo.say(FRASES.desafioArranque, "espera");
  renderStatement();
  updateTimer();
  ch.timer = setInterval(updateTimer, 100);
}

function setTfDisabled(value) {
  document.querySelectorAll(".btn-tf").forEach((b) => { b.disabled = value; });
}

function renderStatement() {
  const card = $("#c-card");
  card.classList.remove("flash-good", "flash-bad");
  $("#c-flash").textContent = "";
  $("#c-flash").className = "c-flash";
  $("#c-text").textContent = ch.deck[ch.index].texto;
  ch.locked = false;
  setTfDisabled(false);
}

function updateTimer() {
  if (!ch.running) return;
  const left = Math.max(0, ch.endAt - performance.now());
  const secs = Math.ceil(left / 1000);
  const timeEl = $("#c-time");
  timeEl.textContent = secs;
  $("#c-bar").style.width = `${(left / (AJUSTES.segundosDesafio * 1000)) * 100}%`;
  const low = secs <= 10;
  timeEl.classList.toggle("low", low);
  $("#c-bar").parentElement.classList.toggle("low", low);
  if (secs !== ch.lastSecond) {
    ch.lastSecond = secs;
    if (secs <= 5 && secs > 0) sound.play("tick");
  }
  if (left <= 0) finishChallenge();
}

function answerStatement(value) {
  if (!ch.running || ch.locked || current !== "challenge") return;
  ch.locked = true;
  setTfDisabled(true);
  ch.answered++;

  const item = ch.deck[ch.index];
  const card = $("#c-card");
  const flash = $("#c-flash");
  let wait;

  if (value === item.v) {
    ch.streak++;
    ch.correct++;
    ch.bestStreak = Math.max(ch.bestStreak, ch.streak);
    const bonus = Math.min((ch.streak - 1) * AJUSTES.bonusDesafio, AJUSTES.bonusDesafioMax);
    const earned = AJUSTES.puntosDesafio + bonus;
    ch.score += earned;
    card.classList.add("flash-good");
    flash.className = "c-flash good";
    flash.textContent = `✔ ¡Correcto! +${earned}`;
    sound.play("good");
    guillermo.say(ch.streak >= 3 ? fill(pick(FRASES.racha), { n: ch.streak }) : pick(FRASES.desafioAcierto), "alegria", "jump");
    wait = 450;
  } else {
    ch.streak = 0;
    card.classList.add("flash-bad");
    flash.className = "c-flash bad";
    flash.textContent = `✘ Era ${item.v ? "VERDADERO" : "FALSO"}`;
    sound.play("bad");
    guillermo.say(pick(FRASES.desafioError), "animo", "shake");
    wait = 1300;
  }
  bump($("#c-score"), ch.score);
  bump($("#c-streak"), ch.streak);

  ch.pending = setTimeout(() => {
    ch.pending = null;
    if (!ch.running) return;
    ch.index++;
    if (ch.index >= ch.deck.length) { ch.exhausted = true; finishChallenge(); return; }
    renderStatement();
    if (guillermo.mood !== "espera") guillermo.set("espera");
  }, wait);
}

function stopChallenge() {
  ch.running = false;
  clearInterval(ch.timer);
  clearTimeout(ch.pending);
  ch.timer = null;
  ch.pending = null;
}

function finishChallenge() {
  if (!ch.running) return;
  stopChallenge();
  setTfDisabled(true);
  $("#c-time").textContent = ch.exhausted ? $("#c-time").textContent : "0";

  const best = store.get("bestChallenge", 0);
  const isRecord = ch.score > best;
  if (isRecord) store.set("bestChallenge", ch.score);
  updateRecords();

  $("#cr-score").textContent = ch.score;
  $("#cr-correct").textContent = `${ch.correct}/${ch.answered}`;
  $("#cr-best").textContent = Math.max(best, ch.score);
  $("#cr-record").hidden = !isRecord;
  $("#cr-detail").textContent = `Mejor racha: ${ch.bestStreak}. ` +
    (ch.answered ? `Acertaste el ${Math.round((ch.correct / ch.answered) * 100)} % de las afirmaciones.` : "No respondiste ninguna afirmación.");

  sound.play("end");
  show("challenge-results");
  let msg = ch.exhausted ? FRASES.desafioSinMas : FRASES.desafioFin;
  if (isRecord) msg += " ¡Nuevo récord personal!";
  guillermo.say(msg, isRecord ? "alegria" : "sorpresa", "jump");
}

/* =========================================================
   CONTROLES
   ========================================================= */
const actions = {
  home: goHome,
  instructions: () => { show("instructions"); guillermo.say(FRASES.instrucciones, "pensando"); },
  "start-quiz": startQuiz,
  hint: useHint,
  next: nextQuestion,
  "challenge-intro": challengeIntro,
  "start-challenge": startChallenge,
  "quit-challenge": challengeIntro,
  "answer-true": () => answerStatement(true),
  "answer-false": () => answerStatement(false)
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || btn.disabled) return;
  const fn = actions[btn.dataset.action];
  if (!fn) return;
  if (!["hint", "next", "answer-true", "answer-false", "start-quiz", "start-challenge"].includes(btn.dataset.action)) sound.play("click");
  fn();
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const onButton = e.target.closest && e.target.closest("button, a");
  const key = e.key.toLowerCase();

  if (current === "quiz") {
    if (["1", "2", "3", "4"].includes(key)) {
      const b = $("#q-options").children[Number(key) - 1];
      if (b) { e.preventDefault(); answerQuestion(Number(key) - 1); }
    } else if (key === "p") {
      e.preventDefault(); useHint();
    } else if (key === "enter" && !onButton) {
      e.preventDefault(); nextQuestion();
    }
  } else if (current === "challenge") {
    if (key === "v" || key === "arrowleft") { e.preventDefault(); answerStatement(true); }
    else if (key === "f" || key === "arrowright") { e.preventDefault(); answerStatement(false); }
  }
});

function renderSoundButton() {
  const btn = $("#sound-toggle");
  btn.setAttribute("aria-pressed", String(sound.on));
  btn.setAttribute("aria-label", sound.on ? "Sonido activado. Tocar para silenciar" : "Sonido silenciado. Tocar para activar");
  $("#sound-icon").textContent = sound.on ? "🔊" : "🔇";
  $("#sound-label").textContent = sound.on ? "Sonido: sí" : "Sonido: no";
}

$("#sound-toggle").addEventListener("click", () => {
  sound.on = !sound.on;
  store.set("sound", sound.on);
  renderSoundButton();
  sound.play("click");
});

/* ---------- arranque ---------- */
renderSoundButton();
updateRecords();
guillermo.set("espera");
guillermo.startBlinking();
