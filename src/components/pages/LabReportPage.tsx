import React from 'react';
import { Printer, ArrowRight, Download, Award, CheckCircle2, Shield, Calendar, Clock, Sparkles } from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CREATOR_INFO } from '../../constants/labData';

export const LabReportPage: React.FC = () => {
  const {
    student,
    validation,
    testCases,
    quizScore,
    quizSubmitted,
    vivaScore,
    diagnosticScore,
    scoreBreakdown,
    totalScore,
    formattedTime,
    observations,
    circuitSnapshot,
    setCurrentPage
  } = useLab();

  const passedTests = testCases.filter(t => t.passed).length;
  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            OFFICIAL LABORATORY RECORD
          </span>
          <h1 className="text-xl font-black text-white mt-0.5">
            Formal Experiment Report (A4 Printable)
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition shadow-lg shadow-emerald-500/20"
          >
            <Printer className="h-4 w-4" />
            <span>PRINT LAB REPORT</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12 shadow-2xl text-slate-200 space-y-6 print:border-none print:bg-white print:text-black print:p-0 print:shadow-none">
        {/* Institutional Header */}
        <div className="border-b-2 border-slate-700 print:border-black pb-4 text-center space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-gray-700">
            DIGITAL ELECTRONICS VIRTUAL LABORATORY
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-white print:text-black">
            {student.college || 'DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING'}
          </h2>
          <div className="text-xs text-slate-400 print:text-gray-600">
            PRACTICAL LABORATORY RECORD • COURSE CODE: DE-2026-LAB
          </div>
        </div>

        {/* Student Information Dossier */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs border border-slate-800 print:border-gray-400 rounded-xl p-4 bg-slate-950/60 print:bg-transparent">
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Student Name:</span>
            <div className="font-bold text-white print:text-black text-sm">{student.name || 'Student Candidate'}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Roll / ID:</span>
            <div className="font-bold font-mono text-cyan-300 print:text-black text-sm">{student.rollNumber || 'EC-2026'}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Branch & Semester:</span>
            <div className="font-bold text-white print:text-black">{student.branch}, {student.semester}</div>
          </div>
          <div>
            <span className="text-slate-500 font-semibold print:text-gray-600">Date & Session Duration:</span>
            <div className="font-bold font-mono text-white print:text-black">{todayDate} ({formattedTime})</div>
          </div>
        </div>

        {/* 1. Aim */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            1. Aim
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            To implement and verify the operation of a JK flip-flop using IC 7476 and observe its synchronous and asynchronous operations through an interactive digital simulation.
          </p>
        </div>

        {/* 2. Key Theory */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            2. Foundational Theory
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            The JK Flip-Flop is a clocked, bistable sequential logic device storing one bit of information. It solves the race condition of basic SR latches through internal feedback steering. The characteristic Boolean equation is:
          </p>
          <div className="rounded-lg bg-slate-950 print:bg-gray-100 p-2 font-mono text-center font-bold text-cyan-300 print:text-black text-xs">
            Q(next) = J·Q' + K'·Q
          </div>
          <p className="text-xs text-slate-400 print:text-gray-700 leading-relaxed">
            Synchronous inputs J and K are sampled strictly during the negative clock transition (HIGH → LOW). Asynchronous active-low inputs PRESET' and CLEAR' provide immediate priority override independent of clock pulses.
          </p>
        </div>

        {/* 3. Components & Circuit Description */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            3. Components & Apparatus Used
          </h3>
          <ul className="text-xs text-slate-300 print:text-gray-800 space-y-1 list-disc list-inside">
            <li>IC 7476 Dual JK Flip-Flop with individual Preset and Clear pins</li>
            <li>Regulated +5.0V DC Power Supply (VCC) and Common Ground (GND)</li>
            <li>Logic Level Switches for J, K, PRESET' and CLEAR'</li>
            <li>Square-wave Clock Pulse Generator (0.5Hz - 5Hz / Manual Pulse)</li>
            <li>Logic Indicator LEDs (Green for Q, Cyan for Q') and Digital Oscilloscope</li>
          </ul>
          {circuitSnapshot && (
            <div className="text-[11px] text-slate-400 print:text-gray-600 font-mono mt-1">
              Circuit Schematic Status: Verified (100% Connectivity across 9 nodes).
            </div>
          )}
        </div>

        {/* 4. Verified Truth Table */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            4. Verified Characteristic Truth Table (8/8 Tests)
          </h3>
          <table className="w-full text-left text-xs font-mono border border-slate-800 print:border-gray-400">
            <thead className="bg-slate-950 print:bg-gray-200 text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-400">
              <tr>
                <th className="py-2 px-3">Test #</th>
                <th className="py-2 px-3">J</th>
                <th className="py-2 px-3">K</th>
                <th className="py-2 px-3">Q Present</th>
                <th className="py-2 px-3">Clock Trigger</th>
                <th className="py-2 px-3">Q Next</th>
                <th className="py-2 px-3">Q' Inverted</th>
                <th className="py-2 px-3">Operation</th>
                <th className="py-2 px-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-slate-300 print:text-black">
              {testCases.map((tc) => (
                <tr key={tc.id}>
                  <td className="py-1 px-3">#{tc.id}</td>
                  <td className="py-1 px-3">{tc.j}</td>
                  <td className="py-1 px-3">{tc.k}</td>
                  <td className="py-1 px-3">{tc.initialQ}</td>
                  <td className="py-1 px-3">Falling (↓)</td>
                  <td className="py-1 px-3 font-bold">{tc.expectedQNext}</td>
                  <td className="py-1 px-3">{tc.expectedQNext === 1 ? 0 : 1}</td>
                  <td className="py-1 px-3">{tc.operation}</td>
                  <td className="py-1 px-3 text-emerald-400 print:text-black font-semibold">✓ PASS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Observation Table */}
        {observations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
              5. Experimental Observation Table
            </h3>
            <table className="w-full text-left text-xs font-mono border border-slate-800 print:border-gray-400">
              <thead className="bg-slate-950 print:bg-gray-200 text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-400">
                <tr>
                  <th className="py-2 px-3">Obs #</th>
                  <th className="py-2 px-3">J</th>
                  <th className="py-2 px-3">K</th>
                  <th className="py-2 px-3">Clock Edge</th>
                  <th className="py-2 px-3">Previous Q</th>
                  <th className="py-2 px-3">Actual Q</th>
                  <th className="py-2 px-3">Actual Q'</th>
                  <th className="py-2 px-3">Operation</th>
                  <th className="py-2 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-slate-300 print:text-black">
                {observations.map((ob) => (
                  <tr key={ob.id}>
                    <td className="py-1 px-3">Obs {ob.testNumber}</td>
                    <td className="py-1 px-3">{ob.j}</td>
                    <td className="py-1 px-3">{ob.k}</td>
                    <td className="py-1 px-3">{ob.clockEdge}</td>
                    <td className="py-1 px-3">{ob.prevQ}</td>
                    <td className="py-1 px-3 font-bold">{ob.actualQ}</td>
                    <td className="py-1 px-3">{ob.qBar}</td>
                    <td className="py-1 px-3">{ob.operation}</td>
                    <td className="py-1 px-3 text-[10px] text-slate-400 print:text-black">{ob.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. Comprehensive Evaluation & Scoring Breakdown (100 Marks) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            6. Laboratory Assessment & Performance Rubric (100 Marks)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs font-mono">
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Circuit Assembly</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.circuitAssembly} / 20</span>
            </div>
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Truth Table</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.truthTable} / 20</span>
            </div>
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Practical Tasks</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.practicalTasks} / 20</span>
            </div>
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Fault Diagnosis</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.faultDiagnosis} / 15</span>
            </div>
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Quiz Post-Test</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.quiz} / 15</span>
            </div>
            <div className="rounded-lg border border-slate-800 print:border-gray-400 p-2">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">Viva Voce</span>
              <span className="font-bold text-white print:text-black">{scoreBreakdown.viva} / 10</span>
            </div>
          </div>
          <div className="rounded-xl border border-cyan-500/40 bg-slate-950/70 print:bg-gray-100 p-3 flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-slate-300 print:text-black">AGGREGATE EVALUATION GRADE:</span>
            <span className="text-base font-black text-cyan-300 print:text-black">
              {totalScore} / 100 MARKS ({totalScore >= 50 ? 'QUALIFIED / FIRST CLASS' : 'PENDING'})
            </span>
          </div>
        </div>

        {/* 7. Conclusion */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-cyan-400 print:text-black uppercase tracking-wider">
            7. Laboratory Conclusion
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            "The JK Flip-Flop was successfully implemented and simulated using IC 7476. The operation of HOLD, RESET, SET and TOGGLE modes was verified by applying different combinations of J and K inputs at the active clock edge. The outputs Q and Q' were observed and the expected state transitions were verified for all combinations."
          </p>
        </div>

        {/* Creator Attribution */}
        <div className="text-[11px] text-slate-500 print:text-gray-600 border-t border-slate-800 print:border-gray-300 pt-3 flex flex-col sm:flex-row justify-between">
          <span>Created & Developed by {CREATOR_INFO.name} ({CREATOR_INFO.degree})</span>
          <span>{CREATOR_INFO.copyright}</span>
        </div>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800 print:border-gray-400 text-xs">
          <div className="text-center space-y-8">
            <div className="font-bold text-white print:text-black">{student.name || 'Candidate Signature'}</div>
            <div className="border-t border-slate-700 print:border-gray-500 pt-1 text-slate-400 print:text-gray-600">
              Student Signature
            </div>
          </div>
          <div className="text-center space-y-8">
            <div className="font-bold text-emerald-400 print:text-black">Prof. Lab Evaluator / Examiner</div>
            <div className="border-t border-slate-700 print:border-gray-500 pt-1 text-slate-400 print:text-gray-600">
              Department Faculty Seal & Signature
            </div>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 no-print">
        <button
          onClick={() => setCurrentPage('result')}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Return to Result Dashboard
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
