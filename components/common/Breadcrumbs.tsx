"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, theme = "light" }: { items: Crumb[]; theme?: "light" | "dark" }) {
  const router = useRouter();
  const isDark = theme === "dark";

  return (
    <nav
      className={`flex items-center gap-1.5 px-4 py-2.5 ${
        isDark ? "text-white/85" : "text-ink-700"
      }`}
      aria-label="Migas de pan"
    >
      <button
        onClick={() => router.back()}
        className={`w-8 h-8 rounded-full ${
          isDark ? "bg-white/15 text-white" : "bg-white text-ink-900 shadow-card"
        } flex items-center justify-center active:scale-95 transition-transform`}
        aria-label="Volver"
      >
        <ArrowLeft size={15} strokeWidth={2} />
      </button>
      <div className="flex items-center gap-1 text-[11px] font-medium overflow-hidden">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={10} className="opacity-50" strokeWidth={2} />}
            {c.href ? (
              <Link href={c.href} className="hover:underline truncate">
                {c.label}
              </Link>
            ) : (
              <span className={`truncate ${isDark ? "font-semibold text-white" : "font-semibold text-ink-900"}`}>
                {c.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
