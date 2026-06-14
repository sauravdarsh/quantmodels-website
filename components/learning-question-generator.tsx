"use client";

import { useState } from "react";

import {
  createMockGeneratedQuestions,
  learningTopicLabels,
  type LearningDifficulty,
  type LearningTopic,
} from "@/lib/learning";

import { LearningQuiz } from "./learning-quiz";

type LearningQuestionGeneratorProps = {
  defaultTopic: LearningTopic;
};

const difficultyOptions: LearningDifficulty[] = ["beginner", "intermediate", "advanced"];

export function LearningQuestionGenerator({
  defaultTopic,
}: LearningQuestionGeneratorProps) {
  const [topic, setTopic] = useState<LearningTopic>(defaultTopic);
  const [difficulty, setDifficulty] = useState<LearningDifficulty>("beginner");
  const [count, setCount] = useState(5);
  const [generatedQuestions, setGeneratedQuestions] = useState(
    createMockGeneratedQuestions({
      topic: defaultTopic,
      difficulty: "beginner",
      count: 3,
    }),
  );

  function handleGenerate() {
    // TODO: Replace this frontend mock generator with a real API call:
    // POST /api/learning/generate-questions
    // Example future payload: { topic, difficulty, count }
    setGeneratedQuestions(
      createMockGeneratedQuestions({
        topic,
        difficulty,
        count,
      }),
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
            Generate Unlimited Questions
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300">
            Use the mock AI agent panel to create additional practice sets by topic and difficulty.
            The component is already shaped for a future API-backed generation workflow.
          </p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs tracking-[0.22em] text-cyan-200 uppercase">
          AI Placeholder
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Model topic</span>
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value as LearningTopic)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            {Object.entries(learningTopicLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Difficulty</span>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as LearningDifficulty)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option[0].toUpperCase()}
                {option.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Number of questions
          </span>
          <input
            type="number"
            min={1}
            max={12}
            value={count}
            onChange={(event) =>
              setCount(Math.min(12, Math.max(1, Number(event.target.value) || 1)))
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          />
        </label>

        <button
          type="button"
          onClick={handleGenerate}
          className="mt-auto rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Generate AI Questions
        </button>
      </div>

      <div className="mt-8">
        <LearningQuiz
          questions={generatedQuestions}
          title="Generated Questions"
          description={`Mock generated set for ${learningTopicLabels[topic]} at ${difficulty} difficulty.`}
        />
      </div>
    </div>
  );
}
