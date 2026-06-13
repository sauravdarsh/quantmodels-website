import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact QuantModels.ai for demos, enterprise pilots, and institutional quant workflow discussions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Connect with the QuantModels.ai team"
        description="Tell us what you are pricing, how you manage risk, and where your current workflow is slowing you down."
      />
      <ContactSection />
    </>
  );
}
