"use client";

import { useEffect, useState } from "react";

export interface RewardTier {
  level: number;
  name: string;
  steps: number;
  discount: number;
  scope: string;
  unlocked: boolean;
}

export const REWARD_TIERS_BASE: Omit<RewardTier, "unlocked">[] = [
  { level: 1, name: "Explorador", steps: 2000, discount: 5, scope: "alimentos y bebidas" },
  { level: 2, name: "Aventurero", steps: 4000, discount: 10, scope: "alimentos, bebidas y tienda" },
  { level: 3, name: "Conquistador", steps: 6000, discount: 15, scope: "todo el parque" },
  { level: 4, name: "Leyenda", steps: 8000, discount: 25, scope: "descuento próxima visita" },
];

export function useSteps(initial: number = 3240): {
  steps: number;
  tiers: RewardTier[];
  currentTier: RewardTier | null;
  nextTier: RewardTier | null;
  progressToNext: number;
} {
  const [steps, setSteps] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setSteps((s) => s + Math.round(Math.random() * 8 + 2));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const tiers: RewardTier[] = REWARD_TIERS_BASE.map((t) => ({
    ...t,
    unlocked: steps >= t.steps,
  }));

  const unlocked = tiers.filter((t) => t.unlocked);
  const currentTier = unlocked.length > 0 ? unlocked[unlocked.length - 1] : null;
  const nextTier = tiers.find((t) => !t.unlocked) ?? null;

  const progressToNext = nextTier
    ? Math.min(
        100,
        Math.round(
          ((steps - (currentTier?.steps ?? 0)) /
            (nextTier.steps - (currentTier?.steps ?? 0))) *
            100,
        ),
      )
    : 100;

  return { steps, tiers, currentTier, nextTier, progressToNext };
}
