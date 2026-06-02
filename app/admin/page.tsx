"use client";

import { useLiveData } from "@/lib/useLiveData";
import { Activity, AlertTriangle, TrendingDown, Users, Clock, Smile, type LucideIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const { data, lastUpdate } = useLiveData(15000);

  const operational = data.filter((a) => a.type !== "servicio");
  const critical = operational.filter((a) => a.congestion === "high");
  const medium = operational.filter((a) => a.congestion === "medium");
  const low = operational.filter((a) => a.congestion === "low");

  const avgWait = Math.round(
    operational.reduce((sum, a) => sum + a.waitMin, 0) / operational.length,
  );
  const maxWait = Math.max(...operational.map((a) => a.waitMin));
  const totalOcc = operational.reduce((sum, a) => sum + a.occupancy, 0);
  const totalCap = operational.reduce((sum, a) => sum + a.capacity, 0);
  const parkPct = Math.round((totalOcc / totalCap) * 100);

  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);

  return (
    <div className="min-h-screen bg-surface-50 p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-col-600 font-medium">
            Piscilago Colsubsidio · Operaciones
          </p>
          <h1 className="text-2xl lg:text-3xl font-medium text-ink-900 mt-1">
            Dashboard en tiempo real
          </h1>
        </div>
        <div className="text-right text-[11px] text-ink-500">
          Última actualización
          <p className="text-base font-medium text-ink-900 mt-0.5">hace {secondsAgo}s</p>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard
          label="Aforo del parque"
          value={`${parkPct}%`}
          sub={`${totalOcc.toLocaleString("es-CO")} de ${totalCap.toLocaleString("es-CO")}`}
          icon={Users}
          tone="info"
        />
        <KpiCard
          label="Espera promedio"
          value={`${avgWait} min`}
          sub={`Máximo: ${maxWait} min`}
          icon={Clock}
          tone={avgWait > 25 ? "warning" : "success"}
        />
        <KpiCard
          label="Atracciones críticas"
          value={`${critical.length}`}
          sub={`de ${operational.length} totales`}
          icon={AlertTriangle}
          tone={critical.length > 2 ? "danger" : "warning"}
        />
        <KpiCard
          label="Satisfacción estimada"
          value={`${Math.max(60, 95 - critical.length * 4 - Math.max(0, avgWait - 20))}%`}
          sub="modelo predictivo"
          icon={Smile}
          tone="success"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-ink-900">Distribución de congestión</h2>
            <Activity size={16} className="text-col-600" />
          </div>
          <div className="space-y-2.5">
            <DistRow label="Fila corta" count={low.length} total={operational.length} color="bg-status-green" />
            <DistRow label="Moderada" count={medium.length} total={operational.length} color="bg-status-yellow" />
            <DistRow label="Congestión alta" count={critical.length} total={operational.length} color="bg-status-red" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h2 className="text-sm font-medium text-ink-900 mb-3">Top 5 atracciones con mayor espera</h2>
          <div className="space-y-2">
            {[...operational]
              .sort((a, b) => b.waitMin - a.waitMin)
              .slice(0, 5)
              .map((a) => (
                <div key={a.id} className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      a.congestion === "high"
                        ? "bg-status-red"
                        : a.congestion === "medium"
                          ? "bg-status-yellow"
                          : "bg-status-green"
                    }`}
                  />
                  <span className="text-[12px] text-ink-900 flex-1">{a.name}</span>
                  <span className="text-[11px] text-ink-500">{a.occupancyPct}% aforo</span>
                  <span className="text-[12px] font-medium text-ink-900 w-12 text-right">
                    {a.waitMin} min
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="mt-4 bg-white rounded-2xl p-5 shadow-card">
        <h2 className="text-sm font-medium text-ink-900 mb-3">Estado completo de atracciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {operational.map((a) => (
            <div
              key={a.id}
              className="border border-ink-100 rounded-xl p-3 flex items-center gap-2.5"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  a.congestion === "high"
                    ? "bg-status-red"
                    : a.congestion === "medium"
                      ? "bg-status-yellow"
                      : "bg-status-green"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-ink-900 truncate">{a.name}</p>
                <p className="text-[10px] text-ink-500">
                  {a.waitMin} min · {a.occupancyPct}% aforo
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <p className="text-[10px] uppercase tracking-wide text-status-green font-medium">
            Resultado esperado fase 1
          </p>
          <p className="text-2xl font-medium text-ink-900 mt-1">−65%</p>
          <p className="text-[11px] text-ink-500 mt-0.5">en espera crítica</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <p className="text-[10px] uppercase tracking-wide text-col-600 font-medium">
            Resultado esperado fase 1
          </p>
          <p className="text-2xl font-medium text-ink-900 mt-1">+25%</p>
          <p className="text-[11px] text-ink-500 mt-0.5">capacidad efectiva</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <p className="text-[10px] uppercase tracking-wide text-aqua-600 font-medium">
            Resultado esperado fase 1
          </p>
          <p className="text-2xl font-medium text-ink-900 mt-1">85%+</p>
          <p className="text-[11px] text-ink-500 mt-0.5">satisfacción con NPS positivo</p>
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  tone: "info" | "success" | "warning" | "danger";
}) {
  const toneStyles = {
    info: "bg-col-50 text-col-600",
    success: "bg-status-green-soft text-status-green",
    warning: "bg-status-yellow-soft text-status-yellow",
    danger: "bg-status-red-soft text-status-red",
  };
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase tracking-wide text-ink-500 font-medium">{label}</p>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${toneStyles[tone]}`}>
          <Icon size={14} />
        </div>
      </div>
      <p className="text-2xl font-medium text-ink-900 leading-tight">{value}</p>
      <p className="text-[10px] text-ink-500 mt-0.5">{sub}</p>
    </div>
  );
}

function DistRow({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-ink-900 mb-1">
        <span>{label}</span>
        <span className="font-medium">
          {count} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
