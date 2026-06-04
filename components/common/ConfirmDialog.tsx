"use client";

import { AlertCircle, Check, X } from "lucide-react";
import { ReactNode } from "react";
import { PhonePortal } from "./PhonePortal";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  tone = "default",
  onConfirm,
  onCancel,
  children,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "warning" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}) {
  if (!open) return null;

  const toneConfig = {
    default: { iconBg: "bg-col-50", iconText: "text-col-600", button: "bg-col-600" },
    warning: { iconBg: "bg-sun-50", iconText: "text-sun-700", button: "bg-sun-600" },
    danger: { iconBg: "bg-status-red-soft", iconText: "text-status-red", button: "bg-status-red" },
  }[tone];

  return (
    <PhonePortal>
      <div
        className="absolute inset-0 bg-ink-900/60 z-[60] backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-elevated z-[70] overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <div className={`w-11 h-11 rounded-xl ${toneConfig.iconBg} ${toneConfig.iconText} flex items-center justify-center mb-3`}>
            <AlertCircle size={20} strokeWidth={2} />
          </div>
          <h3 className="text-[14px] font-semibold text-ink-900 leading-tight">{title}</h3>
          <p className="text-[11px] text-ink-500 mt-1.5 leading-relaxed">{message}</p>
          {children && <div className="mt-3">{children}</div>}
        </div>
        <div className="grid grid-cols-2 gap-2 px-5 pb-5">
          <button
            onClick={onCancel}
            className="bg-ink-50 text-ink-700 rounded-xl py-2.5 text-[12px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1"
          >
            <X size={13} strokeWidth={2.2} />
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`${toneConfig.button} text-white rounded-xl py-2.5 text-[12px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1`}
          >
            <Check size={13} strokeWidth={2.5} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </PhonePortal>
  );
}
