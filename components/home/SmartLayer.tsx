"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Footprints, Award } from "lucide-react";
import type { Recommendation } from "@/lib/recommender";
import { Tooltip } from "@/components/common/Tooltip";
import { NewBadge } from "@/components/common/NewBadge";

export function SmartLayer({
  recommendation,
  steps,
  insignias,
  greenPoints,
}: {
  recommendation: Recommendation | null;
  steps: number;
  insignias: number;
  greenPoints: number;
}) {
  return (
    <section className="px-4 mt-4 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 animate-pulse" />
          <h2 className="text-[11px] font-semibold text-ink-900 uppercase tracking-wide">
            Inteligencia en vivo
          </h2>
          <NewBadge size="small" />
          <Tooltip
            content="Capa inteligente del proyecto: el motor IA procesa datos de los sensores en tiempo real para sugerirte la mejor decisión de tu visita."
            position="bottom"
            iconOnly
          />
        </div>
      </div>

      {recommendation && (
        <Link
          href={`/mapa?focus=${recommendation.attraction.id}`}
          className="block bg-white rounded-2xl p-3 shadow-card border-l-[3px] border-aqua-500 active:scale-[0.99] transition-transform mb-2 relative"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[9px] uppercase tracking-wider text-aqua-600 font-semibold">
                  Recomendado para ti ahora
                </p>
                <Tooltip
                  content="Selección basada en tiempo de espera, distancia y disponibilidad de cooling zones cercanas."
                  iconOnly
                />
              </div>
              <p className="text-[13px] font-semibold text-ink-900 leading-tight mt-0.5 truncate">
                {recommendation.attraction.name}
              </p>
              <p className="text-[10px] text-ink-500 mt-0.5">
                {recommendation.attraction.waitMin} min · {recommendation.message}
              </p>
            </div>
            <ArrowRight size={16} className="text-aqua-600 shrink-0" strokeWidth={2.2} />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/huellas"
          className="bg-white rounded-2xl p-3 shadow-card active:scale-[0.97] transition-transform relative"
        >
          <span className="absolute -top-1 -right-1 z-10 bg-sun-400 text-ink-900 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider rounded-full shadow-card ring-2 ring-white">
            Nuevo
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sun-50 text-sun-600 flex items-center justify-center">
              <Footprints size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-ink-900 leading-none">
                {steps.toLocaleString("es-CO")}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <p className="text-[9px] text-ink-500">pasos hoy</p>
                <Tooltip
                  content="Cada 2.000 pasos desbloqueas un descuento en alimentos y tienda del parque."
                  iconOnly
                />
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/huellas"
          className="bg-white rounded-2xl p-3 shadow-card active:scale-[0.97] transition-transform relative"
        >
          <span className="absolute -top-1 -right-1 z-10 bg-sun-400 text-ink-900 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider rounded-full shadow-card ring-2 ring-white">
            Nuevo
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-wild-50 text-wild-600 flex items-center justify-center">
              <Award size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-ink-900 leading-none">
                {insignias}
                <span className="text-[10px] text-ink-500 font-normal ml-1">· {greenPoints} pts verdes</span>
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <p className="text-[9px] text-ink-500">insignias de Guardián</p>
                <Tooltip
                  content="Se desbloquean al escanear tu pulsera NFC en los senderos temáticos de fauna del parque."
                  iconOnly
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
