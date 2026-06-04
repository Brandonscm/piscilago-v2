"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

const PALETTE: Record<string, { bg: string; emoji: string }> = {
  tobogan: { bg: "linear-gradient(135deg, #1565C0, #00897B)", emoji: "🌀" },
  piscina: { bg: "linear-gradient(135deg, #26A69A, #80DEEA)", emoji: "🏊" },
  rio: { bg: "linear-gradient(135deg, #00ACC1, #B2EBF2)", emoji: "🌊" },
  servicio: { bg: "linear-gradient(135deg, #FFA726, #FFD180)", emoji: "🍽️" },
  fauna: { bg: "linear-gradient(135deg, #C2185B, #F8BBD0)", emoji: "🦋" },
};

export function ThumbImage({
  src,
  alt,
  type = "tobogan",
  className = "",
}: {
  src: string;
  alt: string;
  type?: "tobogan" | "piscina" | "rio" | "servicio" | "fauna";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const cfg = PALETTE[type] ?? PALETTE.tobogan;

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-white ${className}`}
        style={{ background: cfg.bg }}
      >
        <span className="text-3xl mb-1">{cfg.emoji}</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-white/90 px-2 text-center leading-tight">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}
