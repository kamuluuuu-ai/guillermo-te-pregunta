/* =========================================================
   Guillermo te pregunta · lógica del juego
   ---------------------------------------------------------
   ¿Querés cambiar las preguntas? Editá solo estas listas:
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
   3) CLASE: TEORÍA DE GRAFOS
   Basada en Rosen, «Matemática discreta y sus aplicaciones»
   (5.ª ed.), capítulo 8, secciones 8.1 y 8.2.
   Cada tema tiene:
     titulo, resumen → lo que se ve en la lista de temas
     contenido       → explicación (HTML simple)
     ejemplo         → grafo que se muestra primero (ver GRAFOS_EJEMPLO)
     modo            → "general" o "grado" (cómo resume el grafo)
     clase           → ideas para explicarlo frente a la clase
     preguntas       → igual que PREGUNTAS (sin "categoria")
   --------------------------------------------------------- */
const CLASE = {
  fuente: "Basado en Rosen, K. H., «Matemática discreta y sus aplicaciones», 5.ª ed., McGraw-Hill: cap. 8, sección 8.1 «Introducción a los grafos» (págs. 503–506) y sección 8.2 «Terminología en teoría de grafos» (págs. 511–512).",
  temas: [
    {
      titulo: "¿Qué es un grafo?",
      resumen: "Motivación visual: redes, conexiones y mapas.",
      ejemplo: "rutas",
      modo: "general",
      contenido: `
        <p>Un <strong>grafo</strong> es una forma de representar <strong>cosas que están conectadas</strong>. Dibujamos cada cosa como un punto y cada conexión como una línea que une dos puntos.</p>
        <div class="def"><span class="def-tag">Definición</span>Un grafo se escribe <strong>G = (V, E)</strong>: <strong>V</strong> es el conjunto de <em>vértices</em> (los puntos) y <strong>E</strong> es el conjunto de <em>aristas</em> (las conexiones entre puntos).</div>
        <h3>¿Dónde aparecen?</h3>
        <ul>
          <li><strong>Redes de computadoras:</strong> cada computadora es un punto y cada cable o enlace es una línea. Es el ejemplo con el que arranca el libro.</li>
          <li><strong>Mapas y rutas:</strong> las ciudades son puntos y las rutas que las unen son líneas.</li>
          <li><strong>Redes sociales:</strong> en un «grafo de conocidos» cada persona es un punto y se unen dos personas si se conocen.</li>
          <li><strong>Ecología:</strong> cada especie es un punto y se unen dos especies si compiten por el mismo alimento.</li>
        </ul>
        <p>Lo que importa es <strong>qué está conectado con qué</strong>. Dónde dibujes los puntos o si las líneas son rectas o curvas no cambia el grafo.</p>
        <h3>Un poco de historia</h3>
        <p>Las ideas básicas las introdujo el matemático suizo <strong>Leonhard Euler</strong> en el siglo XVIII, cuando resolvió el problema de los <strong>puentes de Königsberg</strong>: ¿se puede recorrer la ciudad cruzando cada puente una sola vez?</p>
`,
      clase: [
        "Arrancá con una pregunta: «¿Qué tienen en común un mapa de ómnibus, Instagram y la red de computadoras del liceo?». La respuesta: todos son cosas conectadas.",
        "Dibujá en el pizarrón un grafo de rutas con 4 o 5 ciudades y preguntá cuáles son los puntos y cuáles las conexiones.",
        "Mostrá que si movés los puntos de lugar sin cambiar las conexiones, el grafo es el mismo."
      ],
      preguntas: [
        {
          pregunta: "¿Qué es un grafo?",
          opciones: ["Un conjunto de vértices unidos por aristas", "Un gráfico de barras", "Una tabla con datos", "Una ecuación con dos incógnitas"],
          correcta: 0,
          pista: "Pensá en puntos y líneas que los conectan.",
          explicacion: "Un grafo G = (V, E) está formado por vértices (puntos) y aristas (conexiones entre ellos)."
        },
        {
          pregunta: "En la notación G = (V, E), ¿qué representa E?",
          opciones: ["El conjunto de aristas", "El conjunto de vértices", "La cantidad de grados", "El nombre del grafo"],
          correcta: 0,
          pista: "V es de «vértices». La otra letra viene de «edges» en inglés.",
          explicacion: "V es el conjunto de vértices y E el de aristas (del inglés «edges»)."
        },
        {
          pregunta: "Si en un mapa de rutas modelado con un grafo las rutas son las aristas, ¿qué son las ciudades?",
          opciones: ["Los vértices", "Las aristas", "Los lazos", "Los grados"],
          correcta: 0,
          pista: "Son los puntos que las rutas conectan.",
          explicacion: "Las ciudades son los vértices; las rutas que las unen son las aristas."
        },
        {
          pregunta: "Dibujás un grafo y después movés los puntos a otro lugar, sin cambiar ninguna conexión. ¿Qué pasa?",
          opciones: ["Sigue siendo el mismo grafo", "Se convierte en otro grafo", "Pierde aristas", "Gana vértices nuevos"],
          correcta: 0,
          pista: "¿Cambió qué está conectado con qué?",
          explicacion: "En un grafo solo importan las conexiones, no la posición ni la forma del dibujo."
        },
        {
          pregunta: "¿Quién introdujo las ideas básicas de la teoría de grafos con el problema de los puentes de Königsberg?",
          opciones: ["Leonhard Euler", "Isaac Newton", "Pitágoras", "Alan Turing"],
          correcta: 0,
          pista: "Fue un matemático suizo del siglo XVIII.",
          explicacion: "Leonhard Euler usó grafos en el siglo XVIII para resolver el problema de los puentes de Königsberg."
        },
        {
          pregunta: "En un grafo de conocidos, ¿cuándo se unen dos personas con una arista?",
          opciones: ["Cuando se conocen", "Cuando viven en la misma ciudad", "Siempre", "Nunca: las personas son aristas"],
          correcta: 0,
          pista: "El grafo se llama «de conocidos».",
          explicacion: "Cada persona es un vértice y se dibuja una arista entre dos personas si se conocen."
        }
      ]
    },
    {
      titulo: "Vértices (nodos)",
      resumen: "Los puntos de la red: el conjunto V.",
      ejemplo: "amigos",
      modo: "general",
      contenido: `
        <p>Los <strong>vértices</strong> (también llamados <strong>nodos</strong>) son los <strong>puntos de la red</strong>: cada uno representa uno de los elementos que queremos estudiar, como una persona, una ciudad o una computadora.</p>
        <div class="def"><span class="def-tag">Notación</span>Los vértices se juntan en un conjunto <strong>V</strong>. Por ejemplo, V = {a, b, c, d}. La cantidad de vértices se escribe |V|; en este ejemplo, |V| = 4.</div>
        <h3>Vértices vecinos</h3>
        <p>Dos vértices son <strong>adyacentes</strong> (o <strong>vecinos</strong>) si hay una arista que los une. En el grafo de amigos de abajo, Ana y Beto son adyacentes porque se conocen.</p>
        <h3>Vértices especiales</h3>
        <ul>
          <li><strong>Vértice aislado:</strong> no está unido a nadie. En el ejemplo, Fede no conoce a nadie del grupo.</li>
          <li><strong>Vértice colgante u hoja:</strong> está unido a exactamente un vértice. Eli solo conoce a Dani.</li>
        </ul>
        <p>Tocá cualquier vértice del ejemplo para ver sus vecinos.</p>`,
      clase: [
        "Pedí 5 voluntarios: cada uno es un vértice. Que se tomen de la mano con quien conocen de antes y vean quiénes quedan «aislados» o con una sola conexión.",
        "Escribí en el pizarrón el conjunto V con los nombres y preguntá cuánto vale |V|.",
        "Remarcá que un vértice puede representar cualquier cosa: no tiene que ser una persona."
      ],
      preguntas: [
        {
          pregunta: "¿Qué representa un vértice en un grafo?",
          opciones: ["Un punto o elemento de la red", "Una conexión entre dos puntos", "La cantidad de conexiones", "Un número"],
          correcta: 0,
          pista: "También se le dice «nodo».",
          explicacion: "Un vértice (o nodo) es cada uno de los puntos de la red: una persona, una ciudad, una computadora…"
        },
        {
          pregunta: "En un grafo de una red social donde se unen las personas que se conocen, ¿qué son los vértices?",
          opciones: ["Las personas", "Las amistades", "Los mensajes", "Las fotos"],
          correcta: 0,
          pista: "Las amistades son las conexiones.",
          explicacion: "Cada persona es un vértice y cada amistad (que se conozcan) es una arista."
        },
        {
          pregunta: "Si V = {a, b, c, d, e}, ¿cuántos vértices tiene el grafo?",
          opciones: ["5", "4", "10", "2"],
          correcta: 0,
          pista: "Contá los elementos del conjunto.",
          explicacion: "|V| es la cantidad de elementos de V: a, b, c, d y e son 5 vértices."
        },
        {
          pregunta: "¿Cómo se llaman dos vértices que están unidos por una arista?",
          opciones: ["Adyacentes (vecinos)", "Aislados", "Paralelos", "Colgantes"],
          correcta: 0,
          pista: "Es como decir que son «vecinos».",
          explicacion: "Dos vértices son adyacentes o vecinos si hay una arista entre ellos."
        },
        {
          pregunta: "Un vértice que no está unido a ningún otro vértice se llama…",
          opciones: ["Aislado", "Colgante", "Adyacente", "Lazo"],
          correcta: 0,
          pista: "Está solo, sin conexiones.",
          explicacion: "Un vértice aislado no tiene aristas: su grado es 0."
        },
        {
          pregunta: "Un vértice unido a exactamente un vértice se llama…",
          opciones: ["Colgante u hoja", "Aislado", "Central", "Múltiple"],
          correcta: 0,
          pista: "Está «colgado» de un solo vecino.",
          explicacion: "Un vértice colgante (u hoja) tiene una sola arista: su grado es 1."
        }
      ]
    },
    {
      titulo: "Aristas (enlaces)",
      resumen: "Las conexiones entre puntos: el conjunto E.",
      ejemplo: "pseudo",
      modo: "general",
      contenido: `
        <p>Las <strong>aristas</strong> (también llamadas <strong>enlaces</strong>) son las <strong>conexiones entre los vértices</strong>. Cada arista une dos vértices.</p>
        <div class="def"><span class="def-tag">Notación</span>Una arista entre u y v se escribe <strong>{u, v}</strong>. Las aristas se juntan en el conjunto <strong>E</strong>, por ejemplo E = {{a, b}, {b, c}}. El orden no importa: {u, v} y {v, u} son la misma arista.</div>
        <h3>Palabras que usa el libro</h3>
        <ul>
          <li>Si e = {u, v}, la arista e es <strong>incidente</strong> con u y con v, y decimos que <strong>conecta</strong> u y v.</li>
          <li>u y v son los <strong>extremos</strong> de la arista.</li>
        </ul>
        <h3>Aristas especiales</h3>
        <ul>
          <li><strong>Aristas múltiples (o paralelas):</strong> dos o más aristas que unen el mismo par de vértices, como dos cables entre las mismas computadoras. Un grafo con aristas múltiples es un <strong>multigrafo</strong>.</li>
          <li><strong>Lazo (o bucle):</strong> una arista que une un vértice consigo mismo. Un grafo que admite lazos es un <strong>pseudografo</strong>.</li>
        </ul>
        <p>Tocá una arista del ejemplo para ver qué vértices conecta.</p>`,
      clase: [
        "Usá un ejemplo cotidiano: en una red del liceo, cada cable entre dos computadoras es una arista; si hay dos cables entre las mismas, son aristas múltiples.",
        "Mostrá el ejemplo con lazo y aristas múltiples y preguntá: «¿esto es un grafo simple?». (No, es un pseudografo.)",
        "Escribí E como conjunto de pares y hacé que la clase cuente |E|."
      ],
      preguntas: [
        {
          pregunta: "¿Qué representa una arista?",
          opciones: ["Una conexión entre dos vértices", "Un punto de la red", "La cantidad de vértices", "Un grafo vacío"],
          correcta: 0,
          pista: "También se le dice «enlace».",
          explicacion: "Una arista es una conexión entre dos vértices; se escribe {u, v}."
        },
        {
          pregunta: "¿Qué relación hay entre las aristas {a, b} y {b, a}?",
          opciones: ["Son la misma arista", "Son dos aristas distintas", "Una es un lazo", "Son aristas múltiples"],
          correcta: 0,
          pista: "En un conjunto, ¿importa el orden de los elementos?",
          explicacion: "Una arista es un par no ordenado, como un conjunto: {a, b} = {b, a}."
        },
        {
          pregunta: "¿Qué es un lazo (o bucle)?",
          opciones: ["Una arista que une un vértice consigo mismo", "Dos aristas entre los mismos vértices", "Un vértice sin aristas", "Una arista muy larga"],
          correcta: 0,
          pista: "Sale de un vértice y vuelve al mismo.",
          explicacion: "Un lazo conecta un vértice consigo mismo. Los grafos que los admiten se llaman pseudografos."
        },
        {
          pregunta: "Dos aristas distintas que unen el mismo par de vértices se llaman…",
          opciones: ["Aristas múltiples (paralelas)", "Lazos", "Extremos", "Vértices adyacentes"],
          correcta: 0,
          pista: "Son como dos cables entre las mismas dos computadoras.",
          explicacion: "Son aristas múltiples o paralelas; un grafo que las tiene es un multigrafo."
        },
        {
          pregunta: "Si e = {u, v}, se dice que la arista e es ______ con u y con v.",
          opciones: ["incidente", "adyacente", "aislada", "colgante"],
          correcta: 0,
          pista: "«Adyacente» se usa entre vértices; para una arista y sus vértices se usa otra palabra.",
          explicacion: "La arista es incidente con sus extremos u y v. Los vértices u y v son adyacentes entre sí."
        },
        {
          pregunta: "Si e = {u, v}, ¿cómo se llaman u y v respecto de la arista e?",
          opciones: ["Sus extremos", "Sus lazos", "Sus grados", "Sus aristas múltiples"],
          correcta: 0,
          pista: "Son los dos puntos donde empieza y termina la línea.",
          explicacion: "u y v son los extremos de la arista e; también se dice que e conecta u y v."
        }
      ]
    },
    {
      titulo: "Grado de un vértice",
      resumen: "Cuántas aristas llegan a cada vértice.",
      ejemplo: "rosen",
      modo: "grado",
      contenido: `
        <p>El <strong>grado</strong> de un vértice dice <strong>cuántas aristas llegan a él</strong> (cuántas aristas son incidentes con él).</p>
        <div class="def"><span class="def-tag">Definición</span>El grado de un vértice v se escribe <strong>δ(v)</strong> y es el número de aristas incidentes con v. <strong>Un lazo cuenta dos veces</strong>, porque sus dos extremos están en v.</div>
        <h3>Ejemplo del libro</h3>
        <p>En el grafo G de abajo (el de la Figura 1 de la sección 8.2): δ(a) = 2, δ(b) = δ(c) = δ(f) = 4, δ(d) = 1, δ(e) = 3 y δ(g) = 0. Por eso g es <strong>aislado</strong> (grado 0) y d es una <strong>hoja</strong> (grado 1).</p>
        <h3>Teorema de los apretones de manos</h3>
        <div class="def def-yellow"><span class="def-tag">Teorema</span>Si un grafo tiene e aristas, la <strong>suma de los grados de todos sus vértices es 2e</strong>.</div>
        <p>¿Por qué? Cada arista tiene dos extremos, así que suma 1 al grado de cada uno: en total aporta 2. Es como un saludo: cada apretón de manos usa dos manos.</p>
        <ul>
          <li><strong>Uso rápido:</strong> si hay 10 vértices y cada uno tiene grado 6, la suma es 60 = 2e, así que hay <strong>30 aristas</strong>.</li>
          <li><strong>Consecuencia:</strong> la suma de los grados siempre es par, por lo que todo grafo tiene una <strong>cantidad par de vértices de grado impar</strong>.</li>
        </ul>
        <p>Activá «Mostrar grados» en el ejemplo y comprobá que la suma da el doble de las aristas.</p>`,
      clase: [
        "Hacé el «apretón de manos» en vivo: que 4 compañeros se saluden entre algunos, contá cuántas manos dio cada uno (su grado) y mostrá que la suma da el doble de saludos.",
        "Dibujá un grafo, pedí que la clase calcule cada δ(v) y después verifiquen juntos que la suma es 2e.",
        "Desafío final: «¿Existe un grafo con grados 1, 2 y 2?». No, porque la suma (5) es impar."
      ],
      preguntas: [
        {
          pregunta: "¿Qué indica el grado δ(v) de un vértice?",
          opciones: ["Cuántas aristas son incidentes con v", "Cuántos vértices tiene el grafo", "El nombre del vértice", "Cuántos lazos tiene el grafo"],
          correcta: 0,
          pista: "Contá las líneas que tocan ese punto.",
          explicacion: "δ(v) es el número de aristas incidentes con v (los lazos cuentan doble)."
        },
        {
          pregunta: "Un vértice tiene 2 aristas comunes y un lazo. ¿Cuál es su grado?",
          opciones: ["4", "3", "2", "5"],
          correcta: 0,
          pista: "Un lazo aporta dos unidades al grado.",
          explicacion: "2 aristas aportan 2 y el lazo aporta 2 más: δ(v) = 4."
        },
        {
          pregunta: "Un grafo tiene vértices de grados 3, 3, 2 y 2. ¿Cuántas aristas tiene?",
          opciones: ["5", "10", "4", "6"],
          correcta: 0,
          pista: "La suma de los grados es el doble de las aristas.",
          explicacion: "3 + 3 + 2 + 2 = 10 = 2e, entonces e = 5 aristas."
        },
        {
          pregunta: "¿Cuántas aristas tiene un grafo con 10 vértices de grado 6 cada uno?",
          opciones: ["30", "60", "16", "36"],
          correcta: 0,
          pista: "Primero calculá la suma de los grados: 10 × 6.",
          explicacion: "La suma es 60 = 2e, así que e = 30. Es el Ejemplo 2 de la sección 8.2 del libro."
        },
        {
          pregunta: "¿Puede existir un grafo cuyos vértices tengan grados 1, 2 y 2?",
          opciones: ["No, porque la suma de los grados es impar", "Sí, siempre", "Sí, si se agrega un lazo", "No, porque tiene solo tres vértices"],
          correcta: 0,
          pista: "La suma de los grados siempre es 2e.",
          explicacion: "1 + 2 + 2 = 5 es impar, pero la suma de los grados siempre es par (2e). Ese grafo no existe."
        },
        {
          pregunta: "¿Qué grado tiene un vértice aislado?",
          opciones: ["0", "1", "2", "No tiene grado"],
          correcta: 0,
          pista: "No tiene ninguna arista.",
          explicacion: "Un vértice aislado no tiene aristas incidentes: su grado es 0. Una hoja tiene grado 1."
        }
      ]
    }
  ]
};

