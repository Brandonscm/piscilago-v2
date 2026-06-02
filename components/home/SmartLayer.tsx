"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Footprints, Award } from "lucide-react";
import type { Recommendation } from "@/lib/recommender";

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
    <section className="px-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 animate-pulse" />
          <h2 className="text-[11px] font-semibold text-ink-900 uppercase tracking-wide">
            Inteligencia en vivo
          </h2>
        </div>
      </div>

      {recommendation && (
        <Link
          href={`/mapa?focus=${recommendation.attraction.id}`}
          className="block bg-white rounded-2xl p-3 shadow-card border-l-[3px] border-aqua-500 active:scale-[0.99] transition-transform mb-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-wider text-aqua-600 font-semibold">
                Recomendado para ti ahora
              </p>
              <p className="text-[13px] font-semibold text-ink-900 leading-tight mt-0.5 truncate">
                {recommendation.attraction.name}
              </p>
              <p className="text-[10px] text-ink-500 mt-0.5">
                {recommendation.attraction.waitMin} min de espera · {recommendation.message}
              </p>
            </div>
            <ArrowRight size={16} className="text-aqua-600 shrink-0" strokeWidth={2.2} />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/huellas"
          className="bg-white rounded-2xl p-3 shadow-card active:scale-[0.97] transition-transform"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sun-50 text-sun-600 flex items-center justify-center">
              <Footprints size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-ink-900 leading-none">
                {steps.toLocaleString("es-CO")}
              </p>
              <p className="text-[9px] text-ink-500 mt-0.5">pasos hoy</p>
            </div>
          </div>
        </Link>

        <Link
          href="/huellas"
          className="bg-white rounded-2xl p-3 shadow-card active:scale-[0.97] transition-transform"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-wild-50 text-wild-600 flex items-center justify-center">
              <Award size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-ink-900 leading-none">
                {insignias}
                <span className="text-[10px] text-ink-500 font-normal ml-1">
                  · {greenPoints} pts verdes
                </span>
              </p>
              <p className="text-[9px] text-ink-500 mt-0.5">insignias de Guardián</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
