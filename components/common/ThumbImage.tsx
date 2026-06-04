"use client";

const TYPE_THEMES: Record<string, { bg: string; emoji: string; pattern: string }> = {
  tobogan: { bg: "linear-gradient(135deg, #003478, #1565C0 60%, #00ACC1)", emoji: "🌀", pattern: "wave" },
  piscina: { bg: "linear-gradient(135deg, #0288D1, #4FC3F7)", emoji: "🏊", pattern: "drops" },
  rio: { bg: "linear-gradient(135deg, #006978, #00ACC1, #80DEEA)", emoji: "🌊", pattern: "wave" },
  servicio: { bg: "linear-gradient(135deg, #FF8F00, #FFB300)", emoji: "🍽️", pattern: "dots" },
  fauna: { bg: "linear-gradient(135deg, #4A148C, #C2185B 70%, #F06292)", emoji: "🦎", pattern: "dots" },
  infantil: { bg: "linear-gradient(135deg, #F57F17, #FFB300, #FFD54F)", emoji: "🎈", pattern: "drops" },
  conservacion: { bg: "linear-gradient(135deg, #1B5E20, #43A047, #81C784)", emoji: "🌿", pattern: "dots" },
};

// Specific overrides for unique attractions
const ATTRACTION_THEMES: Record<string, { emoji: string; bg?: string }> = {
  pisciflash: { emoji: "⚡" },
  piscitornado: { emoji: "🌪️" },
  "onda-extrema": { emoji: "🌊" },
  anaconda: { emoji: "🐍" },
  megatobogan: { emoji: "🎢" },
  pisciclon: { emoji: "💨" },
  piscihuracanes: { emoji: "🌀" },
  pisciloca: { emoji: "🎠" },
  piscigiros: { emoji: "🔄" },
  piscipulpo: { emoji: "🐙" },
  "bosque-lluvia": { emoji: "🌧️", bg: "linear-gradient(135deg, #1B5E20, #2E7D32 50%, #00ACC1)" },
  "parque-acuatico-infantil": { emoji: "🦆" },
  "piscina-las-fuentes": { emoji: "⛲" },
  "piscina-el-mirador": { emoji: "🏞️" },
  "piscina-olas": { emoji: "🏄" },
  lago: { emoji: "🚣" },
  "bicicletas-acuaticas": { emoji: "🚴" },
  piscitranvia: { emoji: "🚋" },
  "restaurante-central": { emoji: "🍔" },
  "area-conservacion": { emoji: "🦋" },
};

function patternSvg(pattern: string, id: string): string {
  if (pattern === "wave") {
    return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs><pattern id="${id}" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 Q15 0 30 20 T 60 20" fill="none" stroke="white" stroke-opacity="0.12" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }
  if (pattern === "drops") {
    return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs><pattern id="${id}" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="1.5" fill="white" fill-opacity="0.15"/><circle cx="22" cy="22" r="2.5" fill="white" fill-opacity="0.12"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }
  // dots
  return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs><pattern id="${id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="white" fill-opacity="0.13"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
}

export function ThumbImage({
  src,
  alt,
  type = "tobogan",
  attractionId,
  className = "",
}: {
  src?: string;
  alt: string;
  type?: "tobogan" | "piscina" | "rio" | "servicio" | "fauna" | "infantil" | "conservacion";
  attractionId?: string;
  className?: string;
}) {
  const theme = TYPE_THEMES[type] ?? TYPE_THEMES.tobogan;
  const override = attractionId ? ATTRACTION_THEMES[attractionId] : undefined;
  const emoji = override?.emoji ?? theme.emoji;
  const bg = override?.bg ?? theme.bg;
  const patternId = `pat-${attractionId ?? alt.replace(/\s+/g, "")}`;
  const patternUrl = `data:image/svg+xml;utf8,${encodeURIComponent(patternSvg(theme.pattern, patternId))}`;

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-white overflow-hidden ${className}`}
      style={{ background: bg }}
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url("${patternUrl}")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
      <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full bg-white/8" />

      <span className="relative text-4xl mb-1 drop-shadow-md">{emoji}</span>
      <span className="relative text-[8px] font-bold uppercase tracking-widest text-white px-2 text-center leading-tight drop-shadow-sm">
        {alt}
      </span>
    </div>
  );
}
