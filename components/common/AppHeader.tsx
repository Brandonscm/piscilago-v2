"use client";

import { Bell } from "lucide-react";
import { PiscilagoLogo } from "./PiscilagoLogo";
import { showToast } from "@/lib/toast";

export function AppHeader({ notifications = 2 }: { notifications?: number }) {
  return (
    <header className="flex items-center justify-between px-4 pt-3 pb-2">
      <PiscilagoLogo />
      <button
        type="button"
        onClick={() =>
          showToast({
            tone: "info",
            title: "Tienes 2 notificaciones",
            message: "Pisciflash actualiza tiempos de espera cada 2 minutos",
          })
        }
        className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 relative active:scale-95 transition-transform"
        aria-label="Notificaciones"
      >
        <Bell size={17} strokeWidth={2} />
        {notifications > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-wild-500 text-white text-[9px] font-bold rounded-full ring-2 ring-white flex items-center justify-center">
            {notifications}
          </span>
        )}
      </button>
    </header>
  );
}
