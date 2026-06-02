"use client";

import { useEffect, useState } from "react";
import { ATTRACTIONS, type Attraction, type CongestionLevel, getCongestion } from "./attractions";

export interface LiveAttraction extends Attraction {
  occupancy: number;
  occupancyPct: number;
  waitMin: number;
  trend: "up" | "down" | "stable";
  congestion: CongestionLevel;
  updatedAt: number;
}

function fluctuate(base: number, range: number, drift: number = 0): number {
  const noise = (Math.random() - 0.5) * range;
  return Math.max(0, base + noise + drift);
}

function snapshot(attractions: Attraction[], prev?: LiveAttraction[]): LiveAttraction[] {
  return attractions.map((a) => {
    const previous = prev?.find((p) => p.id === a.id);

    const occRange = a.capacity * 0.15;
    const waitRange = Math.max(4, a.baseWaitMin * 0.25);

    const newOccupancy = Math.round(fluctuate(a.baseOccupancy, occRange));
    const newWait = Math.round(fluctuate(a.baseWaitMin, waitRange));

    const occupancyPct = Math.min(100, Math.round((newOccupancy / a.capacity) * 100));

    let trend: "up" | "down" | "stable" = "stable";
    if (previous) {
      const diff = newWait - previous.waitMin;
      if (diff > 3) trend = "up";
      else if (diff < -3) trend = "down";
    }

    return {
      ...a,
      occupancy: newOccupancy,
      occupancyPct,
      waitMin: newWait,
      trend,
      congestion: getCongestion(occupancyPct, newWait),
      updatedAt: Date.now(),
    };
  });
}

export function useLiveData(intervalMs: number = 30000): {
  data: LiveAttraction[];
  lastUpdate: number;
  forceRefresh: () => void;
} {
  const [data, setData] = useState<LiveAttraction[]>(() => snapshot(ATTRACTIONS));
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => snapshot(ATTRACTIONS, prev));
      setLastUpdate(Date.now());
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const forceRefresh = () => {
    setData((prev) => snapshot(ATTRACTIONS, prev));
    setLastUpdate(Date.now());
  };

  return { data, lastUpdate, forceRefresh };
}
