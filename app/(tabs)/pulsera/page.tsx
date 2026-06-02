"use client";

import { Settings, CreditCard, Receipt, Share2, Plus, MapPin } from "lucide-react";

export default function PulseraPage() {
  return (
    <div className="pb-4">
      <header className="flex items-center justify-between px-4 pt-3 pb-2">
        <div>
          <h1 className="text-base font-medium text-ink-900">Mi Pulsera</h1>
          <p className="text-[10px] text-ink-500">NFC activa · sincronizada</p>
        </div>
        <button
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-col-600"
          aria-label="Configuración"
        >
          <Settings size={14} strokeWidth={2} />
        </button>
      </header>

      <section
        className="mx-4 rounded-2xl p-4 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #002D6E 0%, #1565C0 55%, #00897B 100%)",
        }}
      >
        <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-5 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-wide text-white/85 font-medium">
              Pulsera Familia
            </p>
            <p className="text-[13px] font-medium mt-0.5">PSL · 4892 · A</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[8px] bg-status-green/85 px-2 py-1 rounded-md font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Activa
          </span>
        </div>

        <div className="relative my-4">
          <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <defs>
              <linearGradient id="band-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#90CAF9" />
                <stop offset="0.5" stopColor="#1565C0" />
                <stop offset="1" stopColor="#002D6E" />
              </linearGradient>
            </defs>
            <rect x="10" y="22" width="260" height="36" rx="18" fill="url(#band-grad)" />
            <rect x="10" y="22" width="260" height="18" rx="18" fill="rgba(255,255,255,0.18)" />
            <rect x="115" y="30" width="50" height="20" rx="4" fill="#F5F5F5" />
            <g
              transform="translate(132,33)"
              stroke="#003478"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M2 7 Q 2 2 7 2 Q 12 2 12 7" />
              <path d="M0 9 Q 0 0 7 0 Q 14 0 14 9" />
              <circle cx="7" cy="11" r="1.3" fill="#003478" stroke="none" />
            </g>
            <text
              x="48"
              y="48"
              fontSize="8"
              fontWeight="500"
              fill="rgba(255,255,255,0.9)"
              letterSpacing="1.5"
            >
              PISCILAGO
            </text>
            <text
              x="195"
              y="48"
              fontSize="7"
              fontWeight="500"
              fill="rgba(255,255,255,0.75)"
              letterSpacing="1"
            >
              4892·A
            </text>
          </svg>
        </div>

        <div className="relative flex justify-between items-end">
          <div>
            <p className="text-[8px] uppercase tracking-wide text-white/85 font-medium">
              Saldo disponible
            </p>
            <p className="text-[20px] font-medium leading-none mt-1">$ 45.200</p>
          </div>
          <div className="text-right text-[9px] text-white/85">
            Recargado
            <p className="text-[11px] font-medium text-white">hoy 9:14</p>
          </div>
        </div>
      </section>

      <div className="px-4 mt-3 grid grid-cols-3 gap-2">
        <button className="bg-white rounded-2xl p-3 text-center shadow-card active:scale-[0.97] transition-transform">
          <div className="w-8 h-8 mx-auto rounded-lg bg-col-50 text-col-600 flex items-center justify-center">
            <CreditCard size={16} strokeWidth={2} />
          </div>
          <p className="text-[10px] font-medium text-ink-900 mt-1.5">Recargar</p>
        </button>
        <button className="bg-white rounded-2xl p-3 text-center shadow-card active:scale-[0.97] transition-transform">
          <div className="w-8 h-8 mx-auto rounded-lg bg-status-yellow-soft text-status-yellow flex items-center justify-center">
            <Receipt size={16} strokeWidth={2} />
          </div>
          <p className="text-[10px] font-medium text-ink-900 mt-1.5">Historial</p>
        </button>
        <button className="bg-white rounded-2xl p-3 text-center shadow-card active:scale-[0.97] transition-transform">
          <div className="w-8 h-8 mx-auto rounded-lg bg-aqua-50 text-aqua-600 flex items-center justify-center">
            <Share2 size={16} strokeWidth={2} />
          </div>
          <p className="text-[10px] font-medium text-ink-900 mt-1.5">Compartir</p>
        </button>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 shadow-card">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[11px] font-medium text-ink-900">Grupo familiar</h3>
          <span className="text-[9px] text-col-600 font-medium">Ver mapa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-col-600 text-white flex items-center justify-center text-[10px] font-medium ring-2 ring-white">
            DR
          </div>
          <div className="w-8 h-8 rounded-full bg-status-yellow text-white flex items-center justify-center text-[10px] font-medium ring-2 ring-white">
            LR
          </div>
          <div className="w-8 h-8 rounded-full bg-aqua-500 text-white flex items-center justify-center text-[10px] font-medium ring-2 ring-white">
            MR
          </div>
          <button className="w-8 h-8 rounded-full bg-col-50 border border-dashed border-col-600 text-col-600 flex items-center justify-center">
            <Plus size={14} strokeWidth={2} />
          </button>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] text-ink-500">
            <MapPin size={11} strokeWidth={2} className="text-col-600" />
            Todos cerca
          </div>
        </div>
      </div>
    </div>
  );
}
