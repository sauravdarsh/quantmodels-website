import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn Monte Carlo",
  description:
    "Study Monte Carlo pricing intuition, simulation formulas, real workflows, and quiz-based learning content.",
};

export default function LearnMonteCarloPage() {
  return (
    <LearningLessonPage
      topic="monte-carlo"
      eyebrow="Quant Learning Lab"
      title="Monte Carlo Pricing and Simulation"
      description="Learn how pathwise simulation turns uncertainty into a pricing and risk-analysis engine."
      overview="Monte Carlo methods estimate values by simulating many possible future paths for one or more risk factors, then averaging the discounted payoff or portfolio outcome. The technique is conceptually simple but powerful enough to support a wide range of structured, exotic, and risk-management problems."
      intuition="Rather than solving one closed-form equation, Monte Carlo creates many plausible futures and asks what the payoff looks like in each one. The average across those scenarios becomes the estimate, and the path set can also be reused for stress testing and exposure analysis."
      formula={[
        "V approx e^(-rT) (1/N) sum_{i=1}^{N} Payoff_i",
        "S_(t+dt) = S_t exp[(r - 0.5 sigma^2)dt + sigma sqrt(dt) Z]",
        "As N grows, the estimate converges statistically",
      ]}
      practicalUseCase="A quant team can use Monte Carlo to value a path-dependent payoff, study scenario distributions, and compare how changes in volatility, maturity, or correlation alter both price and risk measures."
      quizQuestions={staticQuestionBank["monte-carlo"]}
      ctaHref="/models/monte-carlo"
      ctaLabel="Try the model"
    />
  );
}
