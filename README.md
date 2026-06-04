# Piscilago 2.0 · v2.7 — Sustentación Edition

Evolución oficial de la app Piscilago Colsubsidio. Desarrollado para sustentación de Maestría en Gerencia de Proyectos · Universidad EAN.

## Cambios principales de v2.7 (gaps de sustentación cerrados)

1. **Mis Reservas en Pasaporte** — sección desplegable que muestra todas tus reservas con código PSL, contador hasta el turno, estado (pendiente/activa/completada), botón "Simular turno (demo)" para sustentación en vivo, y opción de cancelar.

2. **Banner "Tu turno es ahora"** — banner verde persistente en la parte superior de TODAS las pantallas cuando hay una reserva activa. Pulsa con animación de campana, muestra atracción + código PSL, y enlaza directo al Pasaporte.

3. **Dashboard de Operaciones avanzado** (`/admin`) — ahora incluye:
   - Indicadores en tiempo real (espera promedio vs baseline, congestionadas, cobertura de hallazgos EAN)
   - **Métricas proyectadas a 6 meses** con barras de progreso: tiempo de espera 28→17 min, NPS +37→+55, adopción 0→60%, atracciones con cero fila 27→15%
   - **Matriz de Cobertura Hallazgo EAN → Solución App** con porcentaje por cada uno de los 8 hallazgos críticos
   - Grid de atracciones operativas con código de color por congestión

4. **Persistencia con localStorage** — las reservas sobreviven al refrescar la app.

## Lo que se acumula de v2.6 / v2.5 / v2.0

- Header persistente con logo Piscilago en todas las pantallas
- 20 atracciones reales del catálogo oficial piscilago.co
- Onboarding 6 slides incluyendo Pulsera NFC y transparencia ética
- Modal de reserva completo (personas/hora/accesibilidad/comentarios)
- Wording "Disponible" + mensajes promocionales
- "Datos en tiempo real"
- Mapa con filtro Hidratación + Ver disponibles + reserva integrada
- Huellas de Conservación con CO₂ y mensaje motivacional dinámico
- Asistente IA conversacional 18 patrones
- Accesibilidad WCAG (3 tamaños texto, contraste, motion)

## Rutas

| URL                  | Pantalla                                                |
| -------------------- | ------------------------------------------------------- |
| `/home`              | Inicio con logo Piscilago, mapa preview, smart layer    |
| `/mapa`              | Smart map con hidratación + ver disponibles + reservar  |
| `/filas`             | Filas Inteligentes priorizadas por IA                   |
| `/huellas`           | Insignias de Guardián + CO₂ + mensajes motivacionales   |
| `/pasaporte`         | Identidad oficial + Pulsera NFC + Mis Reservas          |
| `/especies/[id]`     | Detalle de especie protegida                            |
| `/panel/[especie]`   | Panel digital del sendero temático                      |
| `/admin`             | Dashboard de operaciones con métricas proyectadas       |

## Demo para sustentación

1. Ve a Filas o Mapa → reserva un turno en cualquier atracción
2. Aparece código PSL-XXXX-XX y notificación de éxito
3. Ve a Pasaporte → ahí está tu reserva en "Mis Reservas"
4. Pulsa "Simular turno (demo)" → aparece banner verde "Tu turno es ahora" arriba en TODAS las pantallas
5. Vuelve al Pasaporte → la reserva está en estado "activa"
6. Pulsa "Validar" → la reserva pasa a completada y desaparece el banner
7. Ve a `/admin` → ahí están las métricas proyectadas y cobertura

## Cómo actualizar el repositorio en GitHub

1. Descomprime `piscilago-v2-v2.7.zip` → carpeta `piscilago-v2`
2. **Abre la carpeta `piscilago-v2`** doble-click
3. `github.com/Brandonscm/piscilago-v2` → **Add file** → **Upload files**
4. Dentro de `piscilago-v2` selecciona TODO el contenido (Ctrl+A)
5. Arrastra al área de upload
6. Commit message: `v2.7 - Sustentación: Mis Reservas + Métricas + Banner turno`
7. **Commit changes**
8. Vercel auto-despliega en 2-3 minutos

## Stack técnico

Next.js 14 · React 18 · TypeScript estricto · Tailwind CSS · lucide-react · Plus Jakarta Sans · LocalStorage para 4 features (a11y, onboarding, accesibilidad, reservas) · Datos basados en piscilago.co
