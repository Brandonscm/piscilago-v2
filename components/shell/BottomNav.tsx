"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Clock, Award, IdCard } from "lucide-react";

const TABS = [
  { href: "/home", label: "Inicio", icon: Home, isNew: false },
  { href: "/mapa", label: "Mapa", icon: Map, isNew: false },
  { href: "/filas", label: "Filas", icon: Clock, isNew: true },
  { href: "/huellas", label: "Huellas", icon: Award, isNew: true },
  { href: "/pasaporte", label: "Pasaporte", icon: IdCard, isNew: false },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-ink-100 grid grid-cols-5 items-start px-2 pt-2 pb-4 md:pb-3 shrink-0 safe-bottom relative">
      {TABS.map(({ href, label, icon: Icon, isNew }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 text-[10px] font-medium active:scale-95 transition-transform relative"
          >
            <span
              className={`w-10 h-6 flex items-center justify-center rounded-xl transition-colors relative ${
                active ? "bg-col-50 text-col-600" : "text-ink-300"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              {isNew && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sun-400 ring-2 ring-white" />
              )}
            </span>
            <span className={active ? "text-col-700" : "text-ink-300"}>{label}</span>
          </Link>
        );
      })}
      <div className="hidden md:block absolute bottom-1 left-1/2 -translate-x-1/2 w-[90px] h-[5px] bg-ink-900 rounded-full" />
    </nav>
  );
}
