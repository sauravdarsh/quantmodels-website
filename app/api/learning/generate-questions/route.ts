import {
  createMockGeneratedQuestions,
  type GeneratedQuestionRequest,
  type LearningDifficulty,
  type LearningTopic,
} from "@/lib/learning";

const validTopics: LearningTopic[] = [
  "black-scholes",
  "heston",
  "cir-plus-plus",
  "monte-carlo",
  "portfolio-optimization",
  "var-expected-shortfall",
];

const validDifficulties: LearningDifficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
];

function isValidTopic(value: unknown): value is LearningTopic {
  return typeof value === "string" && validTopics.includes(value as LearningTopic);
}

function isValidDifficulty(value: unknown): value is LearningDifficulty {
  return typeof value === "string" && validDifficulties.includes(value as LearningDifficulty);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<GeneratedQuestionRequest>;
  const topic = body.topic;
  const difficulty = body.difficulty;
  const count = Math.min(20, Math.max(1, Number(body.count) || 1));

  if (!isValidTopic(topic) || !isValidDifficulty(difficulty)) {
    return Response.json(
      {
        error: "Invalid request payload. Expected topic, difficulty, and count.",
      },
      { status: 400 },
    );
  }

  const questions = createMockGeneratedQuestions({
    topic,
    difficulty,
    count,
  });

  return Response.json({
    topic,
    difficulty,
    count,
    questions,
    meta: {
      source: "mock-learning-generator",
      readyForFutureModelIntegration: true,
      futureEndpoint: "POST /api/learning/generate-questions",
    },
  });
}
