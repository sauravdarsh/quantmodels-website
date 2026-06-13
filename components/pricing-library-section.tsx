import Link from "next/link";

import {
  pricingLibraryCategories,
  pricingLibraryWorkflow,
} from "@/data/site";

import { SectionHeader } from "./section-header";

type PricingLibrarySectionProps = {
  showHeader?: boolean;
  compact?: boolean;
};

const codePreview = [
  "from quantmodels.heston import HestonModel",
  "model = HestonModel(...)",
  "price = model.price_call(...)",
];

export function PricingLibrarySection({
  showHeader = true,
  compact = false,
}: PricingLibrarySectionProps) {
  return (
    <section className={compact ? "py-20 sm:py-24" : "py-20 sm:py-28"}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {showHeader ? (
          <SectionHeader
            eyebrow="Pricing Library"
            title="A Python-based stochastic simulation and derivatives pricing engine"
            description="QuantModels.ai includes a professional pricing library for teams that need market calibration, simulation, valuation, and risk metrics inside one disciplined stack."
          />
        ) : null}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Engine Overview
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                The Pricing Library pairs a Python-first API with institutional
                modeling workflows, making it easier to move from market inputs
                to calibrated models, simulated paths, option prices, and risk
                diagnostics without fragmenting the stack.
              </p>
            </div>

            <div className="grid gap-4">
              {pricingLibraryCategories.map((category) => (
                <article
                  key={category.name}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {category.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                    Python Preview
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Heston workflow example
                  </p>
                </div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  quantmodels
                </span>
              </div>
              <div className="space-y-3 px-6 py-6 font-mono text-sm leading-7 text-slate-200">
                {codePreview.map((line, index) => (
                  <div key={line} className="flex gap-4">
                    <span className="w-4 text-slate-600">{index + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Workflow
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {pricingLibraryWorkflow.map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      0{index + 1}
                    </div>
                    <div className="flex-1 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-medium text-slate-200">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://hestonmodel2.streamlit.app/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Launch Heston Simulator
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Discuss Integration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
