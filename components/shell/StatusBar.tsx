"use client";

import { Wifi, BatteryMedium } from "lucide-react";
import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex h-[44px] items-end justify-between px-6 pb-2 text-[11px] font-medium text-ink-900 shrink-0">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Wifi size={12} strokeWidth={2.5} />
        <span>87%</span>
        <BatteryMedium size={14} strokeWidth={2} />
      </div>
    </div>
  );
}
