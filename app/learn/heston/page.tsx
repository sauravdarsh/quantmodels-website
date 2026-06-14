import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";

export const metadata: Metadata = {
  title: "Learn Heston",
  description:
    "Study Heston stochastic volatility intuition, formula structure, practical use cases, and interactive quiz content.",
};

const quizQuestions = [
  {
    prompt: "What key feature does the Heston model add beyond Black-Scholes?",
    options: [
      "Deterministic interest-rate shifts only",
      "A stochastic variance process",
      "Zero transaction costs",
      "Guaranteed closed-form American exercise",
    ],
    answer: 1,
    explanation:
      "Heston extends constant-volatility modeling by making variance itself random over time, which helps explain richer option surface behavior.",
  },
  {
    prompt: "Why does correlation between price and variance matter in Heston?",
    options: [
      "It has no impact on option prices",
      "It helps shape skew and smile behavior",
      "It removes randomness from volatility",
      "It guarantees variance stays constant",
    ],
    answer: 1,
    explanation:
      "The correlation between the asset shock and variance shock influences asymmetry in returns and is a major driver of implied skew.",
  },
  {
    prompt: "Where is Heston especially useful?",
    options: [
      "For explaining volatility smiles in equity options",
      "Only for bond coupon amortization",
      "For eliminating numerical methods entirely",
      "For pricing without any calibration step",
    ],
    answer: 0,
    explanation:
      "Heston is widely used when practitioners need a model that can capture smile and skew patterns seen in listed equity and FX options.",
  },
];

export default function LearnHestonPage() {
  return (
    <LearningLessonPage
      eyebrow="Quant Learning Lab"
      title="Heston Stochastic Volatility"
      description="Understand why stochastic volatility matters and how the Heston framework improves option-surface intuition."
      overview="The Heston model allows the variance of an asset to evolve stochastically rather than staying fixed. That change helps bridge the gap between textbook constant-volatility assumptions and the skewed, smile-shaped implied volatility surfaces seen in real markets."
      intuition="Instead of assuming the market knows one stable volatility number, Heston treats volatility as a state variable with its own dynamics. The asset and variance move together through correlated shocks, which helps generate more realistic option prices across strikes and maturities."
      formula={[
        "dS_t = r S_t dt + sqrt(v_t) S_t dW_1",
        "dv_t = kappa(theta - v_t)dt + sigma_v sqrt(v_t) dW_2",
        "corr(dW_1, dW_2) = rho",
      ]}
      practicalUseCase="A structuring team can use Heston to analyse how changes in mean reversion, long-run variance, and spot-vol correlation affect exotic payoffs or vanilla smile calibration across an equity options book."
      quizQuestions={quizQuestions}
      ctaHref="/models/heston"
      ctaLabel="Try the model"
    />
  );
}