/* ---------------------------------------------------------
   3b) EXAMEN: ¿ESTOY LISTO PARA DAR LA CLASE?
   Preguntas nuevas (no se repiten con las de cada tema).
   tema → posición del tema en CLASE.temas (0 a 3), para
          mostrar el resultado separado por tema.
   --------------------------------------------------------- */
const EXAMEN = {
  aprobado: 85,   // % para «¡Estás listo!»
  casi: 60,       // % para «Casi listo»
  preguntas: [
    // Tema 0: ¿Qué es un grafo?
    {
      tema: 0,
      pregunta: "Un compañero dice: «Un grafo es lo mismo que un gráfico de barras». ¿Qué le respondés?",
      opciones: ["No: un grafo muestra conexiones entre elementos con vértices y aristas", "Sí, son sinónimos", "Sí, pero con colores", "No: un grafo es una tabla de números"],
      correcta: 0,
      pista: "Acordate de G = (V, E).",
      explicacion: "Un grafo no muestra cantidades: muestra qué elementos (vértices) están conectados (aristas)."
    },
    {
      tema: 0,
      pregunta: "¿Cuál de estas situaciones se puede representar con un grafo?",
      opciones: ["Las computadoras de un laboratorio y los cables que las unen", "La temperatura de un día", "El precio de un alfajor", "La altura de una persona"],
      correcta: 0,
      pista: "Buscá la que tenga elementos conectados entre sí.",
      explicacion: "Las computadoras son vértices y los cables son aristas. Las otras opciones son un solo dato, no conexiones."
    },
    {
      tema: 0,
      pregunta: "En el ejemplo del libro de especies que compiten por alimento en un bosque, ¿qué representa una arista?",
      opciones: ["Que dos especies compiten entre sí", "Una especie", "Un tipo de alimento", "El bosque entero"],
      correcta: 0,
      pista: "Las especies son los vértices.",
      explicacion: "Cada especie es un vértice; una arista une dos especies si compiten por el mismo alimento."
    },
    {
      tema: 0,
      pregunta: "Dos dibujos tienen los mismos vértices y las mismas conexiones, pero uno usa líneas rectas y el otro curvas. ¿Qué podés decir?",
      opciones: ["Representan el mismo grafo", "Son grafos distintos", "El de curvas tiene más aristas", "El de rectas no es un grafo"],
      correcta: 0,
      pista: "¿Qué es lo único que importa en un grafo?",
      explicacion: "La forma de las líneas no cambia nada: solo importa qué está conectado con qué."
    },
    {
      tema: 0,
      pregunta: "G = (V, E) con V = {1, 2, 3} y E = {{1, 2}, {2, 3}}. ¿Con qué vértices está conectado el 2?",
      opciones: ["Con 1 y con 3", "Solo con 1", "Con ninguno", "Solo consigo mismo"],
      correcta: 0,
      pista: "Buscá las aristas que tienen al 2.",
      explicacion: "Las aristas {1, 2} y {2, 3} unen al 2 con el 1 y con el 3."
    },

    // Tema 1: Vértices
    {
      tema: 1,
      pregunta: "En el mapa de rutas de la página, ¿cuál de estos es un vértice?",
      opciones: ["Montevideo", "La ruta entre Montevideo y Canelones", "El grado de Rocha", "La suma de los grados"],
      correcta: 0,
      pista: "Los vértices son los puntos del mapa.",
      explicacion: "Cada ciudad es un vértice; cada ruta entre dos ciudades es una arista."
    },
    {
      tema: 1,
      pregunta: "V = {Ana, Beto, Caro} y E = {{Ana, Beto}}. ¿Qué vértice es aislado?",
      opciones: ["Caro", "Ana", "Beto", "Ninguno"],
      correcta: 0,
      pista: "¿Quién no aparece en ninguna arista?",
      explicacion: "Caro no está en ninguna arista, así que no tiene vecinos: es un vértice aislado (grado 0)."
    },
    {
      tema: 1,
      pregunta: "En el grafo de conocidos, Eli solo conoce a Dani. ¿Qué tipo de vértice es Eli?",
      opciones: ["Una hoja (vértice colgante)", "Un vértice aislado", "Un lazo", "Una arista múltiple"],
      correcta: 0,
      pista: "Tiene exactamente un vecino.",
      explicacion: "Un vértice con un solo vecino tiene grado 1: es una hoja o vértice colgante."
    },
    {
      tema: 1,
      pregunta: "Si E = {{a, b}, {b, c}}, ¿son adyacentes a y c?",
      opciones: ["No, porque no hay una arista {a, c}", "Sí, porque los dos están unidos a b", "Sí, todos los vértices son adyacentes", "Solo si tienen el mismo grado"],
      correcta: 0,
      pista: "Adyacente significa unido directamente por una arista.",
      explicacion: "Para ser adyacentes tiene que existir la arista {a, c}. Compartir un vecino (b) no alcanza."
    },
    {
      tema: 1,
      pregunta: "Si un grafo cumple |V| = 6, ¿qué significa?",
      opciones: ["Que tiene 6 vértices", "Que tiene 6 aristas", "Que cada vértice tiene grado 6", "Que tiene 6 lazos"],
      correcta: 0,
      pista: "Las barras |…| cuentan elementos de un conjunto.",
      explicacion: "|V| es la cantidad de elementos del conjunto V, o sea, la cantidad de vértices."
    },

    // Tema 2: Aristas
    {
      tema: 2,
      pregunta: "Si E = {{a, b}, {b, c}, {c, a}}, ¿cuánto vale |E|?",
      opciones: ["3", "6", "2", "9"],
      correcta: 0,
      pista: "Contá los pares dentro del conjunto.",
      explicacion: "E tiene tres aristas: {a, b}, {b, c} y {c, a}, así que |E| = 3."
    },
    {
      tema: 2,
      pregunta: "Si V = {a, b, c}, ¿cuál de estas NO puede ser una arista del grafo?",
      opciones: ["{a, d}", "{a, b}", "{b, c}", "{c, a}"],
      correcta: 0,
      pista: "Una arista solo puede unir vértices que estén en V.",
      explicacion: "d no está en V, así que {a, d} no puede ser una arista de este grafo."
    },
    {
      tema: 2,
      pregunta: "Un compañero dibuja una línea que sale del vértice b y vuelve a b. ¿Cómo se llama?",
      opciones: ["Lazo (o bucle)", "Arista múltiple", "Vértice aislado", "Hoja"],
      correcta: 0,
      pista: "Une un vértice consigo mismo.",
      explicacion: "Una arista que une un vértice consigo mismo es un lazo o bucle."
    },
    {
      tema: 2,
      pregunta: "Entre dos computadoras hay dos cables. En el grafo, ¿qué son esos cables?",
      opciones: ["Dos aristas múltiples (paralelas)", "Un lazo", "Dos vértices", "Una sola arista"],
      correcta: 0,
      pista: "Son dos aristas entre el mismo par de vértices.",
      explicacion: "Dos o más aristas que unen el mismo par de vértices son aristas múltiples o paralelas."
    },
    {
      tema: 2,
      pregunta: "¿Con qué vértices es incidente la arista {u, v}?",
      opciones: ["Con u y con v", "Solo con u", "Con ningún vértice", "Con todos los vértices del grafo"],
      correcta: 0,
      pista: "Una arista es incidente con sus extremos.",
      explicacion: "La arista {u, v} es incidente con sus dos extremos: u y v."
    },

    // Tema 3: Grado de un vértice
    {
      tema: 3,
      pregunta: "Un compañero te pregunta por qué un lazo suma 2 al grado. ¿Qué le explicás?",
      opciones: ["Porque los dos extremos del lazo están en el mismo vértice", "Porque el lazo es más largo", "Porque es una regla sin motivo", "Porque un lazo son dos vértices"],
      correcta: 0,
      pista: "Pensá en cuántas puntas de línea tocan el vértice.",
      explicacion: "El grado cuenta extremos de aristas. El lazo sale y vuelve al mismo vértice: le aporta sus dos extremos."
    },
    {
      tema: 3,
      pregunta: "En el grafo G del libro, δ(e) = 3. ¿Qué significa?",
      opciones: ["Que hay 3 aristas incidentes con e", "Que e está en la posición 3", "Que e tiene 3 lazos", "Que el grafo tiene 3 vértices"],
      correcta: 0,
      pista: "δ(v) es el grado del vértice v.",
      explicacion: "δ(e) = 3 quiere decir que tres aristas llegan al vértice e."
    },
    {
      tema: 3,
      pregunta: "Un grafo tiene 4 vértices y cada uno tiene grado 3. ¿Cuántas aristas tiene?",
      opciones: ["6", "12", "4", "7"],
      correcta: 0,
      pista: "Sumá los grados y dividí entre 2.",
      explicacion: "La suma de los grados es 4 · 3 = 12 = 2e, entonces e = 6."
    },
    {
      tema: 3,
      pregunta: "Un grafo tiene 7 aristas. ¿Cuánto da la suma de los grados de sus vértices?",
      opciones: ["14", "7", "21", "No se puede saber"],
      correcta: 0,
      pista: "Teorema de los apretones de manos.",
      explicacion: "La suma de los grados siempre es 2e = 2 · 7 = 14."
    },
    {
      tema: 3,
      pregunta: "¿Puede existir un grafo con tres vértices de grados 3, 3 y 3?",
      opciones: ["No, porque la suma (9) es impar", "Sí, sin problema", "Sí, si los tres son adyacentes", "No, porque tiene pocos vértices"],
      correcta: 0,
      pista: "La suma de los grados tiene que ser 2e.",
      explicacion: "3 + 3 + 3 = 9 es impar, pero la suma de los grados siempre es par. Ese grafo no existe."
    },
    {
      tema: 3,
      pregunta: "¿Puede un grafo tener exactamente un vértice de grado impar?",
      opciones: ["No, siempre hay una cantidad par de vértices de grado impar", "Sí, es lo más común", "Sí, si tiene un lazo", "Solo si tiene un vértice aislado"],
      correcta: 0,
      pista: "Es una consecuencia del teorema de los apretones de manos.",
      explicacion: "Como la suma de los grados es par, los vértices de grado impar tienen que venir de a pares."
    }
  ]
};

/* ---------------------------------------------------------
   3c) EVALUACIÓN PARA LOS ALUMNOS
   Se toman «cantidad» preguntas al azar; las que sobran se usan
   para el comodín «Cambiar pregunta».
   tema → posición del tema en CLASE.temas (0 a 3).
   --------------------------------------------------------- */
const EVALUACION = {
  cantidad: 12,
  preguntas: [
    // Tema 0: ¿Qué es un grafo?
    {
      tema: 0,
      pregunta: "¿Cuál es la idea principal de un grafo?",
      opciones: ["Representar elementos y las conexiones entre ellos", "Mostrar porcentajes en una torta", "Ordenar números de menor a mayor", "Calcular el área de una figura"],
      correcta: 0,
      pista: "Pensá en puntos unidos por líneas.",
      explicacion: "Un grafo representa elementos (vértices) y cómo están conectados (aristas)."
    },
    {
      tema: 0,
      pregunta: "En la notación G = (V, E), ¿qué letra representa a los puntos del grafo?",
      opciones: ["V", "E", "G", "δ"],
      correcta: 0,
      pista: "Es la inicial de «vértices».",
      explicacion: "V es el conjunto de vértices (los puntos) y E el de aristas (las conexiones)."
    },
    {
      tema: 0,
      pregunta: "¿Qué problema famoso resolvió Euler usando grafos?",
      opciones: ["Los puentes de Königsberg", "El teorema de Pitágoras", "La ley de gravedad", "El valor de pi"],
      correcta: 0,
      pista: "Tiene que ver con cruzar puentes de una ciudad.",
      explicacion: "Euler usó grafos en el siglo XVIII para estudiar si se podían cruzar los puentes de Königsberg una sola vez cada uno."
    },
    {
      tema: 0,
      pregunta: "Se modela la red de ómnibus de una ciudad con un grafo. ¿Qué serían las paradas?",
      opciones: ["Los vértices", "Las aristas", "Los grados", "Los lazos"],
      correcta: 0,
      pista: "Los tramos entre paradas son las conexiones.",
      explicacion: "Cada parada es un vértice y cada tramo que une dos paradas es una arista."
    },

    // Tema 1: Vértices
    {
      tema: 1,
      pregunta: "¿Qué otro nombre reciben los vértices?",
      opciones: ["Nodos", "Enlaces", "Lazos", "Grados"],
      correcta: 0,
      pista: "Se usa mucho en redes de computadoras.",
      explicacion: "Vértices y nodos son lo mismo: los puntos de la red."
    },
    {
      tema: 1,
      pregunta: "Si V = {p, q, r, s}, ¿cuánto vale |V|?",
      opciones: ["4", "3", "8", "1"],
      correcta: 0,
      pista: "Contá los elementos del conjunto.",
      explicacion: "V tiene 4 elementos (p, q, r y s), así que |V| = 4."
    },
    {
      tema: 1,
      pregunta: "Si E = {{p, q}, {q, r}}, ¿cuáles son los vecinos de q?",
      opciones: ["p y r", "Solo p", "Solo r", "No tiene vecinos"],
      correcta: 0,
      pista: "Buscá las aristas donde aparece q.",
      explicacion: "Las aristas {p, q} y {q, r} hacen que p y r sean adyacentes a q."
    },
    {
      tema: 1,
      pregunta: "¿Cómo se llama un vértice que no tiene ninguna arista?",
      opciones: ["Aislado", "Hoja", "Adyacente", "Extremo"],
      correcta: 0,
      pista: "Está solo, sin vecinos.",
      explicacion: "Un vértice sin aristas es aislado y su grado es 0."
    },

    // Tema 2: Aristas
    {
      tema: 2,
      pregunta: "¿Qué otro nombre reciben las aristas?",
      opciones: ["Enlaces", "Nodos", "Vértices", "Hojas"],
      correcta: 0,
      pista: "Son las conexiones entre los puntos.",
      explicacion: "Aristas y enlaces son lo mismo: las conexiones entre vértices."
    },
    {
      tema: 2,
      pregunta: "¿Cuántos extremos tiene una arista?",
      opciones: ["2", "1", "3", "Depende del grafo"],
      correcta: 0,
      pista: "Una arista se escribe {u, v}.",
      explicacion: "Toda arista tiene dos extremos. En un lazo los dos extremos son el mismo vértice."
    },
    {
      tema: 2,
      pregunta: "Si V = {1, 2, 3, 4} y E = {{1, 2}, {3, 4}}, ¿cuántas aristas tiene el grafo?",
      opciones: ["2", "4", "6", "8"],
      correcta: 0,
      pista: "Contá los pares dentro de E, no los números.",
      explicacion: "E tiene dos pares, {1, 2} y {3, 4}, así que hay 2 aristas."
    },
    {
      tema: 2,
      pregunta: "Según el libro, ¿cómo se llama un grafo que admite lazos?",
      opciones: ["Pseudografo", "Grafo vacío", "Vértice aislado", "Hoja"],
      correcta: 0,
      pista: "Empieza con «pseudo».",
      explicacion: "Un grafo con lazos (aristas de un vértice a sí mismo) es un pseudografo."
    },

    // Tema 3: Grado de un vértice
    {
      tema: 3,
      pregunta: "Si V = {a, b, c} y E = {{a, b}, {a, c}}, ¿cuánto vale δ(a)?",
      opciones: ["2", "1", "3", "0"],
      correcta: 0,
      pista: "Contá las aristas donde aparece a.",
      explicacion: "a aparece en {a, b} y en {a, c}: δ(a) = 2."
    },
    {
      tema: 3,
      pregunta: "Un vértice tiene un lazo y ninguna otra arista. ¿Cuál es su grado?",
      opciones: ["2", "1", "0", "3"],
      correcta: 0,
      pista: "Un lazo cuenta doble.",
      explicacion: "Los dos extremos del lazo están en el mismo vértice, así que suma 2 al grado."
    },
    {
      tema: 3,
      pregunta: "Un grafo tiene 5 aristas. ¿Cuánto da la suma de los grados de todos sus vértices?",
      opciones: ["10", "5", "25", "No se puede saber"],
      correcta: 0,
      pista: "Teorema de los apretones de manos.",
      explicacion: "La suma de los grados es 2e = 2 · 5 = 10."
    },
    {
      tema: 3,
      pregunta: "Un grafo tiene 4 vértices y todos tienen grado 2. ¿Cuántas aristas tiene?",
      opciones: ["4", "8", "2", "6"],
      correcta: 0,
      pista: "Sumá los grados y dividí entre 2.",
      explicacion: "2 + 2 + 2 + 2 = 8 = 2e, entonces e = 4."
    }
  ]
};

