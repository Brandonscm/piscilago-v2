"use client";

import { useState } from "react";
import { Clock, CalendarCheck, Users, Trash2, Bell, ChevronDown, Sparkles } from "lucide-react";
import { useReservations, minutesUntilSlot } from "@/lib/useReservations";
import { NewBadge } from "./NewBadge";
import { showToast } from "@/lib/toast";

export function MisReservas() {
  const { reservas, pendingReservas, activate, complete, remove } = useReservations();
  const [expanded, setExpanded] = useState(true);

  if (reservas.length === 0) {
    return (
      <section className="mx-4 mt-3 bg-white rounded-2xl p-4 border border-ink-100">
        <div className="flex items-center gap-2 mb-1.5">
          <CalendarCheck size={14} className="text-col-600" strokeWidth={2.2} />
          <p className="text-[12px] font-semibold text-ink-900">Mis Reservas</p>
          <NewBadge size="small" />
        </div>
        <p className="text-[10px] text-ink-500 leading-relaxed">
          Cuando reserves un turno en alguna atracción, aparecerá aquí con su código PSL y un contador en tiempo real.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-4 mt-3 bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between active:bg-ink-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-col-50 text-col-600 flex items-center justify-center">
            <CalendarCheck size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-semibold text-ink-900">Mis Reservas</p>
              <NewBadge size="small" />
            </div>
            <p className="text-[10px] text-ink-500">{pendingReservas.length} pendiente{pendingReservas.length !== 1 ? "s" : ""} · {reservas.length} total</p>
          </div>
        </div>
        <ChevronDown size={14} className={`text-ink-300 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.2} />
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1 space-y-2">
          {reservas.map((r) => {
            const minutes = minutesUntilSlot(r.timeSlot);
            const isPast = minutes < 0;
            const isClose = minutes >= 0 && minutes <= 20;
            const statusColor = r.status === "activa" ? "bg-status-green text-white" : r.status === "completada" ? "bg-ink-100 text-ink-500" : isClose ? "bg-sun-400 text-ink-900" : "bg-col-50 text-col-700";
            const statusText = r.status === "activa" ? "¡Tu turno es ahora!" : r.status === "completada" ? "Completada" : isClose ? `En ${minutes} min` : isPast ? "Próximamente" : `En ${Math.floor(minutes / 60)}h ${minutes % 60}m`;

            return (
              <div key={r.id} className={`rounded-xl p-3 border-l-[3px] ${r.status === "activa" ? "bg-status-green-soft border-l-status-green" : isClose ? "bg-sun-50 border-l-sun-400" : "bg-ink-50 border-l-col-300"}`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-ink-900 leading-tight">{r.attractionName}</p>
                    <p className="text-[16px] font-bold text-col-700 tracking-wider leading-tight mt-0.5">{r.code}</p>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-1 rounded uppercase tracking-wide whitespace-nowrap ${statusColor}`}>
                    {statusText}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-[9px] text-ink-500">
                  <span className="inline-flex items-center gap-0.5">
                    <Clock size={9} strokeWidth={2.2} /> {r.timeSlot}
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <Users size={9} strokeWidth={2.2} /> {r.people}
                  </span>
                  {r.accessibility.length > 0 && (
                    <span className="text-aqua-700">{r.accessibility.length} accesib.</span>
                  )}
                </div>

                {r.status === "pendiente" && (
                  <div className="mt-2 pt-2 border-t border-white/60 flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        activate(r.id);
                        showToast({
                          tone: "success",
                          title: "¡Tu turno es ahora!",
                          message: `${r.attractionName} · Acércate y escanea tu pulsera NFC`,
                        });
                      }}
                      className="flex-1 bg-status-green text-white rounded-lg py-1.5 text-[10px] font-semibold active:scale-[0.97] inline-flex items-center justify-center gap-1"
                    >
                      <Bell size={10} strokeWidth={2.5} />
                      Simular turno (demo)
                    </button>
                    <button
                      onClick={() => {
                        remove(r.id);
                        showToast({ tone: "success", title: "Reserva cancelada" });
                      }}
                      className="w-7 h-7 rounded-lg bg-white text-ink-500 flex items-center justify-center active:scale-95"
                      aria-label="Cancelar reserva"
                    >
                      <Trash2 size={11} strokeWidth={2.2} />
                    </button>
                  </div>
                )}

                {r.status === "activa" && (
                  <div className="mt-2 pt-2 border-t border-white/60 flex items-center gap-1.5">
                    <div className="flex-1 bg-white rounded-lg py-1.5 px-2 inline-flex items-center justify-center gap-1 text-[10px] font-semibold text-status-green">
                      <Sparkles size={10} strokeWidth={2.5} />
                      Acerca tu pulsera al lector
                    </div>
                    <button
                      onClick={() => {
                        complete(r.id);
                        showToast({ tone: "success", title: "¡Disfruta tu atracción!" });
                      }}
                      className="px-2 py-1.5 rounded-lg bg-col-600 text-white text-[10px] font-semibold active:scale-95"
                    >
                      Validar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
