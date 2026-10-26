/* =========================================================
   PANTALLA DE LA CLASE (proyector.html)
   Se proyecta mientras cada uno juega la evaluación desde su
   dispositivo con el código de la sala. Muestra:
   · el ranking de la sala, igual al del juego, en vivo;
   · la paciencia de Guillermo, compartida por toda la clase;
   · los comodines que usa cada uno, con su escena, de a uno.
   ---------------------------------------------------------
   Todo sale de la tabla «eventos» de Supabase (supabase/clase.sql).
   La pantalla pregunta cada PROY.cadaCuanto ms qué hay de nuevo y
   vuelve a calcular el estado desde TODOS los eventos de la sala:
   si se recarga o se corta internet, al volver queda igual.
   Los eventos se cuentan por id: un repetido no suma dos veces.
   ========================================================= */
const PROY = {
  cadaCuanto: 2000,        // ms entre consultas
  pacienciaMinima: 8,      // la barra arranca con esto…
  pacienciaPorJugador: 1,  // …o con 1 por jugador, lo que sea más
  aciertosPorDiente: 10,   // cada 10 respuestas bien de la clase vuelve un diente
  escenaMaxima: 16000,     // si una escena se traba (pestaña sin dibujar), se corta y sigue la cola
  feed: 4                  // renglones de «últimos movimientos»
};

// los comodines en la pantalla de la clase: cuánta paciencia le devuelven a Guillermo
const COMODIN_CLASE = {
  ssj: { quien: "Kamil", suma: 1, escena: () => escenaKamil },
  cambio: { quien: ELIAS.nombre, suma: 1, escena: () => escenaElias },
  rappi: { quien: "Rappi", suma: 1, escena: () => escenaRappi }
};

const FRASES_CLASE = {
  vacia: "Entren con el código {codigo}. Los espero.",
  llega: ["¡Llegó {nombre}! Suerte.", "Hola, {nombre}. A ver qué sabés.", "{nombre} se sumó. Bienvenido el que viene a aprender."],
  error: [
    ["Mmm… {nombre}, repasá eso.", "{nombre}, esa no era.", "Bueno, {nombre}, puede pasar."],
    ["¡{nombre}! ¿En serio?", "Otro error… me estoy calentando.", "{nombre}, me estás haciendo enojar."],
    ["¡¿{nombre}?! ¡Noooo!", "¡Se me acaba la paciencia, clase!", "¡{nombre}! ¡Uno más y muerdo!"]
  ],
  aciertos: "¡Bien, clase! Me calmo un poquito.",
  fin: "{nombre} terminó con nota {nota}.",
  cero: "¡SE ME ACABÓ LA PACIENCIA!",
  ronda: "Bueno… empiezo de nuevo. Paciencia llena.",
  volvio: "Ta… ya estoy mejor. ¡Pero no abusen!"
};

const proy = {
  sala: null,
  eventos: new Map(),   // id → evento (sin repetidos)
  vistos: new Set(),    // ids que ya tuvieron su reacción
  ultimoId: 0,
  estado: null,
  ok: 0,                // última consulta que salió bien
  timer: 0,
  yo: store.get("jugador", null) || (() => { const id = nuevoId(); store.set("jugador", id); return id; })()
};

/* ---------- el estado de la sala, calculado desde los eventos ---------- */
function calcular(eventos) {
  const partidas = new Map();
  const jugadores = new Set();
  let max = PROY.pacienciaMinima, valor = max, aciertos = 0;
  const efectos = new Map(); // id → { antes, despues } de la paciencia

  for (const ev of eventos) {
    const antes = valor;
    if (ev.tipo === "ronda") {
      valor = max;
      aciertos = 0;
    } else if (ev.tipo === "unirse") {
      partidas.set(ev.partida, { partida: ev.partida, jugador: ev.jugador, nombre: ev.nombre, personaje: ev.personaje, total: ev.total,
        errores: 0, aciertos: 0, respondidas: new Set(), comodines: new Set(), nota: null, primero: ev.id });
      if (!jugadores.has(ev.jugador)) {
        jugadores.add(ev.jugador);
        const nuevo = Math.max(PROY.pacienciaMinima, jugadores.size * PROY.pacienciaPorJugador);
        valor += nuevo - max; // cada jugador nuevo trae su parte de paciencia
        max = nuevo;
      }
    } else {
      const p = partidas.get(ev.partida);
      if (ev.tipo === "respuesta") {
        if (p && !p.respondidas.has(ev.pregunta)) {
          p.respondidas.add(ev.pregunta);
          if (ev.ok) p.aciertos++; else p.errores++;
        }
        if (ev.ok) {
          aciertos++;
          if (aciertos % PROY.aciertosPorDiente === 0) valor = Math.min(max, valor + 1);
        } else valor = Math.max(0, valor - 1);
      } else if (ev.tipo === "comodin") {
        if (p) p.comodines.add(ev.comodin);
        valor = Math.min(max, valor + (COMODIN_CLASE[ev.comodin]?.suma || 0));
      } else if (ev.tipo === "fin" && p) p.nota = ev.nota;
    }
    efectos.set(ev.id, { antes, despues: valor, max });
  }

  // una fila por jugador: su mejor evaluación terminada, o la que está jugando si todavía no terminó ninguna
  const compara = (a, b) => a.errores - b.errores || b.aciertos - a.aciertos || a.comodines.size - b.comodines.size || a.primero - b.primero;
  const porJugador = new Map();
  partidas.forEach((p) => {
    const actual = porJugador.get(p.jugador);
    const terminada = p.nota !== null;
    if (!actual) porJugador.set(p.jugador, p);
    else if (terminada && (actual.nota === null || compara(p, actual) < 0)) porJugador.set(p.jugador, p);
    else if (!terminada && actual.nota === null && p.primero > actual.primero) porJugador.set(p.jugador, p);
  });
  const filas = [...porJugador.values()].sort(compara).map((p) => ({
    id: p.jugador,
    nombre: p.nombre,
    personaje: p.personaje,
    errores: p.errores,
    nota: p.nota,
    jugando: p.nota === null,
    progreso: `pregunta ${Math.min(p.respondidas.size + 1, p.total)} de ${p.total}`
  }));
  return { filas, paciencia: { valor, max }, efectos, partidas };
}

