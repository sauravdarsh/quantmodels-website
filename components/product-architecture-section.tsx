import Link from "next/link";

import { productArchitecture } from "@/data/site";

import { SectionHeader } from "./section-header";

export function ProductArchitectureSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Architecture"
          title="An integrated platform for product discovery and live quantitative execution"
          description="QuantModels.ai now combines the professional SaaS website and the live quantitative simulators into one integrated product experience."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {productArchitecture.map((item) => (
            <article
              key={item.domain}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
            >
              <p className="text-sm tracking-[0.22em] text-cyan-200 uppercase">
                {item.domain}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {item.label}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {item.summary}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
          <p className="max-w-4xl text-base leading-8 text-cyan-50">
            QuantModels.ai now hosts the Heston and CIR++ engines directly
            inside the platform, keeping the experience aligned with the main
            fintech SaaS interface.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/models/heston"
              className="inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Launch Heston Model
            </Link>
            <Link
              href="/models/cir-plus-plus"
              className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Explore CIR++ Simulator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
