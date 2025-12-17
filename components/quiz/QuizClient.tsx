"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/app/data/quiz-questions";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

const LOCAL_STORAGE_KEY = "quiz-user-answers";

interface QuizClientProps {
  questions: QuizQuestion[];
  initialCorrectAnswers: Record<string, string[]>;
}

export default function QuizClient({
  questions,
  initialCorrectAnswers,
}: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const correctAnswers = initialCorrectAnswers;
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(
    new Set()
  );

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserAnswers(parsed.answers || {});
        setSubmittedQuestions(new Set(parsed.submitted || []));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  const saveToLocalStorage = (
    answers: Record<string, string[]>,
    submitted: Set<string>
  ) => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          answers,
          submitted: Array.from(submitted),
        })
      );
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleOptionClick = (optionId: string) => {
    const questionId = currentQuestion.id;
    if (submittedQuestions.has(questionId)) return;

    const currentUserAnswer = userAnswers[questionId] || [];
    const newAnswers = currentUserAnswer.includes(optionId)
      ? currentUserAnswer.filter((id) => id !== optionId)
      : [...currentUserAnswer, optionId].sort();

    const updatedAnswers = { ...userAnswers, [questionId]: newAnswers };
    setUserAnswers(updatedAnswers);
    saveToLocalStorage(updatedAnswers, submittedQuestions);
  };

  const handleSubmit = () => {
    const newSubmitted = new Set(submittedQuestions);
    newSubmitted.add(currentQuestion.id);
    setSubmittedQuestions(newSubmitted);
    saveToLocalStorage(userAnswers, newSubmitted);
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < totalQuestions) setCurrentQuestionIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        currentQuestionIndex < totalQuestions - 1
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestionIndex, totalQuestions]);

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        No questions available.
      </div>
    );
  }

  const currentCorrectAnswers = correctAnswers[currentQuestion.id] || [];
  const currentUserAnswer = userAnswers[currentQuestion.id] || [];
  const isSubmitted = submittedQuestions.has(currentQuestion.id);
  const isCorrect =
    isSubmitted &&
    currentCorrectAnswers.length > 0 &&
    currentUserAnswer.length === currentCorrectAnswers.length &&
    currentUserAnswer.every((a) => currentCorrectAnswers.includes(a));

  // Calculate stats
  const correctCount = Array.from(submittedQuestions).filter((qId) => {
    const userAns = userAnswers[qId] || [];
    const correctAns = correctAnswers[qId] || [];
    return (
      correctAns.length > 0 &&
      userAns.length === correctAns.length &&
      userAns.every((a) => correctAns.includes(a))
    );
  }).length;

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6">
      {/* Title */}
      <h1 className="text-lg md:text-xl font-semibold text-center mb-6">
        Basic Course in Biomedical Research
      </h1>

      {/* Navigation */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goTo(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={totalQuestions}
              value={currentQuestionIndex + 1}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= totalQuestions) goTo(val - 1);
              }}
              className="w-14 text-center bg-transparent border-b border-border text-sm py-1 focus:outline-none focus:border-foreground"
            />
            <span className="text-sm text-muted-foreground">
              / {totalQuestions}
            </span>
          </div>

          <button
            onClick={() => goTo(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={totalQuestions - 1}
          value={currentQuestionIndex}
          onChange={(e) => goTo(parseInt(e.target.value))}
          className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-foreground
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-foreground
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      {/* Question */}
      <div className="flex-1">
        <p className="text-base md:text-lg mb-6 leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = currentUserAnswer.includes(option.id);
            const isCorrectOption = currentCorrectAnswers.includes(option.id);
            const isWrongSelection =
              isSubmitted && isSelected && !isCorrectOption;

            let classes =
              "w-full text-left px-4 py-3 rounded-lg border transition-all text-sm md:text-base ";

            if (isSubmitted) {
              if (isCorrectOption) {
                classes +=
                  "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200";
              } else if (isWrongSelection) {
                classes +=
                  "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200";
              } else {
                classes += "border-border opacity-50";
              }
            } else if (isSelected) {
              classes +=
                "border-foreground bg-foreground/5 ring-1 ring-foreground";
            } else {
              classes +=
                "border-border hover:border-muted-foreground cursor-pointer";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={isSubmitted}
                className={classes}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-medium border ${
                      isSubmitted && isCorrectOption
                        ? "border-green-500 bg-green-500 text-white"
                        : isWrongSelection
                          ? "border-red-500 bg-red-500 text-white"
                          : isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-current"
                    }`}
                  >
                    {isSubmitted && isCorrectOption ? (
                      <Check className="h-3 w-3" />
                    ) : isWrongSelection ? (
                      <X className="h-3 w-3" />
                    ) : (
                      letter
                    )}
                  </span>
                  <span className="flex-1 leading-relaxed">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit */}
        {!isSubmitted && currentUserAnswer.length > 0 && (
          <Button onClick={handleSubmit} className="w-full mt-6" size="lg">
            Check Answer
          </Button>
        )}

        {/* Result */}
        {isSubmitted && (
          <p
            className={`mt-6 text-sm ${
              isCorrect
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
        )}
      </div>

      {/* Progress bar and stats */}
      <div className="mt-8 pt-4 border-t border-border space-y-3">
        {/* Progress bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(submittedQuestions.size / totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{submittedQuestions.size} answered</span>
          <span className="text-green-600 dark:text-green-400">
            {correctCount} correct
          </span>
          <span>{totalQuestions - submittedQuestions.size} remaining</span>
        </div>
      </div>
    </div>
  );
}
