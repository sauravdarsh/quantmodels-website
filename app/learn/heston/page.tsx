import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn Heston",
  description:
    "Study Heston stochastic volatility intuition, formula structure, practical use cases, and interactive quiz content.",
};

export default function LearnHestonPage() {
  return (
    <LearningLessonPage
      topic="heston"
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
      quizQuestions={staticQuestionBank.heston}
      ctaHref="/models/heston"
      ctaLabel="Try the model"
    />
  );
}
