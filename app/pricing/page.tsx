import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { PageHero } from "@/components/page-hero";
import { PricingSection } from "@/components/pricing-section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Review QuantModels.ai plans for sandbox access, professional workflows, and enterprise deployment.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent plans for serious market workflows"
        description="Choose a starting point for model exploration, production pricing, or full enterprise control with governance and support."
      />
      <PricingSection showHeader={false} />
      <ContactSection />
    </>
  );
}
