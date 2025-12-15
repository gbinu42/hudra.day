"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { quizService } from "@/lib/quiz-services";
import { quizQuestions } from "@/app/data/quiz-questions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "quiz-user-answers";

export default function QuizPage() {
  const { user, userProfile } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Correct answers from Firebase (set by admin)
  const [correctAnswers, setCorrectAnswers] = useState<
    Record<string, string[]>
  >({});
  // User's own answers (stored in localStorage)
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [currentRange, setCurrentRange] = useState(0);
  // Track if user has submitted their answer for current question
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(
    new Set()
  );

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isAdmin = userProfile?.role === "admin";
  const totalQuestions = quizQuestions.length;

  // Question range configuration
  const QUESTIONS_PER_RANGE = 25;
  const totalRanges = Math.ceil(totalQuestions / QUESTIONS_PER_RANGE);

  // Get questions for current range
  const getRangeStart = (rangeIndex: number) =>
    rangeIndex * QUESTIONS_PER_RANGE;
  const getRangeEnd = (rangeIndex: number) =>
    Math.min((rangeIndex + 1) * QUESTIONS_PER_RANGE, totalQuestions);

  // Update current range when question index changes
  useEffect(() => {
    const newRange = Math.floor(currentQuestionIndex / QUESTIONS_PER_RANGE);
    setCurrentRange(newRange);
  }, [currentQuestionIndex]);

  // Load user answers from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserAnswers(parsed.answers || {});
        setSubmittedQuestions(new Set(parsed.submitted || []));
      }
    } catch (error) {
      console.error("Error loading user answers from localStorage:", error);
    }
  }, []);

  // Save user answers to localStorage
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

  // Load correct answers from Firebase
  useEffect(() => {
    const loadCorrectAnswers = async () => {
      try {
        setLoadingAnswers(true);
        const loadedAnswers: Record<string, string[]> = {};

        for (const question of quizQuestions) {
          const answer = await quizService.getAnswer(question.id);
          if (answer) {
            const answerValue = answer.answer;
            if (Array.isArray(answerValue)) {
              loadedAnswers[question.id] = answerValue;
            } else if (typeof answerValue === "string") {
              loadedAnswers[question.id] = [answerValue];
            }
          }
        }

        setCorrectAnswers(loadedAnswers);
      } catch (error) {
        console.error("Error loading correct answers:", error);
        toast.error("Failed to load quiz answers");
      } finally {
        setLoadingAnswers(false);
      }
    };

    loadCorrectAnswers();
  }, []);

  // Admin: Toggle correct answer in Firebase
  const handleAdminOptionClick = async (optionId: string) => {
    if (!user) {
      toast.error("You must be signed in");
      return;
    }

    const currentCorrect = correctAnswers[currentQuestion.id] || [];
    const isRemoving = currentCorrect.includes(optionId);
    let newAnswers: string[];

    if (isRemoving) {
      newAnswers = currentCorrect.filter((id) => id !== optionId);
    } else {
      newAnswers = [...currentCorrect, optionId].sort();
    }

    try {
      setSavingAnswer(true);
      await quizService.saveAnswer(currentQuestion.id, newAnswers, user.uid);

      setCorrectAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: newAnswers,
      }));

      toast.success(
        isRemoving ? "Option removed" : "Option added as correct answer"
      );

      // Auto-advance when adding
      if (!isRemoving && currentQuestionIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 500);
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
    } finally {
      setSavingAnswer(false);
    }
  };

  // User: Select option (toggle in localStorage)
  const handleUserOptionClick = (optionId: string) => {
    const questionId = currentQuestion.id;

    // If already submitted, don't allow changes
    if (submittedQuestions.has(questionId)) {
      return;
    }

    const currentUserAnswer = userAnswers[questionId] || [];
    let newAnswers: string[];

    if (currentUserAnswer.includes(optionId)) {
      newAnswers = currentUserAnswer.filter((id) => id !== optionId);
    } else {
      newAnswers = [...currentUserAnswer, optionId].sort();
    }

    const updatedAnswers = {
      ...userAnswers,
      [questionId]: newAnswers,
    };

    setUserAnswers(updatedAnswers);
    saveToLocalStorage(updatedAnswers, submittedQuestions);
  };

  // User: Submit answer to see result
  const handleSubmitAnswer = () => {
    const questionId = currentQuestion.id;
    const newSubmitted = new Set(submittedQuestions);
    newSubmitted.add(questionId);
    setSubmittedQuestions(newSubmitted);
    saveToLocalStorage(userAnswers, newSubmitted);
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestionIndex, totalQuestions]);

  const currentCorrectAnswers = correctAnswers[currentQuestion?.id] || [];
  const currentUserAnswer = userAnswers[currentQuestion?.id] || [];
  const isCurrentSubmitted = submittedQuestions.has(currentQuestion?.id);
  const hasCorrectAnswerSet = currentCorrectAnswers.length > 0;

  // Calculate stats
  const answeredCount = isAdmin
    ? Object.keys(correctAnswers).filter((k) => correctAnswers[k]?.length > 0)
        .length
    : submittedQuestions.size;

  if (loadingAnswers) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading quiz...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No quiz questions available.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if user got the current question correct
  const isUserCorrect =
    isCurrentSubmitted && hasCorrectAnswerSet
      ? currentUserAnswer.length === currentCorrectAnswers.length &&
        currentUserAnswer.every((a) => currentCorrectAnswers.includes(a))
      : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Basic Course in Biomedical Research
              </h1>
            </div>
            <p className="text-muted-foreground">Quiz Questions</p>

            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              {isAdmin ? (
                <Badge variant="default">
                  Admin Mode - Click to toggle correct answers
                </Badge>
              ) : (
                <Badge variant="outline">
                  Select your answer and click Submit to check
                </Badge>
              )}
              <Badge variant="outline" className="hidden lg:inline-flex">
                Use ← → arrow keys to navigate
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm text-muted-foreground">
                {answeredCount} / {totalQuestions}{" "}
                {isAdmin ? "set" : "attempted"}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / totalQuestions) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question Card with Side Navigation */}
          <div className="relative">
            {/* Previous Button - Left Side */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 h-12 w-12 rounded-full shadow-lg z-10 hidden lg:flex"
              title="Previous Question (←)"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Next Button - Right Side */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 h-12 w-12 rounded-full shadow-lg z-10 hidden lg:flex"
              title="Next Question (→)"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-xl flex-1">
                    {currentQuestion.question}
                  </CardTitle>
                  {isAdmin && currentCorrectAnswers.length > 0 && (
                    <Badge variant="secondary" className="shrink-0">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {currentCorrectAnswers.length} correct
                    </Badge>
                  )}
                  {!isAdmin && isCurrentSubmitted && (
                    <Badge
                      variant={isUserCorrect ? "default" : "destructive"}
                      className="shrink-0"
                    >
                      {isUserCorrect ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Correct!
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Incorrect
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                {!isAdmin && !isCurrentSubmitted && (
                  <CardDescription>
                    Select your answer
                    {hasCorrectAnswerSet && currentCorrectAnswers.length > 1
                      ? "s"
                      : ""}{" "}
                    and click Submit
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isCorrectOption = currentCorrectAnswers.includes(
                      option.id
                    );
                    const isUserSelected = currentUserAnswer.includes(
                      option.id
                    );

                    // Admin view
                    if (isAdmin) {
                      return (
                        <Button
                          key={index}
                          onClick={() => handleAdminOptionClick(option.id)}
                          disabled={savingAnswer}
                          variant={isCorrectOption ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-4 px-4 ${
                            isCorrectOption
                              ? "ring-2 ring-primary bg-green-600 hover:bg-green-700"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-current shrink-0 mt-0.5">
                              {isCorrectOption ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <span className="text-sm font-semibold">
                                  {optionLetter}
                                </span>
                              )}
                            </div>
                            <span className="flex-1 whitespace-normal break-words">
                              {option.text}
                            </span>
                          </div>
                        </Button>
                      );
                    }

                    // User view - submitted
                    if (isCurrentSubmitted) {
                      let className =
                        "w-full justify-start text-left h-auto py-4 px-4 ";
                      let variant: "default" | "outline" | "destructive" =
                        "outline";

                      if (isCorrectOption) {
                        // This is a correct answer - show green
                        className +=
                          "ring-2 ring-green-500 bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30";
                      } else if (isUserSelected && !isCorrectOption) {
                        // User selected this but it's wrong - show red
                        className +=
                          "ring-2 ring-red-500 bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/30";
                      }

                      return (
                        <Button
                          key={index}
                          disabled
                          variant={variant}
                          className={className}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 ${
                                isCorrectOption
                                  ? "border-green-600 text-green-600"
                                  : isUserSelected
                                  ? "border-red-600 text-red-600"
                                  : "border-current"
                              }`}
                            >
                              {isCorrectOption ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : isUserSelected ? (
                                <XCircle className="h-4 w-4 text-red-600" />
                              ) : (
                                <span className="text-sm font-semibold">
                                  {optionLetter}
                                </span>
                              )}
                            </div>
                            <span className="flex-1 whitespace-normal break-words">
                              {option.text}
                            </span>
                            {isCorrectOption && (
                              <Badge
                                variant="outline"
                                className="shrink-0 bg-green-100 text-green-800 border-green-500 dark:bg-green-900/50 dark:text-green-200"
                              >
                                Correct
                              </Badge>
                            )}
                          </div>
                        </Button>
                      );
                    }

                    // User view - not submitted yet
                    return (
                      <Button
                        key={index}
                        onClick={() => handleUserOptionClick(option.id)}
                        variant={isUserSelected ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto py-4 px-4 ${
                          isUserSelected ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-current shrink-0 mt-0.5">
                            {isUserSelected ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-semibold">
                                {optionLetter}
                              </span>
                            )}
                          </div>
                          <span className="flex-1 whitespace-normal break-words">
                            {option.text}
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {/* Submit button for users */}
                {!isAdmin &&
                  !isCurrentSubmitted &&
                  currentUserAnswer.length > 0 && (
                    <div className="mt-6">
                      <Button
                        onClick={handleSubmitAnswer}
                        className="w-full"
                        size="lg"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  )}

                {/* Result display for users */}
                {!isAdmin && isCurrentSubmitted && (
                  <Alert
                    className={`mt-6 ${
                      isUserCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                    }`}
                  >
                    {isUserCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription
                      className={
                        isUserCorrect
                          ? "text-green-800 dark:text-green-200"
                          : "text-red-800 dark:text-red-200"
                      }
                    >
                      {isUserCorrect ? (
                        <strong>Correct! Well done.</strong>
                      ) : (
                        <>
                          <strong>Incorrect.</strong> The correct answer
                          {currentCorrectAnswers.length > 1
                            ? "s are"
                            : " is"}:{" "}
                          {currentCorrectAnswers
                            .map(
                              (answerId) =>
                                currentQuestion.options.find(
                                  (opt) => opt.id === answerId
                                )?.text || answerId
                            )
                            .join(", ")}
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Admin correct answers display */}
                {isAdmin && currentCorrectAnswers.length > 0 && (
                  <Alert className="mt-6 border-green-500 bg-green-50 dark:bg-green-900/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      <strong>
                        Correct Answer
                        {currentCorrectAnswers.length > 1 ? "s" : ""}:
                      </strong>{" "}
                      {currentCorrectAnswers
                        .map(
                          (answerId) =>
                            currentQuestion.options.find(
                              (opt) => opt.id === answerId
                            )?.text || answerId
                        )
                        .join(", ")}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="lg:hidden space-y-4 mb-6">
            {/* Mobile Range Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: totalRanges }, (_, rangeIndex) => {
                const start = getRangeStart(rangeIndex);
                const end = getRangeEnd(rangeIndex);
                const isCurrentRange = currentRange === rangeIndex;
                const rangeAnsweredCount = quizQuestions
                  .slice(start, end)
                  .filter((q) =>
                    isAdmin
                      ? correctAnswers[q.id]?.length > 0
                      : submittedQuestions.has(q.id)
                  ).length;
                const rangeTotal = end - start;

                return (
                  <Button
                    key={rangeIndex}
                    variant={isCurrentRange ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentRange(rangeIndex);
                      goToQuestion(start);
                    }}
                    className="shrink-0"
                  >
                    {start + 1}-{end}
                    {rangeAnsweredCount > 0 && (
                      <span className="ml-1 text-xs">
                        ({rangeAnsweredCount}/{rangeTotal})
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
                className="flex-1"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {currentQuestionIndex + 1} / {totalQuestions}
                </span>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={goToNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="flex-1"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Desktop Navigation - Question Grid with Ranges */}
          <div className="hidden lg:block space-y-4">
            {/* Range Selector */}
            <div className="flex justify-center gap-2 flex-wrap">
              {Array.from({ length: totalRanges }, (_, rangeIndex) => {
                const start = getRangeStart(rangeIndex);
                const end = getRangeEnd(rangeIndex);
                const isCurrentRange = currentRange === rangeIndex;
                const rangeAnsweredCount = quizQuestions
                  .slice(start, end)
                  .filter((q) =>
                    isAdmin
                      ? correctAnswers[q.id]?.length > 0
                      : submittedQuestions.has(q.id)
                  ).length;
                const rangeTotal = end - start;

                return (
                  <Button
                    key={rangeIndex}
                    variant={isCurrentRange ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentRange(rangeIndex);
                      goToQuestion(start);
                    }}
                    className="min-w-[100px]"
                  >
                    <span className="font-semibold">
                      {start + 1}-{end}
                    </span>
                    {rangeAnsweredCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 px-1.5 text-xs"
                      >
                        {rangeAnsweredCount}/{rangeTotal}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Question Grid for Current Range */}
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2 flex-wrap justify-center">
                {quizQuestions
                  .slice(getRangeStart(currentRange), getRangeEnd(currentRange))
                  .map((_, rangeIdx) => {
                    const index = getRangeStart(currentRange) + rangeIdx;
                    const isCurrentQuestion = index === currentQuestionIndex;
                    const questionId = quizQuestions[index].id;
                    const isAnswered = isAdmin
                      ? correctAnswers[questionId]?.length > 0
                      : submittedQuestions.has(questionId);

                    // For users, show green/red based on correctness
                    let buttonClass = "w-10 h-10 p-0";
                    if (!isAdmin && submittedQuestions.has(questionId)) {
                      const userAns = userAnswers[questionId] || [];
                      const correctAns = correctAnswers[questionId] || [];
                      const isCorrect =
                        userAns.length === correctAns.length &&
                        userAns.every((a) => correctAns.includes(a));
                      if (correctAns.length > 0) {
                        buttonClass += isCorrect
                          ? " bg-green-100 border-green-500 hover:bg-green-200 dark:bg-green-900/30"
                          : " bg-red-100 border-red-500 hover:bg-red-200 dark:bg-red-900/30";
                      }
                    }

                    return (
                      <Button
                        key={index}
                        variant={isCurrentQuestion ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToQuestion(index)}
                        className={buttonClass}
                        title={`Question ${index + 1}${
                          isAnswered ? " (Answered)" : ""
                        }`}
                      >
                        {isAnswered ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </Button>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                onClick={goToNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Completion Message */}
          {!isAdmin && submittedQuestions.size === totalQuestions && (
            <Alert className="mt-6">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                You have completed all questions! Review your answers above.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
