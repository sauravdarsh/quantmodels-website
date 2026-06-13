import Link from "next/link";

import { models } from "@/data/site";

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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {models.map((model) => (
            <article
              key={model.name}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Quant Library
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {model.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {model.summary}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {model.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10">
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
