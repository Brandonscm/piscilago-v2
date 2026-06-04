"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Users, MapPin, Ruler, Gauge, Droplets, Flame, CalendarCheck, ChevronRight, Sparkles, AlertCircle } from "lucide-react";
import { attractionById, ATTRACTIONS } from "@/lib/attractions";
import { useLiveData } from "@/lib/useLiveData";
import { ThumbImage } from "@/components/common/ThumbImage";
import { ReservationModal } from "@/components/common/ReservationModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const INTENSITY_THEME = {
  baja: { bg: "bg-status-green-soft", text: "text-status-green", label: "Baja", icon: "🟢" },
  media: { bg: "bg-status-yellow-soft", text: "text-status-yellow", label: "Media", icon: "🟡" },
  alta: { bg: "bg-sun-50", text: "text-sun-700", label: "Alta", icon: "🟠" },
  extrema: { bg: "bg-status-red-soft", text: "text-status-red", label: "Extrema", icon: "🔴" },
};

function thumbTypeFor(type: string): "tobogan" | "piscina" | "rio" | "servicio" | "infantil" | "conservacion" {
  if (type === "tobogan" || type === "piscina" || type === "rio" || type === "servicio") return type;
  if (type === "infantil") return "infantil";
  if (type === "conservacion") return "conservacion";
  if (type === "lago") return "rio";
  return "tobogan";
}

