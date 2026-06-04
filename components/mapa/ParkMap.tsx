"use client";

import { useState } from "react";
import type { LiveAttraction } from "@/lib/useLiveData";
import { Droplets } from "lucide-react";

const congestionColor: Record<string, string> = {
  high: "#C62828",
  medium: "#F57F17",
  low: "#2E7D32",
};

export function ParkMap({
  attractions,
  selectedId,
  onSelect,
}: {
  attractions: LiveAttraction[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 560 380"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="water" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M0 7 Q 3.5 4 7 7 T 14 7"
            stroke="#1565C0"
            strokeWidth="0.6"
            fill="none"
            opacity="0.4"
          />
        </pattern>
      </defs>

      <rect width="560" height="380" fill="#D7E9F2" />

      <path
        d="M40 60 Q 120 30 260 50 T 500 70 L 500 110 Q 400 130 280 115 T 40 120 Z"
        fill="#A5D6A7"
        opacity="0.55"
      />
      <path
        d="M60 280 Q 180 250 320 270 T 520 290 L 520 350 L 60 350 Z"
        fill="#A5D6A7"
        opacity="0.45"
      />

      <ellipse cx="285" cy="195" rx="80" ry="50" fill="#90CAF9" />
      <ellipse cx="285" cy="195" rx="80" ry="50" fill="url(#water)" />

      <path
        d="M60 240 Q 140 220 220 240 Q 300 260 380 240 Q 460 220 520 240 L 520 280 Q 460 260 380 280 Q 300 300 220 280 Q 140 260 60 280 Z"
        fill="#42A5F5"
        opacity="0.6"
      />

      <rect x="180" y="120" width="65" height="50" rx="6" fill="#26C6DA"/>
      <rect x="185" y="125" width="55" height="40" rx="3" fill="#80DEEA" opacity="0.6"/>
      <path d="M192 130 L 235 165 M 198 130 L 235 158 M 205 130 L 235 150" stroke="#fff" strokeWidth="1.4" opacity="0.7"/>

      {attractions
        .filter((a) => a.hasCoolingZone)
        .map((a) => (
          <g key={`cool-${a.id}`} opacity={0.55}>
            <circle cx={a.position.x} cy={a.position.y} r="18" fill="#0277BD" fillOpacity="0.12" />
            <circle cx={a.position.x} cy={a.position.y} r="11" fill="#0277BD" fillOpacity="0.2" />
          </g>
        ))}

      {attractions.map((a) => {
        if (a.type === "servicio") return null;
        const color = congestionColor[a.congestion] ?? "#888";
        const active = a.id === selectedId;
        return (
          <g
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{ cursor: "pointer" }}
          >
            {a.congestion === "high" && (
              <circle
                cx={a.position.x}
                cy={a.position.y}
                r="12"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                opacity="0.4"
                className="pulse-ring"
                style={{ transformOrigin: `${a.position.x}px ${a.position.y}px` }}
              />
            )}
            <circle
              cx={a.position.x}
              cy={a.position.y}
              r={active ? 9 : 6}
              fill={color}
              stroke="#fff"
              strokeWidth={active ? 2.5 : 1.8}
            />
            {active && (
              <text
                x={a.position.x}
                y={a.position.y - 14}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fill="#003478"
              >
                {a.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
