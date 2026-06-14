import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";

export const metadata: Metadata = {
  title: "Learn Black-Scholes",
  description:
    "Study Black-Scholes intuition, formula structure, practical use cases, and quiz-based learning inside QuantModels.ai.",
};

const quizQuestions = [
  {
    prompt: "What is the primary market setting assumed by the Black-Scholes model?",
    options: [
      "A European-style option on an underlying with lognormal price dynamics",
      "A bond portfolio with default intensity",
      "A stochastic volatility model with random jumps",
      "A multi-asset basket with discrete rebalancing costs",
    ],
    answer: 0,
    explanation:
      "Black-Scholes is built around European-style exercise and a lognormal diffusion for the underlying, which makes closed-form pricing possible.",
  },
  {
    prompt: "Which input tends to increase both call and put option value in Black-Scholes?",
    options: ["Dividend yield", "Volatility", "Lower maturity", "Lower strike"],
    answer: 1,
    explanation:
      "Higher volatility increases the dispersion of terminal outcomes, which generally increases the value of optionality for both calls and puts.",
  },
  {
    prompt: "Why is Black-Scholes still used heavily in practice?",
    options: [
      "It perfectly explains every volatility smile",
      "It provides a fast benchmark for pricing and Greeks",
      "It removes all hedging error",
      "It only works for American options",
    ],
    answer: 1,
    explanation:
      "Even when traders use richer models, Black-Scholes remains a fast reference point for vanilla pricing, sensitivities, and implied volatility communication.",
  },
];

export default function LearnBlackScholesPage() {
  return (
    <LearningLessonPage
      eyebrow="Quant Learning Lab"
      title="Black-Scholes Essentials"
      description="Build intuition for the classic option-pricing model that still anchors much of modern derivatives language."
      overview="The Black-Scholes model prices European options by assuming a frictionless market, continuous trading, constant volatility, and lognormal asset price evolution. While markets are more complex in reality, the framework remains foundational because it turns pricing and hedging into a tractable, interpretable system."
      intuition="At its core, Black-Scholes says an option can be replicated by dynamically trading the underlying asset and cash. If the replication argument is sound, the option price must match the cost of that hedge; otherwise, an arbitrage opportunity would exist."
      formula={[
        "C = S0 N(d1) - K e^(-rT) N(d2)",
        "d1 = [ln(S0 / K) + (r + 0.5 sigma^2)T] / (sigma sqrt(T))",
        "d2 = d1 - sigma sqrt(T)",
      ]}
      practicalUseCase="A derivatives desk can use Black-Scholes to quote a vanilla European option, compute delta and vega quickly, and compare market prices to implied volatility benchmarks before moving to more advanced calibration models."
      quizQuestions={quizQuestions}
      ctaHref="/models/black-scholes"
      ctaLabel="Try the model"
    />
  );
}
