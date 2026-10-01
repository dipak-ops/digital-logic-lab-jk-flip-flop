import React from 'react';
import { 
  Cpu, 
  Clock, 
  User, 
  HelpCircle, 
  Keyboard, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  Minimize2,
  GraduationCap
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const Header: React.FC = () => {
  const {
    student,
    setShowStudentModal,
    setShowHelpModal,
    setShowShortcutsModal,
    setShowResetConfirmModal,
    theme,
    toggleTheme,
    formattedTime,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    validation,
    activeFault,
    learningMode,
    setLearningMode,
    isFullscreenLab,
    toggleFullscreenLab,
    totalScore
  } = useLab();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/40 bg-slate-950/90 backdrop-blur-md px-3 sm:px-5 py-2.5 transition-colors duration-200 no-print">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Lab Branding */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <Cpu className="h-5 w-5 text-white" />
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Virtual Lab</span>
              <span className="text-[10px] text-slate-500">•</span>
              <span className="text-[10px] font-medium text-slate-400">Digital Electronics</span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white">
              DIGITAL ELECTRONICS VIRTUAL LAB
              <span className="ml-2 font-mono text-xs font-semibold text-cyan-300 hidden md:inline">
                [EXP: JK FLIP-FLOP / 7476]
              </span>
            </h1>
          </div>
        </div>

        {/* Experiment Status & Metrics */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Circuit Health Tag */}
          <div className={`hidden lg:flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${
            validation.isValid 
              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
              : 'border-amber-500/30 bg-amber-950/40 text-amber-300'
          }`}>
            {validation.isValid ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Circuit: 100% Ready</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span>Circuit: {validation.percent}% Wired</span>
              </>
            )}
          </div>

          {/* Fault Indicator Tag */}
          {activeFault !== 'none' && (
            <div className="flex items-center space-x-1 rounded-full border border-rose-500/40 bg-rose-950/50 px-2 py-0.5 text-xs font-semibold text-rose-300 animate-pulse">
              <AlertTriangle className="h-3 w-3 text-rose-400" />
              <span>Fault Active</span>
            </div>
          )}

          {/* Learning Mode Toggle */}
          <button
            onClick={() => setLearningMode(!learningMode)}
            title="Toggle Educational Learning Explanation Mode"
            className={`hidden sm:flex items-center space-x-1 rounded-lg px-2.5 py-1 text-xs font-bold transition border ${
              learningMode 
                ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300' 
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Learning Mode: {learningMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Lab Session Timer */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono font-bold tracking-wider text-cyan-300">{formattedTime}</span>
            <div className="flex items-center space-x-0.5 pl-1 border-l border-slate-700">
              <button
                onClick={isTimerRunning ? pauseTimer : startTimer}
                title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
                className="rounded p-0.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                {isTimerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 text-emerald-400" />}
              </button>
              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="rounded p-0.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Aggregate Evaluation Score Badge */}
          <div className="hidden xl:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs font-mono font-bold text-slate-300">
            <span className="text-slate-500">Score:</span>
            <span className="text-emerald-400">{totalScore}</span>
            <span className="text-slate-600">/100</span>
          </div>

          {/* Student Profile Quick Badge */}
          <button
            onClick={() => setShowStudentModal(true)}
            className="flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/90 transition group"
            title="Edit Student Information"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
              <User className="h-3 w-3" />
            </div>
            <div className="hidden md:block text-left">
              <div className="max-w-[110px] truncate font-medium text-slate-200 group-hover:text-cyan-300">
                {student.name || 'Student Profile'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {student.rollNumber || 'Not Set'}
              </div>
            </div>
          </button>

          {/* Reset Experiment Dialog Trigger */}
          <button
            onClick={() => setShowResetConfirmModal(true)}
            title="Reset Complete Experiment State"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-rose-500/50 hover:text-rose-400 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Fullscreen Lab Toggle */}
          <button
            onClick={toggleFullscreenLab}
            title={isFullscreenLab ? "Exit Fullscreen" : "Fullscreen Workbench"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-cyan-300 transition"
          >
            {isFullscreenLab ? <Minimize2 className="h-3.5 w-3.5 text-cyan-300" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>

          {/* Shortcuts Modal Trigger */}
          <button
            onClick={() => setShowShortcutsModal(true)}
            title="Keyboard Shortcuts"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-cyan-300 transition"
          >
            <Keyboard className="h-3.5 w-3.5" />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-amber-300 transition"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5 text-cyan-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