/* ---------- traer los eventos (cada unos segundos) ---------- */
async function traer() {
  // pide desde un poco antes del último: un evento que se guardó tarde (con id menor) no se pierde
  const desde = Math.max(0, proy.ultimoId - 50);
  let nuevos = [];
  try {
    for (let pagina = 0; pagina < 20; pagina++) {
      const r = await supabase("eventos", `?select=id,uid,jugador,partida,tipo,nombre,personaje,pregunta,total,ok,comodin,nota&sala=eq.${proy.sala}&id=gt.${desde}&order=id.asc&offset=${pagina * 1000}&limit=1000`);
      if (!r.ok) throw new Error(r.status);
      const lote = await r.json();
      nuevos = nuevos.concat(lote);
      if (lote.length < 1000) break;
    }
  } catch {
    estadoConexion(false);
    return false;
  }
  proy.ok = Date.now();
  estadoConexion(true);
  const agregados = nuevos.filter((ev) => !proy.eventos.has(ev.id));
  agregados.forEach((ev) => {
    proy.eventos.set(ev.id, ev);
    proy.ultimoId = Math.max(proy.ultimoId, ev.id);
  });
  if (agregados.length || !proy.estado) actualizar(agregados);
  return true;
}

function bucle() {
  clearTimeout(proy.timer);
  traer().finally(() => { proy.timer = setTimeout(bucle, PROY.cadaCuanto); });
}

function estadoConexion(bien) {
  const el = $("#proy-estado");
  const n = proy.estado ? proy.estado.filas.length : 0;
  el.className = "proy-estado " + (bien ? "vivo" : "caido");
  el.textContent = bien
    ? `En vivo · ${n} ${n === 1 ? "jugador" : "jugadores"}`
    : "Sin conexión: reintentando… (lo que pase mientras tanto aparece al volver)";
}

/* ---------- pintar y reaccionar ---------- */
function actualizar(agregados) {
  const lista = [...proy.eventos.values()].sort((a, b) => a.id - b.id);
  const antes = proy.estado;
  proy.estado = calcular(lista);
  pintarTodo(antes);
  // reacciones solo para lo nuevo: lo que ya estaba al abrir la pantalla no se vuelve a actuar
  agregados.sort((a, b) => a.id - b.id).forEach((ev) => {
    if (proy.vistos.has(ev.id)) return;
    proy.vistos.add(ev.id);
    if (!proy.cargando) reaccionar(ev);
  });
  store.set(`proyVistos.${proy.sala}`, proy.ultimoId);
}

function pintarTodo(antes) {
  const { filas, paciencia } = proy.estado;
  // ranking: igual al del juego, con todos los de la sala
  const list = $("#proy-lista");
  pintarRanking(list, filas);
  acomodarRanking();
  const puestoAntes = new Map((antes ? antes.filas : []).map((f, k) => [f.id, k]));
  [...list.children].forEach((li, k) => {
    const f = filas[k];
    li.classList.toggle("jugando", f.jugando);
    if (puestoAntes.has(f.id) && puestoAntes.get(f.id) > k && !reduceMotion.matches) li.classList.add("sube");
  });
  $("#proy-ranking-estado").textContent = filas.length ? "" : "Todavía no entró nadie. Cuando empiecen la evaluación con el código, aparecen acá.";
  pintarPaciencia(paciencia, antes ? antes.paciencia : null);
  estadoConexion(true);
  if (!cola.corriendo) caraSegunPaciencia();
}

// filas tan altas como entren (entre 30 y 64 px); si en una columna quedan muy finas, dos columnas
function acomodarRanking() {
  const list = $("#proy-lista");
  const n = list.children.length;
  if (!n) return;
  list.classList.remove("dos");
  const gap = 6, alto = list.clientHeight;
  const fila = (porColumna) => Math.floor((alto - gap * (porColumna - 1)) / porColumna);
  let f = fila(n);
  list.style.gridTemplateRows = "";
  if (f < 40 && n > 1) {
    // dos columnas que se leen de arriba abajo: 1 a 7 a la izquierda, 8 a 14 a la derecha
    const porColumna = Math.ceil(n / 2);
    list.classList.add("dos");
    list.style.gridTemplateRows = `repeat(${porColumna}, auto)`;
    f = fila(porColumna);
  }
  list.style.setProperty("--fila", `${Math.max(30, Math.min(64, f))}px`);
}

// la paciencia son los mismos dientes del juego: uno por punto, el último en rojo
function pintarPaciencia({ valor, max }, antes) {
  const box = $("#proy-dientes");
  while (box.children.length < max) box.appendChild(document.createElement("span"));
  while (box.children.length > max) box.lastChild.remove();
  const rotos = max - valor;
  [...box.children].forEach((d, k) => {
    const roto = k < rotos; // como en el juego: se rompen desde el primero y el último (rojo) es el que queda
    const era = d.classList.contains("roto");
    d.className = "diente" + (k === max - 1 ? " ultimo" : "") + (roto ? " roto" : "");
    if (antes && !reduceMotion.matches) {
      if (roto && !era) d.classList.add("rompe");
      else if (!roto && era) d.classList.add("vuelve");
    }
  });
  $("#proy-paciencia-num").textContent = `${valor}/${max}`;
  $("#proy-paciencia").setAttribute("aria-label", `Paciencia de Guillermo: ${valor} de ${max}`);
  $("#proy-perdio").hidden = valor > 0;
}

const nivelPaciencia = () => {
  const { valor, max } = proy.estado.paciencia;
  const r = valor / max;
  return valor <= 0 ? 4 : r > 0.7 ? 0 : r > 0.45 ? 1 : r > 0.2 ? 2 : 3;
};

// cara, postura y viñeta roja según la paciencia que queda (las mismas del juego)
function caraSegunPaciencia() {
  if (!proy.estado) return;
  const n = nivelPaciencia();
  const postura = Math.min(3, n);
  $(".host").dataset.enojo = postura;
  if (postura) document.body.dataset.rabia = postura;
  else delete document.body.dataset.rabia;
  guillermo.set(["espera", "molesto", "enojado", "furioso", "furioso"][n]);
}

