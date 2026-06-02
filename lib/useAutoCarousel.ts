"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoCarousel<T extends HTMLElement>(opts: {
  intervalMs?: number;
  resumeAfterMs?: number;
  itemSelector?: string;
}) {
  const { intervalMs = 4000, resumeAfterMs = 6000, itemSelector = "[data-carousel-item]" } = opts;
  const ref = useRef<T | null>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;

    const id = setInterval(() => {
      const items = el.querySelectorAll(itemSelector);
      if (items.length === 0) return;

      const currentScroll = el.scrollLeft;
      const itemWidth = (items[0] as HTMLElement).offsetWidth + 10;
      const maxScroll = el.scrollWidth - el.clientWidth;

      let nextScroll = currentScroll + itemWidth;
      if (nextScroll >= maxScroll - 5) nextScroll = 0;

      el.scrollTo({ left: nextScroll, behavior: "smooth" });
    }, intervalMs);

    return () => clearInterval(id);
  }, [paused, intervalMs, itemSelector]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleInteract = () => {
      setPaused(true);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => setPaused(false), resumeAfterMs);
    };

    el.addEventListener("touchstart", handleInteract, { passive: true });
    el.addEventListener("mousedown", handleInteract);
    el.addEventListener("scroll", handleInteract, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleInteract);
      el.removeEventListener("mousedown", handleInteract);
      el.removeEventListener("scroll", handleInteract);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [resumeAfterMs]);

  return ref;
}
