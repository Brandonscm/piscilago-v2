"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { speciesById } from "@/lib/species";
import { useLiveData } from "@/lib/useLiveData";
import { Sparkles, TrendingUp, Clock, Users, MapPin, Shield, Leaf } from "lucide-react";

export default function PanelEspeciePage() {
  const params = useParams<{ especie: string }>();
  const species = speciesById(params.especie);
  const { data, lastUpdate } = useLiveData(15000);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!species) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center p-10">
        <p className="text-white">Especie no encontrada · /panel/[anaconda | caiman-llanero | oso-anteojos | mono-arana | tortuga-hicotea]</p>
      </div>
    );
  }

  const critical = data
    .filter((a) => a.type !== "servicio" && a.congestion === "high")
    .sort((a, b) => b.waitMin - a.waitMin)
    .slice(0, 3);

  const recommended = data
    .filter((a) => a.type !== "servicio" && a.congestion === "low")
    .sort((a, b) => a.waitMin - b.waitMin)
    .slice(0, 3);

  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);

  return (
    <div className="min-h-screen bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img
          src={species.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900/85 to-ink-900/60" />
      </div>

      <div className="relative p-6 lg:p-10">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield size={14} className="text-wild-400" strokeWidth={2.5} />
              <p className="text-[10px] uppercase tracking-widest text-wild-400 font-bold">
                Sendero {species.name} · Micro-Hábitat de Espera
              </p>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{species.name}</h1>
            <p className="text-[14px] text-white/70 italic mt-1">{species.scientific}</p>
            <div className="inline-flex items-center gap-1.5 mt-3 bg-wild-500 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide">
              {species.conservationLabel}
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl lg:text-5xl font-bold tracking-wider">{time}</p>
            <p className="text-[10px] text-white/60 mt-1">
              Actualizado hace {secondsAgo}s · sincronizado con app
            </p>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-aqua-400">
              <Sparkles size={11} strokeWidth={2.5} />
              <span>Sistema IA activo</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={16} className="text-status-green" strokeWidth={2} />
              <h2 className="text-base lg:text-lg font-semibold">Sobre esta especie</h2>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed mb-4">{species.description}</p>
            <div className="bg-wild-500/20 border border-wild-400/30 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-wild-300 font-semibold mb-1">
                Región
              </p>
              <p className="text-[13px] font-semibold">{species.region}</p>
            </div>
            <div className="mt-3 space-y-2">
              {species.funFacts.slice(0, 2).map((fact, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-aqua-400 text-[14px] leading-none mt-0.5">→</span>
                  <p className="text-[12px] text-white/85 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-aqua-500/15 border border-aqua-400/30 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-aqua-300 font-semibold mb-1">
                Escanea tu pulsera NFC aquí
              </p>
              <p className="text-[12px] text-white/85">
                Suma <span className="font-bold text-aqua-200">{species.greenPointsReward} puntos verdes</span> a tu cuenta de Guardián
              </p>
            </div>
          </section>

          <div className="space-y-4">
            <section className="bg-status-red/10 border border-status-red/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-status-red/30 flex items-center justify-center">
                  <TrendingUp size={14} className="text-status-red" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-semibold">Filas largas ahora</h3>
              </div>
              {critical.length === 0 ? (
                <p className="text-[12px] text-white/60">Ninguna atracción saturada en este momento</p>
              ) : (
                <div className="space-y-2">
                  {critical.map((a) => (
                    <div key={a.id} className="flex items-center justify-between bg-black/30 rounded-lg p-2.5">
                      <div>
                        <p className="text-[13px] font-semibold">{a.name}</p>
                        <p className="text-[9px] text-white/60">{a.occupancyPct}% aforo</p>
                      </div>
                      <p className="text-xl font-bold text-status-red">
                        {a.waitMin}<span className="text-[9px] text-white/60 ml-1 font-normal">min</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-status-green/10 border border-status-green/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-status-green/30 flex items-center justify-center">
                  <Sparkles size={14} className="text-status-green" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-semibold">Recomendado por IA</h3>
              </div>
              <div className="space-y-2">
                {recommended.map((a) => (
                  <div key={a.id} className="flex items-center justify-between bg-black/30 rounded-lg p-2.5">
                    <div>
                      <p className="text-[13px] font-semibold">{a.name}</p>
                      <p className="text-[9px] text-white/60">{a.occupancyPct}% aforo · zona {a.zone}</p>
                    </div>
                    <p className="text-xl font-bold text-status-green">
                      {a.waitMin}<span className="text-[9px] text-white/60 ml-1 font-normal">min</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-6 flex items-center justify-between text-[10px] text-white/60 border-t border-white/10 pt-4">
          <span>Piscilago Colsubsidio · Parque Acuático y de Conservación</span>
          <span>Acerca tu pulsera al panel para desbloquear esta insignia</span>
        </footer>
      </div>
    </div>
  );
}
