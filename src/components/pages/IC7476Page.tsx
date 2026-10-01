import React, { useState } from 'react';
import { Cpu, ArrowRight, ShieldCheck, Zap, Layers, Info } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { IC7476_SPECS } from '../../constants/labData';

export const IC7476Page: React.FC = () => {
  const { setCurrentPage } = useLab();
  const [activeTab, setActiveTab] = useState<'conceptual' | 'physical'>('conceptual');

  // Physical 16-Pin DIP standard layout for IC 7476
  const dipPins = [
    { pin: 1, name: '1CLK', desc: 'Clock Input FF 1' },
    { pin: 2, name: '1PRE\'', desc: 'Active-Low Preset FF 1' },
    { pin: 3, name: '1CLR\'', desc: 'Active-Low Clear FF 1' },
    { pin: 4, name: '1J', desc: 'Data Input J FF 1' },
    { pin: 5, name: 'VCC', desc: '+5V Power Supply' },
    { pin: 6, name: '2CLK', desc: 'Clock Input FF 2' },
    { pin: 7, name: '2PRE\'', desc: 'Active-Low Preset FF 2' },
    { pin: 8, name: '2CLR\'', desc: 'Active-Low Clear FF 2' },
    { pin: 9, name: '2J', desc: 'Data Input J FF 2' },
    { pin: 10, name: '2Q\'', desc: 'Inverted Output FF 2' },
    { pin: 11, name: '2Q', desc: 'True Output FF 2' },
    { pin: 12, name: '2K', desc: 'Data Input K FF 2' },
    { pin: 13, name: 'GND', desc: 'Ground Reference (0V)' },
    { pin: 14, name: '1Q\'', desc: 'Inverted Output FF 1' },
    { pin: 15, name: '1Q', desc: 'True Output FF 1' },
    { pin: 16, name: '1K', desc: 'Data Input K FF 1' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Cpu className="h-3.5 w-3.5" />
          <span>INTEGRATED CIRCUIT ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          IC 7476 Dual JK Flip-Flop
        </h1>
        <p className="text-sm text-slate-400">
          Pin configuration, functional distinctions, and electrical operating characteristics.
        </p>
      </div>

      {/* Conceptual vs Physical Warning & Switch */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Info className="h-4 w-4 text-cyan-400" />
              <span>Differentiating Conceptual Pins from Physical DIP Pins</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Standard DIP-16 packages interlace pins across two flip-flops. In digital simulations and logic design, we work with clean <strong>conceptual functional pins</strong>.
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('conceptual')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                activeTab === 'conceptual'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Conceptual Simulation Block
            </button>
            <button
              onClick={() => setActiveTab('physical')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                activeTab === 'physical'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Physical 16-Pin DIP
            </button>
          </div>
        </div>

        {activeTab === 'conceptual' ? (
          /* Conceptual Block View */
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col items-center">
            <div className="text-center mb-4">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Simulation Schematic Block (Flip-Flop Section 1)
              </span>
            </div>

            <svg viewBox="0 0 520 280" className="w-full max-w-lg h-auto select-none">
              {/* IC Body */}
              <rect x="150" y="40" width="220" height="200" rx="14" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              
              {/* Labels inside IC */}
              <text x="260" y="80" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="bold">IC 7476</text>
              <text x="260" y="105" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="semibold">DUAL JK FLIP-FLOP</text>
              <text x="260" y="125" textAnchor="middle" fill="#64748b" fontSize="10">SECTION 1 OF 2</text>

              {/* Power Pins */}
              <line x1="200" y1="10" x2="200" y2="40" stroke="#ef4444" strokeWidth="2.5" />
              <text x="200" y="8" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">VCC (+5V)</text>

              <line x1="320" y1="240" x2="320" y2="270" stroke="#64748b" strokeWidth="2.5" />
              <text x="320" y="278" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">GND (0V)</text>

              {/* Asynchronous Controls */}
              <line x1="260" y1="10" x2="260" y2="34" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="260" cy="37" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <text x="260" y="8" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" dx="-30">PRE' (Active Low)</text>

              <line x1="260" y1="246" x2="260" y2="270" stroke="#f43f5e" strokeWidth="2.5" />
              <circle cx="260" cy="243" r="3.5" fill="none" stroke="#f43f5e" strokeWidth="2" />
              <text x="260" y="278" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle" dx="-30">CLR' (Active Low)</text>

              {/* Inputs (Left) */}
              <line x1="60" y1="80" x2="150" y2="80" stroke="#22c55e" strokeWidth="2.5" />
              <text x="50" y="84" fill="#4ade80" fontSize="12" fontWeight="bold" textAnchor="end">J (Pin 4)</text>

              <line x1="60" y1="140" x2="144" y2="140" stroke="#06b6d4" strokeWidth="2.5" />
              <circle cx="147" cy="140" r="3.5" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <polyline points="150,134 160,140 150,146" fill="none" stroke="#0ea5e9" strokeWidth="2" />
              <text x="50" y="144" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="end">CLK (Pin 1)</text>

              <line x1="60" y1="200" x2="150" y2="200" stroke="#22c55e" strokeWidth="2.5" />
              <text x="50" y="204" fill="#4ade80" fontSize="12" fontWeight="bold" textAnchor="end">K (Pin 16)</text>

              {/* Outputs (Right) */}
              <line x1="370" y1="90" x2="460" y2="90" stroke="#22c55e" strokeWidth="2.5" />
              <text x="470" y="94" fill="#4ade80" fontSize="12" fontWeight="bold">Q (Pin 15)</text>

              <line x1="376" y1="190" x2="460" y2="190" stroke="#06b6d4" strokeWidth="2.5" />
              <circle cx="373" cy="190" r="3.5" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <text x="470" y="194" fill="#38bdf8" fontSize="12" fontWeight="bold">Q' (Pin 14)</text>
            </svg>
          </div>
        ) : (
          /* Physical 16-Pin DIP Package */
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col items-center">
            <div className="text-center mb-4">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                Standard Texas Instruments / National Semi DIP-16 Package
              </span>
            </div>

            <div className="w-full max-w-lg grid grid-cols-2 gap-4">
              {/* Left Side: Pins 1 to 8 */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-500">PINS 1-8 (Left Side)</span>
                {dipPins.slice(0, 8).map(p => (
                  <div key={p.pin} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs">
                    <span className="font-mono font-bold text-cyan-400">PIN {p.pin}</span>
                    <span className="font-mono font-bold text-slate-100">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.desc}</span>
                  </div>
                ))}
              </div>

              {/* Right Side: Pins 9 to 16 */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-500">PINS 9-16 (Right Side)</span>
                {dipPins.slice(8, 16).map(p => (
                  <div key={p.pin} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs">
                    <span className="font-mono font-bold text-cyan-400">PIN {p.pin}</span>
                    <span className="font-mono font-bold text-slate-100">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Datasheet Specifications Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Manufacturer Electrical & Operational Specifications</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {Object.entries(IC7476_SPECS).map(([key, val]) => (
            <div key={key} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="font-mono font-semibold text-slate-200">
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('theory')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Theory
        </button>
        <button
          onClick={() => setCurrentPage('components')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Explore Component Library</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
