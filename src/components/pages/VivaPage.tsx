import React, { useState } from 'react';
import { 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { VIVA_QUESTIONS } from '../../constants/labData';

export const VivaPage: React.FC = () => {
  const { setCurrentPage } = useLab();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mastered, setMastered] = useState<Record<number, boolean>>({});

  const currentQ = VIVA_QUESTIONS[currentIdx];

  const handleNext = () => {
    if (currentIdx < VIVA_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const toggleMastered = () => {
    setMastered(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const masteredCount = Object.values(mastered).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>ORAL EXAMINATION PREPARATION</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Viva Voce Mode & Interview Practice
        </h1>
        <p className="text-sm text-slate-400">
          Interactive flashcards featuring professor-level laboratory oral examination questions and answers.
        </p>
      </div>

      {/* Progress & Indicator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs font-bold text-cyan-400">
            QUESTION {currentIdx + 1} OF {VIVA_QUESTIONS.length}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">
            Mastered: <span className="font-mono text-emerald-400 font-bold">{masteredCount}</span> / {VIVA_QUESTIONS.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIdx === VIVA_QUESTIONS.length - 1}
            className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 disabled:opacity-30"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Flashcard */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-slate-900/90 p-8 shadow-2xl space-y-6">
        {/* Question Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Viva Prompt #{currentQ.id}
            </span>
            <button
              onClick={toggleMastered}
              className={`flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-bold transition border ${
                mastered[currentQ.id]
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{mastered[currentQ.id] ? 'Marked as Mastered' : 'Mark as Mastered'}</span>
            </button>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
            "{currentQ.question}"
          </h2>
        </div>

        {/* Toggle Answer Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center space-x-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-cyan-300 border border-slate-700 transition"
          >
            {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showAnswer ? 'Hide Expert Answer' : 'Reveal Expert Answer & Key Points'}</span>
          </button>
        </div>

        {/* Revealed Answer Box */}
        {showAnswer && (
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950 p-6 space-y-4 animate-fade-in">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Comprehensive Technical Explanation</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {currentQ.answer}
            </p>

            {/* Key Bullet Points for Oral Exams */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Key Points to State to the Examiner:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentQ.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('quiz')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Quiz
        </button>
        <button
          onClick={() => setCurrentPage('result')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>View Final Lab Result & Report</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
