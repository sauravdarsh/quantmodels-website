import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { ModelsSection } from "@/components/models-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Explore Heston, Black-Scholes, and risk analytics modules available in QuantModels.ai.",
};

export default function ModelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Models"
        title="Three core engines for pricing and institutional oversight"
        description="Our model layer supports derivatives pricing, volatility calibration, and portfolio monitoring with outputs designed for practitioners."
      />
      <ModelsSection showHeader={false} />
      <AboutSection />
    </>
  );
}
