"use client";

import { Trophy, Flame, Coins, MapPin } from "lucide-react";
import { useSteps } from "@/lib/useSteps";

export default function RecompensasPage() {
  const { steps, tiers, currentTier, nextTier, progressToNext } = useSteps(3240);

  return (
    <div className="pb-4">
      <header className="flex items-center justify-between px-4 pt-3 pb-2">
        <div>
          <h1 className="text-base font-medium text-ink-900">Recompensas</h1>
          <p className="text-[10px] text-ink-500">
            Nivel actual: {currentTier?.name ?? "Sin desbloquear"}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-status-yellow-soft text-status-yellow flex items-center justify-center">
          <Trophy size={16} strokeWidth={2} />
        </div>
      </header>

      <section
        className="mx-4 rounded-2xl p-4 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003478, #1565C0)" }}
      >
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
        <p className="text-[26px] font-medium leading-none relative">
          {steps.toLocaleString("es-CO")}
        </p>
        <p className="text-[10px] text-white/85 mt-1 relative">pasos hoy</p>
        {nextTier && (
          <div className="relative mt-3">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-aqua-100 rounded-full transition-all duration-700"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="text-[9px] text-white/85 mt-1.5">
              Faltan {(nextTier.steps - steps).toLocaleString("es-CO")} pasos para nivel{" "}
              {nextTier.name}
            </p>
          </div>
        )}
      </section>

      <h2 className="px-4 mt-4 text-[12px] font-medium text-ink-900">Escala de descuentos</h2>
      <div className="px-4 mt-2 space-y-2">
        {tiers.map((t) => (
          <div
            key={t.level}
            className={`bg-white rounded-2xl p-3 shadow-card flex items-center gap-3 ${
              t.unlocked ? "" : "opacity-60"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${
                t.unlocked ? "" : "grayscale"
              }`}
              style={{
                background:
                  t.level === 1
                    ? "linear-gradient(135deg, #1565C0, #003478)"
                    : t.level === 2
                      ? "linear-gradient(135deg, #26A69A, #00695C)"
                      : t.level === 3
                        ? "linear-gradient(135deg, #FFB74D, #F57F17)"
                        : "linear-gradient(135deg, #BA68C8, #6A1B9A)",
              }}
            >
              <span className="text-base font-medium">{t.discount}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-ink-900">{t.name}</p>
              <p className="text-[9px] text-ink-500 mt-0.5">
                {t.steps.toLocaleString("es-CO")} pasos · {t.scope}
              </p>
            </div>
            {t.unlocked && (
              <span className="text-[8px] font-medium bg-status-green-soft text-status-green px-2 py-0.5 rounded">
                Desbloqueado
              </span>
            )}
          </div>
        ))}
      </div>

      <h2 className="px-4 mt-4 text-[12px] font-medium text-ink-900">Reto activo</h2>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-3 shadow-card flex items-center gap-2.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
          style={{ background: "linear-gradient(135deg, #FFB74D, #F57F17)" }}
        >
          <MapPin size={18} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-medium text-status-yellow uppercase tracking-wide">
            +5% extra esta semana
          </p>
          <p className="text-[11px] font-medium text-ink-900 mt-0.5">
            Visita 3 atracciones del sur del parque
          </p>
          <div className="h-1 bg-status-yellow-soft rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-status-yellow rounded-full w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
