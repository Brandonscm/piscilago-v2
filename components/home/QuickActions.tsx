"use client";

import Link from "next/link";
import { CalendarCheck, IdCard, QrCode } from "lucide-react";
import { showToast } from "@/lib/toast";

export function QuickActions() {
  return (
    <section className="px-4 mt-4">
      <div className="grid grid-cols-3 gap-2">
        <Link
          href="/filas"
          className="bg-white rounded-2xl p-3 shadow-card flex flex-col items-center text-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-col-50 flex items-center justify-center text-col-600">
            <CalendarCheck size={20} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 leading-tight">
            Reservar turnos
          </p>
        </Link>

        <Link
          href="/pasaporte"
          className="bg-white rounded-2xl p-3 shadow-card flex flex-col items-center text-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-aqua-50 flex items-center justify-center text-aqua-600">
            <IdCard size={20} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 leading-tight">
            Cargar pasaporte
          </p>
        </Link>

        <button
          type="button"
          onClick={() =>
            showToast({
              tone: "wild",
              title: "Descubre Piscilago",
              message: "Activa tu cámara para escanear códigos QR del parque",
            })
          }
          className="bg-white rounded-2xl p-3 shadow-card flex flex-col items-center text-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-wild-50 flex items-center justify-center text-wild-600">
            <QrCode size={20} strokeWidth={2} />
          </div>
          <p className="text-[11px] font-medium text-ink-900 leading-tight">
            Descubre Piscilago
          </p>
        </button>
      </div>
    </section>
  );
}
