import Link from "next/link";

import { pricingPlans } from "@/data/site";

import { SectionHeader } from "./section-header";

type PricingSectionProps = {
  showHeader?: boolean;
};

export function PricingSection({ showHeader = true }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {showHeader ? (
          <SectionHeader
            eyebrow="Pricing"
            title="Simple plans that scale from evaluation to firm-wide deployment"
            description="Start with a sandbox, expand into production workflows, and graduate to enterprise controls without replacing your stack."
          />
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[1.75rem] border p-8 ${
                plan.featured
                  ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_24px_80px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                {plan.name}
              </p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-semibold text-white">
                  {plan.price}
                </span>
                {plan.cadence ? (
                  <span className="pb-1 text-sm text-slate-400">
                    {plan.cadence}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {plan.summary}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/pricing"}
                className={`mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                    : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
