import React, { useState } from 'react';
import { 
  LineChart, 
  Trash2, 
  Zap, 
  ArrowRight, 
  Play, 
  Square, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const TimingDiagramPage: React.FC = () => {
  const {
    timingSamples,
    clearTimingSamples,
    pulseClock,
    startAutoClock,
    stopAutoClock,
    isClockRunning,
    setCurrentPage,
    jLevel,
    kLevel,
    clkLevel,
    currentQ,
    currentQBar
  } = useLab();

  const [showAsyncChannels, setShowAsyncChannels] = useState<boolean>(true);

  // Channels to render
  const channels = [
    { key: 'clk', name: 'CLK', color: '#38bdf8', label: 'Clock Pulse (CLK)' },
    { key: 'j', name: 'J', color: '#22c55e', label: 'Data Input J' },
    { key: 'k', name: 'K', color: '#10b981', label: 'Data Input K' },
    { key: 'q', name: 'Q', color: '#4ade80', label: 'True Output Q' },
    { key: 'qBar', name: 'Q\'', color: '#06b6d4', label: 'Inverted Output Q\'' },
    ...(showAsyncChannels ? [
      { key: 'preset', name: 'PRE\'', color: '#f59e0b', label: 'Asynchronous Preset (PRE\')' },
      { key: 'clear', name: 'CLR\'', color: '#f43f5e', label: 'Asynchronous Clear (CLR\')' },
    ] : [])
  ];

  // SVG dimensions
  const svgWidth = 720;
  const channelHeight = 44;
  const paddingLeft = 90;
  const paddingRight = 30;
  const plotWidth = svgWidth - paddingLeft - paddingRight;

  const totalSamples = Math.max(timingSamples.length, 12);
  const stepX = plotWidth / Math.max(totalSamples - 1, 1);

  // Generate digital stair-step path for a given channel key
  const generateSignalPath = (channelKey: string, baseY: number) => {
    if (timingSamples.length === 0) return '';
    const highY = baseY - 22;
    const lowY = baseY;

    let path = '';
    timingSamples.forEach((sample, idx) => {
      const x = paddingLeft + idx * stepX;
      // @ts-expect-error key indexing
      const val = sample[channelKey] ?? 0;
      const y = val === 1 ? highY : lowY;

      if (idx === 0) {
        path += `M ${x} ${y}`;
      } else {
        // Digital horizontal to new X, then vertical transition
        const prevX = paddingLeft + (idx - 1) * stepX;
        // @ts-expect-error key indexing
        const prevVal = timingSamples[idx - 1][channelKey] ?? 0;
        const prevY = prevVal === 1 ? highY : lowY;
        path += ` L ${x} ${prevY} L ${x} ${y}`;
      }
    });

    // Extend to the right end
    if (timingSamples.length < totalSamples) {
      const lastX = paddingLeft + (timingSamples.length - 1) * stepX;
      const endX = paddingLeft + (totalSamples - 1) * stepX;
      // @ts-expect-error key indexing
      const lastVal = timingSamples[timingSamples.length - 1][channelKey] ?? 0;
      const lastY = lastVal === 1 ? highY : lowY;
      path += ` L ${endX} ${lastY}`;
    }

    return path;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <LineChart className="h-3.5 w-3.5" />
          <span>OSCILLOSCOPE WAVEFORM RECORDER</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Interactive Timing Diagram
        </h1>
        <p className="text-sm text-slate-400">
          Multi-channel digital waveform trace tracking synchronous clock edges, inputs, and state changes.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={pulseClock}
            className="flex items-center space-x-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>PULSE CLOCK (P)</span>
          </button>

          <button
            onClick={isClockRunning ? stopAutoClock : () => startAutoClock(1)}
            className={`flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              isClockRunning 
                ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-cyan-300'
            }`}
          >
            {isClockRunning ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isClockRunning ? 'STOP OSCILLATOR' : 'START 1Hz CLOCK'}</span>
          </button>

          <button
            onClick={() => setShowAsyncChannels(!showAsyncChannels)}
            className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            {showAsyncChannels ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span>{showAsyncChannels ? 'Hide PRE/CLR' : 'Show PRE/CLR'}</span>
          </button>
        </div>

        <button
          onClick={clearTimingSamples}
          className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-rose-400 transition"
        >
          <Trash2 className="h-4 w-4" />
          <span>CLEAR WAVEFORM</span>
        </button>
      </div>

      {/* Main Oscilloscope Screen */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-slate-950 p-4 md:p-6 shadow-2xl relative overflow-hidden bg-circuit-grid">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>CHANNELS: {channels.length} ACTIVE TRACES</span>
          </div>
          <div className="text-slate-400">
            TOTAL SAMPLES: <span className="text-white font-bold">{timingSamples.length}</span>
          </div>
        </div>

        {/* SVG Oscilloscope Trace Canvas */}
        <div className="w-full overflow-x-auto">
          <svg 
            viewBox={`0 0 ${svgWidth} ${channels.length * channelHeight + 50}`} 
            className="min-w-[640px] w-full h-auto select-none"
          >
            {/* Horizontal channel guide lines */}
            {channels.map((ch, idx) => {
              const baseY = 40 + idx * channelHeight;
              return (
                <g key={ch.key}>
                  {/* Channel background stripe */}
                  <rect 
                    x={paddingLeft} 
                    y={baseY - 30} 
                    width={plotWidth} 
                    height={36} 
                    fill="#0f172a" 
                    fillOpacity="0.4" 
                    rx="4" 
                  />
                  {/* Baseline 0V */}
                  <line 
                    x1={paddingLeft} 
                    y1={baseY} 
                    x2={svgWidth - paddingRight} 
                    y2={baseY} 
                    stroke="#334155" 
                    strokeWidth="1" 
                    strokeDasharray="2 2" 
                  />
                  {/* High level 5V */}
                  <line 
                    x1={paddingLeft} 
                    y1={baseY - 22} 
                    x2={svgWidth - paddingRight} 
                    y2={baseY - 22} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                  />
                  {/* Channel Name on Left */}
                  <text 
                    x={paddingLeft - 12} 
                    y={baseY - 8} 
                    fill={ch.color} 
                    fontSize="11" 
                    fontFamily="monospace" 
                    fontWeight="bold" 
                    textAnchor="end"
                  >
                    {ch.name}
                  </text>
                </g>
              );
            })}

            {/* Vertical Time Scale Grid Lines & Labels */}
            {Array.from({ length: totalSamples }).map((_, idx) => {
              const x = paddingLeft + idx * stepX;
              const isEven = idx % 2 === 0;
              return (
                <g key={idx}>
                  <line 
                    x1={x} 
                    y1={15} 
                    x2={x} 
                    y2={channels.length * channelHeight + 20} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray="3 3" 
                  />
                  <text 
                    x={x} 
                    y={channels.length * channelHeight + 36} 
                    fill={isEven ? "#94a3b8" : "#475569"} 
                    fontSize="9" 
                    fontFamily="monospace" 
                    textAnchor="middle"
                  >
                    t{idx}
                  </text>
                </g>
              );
            })}

            {/* Render Digital Signal Paths */}
            {channels.map((ch, idx) => {
              const baseY = 40 + idx * channelHeight;
              const pathD = generateSignalPath(ch.key, baseY);
              return (
                <g key={ch.key}>
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke={ch.color} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ filter: `drop-shadow(0 0 3px ${ch.color})` }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-800/80 text-xs">
          {channels.map(ch => (
            <div key={ch.key} className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
              <span className="text-slate-300 font-mono text-[11px]">{ch.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('truthtable')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Truth Table
        </button>
        <button
          onClick={() => setCurrentPage('quiz')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Take Knowledge Quiz (10 Qs)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
