"use client";

import Link from "next/link";
import { ChevronRight, Shield } from "lucide-react";
import { SPECIES } from "@/lib/species";

export function AnimalesSection() {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between px-4 mb-2.5">
        <h2 className="text-[13px] font-semibold text-ink-900">Animales protegidos</h2>
        <Link
          href="/huellas"
          className="inline-flex items-center gap-0.5 text-[10px] text-wild-600 font-semibold uppercase tracking-wide active:scale-95 transition-transform"
        >
          Ver insignias
          <ChevronRight size={12} strokeWidth={2.5} />
        </Link>
      </div>

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 pb-2">
        {SPECIES.map((s) => (
          <Link
            key={s.id}
            href={`/especies/${s.id}`}
            className="shrink-0 w-[180px] bg-white rounded-2xl overflow-hidden shadow-card active:scale-[0.98] transition-transform"
          >
            <div className="relative h-[110px] bg-ink-100 overflow-hidden">
              <img
                src={s.imageUrl}
                alt={s.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 inline-flex items-center gap-1 bg-wild-500 text-white px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wide">
                <Shield size={8} strokeWidth={2.5} />
                {s.conservationLabel}
              </div>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-semibold text-ink-900 leading-tight">
                {s.name}
              </p>
              <p className="text-[9px] text-ink-500 mt-0.5 italic truncate">
                {s.scientific}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
