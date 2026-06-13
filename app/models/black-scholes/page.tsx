import type { Metadata } from "next";
import Link from "next/link";

import { BlackScholesSimulator } from "@/components/black-scholes-simulator";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Black-Scholes Model",
  description:
    "Run an internal Black-Scholes pricing calculator inside QuantModels.ai.",
};

export default function BlackScholesPage() {
  return (
    <>
      <PageHero
        eyebrow="Vanilla Option Models"
        title="Black-Scholes Pricing Calculator"
        description="Use the internal Black-Scholes engine to price European options and inspect core sensitivity outputs directly inside QuantModels.ai."
      />
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
              Model Overview
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
              Black-Scholes remains the canonical closed-form framework for
              vanilla European options and a dependable baseline for pricing,
              calibration checks, and risk intuition.
            </p>
          </div>
          <BlackScholesSimulator />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request Black-Scholes Demo
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
