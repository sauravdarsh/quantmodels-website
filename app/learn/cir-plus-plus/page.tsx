import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn CIR++",
  description:
    "Study CIR++ interest-rate modeling intuition, formulas, use cases, and quiz interactions inside QuantModels.ai.",
};

export default function LearnCirPlusPlusPage() {
  return (
    <LearningLessonPage
      topic="cir-plus-plus"
      eyebrow="Quant Learning Lab"
      title="CIR++ Interest-Rate Modeling"
      description="Learn how shifted short-rate models connect mean-reverting rate dynamics with today’s observed curve."
      overview="CIR++ builds on the Cox-Ingersoll-Ross short-rate model by adding a deterministic shift term. This makes the model more practical for real fixed-income workflows because it can retain stochastic rate behavior while still matching the initial term structure."
      intuition="The base CIR process captures a mean-reverting short rate with volatility that scales with the level of the process. The extra shift acts like a calibration layer, letting the model align with the curve the desk actually observes at the start of the pricing problem."
      formula={[
        "r_t = x_t + phi(t)",
        "dx_t = kappa(theta - x_t)dt + sigma sqrt(x_t) dW_t",
        "phi(t) calibrates the model to the initial term structure",
      ]}
      practicalUseCase="A rates team can use CIR++ to generate short-rate scenarios, price fixed-income derivatives, and test how a curve-consistent stochastic rate engine behaves under different mean-reversion assumptions."
      quizQuestions={staticQuestionBank["cir-plus-plus"]}
      ctaHref="/models/cir-plus-plus"
      ctaLabel="Try the model"
    />
  );
}
