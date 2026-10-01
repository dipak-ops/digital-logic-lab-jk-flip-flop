import React, { useState } from 'react';
import { 
  Table, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Cpu 
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const TruthTablePage: React.FC = () => {
  const {
    testCases,
    runAllVerificationTests,
    isVerifyingAll,
    resetVerificationTests,
    currentQ,
    jLevel,
    kLevel,
    pulseClock,
    setCurrentPage,
    setInitialQ,
    components,
    setSwitchValue
  } = useLab();

  // Manual test mode state
  const [manualJ, setManualJ] = useState<number>(1);
  const [manualK, setManualK] = useState<number>(1);
  const [manualInitQ, setManualInitQ] = useState<number>(0);
  const [manualTested, setManualTested] = useState<boolean>(false);
  const [manualResultQ, setManualResultQ] = useState<number>(1);
  const [manualOp, setManualOp] = useState<string>('TOGGLE');

  const passedCount = testCases.filter(t => t.passed).length;
  const allPassed = passedCount === 8;

  // Execute manual single test
  const handleManualTestPulse = () => {
    // Determine expected result
    let nextQ = manualInitQ;
    let op = 'HOLD';
    if (manualJ === 0 && manualK === 0) {
      nextQ = manualInitQ;
      op = 'HOLD';
    } else if (manualJ === 0 && manualK === 1) {
      nextQ = 0;
      op = 'RESET';
    } else if (manualJ === 1 && manualK === 0) {
      nextQ = 1;
      op = 'SET';
    } else if (manualJ === 1 && manualK === 1) {
      nextQ = manualInitQ === 1 ? 0 : 1;
      op = 'TOGGLE';
    }

    setManualResultQ(nextQ);
    setManualOp(op);
    setManualTested(true);

    // Sync to live lab workbench
    setInitialQ(manualInitQ);
    const jComp = components.find(c => c.type === 'switchJ');
    const kComp = components.find(c => c.type === 'switchK');
    if (jComp) setSwitchValue(jComp.id, manualJ);
    if (kComp) setSwitchValue(kComp.id, manualK);
    pulseClock();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Table className="h-3.5 w-3.5" />
          <span>VERIFICATION SUITE</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Characteristic Truth Table & Automated Verification
        </h1>
        <p className="text-sm text-slate-400">
          Exhaustive truth table evaluation across all 8 combinations of inputs $(J, K)$ and present state $Q$.
        </p>
      </div>

      {/* Verification Summary Banner */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Automated Test Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Verification Score: <span className="font-mono text-cyan-300">{passedCount} / 8</span> Tests Passed
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {allPassed 
              ? '✓ All 8 sequential combinations verified! Characteristic equation Q(next) = J·Q\' + K\'·Q fully confirmed.'
              : 'Run the automated verification suite to sequence and validate all 8 test conditions.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={resetVerificationTests}
            disabled={isVerifyingAll}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={runAllVerificationTests}
            disabled={isVerifyingAll}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <Play className={`h-4 w-4 fill-slate-950 ${isVerifyingAll ? 'animate-spin' : ''}`} />
            <span>{isVerifyingAll ? 'RUNNING TESTS...' : 'RUN ALL 8 TESTS'}</span>
          </button>
        </div>
      </div>

      {/* Interactive 8-Row Truth Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>The Complete 8-State Characteristic Table</span>
          </h3>
          <span className="text-xs text-slate-400">
            Current Workbench: J={jLevel}, K={kLevel}, Q={currentQ}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-cyan-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Test #</th>
                <th className="py-3 px-4">J</th>
                <th className="py-3 px-4">K</th>
                <th className="py-3 px-4">Present Q</th>
                <th className="py-3 px-4">Expected Q(next)</th>
                <th className="py-3 px-4">Actual Q(next)</th>
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {testCases.map((tc) => {
                const isMatchingCurrent = jLevel === tc.j && kLevel === tc.k && currentQ === tc.initialQ;

                return (
                  <tr 
                    key={tc.id}
                    className={`transition ${
                      isMatchingCurrent 
                        ? 'bg-cyan-950/50 text-cyan-200 border-l-4 border-l-cyan-400 font-bold' 
                        : tc.tested 
                          ? tc.passed ? 'bg-emerald-950/15' : 'bg-rose-950/20'
                          : 'hover:bg-slate-800/30 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 text-slate-400">Test {tc.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{tc.j}</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{tc.k}</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{tc.initialQ}</td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">{tc.expectedQNext}</td>
                    <td className="py-3 px-4">
                      {tc.tested ? (
                        <span className={`font-bold ${tc.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tc.actualQNext}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        tc.operation === 'HOLD' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        tc.operation === 'RESET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        tc.operation === 'SET' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {tc.operation}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {tc.tested ? (
                        tc.passed ? (
                          <span className="inline-flex items-center space-x-1 font-bold text-emerald-400 text-xs">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>PASS</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 font-bold text-rose-400 text-xs">
                            <XCircle className="h-4 w-4" />
                            <span>FAIL</span>
                          </span>
                        )
                      ) : (
                        <span className="text-slate-500 text-[10px]">Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Single Test Sandbox */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Interactive Sandbox</span>
          <h3 className="text-base font-bold text-white">Manual Condition Verification</h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose your custom initial state and inputs, apply a clock pulse, and inspect the state transition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Initial Q Selector */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Initial Q</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setManualInitQ(0)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualInitQ === 0 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Q = 0
              </button>
              <button
                onClick={() => setManualInitQ(1)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualInitQ === 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Q = 1
              </button>
            </div>
          </div>

          {/* J Input Selector */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase">J Input</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setManualJ(0)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualJ === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                J = 0
              </button>
              <button
                onClick={() => setManualJ(1)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualJ === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                J = 1
              </button>
            </div>
          </div>

          {/* K Input Selector */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase">K Input</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setManualK(0)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualK === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                K = 0
              </button>
              <button
                onClick={() => setManualK(1)}
                className={`rounded py-1.5 text-xs font-mono font-bold transition ${
                  manualK === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                K = 1
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={handleManualTestPulse}
            className="flex items-center space-x-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-8 py-3 text-xs font-extrabold text-slate-950 transition shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>APPLY CLOCK PULSE (↓)</span>
          </button>
        </div>

        {/* Transition Result Card */}
        {manualTested && (
          <div className="rounded-xl border border-cyan-500/40 bg-slate-950 p-4 animate-fade-in font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div>
                <span className="text-slate-500">Before Edge:</span>{' '}
                <span className="text-white font-bold">Q = {manualInitQ}</span> (J = {manualJ}, K = {manualK})
              </div>
              <div>
                <span className="text-slate-500">Trigger:</span>{' '}
                <span className="text-cyan-400 font-bold">Falling Clock Transition (↓)</span>
              </div>
              <div>
                <span className="text-slate-500">After Edge:</span>{' '}
                <span className="text-emerald-400 font-bold text-sm">Q = {manualResultQ}</span> (Q' = {manualResultQ === 1 ? 0 : 1})
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 p-3 text-center sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase font-sans">Identified Mode</span>
              <div className="text-lg font-black text-cyan-300 font-sans">{manualOp}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('simulation')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Simulation
        </button>
        <button
          onClick={() => setCurrentPage('timing')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Examine Timing Diagram</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