/* Grafos de ejemplo para la clase. Las posiciones van de 0 a 100 (x) y de 0 a 60 (y).
   Una arista repetida es una arista múltiple; una arista [v, v] es un lazo. */
const GRAFOS_EJEMPLO = {
  rutas: {
    nombre: "Mapa: rutas entre ciudades (simplificado)",
    vertices: { Colonia: [9, 30], "San José": [29, 20], Montevideo: [40, 50], Florida: [52, 8], Canelones: [57, 34], Maldonado: [76, 50], Rocha: [92, 30] },
    aristas: [["Colonia", "San José"], ["San José", "Montevideo"], ["San José", "Florida"], ["Montevideo", "Canelones"], ["Canelones", "Florida"], ["Canelones", "Maldonado"], ["Maldonado", "Rocha"]]
  },
  amigos: {
    nombre: "Red social: grafo de conocidos",
    vertices: { Ana: [12, 14], Beto: [12, 48], Caro: [40, 30], Dani: [66, 14], Eli: [90, 30], Fede: [76, 50] },
    aristas: [["Ana", "Beto"], ["Ana", "Caro"], ["Beto", "Caro"], ["Caro", "Dani"], ["Dani", "Eli"]]
  },
  pseudo: {
    nombre: "Red con lazo y aristas múltiples (pseudografo)",
    vertices: { x: [14, 38], y: [52, 38], z: [88, 38] },
    aristas: [["x", "y"], ["x", "y"], ["y", "y"], ["y", "z"]]
  },
  rosen: {
    nombre: "Grafo G del libro (sección 8.2, Figura 1)",
    vertices: { a: [8, 50], b: [30, 12], c: [56, 12], d: [82, 12], e: [56, 50], f: [30, 50], g: [82, 50] },
    aristas: [["a", "b"], ["a", "f"], ["b", "c"], ["b", "f"], ["b", "e"], ["c", "f"], ["c", "e"], ["c", "d"], ["f", "e"]]
  }
};

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
  bonusDesafioMax: 25,
  retosPorEvaluacion: 2   // mini retos de grafos que reemplazan preguntas en la evaluación
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
  // el enojo va de 1 (molesto) a 3 (perdió la paciencia)
  enojo: {
    // antes de morder: cortitas, para leer mientras se prepara
    intencion: {
      1: ["Mmm… ese borde se ve crocante.", "Perdoname, pero tengo que hacerlo.", "Un mordisquito nomás…", "Ese rincón me está llamando."],
      2: ["¡Ahí voy, eh!", "Esa esquina es mía.", "No me mires así: vos empezaste.", "¡Agarrá fuerte el panel!"],
      3: ["¡GRRR! ¡Ya fue!", "¡Se me saltó la térmica!", "¡Sostené el monitor!", "¡Ahí voy con todo!"]
    },
    intencionFinal: ["¡SE ME ACABÓ LA PACIENCIA!", "¡AHORA ME LO COMO ENTERO!", "¡NO VA A QUEDAR NI EL MARCO!"],
    // después del mordisco, según cuánto se enojó
    reaccion: {
      1: ["Ñam. Esa no era, eh. Me estoy poniendo de mal humor.", "Mmm… gusto a respuesta equivocada. Ojo con la próxima.", "Uh, esa no. Y el borde estaba rico, no te voy a mentir."],
      2: ["¡Otra mal! Ya me estoy calentando…", "¡Grrr! Este panel está quedando como galletita de recreo.", "Che, concentrate, que el panel se me termina."],
      3: ["¡ESTOY QUE MUERDO! …literalmente.", "¡Me sale humo de las orejas! Pensá bien la que viene.", "¡GRRR! Este panel ya parece un queso gruyere."]
    },
    ultimo: ["¡Un error más y me lo como entero! Avisado estás.", "Me queda un solo diente de paciencia… cuidámelo.", "La próxima mal y no queda ni la pregunta, ¿eh?"],
    grito: { 1: ["¡Ñam!", "¡Crunch!"], 2: ["¡ÑAM!", "¡CRUNCH!"], 3: ["¡ÑAAAM!", "¡GRRR!"] },
    // una correcta lo calma un rato (lo mordido no vuelve)
    alivio: ["Fiuu… bueno, esa sí. Se me pasa un poquito.", "Ah, mirá vos. Así me gusta… respiro hondo.", "Bien ahí. Uno, dos, tres… me calmo un cachito.", "¡Eso! Se me baja la presión. Un poco."],
    comido: "¡ÑAAAM! Me comí todo el panel. …Estaba rico, eh."
  },
  amenaza: ["A ver esta… que tengo hambre.", "Pensala bien, que todavía me queda lugar para otro mordisco.", "Esta sacala bien, ¿eh? Te estoy mirando."],
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
      end: [[784, 0, 0.12], [659, 0.12, 0.12], [523, 0.24, 0.12], [1047, 0.4, 0.3]],
      moto: [[90, 0, 0.35, "sawtooth", 0.07], [110, 0.3, 0.35, "sawtooth", 0.07], [130, 0.6, 0.4, "sawtooth", 0.07], [120, 1.0, 0.6, "sawtooth", 0.05]],
      crash: [[180, 0, 0.08, "square", 0.09], [70, 0.06, 0.18, "triangle", 0.12]],
      chomp: [[150, 0.12, 0.06, "square", 0.12], [90, 0.19, 0.08, "square", 0.12], [160, 0.32, 0.06, "square", 0.1], [80, 0.39, 0.12, "square", 0.1]],
      // enojo: se prepara (gruñido que sube), muerde (ñam crocante), alivio (suspiro)
      windup: [[110, 0, 0.12, "sawtooth", 0.05], [140, 0.12, 0.12, "sawtooth", 0.05], [180, 0.24, 0.14, "sawtooth", 0.06]],
      growl: [[70, 0, 0.3, "sawtooth", 0.07], [90, 0.3, 0.3, "sawtooth", 0.08], [120, 0.6, 0.3, "sawtooth", 0.09], [160, 0.9, 0.35, "sawtooth", 0.1]],
      nam: [[210, 0, 0.03, "square", 0.11], [120, 0.03, 0.07, "square", 0.12], [260, 0.1, 0.03, "square", 0.08], [90, 0.13, 0.08, "triangle", 0.1]],
      namBig: [[120, 0, 0.1, "square", 0.14], [60, 0.08, 0.28, "triangle", 0.16], [200, 0.12, 0.04, "square", 0.1]],
      relief: [[660, 0, 0.12, "triangle", 0.05], [520, 0.12, 0.22, "triangle", 0.05]]
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
  Z: "#6b7a88", // cierre
  R: "#ff3b4e", // vena de enojo
  D: "#8fe3ff"  // gota de sudor
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
  },
  // caras de enojo (se arman con las partes de CARA, más abajo): cada una es una actuación distinta
  molesto: {
    label: "Guillermo, molesto: cejas bajas, ojos entrecerrados y la boca apretada",
    partes: { cejas: "molesta", ojos: "entrecerrados", boca: "plana" }
  },
  enojado: {
    label: "Guillermo, enojado con el ceño fruncido y la boca para abajo",
    partes: { cejas: "enojada", ojos: "rendija", boca: "triste", cachetes: true }
  },
  furioso: {
    label: "Guillermo, furioso y colorado, con una vena en la frente, apretando los dientes",
    partes: { cejas: "furiosa", ojos: "rendija", boca: "dientes", cachetes: true, vena: true }
  },
  mordida: {
    label: "Guillermo con la boca bien abierta, listo para morder",
    partes: { cejas: "enojada", ojos: "rendija", boca: "abierta", cachetes: true }
  },
  alivio: {
    label: "Guillermo, aliviado: cierra los ojos y suelta el aire",
    partes: { cejas: "alta", ojos: "cerrados", boca: "fiu", sudor: true }
  },
  lleno: {
    label: "Guillermo masticando, lleno y contento",
    partes: { ojos: "felices", boca: "mastica", cachetes: true }
  }
};

/* Partes para armar caras. Cada fila reemplaza las columnas 2 a 21;
   «_» deja el píxel que había. */
const CARA = {
  cejas: {
    alta: { 8: "HSSBBBBBSSSSBBBBBHHH", 9: "HSSSSSSSSSSSSSSSSSSH", 10: "SSSSSSSSSSSSSSSSSSSS" },
    molesta: { 9: "HSSSSSSSSSSSSSSSSSSH", 10: "SSSBBBBBBSSBBBBBBSSS", 11: "SSSSSSSBBSSBBSSSSSSS" },
    enojada: { 9: "HSBBSSSSSSSSSSSSBBSH", 10: "SSSSBBBBSSSSBBBBSSSS", 11: "SSSSSSBBBSSBBBSSSSSS" },
    furiosa: { 9: "HBBSSSSSSSSSSSSSSBBH", 10: "SSSBBBSSSSSSSSBBBSSS", 11: "SSSSSBBBBSSBBBBSSSSS" }
  },
  ojos: {
    normal: { 12: "SSSSWEESSSSSSWEESSSS", 13: "SSSSEEESSSSSSEEESSSS" },
    entrecerrados: { 12: "SSSSsssSSSSSSsssSSSS", 13: "SSSSEEESSSSSSEEESSSS" },
    rendija: { 12: "SSSSSSSSSSSSSSSSSSSS", 13: "SSSSEEWSSSSSSWEESSSS" },
    abiertos: { 12: "SSSWEEWSSSSSSWEEWSSS", 13: "SSSWEEWSSSSSSWEEWSSS" },
    felices: { 12: "SSSSSESSSSSSSSESSSSS", 13: "SSSSESESSSSSSESESSSS" },
    cerrados: { 12: "SSSSSSSSSSSSSSSSSSSS", 13: "SSSSEEESSSSSSEEESSSS" }
  },
  cachetes: { 15: "_PP______________PP_" },
  bocas: {
    plana: { 17: "SSSSSSSSSSSSSSSSSSSS", 18: "SSSSSSSMMMMMMSSSSSSS" },
    triste: { 17: "SSSSSSSMMMMMMSSSSSSS", 18: "SSSSSSMSSSSSSMSSSSSS" },
    dientes: { 16: "SSSSSmmmmmmmmmmSSSSS", 17: "SSSSSmWWWWWWWWmSSSSS", 18: "SSSSSmmmmmmmmmmSSSSS" },
    abierta: { 15: "_____mmmmmmmmmm_____", 16: "SSSSSmWWWWWWWWmSSSSS", 17: "SSSSSmmmmmmmmmmSSSSS", 18: "SSSSSmWWWWWWWWmSSSSS" },
    gigante: { 15: "___mmmmmmmmmmmmmm___", 16: "SSSmWWWWWWWWWWWWmSSS", 17: "SSSmmmmmmmmmmmmmmSSS", 18: "SSSmWWWWWWWWWWWWmSSS", 19: "_SSmmmmmmmmmmmmmmSS_" },
    mastica: { 17: "SSSSSSMSSMSSMSSSSSSS", 18: "SSSSSSSMMSMMSMSSSSSS" },
    fiu: { 17: "SSSSSSSSSSmmSSSSSSSS", 18: "SSSSSSSSSSmmSSSSSSSS" }
  },
  // píxeles sueltos [columna, fila, color]
  vena: [[16, 2], [18, 2], [15, 3], [16, 3], [18, 3], [19, 3], [15, 5], [16, 5], [18, 5], [19, 5], [16, 6], [18, 6]].map(([x, y]) => [x, y, "R"]),
  sudor: [[21, 9, "D"], [20, 10, "D"], [21, 10, "D"], [20, 11, "D"], [21, 11, "D"]]
};

// mueve los ojos hacia donde mira (dx: −1 izquierda, 1 derecha; dy: 1 abajo)
function mirarOjos(ojos, { dx = 0, dy = 0 }) {
  const out = {};
  Object.keys(ojos).forEach((r) => {
    let row = ojos[r];
    if (dx > 0) row = "S" + row.slice(0, 19);
    if (dx < 0) row = row.slice(1) + "S";
    out[Number(r) + (dy > 0 ? 1 : 0)] = row;
  });
  if (dy > 0 && !out[12]) out[12] = "SSSSSSSSSSSSSSSSSSSS";
  return out;
}

// una cara armada en el momento (para la actuación del mordisco)
const cara = (partes, label) => ({ partes, label: label || "Guillermo, enojado" });

// con mucha rabia se pone colorado
const PALETA_ROJA = { ...PALETA, S: "#f4a08a", s: "#de7765", P: "#e8505a" };

function filasCara(exp) {
  const rows = SPRITE_BASE.slice();
  const pegar = (over) => Object.keys(over).forEach((r) => {
    const base = rows[r];
    const inner = [...over[r]].map((ch, k) => (ch === "_" ? base[k + 2] : ch)).join("");
    rows[r] = base.slice(0, 2) + inner + base.slice(22);
  });
  const p = exp.partes;
  if (p) {
    if (p.cejas) pegar(CARA.cejas[p.cejas]);
    if (p.ojos || p.mirar) pegar(p.mirar ? mirarOjos(CARA.ojos[p.ojos || "normal"], p.mirar) : CARA.ojos[p.ojos]);
    if (p.cachetes) pegar(CARA.cachetes);
    if (p.boca) pegar(CARA.bocas[p.boca]);
    [...(p.vena ? CARA.vena : []), ...(p.sudor ? CARA.sudor : [])].forEach(([x, y, c]) => {
      rows[y] = rows[y].slice(0, x) + c + rows[y].slice(x + 1);
    });
  }
  if (exp.rows) pegar(exp.rows);
  return rows;
}

