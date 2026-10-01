import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { CircuitCanvas } from '../workbench/CircuitCanvas';
import { LogicMonitor } from '../workbench/LogicMonitor';
import { COMPONENT_CATALOG } from '../../constants/componentsDef';
import { FaultType } from '../../types/lab';
import { 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Save, 
  Upload, 
  Trash2, 
  Undo2, 
  Redo2, 
  Zap, 
  Radio, 
  ShieldAlert, 
  ListChecks, 
  Sparkles,
  Camera,
  PlusCircle,
  Maximize2,
  Minimize2,
  GraduationCap,
  Wrench,
  Clock
} from 'lucide-react';

export const WorkbenchPage: React.FC = () => {
  const {
    addComponent,
    loadStandardSetup,
    clearCircuit,
    saveCircuitToStorage,
    loadCircuitFromStorage,
    lastSavedTime,
    undo,
    redo,
    canUndo,
    canRedo,
    validation,
    validateCircuit,
    pulseClock,
    resetLogicState,
    probeActive,
    setProbeActive,
    activeFault,
    injectFault,
    clearFault,
    tasks,
    toggleTask,
    completedTasksCount,
    setCurrentPage,
    currentQ,
    currentQBar,
    jLevel,
    kLevel,
    clkLevel,
    presetLevel,
    clearLevel,
    activeOperation,
    edgePulseActive,
    clockEdgeCount,
    learningMode,
    setLearningMode,
    educationalExplanation,
    addObservation,
    takeCircuitSnapshot,
    isFullscreenLab,
    toggleFullscreenLab,
    setShowResetConfirmModal
  } = useLab();

  const [showTasksModal, setShowTasksModal] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);

  return (
    <div className={`space-y-4 pb-12 ${isFullscreenLab ? 'p-2 max-w-full' : ''}`}>
      {/* 1. Permanent Live Circuit Status Header */}
      <div className="rounded-2xl border border-cyan-900/50 bg-slate-900/95 p-3.5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold border ${
              validation.isValid 
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' 
                : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
            }`}>
              {validation.isValid ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
              <span>CIRCUIT STATUS: {validation.isValid ? 'READY (100%)' : `${validation.percent}% WIRED`}</span>
            </div>

            {/* Live Clock Edge Counter */}
            <div className="hidden sm:flex items-center space-x-1 font-mono text-xs text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-500">CLOCK EDGES:</span>
              <span className="text-cyan-300 font-bold">#{clockEdgeCount}</span>
            </div>
          </div>

          {/* Node Level Matrix Header */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-mono">
            <span className={`px-2 py-0.5 rounded border ${validation.powerConnected ? 'bg-slate-950 text-emerald-300 border-emerald-500/30' : 'bg-rose-950/40 text-rose-300 border-rose-500/30'}`}>
              VCC: {validation.powerConnected ? '✓ 5V' : '0V'}
            </span>
            <span className={`px-2 py-0.5 rounded border ${validation.groundConnected ? 'bg-slate-950 text-emerald-300 border-emerald-500/30' : 'bg-rose-950/40 text-rose-300 border-rose-500/30'}`}>
              GND: {validation.groundConnected ? '✓ 0V' : 'FLT'}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
              J: <span className={jLevel ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{jLevel ? 'HIGH' : 'LOW'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
              K: <span className={kLevel ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{kLevel ? 'HIGH' : 'LOW'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
              CLK: <span className={clkLevel ? 'text-cyan-400 font-bold' : 'text-slate-400'}>{clkLevel ? 'HIGH' : 'LOW'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
              PRE': <span className={presetLevel === 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>{presetLevel ? 'HIGH' : 'LOW (ACT)'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
              CLR': <span className={clearLevel === 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>{clearLevel ? 'HIGH' : 'LOW (ACT)'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/40 text-emerald-300 font-bold">
              Q: {currentQ}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/40 text-cyan-300 font-bold">
              Q': {currentQBar}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Operation Indicator Banner (flashes on edge) */}
      <div className={`rounded-xl border p-3 flex flex-wrap items-center justify-between gap-3 transition-all duration-300 ${
        edgePulseActive 
          ? 'border-cyan-400 bg-cyan-950 text-cyan-100 shadow-xl shadow-cyan-500/30' 
          : 'border-slate-800 bg-slate-900/70 text-slate-300'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-black ${
            edgePulseActive ? 'bg-cyan-500 text-slate-950 animate-bounce' : 'bg-slate-800 text-cyan-400'
          }`}>
            ↓
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Armed Synchronous Mode:</span>
              <span className={`px-2 py-0.5 rounded font-mono text-xs font-black uppercase ${
                activeOperation === 'HOLD' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                activeOperation === 'RESET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                activeOperation === 'SET' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {activeOperation} (J={jLevel}, K={kLevel})
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Characteristic: Q(next) = J·Q' + K'·Q
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={addObservation}
            className="flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
          >
            <PlusCircle className="h-3.5 w-3.5 text-cyan-400" />
            <span>Add Observation</span>
          </button>
          <button
            onClick={takeCircuitSnapshot}
            className="flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
          >
            <Camera className="h-3.5 w-3.5 text-cyan-400" />
            <span>Take Snapshot</span>
          </button>
        </div>
      </div>

      {/* 3. Educational Learning Mode Explanation Panel (if enabled) */}
      {learningMode && (
        <div className="rounded-2xl border border-cyan-500/40 bg-cyan-950/20 p-4 space-y-1 text-xs animate-fade-in">
          <div className="flex items-center space-x-2 font-bold text-cyan-300 uppercase tracking-wider text-[10px]">
            <GraduationCap className="h-4 w-4" />
            <span>Educational Learning Mode Active</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
            {educationalExplanation}
          </p>
        </div>
      )}

      {/* 4. Primary Action Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-3 shadow-lg">
        {/* Left Action Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              validateCircuit();
              setShowValidationModal(true);
            }}
            className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow ${
              validation.isValid
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {validation.isValid ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>CIRCUIT READY (100%)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                <span>CHECK CIRCUIT ({validation.percent}%)</span>
              </>
            )}
          </button>

          <button
            onClick={pulseClock}
            className="flex items-center space-x-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>CLOCK PULSE (P)</span>
          </button>

          <button
            onClick={resetLogicState}
            title="Reset Logic (Key: R)"
            className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset State</span>
          </button>

          <button
            onClick={() => setProbeActive(!probeActive)}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-bold transition border ${
              probeActive
                ? 'border-cyan-400 bg-cyan-950 text-cyan-300 ring-2 ring-cyan-400'
                : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            <Radio className={`h-4 w-4 ${probeActive ? 'animate-pulse text-cyan-400' : ''}`} />
            <span>{probeActive ? 'PROBE ACTIVE' : 'LOGIC PROBE'}</span>
          </button>
        </div>

        {/* Right Tools Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 space-x-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <Redo2 className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={loadStandardSetup}
            className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Standard Setup</span>
          </button>

          <button
            onClick={saveCircuitToStorage}
            title="Save Circuit (Ctrl+S)"
            className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-cyan-300 transition"
          >
            <Save className="h-4 w-4" />
          </button>

          <button
            onClick={loadCircuitFromStorage}
            title="Load Circuit (Ctrl+L)"
            className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-cyan-300 transition"
          >
            <Upload className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowResetConfirmModal(true)}
            title="Reset Experiment"
            className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-rose-400 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreenLab}
            title={isFullscreenLab ? "Exit Fullscreen" : "Fullscreen Lab"}
            className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-cyan-300 transition"
          >
            {isFullscreenLab ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setShowTasksModal(true)}
            className="flex items-center space-x-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-900/50 transition"
          >
            <ListChecks className="h-4 w-4" />
            <span>Tasks ({completedTasksCount}/{tasks.length})</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Layout: Left Palette, Center Canvas, Right Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: Component Tray Palette */}
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Component Tray
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
              {COMPONENT_CATALOG.map((c) => (
                <button
                  key={c.type}
                  onClick={() => addComponent(c.type, 280, 180)}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-500/50 hover:bg-slate-850 hover:text-white transition text-left"
                >
                  <span className="truncate">{c.title}</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold ml-1">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Circuit Canvas */}
        <div className="lg:col-span-7 space-y-3">
          <CircuitCanvas />
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-2">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Wiring: Click source pin, then click destination pin.</span>
            </div>
            <div>
              <span>Drag components to move • Click wires to select & delete</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Logic Monitor */}
        <div className="lg:col-span-3">
          <LogicMonitor />
        </div>
      </div>

      {/* Circuit Validation Modal Dialog */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Circuit Connectivity Audit</h3>
              </div>
              <button
                onClick={() => setShowValidationModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4 border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Total Circuit Readiness</div>
                  <div className="text-2xl font-black font-mono text-white mt-0.5">
                    {validation.percent}%
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  validation.isValid
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                    : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                }`}>
                  {validation.isValid ? '✓ CIRCUIT READY' : 'CONNECTIONS INCOMPLETE'}
                </div>
              </div>

              {validation.messages.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Required Fixes ({validation.messages.length}):
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {validation.messages.map((m, idx) => (
                      <li key={idx} className="flex items-start space-x-2 rounded bg-slate-950/50 p-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>All 9 Electrical Nodes Successfully Verified!</span>
                  </div>
                  <p className="text-emerald-200/80">
                    Power rails (VCC/GND), data lines (J/K), clock synchronizer (CLK), asynchronous controls (PRE/CLR), and monitor LEDs (Q/Q') are fully operational.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-2 border-t border-slate-800 pt-3">
              <button
                onClick={() => setShowValidationModal(false)}
                className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                Return to Canvas
              </button>
              {validation.isValid && (
                <button
                  onClick={() => {
                    setShowValidationModal(false);
                    setCurrentPage('simulation');
                  }}
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                >
                  Proceed to Simulation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task Checklist Modal Dialog */}
      {showTasksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ListChecks className="h-5 w-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Laboratory Tasks Checklist</h3>
              </div>
              <button
                onClick={() => setShowTasksModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start space-x-3 rounded-xl border p-3 cursor-pointer transition ${
                    task.completed 
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-200' 
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <div>
                    <div className={`text-xs font-bold ${task.completed ? 'text-emerald-300' : 'text-slate-200'}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {task.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-800 pt-3">
              <button
                onClick={() => setShowTasksModal(false)}
                className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
              >
                Close Tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
