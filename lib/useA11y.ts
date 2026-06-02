"use client";

import { useEffect, useState } from "react";

export type TextSize = "normal" | "grande" | "extra";

export interface A11ySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
}

const DEFAULT: A11ySettings = {
  textSize: "normal",
  highContrast: false,
  reduceMotion: false,
};

const STORAGE_KEY = "piscilago_a11y";

let listeners: ((s: A11ySettings) => void)[] = [];
let current: A11ySettings = DEFAULT;

function load(): A11ySettings {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT;
}

function apply(s: A11ySettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.fontSize =
    s.textSize === "extra" ? "118%" : s.textSize === "grande" ? "108%" : "100%";
  root.classList.toggle("a11y-contrast", s.highContrast);
  root.classList.toggle("a11y-no-motion", s.reduceMotion);
}

export function useA11y() {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);

  useEffect(() => {
    current = load();
    setSettings(current);
    apply(current);
    const handler = (s: A11ySettings) => setSettings(s);
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  const update = (patch: Partial<A11ySettings>) => {
    current = { ...current, ...patch };
    apply(current);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {}
    listeners.forEach((l) => l(current));
  };

  return { settings, update };
}
