"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, X, Clock, Sparkles, Award, ArrowRight, Check } from "lucide-react";

interface Notification {
  id: string;
  type: "wait" | "ai" | "insignia";
  title: string;
  message: string;
  time: string;
  link?: { label: string; href: string };
  unread: boolean;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "ai",
    title: "Recomendación del momento",
    message: "Río Lento del Sol tiene solo 5 min de espera y está cerca de ti. ¿Lo aprovechas antes de que llene?",
    time: "Ahora",
    link: { label: "Ir al mapa", href: "/mapa" },
    unread: true,
  },
  {
    id: "n2",
    type: "wait",
    title: "Pisciflash alcanzó alta demanda",
    message: "75 min de espera. El sistema te sugiere atracciones alternativas con menos fila.",
    time: "Hace 4 min",
    link: { label: "Ver alternativas", href: "/filas" },
    unread: true,
  },
];

const TYPE_CONFIG = {
  ai: { bg: "bg-aqua-50", text: "text-aqua-600", icon: Sparkles },
  wait: { bg: "bg-sun-50", text: "text-sun-700", icon: Clock },
  insignia: { bg: "bg-wild-50", text: "text-wild-600", icon: Award },
};

export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 relative active:scale-95 transition-transform"
        aria-label="Notificaciones"
      >
        <Bell size={17} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-wild-500 text-white text-[9px] font-bold rounded-full ring-2 ring-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="absolute inset-0 bg-ink-900/50 z-40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-elevated z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: "75%" }}
          >
            <header className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-ink-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-col-50 text-col-600 flex items-center justify-center">
                  <Bell size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-[13px] font-semibold text-ink-900 leading-tight">Notificaciones</h2>
                  <p className="text-[10px] text-ink-500">
                    {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al día"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95"
                aria-label="Cerrar"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-[12px] text-ink-500">No tienes notificaciones nuevas</p>
                </div>
              ) : (
                <ul className="divide-y divide-ink-100">
                  {items.map((n) => {
                    const cfg = TYPE_CONFIG[n.type];
                    const Icon = cfg.icon;
                    return (
                      <li
                        key={n.id}
                        className={`px-4 py-3 ${n.unread ? "bg-col-50/40" : "bg-white"}`}
                      >
                        <div className="flex gap-2.5">
                          <div className={`w-9 h-9 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center shrink-0`}>
                            <Icon size={15} strokeWidth={2.2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[12px] font-semibold text-ink-900 leading-tight">
                                {n.title}
                              </p>
                              {n.unread && (
                                <span className="w-2 h-2 rounded-full bg-wild-500 shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-[10px] text-ink-500 mt-1 leading-relaxed">{n.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[9px] text-ink-300">{n.time}</span>
                              {n.link && (
                                <Link
                                  href={n.link.href}
                                  onClick={() => {
                                    markRead(n.id);
                                    setOpen(false);
                                  }}
                                  className="inline-flex items-center gap-1 text-[10px] text-col-600 font-semibold active:scale-95 transition-transform"
                                >
                                  {n.link.label}
                                  <ArrowRight size={10} strokeWidth={2.5} />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {unreadCount > 0 && (
              <div className="border-t border-ink-100 p-3 bg-white shrink-0">
                <button
                  onClick={markAllRead}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-col-50 text-col-700 rounded-xl py-2.5 text-[11px] font-semibold active:scale-95 transition-transform"
                >
                  <Check size={12} strokeWidth={2.5} />
                  Marcar todas como leídas
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
