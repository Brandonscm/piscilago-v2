"use client";

import Link from "next/link";
import { Bell, ChevronRight, X } from "lucide-react";
import { useReservations } from "@/lib/useReservations";

export function TurnoActivoBanner() {
  const { activeReserva, complete } = useReservations();

  if (!activeReserva) return null;

  return (
    <div className="relative z-30 mx-2 mt-1 rounded-xl overflow-hidden shadow-elevated animate-pulse-slow" style={{ background: "linear-gradient(90deg, #2E7D32 0%, #43A047 100%)" }}>
      <div className="flex items-center gap-2 px-3 py-2.5 text-white">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Bell size={14} strokeWidth={2.5} className="animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wide font-bold opacity-95">¡Tu turno es ahora!</p>
          <p className="text-[11px] font-semibold leading-tight">{activeReserva.attractionName} · {activeReserva.code}</p>
        </div>
        <Link
          href="/pasaporte"
          className="bg-white/20 hover:bg-white/30 rounded-lg px-2.5 py-1.5 text-[10px] font-bold inline-flex items-center gap-0.5 active:scale-95 transition-transform"
        >
          Ver
          <ChevronRight size={11} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
