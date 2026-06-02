# Piscilago 2.0 · Experiencia Inteligente

Prototipo funcional de la evolución de la app oficial de Piscilago Colsubsidio. Desarrollado para la sustentación de la Maestría en Gerencia de Proyectos · Universidad EAN.

## Rutas del prototipo

| URL              | Vista                                            | Para qué sirve                                     |
| ---------------- | ------------------------------------------------ | -------------------------------------------------- |
| `/home`          | Pantalla de inicio del visitante                 | Hero card, recomendación IA y accesos rápidos      |
| `/mapa`          | Mapa inteligente con congestión en tiempo real   | Visualización del parque por colores               |
| `/filas`         | Listado priorizado por IA                        | Filas inteligentes con redistribución de flujo     |
| `/recompensas`   | Gamificación por movilidad (2k/4k/6k/8k pasos)   | Sistema de descuentos progresivos                  |
| `/pulsera`       | Pulsera NFC con saldo y grupo familiar           | Puente físico-digital del visitante                |
| `/panel/sendero` | Panel digital físico (landscape)                 | Vista para proyectar en monitores del parque       |
| `/admin`         | Dashboard de operaciones                         | KPIs en tiempo real para la operación              |

Todas las pantallas leen del mismo motor de datos (`lib/useLiveData.ts`) que simula actualizaciones cada 15-30 segundos. Si abres `/mapa` y `/panel/sendero` en dos pantallas distintas verás los mismos datos sincronizados — ese es el punto de la propuesta.

## Paso 1 — Probar localmente (opcional pero recomendado)

Necesitas tener instalado Node.js versión 18 o superior. Si no lo tienes, descárgalo de https://nodejs.org

Abre una terminal en la carpeta del proyecto y corre:

```bash
npm install
npm run dev
```

Espera unos 30 segundos a que termine de instalar y abre http://localhost:3000 en tu navegador. Deberías ver la pantalla Home del prototipo.

Si algo falla en este paso, **no te preocupes** — puedes saltarte directo a Vercel y probarlo desde ahí.

## Paso 2 — Subir el código a GitHub

### 2.1 Crear el repositorio

1. Entra a https://github.com e inicia sesión con tu cuenta
2. Haz clic en el botón verde **New** (arriba a la izquierda) para crear un repositorio nuevo
3. En el campo "Repository name" escribe `piscilago-v2`
4. Deja todo en valores por defecto (público, sin README, sin .gitignore, sin license)
5. Haz clic en **Create repository**

GitHub te mostrará una página con instrucciones. Mantenla abierta en una pestaña, vas a copiar la URL del repositorio (algo como `https://github.com/tu-usuario/piscilago-v2.git`).

### 2.2 Subir los archivos del proyecto

La forma más fácil para alguien que no usa GitHub a diario: usa la web directamente.

1. En la página del repositorio recién creado, haz clic en **uploading an existing file** (el link aparece en el medio de la página)
2. Arrastra **TODOS los archivos y carpetas** de este proyecto a la zona de upload
3. Espera a que se carguen (puede tomar 1-2 minutos)
4. Al final de la página, en "Commit changes", escribe un mensaje como `Initial commit · Piscilago 2.0` y haz clic en **Commit changes**

Listo, tu código está en GitHub.

> **Alternativa si te sientes con confianza:** usa la app oficial de GitHub Desktop (https://desktop.github.com/) que es gráfica y maneja todo por ti.

## Paso 3 — Desplegar en Vercel

1. Entra a https://vercel.com
2. Haz clic en **Sign Up** y elige **Continue with GitHub** (esto conecta automáticamente tu cuenta)
3. Una vez dentro de Vercel, haz clic en **Add New...** → **Project**
4. Vercel te mostrará tus repositorios de GitHub. Busca `piscilago-v2` y haz clic en **Import**
5. En la siguiente pantalla, Vercel detecta automáticamente que es Next.js. **No cambies nada**, solo haz clic en **Deploy**
6. Espera 2-3 minutos. Cuando termine, verás una pantalla con confetti y un link tipo `piscilago-v2-tu-usuario.vercel.app`

Ese link es tu app pública. Lo puedes abrir en cualquier celular o computador del jurado durante la sustentación.

## Paso 4 — Hacer cambios y desplegar de nuevo

Cada vez que actualices el código en GitHub, Vercel detecta el cambio y despliega la nueva versión automáticamente en menos de 2 minutos. No tienes que hacer nada más.

Para subir un cambio:

1. En la página de tu repositorio en GitHub, navega al archivo que quieras editar
2. Haz clic en el ícono del lápiz (arriba a la derecha)
3. Edita el código
4. Abajo, haz clic en **Commit changes**
5. Listo, Vercel desplegará automáticamente

## Stack técnico

- Next.js 14 (App Router) — framework de React optimizado para producción
- React 18 con TypeScript estricto
- Tailwind CSS — sistema de utilidades para estilos
- lucide-react — iconos
- Sin backend ni base de datos — todo corre con datos simulados en el navegador

## Estructura del código

```
app/
  layout.tsx              ← layout raíz
  page.tsx                ← redirige a /home
  globals.css             ← Tailwind + fuentes
  (tabs)/                 ← grupo de rutas con bottom nav
    layout.tsx            ← shell del celular + nav inferior
    home/page.tsx
    mapa/page.tsx
    filas/page.tsx
    recompensas/page.tsx
    pulsera/page.tsx
  panel/sendero/page.tsx  ← panel digital de senderos (landscape)
  admin/page.tsx          ← dashboard de operaciones

components/
  shell/                  ← PhoneShell, StatusBar, BottomNav
  common/                 ← AppHeader y otros compartidos
  home/                   ← componentes exclusivos del home
  mapa/                   ← componentes del smart map
  filas/                  ← componentes de filas

lib/
  attractions.ts          ← modelo de datos de las 22 atracciones
  useLiveData.ts          ← motor de simulación en tiempo real
  recommender.ts          ← motor de recomendación IA
  useSteps.ts             ← contador de pasos y tier de recompensas
```

## Soporte

Si algo no funciona en cualquiera de los pasos, escríbeme con el mensaje exacto de error que ves en pantalla y resolvemos.
