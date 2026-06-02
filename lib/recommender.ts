import type { LiveAttraction } from "./useLiveData";

export interface Recommendation {
  attraction: LiveAttraction;
  reason: "low-wait" | "low-occupancy" | "cooling-nearby" | "balanced";
  score: number;
  message: string;
}

function distance(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function recommend(
  attractions: LiveAttraction[],
  userPosition: { x: number; y: number } | null,
  options: { excludeIds?: string[]; limit?: number } = {},
): Recommendation[] {
  const { excludeIds = [], limit = 3 } = options;

  const candidates = attractions
    .filter((a) => a.type !== "servicio" && !excludeIds.includes(a.id))
    .filter((a) => a.congestion !== "high")
    .map((a) => {
      const waitScore = Math.max(0, 60 - a.waitMin) / 60;
      const occupancyScore = (100 - a.occupancyPct) / 100;
      const coolingBonus = a.hasCoolingZone ? 0.15 : 0;
      const distScore = userPosition
        ? Math.max(0, 1 - distance(a.position, userPosition) / 400)
        : 0.5;

      const score = waitScore * 0.4 + occupancyScore * 0.25 + distScore * 0.2 + coolingBonus;

      let reason: Recommendation["reason"] = "balanced";
      let message = `Buena disponibilidad`;
      if (a.waitMin <= 5) {
        reason = "low-wait";
        message = `Sin fila prácticamente`;
      } else if (a.occupancyPct < 40) {
        reason = "low-occupancy";
        message = `Solo ${a.occupancyPct}% de ocupación`;
      } else if (a.hasCoolingZone) {
        reason = "cooling-nearby";
        message = `Zona refrescada y disponible`;
      }

      return { attraction: a, reason, score, message };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return candidates;
}

export function aiBannerFor(attractions: LiveAttraction[]): string {
  const congested = attractions.filter((a) => a.congestion === "high").length;
  const available = attractions.filter(
    (a) => a.congestion === "low" && a.type !== "servicio",
  ).length;

  if (congested >= 3) {
    return `Hay ${congested} atracciones congestionadas. Te sugerimos ${available} alternativas disponibles.`;
  }
  if (congested >= 1) {
    return `Sistema activo: ${congested} atracción con alta demanda, redirigiendo flujo.`;
  }
  return `Todas las atracciones operando en niveles normales.`;
}
