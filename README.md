# Piscilago 2.0 · v2.6 — Pro Edition

Evolución oficial de la app Piscilago Colsubsidio. Desarrollado para sustentación de Maestría en Gerencia de Proyectos · Universidad EAN.

## Cambios principales de v2.6

1. **Header persistente con marca Piscilago** en TODAS las pantallas. El logo nunca desaparece. BrandBar slim con logo + acceso a accesibilidad + notificaciones, sticky en la parte superior del scroll.

2. **Atracciones REALES del catálogo oficial Piscilago** — 20 atracciones con nombres y especificaciones verídicas extraídas del sitio piscilago.co: Pisciflash, Piscitornado, Anaconda, Onda Extrema, Megatobogán, Pisciclón, Piscihuracanes, Pisciloca, Piscigiros, Piscipulpo, Bosque de Lluvia, Parque Acuático Infantil, Piscina Las Fuentes, Piscina El Mirador, Piscina de Olas, Lago, Bicicletas Acuáticas, Piscitranvía, Restaurante Central, Área de Conservación.

3. **Datos verídicos por atracción** — altura mínima, longitud, caída en metros, velocidad km/h, duración, profundidad, capacidad de flotador, intensidad (baja/media/alta/extrema).

4. **Slide nuevo en el Onboarding: "Tu Pulsera NFC"** — explica el rol de la pulsera como reemplazo de ticket + billetera + cédula dentro del parque, su uso en lectores NFC para pagos, validaciones, insignias e hidratación, y la transparencia ética sobre los datos que captura.

5. **6 slides totales en el onboarding**: Bienvenida, Filas Inteligentes, Huellas de Conservación, Hidratación y sombra, **Tu Pulsera NFC**, Asistente Piscilago. Auto-show la primera vez + accesible desde Accesibilidad → "Tour de la app".

## Lo que se acumula de v2.5 (no se ha desplegado aún)

- Modal de reserva con datos completos (personas, hora, accesibilidad, comentarios)
- Wording "Disponible" + mensajes promocionales
- "Datos en tiempo real" en vez de "Actualizado hace 0s"
- Mensaje motivacional dinámico en Huellas según progreso
- CO₂ ahorrado pequeño en Huellas
- Mapa con reserva integrada + botón "Ver disponibles"
- Filtro "Hidratación" con panel explicativo

## Rutas

| URL                  | Pantalla                                                |
| -------------------- | ------------------------------------------------------- |
| `/home`              | Inicio con logo Piscilago, mapa preview, smart layer    |
| `/mapa`              | Smart map con hidratación + ver disponibles + reservar  |
| `/filas`             | Filas Inteligentes priorizadas por IA · NUEVO           |
| `/huellas`           | Insignias de Guardián + CO₂ + mensajes motivacionales   |
| `/pasaporte`         | Identidad oficial + Pulsera NFC + saldo + grupo         |
| `/especies/[id]`     | Detalle de especie protegida                            |
| `/panel/[especie]`   | Panel digital del sendero temático                      |
| `/admin`             | Dashboard de operaciones                                |

## Ideas para próximas versiones (no implementadas aún)

- Páginas detalle por atracción `/atraccion/[id]` con specs completas
- Estado abierto/cerrado según horario del parque
- Indicador UV/Clima con sugerencia dinámica de hidratación
- Grupo familiar en el mapa (ubicación de cada pulsera)
- Timeline de visita ("hoy hiciste 3 atracciones · 4.200 pasos")
- Sistema de logros ("Tu primera Anaconda", "5 atracciones en un día")
- Modo offline con cache
- Foto del recuerdo (descarga foto del tobogán al escanear pulsera)

## Cómo actualizar el repositorio en GitHub

1. Descomprime `piscilago-v2-v2.6.zip` → carpeta `piscilago-v2`
2. **Abre la carpeta `piscilago-v2`** doble-click
3. `github.com/Brandonscm/piscilago-v2` → **Add file** → **Upload files**
4. Dentro de `piscilago-v2` selecciona TODO el contenido (Ctrl+A)
5. Arrastra al área de upload. NO la carpeta entera, NI el .zip
6. Commit message: `v2.6 - Pro Edition: header persistente + atracciones reales + NFC`
7. **Commit changes**
8. Vercel auto-despliega en 2-3 minutos

## Stack técnico

Next.js 14 · React 18 · TypeScript estricto · Tailwind CSS · lucide-react · Plus Jakarta Sans · LocalStorage para accesibilidad + onboarding · Datos basados en piscilago.co
