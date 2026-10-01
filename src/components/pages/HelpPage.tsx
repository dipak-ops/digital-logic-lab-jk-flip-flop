import React from 'react';
import { HelpCircle, Keyboard, Cpu, Layers, Radio, Activity, Save, FileText, ArrowRight } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CreatorCard } from '../common/CreatorCard';

export const HelpPage: React.FC = () => {
  const { setCurrentPage } = useLab();

  const helpTopics = [
    {
      title: "1. How to Connect & Remove Virtual Wires",
      icon: Layers,
      content: "Click on any component's connection terminal pin (source), then click on the target component pin (destination). An animated cubic-bezier glowing wire will be created. To delete a wire, click directly on the wire and click 'Delete'."
    },
    {
      title: "2. How to Control the Clock Generator",
      icon: Activity,
      content: "Press the 'PULSE CLOCK' button (or key 'P') to generate a single falling clock transition. You can also start the automated clock oscillator with 0.5Hz, 1Hz, 2Hz, or 5Hz calibrated speeds."
    },
    {
      title: "3. How to Use the High-Impedance Logic Probe",
      icon: Radio,
      content: "Click 'LOGIC PROBE' on the toolbar to activate probe inspection mode. Hover or click on any terminal pin or wire to view its instantaneous TTL voltage (0V to 5V), logic state (HIGH/LOW/FLOATING), and status."
    },
    {
      title: "4. How to Run Automated 8-State Verification",
      icon: Cpu,
      content: "Navigate to the TRUTH TABLE page and click 'RUN ALL 8 TESTS'. The engine preconditions the flip-flop, applies all 8 permutations of (J, K, Q), pulses the clock, and compares actual vs expected outputs."
    },
    {
      title: "5. How to Read the Multi-Channel Timing Diagram",
      icon: Activity,
      content: "Navigate to TIMING DIAGRAM to inspect live oscilloscope traces for CLK, J, K, PRE', CLR', Q, and Q'. Red vertical markers denote falling clock edges where synchronous state changes occur."
    },
    {
      title: "6. How to Diagnose Hardware Faults",
      icon: HelpCircle,
      content: "Go to DIAGNOSTICS to inject a simulated laboratory problem (e.g. disconnected J/K, floating clock, stuck PRESET). Use the Logic Probe to diagnose the fault, submit your finding, and earn up to 15 diagnostic marks."
    },
    {
      title: "7. How to Save & Restore Your Circuit Layout",
      icon: Save,
      content: "Click 'Save Circuit' to store your customized wiring layout, switch states, and component positions in browser localStorage. Click 'Load Circuit' anytime to restore your progress without data loss."
    },
    {
      title: "8. How to Generate Your Lab Report & Certificate",
      icon: FileText,
      content: "Complete the practical tasks and navigate to LAB REPORT or CERTIFICATE. Click 'PRINT' to open the browser print dialog formatted for clean A4 university submission."
    }
  ];

  const shortcuts = [
    { key: 'P', desc: 'Trigger Single Clock Pulse (HIGH → LOW edge)' },
    { key: 'R', desc: 'Reset Flip-Flop Logic State to Q=0, Q\'=1' },
    { key: 'Ctrl + Z', desc: 'Undo Circuit Canvas Modification' },
    { key: 'Ctrl + Y', desc: 'Redo Circuit Canvas Modification' },
    { key: 'Ctrl + S', desc: 'Save Circuit Configuration to localStorage' },
    { key: 'Ctrl + L', desc: 'Load Previously Saved Circuit Configuration' },
    { key: 'C', desc: 'Audit Circuit Wiring Connectivity' },
    { key: 'ESC', desc: 'Dismiss Active Dialog Modals' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>LABORATORY OPERATOR'S MANUAL</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Help & Technical Guide
        </h1>
        <p className="text-sm text-slate-400">
          Step-by-step instructions, hotkey shortcuts, and creator profile information.
        </p>
      </div>

      {/* Creator Profile Card */}
      <CreatorCard />

      {/* Keyboard Shortcuts Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Keyboard className="h-5 w-5 text-cyan-400" />
          <span>Workbench Keyboard Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shortcuts.map((sc, idx) => (
            <div key={idx} className="flex items-center space-x-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
              <kbd className="px-2.5 py-1 rounded-lg border border-cyan-500/40 bg-cyan-950/40 font-mono text-xs font-bold text-cyan-300">
                {sc.key}
              </kbd>
              <span className="text-xs text-slate-300">{sc.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Laboratory Operation Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                  <Icon className="h-4 w-4" />
                  <span>{topic.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('workbench')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Return to Circuit Workbench
        </button>
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Laboratory Home</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
