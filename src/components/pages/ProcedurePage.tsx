import React from 'react';
import { ListOrdered, ArrowRight, CheckCircle2, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const ProcedurePage: React.FC = () => {
  const { setCurrentPage, loadStandardSetup } = useLab();

  const steps = [
    {
      num: 1,
      title: "Place IC 7476 on the Workbench",
      detail: "From the component palette on the Circuit Workbench, place the IC 7476 Dual JK Flip-Flop component in the center of the circuit canvas."
    },
    {
      num: 2,
      title: "Establish DC Power and Ground Rails",
      detail: "Connect the +5V Power Supply to the VCC terminal of IC 7476. Connect the GND terminal of IC 7476 to the common ground rail (0V)."
    },
    {
      num: 3,
      title: "Connect Synchronous Data Switches J and K",
      detail: "Wire digital logic switch J to pin J (Pin 4), and digital logic switch K to pin K (Pin 16) of the IC 7476."
    },
    {
      num: 4,
      title: "Wire Clock Pulse Generator",
      detail: "Connect the digital clock generator output to the CLK input (Pin 1) of the IC 7476."
    },
    {
      num: 5,
      title: "Configure Asynchronous Controls (PRESET & CLEAR)",
      detail: "Connect Preset and Clear switches to pins PRE' and CLR'. In TTL 7476, these are active-low: set both switches to logic 1 (+5V) for normal clocked operation."
    },
    {
      num: 6,
      title: "Connect Output Logic Monitors (LED Q & LED Q')",
      detail: "Wire the true output pin Q (Pin 15) to LED Q (Green) and inverted complementary output pin Q' (Pin 14) to LED Q' (Cyan)."
    },
    {
      num: 7,
      title: "Validate Circuit Connectivity",
      detail: "Click 'Check Circuit' (or press 'C') to verify that all 9 required electrical nodes are correctly wired (100% readiness)."
    },
    {
      num: 8,
      title: "Verify HOLD Mode (J=0, K=0)",
      detail: "Set J=0 and K=0. Press 'Clock Pulse' (P). Observe that output Q remains unchanged across repeated clock edges."
    },
    {
      num: 9,
      title: "Verify RESET Mode (J=0, K=1)",
      detail: "Set J=0 and K=1. Press 'Clock Pulse' (P). Observe that output Q is forced to 0 (LED Q turns OFF, LED Q' turns ON)."
    },
    {
      num: 10,
      title: "Verify SET Mode (J=1, K=0)",
      detail: "Set J=1 and K=0. Press 'Clock Pulse' (P). Observe that output Q is forced to 1 (LED Q turns ON, LED Q' turns OFF)."
    },
    {
      num: 11,
      title: "Verify TOGGLE Mode (J=1, K=1)",
      detail: "Set J=1 and K=1. Apply successive clock pulses. Observe that Q and Q' invert deterministically on every active clock edge."
    },
    {
      num: 12,
      title: "Test Asynchronous Override",
      detail: "Switch PRE' to 0 and observe Q immediately become 1 without clock. Switch CLR' to 0 and observe Q become 0 immediately. Restore both to 1."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <ListOrdered className="h-3.5 w-3.5" />
          <span>EXPERIMENTAL PROTOCOL</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Laboratory Procedure
        </h1>
        <p className="text-sm text-slate-400">
          Step-by-step instructions for wiring, verifying, and analyzing the IC 7476 circuit.
        </p>
      </div>

      {/* Quick Setup Callout */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 to-cyan-950/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Quick Start Option</span>
          <h3 className="text-base font-bold text-white mt-0.5">Pre-Assembled Standard Workbench Setup</h3>
          <p className="text-xs text-slate-400 mt-1">
            You can assemble the circuit manually via drag-and-drop or load the standard pre-wired bench in one click.
          </p>
        </div>
        <button
          onClick={() => {
            loadStandardSetup();
            setCurrentPage('workbench');
          }}
          className="flex items-center space-x-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20 self-start sm:self-auto flex-shrink-0"
        >
          <Play className="h-4 w-4 fill-slate-950" />
          <span>Load Standard Setup & Start</span>
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((st) => (
          <div 
            key={st.num}
            className="flex items-start space-x-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 transition"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-mono text-sm font-bold border border-cyan-500/20">
              {st.num}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                {st.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {st.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Experimental Precautions */}
      <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-5 space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>Laboratory Precautions & Best Practices</span>
        </div>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
          <li><strong>Never leave inputs floating:</strong> In TTL logic, open inputs float to HIGH, which could cause unintended toggling or high power consumption.</li>
          <li><strong>Never assert PRESET and CLEAR simultaneously:</strong> Setting both to 0 produces an invalid condition where both Q and Q' are HIGH.</li>
          <li><strong>Observe clock edge polarity:</strong> State changes will only occur during the falling transition (HIGH → LOW) of the clock pulse.</li>
        </ul>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('components')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Components
        </button>
        <button
          onClick={() => setCurrentPage('workbench')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Open Circuit Workbench</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
