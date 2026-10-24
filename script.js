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
      end: [[784, 0, 0.12], [659, 0.12, 0.12], [523, 0.24, 0.12], [1047, 0.4, 0.3]],
      moto: [[90, 0, 0.35, "sawtooth", 0.07], [110, 0.3, 0.35, "sawtooth", 0.07], [130, 0.6, 0.4, "sawtooth", 0.07], [120, 1.0, 0.6, "sawtooth", 0.05]],
      crash: [[180, 0, 0.08, "square", 0.09], [70, 0.06, 0.18, "triangle", 0.12]]
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
  "...................KHHKHhHHKHHhK....................",
  "..................KHHHHHHHHHHHHHK...................",
  ".................KHHhHHHHHhHHHHhHK..................",
  ".................KHHHHHhHHHHHhHHHK..................",
  ".................KHhHHHHHHHHHHHHHK..................",
  ".................KHHHHhHHHhHHHHhHK..................",
  ".................KHHHSHHSHHHSHSHHK..................",
  "..................KHSSSSSSSSSSSHK...................",
  "..................KHSEEESSSEEESHK...................",
  "..................KsSSSSSSSSSSSsK...................",
  "..................KsSWEESSSSEEWsK...................",
  "...KKKKKKKKKKKKK...KSSEESsSSEESSK...................",
  "..KOOOOOOOOOOOOOK..KSSSSSsSSSSSSK...................",
  "..KOOOOOOOOOOOOooK.KSSSSsssSSSSSK...................",
  "..KOOWWWWWWWWWOooK.KsSSSSSSSSSSsK...................",
  "..KOOWWWWWWWWWOooK..KsSMMMMMSSsK....................",
  "..KOOOOOOOOOOOOooK...KsSSSSSSsK.....................",
  "..KOOOOOOOOOOOOooKKKKKKssssssK......................",
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
  quiz.comodines = { rappi: true, pista: true, cambio: true };
  Object.assign(quiz, { index: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, mistakes: [], porTema: {}, busy: false });
  $("#hint-btn").hidden = lesson === "eval";
  $("#q-card .chip-demo").hidden = lesson === "eval";
  $("#q-score").textContent = "0";
  $("#q-streak").textContent = "0";
  sound.play("start");
  show("quiz", $("#q-text"));
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

  quiz.busy = false;
  $("#rappi-rider").hidden = true;
  renderLifelines();
  guillermo.say(intro || pick(FRASES.pregunta), "espera");
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
  $("#hint-btn").disabled = true;
  renderLifelines();

  if (q.tema !== undefined) {
    const t = (quiz.porTema[q.tema] = quiz.porTema[q.tema] || { ok: 0, total: 0 });
    t.total++;
    if (chosen.ok) t.ok++;
  }

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
  if (quiz.lesson === "eval") return usarPista();
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
    b.disabled = used || quiz.answered || quiz.busy || (k === "cambio" && !quiz.reserve.length);
  });
}

function usarPista() {
  if (quiz.lesson !== "eval" || !quiz.comodines.pista || quiz.answered || quiz.busy) return;
  quiz.comodines.pista = false;
  quiz.hintUsed = true;
  sound.play("hint");
  guillermo.say("Pista: " + quiz.deck[quiz.index].pista, "pensando");
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
  if (quiz.lesson !== "eval" || !quiz.comodines.rappi || quiz.answered || quiz.busy) return;
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
  "answer-false": () => answerStatement(false)
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || btn.disabled) return;
  const fn = actions[btn.dataset.action];
  if (!fn) return;
  if (!["hint", "next", "answer-true", "answer-false", "start-quiz", "retry-quiz", "lesson-quiz", "lesson-review", "lesson-exam", "start-challenge", "start-eval", "life-rappi", "life-pista", "life-cambio"].includes(btn.dataset.action)) sound.play("click");
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
$("#rappi-portrait").innerHTML = pixelSVG(RAPPI_SPRITE, RAPPI_PALETA);
$("#rappi-rider").innerHTML = pixelSVG(RAPPI_SPRITE, RAPPI_PALETA);
