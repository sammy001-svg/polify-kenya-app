"use client";

import { useState } from "react";
import { DEMO_QUIZZES } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Trophy } from "lucide-react";

export function CivicQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const quiz = DEMO_QUIZZES[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quiz.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < DEMO_QUIZZES.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Constitutional Challenge</h2>
          <p className="text-sm text-brand-text-muted">Question {currentQuestion + 1} of {DEMO_QUIZZES.length}</p>
        </div>
        <div className="flex items-center gap-2 text-kenya-gold">
          <Trophy className="w-5 h-5" />
          <span className="text-xl font-bold">{score}/{DEMO_QUIZZES.length}</span>
        </div>
      </div>

      <Card className="bg-brand-surface border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{quiz.question}</CardTitle>
            <span className={`text-xs px-2 py-1 rounded ${
              quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              quiz.difficulty === 'Medium' ? 'bg-kenya-gold/20 text-kenya-gold' :
              'bg-red-500/20 text-red-400'
            }`}>
              {quiz.difficulty}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                showResult
                  ? index === quiz.correctAnswer
                    ? 'border-green-500 bg-green-500/10'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-border bg-brand-surface-secondary opacity-50'
                  : 'border-border bg-brand-surface-secondary hover:border-kenya-gold hover:bg-brand-highlight'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === quiz.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {showResult && selectedAnswer === index && index !== quiz.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}

          {showResult && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <p className={`font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm text-brand-text-muted">{quiz.explanation}</p>
            </div>
          )}

          {showResult && currentQuestion < DEMO_QUIZZES.length - 1 && (
            <Button onClick={handleNext} className="w-full">
              Next Question
            </Button>
          )}

          {showResult && currentQuestion === DEMO_QUIZZES.length - 1 && (
            <div className="text-center p-6 bg-brand-highlight rounded-lg">
              <Trophy className="w-12 h-12 text-kenya-gold mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-lg">Your Score: <span className="text-kenya-gold font-bold">{score}/{DEMO_QUIZZES.length}</span></p>
              <p className="text-sm text-brand-text-muted mt-2">
                {score === DEMO_QUIZZES.length ? "Perfect! You're a constitutional expert!" :
                 score >= DEMO_QUIZZES.length / 2 ? "Good job! Keep learning!" :
                 "Keep studying! Knowledge is power."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
