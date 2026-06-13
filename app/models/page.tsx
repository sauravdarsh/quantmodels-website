import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { ModelsSection } from "@/components/models-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Explore Heston stochastic volatility, Black-Scholes, Monte Carlo pricing, CIR++, and risk analytics modules available in QuantModels.ai.",
};

export default function ModelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Models"
        title="Five core engines for pricing and institutional oversight"
        description="Our model layer supports Heston stochastic volatility, Black-Scholes pricing, Monte Carlo valuation, CIR++ interest-rate modeling, and portfolio risk monitoring with outputs designed for practitioners."
      />
      <ModelsSection showHeader={false} />
      <AboutSection />
    </>
  );
}
