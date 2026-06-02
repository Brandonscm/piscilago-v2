export interface AssistantResponse {
  text: string;
  link?: { label: string; href: string };
  suggestions?: string[];
}

interface Pattern {
  keywords: string[];
  build: () => AssistantResponse;
}

const PATTERNS: Pattern[] = [
  {
    keywords: ["recomienda", "recomendacion", "recomendación", "recomendado", "que hago"],
    build: () => ({
      text: "Te recomiendo Río Lento del Sol — solo 5 min de espera y está en una zona refrescada. Ahora mismo es la mejor opción según el motor IA. ¿Te llevo al mapa?",
      link: { label: "Ver en el mapa", href: "/mapa" },
      suggestions: ["¿Qué más hay disponible?", "Tengo calor"],
    }),
  },
  {
    keywords: ["calor", "fresco", "frio", "frío", "cooling", "asperso"],
    build: () => ({
      text: "Hay 7 cooling zones activas en el parque ahora. Las más cercanas están cerca de Río Lento, Piscina Familiar y Splash Kids. Estos puntos tienen aspersores y sombra natural.",
      link: { label: "Ver cooling zones", href: "/mapa?layer=cooling" },
      suggestions: ["¿Dónde puedo descansar?", "¿Qué me recomiendas?"],
    }),
  },
  {
    keywords: ["insignia", "guardian", "guardián", "punto verde", "puntos verdes", "conservacion", "conservación"],
    build: () => ({
      text: "Las insignias de Guardián se desbloquean al escanear tu pulsera NFC en cada sendero temático. Cada especie da puntos verdes que canjeas por experiencias de conservación (tours guiados, kits educativos, siembras).",
      link: { label: "Ver mis Huellas", href: "/huellas" },
      suggestions: ["¿Cuáles especies hay?", "¿Cómo gano puntos verdes?"],
    }),
  },
  {
    keywords: ["anaconda"],
    build: () => ({
      text: "La anaconda es la serpiente más grande del mundo por peso. Habita los Llanos Orientales colombianos. En Piscilago tenemos un sendero temático dedicado a su ecosistema con cooling zones integradas.",
      link: { label: "Conocer Anaconda", href: "/especies/anaconda" },
      suggestions: ["¿Y el caimán?", "¿Dónde queda?"],
    }),
  },
  {
    keywords: ["caiman", "caimán", "llanero"],
    build: () => ({
      text: "El Caimán Llanero está en peligro crítico — quedan menos de 1.500 en libertad. Piscilago participa en programas de cría y reintroducción. Es la especie emblema de nuestra conservación.",
      link: { label: "Conocer Caimán Llanero", href: "/especies/caiman-llanero" },
      suggestions: ["¿Cuáles especies hay?", "Tengo calor"],
    }),
  },
  {
    keywords: ["oso", "anteojos"],
    build: () => ({
      text: "El Oso de Anteojos es el único oso de Suramérica y emblema de los páramos de Cundinamarca. Cada individuo tiene un antifaz único, como una huella dactilar.",
      link: { label: "Conocer Oso de Anteojos", href: "/especies/oso-anteojos" },
      suggestions: ["¿Y el mono araña?", "¿Cómo gano insignias?"],
    }),
  },
  {
    keywords: ["mono", "araña", "arana"],
    build: () => ({
      text: "El Mono Araña Café es endémico de Colombia y figura entre los 25 primates más amenazados del planeta. Habita el dosel del bosque del Magdalena Medio.",
      link: { label: "Conocer Mono Araña", href: "/especies/mono-arana" },
      suggestions: ["¿Cuáles especies hay?", "¿Cómo lo veo?"],
    }),
  },
  {
    keywords: ["tortuga", "hicotea"],
    build: () => ({
      text: "La Tortuga Hicotea es símbolo de los humedales del Caribe. Piscilago libera miles de crías al año para recuperar la especie. Sus crías pesan menos de 10 gramos.",
      link: { label: "Conocer Tortuga Hicotea", href: "/especies/tortuga-hicotea" },
      suggestions: ["¿Cuáles especies hay?", "¿Cómo gano insignias?"],
    }),
  },
  {
    keywords: ["fila", "espera", "cola", "tiempo"],
    build: () => ({
      text: "Los tiempos se actualizan cada 30 segundos. Las atracciones críticas ahora son Pisciflash y Piscitornado. El sistema IA puede redirigirte a alternativas cercanas con menos espera.",
      link: { label: "Ver Filas Inteligentes", href: "/filas" },
      suggestions: ["¿Qué me recomiendas?", "¿Hay reservas?"],
    }),
  },
  {
    keywords: ["pisciflash"],
    build: () => ({
      text: "Pisciflash es la atracción con mayor demanda en este momento (75 min de espera, 190 personas en doble fila). El sistema sugiere alternativas como Río Lento o Piscina Familiar mientras la fila baja.",
      link: { label: "Ver alternativas", href: "/filas" },
      suggestions: ["¿Hay reservas?", "Tengo calor"],
    }),
  },
  {
    keywords: ["reserva", "turno"],
    build: () => ({
      text: "Solo Megatobogán tiene reserva de turnos activa hoy. Próximamente la app habilita reservas para las 5 atracciones críticas según el modelo del proyecto.",
      link: { label: "Reservar turno", href: "/filas" },
      suggestions: ["¿Cuál tiene más fila?", "¿Qué me recomiendas?"],
    }),
  },
  {
    keywords: ["pulsera", "nfc", "saldo", "recargar", "dinero"],
    build: () => ({
      text: "Tu pulsera NFC funciona como pasaporte y medio de pago dentro del parque. Tienes $45.200 de saldo activo. La pulsera también desbloquea insignias al escanear los paneles de los senderos.",
      link: { label: "Ver mi pasaporte", href: "/pasaporte" },
      suggestions: ["¿Cómo gano insignias?", "¿Cómo recargo?"],
    }),
  },
  {
    keywords: ["pasaporte", "cedula", "cédula", "documento", "vincular"],
    build: () => ({
      text: "El pasaporte vincula tu compra con tu cédula y WhatsApp para gestionar entradas desde la app. Ya tienes tu pasaporte cargado y sincronizado con la pulsera NFC.",
      link: { label: "Ver pasaporte", href: "/pasaporte" },
      suggestions: ["¿Quién está en mi grupo?", "¿Cuál es mi saldo?"],
    }),
  },
  {
    keywords: ["mapa", "donde", "dónde", "ubicacion", "ubicación"],
    build: () => ({
      text: "El mapa inteligente muestra todas las atracciones, sus tiempos de espera en colores (verde/amarillo/rojo) y las cooling zones activas. Toca cualquier punto para ver su info.",
      link: { label: "Abrir mapa", href: "/mapa" },
      suggestions: ["¿Qué me recomiendas?", "Tengo calor"],
    }),
  },
  {
    keywords: ["pasos", "caminar", "movilidad", "ejercicio"],
    build: () => ({
      text: "Llevas 3.240 pasos hoy. Al llegar a 2.000 ganas 5% de descuento, a 4.000 ganas 10%, a 6.000 ganas 15% y a 8.000 ganas 25%. Caminar por senderos lejanos suma puntos verdes extra.",
      link: { label: "Ver mi progreso", href: "/huellas" },
      suggestions: ["¿Cómo gano insignias?", "¿Qué hay del sur?"],
    }),
  },
  {
    keywords: ["descuento", "recompensa", "premio", "canjear"],
    build: () => ({
      text: "Tienes dos sistemas: descuentos en alimentos/tienda según pasos del día, y puntos verdes para experiencias de conservación. Las recompensas se canjean en cualquier punto del parque acercando la pulsera.",
      link: { label: "Ver recompensas", href: "/huellas" },
      suggestions: ["¿Cuántos pasos llevo?", "¿Cómo gano puntos verdes?"],
    }),
  },
  {
    keywords: ["grupo", "familia", "hijos", "miembros"],
    build: () => ({
      text: "Tu grupo familiar tiene 3 miembros: DR (tú), LR y MR. Todos están dentro del parque cerca de tu ubicación. Puedes invitar más con un QR desde tu pasaporte.",
      link: { label: "Ver grupo familiar", href: "/pasaporte" },
      suggestions: ["¿Cómo invito a alguien?", "¿Quién tiene saldo bajo?"],
    }),
  },
  {
    keywords: ["hola", "buenas", "hey", "saludo"],
    build: () => ({
      text: "Hola, soy tu asistente Piscilago. Puedo ayudarte a decidir qué atracción visitar, dónde está la zona más fresca, o cómo desbloquear insignias de Guardián. ¿En qué te ayudo?",
      suggestions: ["¿Qué me recomiendas?", "Tengo calor", "¿Cómo gano insignias?"],
    }),
  },
  {
    keywords: ["gracias", "thanks"],
    build: () => ({
      text: "Con gusto. Si necesitas algo más, sigo aquí. Recuerda que toda la información que ves en los paneles de los senderos también está en tu app — sincronizada en tiempo real.",
      suggestions: ["¿Qué me recomiendas?", "¿Cómo gano insignias?"],
    }),
  },
];

const FALLBACK: AssistantResponse = {
  text: "Estamos preparando la integración con IA real para responder cualquier pregunta. Por ahora prueba con: ¿Qué me recomiendas? · Tengo calor · ¿Cómo gano insignias? · ¿Dónde está el Caimán Llanero?",
  suggestions: ["¿Qué me recomiendas?", "Tengo calor", "¿Cómo gano insignias?"],
};

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function respond(input: string): AssistantResponse {
  const q = norm(input);
  for (const p of PATTERNS) {
    if (p.keywords.some((k) => q.includes(norm(k)))) return p.build();
  }
  return FALLBACK;
}

export const INITIAL_SUGGESTIONS = [
  "¿Qué me recomiendas?",
  "Tengo calor",
  "¿Cómo gano insignias?",
  "¿Dónde está la Anaconda?",
];

export const INITIAL_GREETING: AssistantResponse = {
  text: "Hola, soy tu asistente de Piscilago. Te ayudo a decidir qué atracción visitar, dónde refrescarte, o cómo ganar insignias de Guardián. ¿En qué te ayudo?",
  suggestions: INITIAL_SUGGESTIONS,
};
