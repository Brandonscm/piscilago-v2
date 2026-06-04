# Piscilago 2.0 · v2.4 — Badges NUEVO + Fixes Finales

Evolución oficial de la app Piscilago Colsubsidio para sustentación de Maestría en Gerencia de Proyectos · Universidad EAN.

## Cambios principales de v2.4

1. **Badges "NUEVO" visibles** — todo lo que NO existe en la app oficial ahora tiene una pill amarilla. El jurado puede identificar a simple vista la evolución
2. **Accesibilidad reubicada en el header** — botón al lado del bell, integrado dentro del AppHeader. Imposible que se solape con la campana
3. **Imágenes con fallback elegante** — si una imagen de Unsplash no carga, se muestra un gradient con emoji y nombre de la atracción. Cero broken images
4. **Tooltips ULTRA visibles** — pasaron de ser pequeños círculos azul claro a círculos AQUA brillantes con ícono HelpCircle. Imposible no verlos
5. **FAB asistente con badge NUEVO** — botón más equilibrado en tamaño con pill amarilla "NUEVO" arriba a la izquierda
6. **Padding del Home aumentado** — el FAB ya no tapa contenido importante (VER INSIGNIAS, VER TODAS)

## Dónde aparecen los badges NUEVO

| Elemento                          | Tipo de badge    |
| --------------------------------- | ---------------- |
| Tab "Filas" en nav inferior       | Dot amarillo     |
| Tab "Huellas" en nav inferior     | Dot amarillo     |
| Botón de Accesibilidad (header)   | Pill "NUEVO"     |
| Título "Inteligencia en vivo"     | Pill "NUEVO"     |
| Card de "Pasos hoy"               | Pill "NUEVO"     |
| Card de "Insignias de Guardián"   | Pill "NUEVO"     |
| Botón flotante del Asistente      | Pill "NUEVO"     |
| Panel de Accesibilidad abierto    | Pill "NUEVO"     |

## Rutas

| URL                  | Pantalla                                                |
| -------------------- | ------------------------------------------------------- |
| `/home`              | Inicio con logo Piscilago, mapa preview, smart layer    |
| `/mapa`              | Smart map con tiempos en vivo y filtros                 |
| `/filas`             | Filas Inteligentes priorizadas por IA · NUEVO           |
| `/huellas`           | Insignias de Guardián + puntos verdes · NUEVO           |
| `/pasaporte`         | Identidad oficial + Pulsera NFC + saldo + grupo         |
| `/especies/[id]`     | Detalle de especie protegida                            |
| `/panel/[especie]`   | Panel digital del sendero temático (proyección física)  |
| `/admin`             | Dashboard de operaciones                                |

## Cómo actualizar el repo en GitHub

1. Descomprime `piscilago-v2-v2.4.zip`
2. Abre la carpeta `piscilago-v2` resultante
3. Ve a `github.com/Brandonscm/piscilago-v2` → **Add file** → **Upload files**
4. Selecciona TODO el contenido de la carpeta `piscilago-v2` (Ctrl+A) y arrastra a GitHub
5. NO arrastres la carpeta completa, NI el archivo .zip — solo el contenido
6. Commit message: `v2.4 - Badges NUEVO + fixes definitivos`
7. Click **Commit changes**
8. Vercel auto-despliega en 2-3 minutos

## Stack técnico

Next.js 14 · React 18 · TypeScript estricto · Tailwind CSS · lucide-react · Plus Jakarta Sans · LocalStorage para preferencias de accesibilidad
