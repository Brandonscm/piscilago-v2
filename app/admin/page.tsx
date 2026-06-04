"use client";

import Link from "next/link";
import { ArrowLeft, TrendingDown, TrendingUp, Target, Sparkles, CheckCircle2, AlertCircle, Activity, Users, Clock, BarChart3 } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";

const HALLAZGOS = [
  { problema: "Pisciflash · doble fila 75min", solucion: "Filas Inteligentes + Reserva PSL", impacto: "−65% espera", cobertura: 100 },
  { problema: "Piscitornado · sin sombra 60min", solucion: "Filtro Hidratación + asistente clima", impacto: "Dispersión activa", cobertura: 85 },
  { problema: "Anaconda · flotadores atascados", solucion: "Notif. en vivo · espera 5min", impacto: "Comunicación", cobertura: 60 },
  { problema: "Megatobogán · sin bancas", solucion: "Reserva turno evita espera de pie", impacto: "Mitigación", cobertura: 70 },
  { problema: "35% señalización Baja/Incompleta", solucion: "BrandBar + breadcrumbs + Asistente IA", impacto: "Reemplazo digital", cobertura: 100 },
  { problema: "Fatiga vespertina 17:27", solucion: "Recomendación de descanso 16:00", impacto: "Mitigación", cobertura: 50 },
  { problema: "Desconocimiento alternativas", solucion: "Ver disponibles + IA recommendation", impacto: "Dispersión 30%+", cobertura: 100 },
  { problema: "Conservación no integrada", solucion: "Huellas + Insignias + paneles NFC", impacto: "Diferenciador", cobertura: 100 },
];