function alFeed(texto, clase) {
  const ol = $("#proy-feed");
  const li = document.createElement("li");
  li.className = clase || "";
  li.textContent = texto;
  ol.prepend(li);
  while (ol.children.length > PROY.feed) ol.lastChild.remove();
}

const nombreDe = (ev) => {
  const p = proy.estado.partidas.get(ev.partida);
  return p ? p.nombre : "Alguien";
};

function reaccionar(ev) {
  const ef = proy.estado.efectos.get(ev.id);
  const libre = !cola.corriendo; // Guillermo solo habla si no está en una escena
  const nombre = nombreDe(ev);
  if (ev.tipo === "unirse") {
    alFeed(`${nombre} entró a la evaluación`);
    if (libre) guillermo.decir(fill(pickSin(FRASES_CLASE.llega), { nombre }));
  } else if (ev.tipo === "respuesta") {
    if (ev.ok) {
      alFeed(`${nombre} respondió bien`, "bien");
      if (ef.despues > ef.antes) {
        cartelPaciencia("+1");
        if (libre) { sound.play("relief"); guillermo.decir(FRASES_CLASE.aciertos, "alivio"); tarea(caraSegunPaciencia, 1400); }
      }
    } else {
      alFeed(`${nombre} se equivocó`, "mal");
      if (ef.antes > ef.despues) cartelPaciencia("−1", true);
      if (libre && ef.despues > 0) {
        sound.play("bad");
        const n = Math.min(2, Math.max(0, nivelPaciencia() - 1));
        guillermo.decir(fill(pickSin(FRASES_CLASE.error[n]), { nombre }));
        guillermo.set(n ? "enojado" : "molesto", "shake");
        if (n >= 1) vaporClase();
        tarea(caraSegunPaciencia, 900);
      }
    }
  } else if (ev.tipo === "comodin") {
    const c = COMODIN_CLASE[ev.comodin];
    if (!c) return;
    alFeed(`${nombre} llamó a ${c.quien} (+${c.suma} de paciencia)`, "comodin");
    encolar({ texto: `¡${nombre} llamó a ${c.quien}!`, correr: () => c.escena()(ev, nombre, c) });
  } else if (ev.tipo === "fin") {
    alFeed(`${nombre} terminó: nota ${ev.nota}`, ev.nota >= 6 ? "bien" : "");
    if (libre) guillermo.decir(fill(FRASES_CLASE.fin, { nombre, nota: ev.nota }), ev.nota >= 6 ? "alegria" : "pensando", "jump");
    if (libre) tarea(caraSegunPaciencia, 1600);
  } else if (ev.tipo === "ronda") {
    alFeed("Nueva ronda: paciencia llena");
    if (libre) { guillermo.decir(FRASES_CLASE.ronda, "alivio"); tarea(caraSegunPaciencia, 1600); }
  }
  // llegó a cero: el mordisco final, en la cola (después de lo que ya estaba esperando)
  if (ef && ef.antes > 0 && ef.despues === 0) encolar({ texto: "¡Guillermo perdió la paciencia!", correr: escenaFinal });
  // volvió de cero (un comodín o una ronda nueva)
  if (ef && ef.antes === 0 && ef.despues > 0 && libre && ev.tipo !== "ronda") {
    guillermo.decir(FRASES_CLASE.volvio, "alivio");
    tarea(caraSegunPaciencia, 1600);
  }
}

function cartelPaciencia(texto, malo) {
  const r = $("#proy-dientes").getBoundingClientRect();
  if (!r.width) return;
  cartel(texto, r.right + 28, r.top + r.height / 2, malo ? "nam-pop" : "nam-pop ssj-calma", 900);
}

function vaporClase() {
  if (reduceMotion.matches) return;
  const g = guillermo.el.getBoundingClientRect();
  [-1, 1].forEach((lado, k) => {
    const n = nodoFx("vapor");
    const x = g.left + g.width * (0.5 + lado * 0.38), y = g.top + g.height * 0.12;
    efimero(n, animar(n, [
      { transform: `translate(${x}px, ${y}px) scale(0.8)`, opacity: 0.9 },
      { transform: `translate(${x + lado * 16}px, ${y - 40}px) scale(1.4)`, opacity: 0.8, offset: 0.5 },
      { transform: `translate(${x + lado * 28}px, ${y - 76}px) scale(1.8)`, opacity: 0 }
    ], { duration: 900, delay: k * 120, easing: "steps(6)", fill: "both" }), 1100);
  });
}

// lo usa impacto() (comun.js): sacude toda la pantalla
function sacudir(f) {
  if (reduceMotion.matches) return;
  animar($("#proy"), [
    { transform: "none" }, { transform: `translate(${-f}px, ${f / 2}px)` }, { transform: `translate(${f}px, ${-f / 2}px)` },
    { transform: `translate(${-f / 2}px, ${f / 3}px)` }, { transform: "none" }
  ], { duration: 260, easing: "steps(4)" });
}

/* ---------- cola de escenas: de a una, en orden, sin perder ninguna ---------- */
const cola = { items: [], corriendo: false };

function encolar(item) {
  cola.items.push(item);
  mostrarCartel();
  if (!cola.corriendo) correrCola();
}

function mostrarCartel(texto) {
  if (texto !== undefined) $("#proy-cartel-texto").textContent = texto;
  const quedan = cola.items.length;
  $("#proy-cartel-cola").textContent = cola.corriendo && quedan ? `(${quedan} más en espera)` : "";
}

// con la pestaña escondida el navegador no dibuja: la cola espera a que se vuelva a ver
const visible = () => document.hidden
  ? new Promise((r) => document.addEventListener("visibilitychange", function f() {
    if (!document.hidden) { document.removeEventListener("visibilitychange", f); r(); }
  }))
  : Promise.resolve();

async function correrCola() {
  cola.corriendo = true;
  while (cola.items.length) {
    await visible();
    const item = cola.items.shift();
    $("#proy-cartel").hidden = false;
    mostrarCartel(item.texto);
    const gen = mordida.gen;
    let corte;
    try {
      await Promise.race([item.correr(), new Promise((r) => { corte = setTimeout(r, PROY.escenaMaxima); })]);
    } catch (e) { console.warn("escena", e); }
    clearTimeout(corte);
    if (gen === mordida.gen) limpiarEscena();
    $("#proy-cartel").hidden = true;
    await new Promise((r) => setTimeout(r, 350)); // un respiro entre escena y escena
  }
  cola.corriendo = false;
  caraSegunPaciencia();
}

