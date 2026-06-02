"use client";

import { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-col-50 via-surface-50 to-col-100 md:py-8 md:px-4 md:flex md:items-center md:justify-center">
      <div className="md:max-w-[390px] md:w-full md:bg-[#0B1419] md:rounded-[40px] md:p-2 md:shadow-hero md:relative">
        <div className="md:hidden h-1 w-12 bg-col-200 rounded-full mx-auto mt-2" />
        <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-2xl z-20" />
        <div className="min-h-screen md:min-h-0 md:h-[820px] md:rounded-[32px] md:overflow-hidden bg-surface-50 relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
