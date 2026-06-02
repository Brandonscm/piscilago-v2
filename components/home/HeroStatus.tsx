"use client";

import { Sun } from "lucide-react";
import type { LiveAttraction } from "@/lib/useLiveData";

export function HeroStatus({ attractions }: { attractions: LiveAttraction[] }) {
  const totalCapacity = attractions
    .filter((a) => a.type !== "servicio")
    .reduce((sum, a) => sum + a.capacity, 0);
  const totalOccupancy = attractions
    .filter((a) => a.type !== "servicio")
    .reduce((sum, a) => sum + a.occupancy, 0);
  const parkPct = Math.round((totalOccupancy / totalCapacity) * 100);

  const status =
    parkPct < 50 ? "Día tranquilo, ideal para visitar" :
    parkPct < 75 ? "Aforo moderado, sin congestión" :
    "Aforo alto, sigue las recomendaciones";

  return (
    <section
      className="mx-4 mt-3 rounded-2xl p-4 text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #003478 0%, #1565C0 60%, #00897B 130%)",
      }}
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-4 w-20 h-20 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-white/80 font-medium">
            Hoy en el parque
          </p>
          <p className="text-sm font-medium mt-0.5">{status}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-xl backdrop-blur text-[11px] font-medium">
          <Sun size={12} strokeWidth={2.5} />
          <span>32°</span>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2 mt-4">
        <div>
          <p className="text-base font-medium leading-none">
            {totalOccupancy.toLocaleString("es-CO")}
          </p>
          <p className="text-[9px] text-white/80 mt-0.5">Visitantes</p>
        </div>
        <div>
          <p className="text-base font-medium leading-none">{parkPct}%</p>
          <p className="text-[9px] text-white/80 mt-0.5">Aforo</p>
        </div>
        <div>
          <p className="text-base font-medium leading-none">11:30</p>
          <p className="text-[9px] text-white/80 mt-0.5">Hora pico</p>
        </div>
      </div>

      <div className="relative mt-3">
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-aqua-100 rounded-full transition-all duration-700"
            style={{ width: `${parkPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-white/80 mt-1">
          <span>{parkPct < 50 ? "Bajo" : parkPct < 75 ? "Moderado" : "Alto"}</span>
          <span>
            {totalOccupancy.toLocaleString("es-CO")} / {totalCapacity.toLocaleString("es-CO")}
          </span>
        </div>
      </div>
    </section>
  );
}
