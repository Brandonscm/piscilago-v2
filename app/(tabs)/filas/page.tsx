"use client";

import { useState } from "react";
import { Users, TrendingUp, TrendingDown, Sparkles, RefreshCw, CalendarCheck, Zap } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import { recommend, aiBannerFor } from "@/lib/recommender";
import { showToast } from "@/lib/toast";
import { ReservationModal } from "@/components/common/ReservationModal";

export default function FilasPage() {
  const { data, forceRefresh, lastUpdate } = useLiveData(30000);
  const [reserving, setReserving] = useState<{ open: boolean; name: string }>({ open: false, name: "" });

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
    <div className="pb-24">
      <header className="flex items-center justify-between px-4 pt-2 pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-col-600 font-semibold">
            Smart Queues · {ordered.length} atracciones
          </p>
          <h1 className="text-lg font-semibold text-ink-900">Filas Inteligentes</h1>
          <div className="inline-flex items-center gap-1 mt-1 bg-aqua-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
            <p className="text-[9px] text-aqua-800 font-semibold">
              {secondsAgo < 5 ? "Datos en tiempo real" : `Sincronizado hace ${secondsAgo}s`}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            forceRefresh();
            showToast({ tone: "success", title: "Datos actualizados", message: "Sensores sincronizados con todas las atracciones" });
          }}
          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 active:scale-95 transition-transform"
        >
          <RefreshCw size={14} strokeWidth={2} />
        </button>
      </header>

      <div className="mx-4 rounded-2xl p-3 flex items-center gap-2.5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #003478, #1565C0)" }}>
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles size={16} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] uppercase tracking-wide text-white/85 font-bold">Sugerencia IA</p>
          <p className="text-[11px] font-medium leading-tight mt-0.5">{banner}</p>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        {ordered.map((a) => {
          const isRec = recommended.includes(a.id);
          const stripe = a.congestion === "high" ? "border-l-status-red" :
                         a.congestion === "medium" ? "border-l-status-yellow" : "border-l-status-green";
          const tagBg = a.congestion === "high" ? "bg-status-red-soft text-status-red" :
                        a.congestion === "medium" ? "bg-status-yellow-soft text-status-yellow" :
                        a.waitMin === 0 ? "bg-status-green text-white" : "bg-status-green-soft text-status-green";
          const tagText = a.congestion === "high" ? "Congestión alta" :
                          a.congestion === "medium" ? "Espera moderada" :
                          a.waitMin === 0 ? "¡Disponible ahora!" : "Pocas filas";
          const promotional = a.congestion === "low" && a.waitMin === 0 ? "No te la pierdas" :
                              a.congestion === "low" ? "Aprovecha ahora" :
                              a.congestion === "high" ? "Busca alternativa" : null;
          const capColor = a.congestion === "high" ? "bg-status-red" :
                           a.congestion === "medium" ? "bg-status-yellow" : "bg-status-green";

          return (
            <div
              key={a.id}
              className={`w-full bg-white rounded-2xl p-3 border-l-[3px] ${stripe} shadow-card`}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-[12px] font-semibold text-ink-900 leading-tight">{a.name}</p>
                    {isRec && (
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-bold bg-aqua-50 text-aqua-700 px-1.5 py-0.5 rounded uppercase">
                        <Sparkles size={8} strokeWidth={2.5} />
                        IA
                      </span>
                    )}
                    {a.hasReservation && (
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-bold bg-sun-50 text-sun-700 px-1.5 py-0.5 rounded uppercase">
                        <CalendarCheck size={8} strokeWidth={2.5} />
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
                    <div className={`h-full ${capColor} rounded-full transition-all duration-700`} style={{ width: `${a.occupancyPct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[16px] font-semibold text-ink-900 leading-none">
                    {a.waitMin}<span className="text-[8px] font-normal text-ink-500 ml-0.5">min</span>
                  </p>
                  <span className={`inline-block mt-1 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${tagBg}`}>
                    {tagText}
                  </span>
                </div>
              </div>

              {(promotional || a.congestion !== "high") && (
                <div className="mt-2.5 pt-2.5 border-t border-ink-100 flex items-center justify-between gap-2">
                  {promotional && (
                    <div className="inline-flex items-center gap-1 text-[10px] text-status-green font-semibold">
                      <Zap size={10} strokeWidth={2.5} />
                      {promotional}
                    </div>
                  )}
                  {a.congestion !== "high" && (
                    <button
                      onClick={() => setReserving({ open: true, name: a.name })}
                      className="ml-auto inline-flex items-center gap-1 bg-col-600 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-semibold active:scale-95 transition-transform"
                    >
                      <CalendarCheck size={11} strokeWidth={2.5} />
                      Reservar turno
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ReservationModal
        open={reserving.open}
        attractionName={reserving.name}
        onClose={() => setReserving({ open: false, name: "" })}
      />
    </div>
  );
}
