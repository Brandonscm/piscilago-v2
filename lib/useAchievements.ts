"use client";

import { useEffect, useState, useCallback } from "react";

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: number;
  progress?: { current: number; target: number };
}

const STORAGE_KEY = "piscilago_achievements";

export const ACHIEVEMENT_DEFS: Achievement[] = [
  { id: "welcome", emoji: "👋", title: "Bienvenido", description: "Completaste el tour de la app", points: 10, unlocked: false },
  { id: "first-reservation", emoji: "🎟️", title: "Primera Reserva", description: "Reservaste tu primer turno digital", points: 20, unlocked: false },
  { id: "first-attraction", emoji: "🌊", title: "Primera Atracción", description: "Disfrutaste tu primera atracción del día", points: 15, unlocked: false },
  { id: "first-anaconda", emoji: "🐍", title: "Domador de Anaconda", description: "Te lanzaste por la Anaconda al menos una vez", points: 25, unlocked: false },
  { id: "no-queue", emoji: "⚡", title: "Sin Filas", description: "Disfrutaste una atracción con 0 minutos de espera", points: 20, unlocked: false },
  { id: "explorer", emoji: "🗺️", title: "Explorador", description: "Visitaste 5 atracciones diferentes en un día", points: 50, unlocked: false, progress: { current: 3, target: 5 } },
  { id: "first-huella", emoji: "🌿", title: "Guardián Novato", description: "Desbloqueaste tu primera huella de conservación", points: 30, unlocked: true, unlockedAt: Date.now() - 86400000 },
  { id: "hydration", emoji: "💧", title: "Bien Hidratado", description: "Visitaste 3 puntos de hidratación en un día", points: 15, unlocked: false, progress: { current: 1, target: 3 } },
  { id: "early-bird", emoji: "🌅", title: "Madrugador", description: "Llegaste antes de las 10:00 am", points: 10, unlocked: true, unlockedAt: Date.now() - 3600000 },
  { id: "conservador", emoji: "🦎", title: "Conservador", description: "Desbloqueaste 3 huellas en el día", points: 40, unlocked: false, progress: { current: 1, target: 3 } },
];

function load(): Achievement[] {
  if (typeof window === "undefined") return ACHIEVEMENT_DEFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return ACHIEVEMENT_DEFS;
    const stored = JSON.parse(raw) as Record<string, { unlocked: boolean; unlockedAt?: number }>;
    return ACHIEVEMENT_DEFS.map((def) => ({
      ...def,
      unlocked: stored[def.id]?.unlocked ?? def.unlocked,
      unlockedAt: stored[def.id]?.unlockedAt ?? def.unlockedAt,
    }));
  } catch {
    return ACHIEVEMENT_DEFS;
  }
}

function save(items: Achievement[]) {
  if (typeof window === "undefined") return;
  try {
    const minimal: Record<string, { unlocked: boolean; unlockedAt?: number }> = {};
    items.forEach((a) => {
      minimal[a.id] = { unlocked: a.unlocked, unlockedAt: a.unlockedAt };
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  } catch {}
}

export function useAchievements() {
  const [items, setItems] = useState<Achievement[]>(ACHIEVEMENT_DEFS);

  useEffect(() => {
    setItems(load());
  }, []);

  const unlock = useCallback((id: string) => {
    const current = load();
    const next = current.map((a) => a.id === id ? { ...a, unlocked: true, unlockedAt: Date.now() } : a);
    save(next);
    setItems(next);
    return next.find((a) => a.id === id);
  }, []);

  const unlockedCount = items.filter((a) => a.unlocked).length;
  const totalPoints = items.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return { items, unlock, unlockedCount, totalPoints, total: items.length };
}
