"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function PhonePortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const el = document.getElementById("phone-modal-root");
    setTarget(el);
  }, []);

  if (!mounted || !target) return null;

  return createPortal(
    <div className="absolute inset-0 pointer-events-auto">{children}</div>,
    target
  );
}
