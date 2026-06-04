"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, X, Sparkles, Award, Clock, MapPin, Accessibility, MessageSquare, IdCard } from "lucide-react";
import { useOnboarding } from "@/lib/useOnboarding";

interface Slide {
  icon: typeof Sparkles;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  highlight: string;
}

const SLIDES: Slide[] = [
  {
    icon: Sparkles,
    iconColor: "text-aqua-600",
    iconBg: "bg-gradient-to-br from-aqua-100 to-aqua-50",
    title: "Bienvenido a la evolución de Piscilago",
    description: "Mantenemos lo que ya conoces de tu app — mapa, atracciones, pasaporte. Ahora le agregamos una capa de inteligencia y conservación que mejora tu visita.",
    highlight: "Versión 2.0 inteligente",
  },
  {
    icon: Clock,
    iconColor: "text-col-700",
    iconBg: "bg-gradient-to-br from-col-100 to-col-50",
    title: "Filas Inteligentes",
    description: "Verás los tiempos de espera actualizados en vivo. El motor IA te sugiere alternativas cuando una atracción está congestionada. Puedes reservar turnos directamente desde la app.",
    highlight: "Nueva pestaña Filas",
  },
  {
    icon: Award,
    iconColor: "text-wild-600",
    iconBg: "bg-gradient-to-br from-wild-100 to-wild-50",
    title: "Huellas de Conservación",
    description: "Cada vez que escaneas tu pulsera en un sendero temático desbloqueas una insignia de Guardián. Acumulas puntos verdes que canjeas por tours, kits educativos y siembra de árboles nativos.",
    highlight: "5 especies por descubrir",
  },
  {
    icon: MapPin,
    iconColor: "text-sun-700",
    iconBg: "bg-gradient-to-br from-sun-100 to-sun-50",
    title: "Hidratación y sombra",
    description: "En el mapa verás los puntos de hidratación marcados con un ícono azul. Son zonas con aspersores y sombra natural distribuidos por el parque para que te refresques en cualquier momento.",
    highlight: "7 puntos activos",
  },
  {
    icon: IdCard,
    iconColor: "text-col-700",
    iconBg: "bg-gradient-to-br from-col-100 via-aqua-50 to-wild-100",
    title: "Tu Pulsera NFC",
    description: "Reemplaza tu ticket físico, tu billetera y tu cédula dentro del parque. Acércala a los lectores NFC para pagar, validar reservas, desbloquear insignias de Guardián en los senderos y registrar tu paso por los puntos de hidratación. Los datos que captura nos ayudan a reducir filas y mejorar tu experiencia — siempre con tu consentimiento.",
    highlight: "Pago + insignias + privacidad",
  },
  {
    icon: MessageSquare,
    iconColor: "text-white",
    iconBg: "bg-gradient-to-br from-col-600 to-wild-500",
    title: "Asistente Piscilago",
    description: "El botón circular abajo te abre un asistente que responde a preguntas como '¿qué me recomiendas?', 'tengo calor' o '¿dónde está el caimán?'. Te lleva directo a la pantalla relevante.",
    highlight: "Pregúntale lo que sea",
  },
];

export function OnboardingGuide({ forceOpen = false, onClose }: { forceOpen?: boolean; onClose?: () => void }) {
  const { seen, markSeen } = useOnboarding();
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      setSlide(0);
    } else if (seen === false) {
      // Auto-show first time after a brief delay so the page renders first
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, [forceOpen, seen]);

  const close = () => {
    setOpen(false);
    markSeen();
    onClose?.();
  };

  const next = () => {
    if (slide < SLIDES.length - 1) {
      setSlide(slide + 1);
    } else {
      close();
    }
  };

  if (!open) return null;

  const current = SLIDES[slide];
  const Icon = current.icon;
  const isLast = slide === SLIDES.length - 1;

  return (
    <>
      <div
        className="absolute inset-0 bg-ink-900/70 z-[60] backdrop-blur-sm"
        onClick={close}
      />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-elevated z-[70] overflow-hidden">
        <button
          onClick={close}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95 z-10"
          aria-label="Cerrar guía"
        >
          <X size={14} strokeWidth={2} />
        </button>

        <div className="px-6 pt-6 pb-2">
          <div className={`w-16 h-16 rounded-2xl ${current.iconBg} ${current.iconColor} flex items-center justify-center mx-auto mb-4 shadow-card`}>
            <Icon size={28} strokeWidth={2} />
          </div>
          <div className="text-center">
            <span className="inline-block bg-sun-400 text-ink-900 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-full mb-2">
              {current.highlight}
            </span>
            <h2 className="text-[16px] font-semibold text-ink-900 leading-tight mb-2">
              {current.title}
            </h2>
            <p className="text-[12px] text-ink-500 leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        <div className="px-6 pb-5 pt-3 space-y-3">
          <div className="flex items-center justify-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === slide ? "w-6 bg-col-600" : "w-1.5 bg-ink-200"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-full bg-col-700 text-white rounded-xl py-3 text-[12px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
          >
            {isLast ? "Comenzar a usar la app" : "Siguiente"}
            {!isLast && <ChevronRight size={14} strokeWidth={2.5} />}
          </button>

          {!isLast && (
            <button
              onClick={close}
              className="w-full text-[10px] text-ink-500 font-medium active:scale-95 transition-transform"
            >
              Saltar tour
            </button>
          )}
        </div>
      </div>
    </>
  );
}
