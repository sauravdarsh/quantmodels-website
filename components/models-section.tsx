import Link from "next/link";

import { models } from "@/data/site";

import { ModelCard } from "./model-card";
import { SectionHeader } from "./section-header";

type ModelsSectionProps = {
  showHeader?: boolean;
};

export function ModelsSection({ showHeader = true }: ModelsSectionProps) {
  return (
    <section id="models" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {showHeader ? (
          <SectionHeader
            eyebrow="Models"
            title="A focused stack for option pricing and institutional risk diagnostics"
            description="Each module is designed to be useful on its own and stronger when combined into a single operating layer."
          />
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {models.map((model) => (
            <ModelCard
              key={model.name}
              name={model.name}
              summary={model.summary}
              bullets={model.bullets}
              href={model.href}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/models/heston"
            className="inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Launch Heston Model
          </Link>
          <Link
            href="/models/black-scholes"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Launch Black-Scholes
          </Link>
          <Link
            href="/models/monte-carlo"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Launch Monte Carlo
          </Link>
          <Link
            href="/models/cir-plus-plus"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Launch CIR++
          </Link>
          <Link
            href="/models/portfolio-management"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Launch Portfolio Management
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Request an institution demo
          </Link>
        </div>
      </div>
    </section>
  );
}
