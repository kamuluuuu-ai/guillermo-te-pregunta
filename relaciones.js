/* =========================================================
   Guillermo te pregunta · RELACIONES (contenido de relaciones.html)
   ---------------------------------------------------------
   Esta página usa el mismo motor que la de grafos (script.js y
   comun.js): enojo, mordiscos, comodines, desafío y clase.
   Acá va solo lo de relaciones: los temas, las preguntas, los
   ejercicios interactivos y el desafío de verdadero o falso.
   Se carga ANTES que comun.js y script.js y deja todo en
   window.MATERIA, que el motor lee si existe.

   Fuentes (el alcance sale de acá):
     · «Práctico de relaciones (primera parte)»
     · Diapositivas «Relaciones – Primera parte»
     · «Práctico de Relaciones» (representación y propiedades)
   Apoyo: Rosen, «Matemática discreta y sus aplicaciones», y el
   capítulo 8 «Relaciones» del libro de Matemáticas Discretas
   publicado en Medium.

   Las soluciones de los ejercicios NO están escritas a mano:
   se calculan a partir de los conjuntos y los pares de cada uno.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- utilidades (propias: comun.js todavía no cargó) ---------- */
  const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const LETRAS = "abcdefghij".split("");
  const azar = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const elegir = (xs) => xs[Math.floor(Math.random() * xs.length)];
  function mezclar(xs) {
    const a = xs.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // n elementos al azar, en el mismo orden en que están en xs
  function muestra(xs, n) {
    return mezclar(xs.map((_, i) => i)).slice(0, n).sort((a, b) => a - b).map((i) => xs[i]);
  }
  const unicos = (xs) => [...new Set(xs)];
  function enLista(xs) {
    return xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}` : xs[0] === undefined ? "nada" : String(xs[0]);
  }

  /* ---------- relaciones: pares, conjuntos y propiedades ---------- */
  const kp = (x, y) => `${x}|${y}`;
  const par = (x, y) => `(${x}, ${y})`;
  const parTxt = ([x, y]) => par(x, y);
  const llaves = (xs) => (xs.length ? `{${xs.join(", ")}}` : "∅");
  const relTxt = (R) => (R.length ? `{${R.map(parTxt).join(", ")}}` : "∅");
  const producto = (A, B) => A.flatMap((x) => B.map((y) => [x, y]));
  const claves = (R) => new Set(R.map(([x, y]) => kp(x, y)));
  const ordenar = (R, A, B) => R.slice().sort((p, q) => A.indexOf(p[0]) - A.indexOf(q[0]) || B.indexOf(p[1]) - B.indexOf(q[1]));
  const dominio = (A, R) => A.filter((x) => R.some((p) => p[0] === x));
  const imagen = (B, R) => B.filter((y) => R.some((p) => p[1] === y));
  const inversa = (R) => R.map(([x, y]) => [y, x]);

  // las tres propiedades del práctico para R en A, con los pares que lo muestran
  function propiedades(A, R) {
    const S = claves(R);
    const esta = (x, y) => S.has(kp(x, y));
    const faltanId = A.filter((x) => !esta(x, x));
    const sinInverso = R.filter(([x, y]) => !esta(y, x));
    const cadenas = [];
    const fallas = []; // [x, y, z] con (x, y) ∈ R, (y, z) ∈ R y (x, z) ∉ R (una por cada (x, z) que falta)
    R.forEach(([x, y]) => R.forEach(([y2, z]) => {
      if (y !== y2) return;
      cadenas.push([x, y, z]);
      if (!esta(x, z) && !fallas.some((f) => f[0] === x && f[2] === z)) fallas.push([x, y, z]);
    }));
    return { identica: !faltanId.length, simetrica: !sinInverso.length, transitiva: !fallas.length, faltanId, sinInverso, cadenas, fallas };
  }

  // la justificación de cada propiedad, con pares concretos
  function explicarPropiedades(A, R) {
    const p = propiedades(A, R);
    const lazos = A.map((x) => par(x, x));
    const identica = p.identica
      ? `Idéntica ✓: está (x, x) para cada x de A: ${enLista(lazos)}.`
      : `Idéntica ✗: ${p.faltanId.length > 1 ? "faltan" : "falta"} ${enLista(p.faltanId.map((x) => par(x, x)))}.`;
    let simetrica;
    if (!p.simetrica) {
      simetrica = `Simétrica ✗: ${p.sinInverso.slice(0, 2).map(([x, y]) => `${par(x, y)} ∈ R pero ${par(y, x)} ∉ R`).join("; ")}.`;
    } else if (!R.length) {
      simetrica = "Simétrica ✓: R no tiene pares, así que ninguno falla (se cumple por vacuidad).";
    } else {
      const parejas = R.filter(([x, y]) => x !== y && A.indexOf(x) < A.indexOf(y)).map(([x, y]) => `${par(x, y)} y ${par(y, x)}`);
      simetrica = parejas.length
        ? `Simétrica ✓: cada par tiene su inverso en R: ${parejas.join("; ")}${R.some(([x, y]) => x === y) ? " (y cada (x, x) es su propio inverso)" : ""}.`
        : "Simétrica ✓: todos los pares son de la forma (x, x), y el inverso de (x, x) es el mismo par.";
    }
    let transitiva;
    if (!p.transitiva) {
      const [x, y, z] = p.fallas[0];
      transitiva = `Transitiva ✗: ${par(x, y)} ∈ R y ${par(y, z)} ∈ R, pero ${par(x, z)} ∉ R.`;
    } else if (!p.cadenas.length) {
      transitiva = "Transitiva ✓: no hay dos pares encadenados (x, y), (y, z), así que la condición nunca falla (se cumple por vacuidad).";
    } else {
      const ej = p.cadenas.find(([x, y, z]) => x !== y && y !== z && x !== z) || p.cadenas.find(([x, y, z]) => x !== y && y !== z) || p.cadenas[0];
      transitiva = `Transitiva ✓: en las ${p.cadenas.length} cadenas (x, y), (y, z) de R siempre está (x, z). Por ejemplo, ${par(ej[0], ej[1])} y ${par(ej[1], ej[2])} → ${par(ej[0], ej[2])} ∈ R.`;
    }
    return { p, identica, simetrica, transitiva };
  }

  const NOMBRE_PROP = { identica: "idéntica", simetrica: "simétrica", transitiva: "transitiva" };
  function resumenPropiedades(p) {
    const si = Object.keys(NOMBRE_PROP).filter((k) => p[k]).map((k) => NOMBRE_PROP[k]);
    const no = Object.keys(NOMBRE_PROP).filter((k) => !p[k]).map((k) => NOMBRE_PROP[k]);
    if (!no.length) return "R cumple las tres: es idéntica, simétrica y transitiva.";
    if (!si.length) return "R no cumple ninguna de las tres: no es idéntica, ni simétrica, ni transitiva.";
    return `R es ${enLista(si)}, pero no es ${no.join(" ni ")}.`;
  }

  /* ---------- dibujos: diagrama sagital, dígrafo y matriz ---------- */
  let nSvg = 0;
  const punta = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="rel-punta"/></marker></defs>`;
  const ancho = (xs) => Math.max(...xs.map((x) => String(x).length));

  function svgSagital(A, B, R, nombres = ["A", "B"]) {
    const id = "rel-fl-" + ++nSvg;
    const n = Math.max(A.length, B.length);
    const paso = 34, arriba = 44, W = 300;
    const alto = arriba + n * paso + 18;
    const xA = 70, xB = 230;
    const medio = arriba + (n * paso) / 2;
    const y = (lista, i) => medio - (lista.length * paso) / 2 + i * paso + paso / 2;
    const rx = Math.max(38, ancho([...A, ...B]) * 5 + 18);
    const sA = Math.max(14, ancho(A) * 4.6 + 6), sB = Math.max(16, ancho(B) * 4.6 + 8);
    let s = punta(id);
    [[xA, nombres[0]], [xB, nombres[1]]].forEach(([x, nom]) => {
      s += `<ellipse cx="${x}" cy="${medio}" rx="${rx}" ry="${(n * paso) / 2 + 10}" class="rel-conj"/>`;
      s += `<text x="${x}" y="22" class="rel-nombre" text-anchor="middle">${nom}</text>`;
    });
    R.forEach(([a, b]) => {
      const y1 = y(A, A.indexOf(a)), y2 = y(B, B.indexOf(b));
      s += `<line x1="${xA + sA}" y1="${y1}" x2="${xB - sB}" y2="${y2}" class="rel-flecha" marker-end="url(#${id})"/>`;
    });
    A.forEach((a, i) => { s += `<text x="${xA}" y="${y(A, i) + 5}" class="rel-elem" text-anchor="middle">${a}</text>`; });
    B.forEach((b, i) => { s += `<text x="${xB}" y="${y(B, i) + 5}" class="rel-elem" text-anchor="middle">${b}</text>`; });
    const desc = R.length ? R.map(([a, b]) => `${a} a ${b}`).join(", ") : "ninguna flecha";
    return `<svg class="rel-svg" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Diagrama sagital de ${nombres[0]} en ${nombres[1]}. Flechas: ${desc}">${s}</svg>`;
  }

  function svgDigrafo(A, R) {
    const id = "rel-fl-" + ++nSvg;
    const n = A.length;
    const r = Math.max(17, ancho(A) * 5 + 9);
    const rad = n <= 2 ? 72 : n <= 4 ? 88 : 104;
    const pos = A.map((_, i) => {
      const ang = n === 2 ? Math.PI * (i === 0 ? 1 : 0) : -Math.PI / 2 + (2 * Math.PI * i) / n;
      return { x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, ang };
    });
    const S = claves(R);
    const f = (v) => v.toFixed(1);
    const hacia = (p, q, d) => { const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1; return { x: p.x + (dx / l) * d, y: p.y + (dy / l) * d }; };
    let lineas = "";
    R.forEach(([a, b]) => {
      const p = pos[A.indexOf(a)], q = pos[A.indexOf(b)];
      if (a === b) { // lazo: sale y vuelve al vértice, del lado de afuera
        const g = (ang, d) => ({ x: p.x + Math.cos(ang) * d, y: p.y + Math.sin(ang) * d });
        const s1 = g(p.ang - 0.5, r), s2 = g(p.ang + 0.5, r + 1), c1 = g(p.ang - 0.75, r + 40), c2 = g(p.ang + 0.75, r + 40);
        lineas += `<path d="M ${f(s1.x)} ${f(s1.y)} C ${f(c1.x)} ${f(c1.y)}, ${f(c2.x)} ${f(c2.y)}, ${f(s2.x)} ${f(s2.y)}" class="rel-flecha" marker-end="url(#${id})"/>`;
        return;
      }
      if (S.has(kp(b, a))) { // ida y vuelta: dos curvas, una a cada lado
        const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy);
        const c = { x: (p.x + q.x) / 2 - (dy / l) * 20, y: (p.y + q.y) / 2 + (dx / l) * 20 };
        const s1 = hacia(p, c, r), s2 = hacia(q, c, r + 1);
        lineas += `<path d="M ${f(s1.x)} ${f(s1.y)} Q ${f(c.x)} ${f(c.y)}, ${f(s2.x)} ${f(s2.y)}" class="rel-flecha" marker-end="url(#${id})"/>`;
        return;
      }
      const s1 = hacia(p, q, r), s2 = hacia(q, p, r + 1);
      lineas += `<line x1="${f(s1.x)}" y1="${f(s1.y)}" x2="${f(s2.x)}" y2="${f(s2.y)}" class="rel-flecha" marker-end="url(#${id})"/>`;
    });
    let nodos = "";
    A.forEach((a, i) => {
      nodos += `<circle cx="${f(pos[i].x)}" cy="${f(pos[i].y)}" r="${r}" class="rel-nodo"/>`;
      nodos += `<text x="${f(pos[i].x)}" y="${f(pos[i].y + 5)}" class="rel-elem" text-anchor="middle">${a}</text>`;
    });
    const m = rad + r + 46;
    const desc = R.length ? R.map(([a, b]) => (a === b ? `lazo en ${a}` : `${a} a ${b}`)).join(", ") : "ninguna flecha";
    return `<svg class="rel-svg" viewBox="${-m} ${-m} ${2 * m} ${2 * m}" role="img" aria-label="Dígrafo con vértices ${A.join(", ")}. Flechas: ${desc}">${punta(id)}${lineas}${nodos}</svg>`;
  }

  function htmlMatriz(A, B, R) {
    const S = claves(R);
    const filas = A.map((a) => `<tr><th scope="row">${a}</th>${B.map((b) => (S.has(kp(a, b)) ? `<td class="uno">1</td>` : "<td>0</td>")).join("")}</tr>`).join("");
    return `<div class="table-wrap rel-matriz-wrap"><table class="rel-matriz"><caption>M(R): filas = partida, columnas = llegada</caption><tr><th scope="col"><span class="sr-only">fila \\ columna</span></th>${B.map((b) => `<th scope="col">${b}</th>`).join("")}</tr>${filas}</table></div>`;
  }
  // A × B ordenado: una fila por cada elemento de A
  const htmlProducto = (A, B) => `<div class="table-wrap rel-matriz-wrap"><table class="rel-matriz rel-producto"><caption>A × B con A = ${llaves(A)} y B = ${llaves(B)}: ${A.length} · ${B.length} = ${A.length * B.length} pares</caption>${A.map((a) => `<tr><th scope="row">${a}</th>${B.map((b) => `<td>${par(a, b)}</td>`).join("")}</tr>`).join("")}</table></div>`;
  const matrizTxt =(A, B, R) => { const S = claves(R); return A.map((a) => `fila ${a}: ${B.map((b) => (S.has(kp(a, b)) ? 1 : 0)).join(" ")}`).join(" · "); };

  /* ---------- reglas para armar relaciones de A en B ---------- */
  const REGLAS = [
    { texto: "y es el doble de x", A: rango(1, 6), B: rango(1, 12), f: (x, y) => y === 2 * x,
      por: (x, y, ok) => (ok ? `${y} = 2 · ${x}` : `2 · ${x} = ${2 * x}, no ${y}`) },
    { texto: "x es menor que y", A: rango(1, 7), B: rango(1, 7), f: (x, y) => x < y,
      por: (x, y, ok) => (ok ? `${x} < ${y}` : `${x} no es menor que ${y}`) },
    { texto: "x es mayor que y", A: rango(1, 7), B: rango(1, 7), f: (x, y) => x > y,
      por: (x, y, ok) => (ok ? `${x} > ${y}` : `${x} no es mayor que ${y}`) },
    { texto: "x divide a y", A: rango(2, 6), B: rango(2, 12), f: (x, y) => y % x === 0,
      por: (x, y, ok) => (ok ? `${y} = ${x} · ${y / x}` : `${y} dividido ${x} no da entero`) },
    { texto: "x + y es par", A: rango(1, 9), B: rango(1, 9), f: (x, y) => (x + y) % 2 === 0,
      por: (x, y, ok) => `${x} + ${y} = ${x + y}, que es ${ok ? "par" : "impar"}` },
    { texto: "y = x + 1", A: rango(1, 8), B: rango(1, 9), f: (x, y) => y === x + 1,
      por: (x, y, ok) => (ok ? `${y} = ${x} + 1` : `${x} + 1 = ${x + 1}, no ${y}`) },
    { texto: "y es el cuadrado de x", A: rango(1, 5), B: [1, 2, 3, 4, 5, 8, 9, 10, 16, 20, 25], f: (x, y) => y === x * x,
      por: (x, y, ok) => (ok ? `${y} = ${x}²` : `${x}² = ${x * x}, no ${y}`) },
    { texto: "x es la posición de la letra y en el abecedario (a = 1, b = 2, …)", A: rango(1, 7), B: LETRAS.slice(0, 8),
      f: (x, y) => LETRAS.indexOf(y) + 1 === x,
      por: (x, y, ok) => (ok ? `${y} es la letra número ${x}` : `${y} es la letra número ${LETRAS.indexOf(y) + 1}, no la ${x}`) }
  ];

  // conjuntos y relación a partir de una regla, con pares que están y pares que no
  function conRegla(min = 2) {
    for (let t = 0; t < 400; t++) {
      const regla = elegir(REGLAS);
      const A = muestra(regla.A, azar(3, 4)), B = muestra(regla.B, azar(3, 4));
      const R = producto(A, B).filter(([x, y]) => regla.f(x, y));
      if (R.length >= min && R.length <= A.length * B.length - 3) return { regla, A, B, R };
    }
    const regla = REGLAS[0]; // no debería pasar: un caso seguro
    return { regla, A: [1, 2, 3], B: [2, 4, 5, 6], R: [[1, 2], [2, 4], [3, 6]] };
  }

  // relación al azar de A en B con entre min y max pares que cumpla «cumple»
  function relAzar(A, B, min, max, cumple = () => true) {
    const todos = producto(A, B);
    for (let t = 0; t < 600; t++) {
      const R = ordenar(muestra(todos, azar(min, Math.min(max, todos.length))), A, B);
      if (cumple(R)) return R;
    }
    return ordenar(todos.slice(0, min), A, B);
  }

  // relación en A con una combinación dada de propiedades (se busca al azar y se verifica)
  function relacionConCombo(A, combo, max) {
    for (let t = 0; t < 600; t++) {
      const R = producto(A, A).filter(() => Math.random() < 0.28);
      const S = claves(R);
      const add = (x, y) => { if (!S.has(kp(x, y))) { S.add(kp(x, y)); R.push([x, y]); } };
      if (combo.identica) A.forEach((x) => add(x, x));
      if (combo.simetrica) R.slice().forEach(([x, y]) => add(y, x));
      if (combo.transitiva) {
        let cambio = true;
        while (cambio) {
          cambio = false;
          for (const [x, y] of R.slice()) for (const [y2, z] of R.slice()) if (y === y2 && !S.has(kp(x, z))) { add(x, z); cambio = true; }
        }
      }
      const p = propiedades(A, R);
      if (p.identica !== combo.identica || p.simetrica !== combo.simetrica || p.transitiva !== combo.transitiva) continue;
      if (!R.length || R.length > max || R.length === A.length * A.length) continue;
      return ordenar(R, A, A);
    }
    return null;
  }

  /* ---------- los ejercicios: todo se marca y se desmarca; se corrige con Comprobar ---------- */
  const CONSIGNA = {
    chips: "Tocá para marcar y tocá de nuevo para desmarcar. Se corrige recién cuando tocás ✔ Comprobar.",
    par: "Tocá los pares para marcarlos y tocá de nuevo para desmarcarlos. Se corrige recién con ✔ Comprobar.",
    bit: "Todas las casillas empiezan en 0. Tocá una para ponerle 1 y tocá de nuevo para volver a 0.",
    pertenece: "Todas las casillas empiezan en ∉. Tocá una para cambiarla a ∈ y tocá de nuevo para volver a ∉."
  };

  function ejChips(items, correctas, extra = {}) {
    return { vista: "chips", celda: "chips", items, correctas: new Set(correctas), marcados: new Set(), descartados: new Set(), fijos: new Set(), listo: false, ...extra };
  }
  // grilla de filas × columnas; cada casilla es un ítem para marcar
  function ejGrilla({ filas, cols, celda, esquina = "", correcta, fijo = () => false, nombre, ...extra }) {
    const items = [], correctas = [], fijos = new Set();
    filas.forEach((fi, i) => cols.forEach((co, j) => {
      const k = `${i}.${j}`;
      items.push({ k, txt: celda === "par" ? par(fi, co) : "", nombre: nombre ? nombre(i, j) : par(fi, co) });
      if (fijo(i, j)) fijos.add(k);
      else if (correcta(i, j)) correctas.push(k);
    }));
    return { vista: "grilla", celda, filas, cols, esquina, items, correctas: new Set(correctas), marcados: new Set(), descartados: new Set(), fijos, listo: false, ...extra };
  }
  const grillaPares = (filas, cols, R, extra = {}) => {
    const S = claves(R);
    return ejGrilla({ filas, cols, celda: "par", esquina: extra.esquina || "", correcta: (i, j) => S.has(kp(filas[i], cols[j])), ...extra });
  };

  /* ---------- generadores: cada uno arma un ejercicio con datos nuevos ---------- */
  const GEN = {
    // TEMA 0 · par ordenado
    parIgual: { tema: 0, mc: true, f() {
      const a = azar(3, 9), p = azar(1, Math.min(4, a - 1));
      let b; do { b = azar(1, 9); } while (b === a);
      const q = azar(1, 4);
      const x = a - p, y = b + q;
      const op = (u, v) => `x = ${u}, y = ${v}`;
      const correcta = op(x, y);
      const otras = unicos([op(b - p, a + q), op(a + p, b - q), op(a, b), op(x, b - q), op(a + p, y), op(y, x)]).filter((o) => o !== correcta);
      return {
        pregunta: `Si (x + ${p}, ${b}) = (${a}, y − ${q}), ¿cuánto valen x e y?`,
        opciones: [correcta, ...mezclar(otras).slice(0, 3)], correcta: 0,
        pista: "Dos pares son iguales cuando la primera componente es igual a la primera y la segunda a la segunda.",
        explicacion: `Se iguala componente a componente: x + ${p} = ${a}, entonces x = ${a} − ${p} = ${x}; y ${b} = y − ${q}, entonces y = ${b} + ${q} = ${y}.`,
        firma: `parIgual|${a}|${p}|${b}|${q}`
      };
    } },
    parOrden: { tema: 0, f() {
      const a = azar(2, 9);
      let b; do { b = azar(2, 9); } while (b === a);
      const expr = (n) => elegir([
        () => `${n}`,
        () => { const k = azar(1, 6); return `${n + k} − ${k}`; },
        () => { const k = azar(1, n - 1); return `${n - k} + ${k}`; },
        () => `${2 * n} / 2`,
        () => { const k = azar(2, 3); return `${n * k} / ${k}`; }
      ])();
      const lista = [], vistos = new Set();
      const meter = (t, ok, nota) => { if (vistos.has(t)) return false; vistos.add(t); lista.push({ t, ok, nota }); return true; };
      const nBien = azar(2, 3);
      while (lista.filter((i) => i.ok).length < nBien) meter(`(${expr(a)}, ${expr(b)})`, true, `= (${a}, ${b}) ✓`);
      let n = 0;
      while (n < 2) if (meter(`(${expr(b)}, ${expr(a)})`, false, `= (${b}, ${a}): está dado vuelta ✗`)) n++;
      const nMal = azar(1, 2);
      n = 0;
      while (n < nMal) {
        const d = elegir([-1, 1]), primera = Math.random() < 0.5;
        const v = primera ? [a + d, b] : [a, b + d];
        if (v[0] < 1 || v[1] < 1 || (v[0] === b && v[1] === a)) continue;
        if (meter(`(${expr(v[0])}, ${expr(v[1])})`, false, `= (${v[0]}, ${v[1]}): no coincide la ${primera ? "primera" : "segunda"} componente ✗`)) n++;
      }
      const items = mezclar(lista).map((it, i) => ({ k: "c" + i, txt: it.t, nombre: it.t, it }));
      return {
        pregunta: `Marcá todos los pares que son iguales a (${a}, ${b}).`,
        ej: ejChips(items, items.filter((x) => x.it.ok).map((x) => x.k)),
        pista: `Calculá cada componente: la primera tiene que dar ${a} y la segunda ${b}, en ese orden.`,
        respuesta: `Son iguales a (${a}, ${b}): ${enLista(items.filter((x) => x.it.ok).map((x) => x.txt))}.`,
        explicacion: items.map((x) => `${x.txt} ${x.it.nota}`).join(" · "),
        firma: `parOrden|${a}|${b}|${items.map((x) => x.txt).sort().join("")}`
      };
    } },

    // TEMA 1 · producto cartesiano
    prodCantidad: { tema: 1, mc: true, f() {
      const m = azar(2, 5), n = azar(2, 5);
      const A = muestra(rango(1, 9), m), B = muestra(LETRAS.slice(0, 7), n);
      const c = m * n;
      const otras = mezclar(unicos([m + n, c + 1, c - 1, m * m, n * n, 2 * c]).filter((v) => v !== c && v > 0)).slice(0, 3);
      return {
        pregunta: `Si A = ${llaves(A)} y B = ${llaves(B)}, ¿cuántos pares tiene A × B?`,
        opciones: [c, ...otras].map((v) => `${v} pares`), correcta: 0,
        pista: "Contá cuántos pares empiezan con cada elemento de A.",
        explicacion: `Cada uno de los ${m} elementos de A se combina con cada uno de los ${n} elementos de B: ${m} · ${n} = ${c} pares.`,
        firma: `prodCantidad|${A}|${B}`
      };
    } },
    prodElegir: { tema: 1, f() {
      const A = muestra(rango(1, 5), azar(2, 3)), B = muestra(LETRAS.slice(0, 4), azar(2, 3));
      const ba = Math.random() < 0.5;
      const T = ba ? producto(B, A) : producto(A, B);
      const otro = ba ? producto(A, B) : producto(B, A);
      const ruido = [...muestra(otro, 3), Math.random() < 0.5 ? [A[0], A[1]] : [B[0], B[1]]];
      const items = mezclar([...T.map((p) => ({ p, ok: true })), ...ruido.map((p) => ({ p, ok: false }))]).map((x, i) => ({ k: "c" + i, txt: parTxt(x.p), nombre: parTxt(x.p), ok: x.ok }));
      const nom = ba ? "B × A" : "A × B";
      const [prim, seg] = ba ? ["B", "A"] : ["A", "B"];
      return {
        pregunta: ba
          ? `Con A = ${llaves(A)} y B = ${llaves(B)} se tiene A × B = ${relTxt(producto(A, B))}. Marcá todos los pares de B × A.`
          : `Con A = ${llaves(A)} y B = ${llaves(B)}, marcá todos los pares de A × B.`,
        ej: ejChips(items, items.filter((x) => x.ok).map((x) => x.k)),
        pista: `En ${nom}, la primera componente sale de ${prim} y la segunda de ${seg}.`,
        respuesta: `${nom} = ${relTxt(T)} (${A.length} · ${B.length} = ${T.length} pares).`,
        explicacion: `Se combina cada elemento de ${prim} (primera componente) con cada elemento de ${seg} (segunda). ${ba
          ? "B × A tiene los pares de A × B dados vuelta: por eso A × B ≠ B × A."
          : `Pares como ${parTxt(producto(B, A)[0])} son de B × A: su primera componente es de B.`}`,
        firma: `prodElegir|${ba}|${A}|${B}`
      };
    } },
    tablaPertenece: { tema: 1, f() {
      for (let t = 0; t < 300; t++) {
        const pool = mezclar(rango(1, 12));
        const A = [pool[0], pool[1]].sort((x, y) => x - y);
        const B = [pool[1], pool[2]].sort((x, y) => x - y);
        const C = [pool[2], pool[3], ...(Math.random() < 0.5 ? [pool[4]] : [])].sort((x, y) => x - y);
        const S = { A, B, C };
        const cols = muestra([["A", "B"], ["B", "C"], ["C", "A"], ["A", "C"], ["B", "A"]], 3);
        const enProd = ([x, y], [X, Y]) => S[X].includes(x) && S[Y].includes(y);
        const union = unicos(cols.flatMap(([X, Y]) => producto(S[X], S[Y]).map(parTxt)));
        const todos = unicos([...A, ...B, ...C]);
        const ruido = producto(todos, todos).map(parTxt).filter((p) => !union.includes(p));
        const filasTxt = unicos([...muestra(union, 3), ...muestra(ruido, 2)]);
        if (filasTxt.length < 5) continue;
        const filas = mezclar(filasTxt);
        const pares = filas.map((s) => s.slice(1, -1).split(", ").map(Number));
        const cumple = (i, j) => enProd(pares[i], cols[j]);
        if (!cols.every((_, j) => pares.some((_, i) => cumple(i, j)))) continue;
        const colNom = cols.map(([X, Y]) => `${X} × ${Y}`);
        const razon = ([x, y], [X, Y]) => (!S[X].includes(x) ? `${x} ∉ ${X}` : !S[Y].includes(y) ? `${y} ∉ ${Y}` : `${x} ∈ ${X} y ${y} ∈ ${Y}`);
        return {
          pregunta: `Con A = ${llaves(A)}, B = ${llaves(B)} y C = ${llaves(C)}, completá la tabla: ¿cada par pertenece (∈) o no pertenece (∉) a cada producto?`,
          ej: ejGrilla({ filas, cols: colNom, celda: "pertenece", esquina: "par", correcta: cumple, nombre: (i, j) => `${filas[i]} en ${colNom[j]}`, marcaTxt: "∈ en " }),
          pista: "(x, y) ∈ X × Y cuando x ∈ X e y ∈ Y. Revisá cada componente por separado.",
          respuesta: colNom.map((c, j) => { const si = filas.filter((_, i) => cumple(i, j)); return `${c}: ${si.length ? enLista(si) + " ∈" : "ninguno"}`; }).join(" · "),
          explicacion: filas.map((f, i) => `${f}: ${cols.map((c, j) => `${cumple(i, j) ? "∈" : "∉"} ${colNom[j]} (${razon(pares[i], c)})`).join("; ")}`).join(" · "),
          firma: `tabla|${A}|${B}|${C}|${colNom}|${filas.join("")}`
        };
      }
      return null;
    } },

    // TEMA 2 · relación de A en B
    construir: { tema: 2, f() {
      const { regla, A, B, R } = conRegla(2);
      return {
        pregunta: `Con A = ${llaves(A)}, B = ${llaves(B)} y R: A → B definida por x R y ⇔ ${regla.texto}, marcá en la grilla todos los pares de R.`,
        ej: grillaPares(A, B, R, { esquina: "A \\ B" }),
        pista: `Revisá fila por fila: para cada x de A, buscá los y de B que cumplen «${regla.texto}».`,
        respuesta: `R = ${relTxt(R)}.`,
        explicacion: A.map((x) => { const ys = B.filter((y) => regla.f(x, y)); return ys.length ? `x = ${x}: se relaciona con ${enLista(ys)}` : `x = ${x}: no se relaciona con ningún elemento de B`; }).join(" · ") +
          `. R ⊆ A × B: de los ${A.length * B.length} pares de A × B, solo ${R.length} cumplen la regla.`,
        firma: `construir|${regla.texto}|${A}|${B}`
      };
    } },
    pertenece: { tema: 2, f() {
      const { regla, A, B, R } = conRegla(2);
      const fuera = producto(A, B).filter(([x, y]) => !regla.f(x, y));
      const cand = [...muestra(R, Math.min(R.length, azar(2, 3))), ...muestra(fuera, azar(2, 3))].map((p) => ({ p, ok: true, enAB: true }));
      cand.forEach((c) => { c.ok = regla.f(c.p[0], c.p[1]); });
      // a veces, un par dado vuelta que ni siquiera está en A × B
      const vuelta = R.map(([x, y]) => [y, x]).find(([y, x]) => !A.includes(y) && !cand.some((c) => c.p[0] === y && c.p[1] === x));
      if (vuelta && Math.random() < 0.6) cand.push({ p: vuelta, ok: false, enAB: false });
      const items = mezclar(cand).map((c, i) => ({ k: "c" + i, txt: parTxt(c.p), nombre: parTxt(c.p), c }));
      return {
        pregunta: `Con A = ${llaves(A)}, B = ${llaves(B)} y R: A → B dada por x R y ⇔ ${regla.texto}: marcá con ✓ los pares que pertenecen a R (los que no marques quedan como ✗).`,
        ej: ejChips(items, items.filter((x) => x.c.ok).map((x) => x.k), { marcaTxt: "✓ a " }),
        pista: `Para cada par (x, y), fijate si x ∈ A, si y ∈ B y si se cumple «${regla.texto}».`,
        respuesta: `Pertenecen a R: ${enLista(items.filter((x) => x.c.ok).map((x) => x.txt))}.`,
        explicacion: items.map(({ txt, c }) => {
          if (!c.enAB) return `${txt} ✗: ${c.p[0]} ∉ A, así que ni siquiera está en A × B`;
          return `${txt} ${c.ok ? "✓" : "✗"}: ${regla.por(c.p[0], c.p[1], c.ok)}`;
        }).join(" · "),
        firma: `pertenece|${regla.texto}|${A}|${B}|${items.map((x) => x.txt).sort().join("")}`
      };
    } },

    // TEMA 3 · dominio, imagen e inversa
    dominio: { tema: 3, f() { return domImg(true); } },
    imagen: { tema: 3, f() { return domImg(false); } },
    inversa: { tema: 3, f() {
      const enA = Math.random() < 0.45;
      const A = enA ? muestra(rango(1, 6), azar(3, 4)) : muestra(rango(1, 6), 3);
      const B = enA ? A : muestra(LETRAS.slice(0, 5), 3);
      const R = relAzar(A, B, 3, 4, (X) => !enA || X.some(([x, y]) => x !== y));
      const inv = inversa(R);
      const Si = claves(inv);
      const extra = producto(B, A).filter(([x, y]) => !Si.has(kp(x, y)) && !claves(R).has(kp(x, y)));
      const cand = unicos([...inv, ...R, ...muestra(extra, azar(1, 2))].map(parTxt));
      const items = mezclar(cand).map((t, i) => ({ k: "c" + i, txt: t, nombre: t }));
      const invTxt = new Set(inv.map(parTxt));
      const ambos = R.map(parTxt).filter((t) => invTxt.has(t));
      const invOrd = enA ? ordenar(inv, A, A) : ordenar(inv, B, A);
      return {
        pregunta: enA
          ? `En A = ${llaves(A)}, R = ${relTxt(R)}. Marcá todos los pares de R⁻¹.`
          : `R: A → B con A = ${llaves(A)}, B = ${llaves(B)} y R = ${relTxt(R)}. Marcá todos los pares de R⁻¹.`,
        ej: ejChips(items, items.filter((x) => invTxt.has(x.txt)).map((x) => x.k)),
        pista: "R⁻¹ tiene cada par de R dado vuelta: (y, x) ∈ R⁻¹ cuando (x, y) ∈ R.",
        respuesta: `R⁻¹ = ${relTxt(invOrd)}${enA ? "" : ", de B en A"}.`,
        explicacion: `Se da vuelta cada par de R: ${R.map(([x, y]) => `${par(x, y)} → ${par(y, x)}`).join(", ")}.` +
          (ambos.length ? ` Ojo: ${enLista(ambos)} ${ambos.length > 1 ? "están" : "está"} en R y también en R⁻¹, porque su inverso también está en R.` : ""),
        firma: `inversa|${A}|${B}|${relTxt(R)}`
      };
    } },

    // TEMA 4 · representaciones
    leerSagital: { tema: 4, f() {
      const A = muestra(rango(1, 6), 3), B = muestra(LETRAS.slice(0, 6), azar(3, 4));
      const R = relAzar(A, B, 3, 5);
      return {
        pregunta: `El diagrama sagital muestra una relación R: A → B, con A = ${llaves(A)} y B = ${llaves(B)}. Marcá en la grilla todos los pares de R.`,
        ej: grillaPares(A, B, R, { esquina: "A \\ B", figura: svgSagital(A, B, R) }),
        pista: "Cada flecha sale de un elemento de A (primera componente) y llega a uno de B (segunda componente).",
        respuesta: `R = ${relTxt(R)}.`,
        explicacion: `Una flecha de x a y es el par (x, y). Leyendo las ${R.length} flechas: R = ${relTxt(R)}.`,
        firma: `sagital|${A}|${B}|${relTxt(R)}`
      };
    } },
    matriz: { tema: 4, f() {
      const A = muestra(LETRAS.slice(0, 5), 3), B = muestra(rango(1, 5), azar(3, 4));
      const R = relAzar(A, B, 3, 6);
      const S = claves(R);
      const [x0, y0] = R[0];
      return {
        pregunta: `R: A → B con A = ${llaves(A)}, B = ${llaves(B)} y R = ${relTxt(R)}. Completá la matriz de ceros y unos de R.`,
        ej: ejGrilla({ filas: A, cols: B, celda: "bit", esquina: "A \\ B", correcta: (i, j) => S.has(kp(A[i], B[j])),
          nombre: (i, j) => `fila ${A[i]}, columna ${B[j]}`, marcaTxt: "1 en " }),
        pista: "Las filas son los elementos de A y las columnas los de B. Va 1 en la fila x y la columna y cuando (x, y) ∈ R.",
        respuesta: `M(R) → ${matrizTxt(A, B, R)}.`,
        explicacion: `Hay un 1 por cada par de R (${R.length} en total) y 0 en el resto. Por ejemplo, ${par(x0, y0)} ∈ R, así que va 1 en la fila ${x0} y la columna ${y0}.`,
        firma: `matriz|${A}|${B}|${relTxt(R)}`
      };
    } },
    leerDigrafo: { tema: 4, f() {
      const A = muestra(rango(1, 6), azar(3, 4));
      const R = relAzar(A, A, 3, 6, (X) => X.some(([x, y]) => x === y) && X.some(([x, y]) => x !== y));
      const lazos = R.filter(([x, y]) => x === y).map(parTxt);
      return {
        pregunta: `El dígrafo representa una relación R en A = ${llaves(A)}. Marcá en la grilla todos los pares de R (los lazos también son pares).`,
        ej: grillaPares(A, A, R, { esquina: "A \\ A", figura: svgDigrafo(A, R) }),
        pista: "Una flecha de x a y es el par (x, y). Un lazo (bucle) en x es el par (x, x).",
        respuesta: `R = ${relTxt(R)}.`,
        explicacion: `En el dígrafo cada elemento de A se dibuja una sola vez. ${lazos.length ? `Los lazos son ${enLista(lazos)}; ` : ""}en total R = ${relTxt(R)}.`,
        firma: `digrafo|${A}|${relTxt(R)}`
      };
    } },
    leerMatriz: { tema: 4, f() {
      const A = muestra(LETRAS.slice(0, 5), azar(2, 3)), B = muestra(rango(1, 5), 3);
      const R = relAzar(A, B, 2, 5);
      const S = claves(R);
      const vueltas = muestra(R, Math.min(2, R.length)).map(([x, y]) => [y, x]);
      const fuera = muestra(producto(A, B).filter(([x, y]) => !S.has(kp(x, y))), azar(1, 2));
      const items = mezclar([...R, ...vueltas, ...fuera].map(parTxt)).map((t, i) => ({ k: "c" + i, txt: t, nombre: t }));
      const Rtxt = new Set(R.map(parTxt));
      return {
        pregunta: `Esta es la matriz de una relación R: A → B, con A = ${llaves(A)} en las filas y B = ${llaves(B)} en las columnas. Marcá todos los pares de R.`,
        ej: ejChips(items, items.filter((x) => Rtxt.has(x.txt)).map((x) => x.k), { figura: htmlMatriz(A, B, R) }),
        pista: "Cada 1 de la fila x y la columna y es el par (x, y). La primera componente sale de las filas.",
        respuesta: `R = ${relTxt(R)}.`,
        explicacion: `Leyendo los 1 de la matriz: R = ${relTxt(R)}. Un par como ${parTxt(vueltas[0])} está dado vuelta: su primera componente no es de A.`,
        firma: `leerMatriz|${A}|${B}|${relTxt(R)}`
      };
    } },

    // TEMA 5 · propiedades
    propiedades: { tema: 5, f() {
      let A, R;
      do {
        A = muestra([1, 2, 3, 4, 5, 7], azar(3, 4));
        R = relacionConCombo(A, { identica: Math.random() < 0.5, simetrica: Math.random() < 0.5, transitiva: Math.random() < 0.5 }, 8);
      } while (!R);
      const vista = elegir(["lista", "lista", "digrafo", "matriz"]);
      const ex = explicarPropiedades(A, R);
      const items = [
        { k: "identica", txt: "Idéntica (reflexiva)", nombre: "idéntica" },
        { k: "simetrica", txt: "Simétrica", nombre: "simétrica" },
        { k: "transitiva", txt: "Transitiva", nombre: "transitiva" },
        { k: "ninguna", txt: "Ninguna de las tres", nombre: "ninguna de las tres" }
      ];
      const correctas = ["identica", "simetrica", "transitiva"].filter((k) => ex.p[k]);
      const pregunta = vista === "digrafo"
        ? `El dígrafo muestra una relación R en A = ${llaves(A)}. Marcá todas las propiedades que cumple R.`
        : vista === "matriz"
          ? `Esta es la matriz de una relación R en A = ${llaves(A)} (filas y columnas en el mismo orden). Marcá todas las propiedades que cumple R.`
          : `En A = ${llaves(A)}, R = ${relTxt(R)}. Marcá todas las propiedades que cumple R.`;
      return {
        pregunta,
        ej: ejChips(items, correctas.length ? correctas : ["ninguna"], {
          exclusivo: "ninguna",
          figura: vista === "digrafo" ? svgDigrafo(A, R) : vista === "matriz" ? htmlMatriz(A, A, R) : ""
        }),
        pista: "Revisalas por separado: ¿están todos los (x, x)? ¿Cada par tiene su inverso? ¿Cada cadena (x, y), (y, z) tiene su (x, z)?",
        respuesta: resumenPropiedades(ex.p),
        explicacion: `${vista !== "lista" ? `R = ${relTxt(R)}. ` : ""}${ex.identica} ${ex.simetrica} ${ex.transitiva}`,
        firma: `prop|${A}|${relTxt(R)}`
      };
    } },
    agregarIdentica: { tema: 5, f() {
      const A = muestra(rango(1, 6), azar(3, 4));
      const R = relAzar(A, A, 2, 5, (X) => propiedades(A, X).faltanId.length >= 1);
      const p = propiedades(A, R);
      const ya = A.filter((x) => !p.faltanId.includes(x)).map((x) => par(x, x));
      const S = claves(R);
      return {
        pregunta: `En A = ${llaves(A)}, R = ${relTxt(R)} no es idéntica. Marcá solo los pares que hay que agregarle para que sea idéntica (los que ya están en R aparecen como «en R»).`,
        ej: ejGrilla({ filas: A, cols: A, celda: "par", esquina: "A \\ A", fijo: (i, j) => S.has(kp(A[i], A[j])), correcta: (i, j) => i === j }),
        pista: "Idéntica pide que esté (x, x) para todo x de A.",
        respuesta: `Hay que agregar ${enLista(p.faltanId.map((x) => par(x, x)))}.`,
        explicacion: `Para ser idéntica tiene que estar (x, x) para cada x ∈ A. ${ya.length ? `Ya ${ya.length > 1 ? "están" : "está"} ${enLista(ya)}; ` : "R no tiene ninguno; "}${p.faltanId.length > 1 ? "faltan" : "falta"} ${enLista(p.faltanId.map((x) => par(x, x)))}. Cualquier otro par no hace falta.`,
        firma: `addId|${A}|${relTxt(R)}`
      };
    } },
    agregarSimetrica: { tema: 5, f() {
      const A = muestra(rango(1, 6), azar(3, 4));
      const R = relAzar(A, A, 3, 5, (X) => { const s = propiedades(A, X).sinInverso; return s.length >= 1 && s.length <= 3; });
      const p = propiedades(A, R);
      const faltan = p.sinInverso.map(([x, y]) => [y, x]);
      const F = claves(faltan), S = claves(R);
      return {
        pregunta: `En A = ${llaves(A)}, R = ${relTxt(R)} no es simétrica. Marcá solo los pares que hay que agregarle para que sea simétrica (los que ya están en R aparecen como «en R»).`,
        ej: ejGrilla({ filas: A, cols: A, celda: "par", esquina: "A \\ A", fijo: (i, j) => S.has(kp(A[i], A[j])), correcta: (i, j) => F.has(kp(A[i], A[j])) }),
        pista: "Simétrica pide que, si (x, y) ∈ R, también esté (y, x). Buscá los pares a los que les falta su inverso.",
        respuesta: `Hay que agregar ${enLista(faltan.map(parTxt))}.`,
        explicacion: `${p.sinInverso.map(([x, y]) => `${par(x, y)} ∈ R pero ${par(y, x)} ∉ R`).join("; ")}. Con ${faltan.length > 1 ? "esos inversos" : "ese inverso"} cada par queda con su vuelta y R pasa a ser simétrica.`,
        firma: `addSim|${A}|${relTxt(R)}`
      };
    } },
    faltanTransitiva: { tema: 5, f() {
      const A = muestra(rango(1, 6), azar(3, 4));
      const R = relAzar(A, A, 3, 5, (X) => { const f = propiedades(A, X).fallas.length; return f >= 1 && f <= 3; });
      const p = propiedades(A, R);
      const F = claves(p.fallas.map(([x, , z]) => [x, z])), S = claves(R);
      return {
        pregunta: `En A = ${llaves(A)}, R = ${relTxt(R)} no es transitiva. Marcá todos los pares (x, z) que faltan: los que no están en R aunque (x, y) ∈ R y (y, z) ∈ R para algún y.`,
        ej: ejGrilla({ filas: A, cols: A, celda: "par", esquina: "A \\ A", fijo: (i, j) => S.has(kp(A[i], A[j])), correcta: (i, j) => F.has(kp(A[i], A[j])) }),
        pista: "Buscá cadenas: un par (x, y) y otro que empiece donde termina el primero, (y, z). Ahí tiene que estar (x, z).",
        respuesta: `${p.fallas.length > 1 ? "Faltan" : "Falta"} ${enLista(p.fallas.map(([x, , z]) => par(x, z)))}.`,
        explicacion: `${p.fallas.map(([x, y, z]) => `${par(x, y)} y ${par(y, z)} están, pero ${par(x, z)} no`).join("; ")}. Ojo: al agregarlos pueden aparecer cadenas nuevas; acá se piden los que faltan para las cadenas que ya tiene R.`,
        firma: `falT|${A}|${relTxt(R)}`
      };
    } }
  };

  // dominio o imagen: se marcan elementos (de A y de B mezclados)
  function domImg(esDom) {
    const A = muestra(rango(1, 8), 4), B = muestra(LETRAS.slice(0, 6), azar(3, 4));
    const R = relAzar(A, B, 3, 4, (X) => (esDom ? dominio(A, X).length < A.length : imagen(B, X).length < B.length));
    const D = dominio(A, R), I = imagen(B, R);
    const objetivo = esDom ? D : I;
    const items = [...A.map((x) => ({ k: "a" + x, txt: String(x), nombre: String(x) })), ...B.map((y) => ({ k: "b" + y, txt: y, nombre: y }))];
    const deDonde = esDom ? A : B;
    const fuera = deDonde.filter((x) => !objetivo.includes(x));
    const nom = esDom ? "D(R)" : "I(R)";
    return {
      pregunta: `R: A → B con A = ${llaves(A)}, B = ${llaves(B)} y R = ${relTxt(R)}. Marcá todos los elementos de ${nom}.`,
      ej: ejChips(items, objetivo.map((x) => (esDom ? "a" : "b") + x)),
      pista: esDom ? "D(R) son las primeras componentes de los pares de R." : "I(R) son las segundas componentes de los pares de R.",
      respuesta: `${nom} = ${llaves(objetivo)}.`,
      explicacion: `Las ${esDom ? "primeras" : "segundas"} componentes de los pares de R son ${enLista(objetivo)}: ${nom} = ${llaves(objetivo)}. ` +
        `${enLista(fuera)} ${fuera.length > 1 ? "están" : "está"} en ${esDom ? "A" : "B"} pero no ${fuera.length > 1 ? "aparecen" : "aparece"} como ${esDom ? "primera" : "segunda"} componente de ningún par, así que no ${fuera.length > 1 ? "están" : "está"} en ${nom}. ` +
        `Los elementos de ${esDom ? "B" : "A"} no van: ${esDom ? "D(R) ⊆ A" : "I(R) ⊆ B"}.`,
      firma: `${esDom ? "dom" : "img"}|${A}|${B}|${relTxt(R)}`
    };
  }

  /* ---------- la clase: 6 temas del práctico y las diapositivas ---------- */
  const EJ_A = [2, 3, 4], EJ_B = [1, 4, 6, 9], EJ_R = [[2, 4], [3, 6]];
  const MAT_A = ["a", "b", "c"], MAT_B = [1, 2, 3], MAT_R = [["a", 1], ["a", 2], ["b", 2], ["b", 3], ["c", 1], ["c", 3]];
  const DIG_A = [1, 2, 3], DIG_R = [[1, 1], [1, 2], [2, 1], [2, 3], [3, 3]];
  const PROP_A = [1, 2, 3], PROP_R = [[1, 1], [1, 2], [2, 1], [2, 2], [3, 3]], PROP_R2 = [[1, 2], [2, 1]];
  const exProp = explicarPropiedades(PROP_A, PROP_R), exProp2 = explicarPropiedades(PROP_A, PROP_R2);

  const CLASE = {
    fuente: "Fuentes: «Práctico de relaciones (primera parte)», diapositivas «Relaciones – Primera parte» y «Práctico de Relaciones» (Lógica y métodos discretos). Apoyo: Rosen, «Matemática discreta y sus aplicaciones», y el capítulo 8 «Relaciones» del libro de Matemáticas Discretas en Medium. Las soluciones de los ejercicios se calculan con los datos de cada uno.",
    temas: [
      {
        titulo: "Par ordenado",
        resumen: "(a, b): dos componentes y el orden importa.",
        apuntes: {
          ideas: [
            "Un par ordenado (a, b) tiene primera componente a y segunda componente b.",
            "(a, b) = (c, d) si y solo si a = c y b = d.",
            "El orden importa: (2, 5) ≠ (5, 2). En cambio, en conjuntos {2, 5} = {5, 2}.",
            "Las componentes pueden ser iguales: (3, 3) es un par ordenado.",
            "Para hallar incógnitas se iguala primera con primera y segunda con segunda."
          ]
        },
        contenido: `
          <p>Un <strong>par ordenado</strong> (a, b) junta dos elementos <em>en un orden fijo</em>: a es la <strong>primera componente</strong> y b es la <strong>segunda componente</strong>.</p>
          <div class="def"><span class="def-tag">Igualdad</span>(a, b) = (c, d) si y solo si <strong>a = c</strong> y <strong>b = d</strong>.</div>
          <h3>El orden importa</h3>
          <p>En un conjunto el orden no importa: {2, 5} = {5, 2}. En un par sí: <strong>(2, 5) ≠ (5, 2)</strong>, porque las primeras componentes son distintas (2 ≠ 5).</p>
          <p>Las dos componentes pueden ser el mismo elemento: <strong>(3, 3)</strong> es un par ordenado.</p>
          <h3>Ejemplo resuelto</h3>
          <p>Si (x + 1, 6) = (4, y), se iguala componente a componente: x + 1 = 4 y 6 = y. Entonces <strong>x = 3</strong> e <strong>y = 6</strong>.</p>
          <div class="def def-yellow"><span class="def-tag">Ojo</span>Para justificar que dos pares no son iguales alcanza con mostrar <em>una</em> componente que no coincide.</div>`,
        clase: [
          "Escribí los pares con paréntesis y los conjuntos con llaves: (2, 5) no es lo mismo que {2, 5}.",
          "Si te piden «¿son iguales?», respondé y justificá con la componente que coincide o no coincide.",
          "Para hallar x e y, planteá las dos igualdades por separado."
        ],
        preguntas: [
          { pregunta: "¿Qué diferencia hay entre el par ordenado (2, 5) y el conjunto {2, 5}?",
            opciones: ["En el par importa el orden: (2, 5) ≠ (5, 2), pero {2, 5} = {5, 2}.", "Ninguna: son lo mismo escrito distinto.", "En el conjunto importa el orden y en el par no.", "El par siempre tiene componentes distintas y el conjunto no."],
            correcta: 0, pista: "Pensá qué pasa si los das vuelta.",
            explicacion: "En un par ordenado importa qué va primero: (2, 5) y (5, 2) son pares distintos. En un conjunto no hay orden: {2, 5} = {5, 2}." },
          { pregunta: "¿Cuándo son iguales dos pares ordenados (a, b) y (c, d)?",
            opciones: ["Cuando a = c y b = d.", "Cuando a = d y b = c.", "Cuando a + b = c + d.", "Cuando tienen los mismos elementos, en cualquier orden."],
            correcta: 0, pista: "Se compara primera con primera y segunda con segunda.",
            explicacion: "(a, b) = (c, d) si y solo si coinciden las primeras componentes (a = c) y las segundas (b = d)." },
          { pregunta: "En el par (7, 2), ¿cuál es la segunda componente?",
            opciones: ["2", "7", "9", "No tiene: el par tiene un solo elemento"],
            correcta: 0, pista: "La segunda componente es la que va después de la coma.",
            explicacion: "En (7, 2) la primera componente es 7 y la segunda es 2." },
          { pregunta: "Si (a, 3) = (3, a), ¿cuánto vale a?",
            opciones: ["3", "Cualquier número", "No existe ningún a", "0"],
            correcta: 0, pista: "Igualá las primeras componentes.",
            explicacion: "Igualando componentes: a = 3 (primeras) y 3 = a (segundas). Las dos dicen lo mismo: a = 3, y el par es (3, 3)." },
          { gen: "parIgual" },
          { gen: "parOrden" }
        ]
      },
      {
        titulo: "Producto cartesiano",
        resumen: "A × B: todos los pares con primera componente en A y segunda en B.",
        apuntes: {
          ideas: [
            "A × B = {(x, y) / x ∈ A ∧ y ∈ B}.",
            "La primera componente sale de A y la segunda de B.",
            "Si A tiene m elementos y B tiene n, A × B tiene m · n pares.",
            "En general A × B ≠ B × A: (1, a) ∈ A × B pero (1, a) ∉ B × A.",
            "(x, y) ∈ A × B cuando x ∈ A e y ∈ B: se revisa cada componente por separado."
          ],
          dibujo: {
            svg: htmlProducto([3, 4], ["p", "q", "r"]),
            texto: ["A × B con A = {3, 4}, B = {p, q, r}:", "(3, p) (3, q) (3, r)", "(4, p) (4, q) (4, r)   → 2 · 3 = 6 pares"]
          }
        },
        contenido: `
          <div class="def"><span class="def-tag">Definición</span>El <strong>producto cartesiano</strong> de A y B es el conjunto de todos los pares ordenados con primera componente en A y segunda en B:<br><strong>A × B = {(x, y) / x ∈ A ∧ y ∈ B}</strong>.</div>
          <h3>Ejemplo</h3>
          <p>Con A = {3, 4} y B = {p, q, r}:</p>
          <ul>
            <li><strong>A × B</strong> = {(3, p), (3, q), (3, r), (4, p), (4, q), (4, r)}</li>
            <li><strong>B × A</strong> = {(p, 3), (p, 4), (q, 3), (q, 4), (r, 3), (r, 4)}</li>
          </ul>
          <p>¿Son iguales? <strong>No</strong>: (3, p) ∈ A × B, pero (3, p) ∉ B × A, porque en B × A la primera componente tiene que ser de B.</p>
          <h3>¿Cuántos pares tiene?</h3>
          <p>Cada uno de los 2 elementos de A se combina con cada uno de los 3 de B: <strong>2 · 3 = 6</strong> pares. En general, si A tiene m elementos y B tiene n, A × B tiene m · n.</p>
          <h3>¿Un par está en el producto?</h3>
          <p>(x, y) ∈ A × B cuando x ∈ A <em>y</em> y ∈ B. Por ejemplo, (4, r) ∈ A × B, pero (4, 3) ∉ A × B porque 3 ∉ B.</p>`,
        clase: [
          "Para escribir A × B ordenado: tomá el primer elemento de A y combinalo con todos los de B; después el segundo, y así.",
          "Antes de escribirlo, calculá cuántos pares tienen que ser (m · n) y contá al final.",
          "Para decidir ∈ o ∉, mirá la primera componente en el primer conjunto y la segunda en el segundo."
        ],
        preguntas: [
          { pregunta: "¿Cómo se define el producto cartesiano A × B?",
            opciones: ["A × B = {(x, y) / x ∈ A ∧ y ∈ B}", "A × B = {(x, y) / x ∈ B ∧ y ∈ A}", "A × B = A ∪ B", "A × B = {x · y / x ∈ A ∧ y ∈ B}"],
            correcta: 0, pista: "Son pares, y la primera componente sale del primer conjunto.",
            explicacion: "A × B son todos los pares ordenados (x, y) con x ∈ A e y ∈ B." },
          { pregunta: "Si A = {1, 2} y B = {a, b, c}, ¿A × B = B × A?",
            opciones: ["No: (1, a) ∈ A × B pero (1, a) ∉ B × A.", "Sí, porque tienen la misma cantidad de pares.", "Sí, el producto cartesiano es conmutativo.", "No, porque A × B tiene 6 pares y B × A tiene 5."],
            correcta: 0, pista: "Fijate de qué conjunto sale la primera componente en cada producto.",
            explicacion: "Los dos tienen 6 pares, pero no los mismos: en A × B los pares empiezan con un número y en B × A con una letra. Por ejemplo, (1, a) ∈ A × B y (1, a) ∉ B × A." },
          { pregunta: "En A × B, ¿de qué conjunto sale la primera componente de cada par?",
            opciones: ["De A", "De B", "De A o de B, da igual", "De A ∩ B"],
            correcta: 0, pista: "Mirá la definición: (x, y) con x ∈ …",
            explicacion: "En A × B = {(x, y) / x ∈ A ∧ y ∈ B}, la primera componente x es de A y la segunda y es de B." },
          { gen: "prodCantidad" },
          { gen: "prodElegir" },
          { gen: "tablaPertenece" }
        ]
      },
      {
        titulo: "Relación de A en B",
        resumen: "R ⊆ A × B: partida, llegada y la notación x R y.",
        lab: "menor", vista: "sagital",
        apuntes: {
          ideas: [
            "R es una relación de A en B, R: A → B, si R ⊆ A × B.",
            "A es el conjunto de partida y B el conjunto de llegada.",
            "x R y significa (x, y) ∈ R; si (x, y) ∉ R se escribe x R̸ y.",
            "Si R ⊆ A × A, es una relación en A (de un conjunto en sí mismo).",
            "R = ∅ también es una relación (no tiene pares), y A × B también."
          ],
          dibujo: {
            svg: svgSagital(EJ_A, EJ_B, EJ_R),
            texto: ["A = {2, 3, 4}, B = {1, 4, 6, 9}, «y es el doble de x»", "2 ---> 4", "3 ---> 6", "4      (8 ∉ B: no se relaciona)", "R = {(2, 4), (3, 6)}"]
          }
        },
        contenido: `
          <div class="def"><span class="def-tag">Definición</span>R es una <strong>relación de A en B</strong>, y se escribe <strong>R: A → B</strong>, si <strong>R ⊆ A × B</strong>.<br>A es el <strong>conjunto de partida</strong> y B el <strong>conjunto de llegada</strong>.</div>
          <p>Si (x, y) ∈ R decimos que x está relacionado con y y escribimos <strong>x R y</strong>. Si (x, y) ∉ R escribimos <strong>x R̸ y</strong>.</p>
          <p>Cuando la relación es de un conjunto en sí mismo (R ⊆ A × A) se dice que es una <strong>relación en A</strong>.</p>
          <h3>Ejemplo</h3>
          <p>A = {2, 3, 4}, B = {1, 4, 6, 9} y x R y ⇔ «y es el doble de x». Revisamos cada x de A:</p>
          <ul>
            <li>2 · 2 = 4 ∈ B → 2 R 4</li>
            <li>2 · 3 = 6 ∈ B → 3 R 6</li>
            <li>2 · 4 = 8 ∉ B → 4 no se relaciona con nadie</li>
          </ul>
          <p>Entonces <strong>R = {(2, 4), (3, 6)}</strong>, que es un subconjunto de A × B (de sus 12 pares, solo 2 cumplen la regla). Además, 2 R̸ 9.</p>
          <div class="def def-yellow"><span class="def-tag">Ojo con las palabras</span>En las diapositivas, al conjunto de partida lo anotan como «dominio» y al de llegada como «codominio». No lo confundas con <strong>D(R)</strong>, el dominio de la relación, que se ve en el tema siguiente: D(R) son solo los elementos de A que <em>aparecen</em> en algún par. En el ejemplo, A = {2, 3, 4} pero D(R) = {2, 3}.</div>`,
        clase: [
          "Siempre aclará cuál es el conjunto de partida y cuál el de llegada.",
          "Para armar R desde una regla, recorré A elemento por elemento y buscá en B los que cumplen.",
          "Un elemento de A puede no estar relacionado con ninguno de B: eso no es un error."
        ],
        preguntas: [
          { pregunta: "¿Qué es una relación R de A en B?",
            opciones: ["Un subconjunto del producto cartesiano: R ⊆ A × B.", "Cualquier par de conjuntos A y B.", "El conjunto A × B completo, siempre.", "Una regla que a cada x ∈ A le asigna exactamente un y ∈ B."],
            correcta: 0, pista: "Mirá la definición: R: A → B ⇔ …",
            explicacion: "R: A → B es relación si R ⊆ A × B. No tiene por qué usar todos los pares, ni darle a cada x un único y (eso sería una función)." },
          { pregunta: "En R: A → B, ¿cómo se llama el conjunto B?",
            opciones: ["Conjunto de llegada", "Conjunto de partida", "Dominio de la relación, D(R)", "Relación inversa"],
            correcta: 0, pista: "La flecha va de A hacia B.",
            explicacion: "En R: A → B, A es el conjunto de partida y B el conjunto de llegada." },
          { pregunta: "¿Qué significa escribir 3 R 6?",
            opciones: ["Que el par (3, 6) pertenece a R.", "Que el par (6, 3) pertenece a R.", "Que 3 · 6 ∈ R.", "Que 3 y 6 no están relacionados."],
            correcta: 0, pista: "x R y es otra forma de escribir (x, y) ∈ R.",
            explicacion: "x R y ⇔ (x, y) ∈ R. Entonces 3 R 6 quiere decir (3, 6) ∈ R. Para «no relacionados» se escribe 3 R̸ 6." },
          { pregunta: "¿Puede una relación de A en B no tener ningún par (R = ∅)?",
            opciones: ["Sí: ∅ ⊆ A × B, así que es una relación.", "No, toda relación tiene al menos un par.", "Solo si A = B.", "Solo si A × B = ∅."],
            correcta: 0, pista: "¿El conjunto vacío es subconjunto de cualquier conjunto?",
            explicacion: "El conjunto vacío es subconjunto de cualquier conjunto, en particular de A × B. Por eso R = ∅ es una relación de A en B (la relación vacía)." },
          { gen: "construir" },
          { gen: "pertenece" }
        ]
      },
      {
        titulo: "Dominio, imagen y relación inversa",
        resumen: "D(R), I(R) y R⁻¹: qué componentes aparecen y cómo se da vuelta.",
        lab: "raiz", vista: "sagital",
        apuntes: {
          ideas: [
            "D(R): los elementos de A que son primera componente de algún par de R.",
            "I(R): los elementos de B que son segunda componente de algún par de R.",
            "D(R) ⊆ A e I(R) ⊆ B; pueden ser más chicos que A y B.",
            "R⁻¹ = {(y, x) / (x, y) ∈ R}: se da vuelta cada par.",
            "Si R: A → B, entonces R⁻¹: B → A."
          ],
          dibujo: {
            svg: svgSagital([1, 2, 3, 5], ["a", "b", "c"], [[1, "a"], [1, "c"], [3, "a"]]),
            texto: ["A = {1, 2, 3, 5}, B = {a, b, c}, R = {(1, a), (1, c), (3, a)}", "D(R) = {1, 3}   I(R) = {a, c}", "R⁻¹ = {(a, 1), (c, 1), (a, 3)}"]
          }
        },
        contenido: `
          <p>Dada una relación R: A → B, llamamos:</p>
          <div class="def"><span class="def-tag">Dominio</span><strong>D(R)</strong>: los elementos de A que son <strong>primera componente</strong> de algún par de R.</div>
          <div class="def"><span class="def-tag">Imagen</span><strong>I(R)</strong>: los elementos de B que son <strong>segunda componente</strong> de algún par de R.</div>
          <div class="def"><span class="def-tag">Inversa</span><strong>R⁻¹ = {(y, x) / (x, y) ∈ R}</strong>: se da vuelta cada par. Si R va de A en B, R⁻¹ va de B en A.</div>
          <h3>Ejemplo</h3>
          <p>A = {1, 2, 3, 5}, B = {a, b, c} y R = {(1, a), (1, c), (3, a)}.</p>
          <ul>
            <li>Primeras componentes: 1, 1, 3 → <strong>D(R) = {1, 3}</strong>. El 2 y el 5 están en A pero no se relacionan con nadie.</li>
            <li>Segundas componentes: a, c, a → <strong>I(R) = {a, c}</strong>. La b no es imagen de nadie.</li>
            <li>Dando vuelta cada par: <strong>R⁻¹ = {(a, 1), (c, 1), (a, 3)}</strong>, de B en A.</li>
          </ul>
          <div class="def def-yellow"><span class="def-tag">Ojo</span>Un conjunto no repite elementos: aunque el 1 aparezca en dos pares, D(R) = {1, 3}.</div>`,
        clase: [
          "Para D(R), recorré los pares y anotá las primeras componentes sin repetir. Para I(R), las segundas.",
          "Para R⁻¹, dá vuelta cada par y aclarás que va del conjunto de llegada al de partida.",
          "Si te preguntan por qué un elemento no está en D(R), mostrá que no es primera componente de ningún par."
        ],
        preguntas: [
          { pregunta: "¿Qué es el dominio D(R) de una relación R: A → B?",
            opciones: ["Los elementos de A que son primera componente de algún par de R.", "Todos los elementos de A, estén o no relacionados.", "Los elementos de B que son segunda componente de algún par de R.", "Todos los pares de R."],
            correcta: 0, pista: "D(R) se arma con las primeras componentes.",
            explicacion: "D(R) son los x de A que aparecen como primera componente en algún par de R. Puede ser más chico que A." },
          { pregunta: "Si R = {(1, a), (2, a)} es una relación de A = {1, 2, 3} en B = {a, b}, ¿cuál es I(R)?",
            opciones: ["{a}", "{a, b}", "{1, 2}", "{1, 2, 3}"],
            correcta: 0, pista: "Mirá solo las segundas componentes.",
            explicacion: "Las segundas componentes de R son a y a, así que I(R) = {a}. La b está en B pero no es segunda componente de ningún par." },
          { pregunta: "¿Cómo se obtiene la relación inversa R⁻¹?",
            opciones: ["Dando vuelta cada par: (y, x) ∈ R⁻¹ cuando (x, y) ∈ R.", "Sacando de A × B los pares de R.", "Cambiando cada número por su opuesto.", "Quedándose solo con los pares (x, x)."],
            correcta: 0, pista: "R⁻¹ = {(y, x) / …}",
            explicacion: "R⁻¹ = {(y, x) / (x, y) ∈ R}: tiene los mismos pares que R pero dados vuelta." },
          { pregunta: "Si R va de A en B, ¿R⁻¹ va de…?",
            opciones: ["B en A", "A en B", "A en A", "B en B"],
            correcta: 0, pista: "Al dar vuelta los pares, la primera componente pasa a ser de B.",
            explicacion: "En R⁻¹ la primera componente es un elemento de B y la segunda uno de A: R⁻¹: B → A." },
          { gen: "dominio" },
          { gen: "imagen" },
          { gen: "inversa" }
        ]
      },
      {
        titulo: "Representaciones: sagital, dígrafo y matriz",
        resumen: "Tres formas de dibujar la misma relación.",
        lab: "matriz", vista: "sagital",
        apuntes: {
          ideas: [
            "Diagrama sagital (de Venn con flechas): A y B como óvalos y una flecha de x a y por cada par (x, y) ∈ R.",
            "Dígrafo (grafo dirigido): para una relación en A, cada elemento se dibuja una sola vez y cada par es una flecha.",
            "En el dígrafo, un lazo o bucle en x representa el par (x, x).",
            "Matriz de ceros y unos: filas = conjunto de partida, columnas = conjunto de llegada; 1 si el par está en R y 0 si no.",
            "Si |A| = m y |B| = n, la matriz tiene m filas y n columnas."
          ],
          dibujo: {
            svg: svgDigrafo(DIG_A, DIG_R),
            texto: ["Dígrafo de R = {(1, 1), (1, 2), (2, 1), (2, 3), (3, 3)} en A = {1, 2, 3}:", "lazo en 1, 1 <--> 2, 2 ---> 3, lazo en 3"]
          }
        },
        contenido: `
          <p>Una misma relación se puede mostrar de varias formas. Las tres de las diapositivas:</p>
          <h3>Diagrama sagital</h3>
          <p>Se dibujan A y B como óvalos (diagramas de Venn) y, por cada par (x, y) ∈ R, una flecha de x a y. Ejemplo con A = {a, b, c}, B = {1, 2, 3} y R = {(a, 1), (a, 2), (b, 2), (b, 3), (c, 1), (c, 3)}:</p>
          <figure class="rel-figura">${svgSagital(MAT_A, MAT_B, MAT_R)}</figure>
          <h3>Matriz de ceros y unos</h3>
          <p>Las <strong>filas</strong> son los elementos del conjunto de partida y las <strong>columnas</strong> los del de llegada. En la fila x y la columna y va <strong>1</strong> si (x, y) ∈ R y <strong>0</strong> si no. La misma relación:</p>
          ${htmlMatriz(MAT_A, MAT_B, MAT_R)}
          <h3>Dígrafo</h3>
          <p>Si la relación es de un conjunto en sí mismo (R ⊆ A × A), se usa un <strong>dígrafo</strong> (grafo dirigido): cada elemento se dibuja <em>una sola vez</em> y cada par (x, y) es una flecha de x a y. Un par (x, x) se dibuja como un <strong>lazo</strong> o <strong>bucle</strong>. Ejemplo: A = {1, 2, 3} y R = {(1, 1), (1, 2), (2, 1), (2, 3), (3, 3)}:</p>
          <figure class="rel-figura">${svgDigrafo(DIG_A, DIG_R)}</figure>
          <div class="def def-yellow"><span class="def-tag">Ojo</span>En la matriz, el orden importa: la fila es la primera componente. El 1 de la fila a y la columna 2 es el par (a, 2), no (2, a).</div>`,
        clase: [
          "En el sagital, cada flecha sale de la primera componente y llega a la segunda.",
          "En la matriz, escribí arriba los elementos del conjunto de llegada y a la izquierda los del de partida.",
          "En el dígrafo no te olvides de los lazos: el par (x, x) es una flecha que sale y vuelve a x."
        ],
        preguntas: [
          { pregunta: "En la matriz de una relación R: A → B, ¿qué indica un 1 en la fila x y la columna y?",
            opciones: ["Que (x, y) ∈ R.", "Que (y, x) ∈ R.", "Que x = y.", "Que x e y no están relacionados."],
            correcta: 0, pista: "La fila da la primera componente.",
            explicacion: "En la matriz de ceros y unos, el 1 de la fila x y la columna y quiere decir que el par (x, y) está en R; el 0, que no está." },
          { pregunta: "En la matriz de R: A → B, ¿qué conjunto va en las filas?",
            opciones: ["El conjunto de partida A", "El conjunto de llegada B", "Solo D(R)", "A × B"],
            correcta: 0, pista: "Filas para la primera componente.",
            explicacion: "Las filas corresponden al conjunto de partida y las columnas al de llegada." },
          { pregunta: "En un dígrafo, ¿qué representa un lazo (bucle) en el vértice x?",
            opciones: ["Que (x, x) ∈ R.", "Que x no está relacionado con nadie.", "Que (x, y) y (y, x) están en R.", "Que x está dos veces en A."],
            correcta: 0, pista: "El lazo sale de x y vuelve a x.",
            explicacion: "Un lazo o bucle en x es la flecha de x a x: representa el par (x, x)." },
          { pregunta: "¿Cuándo se usa un dígrafo en vez de un diagrama sagital?",
            opciones: ["Cuando la relación es de un conjunto en sí mismo (R ⊆ A × A).", "Cuando A y B no tienen elementos en común.", "Cuando la relación es vacía.", "Nunca: es lo mismo que el sagital."],
            correcta: 0, pista: "En el dígrafo cada elemento se dibuja una sola vez.",
            explicacion: "Si R es una relación en A (R ⊆ A × A), con el dígrafo cada elemento aparece una sola vez y los pares son flechas, con lazos para los (x, x)." },
          { gen: "leerSagital" },
          { gen: "matriz" },
          { gen: "leerDigrafo" },
          { gen: "leerMatriz" }
        ]
      },
      {
        titulo: "Propiedades: idéntica, simétrica y transitiva",
        resumen: "Cómo verificarlas con la definición y cómo dar un contraejemplo.",
        lab: "R2", vista: "digrafo",
        apuntes: {
          ideas: [
            "Son propiedades de una relación R en A (R ⊆ A × A).",
            "Idéntica (reflexiva): para todo x ∈ A, (x, x) ∈ R. En el dígrafo, lazo en cada vértice; en la matriz, 1 en toda la diagonal.",
            "Simétrica: si (x, y) ∈ R, entonces (y, x) ∈ R. Cada flecha tiene su vuelta; la matriz es igual a su reflejo por la diagonal.",
            "Transitiva: si (x, y) ∈ R y (y, z) ∈ R, entonces (x, z) ∈ R.",
            "Para decir que NO cumple, alcanza un contraejemplo concreto. Si no hay pares que prueben la condición, se cumple por vacuidad."
          ],
          dibujo: {
            svg: svgDigrafo(PROP_A, PROP_R),
            texto: ["A = {1, 2, 3}, R = {(1, 1), (1, 2), (2, 1), (2, 2), (3, 3)}", "idéntica ✓  simétrica ✓  transitiva ✓"]
          }
        },
        contenido: `
          <p>Estas propiedades son de una <strong>relación en A</strong> (R ⊆ A × A). Cada una se verifica con su definición exacta.</p>
          <div class="def"><span class="def-tag">Idéntica</span>R es <strong>idéntica</strong> (o reflexiva) si <strong>(x, x) ∈ R para todo x ∈ A</strong>. No alcanza con que haya algún (x, x): tienen que estar todos.</div>
          <div class="def"><span class="def-tag">Simétrica</span>R es <strong>simétrica</strong> si <strong>cada vez que (x, y) ∈ R, también (y, x) ∈ R</strong>.</div>
          <div class="def"><span class="def-tag">Transitiva</span>R es <strong>transitiva</strong> si <strong>(x, y) ∈ R y (y, z) ∈ R implican (x, z) ∈ R</strong>.</div>
          <h3>Ejemplo que cumple las tres</h3>
          <p>A = {1, 2, 3} y R = {(1, 1), (1, 2), (2, 1), (2, 2), (3, 3)}.</p>
          <ul><li>${exProp.identica}</li><li>${exProp.simetrica}</li><li>${exProp.transitiva}</li></ul>
          <h3>Ejemplo con contraejemplos</h3>
          <p>En el mismo A, R = {(1, 2), (2, 1)}.</p>
          <ul><li>${exProp2.identica}</li><li>${exProp2.simetrica}</li><li>${exProp2.transitiva}</li></ul>
          <h3>En los dibujos</h3>
          <ul>
            <li><strong>Dígrafo:</strong> idéntica = hay lazo en todos los vértices; simétrica = cada flecha tiene su vuelta; transitiva = si podés ir de x a y y de y a z, hay flecha directa de x a z.</li>
            <li><strong>Matriz</strong> (filas y columnas en el mismo orden): idéntica = 1 en toda la diagonal; simétrica = la matriz es igual a su reflejo por la diagonal.</li>
          </ul>
          <div class="def def-yellow"><span class="def-tag">Ojo: vacuidad</span>Si no hay ningún par que ponga a prueba la condición, se cumple «por vacuidad». En A = {1, 2, 3}, ¿R = {(1, 2)} es simétrica? No: falta (2, 1). ¿Es transitiva? Sí: no hay ningún (2, z) en R, así que nunca se da (x, y), (y, z). Y la relación vacía en un A no vacío es simétrica y transitiva, pero no idéntica.</div>`,
        clase: [
          "Para afirmar una propiedad, mostrá que se cumple para todos los casos (por ejemplo, listando los (x, x) o los pares con su inverso).",
          "Para negarla, alcanza un contraejemplo concreto: decí qué par está y cuál falta.",
          "En transitiva, revisá las cadenas (x, y), (y, z), incluidas las que usan lazos."
        ],
        preguntas: [
          { pregunta: "Una relación R en A es idéntica (reflexiva) cuando…",
            opciones: ["para todo x ∈ A, (x, x) ∈ R.", "existe algún x ∈ A con (x, x) ∈ R.", "para todo x ∈ A, (x, x) ∉ R.", "si (x, y) ∈ R, entonces (y, x) ∈ R."],
            correcta: 0, pista: "Tienen que estar todos los (x, x).",
            explicacion: "Idéntica: (x, x) ∈ R para todo x de A. Si falta uno solo, ya no es idéntica." },
          { pregunta: "R es simétrica cuando…",
            opciones: ["cada vez que (x, y) ∈ R, también (y, x) ∈ R.", "para todo x ∈ A, (x, x) ∈ R.", "si (x, y) ∈ R y (y, z) ∈ R, entonces (x, z) ∈ R.", "R tiene la misma cantidad de pares que A."],
            correcta: 0, pista: "Cada par tiene que tener su par dado vuelta.",
            explicacion: "Simétrica: si (x, y) ∈ R, entonces (y, x) ∈ R." },
          { pregunta: "R es transitiva cuando…",
            opciones: ["si (x, y) ∈ R y (y, z) ∈ R, entonces (x, z) ∈ R.", "si (x, y) ∈ R, entonces (y, x) ∈ R.", "si (x, y) ∈ R y (y, z) ∈ R, entonces (z, x) ∈ R.", "para todo x ∈ A, (x, x) ∈ R."],
            correcta: 0, pista: "Pensá en cadenas: de x a y y de y a z.",
            explicacion: "Transitiva: (x, y) ∈ R y (y, z) ∈ R implican (x, z) ∈ R." },
          { pregunta: "En A = {1, 2, 3}, ¿R = {(1, 2)} es transitiva?",
            opciones: ["Sí: no hay ningún (2, z) en R, así que la condición nunca falla.", "No, porque falta (2, 1).", "No, porque falta (1, 1).", "No se puede saber con un solo par."],
            correcta: 0, pista: "¿Hay dos pares encadenados (x, y), (y, z)?",
            explicacion: "Para que falle haría falta (1, 2) y algún (2, z) en R, y no hay ninguno. Se cumple por vacuidad. Lo de (2, 1) tiene que ver con la simetría, no con la transitividad." },
          { pregunta: "En A = {1, 2}, ¿la relación vacía R = ∅ es idéntica?",
            opciones: ["No: tendría que tener (1, 1) y (2, 2).", "Sí, porque no tiene pares que fallen.", "Sí, toda relación vacía es idéntica.", "No se puede saber."],
            correcta: 0, pista: "Idéntica pide que ciertos pares ESTÉN.",
            explicacion: "Idéntica exige (x, x) ∈ R para todo x ∈ A: acá tendrían que estar (1, 1) y (2, 2), y R = ∅ no los tiene. (En cambio sí es simétrica y transitiva, por vacuidad)." },
          { pregunta: "¿Qué hace falta para mostrar que R NO es simétrica?",
            opciones: ["Un par (x, y) ∈ R tal que (y, x) ∉ R.", "Que ningún par tenga su inverso.", "Un par (x, x) que no esté en R.", "Que R tenga una cantidad impar de pares."],
            correcta: 0, pista: "Alcanza con un contraejemplo.",
            explicacion: "Basta un solo par (x, y) ∈ R con (y, x) ∉ R. No hace falta que fallen todos, y los (x, x) no tienen que ver con la simetría." },
          { gen: "propiedades" },
          { gen: "agregarIdentica" },
          { gen: "agregarSimetrica" },
          { gen: "faltanTransitiva" }
        ]
      }
    ]
  };
  // el tema de cada pregunta (lo usan el resultado por tema y el comodín de Elías)
  CLASE.temas.forEach((t, i) => t.preguntas.forEach((p) => { p.tema = i; }));

  /* ---------- ¿estoy listo para el escrito? (preguntas nuevas + ejercicios) ---------- */
  const EXAMEN = {
    aprobado: 85,
    casi: 60,
    preguntas: [
      { tema: 0, pregunta: "¿Cuál de estas igualdades es verdadera?",
        opciones: ["(4, 1) = (2 + 2, 3 − 2)", "(4, 1) = (1, 4)", "(4, 1) = (4, 4)", "{4, 1} ≠ {1, 4}"],
        correcta: 0, pista: "Calculá las componentes y compará en orden.",
        explicacion: "(2 + 2, 3 − 2) = (4, 1): coinciden primera y segunda componente. (1, 4) está dado vuelta, (4, 4) tiene distinta la segunda y {4, 1} = {1, 4} porque en conjuntos no importa el orden." },
      { tema: 0, pregunta: "En un par ordenado, ¿pueden las dos componentes ser iguales?",
        opciones: ["Sí, por ejemplo (3, 3) es un par ordenado.", "No, tienen que ser distintas.", "Solo si son letras.", "Solo en B × A."],
        correcta: 0, pista: "Pensá en los lazos de un dígrafo.",
        explicacion: "Sí: (3, 3) es un par con primera y segunda componente 3. Esos pares aparecen, por ejemplo, en las relaciones idénticas." },
      { tema: 0, gen: "parOrden" },
      { tema: 1, pregunta: "Si A = {1, 2} y B = {a, b, c}, ¿cuál de estos pares está en B × A?",
        opciones: ["(c, 2)", "(2, c)", "(1, a)", "(a, b)"],
        correcta: 0, pista: "En B × A la primera componente es de B.",
        explicacion: "(c, 2) ∈ B × A porque c ∈ B y 2 ∈ A. (2, c) y (1, a) son de A × B, y (a, b) no, porque b ∉ A." },
      { tema: 1, pregunta: "¿Cuántos pares tiene A × A si A = {1, 2, 3}?",
        opciones: ["9", "6", "3", "27"],
        correcta: 0, pista: "|A × A| = |A| · |A|.",
        explicacion: "Cada uno de los 3 elementos se combina con cada uno de los 3: 3 · 3 = 9 pares." },
      { tema: 1, gen: "tablaPertenece" },
      { tema: 2, pregunta: "Con A = {2, 3, 5}, B = {4, 6, 9, 10} y x R y ⇔ «y es el doble de x», ¿qué par NO está en R?",
        opciones: ["(3, 9)", "(2, 4)", "(3, 6)", "(5, 10)"],
        correcta: 0, pista: "Calculá el doble de cada x.",
        explicacion: "R = {(2, 4), (3, 6), (5, 10)}. El par (3, 9) está en A × B, pero 9 ≠ 2 · 3, así que 3 R̸ 9." },
      { tema: 2, pregunta: "Si R: A → B, ¿cuál de estas afirmaciones es siempre cierta?",
        opciones: ["R ⊆ A × B", "R = A × B", "R ⊆ B × A", "R tiene |A| · |B| pares"],
        correcta: 0, pista: "Es la definición de relación.",
        explicacion: "Por definición, R: A → B es un subconjunto de A × B. Puede tener menos pares que A × B (incluso ninguno)." },
      { tema: 2, gen: "construir" },
      { tema: 3, pregunta: "R = {(1, 2), (1, 3), (4, 3)} es una relación de A = {1, 2, 3, 4} en B = {2, 3, 5}. ¿Cuál es D(R)?",
        opciones: ["{1, 4}", "{1, 2, 3, 4}", "{2, 3}", "{2, 3, 5}"],
        correcta: 0, pista: "Primeras componentes, sin repetir.",
        explicacion: "Las primeras componentes son 1, 1 y 4: D(R) = {1, 4}. {2, 3} es I(R) y {1, 2, 3, 4} es el conjunto de partida A." },
      { tema: 3, pregunta: "Si (5, 8) ∈ R, ¿qué par seguro está en R⁻¹?",
        opciones: ["(8, 5)", "(5, 8)", "(5, 5)", "(8, 8)"],
        correcta: 0, pista: "R⁻¹ da vuelta los pares.",
        explicacion: "Por definición, (x, y) ∈ R ⇒ (y, x) ∈ R⁻¹. Entonces (8, 5) ∈ R⁻¹." },
      { tema: 3, gen: "imagen" },
      { tema: 3, gen: "inversa" },
      { tema: 4, pregunta: "La matriz de R: A → B, con A = {a, b} en las filas y B = {1, 2, 3} en las columnas, tiene la fila a: 1 0 1 y la fila b: 0 1 0. ¿Cuál es R?",
        opciones: ["{(a, 1), (a, 3), (b, 2)}", "{(1, a), (3, a), (2, b)}", "{(a, 2), (b, 1), (b, 3)}", "{(a, 1), (b, 2)}"],
        correcta: 0, pista: "Cada 1 es un par (fila, columna).",
        explicacion: "Los 1 están en (fila a, columna 1), (fila a, columna 3) y (fila b, columna 2): R = {(a, 1), (a, 3), (b, 2)}. Los pares dados vuelta no van, y {(a, 2), (b, 1), (b, 3)} son los 0." },
      { tema: 4, pregunta: "Si |A| = 3 y |B| = 4, ¿qué tamaño tiene la matriz de una relación R: A → B?",
        opciones: ["3 filas y 4 columnas", "4 filas y 3 columnas", "3 filas y 3 columnas", "12 filas y 1 columna"],
        correcta: 0, pista: "Filas = partida, columnas = llegada.",
        explicacion: "Una fila por cada elemento del conjunto de partida A (3) y una columna por cada elemento del de llegada B (4)." },
      { tema: 4, gen: "matriz" },
      { tema: 5, pregunta: "En A = {1, 2, 3}, R = {(1, 1), (2, 2), (3, 3), (1, 2)}. ¿Qué propiedades cumple?",
        opciones: ["Idéntica y transitiva, pero no simétrica", "Las tres", "Solo idéntica", "Simétrica y transitiva, pero no idéntica"],
        correcta: 0, pista: "Revisá las tres por separado.",
        explicacion: "Idéntica ✓: están (1, 1), (2, 2) y (3, 3). Simétrica ✗: (1, 2) ∈ R pero (2, 1) ∉ R. Transitiva ✓: las cadenas son (1, 1), (1, 2) → (1, 2) y (1, 2), (2, 2) → (1, 2), más las de los lazos solos, y en todas está (x, z)." },
      { tema: 5, pregunta: "En A = {1, 2}, ¿R = {(1, 2), (2, 1)} es transitiva?",
        opciones: ["No: (1, 2) y (2, 1) están, pero (1, 1) no.", "Sí, porque es simétrica.", "Sí, porque tiene solo dos pares.", "No, porque falta (2, 3)."],
        correcta: 0, pista: "Encadená (1, 2) con (2, 1).",
        explicacion: "(1, 2) ∈ R y (2, 1) ∈ R, entonces la transitividad pide (1, 1) ∈ R, que no está. Contraejemplo encontrado: no es transitiva. (2, 3) ni siquiera está en A × A." },
      { tema: 5, gen: "propiedades" },
      { tema: 5, gen: "faltanTransitiva" }
    ]
  };

  /* ---------- ejemplos del laboratorio (salen de los materiales) ---------- */
  const PALABRAS = ["azul", "racimo", "toro", "camino", "barco", "flor"];
  const P4 = [1, 2, 4, 7];
  const conR = (A, B, f) => producto(A, B).filter(([x, y]) => f(x, y));
  const EJEMPLOS = {
    menor: { nombre: "Ej. 8.7 · «x es menor que y»", A: [1, 2, 3, 4], B: [2, 3, 4], regla: "x R y ⇔ x < y", f: (x, y) => x < y },
    doble: { nombre: "Práctico 1 · «y es el doble de x»", A: [1, 2, 3], B: [2, 4, 6], regla: "x R y ⇔ y = 2x", f: (x, y) => y === 2 * x },
    letras: { nombre: "Práctico 3, Ej. 1 · número y letra", A: [1, 2, 3, 4, 5], B: ["a", "b", "c", "d", "e"], regla: "x R y ⇔ x es la posición de la letra y", f: (x, y) => LETRAS.indexOf(y) + 1 === x },
    matriz: { nombre: "Diapositivas · ejemplo de la matriz", A: MAT_A, B: MAT_B, R: MAT_R },
    raiz: { nombre: "Ej. 8.10 · «x es raíz cuadrada de y»", A: [1, 2, 4, 7], B: [1, 2, 4, 16], regla: "x R y ⇔ x² = y", f: (x, y) => x * x === y },
    ceroUno: { nombre: "Diapositivas · relación en {0, 1}", A: [0, 1], B: [0, 1], R: [[0, 0], [1, 0], [1, 1]], enUno: true },
    palabras: { nombre: "Práctico 3, Ej. 3 · misma cantidad de letras", A: PALABRAS, B: PALABRAS, enUno: true, regla: "x R y ⇔ x e y tienen la misma cantidad de letras", f: (x, y) => x.length === y.length },
    R2: { nombre: "Práctico 3, Ej. 4 · R2", A: P4, B: P4, enUno: true, R: [[1, 1], [2, 2], [4, 4], [2, 7], [7, 7]] },
    R3: { nombre: "Práctico 3, Ej. 4 · R3", A: P4, B: P4, enUno: true, R: [[4, 1], [1, 4], [2, 7], [7, 2]] },
    R4: { nombre: "Práctico 3, Ej. 4 · R4", A: P4, B: P4, enUno: true, R: [[4, 1], [1, 4], [2, 7], [7, 1]] },
    R5: { nombre: "Práctico 3, Ej. 4 · R5", A: P4, B: P4, enUno: true, R: [[4, 1], [1, 7], [2, 7], [7, 4], [2, 2]] },
    R6: { nombre: "Práctico 3, Ej. 4 · R6", A: P4, B: P4, enUno: true, R: [[4, 1], [1, 7], [2, 7], [7, 4]] },
    R7: { nombre: "Práctico 3, Ej. 4 · R7", A: P4, B: P4, enUno: true, R: [[4, 1], [1, 7], [4, 7]] }
  };
  Object.values(EJEMPLOS).forEach((e) => { e.R = ordenar(e.R || conR(e.A, e.B, e.f), e.A, e.B); });

  const labEstado = { key: null, vista: "sagital" };
  function lab(box, t) {
    if (!t.lab) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    labEstado.key = t.lab;
    labEstado.vista = t.vista || "sagital";
    dibujarLab(box);
  }
  function dibujarLab(box) {
    const e = EJEMPLOS[labEstado.key];
    const vistas = [["pares", "Pares"], ["sagital", "Sagital"], ...(e.enUno ? [["digrafo", "Dígrafo"]] : []), ["matriz", "Matriz"]];
    if (!vistas.some(([v]) => v === labEstado.vista)) labEstado.vista = "sagital";
    const v = labEstado.vista;
    const fig = v === "pares" ? `<p class="rel-pares">R = ${relTxt(e.R)}</p>`
      : v === "sagital" ? svgSagital(e.A, e.B, e.R, e.enUno ? ["A", "A"] : ["A", "B"])
        : v === "digrafo" ? svgDigrafo(e.A, e.R) : htmlMatriz(e.A, e.B, e.R);
    const D = dominio(e.A, e.R), I = imagen(e.B, e.R);
    const inv = ordenar(inversa(e.R), e.B, e.A);
    const info = [
      e.enUno ? `<strong>R en A</strong> (R ⊆ A × A), con A = ${llaves(e.A)}` : `<strong>R: A → B</strong> · partida A = ${llaves(e.A)} · llegada B = ${llaves(e.B)}`,
      e.regla ? `Regla: ${e.regla}` : "",
      `R = ${relTxt(e.R)} → ${e.R.length} pares`,
      `D(R) = ${llaves(D)} · I(R) = ${llaves(I)}`,
      `R⁻¹ = ${relTxt(inv)}${e.enUno ? "" : " (de B en A)"}`
    ];
    if (e.enUno) {
      const ex = explicarPropiedades(e.A, e.R);
      info.push(`<strong>${resumenPropiedades(ex.p)}</strong>`, ex.identica, ex.simetrica, ex.transitiva);
    }
    box.innerHTML = `<div class="graph-lab-head"><label for="rel-ejemplo" class="hud-label">Ejemplo</label><select id="rel-ejemplo">${Object.entries(EJEMPLOS).map(([k, x]) => `<option value="${k}"${k === labEstado.key ? " selected" : ""}>${x.nombre}</option>`).join("")}</select></div>` +
      `<div class="rel-vistas" role="group" aria-label="Cómo se muestra la relación">${vistas.map(([k, nom]) => `<button type="button" class="btn btn-ghost btn-small" data-vista="${k}" aria-pressed="${k === v}">${nom}</button>`).join("")}</div>` +
      `<div class="rel-figura">${fig}</div>` +
      `<figcaption class="graph-info rel-info" aria-live="polite">${info.filter(Boolean).map((l) => `<span>${l}</span>`).join("")}</figcaption>`;
    box.querySelector("#rel-ejemplo").addEventListener("change", (ev) => { labEstado.key = ev.target.value; dibujarLab(box); box.querySelector("#rel-ejemplo").focus(); });
    box.querySelectorAll("[data-vista]").forEach((b) => b.addEventListener("click", () => {
      labEstado.vista = b.dataset.vista;
      if (typeof sound !== "undefined") sound.play("click");
      dibujarLab(box);
      const nuevo = box.querySelector(`[data-vista="${labEstado.vista}"]`);
      if (nuevo) nuevo.focus({ preventScroll: true });
    }));
  }

  /* ---------- el ejercicio en pantalla (usa #q-ej de relaciones.html) ---------- */
  const qs = (s) => document.querySelector(s);
  const DICHO = { on: "marcado", ok: "bien marcado", mal: "marcado de más", falta: "te faltó marcarlo", descartado: "descartado por Rappi: no va", fijo: "ya está en R" };
  const SIMBOLO = { ok: "✓", mal: "✗", falta: "!", descartado: "🛵", fijo: "en R" };

  function estadoDe(ej, it) {
    if (ej.fijos.has(it.k)) return "fijo";
    if (ej.descartados.has(it.k)) return "descartado";
    const m = ej.marcados.has(it.k);
    if (!ej.listo) return m ? "on" : "";
    const c = ej.correctas.has(it.k);
    return m ? (c ? "ok" : "mal") : c ? "falta" : "";
  }
  const valorDe = (ej, it) => {
    const m = ej.marcados.has(it.k);
    return ej.celda === "bit" ? (m ? "1" : "0") : ej.celda === "pertenece" ? (m ? "∈" : "∉") : it.txt;
  };

  function boton(q, it) {
    const ej = q.ej;
    const est = estadoDe(ej, it);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ej-item" + (est ? " " + est : "");
    b.dataset.k = it.k;
    b.innerHTML = `<span class="ej-txt"></span><span class="ej-mark" aria-hidden="true"></span>`;
    const txt = valorDe(ej, it);
    b.firstChild.textContent = txt;
    b.lastChild.textContent = SIMBOLO[est] || "";
    b.setAttribute("aria-label", `${it.nombre}${ej.celda === "bit" || ej.celda === "pertenece" ? ": " + txt : ""}${DICHO[est] ? " · " + DICHO[est] : ""}`);
    if (est === "fijo" || est === "descartado" || ej.listo) b.disabled = true;
    else {
      b.setAttribute("aria-pressed", String(ej.marcados.has(it.k)));
      b.addEventListener("click", () => tocar(q, it.k));
    }
    return b;
  }

  function pintar(q) {
    const fig = qs("#ej-figura");
    fig.innerHTML = q.ej.figura || "";
    fig.hidden = !q.ej.figura;
    pintarItems(q);
  }

  function pintarItems(q, enfocar) {
    const ej = q.ej;
    const box = qs("#ej-items");
    box.innerHTML = "";
    box.className = "ej-items " + (ej.vista === "grilla" ? "ej-grilla" : "ej-chips");
    if (ej.vista === "chips") ej.items.forEach((it) => box.appendChild(boton(q, it)));
    else {
      const wrap = document.createElement("div");
      wrap.className = "ej-tabla-wrap";
      const t = document.createElement("table");
      t.className = "ej-tabla ej-" + ej.celda;
      const th = (txt, scope) => { const c = document.createElement("th"); c.scope = scope; c.textContent = txt; return c; };
      const head = t.createTHead().insertRow();
      head.appendChild(th(ej.esquina, "col"));
      ej.cols.forEach((c) => head.appendChild(th(c, "col")));
      const body = t.createTBody();
      ej.filas.forEach((f, i) => {
        const tr = body.insertRow();
        tr.appendChild(th(f, "row"));
        ej.cols.forEach((_, j) => tr.insertCell().appendChild(boton(q, ej.items[i * ej.cols.length + j])));
      });
      wrap.appendChild(t);
      box.appendChild(wrap);
    }
    const check = qs("#ej-check");
    check.hidden = ej.listo;
    check.disabled = !ej.marcados.size;
    if (!ej.listo) info(ej);
    if (enfocar) {
      const b = box.querySelector(`[data-k="${enfocar}"]`);
      if (b) b.focus({ preventScroll: true });
    }
  }

  const nombresDe = (ej, set) => ej.items.filter((it) => set.has(it.k)).map((it) => it.nombre);

  function info(ej) {
    const marc = nombresDe(ej, ej.marcados);
    let t = marc.length
      ? `${marc.length <= 6 ? `Marcaste: ${enLista(marc)}.` : `Marcaste ${marc.length}.`} Cuando estés pronto, tocá ✔ Comprobar.`
      : CONSIGNA[ej.celda] || CONSIGNA.chips;
    if (ej.descartados.size) t += ` 🛵 Rappi descartó ${enLista(nombresDe(ej, ej.descartados))}: ${ej.descartados.size > 1 ? "esos no van" : "ese no va"}.`;
    qs("#ej-info").textContent = t;
  }

  // tocar solo marca o desmarca: no corrige, no suma puntos y no avanza
  function tocar(q, k) {
    if (typeof quiz === "undefined" || current !== "quiz" || quiz.deck[quiz.index] !== q || quiz.answered || quiz.busy) return;
    const ej = q.ej;
    if (ej.listo || ej.descartados.has(k) || ej.fijos.has(k)) return;
    if (ej.marcados.has(k)) ej.marcados.delete(k);
    else {
      if (ej.exclusivo) { if (k === ej.exclusivo) ej.marcados.clear(); else ej.marcados.delete(ej.exclusivo); }
      ej.marcados.add(k);
    }
    sound.play("click");
    pintarItems(q, k);
  }

  // se corrige una sola vez: bien solo si lo marcado es exactamente lo que va
  function comprobar(q) {
    const ej = q.ej;
    ej.listo = true;
    const ok = ej.marcados.size === ej.correctas.size && [...ej.correctas].every((k) => ej.marcados.has(k));
    const bien = nombresDe(ej, new Set([...ej.marcados].filter((k) => ej.correctas.has(k))));
    const deMas = nombresDe(ej, new Set([...ej.marcados].filter((k) => !ej.correctas.has(k))));
    const faltan = nombresDe(ej, new Set([...ej.correctas].filter((k) => !ej.marcados.has(k))));
    pintarItems(q);
    qs("#ej-info").textContent = ok ? "✓ ¡Exacto! Marcaste justo lo que iba."
      : [bien.length && `✓ bien: ${enLista(bien)}`, deMas.length && `✗ de más: ${enLista(deMas)}`, faltan.length && `! te faltó: ${enLista(faltan)}`].filter(Boolean).join(" · ");
    const pre = ej.marcaTxt || "";
    return { ok, elegida: pre + enLista(nombresDe(ej, ej.marcados)), correcta: pre + enLista(nombresDe(ej, ej.correctas)) };
  }

  /* ---------- comodines en los ejercicios ---------- */
  // Rappi: atropella hasta dos cosas que NO van (no se marcan nunca); las correctas no las toca
  const distractores = (q) => q.ej.items.filter((it) => !q.ej.correctas.has(it.k) && !q.ej.fijos.has(it.k) && !q.ej.descartados.has(it.k)).map((it) => it.k);

  function atropellar(q, k, b, cruce = 0.4) {
    const ej = q.ej;
    if (!k || ej.descartados.has(k) || !b) return;
    ej.descartados.add(k);
    ej.marcados.delete(k);
    const it = ej.items.find((x) => x.k === k);
    b.className = "ej-item descartado";
    b.disabled = true;
    b.removeAttribute("aria-pressed");
    b.firstChild.textContent = valorDe(ej, it);
    b.querySelector(".ej-mark").textContent = SIMBOLO.descartado;
    b.setAttribute("aria-label", `${it.nombre} · ${DICHO.descartado}`);
    const skid = document.createElement("span");
    skid.className = "skid";
    skid.setAttribute("aria-hidden", "true");
    skid.style.setProperty("--skid-d", `${Math.max(0.15, cruce)}s`);
    b.appendChild(skid);
    sound.play("crash");
    qs("#ej-check").disabled = !ej.marcados.size;
    info(ej);
  }

  function paraRappi(q) {
    const objetivo = mezclar(distractores(q)).slice(0, 2);
    const els = [...document.querySelectorAll("#ej-items .ej-item")];
    const ks = els.map((b) => b.dataset.k);
    const cosa = q.ej.vista === "grilla" ? (objetivo.length > 1 ? "casillas" : "casilla") : objetivo.length > 1 ? "opciones" : "opción";
    return {
      els,
      objetivo: objetivo.map((k) => ks.indexOf(k)),
      pisar: (i, cruce) => atropellar(q, ks[i], els[i], cruce),
      mensaje: `¡Rappi atropelló ${objetivo.length > 1 ? "dos" : "una"} ${cosa} que no ${objetivo.length > 1 ? "van" : "va"}! Quedan descartadas: esas no se marcan. Lo demás lo decidís vos.`
    };
  }

  // Elías: otra pregunta del mismo tema y del mismo tipo (los ejercicios se arman de nuevo con otros datos)
  function reemplazo(q, quiz) {
    if (q.gen) return { generar: { gen: q.gen, tema: q.tema, categoria: q.categoria } };
    const vistas = new Set(quiz.deck.map((x) => x.pregunta));
    const libres = quiz.reserve.filter((x) => x.tema === q.tema && !vistas.has(x.pregunta));
    if (libres.length) return { pregunta: elegir(libres) };
    const mismos = Object.keys(GEN).filter((t) => GEN[t].tema === q.tema);
    const mc = mismos.filter((t) => GEN[t].mc);
    const tipos = mc.length ? mc : mismos;
    return tipos.length ? { generar: { gen: elegir(tipos), tema: q.tema, categoria: q.categoria } } : null;
  }

  // las preguntas fijas que no salieron en esta ronda (para el comodín de Elías)
  function reserva(deck) {
    const enMazo = new Set(deck.map((x) => x.pregunta));
    return [...CLASE.temas.flatMap((t) => t.preguntas), ...EXAMEN.preguntas].filter((x) => x.pregunta && !enMazo.has(x.pregunta));
  }

  // arma un ejercicio nuevo; «usadas» evita repetir los mismos datos en la ronda
  function armar(stub, usadas) {
    const g = GEN[stub.gen];
    let q = null;
    for (let i = 0; i < 40; i++) {
      const nuevo = g.f();
      if (!nuevo) continue;
      q = nuevo;
      if (!usadas || !usadas.has(q.firma)) break;
    }
    if (usadas) usadas.add(q.firma);
    const tema = stub.tema ?? g.tema;
    const base = { ...q, gen: stub.gen, tema, categoria: stub.categoria || `Relaciones · ${CLASE.temas[tema].titulo}` };
    if (base.ej) base.mezcla = [];
    return base;
  }

  /* ---------- el desafío: verdadero o falso sobre relaciones ---------- */
  const AFIRMACIONES = [
    { texto: "(2, 5) = (5, 2).", v: false },
    { texto: "{2, 5} = {5, 2}.", v: true },
    { texto: "En un par ordenado importa el orden de las componentes.", v: true },
    { texto: "(a, b) = (c, d) si y solo si a = c y b = d.", v: true },
    { texto: "(3, 3) no es un par ordenado porque repite el elemento.", v: false },
    { texto: "A × B = {(x, y) / x ∈ A ∧ y ∈ B}.", v: true },
    { texto: "Para cualquier par de conjuntos, A × B = B × A.", v: false },
    { texto: "Si A tiene 2 elementos y B tiene 3, A × B tiene 6 pares.", v: true },
    { texto: "Si A tiene 2 elementos y B tiene 3, A × B tiene 5 pares.", v: false },
    { texto: "En A × B, la primera componente de cada par es de A.", v: true },
    { texto: "Una relación de A en B es un subconjunto de A × B.", v: true },
    { texto: "Toda relación de A en B es igual a A × B.", v: false },
    { texto: "En R: A → B, A es el conjunto de partida.", v: true },
    { texto: "En R: A → B, A es el conjunto de llegada.", v: false },
    { texto: "x R y significa que (x, y) ∈ R.", v: true },
    { texto: "x R̸ y significa que (x, y) ∉ R.", v: true },
    { texto: "La relación vacía ∅ es una relación de A en B.", v: true },
    { texto: "D(R) está formado por las segundas componentes de los pares de R.", v: false },
    { texto: "I(R) está formada por las segundas componentes de los pares de R.", v: true },
    { texto: "D(R) siempre es igual al conjunto de partida.", v: false },
    { texto: "Si (x, y) ∈ R, entonces (y, x) ∈ R⁻¹.", v: true },
    { texto: "Si (x, y) ∈ R, entonces (x, y) ∈ R⁻¹ siempre.", v: false },
    { texto: "Si R va de A en B, entonces R⁻¹ va de B en A.", v: true },
    { texto: "La inversa de R⁻¹ es R.", v: true },
    { texto: "En la matriz de R: A → B, las filas corresponden al conjunto de partida.", v: true },
    { texto: "En la matriz de una relación, un 0 en la fila x y la columna y indica que (x, y) ∈ R.", v: false },
    { texto: "Un dígrafo se usa para representar una relación de un conjunto en sí mismo.", v: true },
    { texto: "En un dígrafo, un lazo en x representa el par (x, x).", v: true },
    { texto: "En un diagrama sagital, cada flecha va de un elemento del conjunto de partida a uno del de llegada.", v: true },
    { texto: "R en A es idéntica si (x, x) ∈ R para todo x ∈ A.", v: true },
    { texto: "Si R tiene algún par (x, x), entonces R es idéntica.", v: false },
    { texto: "La relación vacía en A = {1, 2} es idéntica.", v: false },
    { texto: "La relación vacía en A = {1, 2} es simétrica.", v: true },
    { texto: "La relación vacía en A = {1, 2} es transitiva.", v: true },
    { texto: "R = {(1, 2), (2, 1)} en A = {1, 2} es simétrica.", v: true },
    { texto: "R = {(1, 2), (2, 1)} en A = {1, 2} es transitiva.", v: false },
    { texto: "R = {(1, 2)} en A = {1, 2, 3} es transitiva.", v: true },
    { texto: "Si R es simétrica y (3, 5) ∈ R, entonces (5, 3) ∈ R.", v: true },
    { texto: "Para mostrar que R no es simétrica alcanza con un par (x, y) ∈ R tal que (y, x) ∉ R.", v: true },
    { texto: "En la matriz de una relación idéntica en A (mismo orden en filas y columnas) hay 1 en toda la diagonal.", v: true },
    { texto: "En A = {azul, toro, barco}, «tener la misma cantidad de letras» es una relación idéntica.", v: true }
  ];

  // afirmaciones con datos nuevos en cada desafío (la respuesta se calcula)
  const GEN_AFIRMACION = [
    () => {
      const A = muestra(rango(1, 6), azar(2, 3)), B = muestra(LETRAS.slice(0, 4), azar(2, 3));
      const bien = Math.random() < 0.5;
      const [x, y] = bien ? elegir(producto(A, B)) : elegir(producto(B, A));
      return { texto: `Si A = ${llaves(A)} y B = ${llaves(B)}, entonces ${par(x, y)} ∈ A × B.`, v: A.includes(x) && B.includes(y) };
    },
    () => {
      const m = azar(2, 5), n = azar(2, 5), d = elegir([0, 0, 1, -1, m + n - m * n]);
      const c = m * n + d;
      return { texto: `Si A tiene ${m} elementos y B tiene ${n}, A × B tiene ${c} pares.`, v: c === m * n };
    },
    () => {
      const { regla, A, B } = conRegla(1);
      const [x, y] = elegir(producto(A, B));
      return { texto: `Con x R y ⇔ ${regla.texto}: ${par(x, y)} ∈ R.`, v: regla.f(x, y) };
    },
    () => {
      const A = muestra([1, 2, 3, 4, 5], 3);
      const R = relAzar(A, A, 2, 4);
      const k = elegir(["identica", "simetrica", "transitiva"]);
      return { texto: `En A = ${llaves(A)}, R = ${relTxt(R)} es ${NOMBRE_PROP[k]}.`, v: propiedades(A, R)[k] };
    },
    () => {
      const A = muestra(rango(1, 6), 3), B = muestra(LETRAS.slice(0, 4), 3);
      const R = relAzar(A, B, 2, 3);
      const D = dominio(A, R);
      const bien = Math.random() < 0.5;
      const dicho = bien ? D : (D.length < A.length ? A : D.slice(0, -1));
      return { texto: `Si R = ${relTxt(R)}, entonces D(R) = ${llaves(dicho)}.`, v: llaves(dicho) === llaves(D) };
    },
    () => {
      const A = muestra(rango(1, 6), 3);
      const R = relAzar(A, A, 2, 3, (X) => X.some(([x, y]) => x !== y));
      const [x, y] = elegir(R.filter(([a, b]) => a !== b));
      const vuelta = Math.random() < 0.5;
      const S = claves(inversa(R));
      const [u, w] = vuelta ? [y, x] : [x, y];
      return { texto: `Si R = ${relTxt(R)}, entonces ${par(u, w)} ∈ R⁻¹.`, v: S.has(kp(u, w)) };
    }
  ];
  function mazoDesafio() {
    const vistas = new Set(AFIRMACIONES.map((a) => a.texto));
    const nuevas = [];
    for (let i = 0; i < 60 && nuevas.length < 20; i++) {
      const a = elegir(GEN_AFIRMACION)();
      if (!vistas.has(a.texto)) { vistas.add(a.texto); nuevas.push(a); }
    }
    return mezclar([...AFIRMACIONES, ...nuevas]);
  }

  /* ---------- frases de Guillermo para esta página ---------- */
  const FRASES = {
    bienvenida: "Hola, hoy estudiamos relaciones para el escrito. ¿Arrancamos?",
    instrucciones: "Marcá todo lo que va, sacá lo que no, y recién ahí tocá Comprobar. Si te trancás, te doy una pista",
    claseIntro: "Esto es relaciones: leelo tranqui, mirá el ejemplo y después te hago unas preguntitas",
    presentarIntro: "¡Hoy les presentamos relaciones! Presten atención, que después les pregunto.",
    teachTitulo: "Para el escrito",
    temaPerfecto: "¡{n} de {n}! Este tema lo tenés dominado: para el escrito estás.",
    temaBien: "¡Bien ahí! {c} de {n}. Repasá las que fallaste y este tema ya está.",
    temaFlojo: "{c} de {n}. Volvé a leer el tema con calma y probá de nuevo. ¡Así se aprende!",
    listoTitulo: "✔ ¡Estás listo para el escrito! ({pct} %)",
    listoMensaje: "¡Bien ahí! Sacaste {pct} %. Para el escrito estás pronto.",
    desafioIntro: "¡Este es mi desafío! 60 segundos de verdadero o falso sobre relaciones. ¿Estás pronto?",
    desafioSinMas: "¡Me dejaste sin afirmaciones! Las relaciones no tienen secretos para vos."
  };

  window.MATERIA = {
    clave: "rel",       // los récords y avances se guardan aparte de los de grafos
    nombre: "Relaciones",
    clase: CLASE,
    examen: EXAMEN,
    frases: FRASES,
    armar, pintar, comprobar, distractores, paraRappi, reemplazo, reserva, mazoDesafio, lab,
    // para probar: las cuentas que usan los ejercicios
    _prueba: { GEN, propiedades, explicarPropiedades, EJEMPLOS, producto, dominio, imagen, inversa }
  };
})();
