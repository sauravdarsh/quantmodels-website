import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";

export const metadata: Metadata = {
  title: "Learn CIR++",
  description:
    "Study CIR++ interest-rate modeling intuition, formulas, use cases, and quiz interactions inside QuantModels.ai.",
};

const quizQuestions = [
  {
    prompt: "What does the deterministic shift in CIR++ help achieve?",
    options: [
      "A perfect equity volatility smile",
      "A fit to the initial yield curve",
      "Zero correlation across rates",
      "American exercise valuation",
    ],
    answer: 1,
    explanation:
      "The deterministic shift lets CIR++ preserve the stochastic short-rate structure while fitting the observed starting term structure more flexibly.",
  },
  {
    prompt: "What is the underlying core of CIR++?",
    options: [
      "A jump-diffusion equity model",
      "The Cox-Ingersoll-Ross short-rate process",
      "A static factor covariance matrix",
      "A pure Monte Carlo control variate",
    ],
    answer: 1,
    explanation:
      "CIR++ extends the original CIR short-rate model by adding a time-dependent shift, rather than replacing the base process entirely.",
  },
  {
    prompt: "Why is CIR-style modeling attractive for rates?",
    options: [
      "It is designed to handle short-rate dynamics and mean reversion",
      "It only prices equity options",
      "It guarantees negative rates never appear in any shifted model",
      "It avoids calibration completely",
    ],
    answer: 0,
    explanation:
      "CIR-based models are built around short-rate evolution and mean reversion, making them useful for fixed-income pricing and scenario generation.",
  },
];

export default function LearnCirPlusPlusPage() {
  return (
    <LearningLessonPage
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
      quizQuestions={quizQuestions}
      ctaHref="/models/cir-plus-plus"
      ctaLabel="Try the model"
    />
  );
}
