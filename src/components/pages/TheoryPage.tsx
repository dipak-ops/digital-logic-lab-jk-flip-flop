import React, { useState } from 'react';
import { BookOpen, Cpu, ArrowRight, Activity, Zap, Check, AlertCircle } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const TheoryPage: React.FC = () => {
  const { setCurrentPage } = useLab();
  const [selectedRow, setSelectedRow] = useState<number | null>(3); // default highlight toggle
  const [edgeAnimationRunning, setEdgeAnimationRunning] = useState<boolean>(true);

  const tableData = [
    { j: 0, k: 0, op: 'HOLD', nextState: 'Q(next) = Q', desc: 'No state transition occurs. Output remains equal to present state.' },
    { j: 0, k: 1, op: 'RESET', nextState: 'Q(next) = 0', desc: 'Resets the flip-flop to logic 0 irrespective of prior state.' },
    { j: 1, k: 0, op: 'SET', nextState: 'Q(next) = 1', desc: 'Sets the flip-flop to logic 1 irrespective of prior state.' },
    { j: 1, k: 1, op: 'TOGGLE', nextState: 'Q(next) = Q\'', desc: 'Inverts current state. Toggles from 0 → 1 or 1 → 0 smoothly.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>FOUNDATIONAL CONCEPTS</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Theory: The JK Flip-Flop
        </h1>
        <p className="text-sm text-slate-400">
          Sequential logic storage elements, clock synchronization, and race-around resolution.
        </p>
      </div>

      {/* Fundamental Definition Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-cyan-400" />
          <span>1. Sequential Circuits and Bistable Multivibrators</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          In digital electronics, a <strong>flip-flop</strong> is a <strong>bistable sequential circuit</strong> capable of storing one bit of binary information (0 or 1). Unlike combinational circuits where outputs depend purely on present inputs, sequential circuit outputs depend on both <em>present inputs</em> and the <em>history of past states</em> stored in memory.
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          The two stable operating states of the flip-flop are termed <strong>SET</strong> (output Q = 1) and <strong>RESET</strong> (output Q = 0). The complementary output is termed Q' (or Q&#773;), where Q' = NOT(Q) under normal operation.
        </p>
      </div>

      {/* Evolution: Overcoming SR Latch Limitations */}
      <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Zap className="h-4 w-4" />
          <span>2. Why the JK Flip-Flop Improves Upon the SR Flip-Flop</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          In a classic Set-Reset (SR) flip-flop, applying <span className="font-mono text-rose-400 font-bold">S = 1, R = 1</span> attempts to set and reset the latch at the same instant. This results in an <strong>invalid/undefined state</strong> where both Q and Q' are forced to 0 (or 1 depending on gate implementation). When inputs simultaneously drop to 0, internal gate delays cause an unpredictable race condition.
        </p>
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="text-xs font-semibold text-slate-200 mb-1">
            The JK Solution: Cross-Coupled Feedback Steering
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The JK Flip-Flop completely eliminates this prohibited state by feeding back output Q' to the input AND/NAND gate of J, and output Q to the input AND/NAND gate of K. When both inputs are asserted (<span className="font-mono text-emerald-400 font-bold">J = 1, K = 1</span>), the circuit performs a deterministic <strong>TOGGLE</strong> operation (Q<sub>next</sub> = Q').
          </p>
        </div>
      </div>

      {/* Interactive JK Operation Table & Characteristic Equation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>3. Characteristic Truth Table</span>
          </h3>
          <span className="text-xs text-slate-400">Click any row to inspect operating logic</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] font-mono uppercase tracking-wider text-cyan-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">J</th>
                <th className="py-3 px-4">K</th>
                <th className="py-3 px-4">Operation Mode</th>
                <th className="py-3 px-4">Next State Q(next)</th>
                <th className="py-3 px-4 hidden sm:table-cell">Functional Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {tableData.map((row, idx) => {
                const isSelected = selectedRow === idx;
                return (
                  <tr 
                    key={idx}
                    onClick={() => setSelectedRow(idx)}
                    className={`cursor-pointer transition ${
                      isSelected 
                        ? 'bg-cyan-950/40 text-cyan-200 border-l-4 border-l-cyan-400' 
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-slate-100">{row.j}</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{row.k}</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                        row.op === 'HOLD' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        row.op === 'RESET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        row.op === 'SET' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {row.op}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-semibold">{row.nextState}</td>
                    <td className="py-3 px-4 font-sans text-xs text-slate-400 hidden sm:table-cell">{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Characteristic Equation Box */}
        <div className="rounded-xl border border-cyan-500/30 bg-slate-950/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Characteristic Boolean Equation
            </span>
            <div className="font-mono text-lg font-bold text-white mt-0.5">
              Q(next) = J·Q' + K'·Q
            </div>
          </div>
          <div className="text-xs text-slate-400 max-w-sm">
            Derived via Karnaugh Map minimization of all $(J, K, Q)$ minterms. Ensures optimal Boolean representation in register synthesis.
          </div>
        </div>
      </div>

      {/* Clock Edge Triggering & Animated Waveform */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>4. Clock Edge Triggering Mechanism</span>
          </h3>
          <button
            onClick={() => setEdgeAnimationRunning(!edgeAnimationRunning)}
            className="rounded px-2.5 py-1 text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition"
          >
            {edgeAnimationRunning ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The 7476 employs <strong>edge-triggering</strong> (specifically negative / falling-edge triggering in modern variants). Rather than responding to the persistent voltage level of the clock signal, state changes occur <em>strictly</em> during the transient transition from logic HIGH to logic LOW.
        </p>

        {/* Animated Waveform Diagram */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono font-bold text-cyan-400">SIGNAL: CLOCK (CLK)</span>
            <span className="text-slate-400">Sampling Instant: Active Falling Edge (↓)</span>
          </div>

          <div className="flex justify-center py-2">
            <svg viewBox="0 0 600 160" className="w-full max-w-lg h-auto select-none">
              {/* Grid lines */}
              <line x1="50" y1="40" x2="550" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="50" y1="120" x2="550" y2="120" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Text labels */}
              <text x="35" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">HIGH (5V)</text>
              <text x="35" y="124" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">LOW (0V)</text>

              {/* Digital Clock Waveform */}
              <path 
                d="M 60 120 L 140 120 L 140 40 L 220 40 L 220 120 L 300 120 L 300 40 L 380 40 L 380 120 L 460 120 L 460 40 L 540 40" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Negative Edge Highlight Arrows at x=220 and x=380 */}
              <g className={edgeAnimationRunning ? "animate-pulse" : ""}>
                {/* Arrow 1 at x=220 */}
                <line x1="220" y1="20" x2="220" y2="105" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
                <polygon points="220,115 214,98 226,98" fill="#f43f5e" />
                <circle cx="220" cy="80" r="10" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="220" y="15" fill="#f43f5e" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  ACTIVE FALLING EDGE (↓)
                </text>

                {/* Arrow 2 at x=380 */}
                <line x1="380" y1="20" x2="380" y2="105" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
                <polygon points="380,115 374,98 386,98" fill="#f43f5e" />
              </g>

              {/* Annotation labels */}
              <text x="180" y="32" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">PULSE HIGH</text>
              <text x="260" y="135" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">LOW PERIOD</text>
            </svg>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-2">
            <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span>
              During the active falling edge (HIGH → LOW), the inputs J and K are instantaneously sampled, and the outputs Q and Q' update within one propagation delay (t<sub>pd</sub> ≈ 15 ns).
            </span>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('aim')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Aim
        </button>
        <button
          onClick={() => setCurrentPage('ic7476')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Study IC 7476 Pinout</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