// mood: nombre de EXPRESIONES o una cara armada; cabeza: solo la cabeza (para cuando sale volando)
function spriteSVG(mood, rojo, cabeza) {
  const pal = rojo ? PALETA_ROJA : PALETA;
  let rows = filasCara(typeof mood === "string" ? EXPRESIONES[mood] : mood);
  if (cabeza) rows = rows.slice(0, 21);
  let rects = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (row[x + run] === ch) run++;
      if (ch !== ".") rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${pal[ch]}"/>`;
      x += run;
    }
  });
  return `<svg viewBox="0 0 24 ${rows.length}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${rects}</svg>`;
}

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
  rojo: false,
  cache: {},
  draw(mood) {
    const key = (typeof mood === "string" ? mood : JSON.stringify(mood.partes)) + (this.rojo ? "-rojo" : "");
    if (!this.cache[key]) this.cache[key] = spriteSVG(mood, this.rojo);
    this.el.innerHTML = this.cache[key];
  },
  // mood: nombre de EXPRESIONES o una cara armada con cara()
  set(mood, animate) {
    this.mood = typeof mood === "string" ? mood : "actuando";
    this.draw(mood);
    this.el.setAttribute("aria-label", (typeof mood === "string" ? EXPRESIONES[mood] : mood).label);
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

/* =========================================================
   PANTALLAS
   ========================================================= */
let current = "start";

/* =========================================================
   ENOJO DE GUILLERMO Y MORDISCOS AL PANEL
   ---------------------------------------------------------
   Cada error (también en los mini retos de grafos) enoja a Guillermo
   y le arranca un pedazo al panel principal (#panel).
   · El panel se dibuja en un canvas aparte (#panel-skin) que va
     DEBAJO del contenido: los mordiscos le sacan pedazos de verdad
     a la silueta, pero nunca recortan textos ni botones.
   · Los mordiscos comunes solo comen el margen libre (--bite-room):
     bordes y esquinas. Se puede seguir respondiendo mientras muerde.
   · El mordisco final es el único que se come el panel entero.
   · Todas las capas de efectos tienen pointer-events: none.
   ========================================================= */
const ENOJO = {
  caras: ["espera", "molesto", "enojado", "furioso"],
  // dónde muerde, en orden: esquinas y bordes, alternando lados
  lugares: [["esq", "tr"], ["lado", "left", 0.58], ["esq", "bl"], ["lado", "top", 0.62], ["lado", "right", 0.68],
    ["esq", "tl"], ["lado", "bottom", 0.4], ["esq", "br"], ["lado", "right", 0.3], ["lado", "left", 0.24],
    ["lado", "top", 0.3], ["lado", "bottom", 0.76]],
  celda: 4,    // tamaño del «píxel» del daño (igual que --px)
  holgura: 6   // distancia mínima entre un mordisco común y el contenido
};

const enojo = { errores: 0, limite: 0, nivel: 0, final: false };
// con este error ya no se puede aprobar (menos de la mitad bien): ahí viene el mordisco final
const limitePara = (total) => total - Math.ceil(total / 2) + 1;
const nivelPorProgreso = (p) => (p <= 0 ? 0 : p >= 0.55 ? 3 : p >= 0.28 ? 2 : 1);
const caraBase = () => ENOJO.caras[enojo.nivel];

// la postura (inclinarse hacia el panel) y el color van con el nivel de enojo
function fijarPostura(n) {
  $(".host").dataset.enojo = n;
  guillermo.rojo = n >= 3;
  if (n) document.body.dataset.rabia = n;
  else delete document.body.dataset.rabia;
}

function enojoIniciar(limite, unidad = "error") {
  Object.assign(enojo, { errores: 0, limite, nivel: 0, final: false });
  fijarPostura(0);
  paciencia.mostrar(limite, unidad);
}

function enojoApagar() {
  Object.assign(enojo, { errores: 0, limite: 0, nivel: 0, final: false });
  fijarPostura(0);
  paciencia.ocultar();
}

// suma un error y arma el mordisco que le toca (el que llega al límite es el final)
function nuevoError(reaccion) {
  enojo.errores++;
  enojo.final = enojo.errores >= enojo.limite;
  enojo.nivel = enojo.final ? 3 : nivelPorProgreso(enojo.errores / enojo.limite);
  const quedan = enojo.limite - enojo.errores;
  return {
    final: enojo.final,
    nivel: enojo.nivel,
    escala: Math.min(1, (enojo.errores - 1) / Math.max(1, enojo.limite - 2)),
    perdidos: enojo.errores,
    reaccion: reaccion || pickSin(quedan === 1 ? FRASES.enojo.ultimo : FRASES.enojo.reaccion[enojo.nivel])
  };
}

/* ---------- dientes de paciencia (al lado de Guillermo) ---------- */
const paciencia = {
  el: $("#paciencia"),
  box: $("#paciencia-dientes"),
  unidad: "error",
  mostrar(total, unidad) {
    this.unidad = unidad;
    this.box.innerHTML = "";
    for (let k = 0; k < total; k++) {
      const d = document.createElement("span");
      d.className = "diente" + (k === total - 1 ? " ultimo" : "");
      this.box.appendChild(d);
    }
    this.el.hidden = !total;
    this.marcar(0);
  },
  ocultar() {
    this.el.hidden = true;
    this.box.innerHTML = "";
  },
  marcar(perdidos, animar) {
    const ds = [...this.box.children];
    ds.forEach((d, k) => {
      const roto = k < perdidos;
      if (roto && !d.classList.contains("roto") && animar && !reduceMotion.matches) {
        d.classList.remove("rompe");
        void d.offsetWidth;
        d.classList.add("rompe");
      }
      d.classList.toggle("roto", roto);
    });
    const quedan = Math.max(0, ds.length - perdidos);
    const que = this.unidad === "error" ? (quedan === 1 ? "error" : "errores") : quedan === 1 ? "mordisco" : "mordiscos";
    this.el.setAttribute("aria-label", `Paciencia de Guillermo: ${quedan === 1 ? "le queda" : "le quedan"} ${quedan} ${que} antes de comerse el panel`);
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

// deja todo como nuevo: corta temporizadores y animaciones, borra migas y daño, el panel vuelve a crecer
function limpiarMordidas() {
  mordida.gen++;
  mordida.timers.forEach(clearTimeout);
  mordida.timers.clear();
  mordida.anims.forEach((a) => a.cancel());
  mordida.anims.clear();
  mordida.nodos.forEach((n) => n.remove());
  mordida.nodos.clear();
  Object.assign(mordida, { cola: [], corriendo: false, actuando: false, diferido: null, marcas: [], bocados: [], siguiente: 0, alComido: null });
  guillermo.el.style.visibility = "";
  document.body.classList.remove("estallido");
  document.querySelectorAll("[data-screen]").forEach((s) => { s.inert = false; });
  $("#eaten").hidden = true;
  piel.dibujar();
}

function morderPanel(b) {
  mordida.cola.push(b);
  if (!mordida.corriendo) procesarCola();
}

async function procesarCola() {
  mordida.corriendo = true;
  const gen = mordida.gen;
  while (mordida.cola.length && gen === mordida.gen) {
    const b = mordida.cola.shift();
    b.rapido = mordida.cola.length > 0; // si se juntaron varios, los hace más cortitos
    await (b.final ? actuacionFinal(b) : actuacionMordida(b));
  }
  if (gen === mordida.gen) mordida.corriendo = false;
}

/* =========================================================
   LA PIEL DEL PANEL
   Un canvas dibuja el fondo, el borde y la sombra del panel
   (igual que el CSS) y le saca los pedazos mordidos en una
   cuadrícula de 4 px, con contorno oscuro y borde claro alrededor
   de cada mordida, como el borde del propio panel.
   Coordenadas: (0, 0) es la esquina de afuera del contorno negro.
   ========================================================= */
const piel = {
  panel: $("#panel"),
  canvas: $("#panel-skin"),
  ctx: null,
  capa: null,
  pedido: false,
  init() {
    const ctx = this.canvas.getContext && this.canvas.getContext("2d");
    if (!ctx) return; // sin canvas queda el panel del CSS (sin mordiscos visibles)
    this.ctx = ctx;
    this.capa = document.createElement("canvas");
    this.panel.classList.add("con-piel");
    if (window.ResizeObserver) new ResizeObserver(() => this.pedir()).observe(this.panel);
    window.addEventListener("resize", () => this.pedir());
    this.dibujar();
  },
  pedir() {
    if (this.pedido) return;
    this.pedido = true;
    requestAnimationFrame(() => { this.pedido = false; this.dibujar(); });
  },
  // margen libre para morder (desde el borde de afuera) sin tocar el contenido
  margen() {
    const cs = getComputedStyle(this.panel);
    return Math.min(parseFloat(cs.paddingTop), parseFloat(cs.paddingRight), parseFloat(cs.paddingBottom), parseFloat(cs.paddingLeft)) + 4;
  },
  dibujar(destello) {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.panel.offsetWidth;
    const h = this.panel.offsetHeight;
    if (!w || !h) return;
    const W = w + 8, H = h + 8;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const pw = Math.round(W * dpr), ph = Math.round((H + 10) * dpr);
    [this.canvas, this.capa].forEach((c) => {
      if (c.width !== pw || c.height !== ph) { c.width = pw; c.height = ph; }
    });
    this.canvas.style.width = `${W}px`;
    this.canvas.style.height = `${H + 10}px`;
    const L = this.capa.getContext("2d");
    [ctx, L].forEach((c) => { c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H + 10); });

    // panel sano: contorno, fondo con degradé y borde interno (como el box-shadow del CSS)
    L.fillStyle = "#0a0d22";
    L.fillRect(0, 0, W, H);
    const grad = L.createLinearGradient(0, 4, 0, h + 4);
    grad.addColorStop(0, "#18225a");
    grad.addColorStop(1, "#121b45");
    L.fillStyle = "#2f3d8f";
    L.fillRect(4, 4, w, h);
    L.fillStyle = grad;
    L.fillRect(8, 8, w - 8, h - 8);

    const C = ENOJO.celda, cols = Math.ceil(W / C), rows = Math.ceil(H / C);
    const formas = mordida.marcas.concat(mordida.bocados).map((m) => formaMordida(m, W, H, this.margen()));
    let gone = null;
    if (formas.length) {
      // 1 = mordido; 2 = mordido recién (para el destello del impacto)
      gone = new Uint8Array(cols * rows);
      formas.forEach((f) => {
        const marca = f.m === destello ? 2 : 1;
        const c0 = Math.max(0, Math.floor(f.x0 / C)), c1 = Math.min(cols - 1, Math.floor(f.x1 / C));
        const r0 = Math.max(0, Math.floor(f.y0 / C)), r1 = Math.min(rows - 1, Math.floor(f.y1 / C));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const i = r * cols + c;
            if (!gone[i] && f.dentro(c * C + C / 2, r * C + C / 2)) gone[i] = marca;
          }
        }
      });
      // anillos alrededor de lo mordido: 1 = contorno oscuro, 3 = contorno recién mordido, 2 = borde claro
      const ring = new Uint8Array(cols * rows);
      const vecino = (r, c, test) => {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr, cc = c + dc;
            if ((dr || dc) && rr >= 0 && cc >= 0 && rr < rows && cc < cols && test(rr * cols + cc)) return true;
          }
        }
        return false;
      };
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (gone[i]) continue;
          if (vecino(r, c, (j) => gone[j] === 2)) ring[i] = 3;
          else if (vecino(r, c, (j) => gone[j])) ring[i] = 1;
        }
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (!gone[i] && !ring[i] && vecino(r, c, (j) => ring[j] === 1 || ring[j] === 3)) ring[i] = 2;
        }
      }
      L.save();
      L.beginPath();
      L.rect(4, 4, w, h);
      L.clip(); // el borde claro va solo adentro del panel
      for (let i = 0; i < ring.length; i++) {
        if (ring[i] !== 2) continue;
        const r = Math.floor(i / cols), c = i % cols;
        // algunas migas más oscuras en el borde para que se vea mordido, no cortado
        L.fillStyle = ((c * 7 + r * 13) % 5 === 0) ? "#202c6e" : "#2f3d8f";
        L.fillRect(c * C, r * C, C, C);
      }
      L.restore();
      for (let i = 0; i < ring.length; i++) {
        if (ring[i] !== 1 && ring[i] !== 3) continue;
        L.fillStyle = ring[i] === 3 ? "#ffd23f" : "#0a0d22";
        L.fillRect((i % cols) * C, Math.floor(i / cols) * C, C, C);
      }
    }

    // sombra de abajo (con los mismos agujeros, corrida 10 px)
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 10, W, H);
    if (gone) {
      const vaciar = (c2d, dy) => {
        for (let r = 0; r < rows; r++) {
          let c = 0;
          while (c < cols) {
            if (!gone[r * cols + c]) { c++; continue; }
            let run = 1;
            while (c + run < cols && gone[r * cols + c + run]) run++;
            c2d.clearRect(c * C, r * C + dy, run * C, C);
            c += run;
          }
        }
      };
      vaciar(ctx, 10);
      vaciar(L, 0);
    }
    ctx.drawImage(this.capa, 0, 0, W, H + 10);
  }
};

// geometría de una mordida: un círculo con el borde festoneado por los dientes
function formaMordida(m, W, H, R0) {
  const D = R0 - ENOJO.holgura; // profundidad máxima de un mordisco común
  let cx, cy, Rt, r;
  let nx = 0, ny = 0; // hacia adentro del panel
  if (m.tipo === "lado") {
    const d = D * (0.78 + 0.22 * m.escala);
    const hw = d * (1.6 + 2 * m.escala); // medio ancho sobre el borde: crece con el enojo
    Rt = (d + (hw * hw) / d) / 2;
    const afuera = Rt - d;
    if (m.donde === "top") { cx = m.t * W; cy = -afuera; ny = 1; }
    else if (m.donde === "bottom") { cx = m.t * W; cy = H + afuera; ny = -1; }
    else if (m.donde === "left") { cx = -afuera; cy = m.t * H; nx = 1; }
    else { cx = W + afuera; cy = m.t * H; nx = -1; }
    r = Math.min(13, Math.max(8, d * 0.32));
  } else if (m.tipo === "esq") {
    // centrado en la esquina: no llega al contenido mientras Rt < R0·√2
    Rt = (R0 * Math.SQRT2 - ENOJO.holgura) * (0.8 + 0.2 * m.escala);
    cx = m.donde[1] === "l" ? 0 : W;
    cy = m.donde[0] === "t" ? 0 : H;
    nx = cx ? -1 : 1;
    ny = cy ? -1 : 1;
    r = Math.min(13, Math.max(8, Rt * 0.24));
  } else {
    // bocado del mordisco final: puede comerse cualquier cosa
    cx = m.fx * W;
    cy = m.fy * H;
    Rt = m.fr * Math.hypot(W, H);
    nx = W / 2 - cx;
    ny = H / 2 - cy;
    if (!nx && !ny) ny = 1;
    r = Math.min(26, Math.max(10, Rt * 0.1));
  }
  const Rc = Rt - r;
  const paso = (r * 2.05) / Rc;          // separación entre dientes (se ve cada diente)
  const base = Math.atan2(ny, nx);       // el diente del medio apunta hacia adentro
  const azar = (j) => { const s = Math.sin((j + m.semilla) * 12.9898) * 43758.5453; return s - Math.floor(s); };
  const Rmax = Rc + r * 1.15;
  return {
    m,
    x0: cx - Rmax, x1: cx + Rmax, y0: cy - Rmax, y1: cy + Rmax,
    dentro(x, y) {
      const dx = x - cx, dy = y - cy, dd = dx * dx + dy * dy;
      if (dd <= Rc * Rc) return true;
      if (dd > Rmax * Rmax) return false;
      let a = Math.atan2(dy, dx) - base;
      a = Math.atan2(Math.sin(a), Math.cos(a)); // entre −π y π: la «costura» queda del lado de afuera
      const k = Math.round(a / paso);
      for (let j = k - 1; j <= k + 1; j++) {
        const ang = base + j * paso;
        const rj = r * (0.85 + 0.3 * azar(j));
        const tx = cx + Math.cos(ang) * Rc, ty = cy + Math.sin(ang) * Rc;
        if ((x - tx) ** 2 + (y - ty) ** 2 <= rj * rj) return true;
      }
      return false;
    }
  };
}

/* ---------- dónde muerde (siempre en una parte que se vea) ---------- */
function panelCaja() {
  const r = piel.panel.getBoundingClientRect();
  return { left: r.left - 4, top: r.top - 4, W: r.width + 8, H: r.height + 8 };
}

// punto del borde donde muerde, en la pantalla; o = hacia afuera; ang = giro de la cabeza (la boca mira al panel)
function contacto(m, c) {
  if (m.tipo === "bocado") return { x: c.left + m.fx * c.W, y: c.top + m.fy * c.H, ox: m.ox, oy: m.oy, ang: m.ang };
  const L = {
    top: [m.t, 0, 0, -1, 0], bottom: [m.t, 1, 0, 1, 180], left: [0, m.t, -1, 0, -90], right: [1, m.t, 1, 0, 90],
    tl: [0, 0, -1, -1, -45], tr: [1, 0, 1, -1, 45], bl: [0, 1, -1, 1, -135], br: [1, 1, 1, 1, 135]
  }[m.donde];
  const n = Math.hypot(L[2], L[3]);
  return { x: c.left + L[0] * c.W, y: c.top + L[1] * c.H, ox: L[2] / n, oy: L[3] / n, ang: L[4] };
}

