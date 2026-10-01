import React, { useState } from 'react';
import { Activity, ArrowRight, Zap, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const OperationPage: React.FC = () => {
  const { setCurrentPage } = useLab();
  const [activeTab, setActiveTab] = useState<'modes' | 'excitation' | 'equation'>('modes');

  const excitationData = [
    { qPresent: 0, qNext: 0, j: '0', k: 'X', desc: 'No change (HOLD) or RESET. J must be 0; K is Don\'t Care.' },
    { qPresent: 0, qNext: 1, j: '1', k: 'X', desc: 'State toggles to 1 or SET. J must be 1; K is Don\'t Care.' },
    { qPresent: 1, qNext: 0, j: 'X', k: '1', desc: 'State toggles to 0 or RESET. K must be 1; J is Don\'t Care.' },
    { qPresent: 1, qNext: 1, j: 'X', k: '0', desc: 'No change (HOLD) or SET. K must be 0; J is Don\'t Care.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Activity className="h-3.5 w-3.5" />
          <span>SYNCHRONOUS & ASYNCHRONOUS DYNAMICS</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          JK Flip-Flop Operation
        </h1>
        <p className="text-sm text-slate-400">
          Comprehensive analysis of the four operational states, excitation logic, and the Boolean characteristic equation.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 max-w-md">
        <button
          onClick={() => setActiveTab('modes')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
            activeTab === 'modes' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Operating Modes
        </button>
        <button
          onClick={() => setActiveTab('excitation')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
            activeTab === 'excitation' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Excitation Table
        </button>
        <button
          onClick={() => setActiveTab('equation')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
            activeTab === 'equation' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Characteristic Eq.
        </button>
      </div>

      {/* Tab 1: Operating Modes Deep Dive */}
      {activeTab === 'modes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/15 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-blue-400">1. HOLD MODE</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  J = 0, K = 0
                </span>
              </div>
              <div className="font-mono text-xs text-slate-200">Next State: Q(next) = Q</div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                Neither the J (Set) nor the K (Reset) steering gates are enabled. When the active falling clock edge arrives, the feedback loop keeps the cross-coupled NAND gates in their current latch state. No data inversion or transition occurs.
              </p>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/15 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-rose-400">2. RESET MODE</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  J = 0, K = 1
                </span>
              </div>
              <div className="font-mono text-xs text-slate-200">Next State: Q(next) = 0</div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                The K input is asserted HIGH while J is LOW. At the triggering clock transition, the lower gate drives output Q to 0 and inverted output Q' to 1. If Q was already 0, it simply remains 0.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-emerald-400">3. SET MODE</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  J = 1, K = 0
                </span>
              </div>
              <div className="font-mono text-xs text-slate-200">Next State: Q(next) = 1</div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                The J input is asserted HIGH while K is LOW. At the triggering clock transition, the upper gate drives output Q to 1 and inverted output Q' to 0. If Q was already 1, it simply remains 1.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/15 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-purple-400">4. TOGGLE MODE</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  J = 1, K = 1
                </span>
              </div>
              <div className="font-mono text-xs text-slate-200">Next State: Q(next) = NOT(Q)</div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                Both control inputs are asserted HIGH. Internal feedback steers the current complementary state back to the input gates: if Q=0, J's gate triggers a SET; if Q=1, K's gate triggers a RESET. This inverts the output deterministically on every active clock edge!
              </p>
            </div>
          </div>

          {/* Asynchronous Overrides Section */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Asynchronous Direct Inputs: PRESET̅ and CLEAR̅</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In TTL IC 7476, PRESET' and CLEAR' are active-low asynchronous inputs. They act directly on the internal bistable latch without waiting for the clock pulse:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-amber-400 font-bold">PRESET' = 0, CLEAR' = 1</span>
                <p className="text-slate-400 font-sans mt-1 text-[11px]">
                  Forces Q = 1, Q' = 0 instantaneously. Clock and J/K inputs are overridden.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-rose-400 font-bold">PRESET' = 1, CLEAR' = 0</span>
                <p className="text-slate-400 font-sans mt-1 text-[11px]">
                  Forces Q = 0, Q' = 1 instantaneously. Clock and J/K inputs are overridden.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Excitation Table */}
      {activeTab === 'excitation' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">JK Flip-Flop Excitation Table</h3>
            <p className="text-xs text-slate-400 mt-1">
              Specifies the required input combination (J, K) to produce a desired transition from present state Q(t) to next state Q(t+1). 'X' denotes a Don't Care condition.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-cyan-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Q(t) Present</th>
                  <th className="py-3 px-4">Q(t+1) Next</th>
                  <th className="py-3 px-4">Required J</th>
                  <th className="py-3 px-4">Required K</th>
                  <th className="py-3 px-4 font-sans">Engineering Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {excitationData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white">{row.qPresent}</td>
                    <td className="py-3 px-4 font-bold text-white">{row.qNext}</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">{row.j}</td>
                    <td className="py-3 px-4 font-bold text-cyan-300">{row.k}</td>
                    <td className="py-3 px-4 font-sans text-slate-400 text-xs">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Characteristic Equation Derivation */}
      {activeTab === 'equation' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Characteristic Equation & Karnaugh Map Derivation</h3>
            <p className="text-xs text-slate-400 mt-1">
              The next state function Q(next) is derived by mapping the minterms of the 8-state truth table into a 3-variable Karnaugh Map.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-5 space-y-3 font-mono text-center">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-sans">
              Characteristic Equation
            </div>
            <div className="text-2xl font-black text-white">
              Q(next) = J·Q' + K'·Q
            </div>
            <div className="text-xs text-slate-400 font-sans max-w-md mx-auto">
              Where Q' represents NOT(Q) and K' represents NOT(K).
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
            <div className="font-bold text-white">Step-by-Step K-Map Grouping:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Minterms where Q(next) = 1: m(2) = 010 (J=1, K=0, Q=0), m(3) = 011 (J=1, K=1, Q=0), m(4) = 100 (J=0, K=0, Q=1), m(6) = 110 (J=1, K=0, Q=1).</li>
              <li>Grouping pair {`{m(2), m(3)}`} yields the product term: <span className="font-mono text-cyan-300 font-bold">J·Q'</span>.</li>
              <li>Grouping pair {`{m(4), m(6)}`} yields the product term: <span className="font-mono text-cyan-300 font-bold">K'·Q</span>.</li>
              <li>Sum of Products (SOP): <span className="font-mono text-emerald-400 font-bold">Q(next) = J·Q' + K'·Q</span>.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('theory')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Theory
        </button>
        <button
          onClick={() => setCurrentPage('ic7476')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Examine IC 7476 Architecture</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
