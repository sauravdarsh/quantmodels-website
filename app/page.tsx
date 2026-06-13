import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ModelsSection } from "@/components/models-section";
import { PricingLibrarySection } from "@/components/pricing-library-section";
import { PricingSection } from "@/components/pricing-section";
import { ProductArchitectureSection } from "@/components/product-architecture-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductArchitectureSection />
      <ModelsSection />
      <PricingLibrarySection compact />
      <PricingSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
