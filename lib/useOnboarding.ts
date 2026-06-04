"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "piscilago_onboarding_seen";

export function useOnboarding() {
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      setSeen(value === "true");
    } catch {
      setSeen(false);
    }
  }, []);

  const markSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setSeen(true);
  };

  const reset = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSeen(false);
  };

  return { seen, markSeen, reset };
}
