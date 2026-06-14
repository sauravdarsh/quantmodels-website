import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn Portfolio Optimization",
  description:
    "Study portfolio optimization intuition, formulas, use cases, and quiz interactions in the QuantModels.ai Learning Lab.",
};

export default function LearnPortfolioOptimizationPage() {
  return (
    <LearningLessonPage
      topic="portfolio-optimization"
      eyebrow="Quant Learning Lab"
      title="Portfolio Optimization Fundamentals"
      description="See how expected return, volatility, and correlation combine into a practical allocation framework."
      overview="Portfolio optimization turns a collection of assets into a structured decision problem. Instead of asking which single asset looks best, the framework asks how different weights interact through expected return, volatility, and correlation to shape the portfolio as a whole."
      intuition="The main insight is that portfolio quality depends not just on standalone asset characteristics, but also on how those assets co-move. A strong optimizer uses diversification to improve the risk-return mix rather than simply chasing the highest raw expected return."
      formula={[
        "Expected portfolio return = w^T mu",
        "Portfolio variance = w^T Sigma w",
        "Sharpe ratio = (w^T mu - r_f) / sqrt(w^T Sigma w)",
      ]}
      practicalUseCase="An investment team can compare equal-weight, minimum-variance, maximum-Sharpe, and risk-parity allocations to understand how the same equity universe behaves under different institutional portfolio objectives."
      quizQuestions={staticQuestionBank["portfolio-optimization"]}
      ctaHref="/models/portfolio-management"
      ctaLabel="Try the model"
    />
  );
}
