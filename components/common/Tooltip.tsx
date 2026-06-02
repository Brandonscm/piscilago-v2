"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { Info } from "lucide-react";

export function Tooltip({
  content,
  children,
  position = "bottom",
  iconOnly = false,
}: {
  content: string;
  children?: ReactNode;
  position?: "top" | "bottom" | "right";
  iconOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    setTimeout(() => document.addEventListener("click", handler), 100);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <span ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="inline-flex items-center gap-1 active:scale-95 transition-transform"
        aria-label="Ver ayuda"
      >
        {children}
        {iconOnly ? null : (
          <Info size={11} strokeWidth={2.2} className="text-ink-300" />
        )}
      </button>
      {open && (
        <span
          className={`absolute z-30 w-[200px] bg-ink-900 text-white text-[10px] leading-relaxed rounded-lg px-3 py-2 shadow-elevated pointer-events-none ${
            position === "top" ? "bottom-full mb-2 left-0" :
            position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2" :
            "top-full mt-2 left-0"
          }`}
        >
          {content}
          <span
            className={`absolute w-2 h-2 bg-ink-900 rotate-45 ${
              position === "top" ? "top-full -translate-y-1/2 left-3" :
              position === "right" ? "right-full translate-x-1/2 top-1/2 -translate-y-1/2" :
              "bottom-full translate-y-1/2 left-3"
            }`}
          />
        </span>
      )}
    </span>
  );
}

export function InfoIcon({ content }: { content: string }) {
  return <Tooltip content={content} iconOnly />;
}
