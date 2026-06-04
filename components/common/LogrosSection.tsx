"use client";

import { useState } from "react";
import { Trophy, Lock, ChevronDown } from "lucide-react";
import { useAchievements } from "@/lib/useAchievements";
import { NewBadge } from "./NewBadge";

export function LogrosSection() {
  const { items, unlockedCount, totalPoints, total } = useAchievements();
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="mx-4 mt-3 bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between active:bg-ink-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sun-50 text-sun-700 flex items-center justify-center">
            <Trophy size={14} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-semibold text-ink-900">Logros</p>
              <NewBadge size="small" />
            </div>
            <p className="text-[10px] text-ink-500">{unlockedCount} de {total} · {totalPoints} pts</p>
          </div>
        </div>
        <ChevronDown size={14} className={`text-ink-300 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.2} />
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1">
          <div className="grid grid-cols-2 gap-2">
            {items.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl p-2.5 border ${a.unlocked ? "bg-sun-50 border-sun-200" : "bg-ink-50 border-ink-100"}`}
              >
                <div className="flex items-start gap-2">
                  <div className={`text-2xl ${a.unlocked ? "" : "grayscale opacity-40"}`}>{a.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold leading-tight ${a.unlocked ? "text-ink-900" : "text-ink-500"}`}>{a.title}</p>
                    <p className={`text-[8px] leading-tight mt-0.5 ${a.unlocked ? "text-ink-700" : "text-ink-300"}`}>{a.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  {a.unlocked ? (
                    <span className="text-[8px] font-bold uppercase tracking-wide text-sun-700">✓ Desbloqueado</span>
                  ) : a.progress ? (
                    <div className="flex-1 mr-2">
                      <div className="h-1 bg-ink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-col-500 rounded-full" style={{ width: `${(a.progress.current / a.progress.target) * 100}%` }} />
                      </div>
                      <p className="text-[7px] text-ink-500 mt-0.5">{a.progress.current}/{a.progress.target}</p>
                    </div>
                  ) : (
                    <span className="text-[8px] text-ink-300 inline-flex items-center gap-0.5">
                      <Lock size={7} strokeWidth={2.5} />
                      Bloqueado
                    </span>
                  )}
                  <span className={`text-[9px] font-bold ${a.unlocked ? "text-sun-700" : "text-ink-300"}`}>+{a.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
