"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Clock, Award, IdCard } from "lucide-react";

const TABS = [
  { href: "/home", label: "Inicio", icon: Home },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/filas", label: "Filas", icon: Clock },
  { href: "/huellas", label: "Huellas", icon: Award },
  { href: "/pasaporte", label: "Pasaporte", icon: IdCard },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-ink-100 grid grid-cols-5 items-start px-2 pt-2 pb-4 md:pb-3 shrink-0 safe-bottom relative">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 text-[10px] font-medium active:scale-95 transition-transform"
          >
            <span
              className={`w-10 h-6 flex items-center justify-center rounded-xl transition-colors ${
                active ? "bg-col-50 text-col-600" : "text-ink-300"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
            </span>
            <span className={active ? "text-col-700" : "text-ink-300"}>{label}</span>
          </Link>
        );
      })}
      <div className="hidden md:block absolute bottom-1 left-1/2 -translate-x-1/2 w-[90px] h-[5px] bg-ink-900 rounded-full" />
    </nav>
  );
}
