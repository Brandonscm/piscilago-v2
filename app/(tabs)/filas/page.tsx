"use client";

import { Clock, Users, TrendingUp, TrendingDown, Sparkles, RefreshCw } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import { recommend, aiBannerFor } from "@/lib/recommender";

export default function FilasPage() {
  const { data, forceRefresh, lastUpdate } = useLiveData(30000);

  const recommended = recommend(data, null, { limit: 3 }).map((r) => r.attraction.id);

  const ordered = [...data]
    .filter((a) => a.type !== "servicio")
    .sort((aA, aB) => {
      const aRec = recommended.includes(aA.id) ? 0 : 1;
      const bRec = recommended.includes(aB.id) ? 0 : 1;
      if (aRec !== bRec) return aRec - bRec;
      return aA.waitMin - aB.waitMin;
    });

  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);
  const banner = aiBannerFor(data);

  return (
    <div className="pb-4">
      <header className="flex items-center justify-between px-4 pt-3 pb-2">
        <div>
          <h1 className="text-base font-medium text-ink-900">Filas Inteligentes</h1>
          <p className="text-[10px] text-ink-500">Actualizado hace {secondsAgo}s</p>
        </div>
        <button
          onClick={forceRefresh}
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-col-600"
          aria-label="Actualizar"
        >
          <RefreshCw size={14} strokeWidth={2} />
        </button>
      </header>

      <div
        className="mx-4 rounded-xl p-3 flex items-center gap-2.5 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003478, #1565C0)" }}
      >
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles size={16} strokeWidth={2} />
        </div>
        <div>
          <p className="text-[8px] uppercase tracking-wide text-white/85 font-medium">
            Sugerencia IA
          </p>
          <p className="text-[11px] font-medium leading-tight mt-0.5">{banner}</p>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        {ordered.map((a) => {
          const isRec = recommended.includes(a.id);
          const stripe =
            a.congestion === "high"
              ? "border-l-status-red"
              : a.congestion === "medium"
                ? "border-l-status-yellow"
                : "border-l-status-green";
          const tagBg =
            a.congestion === "high"
              ? "bg-status-red-soft text-status-red"
              : a.congestion === "medium"
                ? "bg-status-yellow-soft text-status-yellow"
                : "bg-status-green-soft text-status-green";
          const tagText =
            a.congestion === "high"
              ? "Congestión"
              : a.congestion === "medium"
                ? "Moderada"
                : a.waitMin === 0
                  ? "Libre"
                  : "Fila corta";
          const capColor =
            a.congestion === "high"
              ? "bg-status-red"
              : a.congestion === "medium"
                ? "bg-status-yellow"
                : "bg-status-green";

          return (
            <div
              key={a.id}
              className={`bg-white rounded-2xl p-3 border-l-[3px] ${stripe} shadow-card flex items-center gap-2.5`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[12px] font-medium text-ink-900 truncate">{a.name}</p>
                  {isRec && (
                    <span className="inline-flex items-center gap-0.5 text-[8px] font-medium bg-aqua-50 text-aqua-800 px-1.5 py-0.5 rounded">
                      <Sparkles size={8} strokeWidth={2.5} />
                      IA
                    </span>
                  )}
                  {a.hasReservation && (
                    <span className="text-[8px] font-medium bg-col-50 text-col-700 px-1.5 py-0.5 rounded">
                      Reserva
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5 text-[9px] text-ink-500 mt-0.5">
                  <span className="inline-flex items-center gap-0.5">
                    <Users size={9} strokeWidth={2} />
                    {a.occupancyPct}%
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    {a.trend === "up" ? (
                      <TrendingUp size={9} strokeWidth={2} className="text-status-red" />
                    ) : a.trend === "down" ? (
                      <TrendingDown size={9} strokeWidth={2} className="text-status-green" />
                    ) : null}
                    zona {a.zone}
                  </span>
                </div>
                <div className="h-1 bg-ink-100 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full ${capColor} rounded-full transition-all duration-700`}
                    style={{ width: `${a.occupancyPct}%` }}
                  />
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[16px] font-medium text-ink-900 leading-none">
                  {a.waitMin}
                  <span className="text-[8px] font-normal text-ink-500 ml-0.5">min</span>
                </p>
                <span className={`inline-block mt-1 text-[8px] px-1.5 py-0.5 rounded font-medium ${tagBg}`}>
                  {tagText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
