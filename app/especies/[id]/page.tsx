"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Shield, MapPin, Map as MapIcon, Sparkles, Leaf, Trees } from "lucide-react";
import { speciesById } from "@/lib/species";
import { showToast } from "@/lib/toast";
import { useInsignias } from "@/lib/useInsignias";

export default function EspecieDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const species = speciesById(params.id);
  const { insignias, unlockSpecies } = useInsignias();

  if (!species) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-ink-900 font-semibold">Especie no encontrada</p>
          <Link href="/huellas" className="text-col-600 text-sm mt-2 inline-block">
            Volver a Huellas
          </Link>
        </div>
      </div>
    );
  }

  const isUnlocked = insignias.find((i) => i.speciesId === species.id)?.unlocked ?? false;

  return (
    <div className="min-h-screen bg-surface-50 pb-8">
      <div className="relative h-[280px] bg-ink-900">
        <img
          src={species.imageUrl}
          alt={species.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-ink-900/40" />

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-ink-900 shadow-card active:scale-95 transition-transform"
          aria-label="Volver"
        >
          <ArrowLeft size={17} strokeWidth={2} />
        </button>

        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-wild-500 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-elevated">
          <Shield size={11} strokeWidth={2.5} />
          {species.conservationLabel}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: species.zoneColor }} />
            <span className="text-[9px] uppercase tracking-wider text-white/85 font-semibold">
              Zona: {species.ecosystemLabel}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight">{species.name}</h1>
          <p className="text-[12px] text-white/80 italic mt-1">{species.scientific}</p>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10 grid grid-cols-2 gap-2">
        <Link
          href={`/panel/${species.senderoId}`}
          className="bg-white rounded-2xl p-3 shadow-elevated flex items-center gap-2 active:scale-[0.98] transition-transform"
        >
          <div className="w-9 h-9 rounded-xl bg-col-50 text-col-600 flex items-center justify-center shrink-0">
            <MapPin size={16} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[10px] text-ink-500 font-medium">Sendero temático</p>
            <p className="text-[12px] font-semibold text-ink-900 leading-tight">Cómo llegar</p>
          </div>
        </Link>
        <Link
          href={`/mapa?focus=${species.id}`}
          className="bg-white rounded-2xl p-3 shadow-elevated flex items-center gap-2 active:scale-[0.98] transition-transform"
        >
          <div className="w-9 h-9 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center shrink-0">
            <MapIcon size={16} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[10px] text-ink-500 font-medium">Ubicación</p>
            <p className="text-[12px] font-semibold text-ink-900 leading-tight">Ver en mapa</p>
          </div>
        </Link>
      </div>

      <section className="px-5 mt-5">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-wild-600 uppercase tracking-wider mb-2">
          <Leaf size={11} strokeWidth={2.5} />
          {species.region}
        </div>
        <p className="text-[14px] leading-relaxed text-ink-700">{species.description}</p>
      </section>

      <section className="px-5 mt-5">
        <h3 className="text-[11px] font-semibold text-ink-900 uppercase tracking-wide mb-2.5">
          ¿Sabías que?
        </h3>
        <div className="space-y-2">
          {species.funFacts.map((fact, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-card flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-wild-50 text-wild-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                {i + 1}
              </div>
              <p className="text-[12px] text-ink-700 leading-relaxed flex-1">{fact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-5 mt-5 bg-gradient-to-br from-wild-500 to-col-700 rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles size={13} strokeWidth={2.2} />
            <p className="text-[9px] uppercase tracking-wider font-semibold">
              Insignia de Guardián
            </p>
          </div>
          <p className="text-[16px] font-bold mb-1">
            {isUnlocked ? "Insignia desbloqueada" : "Desbloquea esta insignia"}
          </p>
          <p className="text-[11px] text-white/85 leading-relaxed">
            {isUnlocked
              ? `Has sumado ${species.greenPointsReward} puntos verdes a tu cuenta de conservación`
              : `Visita el Sendero ${species.name} en el parque y suma ${species.greenPointsReward} puntos verdes`}
          </p>
          {!isUnlocked && (
            <button
              onClick={() => {
                unlockSpecies(species.id);
                showToast({
                  tone: "wild",
                  title: `¡Insignia ${species.name} desbloqueada!`,
                  message: `+${species.greenPointsReward} puntos verdes`,
                });
              }}
              className="mt-3 bg-white text-wild-600 px-4 py-2 rounded-lg text-[11px] font-bold active:scale-95 transition-transform"
            >
              Simular escaneo NFC
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
