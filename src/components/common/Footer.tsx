import React from 'react';
import { Cpu, ExternalLink, Heart, Shield, Code2, Globe } from 'lucide-react';
import { CREATOR_INFO } from '../../constants/labData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/90 text-slate-400 no-print transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-between">
          {/* Lab Identity */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                DIGITAL ELECTRONICS VIRTUAL LAB
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Implementation of JK Flip-Flop Using IC 7476
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Academic Interactive Simulation & Verification Suite
            </p>
          </div>

          {/* Creator Attribution */}
          <div className="text-center space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Created & Developed By
            </div>
            <div className="text-sm font-bold text-white">
              {CREATOR_INFO.name}
            </div>
            <div className="text-xs text-cyan-400 font-medium">
              {CREATOR_INFO.degree} Student
            </div>
            <div className="text-[11px] text-slate-400">
              {CREATOR_INFO.role}
            </div>
          </div>

          {/* Social / Profile Links */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex items-center space-x-3">
              <a
                href={CREATOR_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan-500/50 hover:bg-cyan-950/40 hover:text-cyan-300 transition group shadow-sm"
              >
                {/* LinkedIn SVG Icon */}
                <svg className="h-3.5 w-3.5 fill-current text-cyan-400 group-hover:scale-110 transition" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-cyan-400" />
              </a>

              <a
                href={CREATOR_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition group shadow-sm"
              >
                {/* GitHub SVG Icon */}
                <svg className="h-3.5 w-3.5 fill-current text-slate-300 group-hover:scale-110 transition" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white" />
              </a>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {CREATOR_INFO.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
