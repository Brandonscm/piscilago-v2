"use client";

import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { LiveAttraction } from "@/lib/useLiveData";
import { useAutoCarousel } from "@/lib/useAutoCarousel";
import { ThumbImage } from "@/components/common/ThumbImage";

const ATTRACTION_IMAGES: Record<string, string> = {
  pisciflash: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70&auto=format&fit=crop",
  piscitornado: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop",
  anaconda: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop",
  "onda-extrema": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70&auto=format&fit=crop",
  megatobogan: "https://images.unsplash.com/photo-1530841344095-502dd5b15909?w=400&q=70&auto=format&fit=crop",
  "rio-lento": "https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?w=400&q=70&auto=format&fit=crop",
  "piscina-olas": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=70&auto=format&fit=crop",
  "piscina-familiar": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=400&q=70&auto=format&fit=crop",
  "splash-kids": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=400&q=70&auto=format&fit=crop",
};

function thumbType(type: string): "tobogan" | "piscina" | "rio" | "servicio" {
  if (type === "tobogan") return "tobogan";
  if (type === "rio") return "rio";
  if (type === "servicio") return "servicio";
  return "piscina";
}

function imageFor(id: string): string {
  return ATTRACTION_IMAGES[id] ?? "";
}

export function AtraccionesSection({ attractions }: { attractions: LiveAttraction[] }) {
  const featured = attractions.filter((a) => a.type === "tobogan" || a.type === "piscina" || a.type === "rio").slice(0, 6);
  const scrollRef = useAutoCarousel<HTMLDivElement>({ intervalMs: 4000 });

  return (
    <section className="mt-5">
      <div className="flex items-center justify-between px-4 mb-2.5">
        <h2 className="text-[13px] font-semibold text-ink-900">Atracciones y Piscinas</h2>
        <Link href="/filas" className="inline-flex items-center gap-0.5 text-[10px] text-col-600 font-semibold uppercase tracking-wide active:scale-95 transition-transform">
          Ver todas
          <ChevronRight size={12} strokeWidth={2.5} />
        </Link>
      </div>

      <div ref={scrollRef} className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 pb-2 scroll-smooth">
        {featured.map((a) => {
          const stripe = a.congestion === "high" ? "bg-status-red" : a.congestion === "medium" ? "bg-status-yellow" : "bg-status-green";
          return (
            <Link
              key={a.id}
              href={`/filas?focus=${a.id}`}
              data-carousel-item
              className="shrink-0 w-[160px] bg-white rounded-2xl overflow-hidden shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="relative h-[100px] bg-ink-100 overflow-hidden">
                <ThumbImage
                  src={imageFor(a.id)}
                  alt={a.name}
                  type={thumbType(a.type)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 bg-white/95 backdrop-blur px-1.5 py-0.5 rounded-md text-[9px] font-semibold text-ink-900">
                  <span className={`w-1.5 h-1.5 rounded-full ${stripe}`} />
                  <Clock size={9} strokeWidth={2.5} />
                  {a.waitMin} min
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-semibold text-ink-900 leading-tight truncate">{a.name}</p>
                <p className="text-[9px] text-ink-500 mt-0.5">{a.occupancyPct}% aforo · zona {a.zone}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
