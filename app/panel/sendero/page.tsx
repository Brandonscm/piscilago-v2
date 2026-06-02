"use client";

import { useLiveData } from "@/lib/useLiveData";
import { Sparkles, Clock, Users, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function PanelSenderoPage() {
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
    <div className="min-h-screen bg-ink-900 text-white p-6 lg:p-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-aqua-400 font-medium">
            Panel inteligente · Sendero norte
          </p>
          <h1 className="text-3xl lg:text-4xl font-medium mt-1">Piscilago en vivo</h1>
        </div>
        <div className="text-right">
          <p className="text-3xl lg:text-4xl font-medium tracking-wider">{time}</p>
          <p className="text-[10px] text-ink-300 mt-1">
            Actualizado hace {secondsAgo}s · sincronizado con app
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section
          className="rounded-2xl p-5 lg:p-6"
          style={{ background: "linear-gradient(135deg, #2D1414 0%, #4A1B1B 100%)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-status-red/30 flex items-center justify-center">
              <TrendingUp size={16} className="text-status-red" strokeWidth={2.5} />
            </div>
            <h2 className="text-base lg:text-lg font-medium">Filas largas ahora</h2>
          </div>
          <div className="space-y-3">
            {critical.length === 0 && (
              <p className="text-sm text-ink-300">
                Ninguna atracción en alta demanda en este momento.
              </p>
            )}
            {critical.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between bg-black/30 rounded-xl p-3"
              >
                <div>
                  <p className="text-lg font-medium">{a.name}</p>
                  <p className="text-[11px] text-ink-300 mt-0.5">
                    {a.occupancyPct}% de aforo · zona {a.zone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-medium text-status-red leading-none">
                    {a.waitMin}
                  </p>
                  <p className="text-[10px] text-ink-300 mt-0.5">minutos</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl p-5 lg:p-6"
          style={{ background: "linear-gradient(135deg, #0F2918 0%, #1B4D2E 100%)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-status-green/30 flex items-center justify-center">
              <Sparkles size={16} className="text-status-green" strokeWidth={2.5} />
            </div>
            <h2 className="text-base lg:text-lg font-medium">Recomendado por IA</h2>
          </div>
          <div className="space-y-3">
            {recommended.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between bg-black/30 rounded-xl p-3"
              >
                <div>
                  <p className="text-lg font-medium">{a.name}</p>
                  <p className="text-[11px] text-ink-300 mt-0.5">
                    {a.occupancyPct}% de aforo · zona {a.zone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-medium text-status-green leading-none">
                    {a.waitMin}
                  </p>
                  <p className="text-[10px] text-ink-300 mt-0.5">minutos</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-6 flex items-center justify-between text-[10px] text-ink-300 border-t border-white/10 pt-4">
        <span>Esta información también está disponible en tu app Piscilago</span>
        <span>Escanea tu pulsera NFC para ver tu ruta personalizada</span>
      </footer>
    </div>
  );
}