export default function AdminPage() {
  const { data } = useLiveData(30000);
  const operational = data.filter((a) => a.type !== "servicio");
  const avgWait = Math.round(operational.reduce((s, a) => s + a.waitMin, 0) / operational.length);
  const congestedCount = operational.filter((a) => a.congestion === "high").length;
  const totalCobertura = Math.round(HALLAZGOS.reduce((s, h) => s + h.cobertura, 0) / HALLAZGOS.length);

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="bg-white border-b border-ink-100 px-4 py-3 flex items-center gap-3">
        <Link href="/home" className="w-9 h-9 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95">
          <ArrowLeft size={15} strokeWidth={2.2} />
        </Link>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-col-600 font-semibold">Dashboard de Operaciones · Piscilago 2.0</p>
          <h1 className="text-[15px] font-semibold text-ink-900 leading-tight">Centro de Control</h1>
        </div>
      </header>

      <div className="p-4 space-y-4 max-w-screen-md mx-auto">
        <section className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-col-600" strokeWidth={2.2} />
            <h2 className="text-[12px] font-semibold text-ink-900">Indicadores en Tiempo Real</h2>
            <span className="inline-flex items-center gap-1 text-[8px] bg-status-green-soft text-status-green px-1.5 py-0.5 rounded uppercase font-bold ml-auto">
              <span className="w-1 h-1 rounded-full bg-status-green animate-pulse" />
              Vivo
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-[8px] uppercase tracking-wide text-ink-500 font-bold">Espera promedio</p>
              <p className="text-[22px] font-bold text-ink-900 leading-none mt-1">{avgWait}<span className="text-[10px] font-normal text-ink-500 ml-0.5">min</span></p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown size={9} className="text-status-green" strokeWidth={2.5} />
                <span className="text-[9px] text-status-green font-semibold">vs 28 min baseline</span>
              </div>
            </div>
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-[8px] uppercase tracking-wide text-ink-500 font-bold">Congestionadas</p>
              <p className="text-[22px] font-bold text-ink-900 leading-none mt-1">{congestedCount}<span className="text-[10px] font-normal text-ink-500 ml-0.5">/{operational.length}</span></p>
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle size={9} className="text-status-yellow" strokeWidth={2.5} />
                <span className="text-[9px] text-ink-500 font-semibold">alertas activas</span>
              </div>
            </div>
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-[8px] uppercase tracking-wide text-ink-500 font-bold">Cobertura</p>
              <p className="text-[22px] font-bold text-ink-900 leading-none mt-1">{totalCobertura}<span className="text-[10px] font-normal text-ink-500 ml-0.5">%</span></p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 size={9} className="text-col-600" strokeWidth={2.5} />
                <span className="text-[9px] text-ink-500 font-semibold">hallazgos EAN</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-col-600" strokeWidth={2.2} />
            <h2 className="text-[12px] font-semibold text-ink-900">Métricas Proyectadas a 6 meses</h2>
            <span className="inline-flex items-center gap-1 text-[8px] bg-sun-50 text-sun-700 px-1.5 py-0.5 rounded uppercase font-bold ml-auto">
              Proyección
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] text-ink-900 font-semibold">Tiempo promedio de espera</p>
                <p className="text-[11px] font-bold text-status-green">28 → 17 min</p>
              </div>
              <div className="relative h-2 bg-ink-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-status-red rounded-full" style={{ width: "100%" }} />
                <div className="absolute inset-y-0 left-0 bg-status-green rounded-full" style={{ width: "60%" }} />
              </div>
              <p className="text-[9px] text-ink-500 mt-1">Reducción del 40% — alineado con meta EAN</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] text-ink-900 font-semibold">NPS proyectado</p>
                <p className="text-[11px] font-bold text-status-green">+37 → +55</p>
              </div>
              <div className="relative h-2 bg-ink-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-col-600 rounded-full" style={{ width: "73%" }} />
              </div>
              <p className="text-[9px] text-ink-500 mt-1">Conversión de 49% pasivos a promotores</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] text-ink-900 font-semibold">Adopción de app (6 meses)</p>
                <p className="text-[11px] font-bold text-status-green">0% → 60%</p>
              </div>
              <div className="relative h-2 bg-ink-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-wild-500 rounded-full" style={{ width: "60%" }} />
              </div>
              <p className="text-[9px] text-ink-500 mt-1">Visitantes con pulsera NFC + app activa</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] text-ink-900 font-semibold">Atracciones con cero fila</p>
                <p className="text-[11px] font-bold text-status-green">27% → 15%</p>
              </div>
              <div className="relative h-2 bg-ink-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-aqua-500 rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-[9px] text-ink-500 mt-1">Mejor distribución de demanda via IA</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-col-600" strokeWidth={2.2} />
            <h2 className="text-[12px] font-semibold text-ink-900">Cobertura de Hallazgos EAN → Solución App</h2>
          </div>
          <div className="space-y-2">
            {HALLAZGOS.map((h, i) => (
              <div key={i} className="border border-ink-100 rounded-xl p-2.5">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-ink-900 leading-tight">{h.problema}</p>
                    <p className="text-[9px] text-col-600 mt-0.5 leading-tight">↳ {h.solucion}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[12px] font-bold text-ink-900 leading-none">{h.cobertura}%</p>
                    <p className="text-[8px] text-status-green font-semibold uppercase tracking-wide mt-0.5">{h.impacto}</p>
                  </div>
                </div>
                <div className="relative h-1 bg-ink-100 rounded-full overflow-hidden mt-1.5">
                  <div className={`absolute inset-y-0 left-0 rounded-full ${h.cobertura === 100 ? "bg-status-green" : h.cobertura >= 80 ? "bg-status-yellow" : "bg-status-red"}`} style={{ width: `${h.cobertura}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-col-600" strokeWidth={2.2} />
            <h2 className="text-[12px] font-semibold text-ink-900">Atracciones en operación</h2>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {operational.slice(0, 12).map((a) => (
              <div key={a.id} className={`rounded-lg p-2 text-[9px] ${a.congestion === "high" ? "bg-status-red-soft" : a.congestion === "medium" ? "bg-status-yellow-soft" : "bg-status-green-soft"}`}>
                <p className="font-semibold text-ink-900 leading-tight truncate">{a.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-ink-500">{a.waitMin}min</span>
                  <span className="font-bold">{a.occupancyPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
