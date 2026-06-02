"use client";

import { useEffect, useState } from "react";
import { SPECIES, type Species } from "./species";

export interface Insignia {
  speciesId: string;
  species: Species;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface GreenPointsReward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "experiencia" | "educativo" | "ecologico";
  unlocked: boolean;
}

export const GREEN_REWARDS: Omit<GreenPointsReward, "unlocked">[] = [
  {
    id: "tour-guiado",
    name: "Tour guiado de conservación",
    description: "Recorrido privado por el Área de Conservación con biólogo del parque",
    cost: 80,
    category: "experiencia",
  },
  {
    id: "charla-biologo",
    name: "Charla con biólogo",
    description: "Conversación de 30 min con un especialista de fauna",
    cost: 60,
    category: "educativo",
  },
  {
    id: "kit-educativo",
    name: "Kit Guardián Junior",
    description: "Kit educativo para niños con manual de fauna colombiana",
    cost: 100,
    category: "educativo",
  },
  {
    id: "adopta-cria",
    name: "Adopta una cría de hicotea",
    description: "Apadrina simbólicamente una cría liberada al año",
    cost: 150,
    category: "ecologico",
  },
  {
    id: "siembra-arbol",
    name: "Siembra de árbol nativo",
    description: "Planta un árbol en la reserva con tu nombre asociado",
    cost: 70,
    category: "ecologico",
  },
];

export function useInsignias(initialUnlockedIds: string[] = ["anaconda", "tortuga-hicotea"]): {
  insignias: Insignia[];
  greenPoints: number;
  rewards: GreenPointsReward[];
  unlockSpecies: (id: string) => void;
  byEcosystem: { ecosystem: string; insignias: Insignia[] }[];
} {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set(initialUnlockedIds));

  const insignias: Insignia[] = SPECIES.map((s) => ({
    speciesId: s.id,
    species: s,
    unlocked: unlockedIds.has(s.id),
  }));

  const greenPoints = insignias
    .filter((i) => i.unlocked)
    .reduce((sum, i) => sum + i.species.greenPointsReward, 0);

  const rewards = GREEN_REWARDS.map((r) => ({ ...r, unlocked: greenPoints >= r.cost }));

  const unlockSpecies = (id: string) => {
    setUnlockedIds((prev) => new Set(prev).add(id));
  };

  const ecosystems = ["acuatico", "dosel", "sotobosque", "terrestre"];
  const byEcosystem = ecosystems
    .map((e) => ({
      ecosystem: e,
      insignias: insignias.filter((i) => i.species.ecosystem === e),
    }))
    .filter((g) => g.insignias.length > 0);

  return { insignias, greenPoints, rewards, unlockSpecies, byEcosystem };
}
