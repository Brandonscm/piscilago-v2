"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { LiveAttraction } from "@/lib/useLiveData";

export function MapHeroPreview({ attractions }: { attractions: LiveAttraction[] }) {
  const congested = attractions.filter((a) => a.congestion === "high").length;
  const visible = attractions.filter((a) => a.type !== "servicio").slice(0, 5);

  return (
    <section className="mx-4 mt-3">
      <Link
        href="/mapa"
        className="block relative overflow-hidden rounded-2xl active:scale-[0.99] transition-transform shadow-elevated"
        style={{ background: "linear-gradient(135deg, #003478 0%, #1565C0 60%, #00897B 130%)" }}
      >
        <div className="absolute inset-0 opacity-25">
          <svg viewBox="0 0 360 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="map-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 7 10 10 T 20 10" stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="360" height="220" fill="url(#map-pattern)" />
            <path d="M40 80 Q 100 60 160 75 T 320 80" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M50 130 Q 120 110 200 125 T 320 130" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
        </div>

        <div className="relative px-4 pt-4 pb-3 z-10">
          <div className="flex items-center gap-1.5 text-white/85 text-[10px] font-medium uppercase tracking-wide mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sun-400 animate-pulse" />
            <MapPin size={11} strokeWidth={2.5} />
            En vivo · 22 puntos
          </div>
          <p className="text-white text-base font-semibold leading-tight pr-12">
            {congested > 0 ? `${congested} atracciones con alta demanda` : "Flujo normal en todo el parque"}
          </p>
        </div>

        <div className="relative px-4 pb-2 z-10">
          <div className="grid grid-cols-5 gap-1.5">
            {visible.map((a) => {
              const color =
                a.congestion === "high" ? "#FF6F00" :
                a.congestion === "medium" ? "#FFCA28" :
                "#80DEEA";
              const textColor = a.congestion === "low" ? "#003478" : "#1A1A1A";
              return (
                <div
                  key={a.id}
                  className="rounded-md px-1.5 py-1 text-center shadow-sm"
                  style={{ background: color }}
                >
                  <p className="text-[12px] font-bold leading-none" style={{ color: textColor }}>
                    {a.waitMin}
                  </p>
                  <p className="text-[7px] font-medium leading-none mt-0.5 truncate" style={{ color: textColor, opacity: 0.85 }}>
                    {a.name.split(" ")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative px-4 pb-4 z-10">
          <div className="inline-flex items-center gap-2 bg-sun-400 text-ink-900 px-4 py-2.5 rounded-xl font-semibold text-[12px] shadow-elevated">
            Abrir el mapa
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </Link>
    </section>
  );
}
