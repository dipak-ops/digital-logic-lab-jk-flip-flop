import React, { useState } from 'react';
import { 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Wrench, 
  ArrowRight, 
  Zap, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { FaultType } from '../../types/lab';

export const DiagnosticsPage: React.FC = () => {
  const {
    activeFault,
    injectFault,
    clearFault,
    faultDiagnosed,
    selectedSuspectedFault,
    setSelectedSuspectedFault,
    diagnoseFaultSubmission,
    diagnosticScore,
    showFaultHint,
    setShowFaultHint,
    probeActive,
    setProbeActive,
    probedSignal,
    probeNode,
    clearProbe,
    components,
    setCurrentPage
  } = useLab();

  const [diagnosisFeedback, setDiagnosisFeedback] = useState<{
    submitted: boolean;
    correct: boolean;
    message: string;
    hint: string;
  } | null>(null);

  const faultsList: { id: FaultType; label: string; desc: string }[] = [
    { id: 'j_disconnected', label: '1. J Input Disconnected', desc: 'J switch disconnected; TTL internal gate floats HIGH.' },
    { id: 'k_disconnected', label: '2. K Input Disconnected', desc: 'K switch disconnected; TTL internal gate floats HIGH.' },
    { id: 'clk_disconnected', label: '3. Floating Clock Line', desc: 'Clock pulse line is severed; no transition edges reach IC.' },
    { id: 'q_led_disconnected', label: '4. Q Output Disconnected', desc: 'True output pin Q is detached from the LED indicator.' },
    { id: 'qbar_led_disconnected', label: '5. Q\' Output Disconnected', desc: 'Inverted output pin Q\' is detached from the LED indicator.' },
    { id: 'preset_stuck_low', label: '6. PRESET\' Stuck LOW (0V)', desc: 'Asynchronous Preset tied to ground, forcing Q=1 continuously.' },
    { id: 'clear_stuck_low', label: '7. CLEAR\' Stuck LOW (0V)', desc: 'Asynchronous Clear tied to ground, forcing Q=0 continuously.' },
    { id: 'vcc_disconnected', label: '8. VCC (+5V) Power Disconnected', desc: 'IC 7476 has no DC power; circuit is completely dead.' },
    { id: 'gnd_disconnected', label: '9. Ground (GND) Disconnected', desc: 'Common reference ground is missing, causing floating potentials.' }
  ];

  const handleDiagnose = () => {
    if (selectedSuspectedFault === 'none') return;
    const res = diagnoseFaultSubmission(selectedSuspectedFault);
    setDiagnosisFeedback({
      submitted: true,
      correct: res.correct,
      message: res.message,
      hint: res.hint
    });
  };

  const handleTestPin = (compType: string, pinId: string) => {
    const comp = components.find(c => c.type === compType);
    if (comp) {
      probeNode(comp.id, pinId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Wrench className="h-3.5 w-3.5" />
          <span>INSTRUMENTATION & FAULT INJECTION LAB</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Diagnostics & Troubleshooting
        </h1>
        <p className="text-sm text-slate-400">
          Inspect live circuit nodes with the digital logic probe, troubleshoot simulated hardware faults, and earn diagnostic evaluation marks.
        </p>
      </div>

      {/* Logic Probe Interactive Instrument */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-slate-900/90 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-cyan-400 animate-pulse" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              High-Impedance Digital Logic Probe
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setProbeActive(!probeActive)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition border ${
                probeActive 
                  ? 'border-cyan-400 bg-cyan-950 text-cyan-200 ring-2 ring-cyan-400' 
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {probeActive ? 'Probe Mode ACTIVE' : 'Enable Probe Mode'}
            </button>
            {probedSignal && (
              <button
                onClick={clearProbe}
                className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Clear Reading
              </button>
            )}
          </div>
        </div>

        {/* Quick Node Probe Buttons */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Quick-Probe IC 7476 Terminals:
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { label: 'Pin VCC (+5V)', type: 'ic7476', pin: 'pin_vcc' },
              { label: 'Pin GND (0V)', type: 'ic7476', pin: 'pin_gnd' },
              { label: 'Pin J (Input)', type: 'ic7476', pin: 'pin_j' },
              { label: 'Pin K (Input)', type: 'ic7476', pin: 'pin_k' },
              { label: 'Pin CLK (Clock)', type: 'ic7476', pin: 'pin_clk' },
              { label: 'Pin PRE\' (Preset)', type: 'ic7476', pin: 'pin_pre' },
              { label: 'Pin CLR\' (Clear)', type: 'ic7476', pin: 'pin_clr' },
              { label: 'Pin Q (Output)', type: 'ic7476', pin: 'pin_q' },
              { label: 'Pin Q\' (Inverted)', type: 'ic7476', pin: 'pin_qbar' },
            ].map((btn) => (
              <button
                key={btn.pin}
                onClick={() => handleTestPin(btn.type, btn.pin)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Probe Readout Panel */}
        {probedSignal ? (
          <div className="rounded-2xl border border-cyan-500/50 bg-slate-950 p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase font-sans">
                Terminal Sensor Reading
              </span>
              <span className="text-xs font-bold text-slate-400">
                Source: {probedSignal.source}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Pin Node:</span>
                <div className="text-base font-bold text-white">{probedSignal.pin}</div>
              </div>
              <div>
                <span className="text-slate-500">Logic State:</span>
                <div className={`text-base font-bold ${probedSignal.logicLevel ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {probedSignal.logicLevel ? 'HIGH (1)' : 'LOW (0)'}
                </div>
              </div>
              <div>
                <span className="text-slate-500">TTL Voltage:</span>
                <div className="text-base font-bold text-amber-300">{probedSignal.voltage}</div>
              </div>
              <div>
                <span className="text-slate-500">Node Status:</span>
                <div className="text-sm font-bold text-cyan-300">{probedSignal.status}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs font-sans text-slate-300">
              {probedSignal.note}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-center text-xs text-slate-500 font-mono">
            Click any pin button above or click directly on any terminal pin inside the Circuit Workbench to inspect logic levels.
          </div>
        )}
      </div>

      {/* Fault Injection Laboratory Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1">
              <ShieldAlert className="h-4 w-4" />
              <span>Controlled Fault Injection Suite</span>
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              Circuit Troubleshooting & Error Diagnosis
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Score:</span>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              {diagnosticScore} / 15 Marks
            </span>
            {activeFault !== 'none' && (
              <button
                onClick={clearFault}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1 text-xs font-bold text-white"
              >
                Clear Fault
              </button>
            )}
          </div>
        </div>

        {/* Injected Fault Status */}
        {activeFault !== 'none' ? (
          <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/80 p-5 space-y-3 animate-pulse">
            <div className="flex items-center space-x-2 text-rose-200 font-bold text-sm">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              <span>FAULT INJECTION ACTIVE</span>
            </div>
            <p className="text-xs text-rose-200 leading-relaxed">
              A problem has been introduced into the circuit! Probe the circuit terminals and test clock stimulus to observe the abnormal behavior.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              No hardware faults are currently active. Pick a fault to test your diagnostic skills:
            </div>
          </div>
        )}

        {/* Fault Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {faultsList.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                injectFault(f.id);
                setDiagnosisFeedback(null);
              }}
              className={`rounded-xl border p-3 text-left transition ${
                activeFault === f.id
                  ? 'border-rose-500 bg-rose-950/50 text-white font-bold ring-1 ring-rose-500'
                  : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold leading-snug">{f.label}</div>
              <div className="text-[10px] text-slate-400 mt-1">{f.desc}</div>
            </button>
          ))}
        </div>

        {/* Diagnosis Submission Panel */}
        {activeFault !== 'none' && (
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950 p-6 space-y-4">
            <div className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Submit Your Diagnostic Finding</span>
            </div>

            <p className="text-xs text-slate-300">
              Select which fault you believe is currently present in the circuit based on your probe readings:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {faultsList.map((f) => (
                <label
                  key={f.id}
                  className={`flex items-center space-x-2.5 rounded-lg border p-2.5 cursor-pointer transition ${
                    selectedSuspectedFault === f.id
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="suspectedFault"
                    checked={selectedSuspectedFault === f.id}
                    onChange={() => setSelectedSuspectedFault(f.id)}
                    className="text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowFaultHint(!showFaultHint)}
                className="flex items-center space-x-1 text-xs text-amber-400 hover:underline"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{showFaultHint ? 'Hide Hint' : 'Request Hint'}</span>
              </button>

              <button
                type="button"
                onClick={handleDiagnose}
                disabled={selectedSuspectedFault === 'none'}
                className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20 disabled:opacity-40"
              >
                DIAGNOSE FAULT & SUBMIT
              </button>
            </div>

            {/* Hint Box */}
            {showFaultHint && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3.5 text-xs text-amber-200">
                <strong>Troubleshooting Hint:</strong> In TTL logic, open inputs float to HIGH (~4V). If clock pulses do not affect Q, check the CLK line and asynchronous controls.
              </div>
            )}

            {/* Diagnosis Result Feedback */}
            {diagnosisFeedback && (
              <div className={`rounded-xl border p-4 text-xs space-y-1.5 ${
                diagnosisFeedback.correct 
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200' 
                  : 'border-rose-500/50 bg-rose-950/40 text-rose-200'
              }`}>
                <div className="flex items-center space-x-2 font-bold text-sm">
                  {diagnosisFeedback.correct ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>CORRECT DIAGNOSIS! (+15 Marks)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-rose-400" />
                      <span>INCORRECT DIAGNOSIS</span>
                    </>
                  )}
                </div>
                <p>{diagnosisFeedback.message}</p>
                {diagnosisFeedback.correct && (
                  <p className="text-emerald-300 font-mono text-[11px] pt-1">
                    {diagnosisFeedback.hint}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('workbench')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Return to Workbench
        </button>
        <button
          onClick={() => setCurrentPage('quiz')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Continue to Quiz</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
