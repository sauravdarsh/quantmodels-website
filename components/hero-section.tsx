import Link from "next/link";

import { stats } from "@/data/site";

type HeroSectionProps = {
  compact?: boolean;
};

export function HeroSection({ compact = false }: HeroSectionProps) {
  return (
    <section className={compact ? "pb-16 pt-14" : "pb-20 pt-18 sm:pb-28 sm:pt-24"}>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-cyan-100 uppercase">
            Live Model Infrastructure
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Institutional quant tooling for pricing, volatility, and risk.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            QuantModels.ai gives investment teams a disciplined platform for
            option valuation, stochastic volatility modeling, and portfolio risk
            oversight.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/models"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Explore Models
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                  Control Room
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Cross-asset analytics
                </p>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Live
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <span className="text-lg font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
