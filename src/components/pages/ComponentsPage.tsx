import React from 'react';
import { Layers, Plus, ArrowRight, Zap, Shield, Check } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { COMPONENT_CATALOG } from '../../constants/componentsDef';
import { ComponentType } from '../../types/lab';

export const ComponentsPage: React.FC = () => {
  const { setCurrentPage, addComponent } = useLab();

  const handleAddAndGo = (type: ComponentType) => {
    addComponent(type, 350, 200);
    setCurrentPage('workbench');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Layers className="h-3.5 w-3.5" />
          <span>VIRTUAL LAB APPARATUS</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Component Library & Instrument Catalog
        </h1>
        <p className="text-sm text-slate-400">
          High-fidelity digital electronic components for building and testing the JK Flip-Flop circuit.
        </p>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPONENT_CATALOG.map((item) => (
          <div 
            key={item.type} 
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3 hover:border-cyan-500/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                item.category === 'IC' ? 'bg-cyan-950/30 text-cyan-300 border-cyan-500/30' :
                item.category === 'INPUTS' ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30' :
                item.category === 'OUTPUTS' ? 'bg-purple-950/30 text-purple-300 border-purple-500/30' :
                'bg-blue-950/30 text-blue-300 border-blue-500/30'
              }`}>
                {item.category}
              </span>
              <button
                onClick={() => handleAddAndGo(item.type)}
                className="flex items-center space-x-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 px-2.5 py-1 text-xs font-bold transition border border-cyan-500/30"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Workbench</span>
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Visual Icon / Symbol Representation */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="text-slate-500">Logic Model:</span>
              <span className="text-cyan-300 font-semibold">{item.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('ic7476')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to IC 7476 Study
        </button>
        <button
          onClick={() => setCurrentPage('procedure')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Read Laboratory Procedure</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
