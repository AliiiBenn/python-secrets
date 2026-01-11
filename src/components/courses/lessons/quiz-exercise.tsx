'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Quiz } from '@/payload-types'
import { cn } from '@/lib/utils'
import { useQuizSubmit } from '@/hooks/courses/lessons/use-quiz-submit'

interface QuizExerciseProps {
  data: Quiz
  userId?: string
  lessonId?: number
  courseId?: number
}

interface Answer {
  id: string | null
  text: string
  isCorrect?: boolean | null
}

interface Question {
  question: any
  answers?: Answer[]
  id?: string | null
}

export function QuizExercise({ data, userId, lessonId, courseId }: QuizExerciseProps) {
  const questions = data.questions || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(new Map())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [serverResult, setServerResult] = useState<{ score: number; correct: number; total: number; status: 'completed' | 'in_progress' } | null>(null)

  const currentQuestion = questions[currentIndex]
  const questionId = currentQuestion?.id || `q-${currentIndex}`

  // Hook pour la soumission au serveur
  const { submitQuiz, loadSavedAnswers, retryQuestion, isLoading, hasSavedProgress } = useQuizSubmit({
    userId,
    lessonId: lessonId!,
    courseId: courseId!,
    quizData: data,
  })

  // Charger les réponses sauvegardées au montage
  useEffect(() => {
    if (hasSavedProgress) {
      const saved = loadSavedAnswers()
      if (saved) {
        setSelectedAnswers(saved)
      }
    }
  }, [hasSavedProgress, loadSavedAnswers])

  // Calculer les résultats
  const results = useMemo(() => {
    if (!showResults) return null

    let correct = 0
    const details: Map<string, { correct: boolean; userAnswer?: string }> = new Map()

    questions.forEach((q) => {
      const qId = q.id || `q-${questions.indexOf(q)}`
      const selectedId = selectedAnswers.get(qId)
      const selectedAnswer = q.answers?.find(a => a.id === selectedId)
      const isCorrect = selectedAnswer?.isCorrect === true

      if (isCorrect) correct++
      details.set(qId, { correct: isCorrect, userAnswer: selectedId })
    })

    return { correct, total: questions.length, details }
  }, [showResults, questions, selectedAnswers])

  const handleAnswerSelect = (answerId: string) => {
    if (isSubmitted) return
    setSelectedAnswers(prev => new Map(prev).set(questionId, answerId))
  }

  const handleSubmit = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true)
      return
    }

    // Dernière question ou vue finale : soumettre au serveur
    try {
      const result = await submitQuiz(selectedAnswers)
      setServerResult(result)

      if (result.status === 'completed' || currentIndex === questions.length - 1) {
        setShowResults(true)
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      // En cas d'erreur, montrer quand même les résultats
      setShowResults(true)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsSubmitted(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsSubmitted(false)
    }
  }

  const goToQuestion = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index)
      setIsSubmitted(false)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No questions available for this quiz.</p>
      </div>
    )
  }

  // Vue résultats finaux
  if (showResults && results) {
    const percentage = Math.round((results.correct / results.total) * 100)

    return (
      <div className="h-full flex flex-col bg-background">
        <QuizHeader
          title={data.title}
          showResults
          score={`${results.correct}/${results.total}`}
        />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className={cn(
                "inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl mb-4",
                percentage >= 70 ? "bg-green-500/10 text-green-500" :
                percentage >= 40 ? "bg-amber-500/10 text-amber-500" :
                "bg-red-500/10 text-red-500"
              )}>
                {percentage}%
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {percentage >= 70 ? "Excellent!" : percentage >= 40 ? "Not bad!" : "Keep practicing!"}
              </h2>
              <p className="text-muted-foreground">
                You answered {results.correct} out of {results.total} question{results.correct > 1 ? 's' : ''} correctly
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const qId = q.id || `q-${idx}`
                const result = results.details.get(qId)
                const selectedAnswer = q.answers?.find(a => a.id === result?.userAnswer)
                const correctAnswer = q.answers?.find(a => a.isCorrect === true)

                return (
                  <div
                    key={qId}
                    className={cn(
                      "p-4 rounded-lg border-2",
                      result?.correct ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {result?.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-muted-foreground">Question {idx + 1}</span>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none mb-3">
                          <RichText data={q.question} />
                        </div>
                        <div className="text-sm space-y-1">
                          {selectedAnswer && (
                            <p className="text-muted-foreground">
                              <span className="font-medium">Your answer:</span> {selectedAnswer.text}
                            </p>
                          )}
                          {!result?.correct && correctAnswer && (
                            <p className="text-green-600 dark:text-green-400">
                              <span className="font-medium">Correct answer:</span> {correctAnswer.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <QuizFooter>
          <Button onClick={() => {
            setIsSubmitted(false)
            setShowResults(false)
            setSelectedAnswers(new Map())
            setCurrentIndex(0)
          }}>
            Retake Quiz
          </Button>
        </QuizFooter>
      </div>
    )
  }

  // Vue question par question
  const selectedAnswerId = selectedAnswers.get(questionId)
  const hasAnswer = !!selectedAnswerId

  return (
    <div className="h-full flex flex-col bg-background">
      <QuizHeader
        title={data.title}
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress dots */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {questions.map((_, idx) => {
              const qId = questions[idx]?.id || `q-${idx}`
              const isAnswered = selectedAnswers.has(qId)
              const isCurrent = idx === currentIndex

              return (
                <button
                  key={idx}
                  onClick={() => goToQuestion(idx)}
                  className={cn(
                    "w-8 h-8 rounded-full text-xs font-medium transition-all",
                    isCurrent && "ring-2 ring-primary ring-offset-2",
                    isAnswered ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    !isCurrent && !isAnswered && "hover:bg-muted-foreground/20"
                  )}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="prose prose-base dark:prose-invert max-w-none">
              <RichText data={currentQuestion.question} />
            </div>
          </div>

          {/* Réponses */}
          <div className="space-y-3">
            {currentQuestion.answers?.map((answer) => {
              const isSelected = answer.id === selectedAnswerId

              return (
                <button
                  key={answer.id || Math.random()}
                  onClick={() => handleAnswerSelect(answer.id!)}
                  disabled={isSubmitted}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    "hover:border-primary/50 hover:bg-primary/5",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center",
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                    )}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-background" />
                      )}
                    </div>
                    <span className="flex-1">{answer.text}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback après soumission */}
          {isSubmitted && (
            <div className={cn(
              "mt-6 p-4 rounded-lg border-2 flex items-start gap-3",
              hasAnswer && currentQuestion.answers?.find(a => a.id === selectedAnswerId)?.isCorrect
                ? "border-green-500/30 bg-green-500/5"
                : "border-red-500/30 bg-red-500/5"
            )}>
              {hasAnswer && currentQuestion.answers?.find(a => a.id === selectedAnswerId)?.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Correct!</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Incorrect</p>
                    {!hasAnswer && <p className="text-sm text-muted-foreground">You didn't select an answer.</p>}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      setIsSubmitted(false)
                      setSelectedAnswers(prev => {
                        const newMap = new Map(prev)
                        newMap.delete(questionId)
                        return newMap
                      })
                      // Retirer la réponse du serveur aussi
                      if (userId && lessonId) {
                        try {
                          await retryQuestion(questionId)
                        } catch (error) {
                          console.error('Failed to retry question:', error)
                        }
                      }
                    }}
                    disabled={isLoading}
                  >
                    Try Again
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <QuizFooter>
        <div className="flex items-center justify-between w-full">
          {questions.length > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              size={"sm"}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
          )}

          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={!hasAnswer || isLoading} size={"sm"}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit
            </Button>
          ) : currentIndex < questions.length - 1 ? (
            <Button onClick={handleNext} size={"sm"}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} size={"sm"}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              See Results
            </Button>
          )}

          {questions.length > 1 && (
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1 || isSubmitted}
              size={"sm"}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </QuizFooter>
    </div>
  )
}

interface QuizHeaderProps {
  title: string
  currentQuestion?: number
  totalQuestions?: number
  showResults?: boolean
  score?: string
}

function QuizHeader({
  title,
  currentQuestion,
  totalQuestions,
  showResults,
  score
}: QuizHeaderProps) {
  return (
    <div className="border-b px-4 h-12 flex items-center bg-muted/30">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-sm font-bold truncate">{title}</h2>
        {!showResults && totalQuestions && (
          <p className="text-xs text-muted-foreground">
            {currentQuestion} / {totalQuestions}
          </p>
        )}
        {showResults && score && (
          <p className="text-xs text-muted-foreground">
            Score: {score}
          </p>
        )}
      </div>
    </div>
  )
}

interface QuizFooterProps {
  children: React.ReactNode
}

function QuizFooter({ children }: QuizFooterProps) {
  return (
    <div className="border-t p-2">
      {children}
    </div>
  )
}
