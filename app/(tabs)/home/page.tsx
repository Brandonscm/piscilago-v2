"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { MapHeroPreview } from "@/components/home/MapHeroPreview";
import { QuickActions } from "@/components/home/QuickActions";
import { SmartLayer } from "@/components/home/SmartLayer";
import { AtraccionesSection } from "@/components/home/AtraccionesSection";
import { AnimalesSection } from "@/components/home/AnimalesSection";
import { useLiveData } from "@/lib/useLiveData";
import { useSteps } from "@/lib/useSteps";
import { useInsignias } from "@/lib/useInsignias";
import { recommend } from "@/lib/recommender";

export default function HomePage() {
  const { data } = useLiveData(30000);
  const { steps } = useSteps(3240);
  const { insignias, greenPoints } = useInsignias();
  const recs = recommend(data, null, { limit: 1 });
  const unlockedCount = insignias.filter((i) => i.unlocked).length;

  return (
    <div className="pb-6">
      <AppHeader />
      <MapHeroPreview attractions={data} />
      <QuickActions />
      <SmartLayer
        recommendation={recs[0] ?? null}
        steps={steps}
        insignias={unlockedCount}
        greenPoints={greenPoints}
      />
      <AtraccionesSection attractions={data} />
      <AnimalesSection />
      <div className="text-center text-[9px] text-ink-300 mt-6 px-4">
        Piscilago Colsubsidio · Versión 2.0 inteligente
      </div>
    </div>
  );
}
