import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";

export const metadata: Metadata = {
  title: "Learn Monte Carlo",
  description:
    "Study Monte Carlo pricing intuition, simulation formulas, real workflows, and quiz-based learning content.",
};

const quizQuestions = [
  {
    prompt: "Why is Monte Carlo especially useful in quantitative finance?",
    options: [
      "It only works for closed-form payoffs",
      "It can approximate values for complex path-dependent problems",
      "It removes randomness from pricing",
      "It always outperforms analytic formulas for vanilla options",
    ],
    answer: 1,
    explanation:
      "Monte Carlo shines when the payoff or state space is too complex for a clean analytic solution, especially in high-dimensional or path-dependent settings.",
  },
  {
    prompt: "What usually improves Monte Carlo estimate stability?",
    options: [
      "Fewer paths",
      "More simulation paths or variance-reduction methods",
      "Ignoring discounting",
      "Removing stochastic shocks",
    ],
    answer: 1,
    explanation:
      "More paths reduce sampling error, and variance-reduction methods can improve efficiency without simply brute-forcing path count.",
  },
  {
    prompt: "What is a practical drawback of Monte Carlo?",
    options: [
      "It cannot model uncertainty",
      "It can be computationally expensive",
      "It cannot produce scenario outputs",
      "It only works for interest rates",
    ],
    answer: 1,
    explanation:
      "Monte Carlo is flexible, but that flexibility often comes with heavier computational demands compared with closed-form methods.",
  },
];

export default function LearnMonteCarloPage() {
  return (
    <LearningLessonPage
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
      quizQuestions={quizQuestions}
      ctaHref="/models/monte-carlo"
      ctaLabel="Try the model"
    />
  );
}
