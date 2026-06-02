export type Ecosystem = "terrestre" | "sotobosque" | "dosel" | "acuatico";

export interface Species {
  id: string;
  name: string;
  scientific: string;
  ecosystem: Ecosystem;
  ecosystemLabel: string;
  conservationStatus: "vulnerable" | "amenazada" | "casi-amenazada" | "preocupacion-menor";
  conservationLabel: string;
  region: string;
  shortFact: string;
  description: string;
  funFacts: string[];
  imageUrl: string;
  thumbnailUrl: string;
  zoneColor: string;
  badgeIcon: string;
  greenPointsReward: number;
  senderoId: string;
}

export const SPECIES: Species[] = [
  {
    id: "anaconda",
    name: "Anaconda",
    scientific: "Eunectes murinus",
    ecosystem: "acuatico",
    ecosystemLabel: "Acuático",
    conservationStatus: "preocupacion-menor",
    conservationLabel: "Programa de conservación",
    region: "Llanos Orientales · Casanare",
    shortFact: "La serpiente más grande del mundo por peso",
    description:
      "La anaconda verde es uno de los reptiles más impresionantes de Suramérica. Habita en ríos lentos, ciénagas y zonas inundables de los Llanos Orientales colombianos. Puede alcanzar hasta 9 metros de longitud y vive en armonía con los ecosistemas de humedal del país.",
    funFacts: [
      "Puede contener la respiración hasta por 10 minutos bajo el agua",
      "Es vivípara: nacen entre 20 y 40 crías por camada",
      "Indicador de salud del humedal donde habita",
    ],
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=300&q=70",
    zoneColor: "#00897B",
    badgeIcon: "waves",
    greenPointsReward: 25,
    senderoId: "anaconda",
  },
  {
    id: "caiman-llanero",
    name: "Caimán Llanero",
    scientific: "Crocodylus intermedius",
    ecosystem: "acuatico",
    ecosystemLabel: "Acuático",
    conservationStatus: "amenazada",
    conservationLabel: "En peligro crítico",
    region: "Río Meta · Orinoquía colombiana",
    shortFact: "Especie emblemática en peligro crítico de extinción",
    description:
      "El caimán llanero es uno de los cocodrilos más amenazados del mundo. Endémico de la cuenca del Orinoco, hoy quedan menos de 1.500 individuos en libertad. Piscilago forma parte de programas de cría y reintroducción que han salvado a esta especie de la extinción.",
    funFacts: [
      "Quedan menos de 1.500 ejemplares silvestres en Colombia y Venezuela",
      "Puede medir hasta 7 metros, el reptil más grande de los Llanos",
      "Es ingeniero ecológico: sus madrigueras dan refugio a otras especies",
    ],
    imageUrl: "https://images.unsplash.com/photo-1599639957043-9c01b5e80aa1?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1599639957043-9c01b5e80aa1?w=300&q=70",
    zoneColor: "#2E7D32",
    badgeIcon: "shield",
    greenPointsReward: 40,
    senderoId: "caiman-llanero",
  },
  {
    id: "oso-anteojos",
    name: "Oso de Anteojos",
    scientific: "Tremarctos ornatus",
    ecosystem: "dosel",
    ecosystemLabel: "Bosque andino",
    conservationStatus: "vulnerable",
    conservationLabel: "Especie vulnerable",
    region: "Cordillera Oriental · Cundinamarca",
    shortFact: "Único oso nativo de Suramérica",
    description:
      "El oso de anteojos es el único oso que habita en Suramérica y es emblema de la conservación andina. Lo identifica un característico antifaz blanco alrededor de los ojos. Habita los bosques de niebla cerca a Bogotá y es un indicador clave del estado de los páramos colombianos.",
    funFacts: [
      "Cada individuo tiene un patrón de antifaz único, como una huella",
      "Es predominantemente vegetariano: 95% de su dieta son plantas",
      "Su presencia indica un páramo sano que regula el agua de Bogotá",
    ],
    imageUrl: "https://images.unsplash.com/photo-1525869916826-d2b8c01a6c95?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1525869916826-d2b8c01a6c95?w=300&q=70",
    zoneColor: "#5D4037",
    badgeIcon: "mountain",
    greenPointsReward: 35,
    senderoId: "oso-anteojos",
  },
  {
    id: "mono-arana",
    name: "Mono Araña Café",
    scientific: "Ateles hybridus",
    ecosystem: "dosel",
    ecosystemLabel: "Dosel del bosque",
    conservationStatus: "amenazada",
    conservationLabel: "Críticamente amenazada",
    region: "Magdalena Medio · Cundinamarca",
    shortFact: "Uno de los primates más amenazados del mundo",
    description:
      "El mono araña café es endémico de Colombia y Venezuela y figura entre los 25 primates más amenazados del planeta. Vive exclusivamente en el dosel de bosques húmedos, donde se desplaza colgándose de los árboles con sus largos brazos y cola prensil.",
    funFacts: [
      "Su cola funciona como una quinta extremidad para sostenerlo en árboles",
      "Vive en grupos sociales de 20 a 30 individuos",
      "La pérdida de bosque amenaza directamente su supervivencia",
    ],
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=70",
    zoneColor: "#E65100",
    badgeIcon: "tree-pine",
    greenPointsReward: 40,
    senderoId: "mono-arana",
  },
  {
    id: "tortuga-hicotea",
    name: "Tortuga Hicotea",
    scientific: "Trachemys callirostris",
    ecosystem: "acuatico",
    ecosystemLabel: "Humedales",
    conservationStatus: "vulnerable",
    conservationLabel: "Especie vulnerable",
    region: "Caribe colombiano · Magdalena Medio",
    shortFact: "Reptil símbolo de los humedales del Caribe",
    description:
      "La tortuga hicotea es una tortuga semiacuática endémica del norte de Suramérica. Ha sido tradicionalmente consumida por comunidades locales, lo que ha reducido drásticamente sus poblaciones. Programas como el de Piscilago liberan miles de crías al año para recuperar la especie.",
    funFacts: [
      "Sus crías pesan menos de 10 gramos al nacer",
      "Puede vivir más de 30 años en su hábitat natural",
      "Las hembras anidan en bancos de arena durante la temporada seca",
    ],
    imageUrl: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=300&q=70",
    zoneColor: "#558B2F",
    badgeIcon: "shell",
    greenPointsReward: 30,
    senderoId: "tortuga-hicotea",
  },
];

export function speciesById(id: string): Species | undefined {
  return SPECIES.find((s) => s.id === id);
}
