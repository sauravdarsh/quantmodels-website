"use client";

import { useState } from "react";

export type QuizQuestion = {
  answer: number;
  explanation: string;
  options: string[];
  prompt: string;
};

type LearningQuizProps = {
  description?: string;
  questions: QuizQuestion[];
  title?: string;
};

export function LearningQuiz({
  description,
  questions,
  title = "Interactive Quiz",
}: LearningQuizProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  function toggleAnswer(index: number) {
    setRevealedAnswers((current) => ({
      ...current,
      [index]: !current[index],
    }));
  }

  return (
    <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
      <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">{title}</p>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300">{description}</p>
      ) : null}
      <div className="mt-6 grid gap-5">
        {questions.map((question, index) => {
          const isRevealed = Boolean(revealedAnswers[index]);

          return (
            <div
              key={question.prompt}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm font-semibold text-white">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-4 grid gap-3">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.answer;
                  const revealClasses = isRevealed
                    ? isCorrect
                      ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                      : "border-white/10 bg-slate-950/70 text-slate-400"
                    : "border-white/10 bg-slate-950/70 text-slate-300";

                  return (
                    <div
                      key={option}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${revealClasses}`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                {isRevealed ? "Hide Answer" : "Show Answer"}
              </button>

              {isRevealed ? (
                <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4">
                  <p className="text-xs tracking-[0.22em] text-cyan-200 uppercase">
                    Solution Explanation
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {question.explanation}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
