import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { PageHero } from "@/components/page-hero";
import { PricingLibrarySection } from "@/components/pricing-library-section";

export const metadata: Metadata = {
  title: "Pricing Library",
  description:
    "Explore the QuantModels.ai pricing library for stochastic simulation, derivatives pricing, calibration, and risk metrics.",
};

export default function PricingLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing Library"
        title="Stochastic simulation and pricing infrastructure for serious quant workflows"
        description="QuantModels.ai includes a Python-based derivatives pricing engine built for volatility modeling, simulation-driven valuation, and portfolio risk metrics."
      />
      <PricingLibrarySection showHeader={false} />
      <ContactSection />
    </>
  );
}
