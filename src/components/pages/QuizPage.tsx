import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Award,
  BookOpen
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { QUIZ_QUESTIONS } from '../../constants/labData';

export const QuizPage: React.FC = () => {
  const {
    quizAnswers,
    quizSubmitted,
    quizScore,
    submitQuiz,
    resetQuiz,
    setCurrentPage
  } = useLab();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(quizAnswers);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length) {
      setValidationError(`Please answer all ${QUIZ_QUESTIONS.length} questions before submitting.`);
      return;
    }
    submitQuiz(selectedAnswers);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    resetQuiz();
    setValidationError(null);
  };

  const isPassed = quizScore >= 7;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>KNOWLEDGE EVALUATION</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Laboratory Post-Test Quiz
        </h1>
        <p className="text-sm text-slate-400">
          Ten comprehensive multiple-choice questions evaluating sequential logic, IC 7476, and state transitions.
        </p>
      </div>

      {/* Quiz Score Banner if Submitted */}
      {quizSubmitted && (
        <div className={`rounded-2xl border p-6 shadow-2xl animate-fade-in ${
          isPassed 
            ? 'border-emerald-500/50 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900' 
            : 'border-amber-500/50 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                isPassed ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              }`}>
                <Award className="h-8 w-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Final Assessment Score</span>
                <div className="text-2xl font-black text-white mt-0.5">
                  <span className={isPassed ? 'text-emerald-400' : 'text-amber-400'}>{quizScore}</span> / 10 Correct ({quizScore * 10}%)
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {isPassed ? '✓ Excellent performance! You have mastered the JK Flip-Flop concepts.' : 'Review the detailed question explanations below and re-test.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition self-start sm:self-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Validation warning */}
      {validationError && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
          {validationError}
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const studentSelection = selectedAnswers[q.id];
          const isCorrect = quizSubmitted && studentSelection === q.correctIndex;
          const isWrong = quizSubmitted && studentSelection !== undefined && studentSelection !== q.correctIndex;

          return (
            <div 
              key={q.id}
              className={`rounded-2xl border p-6 space-y-4 transition ${
                quizSubmitted 
                  ? isCorrect 
                    ? 'border-emerald-500/40 bg-slate-900/90' 
                    : 'border-rose-500/40 bg-slate-900/90'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/20">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {quizSubmitted && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center space-x-1 font-mono text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>CORRECT</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 font-mono text-xs font-bold text-rose-400">
                        <XCircle className="h-4 w-4" />
                        <span>INCORRECT</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pl-10">
                {q.options.map((opt, optIdx) => {
                  const isChecked = studentSelection === optIdx;
                  const isRightAnswer = quizSubmitted && optIdx === q.correctIndex;

                  let optClass = "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700";
                  if (quizSubmitted) {
                    if (isRightAnswer) {
                      optClass = "border-emerald-500/60 bg-emerald-950/30 text-emerald-200 font-medium";
                    } else if (isChecked && !isRightAnswer) {
                      optClass = "border-rose-500/60 bg-rose-950/30 text-rose-200";
                    }
                  } else if (isChecked) {
                    optClass = "border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500";
                  }

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`flex items-start space-x-3 rounded-xl border p-3 cursor-pointer transition text-xs ${optClass}`}
                    >
                      <input
                        type="radio"
                        name={`question_${q.id}`}
                        checked={isChecked}
                        disabled={quizSubmitted}
                        onChange={() => {}}
                        className="mt-0.5 h-3.5 w-3.5 text-cyan-500 focus:ring-cyan-400"
                      />
                      <span className="leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {/* Detailed Explanation on Submission */}
              {quizSubmitted && (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 mt-3 ml-10 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-cyan-400 flex items-center space-x-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Technical Explanation:</span>
                  </div>
                  <p className="leading-relaxed text-slate-400">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit Button */}
        {!quizSubmitted && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-8 py-3 text-xs font-bold text-slate-950 shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>SUBMIT QUIZ FOR EVALUATION</span>
            </button>
          </div>
        )}
      </form>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('timing')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Timing Diagram
        </button>
        <button
          onClick={() => setCurrentPage('viva')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Practice Viva Questions</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
