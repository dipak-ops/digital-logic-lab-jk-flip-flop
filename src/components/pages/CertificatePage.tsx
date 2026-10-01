import React from 'react';
import { Award, Printer, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CREATOR_INFO } from '../../constants/labData';

export const CertificatePage: React.FC = () => {
  const { student, totalScore, scoreBreakdown, testCases, setCurrentPage } = useLab();

  const passedTests = testCases.filter(t => t.passed).length;
  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Unique local verification code
  const verificationCode = `JK7476-${Math.abs(
    (student.rollNumber || 'EC-2026')
      .split('')
      .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  )
    .toString(16)
    .toUpperCase()
    .padStart(6, '0')
    .slice(-6)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            CREDENTIAL GENERATOR
          </span>
          <h1 className="text-xl font-black text-white mt-0.5">
            Student Certificate of Completion
          </h1>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition shadow-lg shadow-emerald-500/20"
        >
          <Printer className="h-4 w-4" />
          <span>PRINT CERTIFICATE</span>
        </button>
      </div>

      {/* Main Certificate Card */}
      <div className="rounded-3xl border-4 border-double border-cyan-500/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 md:p-14 shadow-2xl text-center space-y-6 print:border-4 print:border-black print:bg-white print:text-black print:p-8 print:shadow-none">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 print:border-black print:text-black shadow-inner">
            <Award className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-gray-700">
            DIGITAL ELECTRONICS VIRTUAL LABORATORY
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white print:text-black tracking-tight uppercase">
            CERTIFICATE OF COMPLETION
          </h2>
          <div className="text-xs font-mono text-slate-400 print:text-gray-600">
            Local Laboratory Verification Code: <span className="font-bold text-cyan-300 print:text-black">{verificationCode}</span>
          </div>
        </div>

        <div className="text-sm text-slate-300 print:text-gray-800">
          This is to certify that
        </div>

        <div className="font-serif text-3xl md:text-4xl font-extrabold text-cyan-300 print:text-black underline underline-offset-8">
          {student.name || 'Candidate Name'}
        </div>

        <div className="text-xs text-slate-400 print:text-gray-700 max-w-md mx-auto leading-relaxed">
          Roll Number: <span className="font-mono text-white print:text-black font-bold">{student.rollNumber || 'EC-2026-042'}</span> • {student.branch}, {student.semester}
          <br />
          <span className="font-semibold text-slate-300 print:text-black">{student.college || 'National Institute of Technology'}</span>
        </div>

        <div className="text-sm text-slate-300 print:text-gray-800 max-w-xl mx-auto leading-relaxed">
          has successfully implemented, simulated, and empirically verified the sequential electronics laboratory curriculum:
          <br />
          <span className="font-bold text-white print:text-black text-base uppercase mt-1 block">
            "Implementation of JK Flip-Flop Using IC 7476"
          </span>
        </div>

        {/* Badges / Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          <div className="rounded-xl border border-slate-800 print:border-gray-400 bg-slate-950/80 px-4 py-2 text-xs font-mono">
            <span className="text-slate-400 print:text-gray-600">Truth Table: </span>
            <span className="font-bold text-emerald-400 print:text-black">{passedTests} / 8 PASSED</span>
          </div>
          <div className="rounded-xl border border-slate-800 print:border-gray-400 bg-slate-950/80 px-4 py-2 text-xs font-mono">
            <span className="text-slate-400 print:text-gray-600">Total Score: </span>
            <span className="font-bold text-cyan-300 print:text-black">{totalScore} / 100 MARKS</span>
          </div>
          <div className="rounded-xl border border-slate-800 print:border-gray-400 bg-slate-950/80 px-4 py-2 text-xs font-mono">
            <span className="text-slate-400 print:text-gray-600">Evaluation: </span>
            <span className="font-bold text-emerald-400 print:text-black">VERIFIED & ACCREDITED</span>
          </div>
        </div>

        {/* Disclaimer & Issue Date */}
        <div className="pt-6 border-t border-slate-800 print:border-gray-400 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 print:text-gray-700 gap-4">
          <div className="text-left text-[11px]">
            <div>Date of Issue: <span className="font-bold text-slate-200 print:text-black">{todayDate}</span></div>
            <div className="text-slate-500 print:text-gray-600">
              * Local digital laboratory completion certificate for academic evaluation.
            </div>
          </div>
          <div className="text-right text-[11px]">
            <div>Created & Developed by <span className="font-bold text-slate-200 print:text-black">{CREATOR_INFO.name}</span></div>
            <div className="text-cyan-400 print:text-gray-600">{CREATOR_INFO.degree}</div>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 no-print">
        <button
          onClick={() => setCurrentPage('report')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Lab Report
        </button>
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>Return to Laboratory Home</span>
        </button>
      </div>
    </div>
  );
};
