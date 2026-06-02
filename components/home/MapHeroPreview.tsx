"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { LiveAttraction } from "@/lib/useLiveData";

export function MapHeroPreview({ attractions }: { attractions: LiveAttraction[] }) {
  const congested = attractions.filter((a) => a.congestion === "high").length;
  const visible = attractions.filter((a) => a.type !== "servicio").slice(0, 8);

  return (
    <section className="mx-4 mt-3">
      <Link
        href="/mapa"
        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-col-700 via-col-500 to-aqua-500 active:scale-[0.99] transition-transform shadow-elevated"
      >
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 360 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="map-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 7 10 10 T 20 10" stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="360" height="180" fill="url(#map-pattern)" />
            <path d="M40 80 Q 100 60 160 75 T 320 80" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M50 120 Q 120 100 200 115 T 320 120" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
        </div>

        {visible.map((a, i) => {
          const x = 12 + ((i * 11) % 80);
          const y = 25 + ((i * 17) % 50);
          const color =
            a.congestion === "high"
              ? "#FFB300"
              : a.congestion === "medium"
                ? "#FFCA28"
                : "#80DEEA";
          return (
            <div
              key={a.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="text-[9px] font-bold text-ink-900 px-1.5 py-0.5 rounded-md shadow-card"
                style={{ background: color }}
              >
                {a.waitMin}
              </div>
            </div>
          );
        })}

        <div className="relative p-4 pt-5">
          <div className="flex items-center gap-1.5 text-white/85 text-[10px] font-medium uppercase tracking-wide mb-1">
            <MapPin size={11} strokeWidth={2.5} />
            En vivo · {attractions.length} puntos
          </div>
          <p className="text-white text-base font-semibold leading-tight">
            {congested > 0 ? `${congested} atracciones con alta demanda` : "Flujo normal en todo el parque"}
          </p>

          <div className="mt-12 inline-flex items-center gap-2 bg-sun-400 text-ink-900 px-4 py-2.5 rounded-xl font-semibold text-[12px] shadow-elevated">
            Abrir el mapa
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </Link>
    </section>
  );
}
