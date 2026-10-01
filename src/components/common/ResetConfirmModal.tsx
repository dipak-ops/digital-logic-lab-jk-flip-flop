import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const ResetConfirmModal: React.FC = () => {
  const { showResetConfirmModal, setShowResetConfirmModal, confirmResetExperiment } = useLab();

  if (!showResetConfirmModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-rose-500/40 bg-slate-900 p-6 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Reset Experiment Confirmation</h3>
            <p className="text-xs text-slate-400">Clear circuit workbench and start fresh</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Reset the experiment and clear the current circuit state? This will reset placed components, wiring connections, logic states, timing waveforms, observations, and task progress.
        </p>

        <div className="rounded-lg bg-slate-950 p-3 text-[11px] text-slate-400 font-mono">
          Note: Your student registration profile will be preserved.
        </div>

        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setShowResetConfirmModal(false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            CANCEL
          </button>
          <button
            onClick={confirmResetExperiment}
            className="flex items-center space-x-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 px-5 py-2 text-xs font-bold text-white transition shadow-lg shadow-rose-600/30"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>RESET EXPERIMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
