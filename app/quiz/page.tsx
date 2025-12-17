import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { quizQuestions } from "@/app/data/quiz-questions";
import QuizClient from "@/components/quiz/QuizClient";

// Force static generation at build time
export const dynamic = "force-static";

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

// Get correct answers from the static data
function getCorrectAnswers(): Record<string, string[]> {
  const correctAnswers: Record<string, string[]> = {};

  for (const question of quizQuestions) {
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      correctAnswers[question.id] = question.correctAnswers;
    }
  }

  return correctAnswers;
}

export default function QuizPage() {
  const correctAnswers = getCorrectAnswers();

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
