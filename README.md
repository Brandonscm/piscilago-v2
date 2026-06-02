# Piscilago 2.0 · Versión Inteligente

Evolución oficial de la app de Piscilago Colsubsidio con sistema inteligente de gestión de filas, recompensas por movilidad y programa de Guardianes de Conservación. Desarrollado para la sustentación de Maestría en Gerencia de Proyectos · Universidad EAN.

## Rutas del prototipo

**Tabs principales del visitante**

| URL              | Pantalla                                                    |
| ---------------- | ----------------------------------------------------------- |
| `/home`          | Inicio con logo Piscilago, mapa preview, smart layer        |
| `/mapa`          | Smart map con tiempos en vivo y filtros                     |
| `/filas`         | Filas Inteligentes priorizadas por IA                       |
| `/huellas`       | Insignias de Guardián + puntos verdes + recompensas         |
| `/pasaporte`     | Identidad oficial + Pulsera NFC + saldo + grupo             |

**Rutas dinámicas y operación**

| URL                    | Pantalla                                                  |
| ---------------------- | --------------------------------------------------------- |
| `/especies/[id]`       | Detalle de especie (anaconda, caiman-llanero, etc.)       |
| `/panel/[especie]`     | Panel digital del sendero temático (proyección física)    |
| `/admin`               | Dashboard de operaciones del parque                       |

**Especies disponibles**: `anaconda`, `caiman-llanero`, `oso-anteojos`, `mono-arana`, `tortuga-hicotea`

## Cómo actualizar el repositorio existente en GitHub

Si ya tienes la versión 1.0 desplegada en Vercel, este es el procedimiento más simple para actualizarla a v2.0 sin perder la URL ni reconfigurar Vercel.

### Opción A — Reemplazar archivos vía GitHub web (recomendada, 5 min)

1. Entra a tu repositorio `github.com/Brandonscm/piscilago-v2`
2. Click en **Add file** arriba a la derecha → **Upload files**
3. Descomprime el nuevo zip y arrastra TODO su contenido al área de upload
4. GitHub te avisará que algunos archivos ya existen — eso es esperado, los va a sobrescribir
5. Al final, en "Commit changes" escribe: `Update to v2.0 - branding oficial + insignias de Guardian + senderos tematicos`
6. Click **Commit changes**

Vercel detecta el push automáticamente y despliega la nueva versión en 2-3 minutos. Tu URL `piscilago-v2.vercel.app` no cambia, solo se actualiza el contenido.

### Opción B — Borrar repo y volver a subir

Si la opción A te trae conflictos:

1. En GitHub, ve a tu repo → **Settings** → baja al final → **Delete this repository**
2. Confirma escribiendo el nombre del repo
3. Crea uno nuevo con el mismo nombre `piscilago-v2`
4. Sube el zip nuevo como hiciste la primera vez
5. En Vercel ve a tu proyecto → **Settings** → **Git** → reconecta al nuevo repo (si fuera necesario)

## Stack técnico

- Next.js 14 (App Router) con TypeScript estricto
- Tailwind CSS con paleta extendida: Colsubsidio blue + sun yellow + wild magenta
- lucide-react para iconos
- Plus Jakarta Sans como tipografía
- Sin backend: datos en vivo simulados por hooks de React

## Sistema de marca extendido

| Color    | Uso                                                  | Hex base |
| -------- | ---------------------------------------------------- | -------- |
| `col`    | Azul institucional Colsubsidio (primario)            | `#003478`|
| `sun`    | Amarillo para CTAs principales y acciones clave      | `#FFB300`|
| `wild`   | Magenta/rosa para conservación e insignias           | `#E91E63`|
| `aqua`   | Verde-agua para experiencia inteligente y IA         | `#00897B`|
| `status` | Verde / amarillo / rojo para semáforos de congestión | múltiple |

## Especies del programa de conservación

| Especie         | Estado conservación        | Región                       |
| --------------- | -------------------------- | ---------------------------- |
| Anaconda        | Preocupación menor         | Llanos · Casanare            |
| Caimán Llanero  | En peligro crítico         | Río Meta · Orinoquía         |
| Oso de Anteojos | Vulnerable                 | Cordillera Oriental          |
| Mono Araña Café | Críticamente amenazada     | Magdalena Medio              |
| Tortuga Hicotea | Vulnerable                 | Caribe · Magdalena Medio     |

## Soporte

Si algo no funciona en cualquiera de los pasos, escríbeme con el mensaje exacto de error que ves en pantalla y resolvemos.
