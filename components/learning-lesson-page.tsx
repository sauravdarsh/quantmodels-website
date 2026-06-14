import Link from "next/link";

import { type LearningTopic } from "@/lib/learning";

import { LearningQuestionGenerator } from "@/components/learning-question-generator";
import { PageHero } from "@/components/page-hero";

import { LearningQuiz, type QuizQuestion } from "./learning-quiz";

type LearningLessonPageProps = {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  formula: string[];
  intuition: string;
  overview: string;
  practicalUseCase: string;
  quizQuestions: QuizQuestion[];
  topic: LearningTopic;
  title: string;
};

export function LearningLessonPage({
  ctaHref,
  ctaLabel,
  description,
  eyebrow,
  formula,
  intuition,
  overview,
  practicalUseCase,
  quizQuestions,
  topic,
  title,
}: LearningLessonPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Model Overview
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-300">{overview}</p>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">Intuition</p>
              <p className="mt-4 text-sm leading-8 text-slate-300">{intuition}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">Key Formula</p>
              <div className="mt-6 rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/80 p-6">
                <div className="space-y-3 font-mono text-sm text-cyan-100">
                  {formula.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Practical Use Case
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-300">{practicalUseCase}</p>
              <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
                <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                  Learning Outcome
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  This lesson is designed to connect quantitative theory with the exact kind of
                  institutional workflow QuantModels.ai exposes in its pricing and analytics modules.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <LearningQuiz
              questions={quizQuestions}
              title="Static Question Bank"
              description="Work through the curated model question bank first, then generate additional mock AI question sets below."
            />
          </div>

          <div className="mt-8">
            <LearningQuestionGenerator defaultTopic={topic} />
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={ctaHref}
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/learn"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Back to Learning Lab
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