function elegirLugar(escala) {
  const c = panelCaja();
  const vw = window.innerWidth, vh = window.innerHeight, M = 28;
  const total = ENOJO.lugares.length;
  for (let k = 0; k < total; k++) {
    const idx = (mordida.siguiente + k) % total;
    const [tipo, donde, t0] = ENOJO.lugares[idx];
    const m = { tipo, donde, t: t0 || 0, escala, semilla: Math.random() * 100 };
    if (donde === "left" || donde === "right") {
      // en los costados busca una altura que esté a la vista
      const a = Math.max(0.14, (M + 40 - c.top) / c.H), b = Math.min(0.86, (vh - M - 40 - c.top) / c.H);
      if (a > b) continue;
      m.t = Math.min(b, Math.max(a, m.t));
    }
    const p = contacto(m, c);
    if (p.x < -4 || p.x > vw + 4 || p.y < M || p.y > vh - M) continue;
    mordida.siguiente = idx + 1;
    return m;
  }
  const mid = (vh / 2 - c.top) / c.H;
  return { tipo: "lado", donde: "right", t: Math.min(0.86, Math.max(0.14, mid)), escala, semilla: Math.random() * 100 };
}

function estaVisible(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 700;
  return r.width > 0 && r.bottom > r.height * 0.45 && r.top < vh - r.height * 0.45;
}

/* ---------- la cabeza que sale volando ---------- */
const anchoCabeza = () => (window.innerWidth <= 560 ? 72 : 96);
const pose = (x, y, r = 0, s = 1, sx = 1, sy = 1) => ({ x, y, r, s, sx, sy });
const poseCSS = (p) => `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${p.r}deg) scale(${p.s * p.sx}, ${p.s * p.sy})`;

function mover(el, to, ms, easing = "ease-out") {
  const from = el._pose || to;
  if (el._anim) el._anim.cancel();
  el._pose = to;
  el.style.transform = poseCSS(to);
  el._anim = ms > 0 ? animar(el, [{ transform: poseCSS(from) }, { transform: poseCSS(to) }], { duration: ms, easing }) : null;
}

function crearCabeza(c) {
  const el = nodoFx("chomper");
  el._w = anchoCabeza();
  el.style.width = `${el._w}px`;
  caraCabeza(el, c);
  return el;
}
function caraCabeza(el, c) { el.innerHTML = spriteSVG(c, guillermo.rojo, true); }

// la boca (fila 17 de 21) queda justo sobre el borde y la cabeza afuera del panel
function poseMordiendo(p, w, extra = 0, s = 1) {
  const u = (w * s) / 24;
  const lejos = 7 * u + 2 + extra;
  return pose(p.x + p.ox * lejos, p.y + p.oy * lejos, p.ang, s);
}

// de dónde sale: de su lugar si se lo ve; si no, entra por arriba de la pantalla
function poseInicio(el, p) {
  const g = guillermo.el.getBoundingClientRect();
  if (estaVisible(guillermo.el)) return { desdeHost: true, p: pose(g.left + g.width / 2, g.top + g.height * (10.5 / 29), 0, g.width / el._w) };
  return { desdeHost: false, p: pose(Math.min(window.innerWidth - 40, Math.max(40, p.x)), -el._w, 0, 1) };
}

/* ---------- efectos: migas, carteles, vapor, sacudida ---------- */
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

function vapor() {
  if (reduceMotion.matches || !estaVisible(guillermo.el)) return;
  const g = guillermo.el.getBoundingClientRect();
  [-1, 1].forEach((lado, k) => {
    const n = nodoFx("vapor");
    const x = g.left + g.width * (0.5 + lado * 0.38), y = g.top + g.height * 0.12;
    const anim = animar(n, [
      { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0.9 },
      { transform: `translate(${x + lado * 10}px, ${y - 26}px) scale(1)`, opacity: 0.8, offset: 0.5 },
      { transform: `translate(${x + lado * 18}px, ${y - 48}px) scale(1.3)`, opacity: 0 }
    ], { duration: 900, delay: k * 120, easing: "steps(6)", fill: "both" });
    efimero(n, anim, 1100);
  });
}

function aliento() {
  if (reduceMotion.matches || !estaVisible(guillermo.el)) return;
  const g = guillermo.el.getBoundingClientRect();
  const x = g.left + g.width * 0.56, y = g.top + g.height * 0.62;
  for (let k = 0; k < 3; k++) {
    const n = nodoFx("aliento");
    const anim = animar(n, [
      { transform: `translate(${x}px, ${y}px)`, opacity: 0.9 },
      { transform: `translate(${x + 30 + k * 10}px, ${y + 6 - k * 10}px)`, opacity: 0 }
    ], { duration: 700, delay: k * 110, easing: "steps(5)", fill: "both" });
    efimero(n, anim, 1000);
  }
}

function sacudir(fuerza) {
  if (reduceMotion.matches) return;
  const f = fuerza;
  animar(piel.panel, [
    { transform: "none" },
    { transform: `translate(${-f}px, ${f / 2}px)` },
    { transform: `translate(${f}px, ${-f / 2}px)` },
    { transform: `translate(${-f / 2}px, ${f / 3}px)` },
    { transform: "none" }
  ], { duration: 240, easing: "steps(4)" });
}

// cuando termina de actuar: reacciona y después dice lo que quedó pendiente
function terminarActuacion(texto, mood, animate) {
  mordida.actuando = false;
  const d = mordida.diferido;
  mordida.diferido = null;
  if (d && d.importante) { d.hacer(); return; }
  if (texto) guillermo.decir(texto, mood, animate);
  else guillermo.set(mood, animate);
  if (d) tarea(() => { if (mordida.actuando) mordida.diferido = d; else d.hacer(); }, 1400);
}

// una respuesta correcta con Guillermo enojado: suspira y se relaja un momento (lo mordido no vuelve)
function aliviar(mensaje, nivelDespues = enojo.nivel) {
  const hacer = () => {
    fijarPostura(Math.max(0, nivelDespues));
    guillermo.decir(mensaje, "alivio");
    sound.play("relief");
    aliento();
    if (!reduceMotion.matches) {
      animar($(".mascot-wrap"), [
        { transform: "translate(0, 0)" },
        { transform: "translate(-8px, 2px) rotate(-4deg) scale(1.04, 0.96)", offset: 0.4 },
        { transform: "translate(0, 0)" }
      ], { duration: 900, easing: "steps(5)", composite: "add" });
    }
    tarea(() => { if (guillermo.mood === "alivio") guillermo.set(caraBase()); }, 1500);
  };
  if (mordida.actuando) mordida.diferido = { hacer };
  else hacer();
}

/* =========================================================
   LA ACTUACIÓN DE UN MORDISCO
   intención (mira el panel, se tensa, abre la boca) → se lanza →
   impacto (pedazo, destello, migas, sacudida, ñam) → mastica →
   vuelve → reacciona. Dura ~1,6 s y nunca bloquea las respuestas.
   ========================================================= */
async function actuacionMordida(b) {
  mordida.actuando = true;
  const reduce = reduceMotion.matches;
  const n = Math.max(1, b.nivel);
  const m = elegirLugar(b.escala);
  let p = contacto(m, panelCaja());
  const g = guillermo.el.getBoundingClientRect();
  const mirar = { dx: p.x > g.right ? 1 : p.x < g.left ? -1 : 0, dy: p.y > g.bottom ? 1 : 0 };
  const cejas = ["molesta", "molesta", "enojada", "furiosa"][n];
  const tenso = cara({ cejas, ojos: "rendija", mirar, boca: n >= 2 ? "dientes" : "plana", cachetes: n >= 2, vena: n >= 3 }, "Guillermo mira el panel con hambre y se prepara");
  const abierta = cara({ cejas, ojos: "rendija", mirar, boca: "abierta", cachetes: true, vena: n >= 3 }, "Guillermo abre la boca para morder el panel");
  const muerde = cara({ cejas, ojos: "rendija", boca: "dientes", cachetes: true, vena: n >= 3 }, "Guillermo muerde el panel");
  const mastica = cara({ cejas, ojos: "felices", boca: "mastica", cachetes: true }, "Guillermo mastica un pedazo del panel");

  // 1) intención: mira el panel, se echa para atrás y gruñe
  fijarPostura(n);
  guillermo.set(tenso);
  guillermo.decir(pickSin(FRASES.enojo.intencion[n]));
  sound.play("windup");
  let cabeza = null, inicio = null;
  const tiempoAviso = b.rapido ? 160 : 420;
  if (!reduce) {
    if (estaVisible(guillermo.el)) {
      animar(guillermo.el, [{ transform: "none" }, { transform: `translate(${-6 * (mirar.dx || 1)}px, 5px) scale(1.06, 0.9)` }], { duration: tiempoAviso, easing: "steps(3)", fill: "forwards" });
    } else {
      // no se lo ve (celular con la página bajada): asoma por arriba, cerca del lugar donde va a morder
      cabeza = crearCabeza(tenso);
      inicio = poseInicio(cabeza, p);
      mover(cabeza, inicio.p, 0);
      mover(cabeza, poseMordiendo(p, cabeza._w, 46), tiempoAviso * 0.7, "ease-out");
      const t = poseMordiendo(p, cabeza._w, 46);
      tarea(() => cartel(pickSin(FRASES.enojo.grito[n]), t.x, t.y - cabeza._w * 0.7, "grito", 700), 60);
    }
  }
  if (!(await esperar(tiempoAviso))) return;
  guillermo.set(abierta);
  if (cabeza) caraCabeza(cabeza, abierta);
  if (!(await esperar(b.rapido ? 80 : 170))) return;

  // 2) se lanza (con menos movimiento se queda en su lugar)
  if (!reduce) {
    p = contacto(m, panelCaja()); // vuelve a medir: el panel pudo cambiar de alto
    if (!cabeza) {
      cabeza = crearCabeza(abierta);
      inicio = poseInicio(cabeza, p);
      mover(cabeza, inicio.p, 0);
      guillermo.el.style.visibility = "hidden";
    }
    const fin = poseMordiendo(p, cabeza._w);
    const medio = pose((cabeza._pose.x + fin.x) / 2, Math.min(cabeza._pose.y, fin.y) - 50, fin.ang / 2, (cabeza._pose.s + 1) / 2, 1.12, 0.9);
    mover(cabeza, medio, 110, "ease-in");
    if (!(await esperar(110))) return;
    mover(cabeza, pose(fin.x, fin.y, fin.r, 1, 1.1, 0.92), 110, "ease-in");
    if (!(await esperar(110))) return;
  }

  // 3) impacto: el pedazo sale de verdad del panel
  mordida.marcas.push(m);
  piel.dibujar(m);
  paciencia.marcar(b.perdidos, true);
  sound.play("nam");
  guillermo.set(muerde);
  if (cabeza) { caraCabeza(cabeza, muerde); mover(cabeza, poseMordiendo(p, cabeza._w), 0); }
  sacudir(2 + n * 1.5);
  migas(p.x, p.y, p.ox, p.oy, 8 + n * 4);
  cartel(pickSin(FRASES.enojo.grito[n]), p.x + p.ox * 40, p.y + p.oy * 40 - 10);
  if (!(await esperar(110))) return;
  piel.dibujar();

  // 4) tironea y mastica
  if (cabeza) {
    for (let k = 0; k < 2; k++) {
      mover(cabeza, poseMordiendo(p, cabeza._w, 10), 80, "ease-out");
      caraCabeza(cabeza, k ? muerde : mastica);
      if (!(await esperar(90))) return;
      mover(cabeza, poseMordiendo(p, cabeza._w, 2), 80, "ease-in");
      if (!(await esperar(90))) return;
    }
    // 5) vuelve a su lugar
    caraCabeza(cabeza, mastica);
    mover(cabeza, inicio.p, b.rapido ? 220 : 340, "ease-in");
    if (!(await esperar(b.rapido ? 220 : 340))) return;
    quitarNodo(cabeza);
  } else if (!(await esperar(320))) return;
  guillermo.el.getAnimations && guillermo.el.getAnimations().forEach((a) => { if (mordida.anims.has(a)) a.cancel(); });
  guillermo.el.style.visibility = "";

  // 6) reacciona según lo enojado que quedó
  terminarActuacion(b.reaccion, caraBase(), n >= 2 ? "shake" : null);
  if (n >= 2) vapor();
}

/* =========================================================
   EL MORDISCO FINAL: el punto máximo del enojo
   Una anticipación larga (tiembla, se pone rojo, abre la boca
   gigante) y tres bocados que se comen el panel entero.
   La respuesta que lo dispara ya quedó contada: el mordisco final
   es solo la reacción, y después quedan los resultados.
   ========================================================= */
async function actuacionFinal(b) {
  mordida.actuando = true;
  const reduce = reduceMotion.matches;
  const c0 = panelCaja();
  const g = guillermo.el.getBoundingClientRect();
  // entra por el lado más cercano a Guillermo que se vea
  const vh = window.innerHeight;
  const fy = Math.min(0.85, Math.max(0.15, (Math.min(vh, c0.top + c0.H) / 2 + Math.max(0, c0.top) / 2 - c0.top) / c0.H));
  const lado = g.right <= c0.left + 20
    ? { fx: 0, fy, ox: -1, oy: 0, ang: -90 }
    : { fx: Math.min(0.8, Math.max(0.2, (g.left + g.width / 2 - c0.left) / c0.W)), fy: 0, ox: 0, oy: -1, ang: 0 };
  if (lado.fy === 0 && c0.top < 30) Object.assign(lado, { fx: 0, fy, ox: -1, oy: 0, ang: -90 });
  const mirar = { dx: lado.ox < 0 ? 1 : 0, dy: lado.oy < 0 ? 1 : 0 };
  const furia = cara({ cejas: "furiosa", ojos: "abiertos", mirar, boca: "dientes", cachetes: true, vena: true }, "Guillermo perdió la paciencia: colorado, temblando, con los ojos desorbitados");
  const bocaza = cara({ cejas: "furiosa", ojos: "rendija", mirar, boca: "gigante", cachetes: true, vena: true }, "Guillermo abre una boca gigante para comerse el panel");
  const muerde = cara({ cejas: "furiosa", ojos: "rendija", boca: "dientes", cachetes: true, vena: true }, "Guillermo se come el panel");

  // 1) pierde la paciencia: tiembla cada vez más fuerte
  fijarPostura(3);
  guillermo.set(furia);
  guillermo.decir(pickSin(FRASES.enojo.intencionFinal));
  sound.play("growl");
  if (!reduce) {
    document.body.classList.remove("estallido");
    void document.body.offsetWidth;
    document.body.classList.add("estallido");
    animar(guillermo.el, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => ({
      transform: `translate(${(k % 2 ? 1 : -1) * (1 + k * 0.5)}px, ${k * 0.4}px) scale(${1 + k * 0.006}, ${1 - k * 0.008})`
    })), { duration: 900, easing: "steps(12)", fill: "forwards" });
  }
  if (!(await esperar(b.rapido ? 450 : 900))) return;
  guillermo.set(bocaza);
  if (!(await esperar(reduce ? 200 : 380))) return;

  // 2) se lanza con la boca gigante
  let cabeza = null, inicio = null;
  const p = () => contacto({ tipo: "bocado", ...lado }, panelCaja());
  if (!reduce) {
    cabeza = crearCabeza(bocaza);
    inicio = poseInicio(cabeza, p());
    mover(cabeza, inicio.p, 0);
    guillermo.el.style.visibility = "hidden";
    const fin = poseMordiendo(p(), cabeza._w, 0, 1.4);
    mover(cabeza, pose((cabeza._pose.x + fin.x) / 2, Math.min(cabeza._pose.y, fin.y) - 70, fin.ang / 2, 1.2, 1.15, 0.88), 140, "ease-in");
    if (!(await esperar(140))) return;
    mover(cabeza, fin, 120, "ease-in");
    if (!(await esperar(120))) return;
  }

  // 3) tres bocados que se comen todo
  paciencia.marcar(Infinity, true);
  const pasos = [
    { tipo: "bocado", fx: lado.fx, fy: lado.fy, fr: 0.34, semilla: 3 },
    { tipo: "bocado", fx: 0.5 + (lado.fx - 0.5) * 0.3, fy: 0.5 + (lado.fy - 0.5) * 0.3, fr: 0.46, semilla: 7 },
    { tipo: "bocado", fx: 0.5, fy: 0.5, fr: 1.4, semilla: 11 }
  ];
  const pantalla = document.querySelector("[data-screen]:not([hidden])");
  for (let k = 0; k < pasos.length; k++) {
    const caja = panelCaja();
    const centro = { x: caja.left + pasos[k].fx * caja.W, y: caja.top + pasos[k].fy * caja.H };
    mordida.bocados.push(pasos[k]);
    piel.dibujar(pasos[k]);
    sound.play(k === 2 ? "namBig" : "nam");
    sacudir(8 + k * 3);
    migas(centro.x, centro.y, lado.ox, lado.oy - 0.5, 18 + k * 8);
    cartel(k === 2 ? "¡¡ÑAAAM!!" : "¡ÑAM!", centro.x, centro.y - 20, k === 2 ? "nam-pop grande" : "nam-pop", 800);
    if (cabeza) {
      caraCabeza(cabeza, muerde);
      if (k) mover(cabeza, pose(centro.x, centro.y - 10, 0, 1.4 + k * 0.4), 0);
    }
    if (k === 1 && pantalla) {
      // el contenido se queda sin piso y se cae
      pantalla.inert = true;
      [...pantalla.children].forEach((el, j) => {
        const rot = (j % 2 ? 1 : -1) * (4 + j * 2);
        animar(el, reduce
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [
            { transform: "none", opacity: 1 },
            { transform: `translate(${rot * 2}px, -12px) rotate(${rot / 2}deg)`, opacity: 1, offset: 0.25 },
            { transform: `translate(${rot * 4}px, ${window.innerHeight}px) rotate(${rot * 3}deg)`, opacity: 0 }
          ], { duration: reduce ? 300 : 800, delay: j * 50, easing: "ease-in", fill: "forwards" });
      });
    }
    if (!(await esperar(110))) return;
    piel.dibujar();
    if (cabeza) caraCabeza(cabeza, bocaza);
    if (!(await esperar(k === 2 ? 240 : 170))) return;
  }

  // 4) mastica satisfecho y se va
  guillermo.el.getAnimations && guillermo.el.getAnimations().forEach((a) => { if (mordida.anims.has(a)) a.cancel(); });
  if (cabeza) {
    caraCabeza(cabeza, "lleno");
    if (!(await esperar(420))) return;
    mover(cabeza, inicio.p, 360, "ease-in");
    if (!(await esperar(360))) return;
    quitarNodo(cabeza);
  } else if (!(await esperar(300))) return;
  guillermo.el.style.visibility = "";
  terminarActuacion(b.reaccion || FRASES.enojo.comido, "lleno");
  if (b.alTerminar) b.alTerminar();
}

