"use client";

import { useState } from "react";
import { RefreshCw, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import { ParkMap } from "@/components/mapa/ParkMap";

type Filter = "all" | "tobogan" | "cooling" | "comida";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "tobogan", label: "Toboganes" },
  { id: "cooling", label: "Cooling" },
  { id: "comida", label: "Comida" },
];

const LEGEND = [
  { color: "#2E7D32", label: "Fila corta" },
  { color: "#F57F17", label: "Moderada" },
  { color: "#C62828", label: "Congestión" },
  { color: "#0277BD", label: "Cooling" },
];

export default function MapPage() {
  const { data, forceRefresh, lastUpdate } = useLiveData(30000);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = data.filter((a) => {
    if (filter === "all") return true;
    if (filter === "tobogan") return a.type === "tobogan";
    if (filter === "cooling") return a.hasCoolingZone;
    if (filter === "comida") return a.type === "servicio";
    return true;
  });

  const selected = data.find((a) => a.id === selectedId) ?? null;
  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);

  return (
    <div className="h-full flex flex-col pb-4">
      <header className="flex items-center justify-between px-4 pt-3 pb-2">
        <div>
          <h1 className="text-base font-medium text-ink-900">Mapa Inteligente</h1>
          <p className="text-[10px] text-ink-500">
            Actualizado hace {secondsAgo}s · sincronizado con paneles
          </p>
        </div>
        <button
          onClick={forceRefresh}
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-col-600"
          aria-label="Actualizar"
        >
          <RefreshCw size={14} strokeWidth={2} />
        </button>
      </header>

      <div className="px-4 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`text-[10px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                active
                  ? "bg-col-600 text-white"
                  : "bg-white text-ink-500 border border-ink-100"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="mx-4 mt-2 flex-1 min-h-0 bg-[#D7E9F2] rounded-2xl relative overflow-hidden shadow-card">
        <ParkMap
          attractions={filtered}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />

        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur rounded-xl p-2 flex flex-col gap-1 shadow-card">
          {LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-[9px] text-ink-900 font-medium">
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>

        {selected && (
          <div className="absolute left-2 right-2 bottom-2 bg-white rounded-2xl p-3 shadow-elevated flex items-center gap-2.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{
                background:
                  selected.congestion === "high"
                    ? "linear-gradient(135deg, #E57373, #C62828)"
                    : selected.congestion === "medium"
                      ? "linear-gradient(135deg, #FFB74D, #F57F17)"
                      : "linear-gradient(135deg, #1565C0, #003478)",
              }}
            >
              <MapPin size={20} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-ink-900 truncate">{selected.name}</p>
              <div className="flex gap-2.5 text-[9px] text-ink-500 mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <Clock size={9} strokeWidth={2} />
                  {selected.waitMin} min
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users size={9} strokeWidth={2} />
                  {selected.occupancyPct}%
                </span>
              </div>
              <span
                className={`inline-block mt-1 text-[8px] px-1.5 py-0.5 rounded-md font-medium ${
                  selected.congestion === "high"
                    ? "bg-status-red-soft text-status-red"
                    : selected.congestion === "medium"
                      ? "bg-status-yellow-soft text-status-yellow"
                      : "bg-status-green-soft text-status-green"
                }`}
              >
                {selected.congestion === "high"
                  ? "Congestión alta · busca alternativa"
                  : selected.congestion === "medium"
                    ? "Demanda moderada"
                    : "Disponible ahora"}
              </span>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="px-3 py-1.5 rounded-lg bg-col-600 text-white text-[10px] font-medium inline-flex items-center gap-1 shrink-0"
            >
              Ir
              <ArrowRight size={11} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
