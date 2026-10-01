import React from 'react';
import { ExternalLink, Code2, Award, Sparkles } from 'lucide-react';
import { CREATOR_INFO } from '../../constants/labData';

export const CreatorCard: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 shadow-xl p-5 ${compact ? 'max-w-md' : 'w-full'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-lg shadow-md shadow-cyan-500/20">
            DB
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Created & Developed By
            </div>
            <h3 className="text-base font-extrabold text-white">
              {CREATOR_INFO.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {CREATOR_INFO.degree} Student
            </p>
          </div>
        </div>

        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
      </div>

      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
        {CREATOR_INFO.bio} Designed for university digital logic practicals with true sequential state-machine emulation.
      </p>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          Author Profiles
        </span>
        <div className="flex items-center space-x-2">
          <a
            href={CREATOR_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-bold text-cyan-300 hover:bg-slate-800 transition"
          >
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={CREATOR_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-200 hover:bg-slate-800 transition"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