export default function AtraccionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const attraction = attractionById(id);
  const { data } = useLiveData(30000);
  const [reserving, setReserving] = useState(false);

  if (!attraction) {
    return (
      <div className="p-6 text-center">
        <p className="text-[12px] text-ink-500">Atracción no encontrada</p>
        <Link href="/home" className="inline-block mt-3 text-col-600 text-[11px] font-semibold underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const live = data.find((a) => a.id === id);
  const waitMin = live?.waitMin ?? attraction.baseWaitMin;
  const occupancy = live?.occupancyPct ?? attraction.baseOccupancy;
  const congestion = live?.congestion ?? "low";

  const congestionTheme = congestion === "high" ? "bg-status-red-soft text-status-red" :
                          congestion === "medium" ? "bg-status-yellow-soft text-status-yellow" :
                          waitMin === 0 ? "bg-status-green text-white" : "bg-status-green-soft text-status-green";
  const congestionLabel = congestion === "high" ? "Congestión alta" :
                          congestion === "medium" ? "Espera moderada" :
                          waitMin === 0 ? "¡Disponible ahora!" : "Pocas filas";

  const intensityTheme = INTENSITY_THEME[attraction.intensity];

  const nearby = ATTRACTIONS.filter((a) => a.zone === attraction.zone && a.id !== attraction.id && a.type !== "servicio").slice(0, 3);

  return (
    <div className="pb-24">
      <div className="px-4 pt-2 pb-2">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-[11px] text-col-600 font-semibold active:scale-95 transition-transform"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          Volver
        </button>
      </div>

      <Breadcrumbs items={[{ label: "Inicio", href: "/home" }, { label: "Atracciones", href: "/filas" }, { label: attraction.name }]} />

      <div className="relative h-[180px] mx-4 rounded-2xl overflow-hidden shadow-card mt-2">
        <ThumbImage
          src={attraction.imageUrl}
          alt={attraction.name}
          type={thumbTypeFor(attraction.type)}
          attractionId={attraction.id}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur px-2 py-1 rounded-md">
          <span className={`text-[9px] font-bold ${intensityTheme.text} uppercase tracking-wide`}>
            {intensityTheme.icon} {intensityTheme.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${congestionTheme}`}>
            {congestionLabel}
          </span>
        </div>
      </div>

      <div className="px-4 mt-3">
        <h1 className="text-[20px] font-bold text-ink-900 leading-tight">{attraction.name}</h1>
        {attraction.shortFact && (
          <p className="text-[11px] text-col-600 italic font-semibold mt-0.5">{attraction.shortFact}</p>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-2.5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-col-50 text-col-600 mb-1">
              <Clock size={13} strokeWidth={2.2} />
            </div>
            <p className="text-[16px] font-bold text-ink-900 leading-none">{waitMin}<span className="text-[8px] font-normal text-ink-500 ml-0.5">min</span></p>
            <p className="text-[8px] text-ink-500 uppercase tracking-wide mt-0.5">Espera</p>
          </div>
          <div className="bg-white rounded-xl p-2.5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-aqua-50 text-aqua-600 mb-1">
              <Users size={13} strokeWidth={2.2} />
            </div>
            <p className="text-[16px] font-bold text-ink-900 leading-none">{occupancy}<span className="text-[8px] font-normal text-ink-500 ml-0.5">%</span></p>
            <p className="text-[8px] text-ink-500 uppercase tracking-wide mt-0.5">Aforo</p>
          </div>
          <div className="bg-white rounded-xl p-2.5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sun-50 text-sun-700 mb-1">
              <MapPin size={13} strokeWidth={2.2} />
            </div>
            <p className="text-[12px] font-bold text-ink-900 leading-none capitalize">{attraction.zone}</p>
            <p className="text-[8px] text-ink-500 uppercase tracking-wide mt-1">Zona</p>
          </div>
        </div>
      </div>

      <section className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-card">
        <h2 className="text-[12px] font-semibold text-ink-900 mb-2">Descripción</h2>
        <p className="text-[11px] text-ink-700 leading-relaxed">{attraction.description}</p>
      </section>

      <section className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-card">
        <h2 className="text-[12px] font-semibold text-ink-900 mb-3">Especificaciones técnicas</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {attraction.spec.alturaMin && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <Ruler size={14} className="text-col-600 shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Altura mínima</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.alturaMin} cm</p>
              </div>
            </div>
          )}
          {attraction.spec.velocidadKmh && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <Gauge size={14} className="text-status-red shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Velocidad</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.velocidadKmh} km/h</p>
              </div>
            </div>
          )}
          {attraction.spec.longitudM && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-base shrink-0">📏</span>
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Longitud</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.longitudM} m</p>
              </div>
            </div>
          )}
          {attraction.spec.caidaM && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-base shrink-0">⬇️</span>
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Caída máxima</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.caidaM} m</p>
              </div>
            </div>
          )}
          {attraction.spec.duracionSeg && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <Clock size={14} className="text-aqua-600 shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Duración</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.duracionSeg} seg</p>
              </div>
            </div>
          )}
          {attraction.spec.capacidad && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2">
              <Users size={14} className="text-col-600 shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Capacidad</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.capacidad} personas</p>
              </div>
            </div>
          )}
          {attraction.spec.profundidadMin !== undefined && attraction.spec.profundidadMax !== undefined && (
            <div className="bg-ink-50 rounded-xl p-2.5 flex items-center gap-2 col-span-2">
              <Droplets size={14} className="text-aqua-600 shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <p className="text-[9px] text-ink-500 uppercase tracking-wide font-semibold">Profundidad</p>
                <p className="text-[12px] font-semibold text-ink-900">{attraction.spec.profundidadMin}m – {attraction.spec.profundidadMax}m</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {attraction.hasCoolingZone && (
        <section className="mx-4 mt-3 bg-aqua-50 border border-aqua-100 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-aqua-500 text-white flex items-center justify-center shrink-0">
            <Droplets size={15} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-aqua-800">Punto de hidratación cercano</p>
            <p className="text-[10px] text-aqua-700 leading-tight mt-0.5">Aspersores y sombra natural en esta zona del parque</p>
          </div>
        </section>
      )}

      {congestion === "high" && (
        <section className="mx-4 mt-3 bg-status-red-soft border border-status-red/20 rounded-2xl p-3 flex items-start gap-2.5">
          <AlertCircle size={15} className="text-status-red mt-0.5 shrink-0" strokeWidth={2.2} />
          <div>
            <p className="text-[11px] font-semibold text-status-red">Congestión alta en este momento</p>
            <p className="text-[10px] text-ink-700 leading-tight mt-0.5">Te recomendamos buscar una atracción alternativa o reservar turno para más tarde</p>
          </div>
        </section>
      )}

      {attraction.type !== "servicio" && (
        <div className="mx-4 mt-4 grid grid-cols-1 gap-2">
          <button
            onClick={() => setReserving(true)}
            disabled={congestion === "high"}
            className="bg-col-600 text-white rounded-xl py-3 text-[12px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:bg-ink-300"
          >
            <CalendarCheck size={13} strokeWidth={2.5} />
            {congestion === "high" ? "Reserva no disponible · Congestión" : "Reservar turno aquí"}
          </button>
          <Link
            href="/mapa"
            className="bg-white border border-ink-100 text-ink-900 rounded-xl py-2.5 text-[11px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
          >
            <MapPin size={12} strokeWidth={2.2} />
            Ver en el mapa
          </Link>
        </div>
      )}

      {nearby.length > 0 && (
        <section className="mx-4 mt-4">
          <h2 className="text-[12px] font-semibold text-ink-900 mb-2">Cerca de aquí · Zona {attraction.zone}</h2>
          <div className="space-y-1.5">
            {nearby.map((n) => {
              const nLive = data.find((a) => a.id === n.id);
              const nWait = nLive?.waitMin ?? n.baseWaitMin;
              const nCong = nLive?.congestion ?? "low";
              const nDot = nCong === "high" ? "bg-status-red" : nCong === "medium" ? "bg-status-yellow" : "bg-status-green";
              return (
                <Link
                  key={n.id}
                  href={`/atraccion/${n.id}`}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-2.5 active:scale-[0.98] transition-transform shadow-card"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <ThumbImage src={n.imageUrl} alt={n.name} type={thumbTypeFor(n.type)} attractionId={n.id} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-ink-900 leading-tight">{n.name}</p>
                    <div className="flex items-center gap-1.5 text-[9px] text-ink-500 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${nDot}`} />
                      <span>{nWait} min · {n.intensity}</span>
                    </div>
                  </div>
                  <ChevronRight size={12} className="text-ink-300 shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <ReservationModal
        open={reserving}
        attractionName={attraction.name}
        onClose={() => setReserving(false)}
      />
    </div>
  );
}
