"use client";

import Link from "next/link";
import { Droplets, Route, AlertTriangle, TrendingUp } from "lucide-react";
import { AppHeader } from "@/components/common/AppHeader";
import { HeroStatus } from "@/components/home/HeroStatus";
import { AIRecommendationCard } from "@/components/home/AIRecommendationCard";
import { useLiveData } from "@/lib/useLiveData";
import { recommend } from "@/lib/recommender";

export default function HomePage() {
  const { data } = useLiveData(30000);
  const recs = recommend(data, null, { limit: 1 });
  const congested = data.filter((a) => a.congestion === "high").length;
  const coolingActive = data.filter((a) => a.hasCoolingZone).length;

  return (
    <div className="pb-4">
      <AppHeader name="Hola, Daniel" subtitle="Pase VIP · Día completo" />

      <HeroStatus attractions={data} />

      <AIRecommendationCard rec={recs[0] ?? null} />

      <div className="px-4 mt-4 flex items-center justify-between">
        <h2 className="text-[12px] font-medium text-ink-900">Smart Experience</h2>
        <Link href="/mapa" className="text-[10px] text-col-600 font-medium">
          Ver mapa
        </Link>
      </div>

      <div className="px-4 mt-2 grid grid-cols-2 gap-2">
        <Link
          href="/mapa?layer=cooling"
          className="bg-white shadow-card rounded-2xl p-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-col-50 text-col-600 flex items-center justify-center">
            <Droplets size={18} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 mt-2">Cooling Zones</p>
          <p className="text-[9px] text-ink-500 mt-0.5">{coolingActive} activas cerca</p>
        </Link>

        <Link
          href="/mapa?layer=route"
          className="bg-white shadow-card rounded-2xl p-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-aqua-50 text-aqua-600 flex items-center justify-center">
            <Route size={18} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 mt-2">Ruta Óptima IA</p>
          <p className="text-[9px] text-ink-500 mt-0.5">−42 min de espera total</p>
        </Link>

        <Link
          href="/filas"
          className="bg-white shadow-card rounded-2xl p-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-status-red-soft text-status-red flex items-center justify-center">
            <AlertTriangle size={18} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 mt-2">Atracciones críticas</p>
          <p className="text-[9px] text-ink-500 mt-0.5">{congested} en alta demanda</p>
        </Link>

        <Link
          href="/recompensas"
          className="bg-white shadow-card rounded-2xl p-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-status-yellow-soft text-status-yellow flex items-center justify-center">
            <TrendingUp size={18} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 mt-2">Recompensas</p>
          <p className="text-[9px] text-ink-500 mt-0.5">3.240 pasos hoy</p>
        </Link>
      </div>
    </div>
  );
}
