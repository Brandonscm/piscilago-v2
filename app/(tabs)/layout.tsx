import { PhoneShell } from "@/components/shell/PhoneShell";
import { StatusBar } from "@/components/shell/StatusBar";
import { BottomNav } from "@/components/shell/BottomNav";
import { ToastContainer } from "@/components/common/ToastContainer";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneShell>
      <ToastContainer />
      <StatusBar />
      <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
      <BottomNav />
    </PhoneShell>
  );
}
