import React from 'react';
import { useLab } from '../../context/LabContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLab();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm">
      {toasts.map((toast) => {
        let borderStyle = 'border-cyan-500/40 bg-slate-900/95 text-cyan-200';
        let Icon = Info;

        if (toast.type === 'success') {
          borderStyle = 'border-emerald-500/40 bg-slate-900/95 text-emerald-200';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          borderStyle = 'border-amber-500/40 bg-slate-900/95 text-amber-200';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          borderStyle = 'border-rose-500/40 bg-slate-900/95 text-rose-200';
          Icon = XCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between space-x-3 rounded-xl border p-3.5 shadow-2xl backdrop-blur-md transition-all text-xs animate-fade-in ${borderStyle}`}
          >
            <div className="flex items-center space-x-2.5">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
