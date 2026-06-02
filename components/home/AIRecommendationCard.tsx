"use client";

import Link from "next/link";
import { Sparkles, Clock, MapPin, ArrowRight, Waves } from "lucide-react";
import type { Recommendation } from "@/lib/recommender";

export function AIRecommendationCard({ rec }: { rec: Recommendation | null }) {
  if (!rec) return null;
  const { attraction, message } = rec;

  return (
    <Link
      href={`/mapa?focus=${attraction.id}`}
      className="mx-4 mt-3 rounded-2xl bg-white shadow-card p-3 flex items-center gap-3 active:scale-[0.99] transition-transform"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-white shrink-0"
        style={{ background: "linear-gradient(135deg, #1565C0, #003478)" }}
      >
        <Waves size={26} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-flex items-center gap-1 text-[9px] font-medium bg-aqua-50 text-aqua-800 px-2 py-0.5 rounded-md">
          <Sparkles size={9} strokeWidth={2.5} />
          Recomendado por IA
        </span>
        <p className="text-[13px] font-medium text-ink-900 leading-tight mt-1 truncate">
          {attraction.name}
        </p>
        <div className="flex items-center gap-3 text-[10px] text-ink-500 mt-0.5">
          <span className="inline-flex items-center gap-1">
            <Clock size={10} strokeWidth={2} />
            {attraction.waitMin} min
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={10} strokeWidth={2} />
            zona {attraction.zone}
          </span>
        </div>
        <p className="text-[9px] text-aqua-600 mt-0.5">{message}</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-col-600 text-white flex items-center justify-center shrink-0">
        <ArrowRight size={15} strokeWidth={2.2} />
      </div>
    </Link>
  );
}
