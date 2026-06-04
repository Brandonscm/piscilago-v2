"use client";

import { CheckCircle2, Info, AlertTriangle, Sparkles } from "lucide-react";
import { useToastQueue } from "@/lib/toast";

const TONES = {
  success: { bg: "bg-status-green-soft", text: "text-status-green", icon: CheckCircle2 },
  info: { bg: "bg-col-50", text: "text-col-700", icon: Info },
  warning: { bg: "bg-sun-50", text: "text-sun-700", icon: AlertTriangle },
  wild: { bg: "bg-wild-50", text: "text-wild-700", icon: Sparkles },
};

export function ToastContainer() {
  const toasts = useToastQueue();
  if (toasts.length === 0) return null;

  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 pointer-events-none w-[88%] max-w-sm">
      {toasts.map((t) => {
        const tone = TONES[t.tone];
        const Icon = tone.icon;
        return (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-elevated p-3 flex items-start gap-2.5 animate-in slide-in-from-top duration-300 pointer-events-auto"
          >
            <div className={`w-8 h-8 rounded-lg ${tone.bg} ${tone.text} flex items-center justify-center shrink-0`}>
              <Icon size={16} strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-ink-900 leading-tight">{t.title}</p>
              {t.message && <p className="text-[10px] text-ink-500 mt-0.5 leading-tight">{t.message}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
