import type { Metadata } from "next";
import Link from "next/link";

import { HestonSimulator } from "@/components/heston-simulator";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Heston Simulator",
  description:
    "Run an internal Heston Monte Carlo simulation in QuantModels.ai with configurable stochastic volatility inputs.",
};

const useCases = [
  "European option pricing under stochastic volatility",
  "Volatility smile and term-structure intuition",
  "Scenario analysis for equity derivatives",
  "Model exploration inside the core QuantModels.ai product",
];

export default function HestonPage() {
  return (
    <>
      <PageHero
        eyebrow="Equity Volatility Models"
        title="Heston Stochastic Volatility Simulator"
        description="Run a simple internal Monte Carlo Heston simulation directly in QuantModels.ai with configurable variance dynamics, correlation, maturity, and path settings."
      />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
              Model Overview
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
              The Heston model introduces a stochastic variance process to
              capture dynamics that constant-volatility models miss. This page
              keeps the experience fully internal to QuantModels.ai and provides
              a practical interface for testing parameter sensitivity and option
              pricing outcomes.
            </p>
          </div>

          <HestonSimulator />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Use Cases
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {useCases.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Internal Platform
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                QuantModels.ai now hosts the Heston simulator directly inside the
                main website, keeping the same institutional fintech
                presentation while making the simulator part of the core
                platform experience.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request Heston Demo
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
