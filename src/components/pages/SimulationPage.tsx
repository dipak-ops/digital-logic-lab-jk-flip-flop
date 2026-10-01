import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  LineChart,
  ShieldAlert,
  Play,
  Square
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const SimulationPage: React.FC = () => {
  const {
    currentQ,
    currentQBar,
    jLevel,
    kLevel,
    clkLevel,
    presetLevel,
    clearLevel,
    activeOperation,
    lastEvent,
    edgePulseActive,
    pulseClock,
    resetLogicState,
    startAutoClock,
    stopAutoClock,
    isClockRunning,
    clockFrequency,
    setClockFreq,
    setSwitchValue,
    components,
    setCurrentPage,
    asyncInvalidWarning
  } = useLab();

  // Find components to directly toggle logic switches
  const jComp = components.find(c => c.type === 'switchJ');
  const kComp = components.find(c => c.type === 'switchK');
  const preComp = components.find(c => c.type === 'switchPreset');
  const clrComp = components.find(c => c.type === 'switchClear');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Activity className="h-3.5 w-3.5" />
          <span>ADVANCED STATE SIMULATOR</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Live Flip-Flop Sequential Simulation
        </h1>
        <p className="text-sm text-slate-400">
          Detailed dynamic observation of clock triggering, setup conditions, and flip-flop state transitions.
        </p>
      </div>

      {/* Invalid Warning if both PRE and CLR low */}
      {asyncInvalidWarning && (
        <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/80 p-4 shadow-xl flex items-start space-x-3 animate-pulse">
          <ShieldAlert className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white text-sm">PROHIBITED ASYNCHRONOUS COMBINATION!</div>
            <p className="text-xs text-rose-200">
              PRESET and CLEAR are both asserted LOW (0). This forces both outputs Q and Q' to HIGH simultaneously, which is prohibited in normal sequential operation.
            </p>
          </div>
        </div>
      )}

      {/* 1. Large Live State Visualization with Glowing LEDs */}
      <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl relative overflow-hidden bg-circuit-dots">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Internal Flip-Flop Registers</span>
            <h2 className="text-xl font-bold text-white">Current Bistable Latch State</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Mode:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-black font-mono tracking-wider ${
              activeOperation === 'HOLD' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
              activeOperation === 'RESET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
              activeOperation === 'SET' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              'bg-purple-500/20 text-purple-300 border border-purple-500/40'
            }`}>
              {activeOperation}
            </span>
          </div>
        </div>

        {/* Big Dual LED Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
          {/* Q LED Card */}
          <div className={`rounded-2xl border p-6 flex flex-col items-center justify-center space-y-3 transition-all duration-300 ${
            currentQ 
              ? 'border-emerald-500/60 bg-emerald-950/30 shadow-2xl shadow-emerald-900/30' 
              : 'border-slate-800 bg-slate-950/60'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              TRUE OUTPUT (Q)
            </span>
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all duration-300 ${
              currentQ 
                ? 'bg-emerald-500 border-emerald-300 text-slate-950 glow-green scale-105' 
                : 'bg-slate-900 border-slate-700 text-slate-600'
            }`}>
              <span className="font-mono text-5xl font-black">{currentQ}</span>
              {currentQ === 1 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500"></span>
                </span>
              )}
            </div>
            <div className="font-mono text-xs font-bold text-slate-300">
              {currentQ ? 'LOGIC LEVEL: HIGH (+5V)' : 'LOGIC LEVEL: LOW (0V)'}
            </div>
          </div>

          {/* Q' Complement LED Card */}
          <div className={`rounded-2xl border p-6 flex flex-col items-center justify-center space-y-3 transition-all duration-300 ${
            currentQBar 
              ? 'border-cyan-500/60 bg-cyan-950/30 shadow-2xl shadow-cyan-900/30' 
              : 'border-slate-800 bg-slate-950/60'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              INVERTED OUTPUT (Q')
            </span>
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all duration-300 ${
              currentQBar 
                ? 'bg-cyan-500 border-cyan-300 text-slate-950 glow-cyan scale-105' 
                : 'bg-slate-900 border-slate-700 text-slate-600'
            }`}>
              <span className="font-mono text-5xl font-black">{currentQBar}</span>
              {currentQBar === 1 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-cyan-500"></span>
                </span>
              )}
            </div>
            <div className="font-mono text-xs font-bold text-slate-300">
              {currentQBar ? 'LOGIC LEVEL: HIGH (+5V)' : 'LOGIC LEVEL: LOW (0V)'}
            </div>
          </div>
        </div>

        {/* Narrative State Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 text-xs font-mono">
          <div className="text-slate-300">
            <span className="text-slate-500">Event:</span> {lastEvent}
          </div>
          <div className="text-cyan-300">
            Equation: Q(next) = J·Q' + K'·Q
          </div>
        </div>
      </div>

      {/* 2. Clock Edge Visualization */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Timing Trigger</span>
            <h3 className="text-base font-bold text-white">Active Negative Clock Edge (↓) Detection</h3>
          </div>
          <button
            onClick={pulseClock}
            className="flex items-center space-x-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition shadow-md shadow-cyan-500/20 active:scale-95 self-start sm:self-auto"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>TRIGGER SINGLE PULSE (P)</span>
          </button>
        </div>

        {/* Edge Animation Banner */}
        <div className={`rounded-xl border p-4 transition-all duration-300 ${
          edgePulseActive 
            ? 'border-cyan-400 bg-cyan-950 text-cyan-200 shadow-xl shadow-cyan-500/20 animate-edge'
            : 'border-slate-800 bg-slate-950 text-slate-400'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
              edgePulseActive ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold' : 'border-slate-800 bg-slate-900 text-slate-600'
            }`}>
              ↓
            </div>
            <div className="text-xs font-mono">
              <div className="font-bold text-slate-200">
                {edgePulseActive ? '⚡ ACTIVE CLOCK EDGE DETECTED!' : 'Awaiting Next Clock Transition'}
              </div>
              <div className="text-[11px] text-slate-400">
                Step 1: Clock drops 1 → 0 • Step 2: Inputs J & K sampled • Step 3: Q and Q' update
              </div>
            </div>
          </div>
        </div>

        {/* Large SVG Edge Schematic */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex justify-center">
          <svg viewBox="0 0 560 120" className="w-full max-w-lg h-auto select-none">
            {/* Horizontal references */}
            <line x1="40" y1="30" x2="520" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="40" y1="90" x2="520" y2="90" stroke="#1e293b" strokeDasharray="3 3" />

            <text x="30" y="34" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">HIGH</text>
            <text x="30" y="94" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">LOW</text>

            {/* Square pulse */}
            <path
              d="M 50 90 L 140 90 L 140 30 L 260 30 L 260 90 L 380 90 L 380 30 L 500 30"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Falling Edge Indicator at x=260 */}
            <g className={edgePulseActive ? "animate-bounce" : ""}>
              <circle cx="260" cy="60" r="14" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="2" />
              <line x1="260" y1="20" x2="260" y2="78" stroke="#f43f5e" strokeWidth="2.5" />
              <polygon points="260,86 254,72 266,72" fill="#f43f5e" />
              <text x="260" y="15" fill="#f43f5e" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                FALLING EDGE (SAMPLING POINT)
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Comprehensive Simulator Test Controls */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Manual Input & Stimulus Panel</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Switch J Control */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400">J INPUT</span>
              <span className="font-mono text-slate-300">Level: {jLevel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => jComp && setSwitchValue(jComp.id, 0)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  jLevel === 0 ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                0 (LOW)
              </button>
              <button
                onClick={() => jComp && setSwitchValue(jComp.id, 1)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  jLevel === 1 ? 'bg-emerald-500 text-slate-950 glow-green' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                1 (HIGH)
              </button>
            </div>
          </div>

          {/* Switch K Control */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400">K INPUT</span>
              <span className="font-mono text-slate-300">Level: {kLevel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => kComp && setSwitchValue(kComp.id, 0)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  kLevel === 0 ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                0 (LOW)
              </button>
              <button
                onClick={() => kComp && setSwitchValue(kComp.id, 1)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  kLevel === 1 ? 'bg-emerald-500 text-slate-950 glow-green' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                1 (HIGH)
              </button>
            </div>
          </div>

          {/* Asynchronous PRESET Switch */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400">PRESET (PRE')</span>
              <span className="font-mono text-slate-300">{presetLevel ? '1 (Idle)' : '0 (Active)'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => preComp && setSwitchValue(preComp.id, 0)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  presetLevel === 0 ? 'bg-amber-500 text-slate-950 glow-orange' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                0 (ASSERT)
              </button>
              <button
                onClick={() => preComp && setSwitchValue(preComp.id, 1)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  presetLevel === 1 ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                1 (NORMAL)
              </button>
            </div>
          </div>

          {/* Asynchronous CLEAR Switch */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-rose-400">CLEAR (CLR')</span>
              <span className="font-mono text-slate-300">{clearLevel ? '1 (Idle)' : '0 (Active)'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => clrComp && setSwitchValue(clrComp.id, 0)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  clearLevel === 0 ? 'bg-rose-500 text-white glow-red' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                0 (ASSERT)
              </button>
              <button
                onClick={() => clrComp && setSwitchValue(clrComp.id, 1)}
                className={`rounded-lg py-1.5 text-xs font-mono font-bold transition ${
                  clearLevel === 1 ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'
                }`}
              >
                1 (NORMAL)
              </button>
            </div>
          </div>
        </div>

        {/* Auto Clock Oscillator Controls */}
        <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Automated Clock Oscillator</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Continuously toggle the clock generator at calibrated laboratory frequencies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex space-x-1 bg-slate-950 rounded-lg p-1 border border-slate-800">
              {[0.5, 1, 2, 5].map(freq => (
                <button
                  key={freq}
                  onClick={() => setClockFreq(freq)}
                  className={`rounded px-2 py-1 text-xs font-mono font-bold ${
                    clockFrequency === freq ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {freq}Hz
                </button>
              ))}
            </div>

            <button
              onClick={isClockRunning ? stopAutoClock : () => startAutoClock()}
              className={`flex items-center space-x-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
                isClockRunning 
                  ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              }`}
            >
              {isClockRunning ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isClockRunning ? 'STOP CLOCK' : 'START CLOCK'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('workbench')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Workbench
        </button>
        <button
          onClick={() => setCurrentPage('truthtable')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Verify Truth Table (8/8)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
