import { PhoneShell } from "@/components/shell/PhoneShell";
import { StatusBar } from "@/components/shell/StatusBar";
import { BottomNav } from "@/components/shell/BottomNav";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneShell>
      <StatusBar />
      <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
      <BottomNav />
    </PhoneShell>
  );
}
