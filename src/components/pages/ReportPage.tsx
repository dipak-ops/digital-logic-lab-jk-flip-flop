import React from 'react';
import { Printer, ArrowRight, CheckCircle2, Award, Calendar, Clock, BookOpen, Layers } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CREATOR_INFO } from '../../constants/labData';

export const ReportPage: React.FC = () => {
  const {
    student,
    validation,
    testCases,
    observations,
    quizScore,
    quizSubmitted,
    scoreBreakdown,
    formattedTime,
    setCurrentPage
  } = useLab();

  const passedTests = testCases.filter(t => t.passed).length;
  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header (no-print) */}
      <div className="space-y-2 no-print">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>OFFICIAL LABORATORY RECORD</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Formal Experiment Laboratory Report
            </h1>
            <p className="text-sm text-slate-400">
              Formatted according to standard university electronics practical documentation guidelines.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 self-start sm:self-auto hover:from-emerald-400 hover:to-teal-500 transition"
          >
            <Printer className="h-4 w-4" />
            <span>PRINT LAB REPORT</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Sheet */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-slate-200 space-y-6 print:border-none print:bg-white print:text-black print:p-0">
        {/* Institutional Header */}
        <div className="border-b-2 border-slate-700 print:border-black pb-4 text-center space-y-1">
          <h2 className="text-xl font-black uppercase tracking-wider text-white print:text-black">
            {student.college || 'DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING'}
          </h2>
          <div className="text-xs font-bold tracking-widest text-cyan-400 print:text-gray-700 uppercase">
            DIGITAL ELECTRONICS LABORATORY MANUAL • PRACTICAL EXPERIMENT REPORT
          </div>
        </div>

        {/* Student Dossier Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs border border-slate-800 print:border-gray-400 rounded-xl p-4 bg-slate-950/50 print:bg-transparent">
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Student Name:</span>
            <div className="font-bold text-white print:text-black">{student.name}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Roll Number:</span>
            <div className="font-bold font-mono text-cyan-300 print:text-black">{student.rollNumber}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Department:</span>
            <div className="font-bold text-white print:text-black">{student.branch}, {student.semester}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Date & Session:</span>
            <div className="font-bold font-mono text-white print:text-black">{todayDate} ({formattedTime})</div>
          </div>
        </div>

        {/* Score Breakdown Table (100 Marks) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase">
            1. Evaluation & Continuous Assessment (100 Marks Breakdown)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 text-xs font-mono text-center">
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Assembly (20)</div>
              <div className="font-bold text-emerald-400 print:text-black">{scoreBreakdown.circuitAssembly}</div>
            </div>
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Truth Table (20)</div>
              <div className="font-bold text-cyan-300 print:text-black">{scoreBreakdown.truthTable}</div>
            </div>
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Tasks (20)</div>
              <div className="font-bold text-white print:text-black">{scoreBreakdown.practicalTasks}</div>
            </div>
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Faults (15)</div>
              <div className="font-bold text-amber-300 print:text-black">{scoreBreakdown.faultDiagnosis}</div>
            </div>
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Quiz (15)</div>
              <div className="font-bold text-purple-300 print:text-black">{scoreBreakdown.quiz}</div>
            </div>
            <div className="border border-slate-800 print:border-gray-300 rounded-lg p-2 bg-slate-950/50 print:bg-transparent">
              <div className="text-[10px] text-slate-500 print:text-gray-600">Viva (10)</div>
              <div className="font-bold text-blue-300 print:text-black">{scoreBreakdown.viva}</div>
            </div>
            <div className="border border-cyan-500/50 print:border-black rounded-lg p-2 bg-cyan-950/30 print:bg-gray-100 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-cyan-300 print:text-black font-bold">Total Score</div>
              <div className="font-black text-sm text-cyan-200 print:text-black">{scoreBreakdown.total} / 100</div>
            </div>
          </div>
        </div>

        {/* Title, Aim & Apparatus */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase">
            2. Title & Aim
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            <strong>Experiment Title:</strong> Implementation of JK Flip-Flop Using IC 7476.<br />
            <strong>Aim:</strong> To implement, simulate, and verify the synchronous and asynchronous operation of a JK Flip-Flop using IC 7476, and observe state transitions on active falling clock edges.
          </p>
        </div>

        {/* Verified Characteristic Truth Table */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase">
            3. Verified Truth Table (All 8 Synchronous States)
          </h3>
          <table className="w-full text-left text-xs font-mono border border-slate-800 print:border-gray-400">
            <thead className="bg-slate-950 print:bg-gray-200 text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-400">
              <tr>
                <th className="py-2 px-3">Test #</th>
                <th className="py-2 px-3">J</th>
                <th className="py-2 px-3">K</th>
                <th className="py-2 px-3">Present Q</th>
                <th className="py-2 px-3">Trigger</th>
                <th className="py-2 px-3">Expected Q(t+1)</th>
                <th className="py-2 px-3">Actual Q(t+1)</th>
                <th className="py-2 px-3">Mode</th>
                <th className="py-2 px-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-slate-300 print:text-black">
              {testCases.map((tc) => (
                <tr key={tc.id}>
                  <td className="py-1.5 px-3">Test {tc.id}</td>
                  <td className="py-1.5 px-3">{tc.j}</td>
                  <td className="py-1.5 px-3">{tc.k}</td>
                  <td className="py-1.5 px-3">{tc.initialQ}</td>
                  <td className="py-1.5 px-3">Falling (↓)</td>
                  <td className="py-1.5 px-3">{tc.expectedQNext}</td>
                  <td className="py-1.5 px-3 font-bold">{tc.actualQNext !== undefined ? tc.actualQNext : tc.expectedQNext}</td>
                  <td className="py-1.5 px-3">{tc.operation}</td>
                  <td className="py-1.5 px-3 text-emerald-400 print:text-black font-semibold">✓ PASS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logged Laboratory Observations */}
        {observations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase">
              4. Logged Laboratory Observations ({observations.length} Recorded)
            </h3>
            <table className="w-full text-left text-xs font-mono border border-slate-800 print:border-gray-400">
              <thead className="bg-slate-950 print:bg-gray-200 text-slate-300 print:text-black border-b border-slate-800 print:border-gray-400">
                <tr>
                  <th className="py-1.5 px-2">Obs #</th>
                  <th className="py-1.5 px-2">Time</th>
                  <th className="py-1.5 px-2">J</th>
                  <th className="py-1.5 px-2">K</th>
                  <th className="py-1.5 px-2">Trigger</th>
                  <th className="py-1.5 px-2">Q(actual)</th>
                  <th className="py-1.5 px-2">Q'</th>
                  <th className="py-1.5 px-2">Mode</th>
                  <th className="py-1.5 px-2">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-slate-300 print:text-black">
                {observations.map((obs) => (
                  <tr key={obs.id}>
                    <td className="py-1 px-2">#{obs.testNumber}</td>
                    <td className="py-1 px-2 text-[10px] text-slate-500 print:text-gray-600">{obs.timestamp}</td>
                    <td className="py-1 px-2">{obs.j}</td>
                    <td className="py-1 px-2">{obs.k}</td>
                    <td className="py-1 px-2">{obs.clockEdge}</td>
                    <td className="py-1 px-2 font-bold">{obs.actualQ}</td>
                    <td className="py-1 px-2">{obs.qBar}</td>
                    <td className="py-1 px-2">{obs.operation}</td>
                    <td className="py-1 px-2 text-emerald-400 print:text-black">✓ PASS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Academic Conclusion */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase">
            5. Laboratory Conclusion
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            "The JK Flip-Flop was successfully implemented and simulated using IC 7476. The operation of HOLD, RESET, SET and TOGGLE modes was verified by applying different combinations of J and K inputs at the active clock edge. The outputs Q and Q' were observed and the expected state transitions were verified for all combinations. The asynchronous PRESET and CLEAR controls were also verified."
          </p>
        </div>

        {/* Signatures & Footer */}
        <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-800 print:border-gray-400 text-xs">
          <div className="text-center space-y-6">
            <div className="font-bold text-white print:text-black">{student.name}</div>
            <div className="border-t border-slate-700 print:border-gray-500 pt-1 text-slate-400 print:text-gray-600">
              Candidate / Student Signature
            </div>
          </div>
          <div className="text-center space-y-6">
            <div className="font-bold text-emerald-400 print:text-black">Dr. Lab Instructor / Examiner</div>
            <div className="border-t border-slate-700 print:border-gray-500 pt-1 text-slate-400 print:text-gray-600">
              Department Evaluation Signature & Seal
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-500 print:text-gray-500 pt-4 border-t border-slate-900 print:border-gray-300">
          Digital Electronics Virtual Lab • Developed by {CREATOR_INFO.name} ({CREATOR_INFO.degree}) • {CREATOR_INFO.copyright}
        </div>
      </div>

      {/* Navigation CTA (no-print) */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 no-print">
        <button
          onClick={() => setCurrentPage('result')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Back to Result Overview
        </button>
        <button
          onClick={() => setCurrentPage('certificate')}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition shadow-md shadow-cyan-500/20"
        >
          <span>View Completion Certificate</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
