import React from 'react';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Wrench, 
  Table, 
  Sparkles,
  Zap,
  BookOpen,
  LineChart,
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CreatorCard } from '../common/CreatorCard';

export const HomePage: React.FC = () => {
  const { 
    setCurrentPage, 
    student, 
    currentQ, 
    currentQBar, 
    jLevel, 
    kLevel, 
    clkLevel, 
    pulseClock,
    loadStandardSetup,
    validation,
    testCases,
    quizScore,
    quizSubmitted,
    diagnosticScore,
    totalScore
  } = useLab();

  const passedTests = testCases.filter(t => t.passed).length;

  const operationModes = [
    {
      mode: 'HOLD',
      condition: 'J = 0, K = 0',
      nextState: 'Q(next) = Q',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-400',
      desc: 'No state change occurs. The flip-flop latches and stores its previous state indefinitely across clock pulses.'
    },
    {
      mode: 'RESET',
      condition: 'J = 0, K = 1',
      nextState: 'Q(next) = 0',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-400',
      desc: 'Clears the memory bit. On the active clock transition, output Q is driven to 0 and Q\' is driven to 1.'
    },
    {
      mode: 'SET',
      condition: 'J = 1, K = 0',
      nextState: 'Q(next) = 1',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
      desc: 'Sets the memory bit. On the active clock transition, output Q is driven to 1 and Q\' is driven to 0.'
    },
    {
      mode: 'TOGGLE',
      condition: 'J = 1, K = 1',
      nextState: 'Q(next) = Q\'',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
      desc: 'Inverts current state. Completely solves the invalid condition of the SR latch via internal complementary steering.'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Experiment Status Dashboard Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Experiment Status Dashboard</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Welcome, {student.name || 'Student Engineer'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Roll No: <span className="font-mono text-slate-300 font-semibold">{student.rollNumber || 'EC-2026-042'}</span> • {student.college}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 flex items-center space-x-1.5">
              <span className="text-slate-400">Circuit:</span>
              <span className={`font-bold ${validation.isValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {validation.percent}%
              </span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 flex items-center space-x-1.5">
              <span className="text-slate-400">Truth Table:</span>
              <span className="font-bold text-cyan-400">{passedTests}/8</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 flex items-center space-x-1.5">
              <span className="text-slate-400">Diagnosis:</span>
              <span className="font-bold text-amber-400">{diagnosticScore}/15</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 flex items-center space-x-1.5">
              <span className="text-slate-400">Total Score:</span>
              <span className="font-bold text-emerald-400">{totalScore}/100</span>
            </div>
            <button
              onClick={() => setCurrentPage('workbench')}
              className="flex items-center space-x-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
            >
              <span>CONTINUE LAB</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/30 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span>DIGITAL ELECTRONICS VIRTUAL LAB</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          IMPLEMENTATION OF <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            JK FLIP-FLOP USING IC 7476
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Build the circuit, control the clock, observe Q and Q̅, analyze timing waveforms, diagnose faults, and verify the complete JK flip-flop truth table through an interactive digital laboratory.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentPage('workbench')}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-7 py-3 text-xs md:text-sm font-extrabold text-slate-950 shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <Play className="h-4 w-4 fill-slate-950" />
            <span>START EXPERIMENT</span>
          </button>
          <button
            onClick={() => setCurrentPage('theory')}
            className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs md:text-sm font-bold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>EXPLORE THEORY</span>
          </button>
          <button
            onClick={() => {
              loadStandardSetup();
              setCurrentPage('workbench');
            }}
            className="flex items-center space-x-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-5 py-3 text-xs md:text-sm font-bold text-cyan-300 hover:bg-cyan-950/60 transition"
          >
            <Wrench className="h-4 w-4" />
            <span>OPEN CIRCUIT LAB</span>
          </button>
        </div>
      </div>

      {/* Interactive Animated Schematic */}
      <div className="relative mx-auto max-w-2xl rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 shadow-2xl overflow-hidden bg-circuit-grid">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Interactive Schematic Simulation [IC 7476 Dual FF]
            </span>
          </div>
          <button
            onClick={pulseClock}
            className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/50 bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition"
          >
            <Zap className="h-3 w-3" />
            <span>Pulse Clock (P)</span>
          </button>
        </div>

        {/* SVG Schematic Canvas */}
        <div className="flex items-center justify-center py-2">
          <svg viewBox="0 0 540 240" className="w-full max-w-xl h-auto drop-shadow-md select-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <linearGradient id="icGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* IC Body */}
            <rect x="180" y="30" width="180" height="180" rx="12" fill="url(#icGrad)" stroke="#0ea5e9" strokeWidth="2.5" />

            <text x="270" y="70" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="bold">
              JK FLIP-FLOP
            </text>
            <text x="270" y="92" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="semibold" fontFamily="monospace">
              IC 7476 DUAL FF
            </text>
            <text x="270" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">
              NEGATIVE-EDGE TRIGGERED
            </text>

            {/* PRE (Top) */}
            <line x1="270" y1="5" x2="270" y2="30" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="270" cy="26" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="270" y="18" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" dx="-22">
              PRE'
            </text>

            {/* CLR (Bottom) */}
            <line x1="270" y1="210" x2="270" y2="235" stroke="#f43f5e" strokeWidth="2.5" />
            <circle cx="270" cy="214" r="3.5" fill="none" stroke="#f43f5e" strokeWidth="2" />
            <text x="270" y="232" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold" dx="-22">
              CLR'
            </text>

            {/* J Input */}
            <line x1="60" y1="65" x2="180" y2="65" stroke={jLevel ? "#22c55e" : "#475569"} strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="45" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold" fontFamily="monospace">J</text>
            <text x="110" y="55" textAnchor="middle" fill={jLevel ? "#4ade80" : "#64748b"} fontSize="10" fontFamily="monospace">[{jLevel}]</text>

            {/* CLK Input with Active-Edge Wedge */}
            <line x1="60" y1="120" x2="180" y2="120" stroke={clkLevel ? "#06b6d4" : "#475569"} strokeWidth="3" />
            <circle cx="174" cy="120" r="3.5" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <polyline points="180,112 192,120 180,128" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            <text x="40" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="monospace">CLK</text>
            <text x="110" y="112" textAnchor="middle" fill={clkLevel ? "#38bdf8" : "#64748b"} fontSize="10" fontFamily="monospace">[{clkLevel}]</text>

            {/* K Input */}
            <line x1="60" y1="175" x2="180" y2="175" stroke={kLevel ? "#22c55e" : "#475569"} strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="45" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold" fontFamily="monospace">K</text>
            <text x="110" y="165" textAnchor="middle" fill={kLevel ? "#4ade80" : "#64748b"} fontSize="10" fontFamily="monospace">[{kLevel}]</text>

            {/* Q Output */}
            <line x1="360" y1="80" x2="450" y2="80" stroke={currentQ ? "#22c55e" : "#475569"} strokeWidth="3.5" markerEnd="url(#arrow)" />
            <text x="380" y="72" fill="#e2e8f0" fontSize="14" fontWeight="bold" fontFamily="monospace">Q</text>
            <circle cx="480" cy="80" r="16" fill={currentQ ? "#22c55e" : "#1e293b"} stroke={currentQ ? "#4ade80" : "#475569"} strokeWidth="3" className={currentQ ? "glow-green" : ""} />
            <text x="480" y="85" textAnchor="middle" fill={currentQ ? "#022c22" : "#94a3b8"} fontSize="13" fontWeight="bold" fontFamily="monospace">{currentQ}</text>

            {/* Q' Output */}
            <line x1="360" y1="160" x2="450" y2="160" stroke={currentQBar ? "#06b6d4" : "#475569"} strokeWidth="3.5" markerEnd="url(#arrow)" />
            <circle cx="366" cy="160" r="3.5" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <text x="380" y="152" fill="#e2e8f0" fontSize="14" fontWeight="bold" fontFamily="monospace">Q'</text>
            <circle cx="480" cy="160" r="16" fill={currentQBar ? "#06b6d4" : "#1e293b"} stroke={currentQBar ? "#38bdf8" : "#475569"} strokeWidth="3" className={currentQBar ? "glow-cyan" : ""} />
            <text x="480" y="165" textAnchor="middle" fill={currentQBar ? "#082f49" : "#94a3b8"} fontSize="13" fontWeight="bold" fontFamily="monospace">{currentQBar}</text>
          </svg>
        </div>

        {/* State readouts */}
        <div className="mt-2 flex flex-wrap items-center justify-between rounded-xl bg-slate-950/70 p-3 text-xs border border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Current Latch:</span>
            <span className="font-mono font-bold text-emerald-400">Q = {currentQ}</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono font-bold text-cyan-400">Q' = {currentQBar}</span>
          </div>
          <div className="text-slate-400">
            Characteristic Eq: <span className="font-mono text-cyan-300 font-semibold">Q(next) = J·Q' + K'·Q</span>
          </div>
        </div>
      </div>

      {/* 4 Operating Modes Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            The Four Synchronous Operating Modes
          </h3>
          <span className="text-xs text-slate-500">Evaluated on Negative Clock Edge (↓)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {operationModes.map((op, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl border p-4 transition-all duration-200 hover:scale-[1.02] ${op.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black tracking-tight">{op.mode}</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-900/60 border border-current">
                  {op.condition}
                </span>
              </div>
              <div className="font-mono text-xs font-semibold text-slate-200 mb-2">
                {op.nextState}
              </div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                {op.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Profile Card */}
      <CreatorCard />
    </div>
  );
};
