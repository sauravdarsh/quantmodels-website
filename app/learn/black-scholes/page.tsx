import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn Black-Scholes",
  description:
    "Study Black-Scholes intuition, formula structure, practical use cases, and quiz-based learning inside QuantModels.ai.",
};

export default function LearnBlackScholesPage() {
  return (
    <LearningLessonPage
      topic="black-scholes"
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
      quizQuestions={staticQuestionBank["black-scholes"]}
      ctaHref="/models/black-scholes"
      ctaLabel="Try the model"
    />
  );
}
