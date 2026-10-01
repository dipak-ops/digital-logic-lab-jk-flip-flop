import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  Sparkles,
  Calendar,
  Building,
  User,
  History,
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CREATOR_INFO } from '../../constants/labData';
import { CreatorCard } from '../common/CreatorCard';

export const ResultPage: React.FC = () => {
  const {
    student,
    validation,
    testCases,
    quizScore,
    quizSubmitted,
    scoreBreakdown,
    formattedTime,
    sessionHistory,
    setCurrentPage,
    faultDiagnosed
  } = useLab();

  const passedTests = testCases.filter(t => t.passed).length;
  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2 no-print">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <Award className="h-3.5 w-3.5" />
          <span>OFFICIAL LABORATORY ASSESSMENT</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Experiment Result & Assessment
            </h1>
            <p className="text-sm text-slate-400">
              Implementation of JK Flip-Flop Using IC 7476 • Continuous Evaluation Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => setCurrentPage('report')}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white transition"
            >
              <FileText className="h-4 w-4" />
              <span>View Lab Report</span>
            </button>
            <button
              onClick={() => setCurrentPage('certificate')}
              className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>View Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 md:p-8 shadow-2xl relative overflow-hidden bg-circuit-dots space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Award className="h-9 w-9" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                DIGITAL ELECTRONICS VIRTUAL LAB
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                EXPERIMENT COMPLETED
              </h2>
              <div className="text-xs text-slate-400">
                Implementation of JK Flip-Flop Using IC 7476
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/50 bg-emerald-950/40 px-4 py-2 text-emerald-300 font-mono text-xs font-bold flex items-center space-x-2 self-start sm:self-auto">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>STATUS: VERIFIED</span>
          </div>
        </div>

        {/* Student Dossier Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Student Name</span>
            <div className="font-bold text-white text-sm truncate">{student.name}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Roll Number</span>
            <div className="font-bold text-cyan-300 text-sm font-mono">{student.rollNumber}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Institution</span>
            <div className="font-bold text-white truncate">{student.college}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Duration</span>
            <div className="font-bold text-white font-mono">{formattedTime}</div>
          </div>
        </div>

        {/* 100 MARKS Continuous Assessment Breakdown (Section 25) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Continuous Assessment Breakdown (100 Marks)
            </span>
            <span className="font-mono text-base font-black text-cyan-300">
              Total Score: {scoreBreakdown.total} / 100
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono text-center">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Assembly (20)</span>
              <div className="text-lg font-black text-emerald-400">{scoreBreakdown.circuitAssembly}</div>
              <span className="text-[9px] text-slate-400">{validation.percent}% Wired</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Truth Table (20)</span>
              <div className="text-lg font-black text-cyan-300">{scoreBreakdown.truthTable}</div>
              <span className="text-[9px] text-slate-400">{passedTests}/8 Passed</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Tasks (20)</span>
              <div className="text-lg font-black text-white">{scoreBreakdown.practicalTasks}</div>
              <span className="text-[9px] text-slate-400">10 Lab Tasks</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Diagnostics (15)</span>
              <div className="text-lg font-black text-amber-300">{scoreBreakdown.faultDiagnosis}</div>
              <span className="text-[9px] text-slate-400">{faultDiagnosed ? 'Diagnosed' : 'Troubleshooting'}</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Quiz (15)</span>
              <div className="text-lg font-black text-purple-300">{scoreBreakdown.quiz}</div>
              <span className="text-[9px] text-slate-400">{quizSubmitted ? `${quizScore}/10 Qs` : 'Pending'}</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
              <span className="text-[10px] text-slate-500">Viva Voce (10)</span>
              <div className="text-lg font-black text-blue-300">{scoreBreakdown.viva}</div>
              <span className="text-[9px] text-slate-400">Oral Prep</span>
            </div>
          </div>
        </div>

        {/* Conclusion (Section 29) */}
        <div className="rounded-2xl border border-cyan-900/40 bg-slate-950/80 p-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Academic Laboratory Conclusion</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            "The JK flip-flop was successfully implemented and verified using an interactive simulation of IC 7476. The HOLD, RESET, SET and TOGGLE operations were studied using clocked inputs. The asynchronous PRESET and CLEAR controls were also verified. The timing diagram demonstrated the relationship between the clock, input signals and output states."
          </p>
        </div>
      </div>

      {/* Session History (Section 57) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <History className="h-4 w-4" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Local Session History
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Experiment</th>
                <th className="py-2.5 px-3">Verification</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {sessionHistory.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30">
                  <td className="py-2 px-3">{s.date}</td>
                  <td className="py-2 px-3 font-bold text-white">{s.studentName}</td>
                  <td className="py-2 px-3 text-cyan-300">IC 7476 JK Flip-Flop</td>
                  <td className="py-2 px-3 text-emerald-400">{s.testsPassed}/8 Tests Passed</td>
                  <td className="py-2 px-3 font-bold">{s.totalScore}/100</td>
                  <td className="py-2 px-3 text-slate-400">{s.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creator Attribution Profile Card */}
      <CreatorCard />
    </div>
  );
};
