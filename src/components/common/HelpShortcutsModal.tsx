import React from 'react';
import { X, Keyboard, HelpCircle, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const HelpShortcutsModal: React.FC = () => {
  const { 
    showHelpModal, 
    setShowHelpModal, 
    showShortcutsModal, 
    setShowShortcutsModal 
  } = useLab();

  if (!showHelpModal && !showShortcutsModal) return null;

  const isShortcuts = showShortcutsModal;
  const handleClose = () => {
    setShowHelpModal(false);
    setShowShortcutsModal(false);
  };

  const signals = [
    {
      name: 'J',
      title: 'Synchronous Data Input J',
      badge: 'Active at CLK ↓',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
      description: 'Analogous to the "Set" input. When J=1 and K=0, the triggering clock edge forces output Q to 1.'
    },
    {
      name: 'K',
      title: 'Synchronous Data Input K',
      badge: 'Active at CLK ↓',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
      description: 'Analogous to the "Reset" input. When J=0 and K=1, the triggering clock edge forces output Q to 0.'
    },
    {
      name: 'CLK',
      title: 'Clock Pulse Generator',
      badge: 'Negative Edge (↓)',
      color: 'text-blue-400 border-blue-500/30 bg-blue-950/20',
      description: 'Controls when the synchronous state transition occurs. The 7476 transfers data on the falling (1 → 0) clock edge.'
    },
    {
      name: 'PRE\'',
      title: 'Asynchronous PRESET',
      badge: 'Active LOW (0)',
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
      description: 'Overrides clock and J/K inputs immediately. When asserted LOW (0V), it instantaneously forces Q=1 and Q\'=0. Normal state is HIGH (+5V).'
    },
    {
      name: 'CLR\'',
      title: 'Asynchronous CLEAR',
      badge: 'Active LOW (0)',
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
      description: 'Overrides clock and J/K inputs immediately. When asserted LOW (0V), it instantaneously forces Q=0 and Q\'=1. Normal state is HIGH (+5V).'
    },
    {
      name: 'Q',
      title: 'True Output',
      badge: 'Output (Pin 15/11)',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
      description: 'The primary stored binary bit of the bistable circuit.'
    },
    {
      name: 'Q\'',
      title: 'Inverted Complement',
      badge: 'Output (Pin 14/8)',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
      description: 'The logical complement of Q. Under normal operating conditions, Q\' = NOT(Q).'
    }
  ];

  const shortcuts = [
    { key: 'P', action: 'Clock Pulse', desc: 'Trigger a single manual clock pulse (HIGH → LOW edge)' },
    { key: 'R', action: 'Reset Logic', desc: 'Reset Flip-Flop state to Q=0, Q\'=1' },
    { key: 'C', action: 'Check Circuit', desc: 'Validate all circuit wiring connections' },
    { key: 'T', action: 'Truth Table', desc: 'Navigate directly to Truth Table & Verification page' },
    { key: 'Q', action: 'Quiz Mode', desc: 'Navigate directly to Quiz evaluation' },
    { key: 'ESC', action: 'Close Modal', desc: 'Dismiss active dialogs or cancel wire drawing' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {isShortcuts ? <Keyboard className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isShortcuts ? 'Keyboard Shortcuts & Quick Actions' : 'Digital Signal & Pin Reference Guide'}
              </h2>
              <p className="text-xs text-slate-400">
                {isShortcuts ? 'Operate the virtual laboratory workbench with speed' : 'Detailed operational semantics of all IC 7476 terminals'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isShortcuts ? (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {shortcuts.map((sc, idx) => (
                <div key={idx} className="flex items-start space-x-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <kbd className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 font-mono text-sm font-bold text-cyan-300 shadow-inner">
                    {sc.key}
                  </kbd>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{sc.action}</div>
                    <div className="text-[11px] text-slate-400">{sc.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-blue-900/30 bg-blue-950/20 p-4 mt-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 mb-1">
                <Cpu className="h-4 w-4" />
                <span>Sequential Circuit Notice</span>
              </div>
              <p className="text-xs text-slate-300">
                The JK Flip-Flop is edge-triggered. To observe state transitions, ensure Preset and Clear switches are set to 1 (inactive), set your desired J and K logic levels, and press 
                <kbd className="mx-1 px-1.5 py-0.5 rounded bg-slate-800 font-mono text-cyan-300 border border-slate-700">P</kbd>
                to apply a triggering clock pulse.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {signals.map((sig, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-white">{sig.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sig.color}`}>
                      {sig.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-300">{sig.title}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{sig.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-4 mt-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-1">
                <ShieldAlert className="h-4 w-4" />
                <span>Asynchronous Polarity Rule (Active-Low)</span>
              </div>
              <p className="text-xs text-slate-300">
                In TTL 7476, PRESET and CLEAR are active LOW. For normal clocked operation, keep both PRESET and CLEAR tied to logic HIGH (1 / +5V). Setting both to 0 at the same time is an invalid/forbidden condition.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={handleClose}
            className="rounded-lg bg-slate-800 px-5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};
