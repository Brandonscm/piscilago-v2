export type AttractionType = "tobogan" | "piscina" | "rio" | "infantil" | "lago" | "servicio" | "conservacion";
export type Zone = "norte" | "sur" | "centro" | "este" | "oeste";

export interface AttractionSpec {
  alturaMin?: number;
  duracionSeg?: number;
  velocidadKmh?: number;
  capacidad?: number;
  profundidadMin?: number;
  profundidadMax?: number;
  longitudM?: number;
  caidaM?: number;
}

export interface Attraction {
  id: string;
  name: string;
  type: AttractionType;
  zone: Zone;
  baseWaitMin: number;
  baseOccupancy: number;
  capacity: number;
  hasCoolingZone: boolean;
  hasReservation: boolean;
  intensity: "baja" | "media" | "alta" | "extrema";
  description: string;
  shortFact?: string;
  spec: AttractionSpec;
  imageUrl: string;
  iconType: "tobogan" | "piscina" | "rio" | "servicio";
  position: { x: number; y: number };
}

export const ATTRACTIONS: Attraction[] = [
  { id: "pisciflash", name: "Pisciflash", type: "tobogan", zone: "centro", baseWaitMin: 75, baseOccupancy: 95, capacity: 120, hasCoolingZone: false, hasReservation: false, intensity: "extrema", description: "Supertobogán pro-racer de 4 carriles simultáneos, 100 metros de recorrido, 200 galones de agua por minuto, alcanzando 50 km/h desde 20 metros de altura.", shortFact: "El más rápido del parque", spec: { alturaMin: 130, velocidadKmh: 50, longitudM: 100, caidaM: 20, capacidad: 4 }, imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 280, y: 200 } },
  { id: "piscitornado", name: "Piscitornado", type: "tobogan", zone: "este", baseWaitMin: 60, baseOccupancy: 88, capacity: 90, hasCoolingZone: false, hasReservation: false, intensity: "extrema", description: "Tobogán de derroche de adrenalina. En tan solo 4 segundos y a 40 km/h, caída de 12 metros hacia una piscina de 2.20m de profundidad.", shortFact: "Caída de 12m en 4 segundos", spec: { alturaMin: 130, duracionSeg: 4, velocidadKmh: 40, caidaM: 12, profundidadMax: 2.2 }, imageUrl: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 440, y: 180 } },
  { id: "onda-extrema", name: "Onda Extrema", type: "tobogan", zone: "centro", baseWaitMin: 55, baseOccupancy: 85, capacity: 80, hasCoolingZone: false, hasReservation: false, intensity: "extrema", description: "Imponentes muros curvos con tecnología que permite sentir gravedad cero por segundos, igual que los astronautas. Una de las únicas 8 atracciones de este tipo en el mundo.", shortFact: "Sensación de gravedad cero", spec: { alturaMin: 130, capacidad: 4 }, imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 240, y: 280 } },
  { id: "anaconda", name: "Anaconda", type: "tobogan", zone: "sur", baseWaitMin: 40, baseOccupancy: 78, capacity: 100, hasCoolingZone: true, hasReservation: false, intensity: "alta", description: "Atracción acuática gigante que atraviesa el bosque seco tropical. Sus curvas inesperadas crean la sensación de deslizarse dentro de un río indomable. Flotador para 3 personas.", shortFact: "180m sobre flotador familiar", spec: { alturaMin: 110, longitudM: 180, capacidad: 4 }, imageUrl: "https://images.unsplash.com/photo-1604335078690-ce8a93d9d846?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 180, y: 580 } },
  { id: "megatobogan", name: "Megatobogán", type: "tobogan", zone: "norte", baseWaitMin: 45, baseOccupancy: 80, capacity: 90, hasCoolingZone: false, hasReservation: true, intensity: "media", description: "El tobogán más largo del parque: 504 metros de longitud, 3 metros de ancho, con 27 curvas y 3 túneles. Diseñado para toda la familia con descensos amplios.", shortFact: "504m, el más largo del parque", spec: { alturaMin: 110, longitudM: 504, capacidad: 4 }, imageUrl: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 320, y: 100 } },
  { id: "pisciclon", name: "Pisciclón", type: "tobogan", zone: "oeste", baseWaitMin: 35, baseOccupancy: 72, capacity: 85, hasCoolingZone: false, hasReservation: false, intensity: "alta", description: "Dos toboganes idénticos de 96 metros con 3 caídas libres hasta la meta. Ideal para quienes buscan competir contra amigos o familia.", shortFact: "96m con 3 caídas libres", spec: { alturaMin: 120, longitudM: 96 }, imageUrl: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 100, y: 380 } },
  { id: "piscihuracanes", name: "Piscihuracanes", type: "tobogan", zone: "norte", baseWaitMin: 30, baseOccupancy: 70, capacity: 80, hasCoolingZone: false, hasReservation: false, intensity: "extrema", description: "Huracanes Tantrum: uno de los toboganes más altos de Colombia. 125 metros de recorrido, caída de 2 metros con ángulo de 45° para sentir la energía pura del agua.", shortFact: "Ángulo de caída 45°", spec: { alturaMin: 130, longitudM: 125, caidaM: 2 }, imageUrl: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 420, y: 100 } },
  { id: "pisciloca", name: "Pisciloca", type: "tobogan", zone: "centro", baseWaitMin: 25, baseOccupancy: 68, capacity: 60, hasCoolingZone: true, hasReservation: false, intensity: "media", description: "Atracción con barcas tipo tronquito estilo montaña rusa acuática. Capacidad de 4 pasajeros recorriendo curvas, alturas y caídas con agua.", shortFact: "Montaña rusa acuática familiar", spec: { capacidad: 4 }, imageUrl: "https://images.unsplash.com/photo-1564222576-d23eb29e2c70?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 360, y: 280 } },
  { id: "piscigiros", name: "Piscigiros", type: "tobogan", zone: "este", baseWaitMin: 20, baseOccupancy: 65, capacity: 70, hasCoolingZone: false, hasReservation: false, intensity: "alta", description: "Tobogán con giros inesperados que crean la sensación de pérdida de equilibrio y velocidad. Diversión asegurada en cada curva.", spec: { alturaMin: 120 }, imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 480, y: 280 } },
  { id: "piscipulpo", name: "Piscipulpo", type: "tobogan", zone: "sur", baseWaitMin: 18, baseOccupancy: 62, capacity: 65, hasCoolingZone: true, hasReservation: false, intensity: "media", description: "Atracción con forma de pulpo gigante con múltiples toboganes que salen de un mismo centro. Diversión paralela con distintos niveles.", spec: { alturaMin: 110 }, imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=70&auto=format&fit=crop", iconType: "tobogan", position: { x: 240, y: 620 } },
  { id: "bosque-lluvia", name: "Bosque de Lluvia", type: "rio", zone: "sur", baseWaitMin: 15, baseOccupancy: 60, capacity: 120, hasCoolingZone: true, hasReservation: false, intensity: "baja", description: "Atracción acuática familiar con 4 toboganes y una cascada de 12 metros que deja caer 1.000 litros de agua sobre ti. Plan ideal para todas las edades.", shortFact: "Cascada de 1.000 litros", spec: { caidaM: 12 }, imageUrl: "https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?w=400&q=70&auto=format&fit=crop", iconType: "rio", position: { x: 120, y: 580 } },
  { id: "parque-acuatico-infantil", name: "Parque Acuático Infantil", type: "infantil", zone: "centro", baseWaitMin: 5, baseOccupancy: 55, capacity: 150, hasCoolingZone: true, hasReservation: false, intensity: "baja", description: "Área diseñada especialmente para los más pequeños. Profundidad de 0.3m a 0.5m, juegos interactivos y vigilancia constante para que los niños disfruten con seguridad.", shortFact: "Profundidad máxima 0.5m", spec: { profundidadMin: 0.3, profundidadMax: 0.5 }, imageUrl: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=400&q=70&auto=format&fit=crop", iconType: "piscina", position: { x: 300, y: 460 } },
  { id: "piscina-las-fuentes", name: "Piscina Las Fuentes", type: "piscina", zone: "centro", baseWaitMin: 0, baseOccupancy: 50, capacity: 300, hasCoolingZone: true, hasReservation: false, intensity: "baja", description: "Área de esparcimiento familiar con espacio para sillas, sombrillas y baños de sol. Profundidad de 0.90m a 1.70m.", spec: { profundidadMin: 0.9, profundidadMax: 1.7 }, imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=70&auto=format&fit=crop", iconType: "piscina", position: { x: 280, y: 380 } },
  { id: "piscina-el-mirador", name: "Piscina El Mirador", type: "piscina", zone: "norte", baseWaitMin: 0, baseOccupancy: 45, capacity: 250, hasCoolingZone: true, hasReservation: false, intensity: "baja", description: "Piscina con vista panorámica del bosque seco tropical. Ideal para relajarse mientras se disfruta del paisaje y la naturaleza.", spec: { profundidadMin: 0.9, profundidadMax: 1.5 }, imageUrl: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=400&q=70&auto=format&fit=crop", iconType: "piscina", position: { x: 380, y: 80 } },
  { id: "piscina-olas", name: "Piscina de Olas", type: "piscina", zone: "centro", baseWaitMin: 8, baseOccupancy: 70, capacity: 400, hasCoolingZone: true, hasReservation: false, intensity: "media", description: "Piscina con olas artificiales programadas. Simula la experiencia de playa con seguridad y diversión para toda la familia.", spec: { profundidadMax: 1.8 }, imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=70&auto=format&fit=crop", iconType: "piscina", position: { x: 200, y: 460 } },
  { id: "lago", name: "Lago", type: "lago", zone: "este", baseWaitMin: 10, baseOccupancy: 40, capacity: 80, hasCoolingZone: false, hasReservation: false, intensity: "baja", description: "Paseos inolvidables en el lago central del parque. Una experiencia de tranquilidad rodeada de naturaleza.", spec: {}, imageUrl: "https://images.unsplash.com/photo-1605547569103-9c7c1bcec812?w=400&q=70&auto=format&fit=crop", iconType: "rio", position: { x: 460, y: 460 } },
  { id: "bicicletas-acuaticas", name: "Bicicletas Acuáticas", type: "lago", zone: "este", baseWaitMin: 12, baseOccupancy: 45, capacity: 60, hasCoolingZone: false, hasReservation: false, intensity: "baja", description: "Pedalea sobre el lago en bicicletas acuáticas. Plan ideal en pareja o familia para disfrutar del paisaje a tu ritmo.", spec: { capacidad: 2 }, imageUrl: "https://images.unsplash.com/photo-1605547569103-9c7c1bcec812?w=400&q=70&auto=format&fit=crop", iconType: "rio", position: { x: 460, y: 520 } },
  { id: "piscitranvia", name: "Piscitranvía", type: "lago", zone: "centro", baseWaitMin: 5, baseOccupancy: 30, capacity: 200, hasCoolingZone: false, hasReservation: false, intensity: "baja", description: "Recorrido por todo el parque en el tranvía oficial. Conecta las principales atracciones y descansas durante el trayecto.", spec: { capacidad: 40 }, imageUrl: "https://images.unsplash.com/photo-1572807762434-e0a96d75c2eb?w=400&q=70&auto=format&fit=crop", iconType: "servicio", position: { x: 200, y: 700 } },
  { id: "restaurante-central", name: "Restaurante Central", type: "servicio", zone: "centro", baseWaitMin: 0, baseOccupancy: 35, capacity: 500, hasCoolingZone: false, hasReservation: false, intensity: "baja", description: "Restaurante principal con menú variado: carne, alitas BBQ, pollo, mojarra y opciones vegetarianas.", spec: {}, imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70&auto=format&fit=crop", iconType: "servicio", position: { x: 280, y: 720 } },
  { id: "area-conservacion", name: "Área de Conservación", type: "conservacion", zone: "norte", baseWaitMin: 0, baseOccupancy: 30, capacity: 200, hasCoolingZone: true, hasReservation: false, intensity: "baja", description: "Programa de conservación con 130 especies bajo cuidado profesional y más de 250 viviendo en libertad. Incluye senderos temáticos por especie con paneles digitales NFC.", shortFact: "130 especies protegidas", spec: {}, imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=70&auto=format&fit=crop", iconType: "servicio", position: { x: 360, y: 580 } },
];

export function attractionById(id: string): Attraction | undefined {
  return ATTRACTIONS.find((a) => a.id === id);
}

export type CongestionLevel = "low" | "medium" | "high";

export function getCongestion(occupancyPct: number, waitMin: number): CongestionLevel {
  if (occupancyPct >= 85 || waitMin >= 45) return "high";
  if (occupancyPct >= 65 || waitMin >= 20) return "medium";
  return "low";
}
