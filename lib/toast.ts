"use client";

import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  tone: "success" | "info" | "warning" | "wild";
}

let toastListeners: ((t: Toast) => void)[] = [];
let counter = 0;

export function showToast(t: Omit<Toast, "id">) {
  const toast: Toast = { ...t, id: `t-${++counter}` };
  toastListeners.forEach((fn) => fn(toast));
}

export function useToastQueue(): Toast[] {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (t: Toast) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 3500);
    };
    toastListeners.push(handler);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handler);
    };
  }, []);

  return toasts;
}
