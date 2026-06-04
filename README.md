# Piscilago 2.0 · v2.7.1 — Modal Portal Fix

## 🔧 Hotfix v2.7.1

**Bug corregido**: Los modales (Reserva, Notificaciones, Asistente, Tour, Accesibilidad, Confirmar) aparecían cortados o desplazados cuando había scroll en la pantalla. Causa: estaban renderizados dentro del contenedor scrollable y heredaban su clipping.

**Solución**: Implementación de **React Portal** con un layer dedicado (`#phone-modal-root`) fuera del scroll del `<main>`. Ahora TODOS los modales aparecen perfectamente centrados sobre el phone shell sin importar el scroll position.

Archivos afectados:
- `components/shell/PhoneShell.tsx` — agrega div target del portal
- `components/common/PhonePortal.tsx` — helper nuevo con createPortal
- `components/common/ReservationModal.tsx` — usa portal
- `components/common/NotificationsPanel.tsx` — panel usa portal
- `components/common/OnboardingGuide.tsx` — usa portal
- `components/common/FloatingAssistant.tsx` — modal del asistente usa portal
- `components/common/BrandBar.tsx` — panel accesibilidad usa portal
- `components/common/ConfirmDialog.tsx` — usa portal

## Lo que se acumula de v2.7

- Mis Reservas en Pasaporte con código PSL, countdown y simulación de turno
- Banner "Tu turno es ahora" persistente en todas las pantallas
- Dashboard `/admin` con métricas proyectadas y matriz Hallazgo EAN → Solución

## Lo que se acumula de v2.6

- Header persistente con logo Piscilago en TODAS las pantallas
- 20 atracciones REALES del catálogo oficial piscilago.co
- Onboarding 6 slides incluyendo Pulsera NFC y transparencia ética

## Lo que se acumula de v2.5

- Modal de reserva con formulario completo (personas/hora/accesibilidad/comentarios)
- Wording "Disponible" + mensajes promocionales
- Mapa con filtro Hidratación + Ver disponibles + reserva integrada
- Huellas de Conservación con CO₂ ahorrado

## Demo end-to-end para sustentación

1. **Filas**: tap "Reservar turno" en cualquier atracción → modal completo aparece **CENTRADO Y BIEN POSICIONADO** sin importar el scroll
2. Confirma reserva → código PSL generado
3. **Pasaporte**: scroll a "Mis Reservas" → ahí está tu turno
4. Pulsa "Simular turno (demo)" → banner verde aparece arriba en TODAS las pantallas
5. Vuelve al Pasaporte → "Validar" → reserva completada
6. Tap campanita (notificaciones) → panel desliza desde arriba **SIN CORTARSE**
7. Tap asistente IA → panel desliza desde abajo **PERFECTAMENTE**
8. Ve a `/admin` → métricas proyectadas + matriz de cobertura

## Cómo actualizar GitHub

1. Descomprime `piscilago-v2-v2.7.1.zip` → carpeta `piscilago-v2`
2. **Abre la carpeta `piscilago-v2`** doble-click
3. `github.com/Brandonscm/piscilago-v2` → **Add file** → **Upload files**
4. Selecciona TODO el contenido (Ctrl+A)
5. Arrastra al área de upload
6. Commit message: `v2.7.1 - Hotfix: Modal Portal para fix de scroll`
7. **Commit changes**
8. Vercel auto-despliega en 2-3 minutos

## Stack técnico

Next.js 14 · React 18 · TypeScript estricto · Tailwind CSS · React Portal · lucide-react · Plus Jakarta Sans · LocalStorage · Datos basados en piscilago.co
