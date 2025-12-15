import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { quizQuestions } from "@/app/data/quiz-questions";
import { quizService } from "@/lib/quiz-services";
import QuizClient from "@/components/quiz/QuizClient";

// Force static generation at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

// Generate metadata
export const metadata = {
  title: "Quiz - Basic Course in Biomedical Research | Hudra",
  description:
    "Test your knowledge with interactive quiz questions from the Basic Course in Biomedical Research. Multiple choice questions with instant feedback.",
  openGraph: {
    title: "Quiz - Basic Course in Biomedical Research",
    description:
      "Test your knowledge with interactive quiz questions from the Basic Course in Biomedical Research.",
    type: "website",
  },
};

// Pre-fetch correct answers at build time
async function getCorrectAnswers(): Promise<Record<string, string[]>> {
  try {
    const correctAnswers: Record<string, string[]> = {};

    for (const question of quizQuestions) {
      try {
        const answer = await quizService.getAnswer(question.id);
        if (answer) {
          const answerValue = answer.answer;
          if (Array.isArray(answerValue)) {
            correctAnswers[question.id] = answerValue;
          } else if (typeof answerValue === "string") {
            correctAnswers[question.id] = [answerValue];
          }
        }
      } catch (error) {
        // Skip individual errors, continue with other questions
        console.error(`Error loading answer for ${question.id}:`, error);
      }
    }

    return correctAnswers;
  } catch (error) {
    console.error("Error loading correct answers:", error);
    return {};
  }
}

export default async function QuizPage() {
  // Pre-fetch all correct answers at build time
  const correctAnswers = await getCorrectAnswers();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <QuizClient
        questions={quizQuestions}
        initialCorrectAnswers={correctAnswers}
      />
      <Footer />
    </div>
  );
}
