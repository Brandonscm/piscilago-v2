"use client";

import { useState } from "react";
import { Accessibility, BookOpen, Type, Contrast, Sparkles, X, Check } from "lucide-react";
import { NotificationsPanel } from "./NotificationsPanel";
import { NewBadge } from "./NewBadge";
import { OnboardingGuide } from "./OnboardingGuide";
import { useA11y, type TextSize } from "@/lib/useA11y";
import { showToast } from "@/lib/toast";

const SIZE_LABELS: Record<TextSize, string> = {
  normal: "Normal",
  grande: "Grande",
  extra: "Extra grande",
};

export function BrandBar() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const { settings, update } = useA11y();

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-2 pb-2 bg-white/85 backdrop-blur-md border-b border-ink-100 sticky top-0 z-20">
        <div className="flex items-center gap-1.5">
          <p className="text-[14px] font-bold tracking-tight text-col-700 leading-none">
            Pisc<span className="text-sun-500 italic">i</span>lago
          </p>
          <span className="text-[8px] uppercase tracking-wider text-ink-300 font-semibold border-l border-ink-100 pl-1.5 ml-0.5">
            Colsubsidio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setA11yOpen(true)}
              className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-col-700 active:scale-95 transition-transform"
              aria-label="Opciones de accesibilidad"
            >
              <Accessibility size={15} strokeWidth={2.2} />
            </button>
            <NewBadge floating size="small" />
          </div>
          <NotificationsPanel />
        </div>
      </div>

      {a11yOpen && (
        <>
          <div className="absolute inset-0 bg-ink-900/50 z-40" onClick={() => setA11yOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-elevated z-50 overflow-hidden" style={{ maxHeight: "85%" }}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-ink-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-col-50 text-col-600 flex items-center justify-center">
                  <Accessibility size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-[14px] font-semibold text-ink-900 leading-tight">Accesibilidad</h2>
                    <NewBadge size="small" />
                  </div>
                  <p className="text-[10px] text-ink-500">Personaliza tu experiencia</p>
                </div>
              </div>
              <button onClick={() => setA11yOpen(false)} className="w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95">
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Type size={14} className="text-col-600" strokeWidth={2} />
                  <p className="text-[12px] font-semibold text-ink-900">Tamaño de texto</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(SIZE_LABELS) as TextSize[]).map((size) => {
                    const active = settings.textSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          update({ textSize: size });
                          showToast({ tone: "success", title: `Tamaño: ${SIZE_LABELS[size]}` });
                        }}
                        className={`rounded-xl py-2 px-2 border text-center transition-colors active:scale-[0.97] ${active ? "bg-col-600 border-col-600 text-white" : "bg-white border-ink-100 text-ink-700"}`}
                      >
                        <p className={`font-bold ${size === "normal" ? "text-[12px]" : size === "grande" ? "text-[14px]" : "text-[16px]"}`}>Aa</p>
                        <p className="text-[9px] mt-1">{SIZE_LABELS[size]}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <button
                  onClick={() => {
                    update({ highContrast: !settings.highContrast });
                    showToast({ tone: "success", title: settings.highContrast ? "Contraste normal" : "Alto contraste activado" });
                  }}
                  className="w-full bg-white border border-ink-100 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl bg-ink-50 text-ink-700 flex items-center justify-center">
                    <Contrast size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[12px] font-semibold text-ink-900">Alto contraste</p>
                    <p className="text-[10px] text-ink-500">Mejora la legibilidad</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${settings.highContrast ? "bg-col-600" : "bg-ink-100"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-card transition-transform ${settings.highContrast ? "translate-x-4" : ""}`} />
                  </div>
                </button>
              </section>

              <section>
                <button
                  onClick={() => {
                    update({ reduceMotion: !settings.reduceMotion });
                    showToast({ tone: "success", title: settings.reduceMotion ? "Animaciones activas" : "Animaciones reducidas" });
                  }}
                  className="w-full bg-white border border-ink-100 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center">
                    <Sparkles size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[12px] font-semibold text-ink-900">Reducir animaciones</p>
                    <p className="text-[10px] text-ink-500">Menos movimiento en pantalla</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${settings.reduceMotion ? "bg-col-600" : "bg-ink-100"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-card transition-transform ${settings.reduceMotion ? "translate-x-4" : ""}`} />
                  </div>
                </button>
              </section>

              <section>
                <button
                  onClick={() => {
                    setA11yOpen(false);
                    setTourOpen(true);
                  }}
                  className="w-full bg-white border border-ink-100 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl bg-sun-50 text-sun-700 flex items-center justify-center">
                    <BookOpen size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-semibold text-ink-900">Tour de la app</p>
                      <NewBadge size="small" />
                    </div>
                    <p className="text-[10px] text-ink-500">Conoce las funciones nuevas</p>
                  </div>
                  <span className="text-[10px] text-col-600 font-semibold">Ver</span>
                </button>
              </section>

              <section className="bg-aqua-50 border border-aqua-100 rounded-2xl p-3">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-aqua-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <p className="text-[10px] text-aqua-800 leading-relaxed">Esta app es compatible con lectores de pantalla VoiceOver y TalkBack.</p>
                </div>
              </section>
            </div>
            <div className="h-6 safe-bottom" />
          </div>
        </>
      )}

      {tourOpen && <OnboardingGuide forceOpen onClose={() => setTourOpen(false)} />}
    </>
  );
}
