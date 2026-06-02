# Piscilago 2.0 · Versión Premium

Evolución oficial de la app Piscilago Colsubsidio con sistema inteligente de gestión de filas, recompensas por movilidad, programa de Guardianes de Conservación, **asistente conversacional**, **menú de accesibilidad** y **carruseles automáticos**. Desarrollado para la sustentación de Maestría en Gerencia de Proyectos · Universidad EAN.

## Features destacadas (lo nuevo de esta versión)

- **Asistente flotante con IA conversacional**: botón circular bottom-right que abre chat. Pre-cargado con respuestas a más de 18 patrones de preguntas (recomendaciones, especies, calor, filas, insignias, etc.) y deep-links automáticos a las pantallas relevantes.
- **Menú de accesibilidad**: tamaño de texto (3 escalas), alto contraste y reducir animaciones. Preferencias persistidas en localStorage.
- **Carruseles automáticos**: Atracciones y Animales avanzan solos cada 4-5 segundos. Pausan al tocar, reanudan tras 6 segundos.
- **Tooltips explicativos**: pequeños "i" en puntos estratégicos del Smart Layer para sustentar las decisiones de diseño sin tener que explicarlas verbalmente.
- **Migas de pan (breadcrumbs)**: navegación clara en páginas de detalle, adaptada a temas light y dark.
- **Toast notifications**: feedback inmediato en todas las interacciones.

## Rutas del prototipo

| URL                  | Pantalla                                                |
| -------------------- | ------------------------------------------------------- |
| `/home`              | Inicio con logo Piscilago, mapa preview, smart layer    |
| `/mapa`              | Smart map con tiempos en vivo y filtros                 |
| `/filas`             | Filas Inteligentes priorizadas por IA                   |
| `/huellas`           | Insignias de Guardián + puntos verdes + recompensas     |
| `/pasaporte`         | Identidad oficial + Pulsera NFC + saldo + grupo         |
| `/especies/[id]`     | Detalle de cada especie del programa de conservación    |
| `/panel/[especie]`   | Panel digital del sendero temático (proyección física)  |
| `/admin`             | Dashboard de operaciones del parque                     |

**Especies disponibles**: `anaconda`, `caiman-llanero`, `oso-anteojos`, `mono-arana`, `tortuga-hicotea`

## Stack técnico

- Next.js 14 (App Router) con TypeScript estricto
- Tailwind CSS con paleta extendida: Colsubsidio blue + sun yellow + wild magenta + aqua teal
- lucide-react para iconos
- Plus Jakarta Sans como tipografía
- LocalStorage para persistir preferencias de accesibilidad
- Sin backend: datos en vivo simulados por hooks de React

## Cómo actualizar el repositorio existente en GitHub

1. Descomprime el zip nuevo
2. Entra a tu repo `github.com/Brandonscm/piscilago-v2`
3. Click **Add file** arriba a la derecha → **Upload files**
4. Arrastra TODO el contenido al área de upload (sobreescribe archivos existentes)
5. Mensaje del commit: `Update to v2.1 - Asistente IA + Accesibilidad + Auto-carruseles`
6. Click **Commit changes**
7. Vercel detecta automáticamente y despliega en 2-3 minutos

## Cómo probar las features nuevas (en sustentación)

**Asistente flotante**: tap en el botón circular azul-magenta bottom-right de cualquier tab. Pregúntale "¿qué me recomiendas?", "tengo calor", "¿cómo gano insignias?", o el nombre de cualquier especie.

**Accesibilidad**: tap en el botón redondo top-right (icono de accesibilidad). Cambia el tamaño de texto y mira cómo todo se ajusta sin recargar.

**Tooltips**: en Home, tap cualquier icono "i" pequeño (al lado de "Inteligencia en vivo", "Recomendado para ti", "pasos hoy", etc.).

**Carruseles**: en Home, no toques nada y mira las secciones Atracciones y Animales avanzar solas. Tócalas para pausar.

**Breadcrumbs**: tap en cualquier especie de Animales protegidos → verás "Huellas / Caimán Llanero" arriba con back button.

## Soporte

Si algo no funciona, copia el mensaje de error y lo resolvemos rápido.