// saca todo lo que haya quedado de la escena (también si se cortó por tiempo)
function limpiarEscena() {
  mordida.gen++;
  mordida.timers.forEach(clearTimeout);
  mordida.timers.clear();
  mordida.anims.forEach((a) => a.cancel());
  mordida.anims.clear();
  mordida.nodos.forEach((n) => n.remove());
  mordida.nodos.clear();
  if (disparo.raf) cancelAnimationFrame(disparo.raf);
  disparo.raf = 0;
  sound.callar();
  guillermo.bubble.style.opacity = "";
  guillermo.el.style.visibility = "";
  document.body.classList.remove("estallido");
}

/* ---------- dónde se para cada personaje (al costado de Guillermo, mirándolo) ---------- */
function medirActor(cfg, alto) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const g = guillermo.el.getBoundingClientRect();
  const blanco = { x: g.left + g.width * (GUILLE.cara[0] / GUILLE.w), y: g.top + g.height * (GUILLE.cara[1] / GUILLE.h) };
  const dir = blanco.x < vw / 2 ? 1 : -1; // del lado con más lugar
  const espejo = dir > 0;                  // los dibujos miran a la derecha: si queda a la derecha, se dan vuelta
  const s = alto / cfg.h;
  const [ax, ay] = cfg.ancla;
  const lado = cfg.aura ? anchoSSJ : (l) => l; // Kamil cuenta también su aura
  const ext = (espejo ? [cfg.w - ax, ax] : [ax, cfg.w - ax]).map((l) => lado(l) * s);
  const borde = dir > 0 ? g.right : g.left;
  const x = Math.min(vw - 8 - ext[1], Math.max(8 + ext[0], borde + dir * (alto * 0.7 + 20)));
  const y = Math.min(vh - 6, Math.max(g.bottom, 6 + Math.max(ay, cfg.aura ? cfg.aura.h * 1.08 : 0) * s)); // que no se corte arriba (el aura crece al transformarse)
  const punto = ([px, py]) => ({ x: x + (px - ax) * s * (espejo ? -1 : 1), y: y - (ay - py) * s });
  return { vw, vh, g, blanco, dir, espejo, s, x, y, ext, punto };
}

// globo de diálogo de un personaje, arriba de su cabeza
function globoActor(E, cfg, texto, ms) {
  const globo = nodoFx("ssj-globo");
  globo.textContent = texto;
  const p = E.punto([cfg.ancla[0], cfg.h * 0.22]);
  const en = (k) => `translate(${p.x + E.dir * 6}px, ${p.y}px) translate(${E.dir > 0 ? -100 : 0}%, -100%) scale(${k})`;
  efimero(globo, animar(globo, [
    { transform: en(0.7), opacity: 0 }, { transform: en(1), opacity: 1, offset: 0.12 },
    { transform: en(1), opacity: 1, offset: 0.88 }, { transform: en(1), opacity: 0 }
  ], { duration: ms, easing: "steps(4)", fill: "forwards" }), ms);
}

function mareado(dir, ms) {
  if (reduceMotion.matches) return;
  animar($(".mascot-wrap"), [
    { transform: "none" }, { transform: `translateX(${-dir * 26}px) rotate(${-dir * 12}deg)`, offset: 0.15 },
    { transform: `translateX(${-dir * 18}px) rotate(${dir * 6}deg)`, offset: 0.4 },
    { transform: `translateX(${-dir * 8}px) rotate(${-dir * 4}deg)`, offset: 0.65 }, { transform: "none" }
  ], { duration: ms, easing: "steps(10)" });
  estrellas(guillermo.el.getBoundingClientRect(), ms + 300);
}

function sumaPaciencia(c) {
  const r = $("#proy-dientes").getBoundingClientRect();
  if (r.width) cartel(`PACIENCIA +${c.suma}`, r.left + r.width / 2, r.top - 18, "nam-pop ssj-calma", 1500);
}

