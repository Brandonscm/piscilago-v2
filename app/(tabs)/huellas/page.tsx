"use client";

import Link from "next/link";
import Image from "next/image";
import { Trophy, Sparkles, Lock, Leaf, Gift, ArrowRight, Footprints, Award } from "lucide-react";
import { useInsignias } from "@/lib/useInsignias";
import { useSteps, REWARD_TIERS_BASE } from "@/lib/useSteps";
import { showToast } from "@/lib/toast";

const ECOSYSTEM_LABELS: Record<string, { name: string; bg: string; text: string }> = {
  acuatico: { name: "Acuático", bg: "bg-aqua-50", text: "text-aqua-700" },
  dosel: { name: "Dosel del bosque", bg: "bg-status-green-soft", text: "text-status-green" },
  sotobosque: { name: "Sotobosque", bg: "bg-amber-50", text: "text-amber-700" },
  terrestre: { name: "Terrestre", bg: "bg-stone-100", text: "text-stone-700" },
};

export default function HuellasPage() {
  const { byEcosystem, insignias, greenPoints, rewards, unlockSpecies } = useInsignias();
  const { steps, tiers, currentTier, nextTier, progressToNext } = useSteps(3240);
  const unlockedCount = insignias.filter((i) => i.unlocked).length;

  return (
    <div className="pb-6">
      <header className="flex items-center justify-between px-4 pt-2 pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-wild-600 font-semibold">
            Huellas de Conservación
          </p>
          <h1 className="text-lg font-semibold text-ink-900">Tu impacto en el parque</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-wild-50 text-wild-600 flex items-center justify-center shadow-card">
          <Trophy size={17} strokeWidth={2} />
        </div>
      </header>

      <section className="mx-4 mt-2 rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #003478 0%, #C2185B 100%)" }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative p-4 text-white">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <Leaf size={14} strokeWidth={2} className="text-wild-100" />
                <p className="text-[9px] uppercase tracking-wider text-white/85 font-semibold">
                  Puntos verdes
                </p>
              </div>
              <p className="text-[28px] font-bold leading-none mt-1">{greenPoints}</p>
              <p className="text-[9px] text-white/75 mt-0.5">de conservación</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Footprints size={14} strokeWidth={2} className="text-sun-100" />
                <p className="text-[9px] uppercase tracking-wider text-white/85 font-semibold">
                  Pasos hoy
                </p>
              </div>
              <p className="text-[28px] font-bold leading-none mt-1">{steps.toLocaleString("es-CO")}</p>
              <p className="text-[9px] text-white/75 mt-0.5">
                · {((steps / 1000) * 0.4).toFixed(1)} kg CO₂ evitados
              </p>
            </div>
          </div>

          {nextTier && (
            <div className="mt-3">
              <div className="flex justify-between text-[9px] text-white/85 mb-1">
                <span>Nivel actual: {currentTier?.name ?? "Sin desbloquear"}</span>
                <span>Faltan {(nextTier.steps - steps).toLocaleString("es-CO")} pasos</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-sun-400 rounded-full transition-all duration-700" style={{ width: `${progressToNext}%` }} />
              </div>
              <p className="text-[10px] text-sun-100 font-semibold mt-2 leading-tight">
                {progressToNext > 80 ? "¡Ya casi! Estás a punto de desbloquear tu próximo descuento" :
                 progressToNext > 50 ? "¡Vas excelente! Sigue caminando para tu próxima recompensa" :
                 progressToNext > 25 ? "Buen ritmo. Cada paso suma a tu impacto" :
                 "Comienza tu jornada — cada paso cuenta para la conservación"}
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="px-4 mt-4 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-ink-900">
          Insignias de Guardián · {unlockedCount}/{insignias.length}
        </h2>
        <span className="text-[9px] text-ink-500 font-medium">Toca para conocer</span>
      </div>

      <div className="px-4 mt-2 space-y-3">
        {byEcosystem.map(({ ecosystem, insignias: list }) => {
          const cfg = ECOSYSTEM_LABELS[ecosystem] ?? { name: ecosystem, bg: "bg-ink-100", text: "text-ink-700" };
          return (
            <div key={ecosystem} className="bg-white rounded-2xl p-3 shadow-card">
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.text} text-[9px] font-semibold uppercase tracking-wide`}>
                {cfg.name}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {list.map((i) => (
                  <Link
                    key={i.speciesId}
                    href={`/especies/${i.speciesId}`}
                    className={`relative aspect-square rounded-xl overflow-hidden active:scale-95 transition-transform ${i.unlocked ? "" : "opacity-50"}`}
                  >
                    <img
                      src={i.species.thumbnailUrl}
                      alt={i.species.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                    {!i.unlocked && (
                      <div className="absolute inset-0 bg-ink-900/40 flex items-center justify-center">
                        <Lock size={20} className="text-white" strokeWidth={2} />
                      </div>
                    )}
                    {i.unlocked && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-wild-500 text-white flex items-center justify-center">
                        <Sparkles size={10} strokeWidth={2.5} />
                      </div>
                    )}
                    <p className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold text-white leading-tight">
                      {i.species.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 mt-5 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-ink-900">Canjea tus puntos verdes</h2>
        <span className="text-[10px] font-medium text-wild-600">{greenPoints} disponibles</span>
      </div>

      <div className="px-4 mt-2 space-y-2">
        {rewards.map((r) => (
          <div
            key={r.id}
            className={`bg-white rounded-2xl p-3 shadow-card flex items-center gap-3 ${r.unlocked ? "" : "opacity-60"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              r.category === "experiencia" ? "bg-wild-50 text-wild-600" :
              r.category === "educativo" ? "bg-col-50 text-col-600" :
              "bg-status-green-soft text-status-green"
            }`}>
              <Gift size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-ink-900 leading-tight">{r.name}</p>
              <p className="text-[9px] text-ink-500 mt-0.5 leading-tight">{r.description}</p>
            </div>
            <button
              type="button"
              disabled={!r.unlocked}
              onClick={() => showToast({
                tone: "wild",
                title: "Recompensa reclamada",
                message: `${r.name} ha sido reservada con tu pulsera NFC`,
              })}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold shrink-0 transition-colors ${
                r.unlocked
                  ? "bg-wild-500 text-white active:scale-95"
                  : "bg-ink-100 text-ink-300 cursor-not-allowed"
              }`}
            >
              {r.unlocked ? "Canjear" : `${r.cost} pts`}
            </button>
          </div>
        ))}
      </div>

      <div className="px-4 mt-5">
        <h2 className="text-[13px] font-semibold text-ink-900 mb-2">Descuentos por movilidad</h2>
        <div className="space-y-2">
          {tiers.map((t) => (
            <div key={t.level} className={`bg-white rounded-2xl p-3 shadow-card flex items-center gap-3 ${t.unlocked ? "" : "opacity-60"}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{
                background: t.level === 1 ? "linear-gradient(135deg, #1565C0, #003478)" :
                            t.level === 2 ? "linear-gradient(135deg, #26A69A, #00695C)" :
                            t.level === 3 ? "linear-gradient(135deg, #FFB300, #FF8F00)" :
                                            "linear-gradient(135deg, #EC407A, #C2185B)",
              }}>
                <span className="text-sm font-bold">{t.discount}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-ink-900">{t.name}</p>
                <p className="text-[9px] text-ink-500 mt-0.5">
                  {t.steps.toLocaleString("es-CO")} pasos · {t.scope}
                </p>
              </div>
              {t.unlocked ? (
                <span className="text-[8px] font-bold bg-status-green-soft text-status-green px-2 py-1 rounded uppercase tracking-wide">
                  Activo
                </span>
              ) : (
                <Lock size={14} className="text-ink-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
