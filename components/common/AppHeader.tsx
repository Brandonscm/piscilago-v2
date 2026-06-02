import { Bell } from "lucide-react";

export function AppHeader({
  name,
  subtitle,
  initials = "DR",
}: {
  name: string;
  subtitle: string;
  initials?: string;
}) {
  return (
    <header className="flex items-center justify-between px-4 pt-3 pb-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-col-600 text-white flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <div>
          <p className="text-[10px] text-ink-500 leading-tight">{subtitle}</p>
          <p className="text-sm font-medium text-ink-900 leading-tight">{name}</p>
        </div>
      </div>
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 relative"
        aria-label="Notificaciones"
      >
        <Bell size={16} strokeWidth={2} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-status-red rounded-full ring-2 ring-white" />
      </button>
    </header>
  );
}