/* ---------- KAMIL: se transforma en SSJ y le tira un Kamehameha (como en el juego) ---------- */
async function escenaKamil(ev, nombre, c) {
  await hojaSSJ();
  const T = TIEMPOS_SSJ.normal;
  const alto = Math.min(window.innerHeight * 0.55, guillermo.el.offsetHeight * 1.7);
  const E = medirActor(SSJ, alto);
  const { s, dir } = E;
  const cabeza = E.punto([SSJ.ancla[0], 30]);
  const actor = nodoFx("ssj-actor");
  actor.style.width = `${SSJ.w * s}px`;
  actor.style.height = `${SSJ.h * s}px`;
  actor.innerHTML = `<div class="ssj-cuerpo">${auraSSJ()}<div class="ssj-sprite"></div></div>`;
  const cuerpo = actor.firstChild;
  const aura = cuerpo.querySelector(".ssj-aura");
  const sprite = cuerpo.querySelector(".ssj-sprite");
  cuerpo.style.transformOrigin = sprite.style.transformOrigin = `${SSJ.ancla[0] * s}px 100%`;
  if (E.espejo) cuerpo.style.transform = "scaleX(-1)";
  sprite.style.backgroundImage = `url("${SSJ.src}")`;
  sprite.style.backgroundSize = `${SSJ.w * s * SSJ.poses.length}px ${SSJ.h * s}px`;
  const poner = (pose) => { sprite.style.backgroundPosition = `${-SSJ.poses.indexOf(pose) * SSJ.w * s}px 0`; };
  const lugar = (dx = 0, dy = 0) => `translate(${E.x - SSJ.ancla[0] * s + dx}px, ${E.y - SSJ.ancla[1] * s + dy}px)`;
  actor.style.transform = lugar();

  // 1) entra corriendo y se planta
  poner("entrada");
  sound.play("ssjEntra", true);
  guillermo.set(cara("sorpresa", "Guillermo, sorprendido, mira quién llegó"));
  guillermo.decir(`¿Eh? ¿${nombre} llamó a Kamil?`);
  const desde = dir > 0 ? E.vw + E.ext[0] + 20 - E.x : -(E.x + E.ext[1] + 20);
  animar(actor, [0, 1, 2, 3, 4, 5, 6].map((k) => ({ transform: lugar(desde * (1 - k / 6), k % 2 ? -16 * s : 0) })), { duration: T.entrada, easing: "linear", fill: "forwards" });
  if (!(await esperar(T.entrada))) return;
  poner("reposo");
  globoActor(E, SSJ, "¡Tranqui, Guillermo! Yo me encargo.", 1300);
  if (!(await esperar(T.plantado + 300))) return;

  // 2) junta energía y se transforma
  poner("preparacion");
  sound.play("ssjAura", true);
  aura.className = "ssj-aura junta";
  chispas(E, 18, T.prepara + 200);
  animar(actor, [0, 1, 2, 3, 4, 5, 6, 7].map((k) => ({ transform: lugar((k % 2 ? 1 : -1) * (0.5 + k * 0.3), 0) })), { duration: T.prepara, easing: "steps(8)", fill: "forwards" });
  cartel("¡¡HHNNN…!!", cabeza.x, cabeza.y, "nam-pop ssj-grito", T.prepara + T.anticipa);
  if (!(await esperar(T.prepara + T.anticipa))) return;
  animar(actor, [{ transform: lugar() }], { duration: 1, fill: "forwards" });
  poner("ssj");
  sound.play("ssjTransforma", true);
  aura.className = "ssj-aura ssj";
  brillo(E.punto([SSJ.ancla[0], 250]), SSJ.h * s * 1.05, "#fff1a0");
  chispas(E, 26, T.transforma + 600);
  guillermo.set(cara("nervioso", "Guillermo, nervioso y sudando, ve venir el ataque"));
  guillermo.decir("Pará, pará… ¿qué es ese pelo?");
  if (!(await esperar(T.transforma))) return;

  // 3) carga el Kamehameha
  const bola = nodoFx("kame-bola");
  const luz = nodoFx("kame-luz");
  const r0 = Math.max(12, 34 * s);
  [bola, luz].forEach((n) => { n.style.width = n.style.height = `${(n === luz ? 5 : 2) * r0}px`; });
  const enBola = (p, k) => `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${k})`;
  poner("carga");
  sound.play("kame", true);
  const manos = E.punto(SSJ.manos.carga);
  animar(bola, [0.15, 0.3, 0.28, 0.5, 0.46, 0.7, 0.66, 0.9, 1].map((k) => ({ transform: enBola(manos, k) })), { duration: T.carga, easing: "steps(9)", fill: "forwards" });
  animar(luz, [{ transform: enBola(manos, 0.2), opacity: 0.2 }, { transform: enBola(manos, 1), opacity: 0.85 }], { duration: T.carga, easing: "steps(6)", fill: "forwards" });
  converger(manos, r0 * 3, 14, T.carga);
  ["Ka…", "me…", "ha…", "me…"].forEach((txt, i) => tarea(() => cartel(txt, cabeza.x + (i - 1.5) * SSJ.w * s * 0.22, cabeza.y - 6, "nam-pop kame-txt", 560), i * (T.carga / 4)));
  if (!(await esperar(T.carga))) return;

  // 4) dispara a la cara de Guillermo
  poner("disparo");
  sound.play("beam", true);
  const palmas = E.punto(SSJ.manos.disparo);
  const g = guillermo.el.getBoundingClientRect();
  const blanco = { x: g.left + g.width * (GUILLE.cara[0] / GUILLE.w), y: g.top + g.height * (GUILLE.cara[1] / GUILLE.h) };
  [[bola, 1], [luz, 1.1]].forEach(([n, k]) => animar(n, [{ transform: enBola(palmas, k) }], { duration: 1, fill: "forwards" }));
  animar(actor, [{ transform: lugar(dir * 12 * s, 0) }, { transform: lugar() }], { duration: 300, easing: "steps(3)", fill: "forwards" });
  cartel("¡¡HAAAA!!", cabeza.x, cabeza.y, "nam-pop ssj-grito grande", 900);
  const dx = blanco.x - palmas.x, dy = blanco.y - palmas.y;
  const rayo = nodoFx("rayo");
  const grosor = Math.max(18, 44 * s);
  rayo.style.height = `${grosor}px`;
  rayo.style.transform = `translate(${palmas.x}px, ${palmas.y - grosor / 2}px) rotate(${Math.atan2(dy, dx)}rad)`;
  rayo.innerHTML = `<div class="rayo-cuerpo"></div><div class="rayo-cabeza"></div>`;
  animar(rayo, [{ width: "0px" }, { width: `${Math.hypot(dx, dy)}px` }], { duration: T.viaje, easing: "steps(7)", fill: "forwards" });
  animar(rayo.firstChild, [{ transform: "scaleY(1)" }, { transform: "scaleY(0.85)" }, { transform: "scaleY(1.08)" }, { transform: "scaleY(0.92)" }], { duration: 360, iterations: 3, delay: T.viaje, easing: "steps(4)" });
  if (!(await esperar(T.viaje))) return;

  // 5) impacto: Guillermo queda mareado y se calma
  sound.play("ssjImpacto", true);
  impacto(blanco, g.width);
  guillermo.set(cara("aturdido", "Guillermo, mareado, con los ojos en cruz"));
  guillermo.decir("¡¿Eeeh?! …¿Qué pasó? Veo estrellitas…");
  mareado(dir, 1300);
  sumaPaciencia(c);
  if (!(await esperar(380))) return;
  [rayo, bola, luz].forEach((n) => animar(n, [{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: "steps(3)", fill: "forwards" }));
  if (!(await esperar(T.impacto))) return;

  // 6) festeja y se va
  poner("recuperacion");
  aura.className = "ssj-aura apaga";
  if (!(await esperar(T.recupera))) return;
  aura.className = "ssj-aura";
  poner("victoria");
  sound.play("ssjVictoria", true);
  globoActor(E, SSJ, `¡Listo, ${nombre}! Seguí vos.`, 1100);
  guillermo.decir("Ta, ta… me calmo.", "alivio");
  if (!(await esperar(T.victoria + 300))) return;
  poner("entrada");
  cuerpo.style.transform = dir > 0 ? "none" : "scaleX(-1)";
  const hasta = dir > 0 ? E.vw + E.ext[1] + 20 - E.x : -(E.x + E.ext[0] + 20);
  animar(actor, [0, 1, 2, 3, 4].map((k) => ({ transform: lugar(hasta * (k / 4), k % 2 ? -16 * s : 0) })), { duration: T.salida, easing: "linear", fill: "forwards" });
  await esperar(T.salida);
}

/* ---------- ELÍAS: en el juego cambia la pregunta; acá le rompe el reto a Guillermo ----------
   Le dispara al globo donde Guillermo está retando a la clase: el globo se rompe en píxeles
   (la misma rotura de la pregunta en el juego), Guillermo se queda sin palabras y el reto se
   corta. Caricaturesco: el disparo es al globo, no a Guillermo. */
async function escenaElias(ev, nombre, c) {
  await hojaElias();
  const T = TIEMPOS_ELIAS.normal;
  const globo = guillermo.bubble;
  guillermo.decir(pick(["¡Clase! ¡Presten atención o los muerdo a todos!", "¡Esto es un desastre! ¡Les voy a poner un 1 a todos!", "¡A ver si estudiamos un poquito más, eh!"]), "enojado");
  if (!(await esperar(500))) return;

  const alto = Math.min(window.innerHeight * 0.48, guillermo.el.offsetHeight * 1.5);
  const g = guillermo.el.getBoundingClientRect();
  const s = alto / ELIAS.h;
  const dir = -1; // se planta a la derecha de Guillermo y mira hacia él (a la izquierda)
  // el caño queda bien afuera de Guillermo: apunta al globo, nunca a él
  const caño = (ELIAS.boca[0] - ELIAS.ancla[0]) * s;
  const x = Math.min(window.innerWidth - 8 - ELIAS.atras * s, g.right + caño + g.width * 0.25);
  // se sube hasta que el caño queda a la altura del globo: el disparo va derecho al globo
  const rg = globo.getBoundingClientRect();
  const altura = (ELIAS.ancla[1] - ELIAS.boca[1]) * s;
  const y = Math.min(window.innerHeight - 6, g.bottom, Math.max(ELIAS.h * s + 6, rg.top + rg.height * 0.55 + altura));
  const boca = { x: x + dir * caño, y: y - altura };
  const actor = nodoFx("elias-actor");
  actor.style.width = `${ELIAS.w * s}px`;
  actor.style.height = `${ELIAS.h * s}px`;
  actor.innerHTML = `<div class="elias-sprite"></div>`;
  const sprite = actor.firstChild;
  sprite.style.transformOrigin = `${ELIAS.ancla[0] * s}px 100%`;
  sprite.style.backgroundImage = `url("${ELIAS.src}")`;
  sprite.style.backgroundSize = `${ELIAS.w * s * ELIAS.poses.length}px ${ELIAS.h * s}px`;
  const mirar = (d) => { sprite.style.transform = d < 0 ? "scaleX(-1)" : "none"; };
  const poner = (pose) => { sprite.style.backgroundPosition = `${-ELIAS.poses.indexOf(pose) * ELIAS.w * s}px 0`; };
  const lugar = (dx = 0, dy = 0) => `translate(${x - ELIAS.ancla[0] * s + dx}px, ${y - ELIAS.ancla[1] * s + dy}px)`;
  mirar(dir);
  actor.style.transform = lugar();

  // 1) entra a saltitos desde el borde derecho
  poner("reposo");
  sound.play("eliasEntra", true);
  const desde = window.innerWidth + ELIAS.atras * s + 10 - x;
  animar(actor, [0, 1, 2, 3, 4].map((k) => ({ transform: lugar(desde * (1 - k / 4), k % 2 ? -12 * s : 0) })), { duration: T.entrada, easing: "linear", fill: "forwards" });
  if (!(await esperar(T.entrada + T.plantado))) return;

  // 2) saca el arma y apunta al globo del reto
  poner("preparacion");
  sound.play("eliasCarga", true);
  guillermo.set(cara("sorpresa", "Guillermo, sorprendido, mira a quien llegó"));
  if (!(await esperar(T.prepara))) return;
  poner("apuntando");
  guillermo.set(cara("asustado", "Guillermo, asustado, ve que le apuntan al globo"));
  if (!(await esperar(T.apunta))) return;

  // 3) dispara: el globo se rompe en píxeles
  const r = globo.getBoundingClientRect();
  const blanco = { x: r.left + r.width * 0.8, y: Math.min(r.bottom - 8, Math.max(r.top + 8, boca.y)) };
  const px = pixelesDe(globo);
  poner("disparando");
  sound.play("eliasDisparo", true);
  animar(actor, [{ transform: lugar(-dir * 60 * s, 0) }, { transform: lugar() }], { duration: T.retroceso * 2, easing: "steps(2)", fill: "forwards" });
  const bala = nodoFx("elias-bala");
  const dx = blanco.x - boca.x, dy = blanco.y - boca.y;
  bala.style.transform = `translate(${boca.x}px, ${boca.y - 2}px) rotate(${Math.atan2(dy, dx)}rad)`;
  efimero(bala, animar(bala, [{ width: "0px", opacity: 1 }, { width: `${Math.hypot(dx, dy)}px`, opacity: 1, offset: 0.6 }, { width: `${Math.hypot(dx, dy)}px`, opacity: 0 }],
    { duration: T.bala * 2.5, easing: "steps(4)", fill: "forwards" }), T.bala * 2.5);
  if (!(await esperar(T.bala))) return;
  sound.play("eliasRompe", true);
  globo.style.opacity = "0";
  cartel("¡PUM!", blanco.x, blanco.y, "nam-pop kame-txt grande", 800);
  guillermo.set(cara("aturdido", "Guillermo se quedó sin palabras: le rompieron el globo"));
  tarea(() => poner("apuntando"), 240);
  if (!(await animarPixeles(px, blanco, "rompe", T.rompe))) return;

  // 4) Guillermo se queda sin el reto: el globo vuelve con otra frase
  guillermo.text.textContent = `…¿Qué estaba diciendo? ${nombre}, me cortaste el reto.`;
  const nuevo = pixelesDe(globo);
  if (!(await animarPixeles(nuevo, blanco, "arma", T.arma))) return;
  globo.style.opacity = "";
  sound.play("eliasArma", true);
  sumaPaciencia(c);
  guillermo.set("sorpresa");

  // 5) guarda el arma y se va
  poner("preparacion");
  if (!(await esperar(T.baja))) return;
  poner("reposo");
  mirar(-dir);
  const hasta = window.innerWidth + ELIAS.atras * s + 10 - x;
  animar(actor, [0, 1, 2, 3, 4].map((k) => ({ transform: lugar(hasta * (k / 4), k % 2 ? -12 * s : 0) })), { duration: T.salida, easing: "linear", fill: "forwards" });
  await esperar(T.salida + 400);
}

/* ---------- RAPPI: en el juego atropella opciones; acá le pasa por encima a Guillermo ----------
   Pasa a toda velocidad, Guillermo queda aplastado como un dibujito y vuelve a su forma,
   mareado. Con la distracción se olvida de un enojo. */
async function escenaRappi(ev, nombre, c) {
  const g = guillermo.el.getBoundingClientRect();
  const w = Math.round(g.width * 0.95);
  const h = Math.round(w * 43 / 52);
  const moto = nodoFx("proy-rappi");
  moto.style.width = `${w}px`;
  moto.innerHTML = pixelSVG(RAPPI_SPRITE, RAPPI_PALETA);
  const suelo = g.bottom - h * 0.92;
  const vw = window.innerWidth;
  const v = RAPPI.velocidad * 1.6;
  const ir = (x, y, r = 0) => `translate(${x}px, ${y}px) rotate(${r}deg)`;
  moto.style.transform = ir(-w - 30, suelo);

  guillermo.decir("¿Qué es ese ruido?");
  guillermo.set(cara("sorpresa", "Guillermo, sorprendido, escucha una moto"));
  sound.play("moto");
  if (!(await esperar(600))) return;
  guillermo.set(cara("asustado", "Guillermo, asustado, ve venir la moto"));
  guillermo.decir("¡¿RAPPI?! ¡No, no, nooo!");

  // la moto cruza toda la pantalla; cuando la rueda de adelante llega a Guillermo, lo pisa
  const x0 = -w - 30, x1 = vw + 30;
  const dur = ((x1 - x0) / v) * 1000;
  const golpe = ((g.left + g.width * 0.25 - w * RAPPI.ruedaDelantera - x0) / (x1 - x0)) * dur;
  animar(moto, [
    { transform: ir(x0, suelo) }, { transform: ir(g.left - w * 0.4, suelo), offset: Math.max(0.05, golpe / dur - 0.04) },
    { transform: ir(g.left + g.width * 0.2, suelo - h * 0.35, -8), offset: Math.min(0.9, golpe / dur + 0.06) },
    { transform: ir(g.right, suelo, 6), offset: Math.min(0.95, golpe / dur + 0.14) }, { transform: ir(x1, suelo) }
  ], { duration: dur, easing: "linear", fill: "forwards" });
  if (!(await esperar(Math.max(0, golpe)))) return;

  // ¡pisado! queda chato, sale polvo y vuelve como un resorte
  sound.play("crash");
  cartel("¡PISADO!", g.left + g.width / 2, g.top + g.height * 0.2, "nam-pop kame-txt grande", 900);
  guillermo.set(cara("aturdido", "Guillermo, aplastado por la moto, con los ojos en cruz"));
  if (!reduceMotion.matches) {
    animar(guillermo.el, [
      { transform: "none" }, { transform: "scale(1.25, 0.3)", offset: 0.12 }, { transform: "scale(1.25, 0.3)", offset: 0.55 },
      { transform: "scale(0.85, 1.2)", offset: 0.75 }, { transform: "scale(1.05, 0.95)", offset: 0.88 }, { transform: "none" }
    ], { duration: 1400, easing: "steps(10)" });
    polvo(g.left + g.width / 2, g.bottom - 6, 12);
  }
  if (!(await esperar(1400))) return;
  sound.play("relief");
  guillermo.decir(`¡${nombre}! …Ay. Ya ni me acuerdo por qué estaba enojado.`);
  mareado(1, 1200);
  sumaPaciencia(c);
  await esperar(1700);
}

function polvo(x, y, cantidad) {
  for (let k = 0; k < cantidad; k++) {
    const n = nodoFx("polvo");
    const lado = k % 2 ? 1 : -1;
    const dx = lado * (40 + Math.random() * 90), dy = -(10 + Math.random() * 40);
    const dur = 600 + Math.random() * 400;
    efimero(n, animar(n, [
      { transform: `translate(${x}px, ${y}px) scale(0.6)`, opacity: 0.9 },
      { transform: `translate(${x + dx}px, ${y + dy}px) scale(1.6)`, opacity: 0 }
    ], { duration: dur, easing: "steps(5)", fill: "forwards" }), dur);
  }
}

/* ---------- se le acabó la paciencia: el mordisco final, en grande ---------- */
async function escenaFinal() {
  const g = guillermo.el.getBoundingClientRect();
  $(".host").dataset.enojo = 3;
  document.body.dataset.rabia = 3;
  guillermo.set("furioso", "shake");
  guillermo.decir(FRASES_CLASE.cero);
  sound.play("growl");
  vaporClase();
  if (!(await esperar(1200))) return;
  document.body.classList.add("estallido");
  guillermo.set(cara("mordidaFinal", "Guillermo abre una boca gigante para comerse la paciencia"));
  if (!reduceMotion.matches) animar(guillermo.el, [{ transform: "none" }, { transform: "scale(1.25)" }, { transform: "scale(1.15)" }], { duration: 500, easing: "steps(3)", fill: "forwards" });
  if (!(await esperar(500))) return;
  // se come los dientes de la paciencia, de a mordiscos
  const d = $("#proy-dientes").getBoundingClientRect();
  for (let k = 0; k < 3; k++) {
    sound.play("namBig");
    cartel("¡ÑAM!", d.left + d.width * (0.25 + k * 0.25), d.top - 10, "nam-pop grande", 700);
    migas(d.left + d.width * (0.25 + k * 0.25), d.top + d.height / 2, 0, -1, 10);
    sacudir(6);
    if (!(await esperar(450))) return;
  }
  guillermo.set("lleno");
  guillermo.decir("Ñam… ¡Me comí toda la paciencia! Ahora estudien, que vuelvo a enojarme.");
  if (!reduceMotion.matches) animar(guillermo.el, [{ transform: "scale(1.15)" }, { transform: "none" }], { duration: 400, easing: "steps(3)", fill: "forwards" });
  await esperar(2600);
  document.body.classList.remove("estallido");
}

/* ---------- sala: crear una nueva o seguir con la que estaba ---------- */
async function crearSala() {
  const btn = $("#proy-crear");
  btn.disabled = true;
  $("#proy-inicio-error").textContent = "Creando la sala…";
  for (let intento = 0; intento < 5; intento++) {
    const codigo = Array.from({ length: SALA.largo }, () => SALA.letras[Math.floor(Math.random() * SALA.letras.length)]).join("");
    try {
      const r = await supabase("salas", "", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ codigo }) });
      if (r.ok) return abrirSala(codigo, true);
      if (r.status !== 409) throw new Error(r.status); // 409: el código ya existe, se prueba otro
    } catch (e) {
      $("#proy-inicio-error").textContent = "No se pudo crear la sala. Revisá la conexión a internet y probá de nuevo.";
      btn.disabled = false;
      return;
    }
  }
  btn.disabled = false;
}