// después del mordisco final de una partida: Guillermo se comió todo y quedan los resultados
function comioTodo(detalle, alVerResultados) {
  const o = $("#eaten");
  o.hidden = false;
  $("#eaten-guillermo").innerHTML = spriteSVG("lleno", false);
  $("#eaten-detail").textContent = detalle;
  mordida.alComido = alVerResultados;
  const r = piel.panel.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + Math.min(r.height, window.innerHeight) / 2;
  if (!reduceMotion.matches && o.animate) {
    o.animate([
      { clipPath: `circle(0px at ${cx}px ${cy}px)` },
      { clipPath: `circle(150vmax at ${cx}px ${cy}px)` }
    ], { duration: 700, easing: "ease-in" });
  }
  $("#eaten-btn").focus({ preventScroll: true });
}

// cambiar de pantalla siempre deja el panel sano: corta mordiscos, migas y temporizadores
function show(name, focusEl) {
  limpiarMordidas();
  enojoApagar();
  guillermo.set("espera"); // si se cortó una mordida, no queda con cara de ataque
  if (name !== "challenge") stopChallenge();
  document.querySelectorAll("[data-screen]").forEach((s) => { s.hidden = true; s.classList.remove("enter"); });
  const screen = $("#screen-" + name);
  screen.hidden = false;
  if (!reduceMotion.matches) screen.classList.add("enter");
  current = name;
  (focusEl || $("#panel")).focus({ preventScroll: true });
  if (window.innerWidth <= 820) window.scrollTo({ top: 0, behavior: "auto" });
}

function updateRecords() {
  const notas = store.get("evaluaciones", []).map((e) => e.nota);
  $("#best-quiz").textContent = notas.length ? Math.max(...notas) : "–";
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
  renderEvalHistory();
  show("start");
  guillermo.say(FRASES.bienvenida, "espera");
}

/* =========================================================
   MODO PRINCIPAL: PREGUNTAS
   ========================================================= */
const quiz = { deck: [], index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, answered: false, hintUsed: false, mistakes: [], lesson: null, porTema: {},
  reserve: [], comodines: {}, busy: false, alumno: "" };

const prepareQuestion = (q) => ({ ...q, mezcla: shuffle(q.opciones.map((texto, i) => ({ texto, ok: i === q.correcta }))) });

// lesson: null = partida normal; un número = preguntas de ese tema de la clase;
// "todo" = repaso de toda la clase; "examen" = ¿estoy listo para dar la clase?; "eval" = evaluación con comodines
function startQuiz(lesson = null) {
  stopChallenge();
  quiz.lesson = lesson;
  let pool = PREGUNTAS;
  let total = AJUSTES.preguntasPorPartida;
  if (lesson === "todo") pool = CLASE.temas.flatMap((t) => t.preguntas);
  else if (lesson === "examen") { pool = EXAMEN.preguntas; total = pool.length; }
  else if (lesson === "eval") { pool = EVALUACION.preguntas; total = EVALUACION.cantidad; }
  else if (lesson !== null) { pool = CLASE.temas[lesson].preguntas; total = pool.length; }
  const mixed = shuffle(pool);
  quiz.deck = mixed.slice(0, Math.min(total, pool.length)).map(prepareQuestion);
  quiz.reserve = lesson === "eval" ? mixed.slice(total) : [];
  // mini retos de grafos entre las preguntas: en la evaluación reemplazan preguntas (siguen siendo 12);
  // en el repaso se suman, y en la práctica de un tema va el reto de ese tema
  if (lesson === "eval") quiz.reserve.push(...meterRetos(quiz.deck, shuffle(TIPOS_RETO).slice(0, AJUSTES.retosPorEvaluacion), true));
  else if (lesson === "todo") meterRetos(quiz.deck, shuffle(TIPOS_RETO).slice(0, 2), false);
  else if (RETO_DEL_TEMA[lesson]) meterRetos(quiz.deck, [RETO_DEL_TEMA[lesson]], false);
  quiz.comodines = { rappi: true, pista: true, cambio: true };
  Object.assign(quiz, { index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, mistakes: [], porTema: {}, busy: false, terminado: false });
  $("#hint-btn").hidden = lesson === "eval";
  $("#life-help").hidden = lesson !== "eval";
  $("#q-card .chip-demo").hidden = lesson === "eval";
  $("#q-score").textContent = "0";
  $("#q-streak").textContent = "0";
  sound.play("start");
  show("quiz", $("#q-text"));
  enojoIniciar(limitePara(quiz.deck.length));
  renderQuestion(lesson === "eval"
    ? `¡Arranca la evaluación${quiz.alumno ? ", " + quiz.alumno : ""}! Tenés 3 comodines: Rappi, Pista y Cambio. Usalos bien.`
    : pick(FRASES.arranque));
}

function renderQuestion(intro) {
  const q = quiz.deck[quiz.index];
  const total = quiz.deck.length;
  quiz.answered = false;
  quiz.hintUsed = false;

  $("#q-progress").textContent = `${quiz.index + 1}/${total}`;
  $("#q-bar").style.width = `${(quiz.index / total) * 100}%`;
  $("#q-category").textContent = q.categoria;
  $("#q-category").classList.toggle("chip-reto", !!q.reto);
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
  box.hidden = !!q.reto;
  $("#q-reto").hidden = true;
  if (q.reto) renderReto(q);

  quiz.busy = false;
  $("#rappi-rider").hidden = true;
  renderLifelines();
  guillermo.say(intro || pickSin(enojo.nivel >= 2 ? FRASES.amenaza : FRASES.pregunta), caraBase());
  $("#q-text").focus({ preventScroll: true });
}

function answerQuestion(i) {
  if (quiz.answered || quiz.busy || current !== "quiz") return; // bloqueo: una sola respuesta por pregunta
  const opt = quiz.deck[quiz.index].mezcla[i];
  if (!opt || opt.eliminada) return; // las opciones que arrolló Rappi no se pueden elegir
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
  cerrarPregunta(chosen.ok, chosen.texto, right.texto);
}

// lo que pasa después de responder, sea una pregunta de opciones o un mini reto de grafos
// respuesta: texto propio para la línea de la respuesta (si no, se arma con «correcta»)
function cerrarPregunta(ok, elegida, correcta, respuesta) {
  const q = quiz.deck[quiz.index];
  $("#hint-btn").disabled = true;
  renderLifelines();

  if (q.tema !== undefined) {
    const t = (quiz.porTema[q.tema] = quiz.porTema[q.tema] || { ok: 0, total: 0 });
    t.total++;
    if (ok) t.ok++;
  }

  const fb = $("#q-feedback");
  fb.hidden = false;
  if (ok) {
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
    $("#q-feedback-answer").textContent = respuesta || `La respuesta es: ${correcta}`;
    sound.play("good");
    // si estaba enojado, una correcta lo calma un momento
    if (enojo.nivel >= 1) aliviar(pickSin(FRASES.enojo.alivio));
    else guillermo.say(quiz.streak >= 3 ? fill(pick(FRASES.racha), { n: quiz.streak }) : pickSin(FRASES.acierto), "alegria", "jump");
  } else {
    quiz.streak = 0;
    quiz.mistakes.push({ pregunta: q.pregunta, elegida, correcta, explicacion: q.explicacion });
    fb.className = "feedback bad";
    $("#q-feedback-title").textContent = q.reto ? "✘ No era así" : "✘ Esta no era";
    $("#q-feedback-answer").textContent = respuesta || `La respuesta correcta es: ${correcta}`;
    sound.play("bad");
    // la respuesta ya quedó contada; el mordisco es solo la reacción y no frena el juego
    const b = nuevoError();
    if (b.final) {
      b.alTerminar = () => comioTodo(
        `Erraste ${enojo.errores} preguntas y en la ${quiz.index + 1} de ${quiz.deck.length} me comí el panel entero. Las que faltaban cuentan como no respondidas.`,
        showResults
      );
    }
    morderPanel(b);
  }
  $("#q-feedback-expl").textContent = q.explicacion;
  bump($("#q-score"), quiz.score);
  bump($("#q-streak"), quiz.streak);
  $("#q-bar").style.width = `${((quiz.index + 1) / quiz.deck.length) * 100}%`;

  const next = $("#next-btn");
  next.textContent = quiz.index + 1 < quiz.deck.length ? "Siguiente ▶" : "Ver resultados ▶";
  next.hidden = enojo.final;
  if (!enojo.final) next.focus({ preventScroll: true });
}

function useHint() {
  if (quiz.lesson === "eval") return usarPista();
  if (quiz.answered || quiz.hintUsed || current !== "quiz") return;
  quiz.hintUsed = true; // el costo se descuenta de los puntos de esta pregunta si la acertás
  const hint = $("#hint-btn");
  hint.disabled = true;
  hint.textContent = "💡 Pista usada";
  sound.play("hint");
  guillermo.say("Pista: " + quiz.deck[quiz.index].pista, "pensando", null, true);
}

function nextQuestion() {
  if (!quiz.answered || current !== "quiz" || enojo.final) return; // si se comió la página, solo quedan los resultados
  sound.play("click");
  quiz.index++;
  if (quiz.index < quiz.deck.length) renderQuestion();
  else showResults();
}

function showResults() {
  if (quiz.terminado) return; // una sola vez por partida
  quiz.terminado = true;
  const comido = enojo.final;
  const mordidas = enojo.errores;
  const nivel = enojo.nivel;
  const total = quiz.deck.length;
  const best = store.get("bestQuiz", 0);
  const isRecord = quiz.lesson === null && quiz.score > best; // el récord es solo de la partida normal
  if (isRecord) store.set("bestQuiz", quiz.score);
  updateRecords();
  $("#r-back-lesson").hidden = quiz.lesson === null || quiz.lesson === "eval";
  if (typeof quiz.lesson === "number") {
    const done = store.get("claseHechos", {});
    done[quiz.lesson] = Math.max(done[quiz.lesson] || 0, Math.round((quiz.correct / total) * 100));
    store.set("claseHechos", done);
  }

  $("#r-score").textContent = quiz.score;
  $("#r-correct").textContent = `${quiz.correct}/${total}`;
  $("#r-streak").textContent = quiz.bestStreak;
  $("#r-record").hidden = !isRecord;
  const ready = quiz.lesson === "examen" ? renderReadiness(Math.round((quiz.correct / total) * 100))
    : quiz.lesson === "eval" ? renderEval(total) : null;
  $("#r-ready").hidden = !ready;

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
  if (ready) msg = ready.mensaje;
  else if (quiz.lesson !== null) {
    if (ratio === 1) msg = `¡${total} de ${total}! Este tema lo tenés dominado: ya lo podés explicar en la clase.`;
    else if (ratio >= 0.7) msg = `¡Bien ahí! ${quiz.correct} de ${total}. Repasá las que fallaste y ya estás para explicarlo.`;
    else msg = `${quiz.correct} de ${total}. Volvé a leer el tema con calma y probá de nuevo. ¡Así se aprende!`;
  }
  else if (ratio === 1) msg = "¡Perfecto! ¡10 de 10! Sos una enciclopedia con patas.";
  else if (ratio >= 0.7) msg = `¡Bien ahí! ${quiz.correct} de ${total}. Repasá las que fallaste y vas por el récord.`;
  else if (ratio >= 0.4) msg = `${quiz.correct} de ${total}. ¡Vas bien! Mirá el repaso y probá de nuevo.`;
  else msg = `${quiz.correct} de ${total}. ¡Tranqui! Leé las explicaciones y la próxima sale mejor.`;

  if (comido) msg += " ¡Y me comí el panel entero! Las que faltaban cuentan como no respondidas.";
  else if (mordidas >= 2) msg += ` Por cierto: le di ${mordidas} mordiscos al panel. Ya le volvió a crecer.`;
  sound.play("end");
  show("results"); // para leer los resultados, el panel vuelve a crecer
  guillermo.say(isRecord ? msg + " ¡Y es nuevo récord!" : msg, comido ? "lleno" : nivel >= 3 ? "molesto" : ratio >= 0.4 ? "alegria" : "animo", "jump");
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
   CLASE: TEORÍA DE GRAFOS
   ========================================================= */
CLASE.temas.forEach((t) => t.preguntas.forEach((p) => { p.categoria = "Grafos · " + t.titulo; }));
EXAMEN.preguntas.forEach((p) => { p.categoria = "Examen · " + CLASE.temas[p.tema].titulo; });

const lesson = { index: 0, graph: null, selected: null, showDegrees: false };

function showLearn() {
  stopChallenge();
  const done = store.get("claseHechos", {});
  const list = $("#topic-list");
  list.innerHTML = "";
  CLASE.temas.forEach((t, i) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.className = "topic";
    b.innerHTML = `<span class="topic-num" aria-hidden="true">${i + 1}</span><span class="topic-text"><span class="topic-title"></span><span class="topic-sum"></span></span><span class="topic-state"></span>`;
    b.querySelector(".topic-title").textContent = t.titulo;
    b.querySelector(".topic-sum").textContent = t.resumen;
    const state = b.querySelector(".topic-state");
    if (done[i] !== undefined) { state.textContent = `✔ ${done[i]} %`; state.classList.add("done"); }
    else state.textContent = "Sin preguntas";
    b.addEventListener("click", () => { sound.play("click"); openLesson(i); });
    li.appendChild(b);
    list.appendChild(li);
  });
  $("#clase-fuente").textContent = CLASE.fuente;
  const bestExam = store.get("claseExamen", null);
  $("#exam-best").textContent = bestExam === null ? "Todavía no lo hiciste." : `Tu mejor resultado: ${bestExam} %.`;
  show("learn");
  guillermo.say("¡Hoy damos teoría de grafos! Elegí un tema, leelo y después te pregunto a ver si lo entendiste.", "pensando");
}

