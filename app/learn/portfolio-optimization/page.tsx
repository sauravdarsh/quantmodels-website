import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";

export const metadata: Metadata = {
  title: "Learn Portfolio Optimization",
  description:
    "Study portfolio optimization intuition, formulas, use cases, and quiz interactions in the QuantModels.ai Learning Lab.",
};

const quizQuestions = [
  {
    prompt: "Why is correlation important in portfolio optimization?",
    options: [
      "Because it determines option exercise style",
      "Because diversification depends on how assets move together",
      "Because it eliminates volatility",
      "Because it fixes expected return automatically",
    ],
    answer: 1,
    explanation:
      "Two assets can each be risky on their own, but if they do not move together closely, combining them can reduce overall portfolio volatility.",
  },
  {
    prompt: "What does the Sharpe ratio measure?",
    options: [
      "Total return only",
      "Excess return per unit of risk",
      "Maximum possible leverage",
      "Drawdown persistence only",
    ],
    answer: 1,
    explanation:
      "The Sharpe ratio compares return above the risk-free rate to volatility, making it a simple risk-adjusted performance measure.",
  },
  {
    prompt: "What is a practical use of optimization methods like minimum variance or risk parity?",
    options: [
      "Constructing systematic allocation rules",
      "Replacing market data entirely",
      "Guaranteeing positive returns",
      "Removing all estimation error",
    ],
    answer: 0,
    explanation:
      "Optimization methods give portfolio managers structured ways to translate return, volatility, and correlation views into actual weights, even though estimates remain uncertain.",
  },
];

export default function LearnPortfolioOptimizationPage() {
  return (
    <LearningLessonPage
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
      quizQuestions={quizQuestions}
      ctaHref="/models/portfolio-management"
      ctaLabel="Try the model"
    />
  );
}