function abrirSala(codigo, nueva) {
  sound.ensure(); // el clic habilita el sonido
  proy.sala = codigo;
  store.set("proySala", codigo);
  history.replaceState(null, "", `?sala=${codigo}`);
  Object.assign(proy, { eventos: new Map(), vistos: new Set(), ultimoId: 0, estado: null });
  limpiarEscena();
  cola.items = [];
  $("#proy-feed").innerHTML = "";
  $("#proy-inicio").hidden = true;
  $("#proy-ronda").hidden = $("#proy-sala-nueva").hidden = false;

  // cómo entrar: la dirección del juego con el código, y el QR
  const url = new URL(`index.html?sala=${codigo}`, location.href).href;
  $("#proy-codigo").textContent = codigo;
  $("#proy-url").textContent = url.replace(/^https?:\/\//, "").replace(/index\.html\?sala=.*$/, "");
  $("#proy-entrar").hidden = false;
  const qr = $("#proy-qr");
  qr.innerHTML = "";
  if (window.QRCode) new QRCode(qr, { text: url, width: 256, height: 256, colorDark: "#0a0d22", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
  else qr.hidden = true;

  // lo que ya pasó en la sala no se vuelve a actuar; si había comodines sin ver, se cuentan
  const yaVisto = nueva ? 0 : store.get(`proyVistos.${codigo}`, 0);
  proy.cargando = true;
  traer().then((ok) => {
    proy.cargando = false;
    const sinVer = [];
    proy.eventos.forEach((ev) => {
      proy.vistos.add(ev.id);
      if (ev.id > yaVisto && ev.tipo === "comodin") sinVer.push(`${nombreDe(ev)} llamó a ${COMODIN_CLASE[ev.comodin]?.quien}`);
    });
    store.set(`proyVistos.${codigo}`, proy.ultimoId);
    if (sinVer.length) guillermo.decir(`Mientras la pantalla estaba cerrada: ${sinVer.slice(-4).join(", ")}.`, "pensando");
    else if (!proy.estado || !proy.estado.filas.length) guillermo.decir(fill(FRASES_CLASE.vacia, { codigo }), "espera");
    if (!ok) estadoConexion(false);
    caraSegunPaciencia();
    proy.timer = setTimeout(bucle, PROY.cadaCuanto);
  });
}

async function nuevaRonda() {
  if (!proy.sala || !confirm("¿Empezar una ronda nueva? La paciencia de Guillermo vuelve a llenarse. El ranking queda igual.")) return;
  try {
    await supabase("eventos", "?on_conflict=uid", { method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify({ uid: nuevoId(), sala: proy.sala, jugador: proy.yo, partida: nuevoId(), tipo: "ronda" }) });
    traer();
  } catch {
    alert("No se pudo empezar la ronda: revisá la conexión.");
  }
}

/* ---------- tamaño de Guillermo: escala entera para que se vea nítido ---------- */
function escalar() {
  const izq = $(".proy-izq").getBoundingClientRect();
  const k = Math.max(3, Math.floor(Math.min((window.innerHeight * 0.4) / GUILLE.h, (izq.width * 0.6) / GUILLE.w)));
  document.documentElement.style.setProperty("--escala", k);
}

/* ---------- controles ---------- */
function renderSonido() {
  const btn = $("#sound-toggle");
  btn.setAttribute("aria-pressed", String(sound.on));
  $("#sound-icon").textContent = sound.on ? "🔊" : "🔇";
  $("#sound-label").textContent = sound.on ? "Sonido: sí" : "Sonido: no";
}
$("#sound-toggle").addEventListener("click", () => {
  sound.on = !sound.on;
  store.set("sound", sound.on);
  if (!sound.on) sound.callar();
  renderSonido();
});
$("#proy-crear").addEventListener("click", crearSala);
$("#proy-seguir").addEventListener("click", () => abrirSala(proy.pendiente, false));
$("#proy-ronda").addEventListener("click", nuevaRonda);
$("#proy-sala-nueva").addEventListener("click", () => {
  if (confirm("¿Crear una sala nueva? Esta queda guardada, pero la pantalla pasa a mostrar la nueva.")) crearSala();
});
$("#proy-completa").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
});
window.addEventListener("resize", () => { escalar(); acomodarRanking(); });
// al volver a mostrar la pestaña, se pide enseguida lo nuevo
document.addEventListener("visibilitychange", () => { if (!document.hidden && proy.sala) bucle(); });

/* ---------- arranque ---------- */
renderSonido();
escalar();
guillermo.set("espera");
guillermo.startBlinking();
hojaSSJ();
hojaElias();
if (!ranking.activo()) {
  $("#proy-inicio-texto").textContent = "Falta configurar Supabase (RANKING en comun.js) para usar la pantalla de la clase.";
  $("#proy-crear").disabled = true;
} else {
  const codigo = normalizarSala(new URLSearchParams(location.search).get("sala") || store.get("proySala", ""));
  if (salaValida(codigo)) {
    proy.pendiente = codigo;
    $("#proy-seguir").hidden = false;
    $("#proy-seguir").textContent = `▶ Seguir con la sala ${codigo}`;
  }
}
