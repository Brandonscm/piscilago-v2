"use client";

import { useState } from "react";
import { RefreshCw, MapPin, Clock, Users, ArrowRight, Droplets, CalendarCheck, Sparkles } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import { ParkMap } from "@/components/mapa/ParkMap";
import { ReservationModal } from "@/components/common/ReservationModal";
import { showToast } from "@/lib/toast";

type Filter = "all" | "tobogan" | "hidratacion" | "comida";

const FILTERS: { id: Filter; label: string; emoji?: string }[] = [
  { id: "all", label: "Todas" },
  { id: "tobogan", label: "Toboganes" },
  { id: "hidratacion", label: "Hidratación" },
  { id: "comida", label: "Comida" },
];

const LEGEND = [
  { color: "#2E7D32", label: "Disponible" },
  { color: "#F57F17", label: "Moderada" },
  { color: "#C62828", label: "Congestión" },
  { color: "#0277BD", label: "Hidratación" },
];

export default function MapPage() {
  const { data, forceRefresh, lastUpdate } = useLiveData(30000);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reserving, setReserving] = useState<{ open: boolean; name: string }>({ open: false, name: "" });
  const [showLeastCrowded, setShowLeastCrowded] = useState(false);

  const filtered = data.filter((a) => {
    if (filter === "all") return true;
    if (filter === "tobogan") return a.type === "tobogan";
    if (filter === "hidratacion") return a.hasCoolingZone;
    if (filter === "comida") return a.type === "servicio";
    return true;
  });

  const selected = data.find((a) => a.id === selectedId) ?? null;
  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);
  const leastCrowded = [...data]
    .filter((a) => a.type !== "servicio")
    .sort((a, b) => a.waitMin - b.waitMin)
    .slice(0, 3);

  return (
    <div className="pb-24">
      <header className="flex items-center justify-between px-4 pt-2 pb-2">
        <div>
          <h1 className="text-lg font-semibold text-ink-900">Mapa Inteligente</h1>
          <div className="inline-flex items-center gap-1 mt-0.5 bg-aqua-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
            <p className="text-[9px] text-aqua-800 font-semibold">
              {secondsAgo < 5 ? "Datos en tiempo real" : `Sincronizado hace ${secondsAgo}s`}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            forceRefresh();
            showToast({ tone: "success", title: "Mapa actualizado" });
          }}
          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 active:scale-95 transition-transform"
        >
          <RefreshCw size={14} strokeWidth={2} />
        </button>
      </header>

      <div className="px-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors active:scale-95 ${
              filter === f.id ? "bg-col-700 text-white" : "bg-white text-ink-700 border border-ink-100"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => setShowLeastCrowded(!showLeastCrowded)}
          className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors active:scale-95 ${
            showLeastCrowded ? "bg-status-green text-white" : "bg-status-green-soft text-status-green border border-status-green/30"
          }`}
        >
          <Sparkles size={11} strokeWidth={2.5} />
          Ver disponibles
        </button>
      </div>

      {showLeastCrowded && (
        <div className="mx-4 mb-2 bg-status-green-soft border border-status-green/30 rounded-2xl p-3">
          <p className="text-[10px] uppercase tracking-wide text-status-green font-bold mb-2">
            ✨ Top 3 con menos fila ahora
          </p>
          <div className="space-y-1.5">
            {leastCrowded.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setSelectedId(a.id);
                  setShowLeastCrowded(false);
                }}
                className="w-full flex items-center justify-between bg-white rounded-xl p-2 active:scale-[0.98] transition-transform"
              >
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-ink-900">{a.name}</p>
                  <p className="text-[9px] text-ink-500">{a.occupancyPct}% aforo · zona {a.zone}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-status-green">{a.waitMin}<span className="text-[8px] font-normal text-ink-500 ml-0.5">min</span></span>
                  <ArrowRight size={12} className="text-ink-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4">
        <ParkMap
          attractions={filtered}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />

        {filter === "hidratacion" && (
          <div className="mt-2 bg-aqua-50 border border-aqua-100 rounded-2xl p-3 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-aqua-500 text-white flex items-center justify-center shrink-0">
              <Droplets size={14} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-aqua-800">Puntos de Hidratación</p>
              <p className="text-[10px] text-aqua-700 leading-relaxed mt-0.5">
                7 zonas con aspersores y sombra natural distribuidas por el parque. Acércate para refrescarte cuando lo necesites.
              </p>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="mx-4 mt-3 bg-white rounded-2xl p-3 shadow-elevated border border-col-100">
          <div className="flex items-start gap-2.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0`} style={{
              background: selected.congestion === "high" ? "#C62828" :
                          selected.congestion === "medium" ? "#F57F17" :
                          selected.hasCoolingZone ? "#0277BD" : "#2E7D32",
            }}>
              <MapPin size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-ink-900">{selected.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-ink-500 mt-0.5">
                <span className="inline-flex items-center gap-0.5">
                  <Clock size={9} strokeWidth={2.2} /> {selected.waitMin} min
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <Users size={9} strokeWidth={2.2} /> {selected.occupancyPct}%
                </span>
                <span>zona {selected.zone}</span>
              </div>
              {selected.hasCoolingZone && (
                <span className="inline-flex items-center gap-0.5 mt-1.5 text-[9px] font-bold bg-aqua-50 text-aqua-700 px-1.5 py-0.5 rounded uppercase">
                  <Droplets size={9} strokeWidth={2.5} />
                  Hidratación cerca
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="text-ink-300 text-[14px] active:scale-95"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          {selected.type !== "servicio" && selected.congestion !== "high" && (
            <button
              onClick={() => setReserving({ open: true, name: selected.name })}
              className="w-full mt-3 bg-col-600 text-white rounded-xl py-2.5 text-[11px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
            >
              <CalendarCheck size={12} strokeWidth={2.5} />
              Reservar turno aquí
            </button>
          )}
          {selected.congestion === "high" && (
            <div className="mt-3 bg-status-red-soft border border-status-red/20 rounded-xl p-2.5">
              <p className="text-[10px] text-status-red font-semibold">⚠ Congestión alta · Te sugerimos buscar alternativa</p>
            </div>
          )}
        </div>
      )}

      <ReservationModal
        open={reserving.open}
        attractionName={reserving.name}
        onClose={() => setReserving({ open: false, name: "" })}
      />
    </div>
  );
}
