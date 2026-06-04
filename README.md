# Piscilago 2.0 · v2.8 — Detail + Logros + Timeline

## Cambios principales de v2.8

### Hotfixes
1. **Logo del BrandBar clickeable** → redirige a /home (UX estándar)
2. **FAB del asistente reposicionado** — subido de `bottom-[80px]` a `bottom-[92px]` y removido el ping pulsante que se sobreponía con la BottomNav
3. **ThumbImage con fallback espectacular** — gradient específico por tipo + emoji único por atracción (🐍 Anaconda, ⚡ Pisciflash, 🌪️ Piscitornado, 🌧️ Bosque de Lluvia, 🐙 Piscipulpo, etc.) + patrón SVG sutil. Ya no depende de URLs de Unsplash que no son las reales.

### Features nuevas

4. **Páginas detalle por atracción** (`/atraccion/[id]`) con:
   - Hero con imagen, intensidad y estado de congestión
   - 3 stats grandes: espera, aforo, zona
   - Descripción completa
   - Especificaciones técnicas (altura mín, velocidad, longitud, caída, duración, capacidad, profundidad)
   - Banner de hidratación cercana si aplica
   - Alerta de congestión alta
   - Botón "Reservar turno aquí" (deshabilitado si congestión alta)
   - "Cerca de aquí · Zona X" con 3 atracciones de la misma zona

5. **Sistema de Logros** (en Huellas)
   - 10 logros definidos: Bienvenido, Primera Reserva, Domador de Anaconda, Sin Filas, Explorador, Guardián Novato, Hidratación, Madrugador, Conservador, etc.
   - Cada logro tiene emoji, descripción, puntos
   - Barra de progreso para logros incrementales (5 atracciones, 3 huellas, etc.)
   - Persistencia en localStorage

6. **Timeline de Visita** (en Pasaporte)
   - Sección desplegable "Tu día en Piscilago"
   - 4 stats compactos: atracciones, pasos, insignias, CO₂
   - Timeline vertical con 6 momentos del día (llegada, atracciones, hidratación, huellas)
   - Calificación del día con NPS reportado

## Acumulado

- v2.7.1: Fix de Portal de modales (sin recortes en scroll)
- v2.7: Mis Reservas + Banner turno + Dashboard métricas
- v2.6: Header persistente + 20 atracciones reales del catálogo piscilago.co
- v2.5: Modal de reserva completo + wording mejorado + mapa con reserva

## Rutas

| URL                   | Pantalla                                                |
| --------------------- | ------------------------------------------------------- |
| `/home`               | Inicio con mapa preview + smart layer                   |
| `/mapa`               | Smart map con filtros y reserva                         |
| `/filas`              | Filas Inteligentes priorizadas por IA                   |
| `/huellas`            | Insignias + **Logros** + recompensas                    |
| `/pasaporte`          | Identidad + Pulsera NFC + Mis Reservas + **Timeline**   |
| `/atraccion/[id]`     | **NUEVO** · Detalle de atracción con specs              |
| `/especies/[id]`      | Detalle de especie protegida                            |
| `/panel/[especie]`    | Panel digital del sendero temático                      |
| `/admin`              | Dashboard de operaciones con métricas                   |

## Cómo actualizar GitHub

1. Descomprime `piscilago-v2-v2.8.zip` → carpeta `piscilago-v2`
2. Abre la carpeta · Ctrl+A · arrastra a GitHub
3. Commit: `v2.8 - Detail pages + Logros + Timeline + Hotfixes`
4. Espera 2 min · Vercel auto-despliega

## Stack técnico

Next.js 14 · React 18 · TypeScript estricto · Tailwind CSS · React Portal · lucide-react · Plus Jakarta Sans · LocalStorage · Datos basados en piscilago.co
