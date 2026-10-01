import React from 'react';
import { Target, CheckCircle2, BookOpen, Layers, Award, ArrowRight } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const AimPage: React.FC = () => {
  const { setCurrentPage } = useLab();

  const objectives = [
    {
      title: "Understand JK Flip-Flop Architecture",
      desc: "Analyze the fundamental structure of bistable multivibrators, internal NAND-gate latching, and feedback steering loops that prevent race conditions."
    },
    {
      title: "Master Synchronous State Changes",
      desc: "Differentiate between level-sensitive combinational circuits and edge-sensitive sequential circuits that transition synchronously with clock pulses."
    },
    {
      title: "Verify SET, RESET, HOLD & TOGGLE Operations",
      desc: "Test how digital control signals J and K dictate deterministic state transitions across all four fundamental permutations."
    },
    {
      title: "Analyze Clock Edge Triggering",
      desc: "Observe negative-edge (HIGH-to-LOW) triggering transitions, understanding how the active edge synchronizes digital registers and counters."
    },
    {
      title: "Study IC 7476 Pinout & Characteristics",
      desc: "Familiarize with the Dual JK Flip-Flop 7476 TTL integrated circuit, distinguishing physical package pins from conceptual simulation blocks."
    },
    {
      title: "Observe Complementary Outputs Q and Q'",
      desc: "Monitor logical state transitions on digital LED monitors, confirming that Q and Q' remain inverted complements during valid operation."
    },
    {
      title: "Verify the Truth Table & Characteristic Equation",
      desc: "Empirically validate Q(next) = J·Q' + K'·Q across all 8 combinations of present state Q and inputs J, K."
    },
    {
      title: "Evaluate Asynchronous PRESET and CLEAR Inputs",
      desc: "Demonstrate priority override of active-low PRESET and CLEAR inputs, setting and clearing the flip-flop independently of clock pulses."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Target className="h-3.5 w-3.5" />
          <span>EXPERIMENT 04: AIM & EDUCATIONAL GOALS</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Aim and Learning Objectives
        </h1>
        <p className="text-sm text-slate-400">
          Digital Electronics Laboratory syllabus for undergraduate engineering students.
        </p>
      </div>

      {/* Main Aim Card */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Primary Aim</span>
            <h2 className="text-xl font-bold text-white mt-1 leading-snug">
              "To implement and verify the operation of a JK Flip-Flop using IC 7476."
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              In this experiment, students configure the TTL 7476 Dual JK Flip-Flop on an interactive virtual breadboard, establish power and control connections, generate synchronous clock pulses, and examine state transitions under varying J, K, PRESET, and CLEAR conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Specific Learning Objectives Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          <span>Detailed Learning Objectives</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, idx) => (
            <div 
              key={idx} 
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-cyan-500/30 transition group"
            >
              <div className="flex items-center space-x-2.5 mb-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition">
                  {obj.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-8">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites & Required Competencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
            <BookOpen className="h-4 w-4" />
            <span>Prerequisites</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Basic Boolean algebra and logic gate truth tables (AND, OR, NOT, NAND, NOR).</li>
            <li>Fundamental concept of cross-coupled SR flip-flops and latching mechanisms.</li>
            <li>Understanding digital voltage levels: TTL LOW (0V to 0.8V) and HIGH (2.0V to 5.0V).</li>
            <li>Concept of pulse trains, frequency (Hz), and period (T).</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
            <Award className="h-4 w-4" />
            <span>Practical Competencies Gained</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Ability to interpret manufacturer IC datasheets and pin assignment diagrams.</li>
            <li>Circuit assembly on digital prototyping boards with pull-up switches and LED loads.</li>
            <li>Systematic truth-table validation and multi-channel timing waveform analysis.</li>
            <li>Debugging hardware faults like floating inputs or stuck-at line errors.</li>
          </ul>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('home')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Home
        </button>
        <button
          onClick={() => setCurrentPage('theory')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Continue to Theory</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
