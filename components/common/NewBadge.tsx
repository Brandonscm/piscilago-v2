export function NewBadge({ size = "default", floating = false }: { size?: "default" | "small"; floating?: boolean }) {
  const textSize = size === "small" ? "text-[7px]" : "text-[8px]";
  const padding = size === "small" ? "px-1 py-0.5" : "px-1.5 py-0.5";

  if (floating) {
    return (
      <span className={`absolute -top-1 -right-1 z-10 bg-sun-400 text-ink-900 ${padding} ${textSize} font-bold uppercase tracking-wider rounded-full shadow-card ring-2 ring-white`}>
        Nuevo
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center bg-sun-400 text-ink-900 ${padding} ${textSize} font-bold uppercase tracking-wider rounded-full shadow-card`}>
      Nuevo
    </span>
  );
}
