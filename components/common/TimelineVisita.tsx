"use client";

import { useState } from "react";
import { Clock, ChevronDown, MapPin, Award, Droplets, CalendarCheck, Sparkles, Footprints } from "lucide-react";
import { NewBadge } from "./NewBadge";

interface TimelineEvent {
  time: string;
  icon: typeof Clock;
  iconColor: string;
  iconBg: string;
  title: string;
  detail: string;
}

const SAMPLE_EVENTS: TimelineEvent[] = [
  { time: "09:14", icon: CalendarCheck, iconColor: "text-col-600", iconBg: "bg-col-50", title: "Llegada al parque", detail: "Pulsera NFC vinculada · Bus 7" },
  { time: "09:45", icon: Sparkles, iconColor: "text-aqua-600", iconBg: "bg-aqua-50", title: "Bosque de Lluvia", detail: "0 min de espera · Familia completa" },
  { time: "10:30", icon: MapPin, iconColor: "text-sun-700", iconBg: "bg-sun-50", title: "Pisciflash · turno reservado", detail: "Código PSL-4892-23 · Sin fila" },
  { time: "12:15", icon: Droplets, iconColor: "text-aqua-600", iconBg: "bg-aqua-50", title: "Hidratación en zona sur", detail: "Punto de aspersores activo" },
  { time: "13:40", icon: Award, iconColor: "text-wild-600", iconBg: "bg-wild-50", title: "Huella del Oso de Anteojos", detail: "Niños desbloquearon insignia" },
  { time: "15:00", icon: Sparkles, iconColor: "text-col-600", iconBg: "bg-col-50", title: "Anaconda", detail: "Tobogán familiar · Flotador de 4" },
];

export function TimelineVisita() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mx-4 mt-3 bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between active:bg-ink-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 text-aqua-600 flex items-center justify-center">
            <Clock size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-semibold text-ink-900">Tu día en Piscilago</p>
              <NewBadge size="small" />
            </div>
            <p className="text-[10px] text-ink-500">6 momentos registrados</p>
          </div>
        </div>
        <ChevronDown size={14} className={`text-ink-300 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.2} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            <div className="bg-col-50 rounded-lg p-2 text-center">
              <p className="text-[14px] font-bold text-col-700 leading-none">4</p>
              <p className="text-[8px] text-ink-500 mt-1 uppercase tracking-wide">Atrac.</p>
            </div>
            <div className="bg-sun-50 rounded-lg p-2 text-center">
              <p className="text-[14px] font-bold text-sun-700 leading-none">4.250</p>
              <p className="text-[8px] text-ink-500 mt-1 uppercase tracking-wide">Pasos</p>
            </div>
            <div className="bg-wild-50 rounded-lg p-2 text-center">
              <p className="text-[14px] font-bold text-wild-600 leading-none">1</p>
              <p className="text-[8px] text-ink-500 mt-1 uppercase tracking-wide">Insig.</p>
            </div>
            <div className="bg-status-green-soft rounded-lg p-2 text-center">
              <p className="text-[14px] font-bold text-status-green leading-none">1.7 kg</p>
              <p className="text-[8px] text-ink-500 mt-1 uppercase tracking-wide">CO₂</p>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-ink-100" />
            {SAMPLE_EVENTS.map((event, i) => {
              const Icon = event.icon;
              return (
                <div key={i} className="relative pb-3 last:pb-0">
                  <div className={`absolute -left-[14px] top-0.5 w-6 h-6 rounded-full ${event.iconBg} ${event.iconColor} flex items-center justify-center ring-4 ring-white`}>
                    <Icon size={10} strokeWidth={2.5} />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-ink-900 leading-tight">{event.title}</p>
                      <span className="text-[9px] font-bold text-ink-500 shrink-0">{event.time}</span>
                    </div>
                    <p className="text-[9px] text-ink-500 leading-tight mt-0.5">{event.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-gradient-to-r from-col-50 to-aqua-50 rounded-xl p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-col-700 font-bold">Calificación del día</p>
            <p className="text-[28px] font-bold text-ink-900 leading-none mt-1">9<span className="text-[14px] text-ink-500">/10</span></p>
            <p className="text-[9px] text-ink-500 italic mt-1">"Las reservas digitales nos cambiaron el día"</p>
          </div>
        </div>
      )}
    </section>
  );
}