function openLesson(i) {
  const t = CLASE.temas[i];
  lesson.index = i;
  $("#lesson-step").textContent = `Tema ${i + 1} de ${CLASE.temas.length}`;
  $("#lesson-title").textContent = t.titulo;
  $("#lesson-body").innerHTML = t.contenido;
  $("#lesson-teach").innerHTML = `<h3>Para explicarlo en la clase</h3><ul>${t.clase.map(() => "<li></li>").join("")}</ul>`;
  $("#lesson-teach").querySelectorAll("li").forEach((li, k) => { li.textContent = t.clase[k]; });
  $("#lesson-quiz-btn").textContent = `✔ ¿Lo entendí? Preguntame (${t.preguntas.length})`;
  $("#lesson-prev").disabled = i === 0;
  $("#lesson-next").disabled = i === CLASE.temas.length - 1;
  lesson.showDegrees = t.modo === "grado";
  $("#graph-degrees").checked = lesson.showDegrees;
  $("#graph-example").value = t.ejemplo;
  loadGraph(t.ejemplo);
  show("lesson", $("#lesson-title"));
  window.scrollTo({ top: 0, behavior: "auto" });
  guillermo.say(`Tema ${i + 1}: ${t.titulo}${/[?!.]$/.test(t.titulo) ? "" : "."} Leelo tranqui y jugá con el grafo. Cuando estés, tocá «¿Lo entendí?».`, "espera");
}

/* ---------- examen: ¿estoy listo? ---------- */
function renderReadiness(pct) {
  const best = store.get("claseExamen", null);
  if (best === null || pct > best) store.set("claseExamen", pct);

  const flojos = CLASE.temas
    .map((t, i) => ({ t, r: quiz.porTema[i] || { ok: 0, total: 0 } }))
    .filter(({ r }) => r.total && r.ok / r.total < 0.8)
    .map(({ t }) => t.titulo);
  let nivel, titulo, mensaje;
  if (pct >= EXAMEN.aprobado) {
    nivel = "ok";
    titulo = `✔ ¡Estás listo para dar la clase! (${pct} %)`;
    mensaje = `¡Bien ahí! Sacaste ${pct} %. Estás pronto para dar la clase.`;
  } else if (pct >= EXAMEN.casi) {
    nivel = "casi";
    titulo = `◐ Casi listo (${pct} %)`;
    mensaje = `Sacaste ${pct} %. Te falta poquito: repasá ${flojos.join(", ") || "los errores"} y volvé a probar.`;
  } else {
    nivel = "no";
    titulo = `✘ Todavía no (${pct} %)`;
    mensaje = `Sacaste ${pct} %. Tranqui: volvé a leer los temas con calma y probá de nuevo. ¡Así se aprende!`;
  }

  $("#r-ready").className = "ready ready-" + nivel;
  $("#r-ready-title").textContent = titulo;
  const list = $("#r-ready-list");
  list.innerHTML = "";
  CLASE.temas.forEach((t, i) => {
    const r = quiz.porTema[i] || { ok: 0, total: 0 };
    const good = r.total && r.ok / r.total >= 0.8;
    const li = document.createElement("li");
    li.className = good ? "good" : "bad";
    li.innerHTML = `<span class="rt"></span><span class="rs"></span>`;
    li.querySelector(".rt").textContent = t.titulo;
    li.querySelector(".rs").textContent = `${r.ok}/${r.total} · ${good ? "✔ Listo" : "✘ Repasar"}`;
    list.appendChild(li);
  });
  return { mensaje };
}

/* ---------- grafo interactivo ---------- */
function graphData(key) {
  const g = GRAFOS_EJEMPLO[key];
  const names = Object.keys(g.vertices);
  const degree = Object.fromEntries(names.map((n) => [n, 0]));
  g.aristas.forEach(([u, v]) => { degree[u]++; degree[v]++; }); // un lazo [v, v] suma 2
  return { ...g, key, names, degree };
}

const edgeName = ([u, v]) => `{${u}, ${v}}`;

function loadGraph(key) {
  lesson.graph = graphData(key);
  lesson.selected = null;
  drawGraph();
  describeGraph();
}

function drawGraph() {
  const g = lesson.graph;
  const sel = lesson.selected;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "-4 -6 108 70");
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", g.nombre);

  const pairCount = {};
  g.aristas.forEach((e, idx) => {
    const [u, v] = e;
    const k = [u, v].sort().join("|");
    const n = (pairCount[k] = (pairCount[k] || 0) + 1);
    const total = g.aristas.filter((x) => [x[0], x[1]].sort().join("|") === k).length;
    const [x1, y1] = g.vertices[u];
    const [x2, y2] = g.vertices[v];
    let d;
    if (u === v) {
      d = `M ${x1 - 3} ${y1 - 2} C ${x1 - 10} ${y1 - 18}, ${x1 + 10} ${y1 - 18}, ${x1 + 3} ${y1 - 2}`;
    } else {
      const off = total === 1 ? 0 : (n - (total + 1) / 2) * 9;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      const cx = mx - ((y2 - y1) / len) * off * 2, cy = my + ((x2 - x1) / len) * off * 2;
      d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
    }
    const active = sel && ((sel.type === "edge" && sel.idx === idx) || (sel.type === "vertex" && (u === sel.name || v === sel.name)));
    const grp = document.createElementNS(svgNS, "g");
    grp.setAttribute("class", "g-edge" + (active ? " on" : "") + (u === v ? " loop" : ""));
    grp.setAttribute("tabindex", "0");
    grp.setAttribute("role", "button");
    grp.setAttribute("aria-label", u === v ? `Lazo en ${u}` : `Arista ${edgeName(e)}`);
    grp.dataset.key = "e" + idx;
    grp.innerHTML = `<path class="hit" d="${d}"/><path class="line" d="${d}"/>`;
    grp.addEventListener("click", () => selectGraph({ type: "edge", idx }));
    grp.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectGraph({ type: "edge", idx }); } });
    svg.appendChild(grp);
  });

  g.names.forEach((name) => {
    const [x, y] = g.vertices[name];
    const neighbor = sel && sel.type === "vertex" && g.aristas.some(([u, v]) => (u === sel.name && v === name) || (v === sel.name && u === name));
    const isSel = sel && ((sel.type === "vertex" && sel.name === name) || (sel.type === "edge" && g.aristas[sel.idx].includes(name)));
    const grp = document.createElementNS(svgNS, "g");
    grp.setAttribute("class", "g-vertex" + (isSel ? " on" : neighbor ? " near" : ""));
    grp.setAttribute("tabindex", "0");
    grp.setAttribute("role", "button");
    grp.setAttribute("aria-label", `Vértice ${name}, grado ${g.degree[name]}`);
    grp.dataset.key = "v" + name;
    const below = y > 30;
    grp.innerHTML = `<rect x="${x - 3.2}" y="${y - 3.2}" width="6.4" height="6.4"/>` +
      `<text class="g-label" x="${x}" y="${below ? y + 9 : y - 6}"></text>` +
      (lesson.showDegrees ? `<text class="g-degree" x="${x}" y="${y + 1.5}">${g.degree[name]}</text>` : "");
    grp.querySelector(".g-label").textContent = name;
    grp.addEventListener("click", () => selectGraph({ type: "vertex", name }));
    grp.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectGraph({ type: "vertex", name }); } });
    svg.appendChild(grp);
  });

  const box = $("#graph-canvas");
  box.innerHTML = "";
  box.appendChild(svg);
}

function selectGraph(target) {
  const same = lesson.selected && JSON.stringify(lesson.selected) === JSON.stringify(target);
  lesson.selected = same ? null : target;
  sound.play("click");
  drawGraph();
  describeGraph();
  // el SVG se redibuja: devolvemos el foco al mismo elemento para no perderlo con el teclado
  const key = target.type === "vertex" ? "v" + target.name : "e" + target.idx;
  const el = [...document.querySelectorAll("#graph-canvas [data-key]")].find((x) => x.dataset.key === key);
  if (el) el.focus({ preventScroll: true });
}

function describeGraph() {
  const g = lesson.graph;
  const sel = lesson.selected;
  const info = $("#graph-info");
  const lines = [];
  if (!sel) {
    const sum = g.names.reduce((s, n) => s + g.degree[n], 0);
    lines.push(`<strong>V</strong> = {${g.names.join(", ")}} → |V| = ${g.names.length}`);
    lines.push(`<strong>E</strong> = {${g.aristas.map(edgeName).join(", ")}} → |E| = ${g.aristas.length}`);
    if (lesson.showDegrees) {
      lines.push(`Grados: ${g.names.map((n) => `δ(${n}) = ${g.degree[n]}`).join(" · ")}`);
      lines.push(`Suma de grados = ${sum} = 2 · ${g.aristas.length} aristas ✔ (teorema de los apretones de manos)`);
    }
    lines.push(`<em>Tocá un vértice o una arista para ver más.</em>`);
  } else if (sel.type === "vertex") {
    const n = sel.name;
    const inc = g.aristas.filter(([u, v]) => u === n || v === n);
    const neigh = [...new Set(inc.map(([u, v]) => (u === n ? v : u)).filter((x) => x !== n))];
    const d = g.degree[n];
    const kind = d === 0 ? " → es un vértice <strong>aislado</strong>" : d === 1 ? " → es una <strong>hoja</strong> (colgante)" : "";
    lines.push(`<strong>Vértice ${n}</strong>: grado δ(${n}) = ${d}${kind}`);
    lines.push(`Vecinos (adyacentes): ${neigh.length ? neigh.join(", ") : "ninguno"}`);
    lines.push(`Aristas incidentes: ${inc.length ? inc.map(edgeName).join(", ") : "ninguna"}`);
    if (inc.some(([u, v]) => u === v)) lines.push("El lazo cuenta 2 en el grado.");
  } else {
    const [u, v] = g.aristas[sel.idx];
    if (u === v) {
      lines.push(`<strong>Lazo {${u}, ${u}}</strong>: une ${u} consigo mismo y suma 2 al grado de ${u}.`);
    } else {
      const copies = g.aristas.filter(([a, b]) => (a === u && b === v) || (a === v && b === u)).length;
      lines.push(`<strong>Arista {${u}, ${v}}</strong>: conecta ${u} con ${v}. Es incidente con sus dos extremos, que por eso son vértices adyacentes.`);
      if (copies > 1) lines.push(`Es una <strong>arista múltiple</strong>: hay ${copies} aristas que unen ${u} con ${v}.`);
    }
  }
  info.innerHTML = lines.map((l) => `<span>${l}</span>`).join("");
}

$("#graph-example").innerHTML = Object.entries(GRAFOS_EJEMPLO).map(([k, g]) => `<option value="${k}">${g.nombre}</option>`).join("");
$("#graph-example").addEventListener("change", (e) => loadGraph(e.target.value));
$("#graph-degrees").addEventListener("change", (e) => { lesson.showDegrees = e.target.checked; drawGraph(); describeGraph(); });

/* =========================================================
   EVALUACIÓN PARA LOS ALUMNOS (con comodines)
   ========================================================= */
EVALUACION.preguntas.forEach((p) => { p.categoria = "Evaluación · " + CLASE.temas[p.tema].titulo; });

const COMODINES = {
  rappi: { label: "🛵 Llamar a Rappi", usado: "🛵 Rappi ya pasó" },
  pista: { label: "💡 Pista de Guillermo", usado: "💡 Pista usada" },
  cambio: { label: "🔄 Cambiar pregunta", usado: "🔄 Cambio usado" }
};

function renderEvalHistory() {
  const items = store.get("evaluaciones", []);
  const list = $("#eval-history");
  list.innerHTML = "";
  $("#eval-history-wrap").hidden = !items.length;
  const clear = $("#eval-clear");
  clear.dataset.confirm = "";
  clear.textContent = "Borrar historial";
  items.slice(-10).reverse().forEach((it) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="hn"></span><span class="hs"></span>`;
    li.querySelector(".hn").textContent = it.nombre || "Sin nombre";
    li.querySelector(".hs").textContent = `Nota ${it.nota} · ${it.correctas} de ${it.total} bien · ${it.fecha}`;
    li.className = it.nota >= 6 ? "good" : "bad";
    list.appendChild(li);
  });
}

function clearEvalHistory() {
  const btn = $("#eval-clear");
  if (!btn.dataset.confirm) { // paso de confirmación dentro de la página
    btn.dataset.confirm = "1";
    btn.textContent = "¿Seguro? Tocá de nuevo para borrar";
    return;
  }
  store.set("evaluaciones", []);
  renderEvalHistory();
  guillermo.say("Listo, borré el historial de este dispositivo.", "espera");
}

function startEval() {
  quiz.alumno = ($("#eval-name").value || "").trim().slice(0, 40);
  startQuiz("eval");
}

function renderLifelines() {
  const box = $("#lifelines");
  box.hidden = quiz.lesson !== "eval";
  if (box.hidden) return;
  Object.keys(COMODINES).forEach((k) => {
    const b = $("#life-" + k);
    const used = !quiz.comodines[k];
    b.textContent = used ? COMODINES[k].usado : COMODINES[k].label;
    b.classList.toggle("used", used);
    b.disabled = used || quiz.answered || quiz.busy || (k === "cambio" && !quiz.reserve.length) || (k === "rappi" && !!quiz.deck[quiz.index].reto);
  });
}

function usarPista() {
  if (quiz.lesson !== "eval" || !quiz.comodines.pista || quiz.answered || quiz.busy) return;
  quiz.comodines.pista = false;
  quiz.hintUsed = true;
  sound.play("hint");
  guillermo.say("Pista: " + quiz.deck[quiz.index].pista, "pensando", null, true);
  renderLifelines();
}

function cambiarPregunta() {
  if (quiz.lesson !== "eval" || !quiz.comodines.cambio || quiz.answered || quiz.busy || !quiz.reserve.length) return;
  quiz.comodines.cambio = false;
  quiz.deck[quiz.index] = prepareQuestion(quiz.reserve.pop());
  sound.play("click");
  renderQuestion("¡Cambiamos la pregunta! Vamos con esta.");
}

// Rappi siempre se anima (aunque el sistema pida menos movimiento): es el chiste del comodín.
const RAPPI = { velocidad: 520, ruedaDelantera: 42 / 52, ruedaTrasera: 11 / 52 };

function runOver(i, cruce = 0.4) {
  const q = quiz.deck[quiz.index];
  if (q.mezcla[i].eliminada) return;
  q.mezcla[i].eliminada = true;
  const b = $("#q-options").children[i];
  b.disabled = true;
  b.classList.add("run-over");
  b.querySelector(".mark").textContent = "🛵 Atropellada";
  b.setAttribute("aria-label", `${b.querySelector(".label").textContent}: atropellada por Rappi, descartada`);
  const skid = document.createElement("span");
  skid.className = "skid";
  skid.setAttribute("aria-hidden", "true");
  skid.style.setProperty("--skid-d", `${Math.max(0.15, cruce)}s`);
  b.appendChild(skid);
  sound.play("crash");
}

// Una pasada de izquierda a derecha por una fila de opciones: atropella las marcadas y salta las demás.
function rappiPass(row, targets, card, rider) {
  rider.style.transform = "translate(-9999px, 0)";
  rider.hidden = false; // visible antes de medirla
  const cardBox = card.getBoundingClientRect();
  const w = rider.offsetWidth;
  const h = rider.offsetHeight;
  const v = RAPPI.velocidad;
  const front = w * RAPPI.ruedaDelantera;
  const rear = w * RAPPI.ruedaTrasera;
  const boxes = row.map((i) => {
    const r = $("#q-options").children[i].getBoundingClientRect();
    return { i, left: r.left - cardBox.left, right: r.right - cardBox.left, top: r.top - cardBox.top, height: r.height };
  });
  const ground = Math.max(...boxes.map((o) => o.top + o.height * 0.78)) - h; // las ruedas van arriba de la opción
  const pts = [{ x: -w - 20, y: ground, r: 0 }];
  const hits = [];
  let landed = -Infinity; // no atropella mientras está en el aire
  boxes.forEach((o) => {
    if (targets.includes(o.i)) {
      hits.push({ i: o.i, x: Math.max(o.left - front, landed), cruce: (o.right - Math.max(o.left, landed + front)) / v });
      return;
    }
    // salto por arriba de la opción correcta para no tocarla
    const x0 = o.left - front - 14;
    const x1 = o.right - rear + 14;
    const lift = o.height + 18;
    pts.push({ x: x0, y: ground, r: 0 });
    for (let k = 1; k < 8; k++) {
      const t = k / 8;
      pts.push({ x: x0 + (x1 - x0) * t, y: ground - lift * 4 * t * (1 - t), r: t < 0.5 ? -12 : 10 });
    }
    pts.push({ x: x1, y: ground, r: 0 });
    landed = x1;
  });
  pts.push({ x: cardBox.width + 20, y: ground, r: 0 });

  const len = pts.slice(1).map((p, k) => Math.hypot(p.x - pts[k].x, p.y - pts[k].y));
  const total = len.reduce((a, b) => a + b, 0) || 1;
  const duration = (total / v) * 1000;
  let acc = 0;
  const frames = pts.map((p, k) => {
    if (k) acc += len[k - 1];
    return { transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`, offset: acc / total };
  });
  // en qué momento la rueda delantera llega a cada opción (el camino es una función de x)
  const timeAt = (x) => {
    for (let k = 1; k < pts.length; k++) {
      if (x <= pts[k].x) {
        const f = (x - pts[k - 1].x) / (pts[k].x - pts[k - 1].x || 1);
        return (frames[k - 1].offset + (frames[k].offset - frames[k - 1].offset) * f) * duration;
      }
    }
    return duration;
  };

  return new Promise((resolve) => {
    rider.hidden = false;
    const timers = hits.map((t) => setTimeout(() => runOver(t.i, t.cruce), timeAt(t.x)));
    let done = false;
    const end = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      hits.forEach((t) => runOver(t.i, 0.15));
      rider.hidden = true;
      resolve();
    };
    if (!rider.animate) { end(); return; }
    const anim = rider.animate(frames, { duration, easing: "linear", fill: "forwards" });
    anim.onfinish = () => { anim.cancel(); end(); };
    setTimeout(() => { anim.cancel(); end(); }, duration + 500); // por si la pestaña no anima (segundo plano)
  });
}

