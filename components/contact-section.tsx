import Link from "next/link";

import { contactDetails } from "@/data/site";

import { SectionHeader } from "./section-header";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Speak with our team about live pricing and portfolio analytics"
          description="Whether you are evaluating a single model or replacing a fragmented workflow, we can scope the right rollout."
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-[1.25rem] border border-white/8 bg-slate-950/60 p-5"
              >
                <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                  {detail.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-sm leading-7 text-cyan-50">
              Enterprise clients can request controlled pilots, private
              deployment discussions, and solution workshops for treasury,
              derivatives, and risk teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="mailto:enterprise@quantmodels.ai"
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Email Sales
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Review Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
