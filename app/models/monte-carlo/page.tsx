import type { Metadata } from "next";
import Link from "next/link";

import { MonteCarloSimulator } from "@/components/monte-carlo-simulator";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Monte Carlo Pricing",
  description:
    "Run an internal Monte Carlo pricing simulation inside QuantModels.ai.",
};

export default function MonteCarloPage() {
  return (
    <>
      <PageHero
        eyebrow="Simulation Models"
        title="Monte Carlo Pricing Simulator"
        description="Use an internal geometric-Brownian-motion Monte Carlo engine to estimate option values and inspect simulated terminal-price behavior directly inside QuantModels.ai."
      />
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
              Model Overview
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
              Monte Carlo methods provide a flexible route to scenario-based
              valuation when pathwise behavior matters more than closed-form
              tractability.
            </p>
          </div>
          <MonteCarloSimulator />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request Monte Carlo Demo
            </Link>
            <Link
              href="/models"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Back to Models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
