import { PhoneShell } from "@/components/shell/PhoneShell";
import { StatusBar } from "@/components/shell/StatusBar";
import { BottomNav } from "@/components/shell/BottomNav";
import { BrandBar } from "@/components/common/BrandBar";
import { ToastContainer } from "@/components/common/ToastContainer";
import { FloatingAssistant } from "@/components/common/FloatingAssistant";
import { OnboardingGuide } from "@/components/common/OnboardingGuide";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneShell>
      <ToastContainer />
      <OnboardingGuide />
      <StatusBar />
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <BrandBar />
        {children}
      </main>
      <FloatingAssistant />
      <BottomNav />
    </PhoneShell>
  );
}
