import type { Metadata } from "next";
import Link from "next/link";

import { CirPlusPlusSimulator } from "@/components/cir-plus-plus-simulator";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "CIR++ Interest Rate Model",
  description:
    "Run an internal CIR++ short-rate simulation in QuantModels.ai for yield-curve fitting, bond pricing, and rate scenario generation.",
};

const useCases = [
  "interest-rate simulation",
  "yield curve fitting",
  "zero-coupon bond pricing",
  "interest-rate derivatives",
  "risk scenario generation",
];

const workflow = [
  "Set the short-rate state, mean-reversion, volatility, deterministic shift, and horizon assumptions.",
  "Simulate the CIR state process x(t) using a non-negative short-rate dynamic.",
  "Form the full short rate through r(t) = x(t) + phi.",
  "Review the average terminal rate and the simulated short-rate path table.",
];

const pricingApplications = [
  "Bond discounting and yield-curve aware valuation",
  "Interest-rate derivatives and structured rate scenarios",
  "Stress testing for treasury, ALM, and fixed-income risk workflows",
];

export default function CirPlusPlusPage() {
  return (
    <>
      <PageHero
        eyebrow="Interest Rate Models"
        title="CIR++ Interest Rate Simulator"
        description="CIR++ extends the Cox-Ingersoll-Ross short-rate model with a deterministic shift to fit the initial yield curve, making it practical for internal rate simulation and pricing workflows in QuantModels.ai."
      />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <SectionHeader
                eyebrow="Model Overview"
                title="A shifted short-rate framework for fixed-income analytics"
                description="CIR++ extends the Cox-Ingersoll-Ross short-rate model with a deterministic shift to fit the initial yield curve."
              />
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Mathematical Intuition
              </p>
              <div className="mt-6 space-y-4 font-mono text-sm leading-8 text-slate-200">
                <div>r(t) = x(t) + phi</div>
                <div>
                  dx(t) = kappa(theta - x(t))dt + sigma sqrt(x(t)) dW(t)
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The deterministic shift phi lets the total short rate align with
                the market curve at inception, while x(t) retains the
                mean-reverting non-negative structure of CIR.
              </p>
            </div>
          </div>

          <CirPlusPlusSimulator />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
                Simulation Workflow
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {workflow.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Pricing Applications
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {pricingApplications.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request CIR++ Demo
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
