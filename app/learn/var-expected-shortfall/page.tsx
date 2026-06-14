import type { Metadata } from "next";

import { LearningLessonPage } from "@/components/learning-lesson-page";
import { staticQuestionBank } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Learn VaR and Expected Shortfall",
  description:
    "Study Value at Risk, Expected Shortfall, tail-risk intuition, practical use cases, and an expanded question bank.",
};

export default function LearnVarExpectedShortfallPage() {
  return (
    <LearningLessonPage
      topic="var-expected-shortfall"
      eyebrow="Quant Learning Lab"
      title="VaR and Expected Shortfall"
      description="Learn how probabilistic risk thresholds and tail-loss averages work together in institutional risk reporting."
      overview="Value at Risk and Expected Shortfall are core downside-risk tools used by portfolio managers, risk officers, and regulators. VaR summarizes a loss threshold at a chosen confidence level, while Expected Shortfall goes deeper by describing the average loss once that threshold has been breached."
      intuition="VaR tells you where the tail starts; Expected Shortfall helps tell you how painful that tail can be. Together, they move the conversation from ordinary volatility into portfolio resilience under bad outcomes."
      formula={[
        "VaR_alpha = loss quantile at confidence alpha",
        "ES_alpha = E[Loss | Loss > VaR_alpha]",
        "Tail-risk analysis often complements stress scenarios and drawdown review",
      ]}
      practicalUseCase="A risk team can track daily VaR, Expected Shortfall, and scenario stress losses across a portfolio to understand ordinary risk, tail severity, and the types of events that could materially damage capital."
      quizQuestions={staticQuestionBank["var-expected-shortfall"]}
      ctaHref="/models/portfolio-management"
      ctaLabel="Try the model"
    />
  );
}
