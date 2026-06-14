import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Quant Learning Lab",
  description:
    "Study core quantitative finance models, intuition, formulas, and practical use cases inside the QuantModels.ai Learning Lab.",
};

const lessons = [
  {
    href: "/learn/black-scholes",
    title: "Black-Scholes",
    summary:
      "Learn the canonical option-pricing framework for European calls and puts, including intuition and trading applications.",
  },
  {
    href: "/learn/heston",
    title: "Heston",
    summary:
      "Understand how stochastic volatility changes pricing intuition, smile dynamics, and scenario analysis.",
  },
  {
    href: "/learn/cir-plus-plus",
    title: "CIR++",
    summary:
      "Explore shifted short-rate modeling for fixed-income term structures and interest-rate derivatives.",
  },
  {
    href: "/learn/monte-carlo",
    title: "Monte Carlo",
    summary:
      "Study simulation-based pricing, path generation, and why Monte Carlo is central to complex derivatives.",
  },
  {
    href: "/learn/portfolio-optimization",
    title: "Portfolio Optimization",
    summary:
      "Learn how return, volatility, correlation, and allocation methods fit together in portfolio construction.",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="Quant Learning Lab"
        title="A practical education layer for modern quant models"
        description="Study the intuition, formulas, and real-world use of the models that power QuantModels.ai."
      />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">Learning Mission</p>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
              The Quant Learning Lab turns model pages into guided educational surfaces. Each lesson
              combines conceptual framing, formula awareness, practical buy-side context, and an
              interactive quiz so users can move from intuition to application without leaving the
              product experience.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <article
                key={lesson.href}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">Lesson</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{lesson.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">{lesson.summary}</p>
                <Link
                  href={lesson.href}
                  className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Start lesson
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