async function llamarRappi() {
  if (quiz.lesson !== "eval" || !quiz.comodines.rappi || quiz.answered || quiz.busy || quiz.deck[quiz.index].reto) return;
  quiz.comodines.rappi = false;
  quiz.busy = true;
  renderLifelines();

  const q = quiz.deck[quiz.index];
  const wrong = shuffle(q.mezcla.map((o, i) => (o.ok || o.eliminada ? -1 : i)).filter((i) => i >= 0)).slice(0, 2);
  const buttons = [...$("#q-options").children];
  // agrupa las opciones por fila (2 columnas en compu, 1 en celular)
  const rows = [];
  buttons.forEach((b, i) => {
    const top = Math.round(b.getBoundingClientRect().top);
    let row = rows.find((r) => Math.abs(r.top - top) < 8);
    if (!row) rows.push((row = { top, items: [] }));
    row.items.push({ i, left: b.getBoundingClientRect().left });
  });
  rows.sort((a, b) => a.top - b.top);
  const passes = rows
    .map((r) => r.items.sort((a, b) => a.left - b.left).map((o) => o.i))
    .filter((r) => r.some((i) => wrong.includes(i)));

  guillermo.say("¡Llamaste a Rappi! ¡Ahí viene a toda velocidad, cuidado!", "sorpresa");
  const card = $("#q-card");
  const rider = $("#rappi-rider");
  for (const row of passes) {
    if (current !== "quiz") break;
    sound.play("moto");
    await rappiPass(row, wrong, card, rider);
  }
  wrong.forEach((i) => runOver(i, 0.15));
  rider.hidden = true;
  quiz.busy = false;
  guillermo.say("¡Rappi atropelló dos opciones incorrectas! Quedan dos: elegí bien.", "alegria", "jump");
  renderLifelines();
}

function renderEval(total) {
  const nota = Math.max(1, Math.round((quiz.correct / total) * 12));
  const aprobado = nota >= 6;
  const usados = Object.keys(COMODINES).filter((k) => !quiz.comodines[k]).map((k) => COMODINES[k].label.replace(/^\S+\s/, ""));
  const fecha = new Date().toLocaleString("es-UY", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  const hist = store.get("evaluaciones", []);
  hist.push({ nombre: quiz.alumno, nota, correctas: quiz.correct, total, fecha });
  store.set("evaluaciones", hist.slice(-50));

  $("#r-ready").className = "ready " + (aprobado ? "ready-ok" : "ready-no");
  $("#r-ready-title").textContent = `${quiz.alumno ? quiz.alumno + " · " : ""}Nota orientativa: ${nota}/12 · ${aprobado ? "✔ Aprobado" : "✘ A reforzar"}`;
  const list = $("#r-ready-list");
  list.innerHTML = "";
  const rows = CLASE.temas.map((t, i) => {
    const r = quiz.porTema[i] || { ok: 0, total: 0 };
    return [t.titulo, r.total ? `${r.ok}/${r.total}` : "—", !r.total || r.ok / r.total >= 0.5];
  });
  rows.push(["Comodines usados", usados.length ? usados.join(", ") : "Ninguno", true]);
  rows.forEach(([a, b, good]) => {
    const li = document.createElement("li");
    li.className = good ? "good" : "bad";
    li.innerHTML = `<span class="rt"></span><span class="rs"></span>`;
    li.querySelector(".rt").textContent = a;
    li.querySelector(".rs").textContent = b;
    list.appendChild(li);
  });
  return {
    aprobado,
    mensaje: aprobado
      ? `¡Bien ahí${quiz.alumno ? ", " + quiz.alumno : ""}! Sacaste ${nota} de 12 en la evaluación.`
      : `Sacaste ${nota} de 12${quiz.alumno ? ", " + quiz.alumno : ""}. Mirá el repaso de abajo: con eso la próxima sale mejor.`
  };
}

/* =========================================================
   MINI RETOS DE GRAFOS
   Se cuelan entre las preguntas: en vez de elegir una opción,
   se tocan vértices o aristas de un grafo chiquito.
   Cuentan como una pregunta más (puntos, nota, enojo y mordidas).
   ========================================================= */
const GRAFOS_RETO = ["rutas", "amigos", "rosen"]; // grafos simples: sin lazos ni aristas repetidas
const TIPOS_RETO = ["grado", "vecinos", "aristas"];
const RETO_DEL_TEMA = { 1: "vecinos", 2: "aristas", 3: "grado" }; // tema de la clase → reto que lo practica

const lista = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}` : xs[0] || "nada");

// arma un reto a partir de un grafo de ejemplo; las claves son "v:Nombre" o "e:índice"
function armarReto(tipo) {
  const g = graphData(pick(GRAFOS_RETO));
  const base = { reto: { tipo, g, marcados: new Set(), listo: false }, mezcla: [], categoria: "Mini reto · Grafos" };
  const r = base.reto;
  if (tipo === "grado") {
    const max = Math.max(...g.names.map((n) => g.degree[n]));
    const top = g.names.filter((n) => g.degree[n] === max);
    Object.assign(r, { elige: "v", uno: true, correctas: top.map((n) => "v:" + n) });
    return { ...base, tema: 3,
      pregunta: "Tocá el vértice con más aristas (el de mayor grado).",
      pista: "Contá cuántas líneas salen de cada punto.",
      respuesta: top.length > 1 ? `El grado más alto es ${max}: lo tienen ${lista(top)}.` : `${top[0]} tiene grado ${max}: es el más alto.`,
      explicacion: "El grado de un vértice es la cantidad de aristas que llegan a él." };
  }
  const x = pick(g.names.filter((n) => g.degree[n] >= 2));
  r.objetivo = x;
  if (tipo === "vecinos") {
    const vec = g.aristas.filter((e) => e.includes(x)).map(([u, v]) => (u === x ? v : u));
    Object.assign(r, { elige: "v", uno: false, correctas: vec.map((n) => "v:" + n) });
    return { ...base, tema: 1,
      pregunta: `Marcá todos los vecinos de ${x}.`,
      pista: `Los vecinos de ${x} son los que están unidos a él por una arista.`,
      respuesta: `Los vecinos de ${x} son ${lista(vec)}.`,
      explicacion: "Dos vértices son vecinos (adyacentes) cuando hay una arista que los une." };
  }
  const idx = g.aristas.map((e, i) => (e.includes(x) ? i : -1)).filter((i) => i >= 0);
  Object.assign(r, { elige: "e", uno: false, correctas: idx.map((i) => "e:" + i) });
  return { ...base, tema: 2,
    pregunta: `Marcá todas las aristas que llegan a ${x}.`,
    pista: `Seguí las líneas que tocan a ${x}. No cuentan las que pasan cerca.`,
    respuesta: `Son ${lista(idx.map((i) => edgeName(g.aristas[i])))}: por eso el grado de ${x} es ${idx.length}.`,
    explicacion: "Una arista es incidente a los dos vértices que une; el grado de un vértice cuenta esas aristas." };
}

// reparte los retos por el mazo (uno por tramo, nunca primero ni dos seguidos); si reemplazar, devuelve las preguntas que sacó
function meterRetos(deck, tipos, reemplazar) {
  const tramo = Math.floor((deck.length - 1) / tipos.length);
  const sacadas = [];
  tipos.forEach((tipo, k) => {
    const pos = 1 + tramo * k + Math.floor(Math.random() * Math.max(1, tramo - 1)); // nunca dos retos seguidos
    if (reemplazar) sacadas.push(deck.splice(pos, 1, armarReto(tipo))[0]);
    else deck.splice(pos + k, 0, armarReto(tipo));
  });
  return sacadas;
}

const nombreClave = (g, k) => (k[0] === "v" ? k.slice(2) : edgeName(g.aristas[Number(k.slice(2))]));
const retoActual = () => { // la pregunta actual, si es un mini reto
  const q = current === "quiz" && quiz.deck[quiz.index];
  return q && q.reto ? q : null;
};

function renderReto(q) {
  const r = q.reto;
  r.marcados.clear();
  r.listo = false;
  $("#q-reto").hidden = false;
  $("#reto-canvas").classList.remove("listo");
  const check = $("#reto-check");
  check.hidden = r.uno;
  check.disabled = true;
  $("#reto-info").textContent = r.elige === "v"
    ? (r.uno ? "Tocá un vértice." : "Tocá los vértices para marcarlos; tocá de nuevo para desmarcar.")
    : "Tocá las aristas (las líneas) para marcarlas.";
  dibujarReto();
}

function dibujarReto(enfocar) {
  const r = retoActual().reto;
  const g = r.g;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "-4 -6 108 70");
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", g.nombre);
  // antes de comprobar: marcado o no; después: bien (ok), de más (mal) o el que faltó (falta)
  const estado = (k) => {
    const marcado = r.marcados.has(k);
    if (!r.listo) return marcado ? " on" : "";
    const bien = r.correctas.includes(k);
    return marcado ? (bien ? " ok" : " mal") : bien ? " falta" : "";
  };
  const tocable = (grp, k, label) => {
    grp.setAttribute("tabindex", r.listo ? "-1" : "0");
    grp.setAttribute("role", "button");
    grp.setAttribute("aria-pressed", String(r.marcados.has(k)));
    grp.setAttribute("aria-label", label);
    grp.dataset.key = k;
    grp.addEventListener("click", () => tocarReto(k));
    grp.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      ev.preventDefault();
      ev.stopPropagation(); // que el Enter no pase de largo a «Siguiente»
      tocarReto(k);
    });
  };

  g.aristas.forEach((e, i) => {
    const [x1, y1] = g.vertices[e[0]];
    const [x2, y2] = g.vertices[e[1]];
    const d = `M ${x1} ${y1} L ${x2} ${y2}`;
    const k = "e:" + i;
    const grp = document.createElementNS(svgNS, "g");
    grp.setAttribute("class", "g-edge" + (r.elige === "e" ? estado(k) : ""));
    grp.innerHTML = `<path class="hit" d="${d}"/><path class="line" d="${d}"/>`;
    if (r.elige === "e") tocable(grp, k, `Arista ${edgeName(e)}`);
    else grp.style.pointerEvents = "none";
    svg.appendChild(grp);
  });

  g.names.forEach((name) => {
    const [x, y] = g.vertices[name];
    const k = "v:" + name;
    const grp = document.createElementNS(svgNS, "g");
    const esObjetivo = name === r.objetivo;
    grp.setAttribute("class", "g-vertex" + (esObjetivo ? " objetivo" : r.elige === "v" ? estado(k) : ""));
    grp.innerHTML = `<rect x="${x - 3.2}" y="${y - 3.2}" width="6.4" height="6.4"/><text class="g-label" x="${x}" y="${y > 30 ? y + 9 : y - 6}"></text>`;
    grp.querySelector(".g-label").textContent = name;
    // sin el grado en la etiqueta: si no, se regala la respuesta
    if (r.elige === "v" && !esObjetivo) tocable(grp, k, `Vértice ${name}`);
    else grp.style.pointerEvents = "none";
    svg.appendChild(grp);
  });

  const box = $("#reto-canvas");
  box.innerHTML = "";
  box.appendChild(svg);
  if (enfocar) {
    const el = [...box.querySelectorAll("[data-key]")].find((n) => n.dataset.key === enfocar);
    if (el) el.focus({ preventScroll: true });
  }
}

function tocarReto(k) {
  const q = quiz.deck[quiz.index];
  if (!retoActual() || quiz.answered || quiz.busy || q.reto.listo) return;
  const r = q.reto;
  if (r.uno) {
    r.marcados = new Set([k]);
    comprobarReto();
    return;
  }
  if (r.marcados.has(k)) r.marcados.delete(k);
  else r.marcados.add(k);
  sound.play("click");
  const n = r.marcados.size;
  $("#reto-check").disabled = !n;
  $("#reto-info").textContent = n ? `Marcaste ${n}: ${lista([...r.marcados].map((x) => nombreClave(r.g, x)))}.` : "No marcaste nada todavía.";
  dibujarReto(k);
}

function comprobarReto() {
  const q = retoActual();
  if (!q || quiz.answered || quiz.busy || q.reto.listo || !q.reto.marcados.size) return; // una sola vez por reto
  const r = q.reto;
  quiz.answered = true;
  r.listo = true;
  const ok = r.marcados.size === r.correctas.length && r.correctas.every((k) => r.marcados.has(k));
  $("#reto-check").hidden = true;
  $("#reto-canvas").classList.add("listo");
  $("#reto-info").textContent = ok ? "✓ ¡Todo bien marcado!" : "Verde: bien · rojo: de más · punteado: te faltó.";
  dibujarReto();
  const nombres = (ks) => lista(ks.map((k) => nombreClave(r.g, k)));
  cerrarPregunta(ok, nombres([...r.marcados]), nombres(r.correctas), q.respuesta);
}

/* =========================================================
   CONTROLES
   ========================================================= */
const actions = {
  home: goHome,
  instructions: () => { show("instructions"); guillermo.say(FRASES.instrucciones, "pensando"); },
  "start-quiz": startEval,
  "retry-quiz": () => startQuiz(quiz.lesson),
  "quit-quiz": () => (quiz.lesson === null ? goHome() : typeof quiz.lesson === "number" ? openLesson(quiz.lesson) : showLearn()),
  "start-eval": startEval,
  "eval-clear": clearEvalHistory,
  "life-rappi": llamarRappi,
  "eaten-results": () => {
    const fn = mordida.alComido; // una sola vez
    mordida.alComido = null;
    $("#eaten").hidden = true;
    if (fn) fn();
  },
  "life-pista": usarPista,
  "life-cambio": cambiarPregunta,
  "lesson-exam": () => startQuiz("examen"),
  learn: showLearn,
  "lesson-quiz": () => startQuiz(lesson.index),
  "lesson-review": () => startQuiz("todo"),
  "lesson-prev": () => openLesson(Math.max(0, lesson.index - 1)),
  "lesson-next": () => openLesson(Math.min(CLASE.temas.length - 1, lesson.index + 1)),
  hint: useHint,
  next: nextQuestion,
  "challenge-intro": challengeIntro,
  "start-challenge": startChallenge,
  "quit-challenge": challengeIntro,
  "answer-true": () => answerStatement(true),
  "answer-false": () => answerStatement(false),
  "reto-check": comprobarReto
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || btn.disabled) return;
  const fn = actions[btn.dataset.action];
  if (!fn) return;
  if (!["hint", "next", "answer-true", "answer-false", "start-quiz", "retry-quiz", "lesson-quiz", "lesson-review", "lesson-exam", "start-challenge", "start-eval", "life-rappi", "life-pista", "life-cambio", "reto-check"].includes(btn.dataset.action)) sound.play("click");
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
      e.preventDefault();
      const q = retoActual();
      if (q && !quiz.answered) comprobarReto(); // en un mini reto, Enter comprueba
      else nextQuestion();
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
piel.init();
$("#rappi-rider").innerHTML = pixelSVG(RAPPI_SPRITE, RAPPI_PALETA);
