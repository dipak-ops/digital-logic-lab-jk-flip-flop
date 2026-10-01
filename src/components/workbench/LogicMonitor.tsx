import React from 'react';
import { useLab } from '../../context/LabContext';
import { Activity, Radio, AlertTriangle, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

export const LogicMonitor: React.FC = () => {
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
    asyncInvalidWarning,
    probedSignal,
    probeActive,
    clearProbe
  } = useLab();

  // Compute what next Q will be on the next clock edge
  const projectedNextQ = (() => {
    if (activeOperation === 'HOLD') return currentQ;
    if (activeOperation === 'RESET') return 0;
    if (activeOperation === 'SET') return 1;
    return currentQ === 1 ? 0 : 1;
  })();

  const operationModes = [
    { mode: 'HOLD', condition: 'J=0, K=0', next: `Q(${currentQ})`, active: activeOperation === 'HOLD' },
    { mode: 'RESET', condition: 'J=0, K=1', next: '0', active: activeOperation === 'RESET' },
    { mode: 'SET', condition: 'J=1, K=0', next: '1', active: activeOperation === 'SET' },
    { mode: 'TOGGLE', condition: 'J=1, K=1', next: `${currentQ === 1 ? 0 : 1}`, active: activeOperation === 'TOGGLE' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Logic Monitor Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-white">
              REAL-TIME LOGIC MONITOR
            </span>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Warning if simultaneous PRE & CLR */}
        {asyncInvalidWarning && (
          <div className="rounded-xl border border-rose-500/50 bg-rose-950/60 p-3 text-xs text-rose-300 flex items-start space-x-2 animate-pulse">
            <ShieldAlert className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">INVALID ASYNCHRONOUS STATE!</div>
              <p className="text-[11px] text-rose-200/90">
                Both PRESET and CLEAR are active LOW (0). In TTL 7476, this forces both Q and Q' to 1 simultaneously, violating complementary logic.
              </p>
            </div>
          </div>
        )}

        {/* Live Signal Level Readouts */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
            <div className="text-[10px] text-slate-400">J INPUT</div>
            <div className={`text-base font-bold ${jLevel ? 'text-emerald-400' : 'text-slate-500'}`}>
              {jLevel}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
            <div className="text-[10px] text-slate-400">K INPUT</div>
            <div className={`text-base font-bold ${kLevel ? 'text-emerald-400' : 'text-slate-500'}`}>
              {kLevel}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
            <div className="text-[10px] text-slate-400">CLOCK</div>
            <div className={`text-base font-bold ${clkLevel ? 'text-cyan-400' : 'text-slate-500'}`}>
              {clkLevel}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
            <div className="text-[10px] text-slate-400">PRE'</div>
            <div className={`text-base font-bold ${presetLevel === 0 ? 'text-amber-400 font-black' : 'text-slate-400'}`}>
              {presetLevel}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
            <div className="text-[10px] text-slate-400">CLR'</div>
            <div className={`text-base font-bold ${clearLevel === 0 ? 'text-rose-400 font-black' : 'text-slate-400'}`}>
              {clearLevel}
            </div>
          </div>
        </div>

        {/* Big Stored State Readout */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-center justify-around">
          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-400">TRUE OUTPUT (Q)</div>
            <div className={`text-3xl font-black font-mono mt-1 ${currentQ ? 'text-emerald-400' : 'text-slate-600'}`}>
              {currentQ}
            </div>
            <div className="text-[10px] font-mono text-slate-500">{currentQ ? 'HIGH (1)' : 'LOW (0)'}</div>
          </div>

          <div className="h-10 w-px bg-slate-800" />

          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-400">COMPLEMENT (Q')</div>
            <div className={`text-3xl font-black font-mono mt-1 ${currentQBar ? 'text-cyan-400' : 'text-slate-600'}`}>
              {currentQBar}
            </div>
            <div className="text-[10px] font-mono text-slate-500">{currentQBar ? 'HIGH (1)' : 'LOW (0)'}</div>
          </div>
        </div>

        {/* State Transition Forecast */}
        <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Armed Mode:</span>{' '}
            <span className="font-mono font-bold text-cyan-300 uppercase">{activeOperation}</span>
          </div>
          <div>
            <span className="text-slate-400">At Next CLK (↓):</span>{' '}
            <span className="font-mono font-bold text-emerald-400">
              Q: {currentQ} → {projectedNextQ}
            </span>
          </div>
        </div>

        {/* Last Sequential Event Log */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Last Sequential Event
          </div>
          <p className="font-mono text-xs text-slate-200 leading-snug">
            {lastEvent}
          </p>
        </div>
      </div>

      {/* Four Synchronous State Cards with Live Highlight */}
      <div className="grid grid-cols-2 gap-2">
        {operationModes.map((op) => (
          <div
            key={op.mode}
            className={`rounded-xl border p-3 transition-all duration-200 ${
              op.active 
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md ring-1 ring-cyan-400/50' 
                : 'border-slate-800 bg-slate-900/40 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black">{op.mode}</span>
              {op.active && <span className="flex h-2 w-2 rounded-full bg-cyan-400" />}
            </div>
            <div className="text-[10px] font-mono mt-0.5">{op.condition}</div>
            <div className="text-[11px] font-mono font-bold mt-1 text-slate-300">
              Qnext = {op.next}
            </div>
          </div>
        ))}
      </div>

      {/* Logic Probe Floating Card if probe active */}
      {probedSignal && (
        <div className="rounded-2xl border-2 border-cyan-400 bg-slate-900 p-4 space-y-2 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
              <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>SIGNAL LOGIC PROBE</span>
            </div>
            <button
              onClick={clearProbe}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-slate-500">Component:</span>
              <div className="font-bold text-slate-200">{probedSignal.title}</div>
            </div>
            <div>
              <span className="text-slate-500">Pin Node:</span>
              <div className="font-bold text-cyan-300">{probedSignal.pin}</div>
            </div>
            <div>
              <span className="text-slate-500">Logic State:</span>
              <div className={`font-bold ${probedSignal.logicLevel ? 'text-emerald-400' : 'text-slate-400'}`}>
                {probedSignal.logicLevel ? 'HIGH (1)' : 'LOW (0)'}
              </div>
            </div>
            <div>
              <span className="text-slate-500">TTL Voltage:</span>
              <div className="font-bold text-amber-300">{probedSignal.voltage}</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 border-t border-slate-800 pt-1.5">
            {probedSignal.note}
          </p>
        </div>
      )}
    </div>
  );
};
