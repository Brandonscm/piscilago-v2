export function PiscilagoLogo({ size = "default" }: { size?: "default" | "small" }) {
  const fontSize = size === "small" ? "text-base" : "text-xl";
  const subSize = size === "small" ? "text-[8px]" : "text-[9px]";

  return (
    <div className="flex flex-col">
      <p className={`${subSize} text-ink-500 font-medium tracking-wider uppercase`}>
        Colsubsidio
      </p>
      <p className={`${fontSize} font-bold tracking-tight text-col-700 leading-none -mt-0.5`}>
        Pisc<span className="text-sun-500 italic">i</span>lago
      </p>
      <p className={`${subSize} text-ink-500 font-medium tracking-wider uppercase mt-0.5`}>
        Parque acuático y de conservación
      </p>
    </div>
  );
}
