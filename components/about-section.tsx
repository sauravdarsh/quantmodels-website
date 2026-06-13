import { aboutPoints } from "@/data/site";

import { SectionHeader } from "./section-header";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Built for market practitioners who need precision and trust"
          description="QuantModels.ai blends institutional-grade analytics with a product experience that is clean, fast, and governance-aware."
        />

        <div className="grid gap-4">
          {aboutPoints.map((point, index) => (
            <div
              key={point}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-xs tracking-[0.24em] text-cyan-200 uppercase">
                0{index + 1}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-300">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
