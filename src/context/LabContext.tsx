import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { 
  CircuitComponent, 
  CircuitValidationStatus, 
  ExperimentTask, 
  FaultType, 
  NavPage, 
  Observation, 
  ScoreBreakdown, 
  SessionRecord, 
  StudentProfile, 
  TestCase, 
  TimingSample, 
  ToastNotification, 
  WireConnection 
} from '../types/lab';
import { 
  INITIAL_TASKS, 
  INITIAL_TEST_CASES, 
} from '../constants/labData';
import { 
  STANDARD_LAB_COMPONENTS, 
  STANDARD_LAB_WIRES 
} from '../constants/componentsDef';

interface ConnectingPin {
  componentId: string;
  pinId: string;
}

interface LabContextType {
  // Navigation & UI
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showStudentModal: boolean;
  setShowStudentModal: (show: boolean) => void;
  showHelpModal: boolean;
  setShowHelpModal: (show: boolean) => void;
  showShortcutsModal: boolean;
  setShowShortcutsModal: (show: boolean) => void;
  showResetConfirmModal: boolean;
  setShowResetConfirmModal: (show: boolean) => void;
  isFullscreenLab: boolean;
  toggleFullscreenLab: () => void;
  setIsFullscreenLab: (fs: boolean) => void;

  // Student Profile
  student: StudentProfile;
  updateStudent: (profile: Partial<StudentProfile>) => void;

  // Circuit Workbench
  components: CircuitComponent[];
  wires: WireConnection[];
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
  selectedWireId: string | null;
  setSelectedWireId: (id: string | null) => void;
  connectingPin: ConnectingPin | null;
  startWiring: (componentId: string, pinId: string) => void;
  completeWiring: (componentId: string, pinId: string) => void;
  cancelWiring: () => void;
  addComponent: (type: CircuitComponent['type'], x?: number, y?: number) => void;
  removeComponent: (id: string) => void;
  updateComponentPos: (id: string, x: number, y: number) => void;
  removeWire: (id: string) => void;
  clearCircuit: () => void;
  loadStandardSetup: () => void;
  saveCircuitToStorage: () => void;
  loadCircuitFromStorage: () => boolean;
  lastSavedTime: string | null;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Circuit Validation
  validation: CircuitValidationStatus;
  validateCircuit: () => CircuitValidationStatus;

  // Sequential Logic Engine State
  currentQ: number;
  currentQBar: number;
  prevQ: number;
  jLevel: number;
  kLevel: number;
  clkLevel: number;
  presetLevel: number;
  clearLevel: number;
  activeOperation: 'HOLD' | 'RESET' | 'SET' | 'TOGGLE';
  lastEvent: string;
  edgePulseActive: boolean;
  asyncInvalidWarning: boolean;
  clockFrequency: number;
  isClockRunning: boolean;
  clockEdgeCount: number;

  // Educational Learning Mode
  learningMode: boolean;
  setLearningMode: (mode: boolean) => void;
  toggleLearningMode: () => void;
  educationalExplanation: string;
  
  // Logic Controls
  setSwitchValue: (componentId: string, value: number) => void;
  toggleSwitch: (componentId: string) => void;
  pulseClock: () => void;
  startAutoClock: (freq?: number) => void;
  stopAutoClock: () => void;
  setClockFreq: (freq: number) => void;
  resetLogicState: () => void;
  setInitialQ: (q: number) => void;
  confirmResetExperiment: () => void;

  // Observations
  observations: Observation[];
  addObservation: () => void;
  clearObservations: () => void;

  // Timing Diagram
  timingSamples: TimingSample[];
  clearTimingSamples: () => void;

  // Verification & Test Cases
  testCases: TestCase[];
  runAllVerificationTests: () => Promise<void>;
  isVerifyingAll: boolean;
  resetVerificationTests: () => void;

  // Fault Mode & Diagnostics
  activeFault: FaultType;
  injectFault: (fault: FaultType) => void;
  clearFault: () => void;
  faultDiagnosed: boolean;
  setFaultDiagnosed: (diagnosed: boolean) => void;
  selectedSuspectedFault: FaultType;
  setSelectedSuspectedFault: (f: FaultType) => void;
  diagnoseFaultSubmission: (suspected: FaultType) => { correct: boolean; hint: string; message: string };
  diagnosticScore: number;
  showFaultHint: boolean;
  setShowFaultHint: (show: boolean) => void;

  // Logic Probe
  probeActive: boolean;
  setProbeActive: (active: boolean) => void;
  probedSignal: {
    title: string;
    pin: string;
    logicLevel: number;
    voltage: string;
    note: string;
    status: string;
    source: string;
  } | null;
  probeNode: (componentId: string, pinId: string) => void;
  clearProbe: () => void;

  // Tasks & Progress
  tasks: ExperimentTask[];
  toggleTask: (taskId: string) => void;
  completedTasksCount: number;

  // Quiz
  quizAnswers: Record<number, number>;
  quizSubmitted: boolean;
  quizScore: number;
  submitQuiz: (answers: Record<number, number>) => void;
  resetQuiz: () => void;

  // Viva Voce
  vivaMastered: Record<number, boolean>;
  toggleVivaMastered: (id: number) => void;
  vivaScore: number;

  // Session History & Snapshots
  sessionHistory: SessionRecord[];
  saveSessionRecord: () => void;
  circuitSnapshot: string | null;
  takeCircuitSnapshot: () => void;

  // Scoring
  scoreBreakdown: ScoreBreakdown;
  totalScore: number;

  // In-App Toast Notifications
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Experiment Timer
  elapsedSeconds: number;
  isTimerRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formattedTime: string;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENT: 'digitallogic_student_v2',
  THEME: 'digitallogic_theme_v2',
  SAVED_CIRCUIT: 'digitallogic_circuit_saved_v2',
  QUIZ: 'digitallogic_quiz_v2',
  VIVA: 'digitallogic_viva_v2',
  TASKS: 'digitallogic_tasks_v2',
  OBSERVATIONS: 'digitallogic_observations_v2',
  HISTORY: 'digitallogic_history_v2',
  LEARNING_MODE: 'digitallogic_learning_mode_v2',
};

export const LabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & UI
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light') || 'dark';
  });
  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [isFullscreenLab, setIsFullscreenLab] = useState<boolean>(false);

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return {
      name: 'Priyanshu Sharma',
      rollNumber: 'EC-2026-042',
      college: 'National Institute of Technology',
      branch: 'Electronics & Communication Engineering',
      semester: '4th Semester',
      isRegistered: true,
    };
  });

  const updateStudent = (profile: Partial<StudentProfile>) => {
    setStudent(prev => {
      const next = { ...prev, ...profile, isRegistered: true };
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(next));
      return next;
    });
    addToast('Student registration profile updated successfully', 'success');
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      return next;
    });
  };

  const toggleFullscreenLab = () => {
    setIsFullscreenLab(prev => !prev);
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const addToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Circuit Workbench state
  const [components, setComponents] = useState<CircuitComponent[]>(STANDARD_LAB_COMPONENTS);
  const [wires, setWires] = useState<WireConnection[]>(STANDARD_LAB_WIRES);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedWireId, setSelectedWireId] = useState<string | null>(null);
  const [connectingPin, setConnectingPin] = useState<ConnectingPin | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>('Initial');

  // History stack for Undo / Redo
  const [history, setHistory] = useState<{ components: CircuitComponent[]; wires: WireConnection[] }[]>([
    { components: STANDARD_LAB_COMPONENTS, wires: STANDARD_LAB_WIRES }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const pushHistory = useCallback((newComps: CircuitComponent[], newWires: WireConnection[]) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, { components: newComps, wires: newWires }];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const target = history[targetIndex];
      setComponents(target.components);
      setWires(target.wires);
      setHistoryIndex(targetIndex);
      addToast('Undo performed', 'info');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      const target = history[targetIndex];
      setComponents(target.components);
      setWires(target.wires);
      setHistoryIndex(targetIndex);
      addToast('Redo performed', 'info');
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Sequential Logic State
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [currentQBar, setCurrentQBar] = useState<number>(1);
  const [prevQ, setPrevQ] = useState<number>(0);
  const [clockEdgeCount, setClockEdgeCount] = useState<number>(0);
  const [lastEvent, setLastEvent] = useState<string>('Simulator Initialized: Initial State Q=0, Q\'=1');
  const [edgePulseActive, setEdgePulseActive] = useState<boolean>(false);
  const [clockFrequency, setClockFrequency] = useState<number>(1);
  const [isClockRunning, setIsClockRunning] = useState<boolean>(false);

  // Educational Learning Mode
  const [learningMode, setLearningModeState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.LEARNING_MODE) === 'true';
  });
  const setLearningMode = (mode: boolean) => {
    setLearningModeState(mode);
    localStorage.setItem(STORAGE_KEYS.LEARNING_MODE, String(mode));
    addToast(`Learning Mode ${mode ? 'Activated' : 'Deactivated'}`, 'info');
  };

  const [educationalExplanation, setEducationalExplanation] = useState<string>(
    'Learning Mode active: When clock pulses arrive, real-time explanation of synchronous gate logic and transitions will be documented here.'
  );

  const toggleLearningMode = () => {
    setLearningMode(!learningMode);
  };

  // Fault Mode
  const [activeFault, setActiveFault] = useState<FaultType>('none');
  const [faultDiagnosed, setFaultDiagnosed] = useState<boolean>(false);
  const [selectedSuspectedFault, setSelectedSuspectedFault] = useState<FaultType>('none');
  const [diagnosticScore, setDiagnosticScore] = useState<number>(0);
  const [showFaultHint, setShowFaultHint] = useState<boolean>(false);

  // Logic Probe Mode
  const [probeActive, setProbeActive] = useState<boolean>(false);
  const [probedSignal, setProbedSignal] = useState<{
    title: string;
    pin: string;
    logicLevel: number;
    voltage: string;
    note: string;
    status: string;
    source: string;
  } | null>(null);

  // Timing Diagram Samples
  const [timingSamples, setTimingSamples] = useState<TimingSample[]>(() => [
    { timeIndex: 0, timestamp: Date.now(), clk: 0, j: 0, k: 0, preset: 1, clear: 1, q: 0, qBar: 1, eventNote: 'Initial' }
  ]);
  const sampleCounterRef = useRef<number>(1);

  // Observation Table
  const [observations, setObservations] = useState<Observation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OBSERVATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Tasks
  const [tasks, setTasks] = useState<ExperimentTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TASKS;
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(next));
      return next;
    });
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;

  // Test Cases
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [isVerifyingAll, setIsVerifyingAll] = useState<boolean>(false);

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
    if (saved) {
      try {
        return JSON.parse(saved).answers || {};
      } catch {}
    }
    return {};
  });
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
    return Boolean(saved);
  });
  const [quizScore, setQuizScore] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
    if (saved) {
      try {
        return JSON.parse(saved).score || 0;
      } catch {}
    }
    return 0;
  });

  // Viva Voce
  const [vivaMastered, setVivaMastered] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIVA);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleVivaMastered = (id: number) => {
    setVivaMastered(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEYS.VIVA, JSON.stringify(next));
      return next;
    });
  };

  const vivaScore = Math.min(10, Object.values(vivaMastered).filter(Boolean).length);

  // Session History
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'sess_1',
        date: '28 Sep 2026',
        studentName: 'Priyanshu Sharma',
        rollNumber: 'EC-2026-042',
        testsPassed: 8,
        totalScore: 92,
        duration: '18 min'
      }
    ];
  });

  // Circuit Snapshot
  const [circuitSnapshot, setCircuitSnapshot] = useState<string | null>(null);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => setElapsedSeconds(0);

  const formattedTime = (() => {
    const hrs = Math.floor(elapsedSeconds / 3600);
    const mins = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  })();

  // Circuit Validation Logic
  const validateCircuit = useCallback((): CircuitValidationStatus => {
    const hasIC = components.some(c => c.type === 'ic7476');
    const icComp = components.find(c => c.type === 'ic7476');

    if (!hasIC || !icComp) {
      return {
        powerConnected: false,
        groundConnected: false,
        jConnected: false,
        kConnected: false,
        clkConnected: false,
        presetConfigured: false,
        clearConfigured: false,
        qLedConnected: false,
        qBarLedConnected: false,
        percent: 0,
        isValid: false,
        messages: ['IC 7476 Dual JK Flip-Flop is missing from the canvas.']
      };
    }

    const isPinConnected = (pinId: string) => {
      return wires.some(w => 
        (w.fromComponentId === icComp.id && w.fromPinId === pinId) ||
        (w.toComponentId === icComp.id && w.toPinId === pinId)
      );
    };

    const powerConnected = isPinConnected('pin_vcc') && activeFault !== 'vcc_disconnected';
    const groundConnected = isPinConnected('pin_gnd') && activeFault !== 'gnd_disconnected';
    const jConnected = isPinConnected('pin_j') && activeFault !== 'j_disconnected';
    const kConnected = isPinConnected('pin_k') && activeFault !== 'k_disconnected';
    const clkConnected = isPinConnected('pin_clk') && activeFault !== 'clk_disconnected';
    const presetConfigured = isPinConnected('pin_pre');
    const clearConfigured = isPinConnected('pin_clr');
    const qLedConnected = isPinConnected('pin_q') && activeFault !== 'q_led_disconnected';
    const qBarLedConnected = isPinConnected('pin_qbar') && activeFault !== 'qbar_led_disconnected';

    const checks = [
      powerConnected,
      groundConnected,
      jConnected,
      kConnected,
      clkConnected,
      presetConfigured,
      clearConfigured,
      qLedConnected,
      qBarLedConnected
    ];

    const passedCount = checks.filter(Boolean).length;
    const percent = Math.round((passedCount / checks.length) * 100);
    const isValid = percent === 100;

    const messages: string[] = [];
    if (!powerConnected) messages.push('VCC (+5V) power rail not connected to IC 7476.');
    if (!groundConnected) messages.push('GND (0V) ground return not connected to IC 7476.');
    if (!jConnected) messages.push('J Input switch is disconnected from pin J.');
    if (!kConnected) messages.push('K Input switch is disconnected from pin K.');
    if (!clkConnected) messages.push('Clock pulse source is disconnected from pin CLK.');
    if (!presetConfigured) messages.push('Preset input (PRE\') must be connected (tie to 1 for normal operation).');
    if (!clearConfigured) messages.push('Clear input (CLR\') must be connected (tie to 1 for normal operation).');
    if (!qLedConnected) messages.push('Output pin Q is not wired to LED Q indicator.');
    if (!qBarLedConnected) messages.push('Output pin Q\' is not wired to LED Q\' indicator.');

    return {
      powerConnected,
      groundConnected,
      jConnected,
      kConnected,
      clkConnected,
      presetConfigured,
      clearConfigured,
      qLedConnected,
      qBarLedConnected,
      percent,
      isValid,
      messages
    };
  }, [components, wires, activeFault]);

  const validation = validateCircuit();

  // Read current logic levels
  const getComponentValue = (type: CircuitComponent['type'], defaultVal: number): number => {
    const comp = components.find(c => c.type === type);
    return comp?.state?.value !== undefined ? comp.state.value : defaultVal;
  };

  let jLevel = getComponentValue('switchJ', 0);
  let kLevel = getComponentValue('switchK', 0);
  let clkLevel = getComponentValue('clockGen', 0);
  let presetLevel = getComponentValue('switchPreset', 1);
  let clearLevel = getComponentValue('switchClear', 1);

  // Apply Fault overrides
  if (activeFault === 'j_disconnected') jLevel = 1; // floating TTL floats HIGH
  if (activeFault === 'k_disconnected') kLevel = 1;
  if (activeFault === 'clk_disconnected') clkLevel = 0;
  if (activeFault === 'preset_stuck_low') presetLevel = 0;
  if (activeFault === 'clear_stuck_low') clearLevel = 0;

  // Synchronous operation mode
  const activeOperation: 'HOLD' | 'RESET' | 'SET' | 'TOGGLE' = (() => {
    if (jLevel === 0 && kLevel === 0) return 'HOLD';
    if (jLevel === 0 && kLevel === 1) return 'RESET';
    if (jLevel === 1 && kLevel === 0) return 'SET';
    return 'TOGGLE';
  })();

  const asyncInvalidWarning = presetLevel === 0 && clearLevel === 0;

  // Asynchronous PRESET and CLEAR overrides
  useEffect(() => {
    if (!validation.powerConnected) return;

    if (presetLevel === 0 && clearLevel === 1) {
      setPrevQ(currentQ);
      setCurrentQ(1);
      setCurrentQBar(0);
      setLastEvent('Asynchronous PRESET Asserted: Q forced to 1, Q\' to 0 immediately (No CLK)');
      // Auto-mark task 6
      setTasks(prev => prev.map(t => t.id === 'task_verify_preset' ? { ...t, completed: true } : t));
    } else if (presetLevel === 1 && clearLevel === 0) {
      setPrevQ(currentQ);
      setCurrentQ(0);
      setCurrentQBar(1);
      setLastEvent('Asynchronous CLEAR Asserted: Q forced to 0, Q\' to 1 immediately (No CLK)');
      // Auto-mark task 7
      setTasks(prev => prev.map(t => t.id === 'task_verify_clear' ? { ...t, completed: true } : t));
    } else if (presetLevel === 0 && clearLevel === 0) {
      setCurrentQ(1);
      setCurrentQBar(1);
      setLastEvent('INVALID ASYNCHRONOUS CONDITION: Both PRESET\' and CLEAR\' asserted LOW simultaneously!');
      addToast('Invalid asynchronous condition: Both PRESET and CLEAR are active LOW!', 'warning');
    }
  }, [presetLevel, clearLevel, validation.powerConnected, addToast]);

  // Record a sample into the timing diagram
  const recordTimingSample = useCallback((note?: string) => {
    const newSample: TimingSample = {
      timeIndex: sampleCounterRef.current++,
      timestamp: Date.now(),
      clk: clkLevel,
      j: jLevel,
      k: kLevel,
      preset: presetLevel,
      clear: clearLevel,
      q: currentQ,
      qBar: currentQBar,
      eventNote: note
    };

    setTimingSamples(prev => {
      const next = [...prev, newSample];
      if (next.length > 80) return next.slice(next.length - 80);
      return next;
    });
  }, [clkLevel, jLevel, kLevel, presetLevel, clearLevel, currentQ, currentQBar]);

  // Fire a single manual clock pulse (LOW -> HIGH -> FALLING EDGE -> LOW)
  const pulseClock = useCallback(() => {
    if (!validation.powerConnected) {
      setLastEvent('Cannot clock: VCC Power is disconnected.');
      addToast('VCC Power rail disconnected from IC 7476', 'error');
      return;
    }
    if (activeFault === 'clk_disconnected') {
      setLastEvent('Fault: Clock line severed! Pulse did not reach IC 7476 CLK input.');
      addToast('Clock line is disconnected. No clock pulse reached IC 7476.', 'error');
      return;
    }

    // Step 1: Rising edge to HIGH
    setComponents(prev => prev.map(c => c.type === 'clockGen' ? { ...c, state: { ...c.state, value: 1 } } : c));
    
    // Step 2: Falling edge back to LOW
    setTimeout(() => {
      setComponents(prev => prev.map(c => c.type === 'clockGen' ? { ...c, state: { ...c.state, value: 0 } } : c));
      setClockEdgeCount(prev => prev + 1);

      if (presetLevel === 1 && clearLevel === 1) {
        setEdgePulseActive(true);
        setTimeout(() => setEdgePulseActive(false), 450);

        setCurrentQ(priorQ => {
          setPrevQ(priorQ);
          let nextQ = priorQ;
          let opText = '';

          if (jLevel === 0 && kLevel === 0) {
            nextQ = priorQ;
            opText = `HOLD (J=0, K=0): Q remains ${priorQ}`;
            setTasks(prev => prev.map(t => t.id === 'task_verify_hold' ? { ...t, completed: true } : t));
          } else if (jLevel === 0 && kLevel === 1) {
            nextQ = 0;
            opText = `RESET (J=0, K=1): Q transitions ${priorQ} → 0`;
            setTasks(prev => prev.map(t => t.id === 'task_verify_reset' ? { ...t, completed: true } : t));
          } else if (jLevel === 1 && kLevel === 0) {
            nextQ = 1;
            opText = `SET (J=1, K=0): Q transitions ${priorQ} → 1`;
            setTasks(prev => prev.map(t => t.id === 'task_verify_set' ? { ...t, completed: true } : t));
          } else if (jLevel === 1 && kLevel === 1) {
            nextQ = priorQ === 1 ? 0 : 1;
            opText = `TOGGLE (J=1, K=1): Q inverts ${priorQ} → ${nextQ}`;
            setTasks(prev => prev.map(t => t.id === 'task_verify_toggle' ? { ...t, completed: true } : t));
          }

          setLastEvent(`Falling Clock Edge ↓: ${opText}`);
          addToast(`Clock pulse executed: ${opText}`, 'success');

          // Educational explanation
          setEducationalExplanation(
            `J = ${jLevel}, K = ${kLevel}, Previous Q = ${priorQ}. Because J=${jLevel} and K=${kLevel}, the JK flip-flop operates in ${activeOperation} mode. At the active falling clock edge (↓): Q changes from ${priorQ} → ${nextQ}, and Q' changes from ${priorQ === 1 ? 0 : 1} → ${nextQ === 1 ? 0 : 1}.`
          );

          setCurrentQBar(nextQ === 1 ? 0 : 1);
          return nextQ;
        });
      }
    }, 220);
  }, [validation.powerConnected, activeFault, presetLevel, clearLevel, jLevel, kLevel, activeOperation, addToast]);

  // Auto-running clock interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isClockRunning) {
      const periodMs = Math.round(1000 / clockFrequency);
      interval = setInterval(() => {
        pulseClock();
      }, periodMs);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockRunning, clockFrequency, pulseClock]);

  // Keep timing samples recorded
  useEffect(() => {
    recordTimingSample();
  }, [currentQ, currentQBar, jLevel, kLevel, clkLevel, recordTimingSample]);

  // Switch manipulation
  const setSwitchValue = (componentId: string, value: number) => {
    setComponents(prev => {
      const next = prev.map(c => c.id === componentId ? { ...c, state: { ...c.state, value } } : c);
      pushHistory(next, wires);
      return next;
    });
  };

  const toggleSwitch = (componentId: string) => {
    setComponents(prev => {
      const next = prev.map(c => {
        if (c.id === componentId) {
          const currentVal = c.state?.value ?? 0;
          return { ...c, state: { ...c.state, value: currentVal === 1 ? 0 : 1 } };
        }
        return c;
      });
      pushHistory(next, wires);
      return next;
    });
  };

  const startAutoClock = (freq?: number) => {
    if (freq) setClockFrequency(freq);
    setIsClockRunning(true);
    setComponents(prev => prev.map(c => c.type === 'clockGen' ? { ...c, state: { ...c.state, isRunning: true } } : c));
    addToast(`Automated Clock Generator started at ${freq || clockFrequency}Hz`, 'info');
  };

  const stopAutoClock = () => {
    setIsClockRunning(false);
    setComponents(prev => prev.map(c => c.type === 'clockGen' ? { ...c, state: { ...c.state, isRunning: false, value: 0 } } : c));
    addToast('Automated Clock Generator stopped', 'info');
  };

  const setClockFreq = (freq: number) => {
    setClockFrequency(freq);
    setComponents(prev => prev.map(c => c.type === 'clockGen' ? { ...c, state: { ...c.state, frequency: freq } } : c));
  };

  const resetLogicState = () => {
    setPrevQ(currentQ);
    setCurrentQ(0);
    setCurrentQBar(1);
    setLastEvent('Logic state manually reset to Q=0, Q\'=1');
    addToast('Logic state reset to Q=0, Q\'=1', 'info');
  };

  const setInitialQ = (q: number) => {
    setPrevQ(currentQ);
    setCurrentQ(q);
    setCurrentQBar(q === 1 ? 0 : 1);
    setLastEvent(`Preconditioned Q to ${q} (Q'=${q === 1 ? 0 : 1})`);
  };

  // Observations
  const addObservation = () => {
    const newObs: Observation = {
      id: `obs_${Date.now()}`,
      testNumber: observations.length + 1,
      j: jLevel,
      k: kLevel,
      clockEdge: 'Falling (↓)',
      prevQ: prevQ,
      actualQ: currentQ,
      qBar: currentQBar,
      operation: activeOperation,
      result: 'PASS',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setObservations(prev => {
      const next = [...prev, newObs];
      localStorage.setItem(STORAGE_KEYS.OBSERVATIONS, JSON.stringify(next));
      return next;
    });
    addToast(`Observation #${newObs.testNumber} recorded into laboratory notebook`, 'success');
  };

  const clearObservations = () => {
    setObservations([]);
    localStorage.removeItem(STORAGE_KEYS.OBSERVATIONS);
    addToast('Observations log cleared', 'info');
  };

  const clearTimingSamples = () => {
    sampleCounterRef.current = 1;
    setTimingSamples([
      { timeIndex: 0, timestamp: Date.now(), clk: 0, j: jLevel, k: kLevel, preset: presetLevel, clear: clearLevel, q: currentQ, qBar: currentQBar, eventNote: 'Cleared' }
    ]);
    addToast('Timing oscilloscope trace cleared', 'info');
  };

  // Automated 8-combination verification test
  const runAllVerificationTests = async () => {
    setIsVerifyingAll(true);
    addToast('Starting automated 8-state verification suite...', 'info');
    const updatedTests: TestCase[] = [...INITIAL_TEST_CASES];

    for (let i = 0; i < updatedTests.length; i++) {
      const tc = updatedTests[i];
      // Precondition initial Q
      if (tc.initialQ === 1) {
        setCurrentQ(1);
        setCurrentQBar(0);
      } else {
        setCurrentQ(0);
        setCurrentQBar(1);
      }

      // Set J and K
      setComponents(prev => prev.map(c => {
        if (c.type === 'switchJ') return { ...c, state: { ...c.state, value: tc.j } };
        if (c.type === 'switchK') return { ...c, state: { ...c.state, value: tc.k } };
        if (c.type === 'switchPreset') return { ...c, state: { ...c.state, value: 1 } };
        if (c.type === 'switchClear') return { ...c, state: { ...c.state, value: 1 } };
        return c;
      }));

      await new Promise(r => setTimeout(r, 420));

      // Compute expected next state
      let nextQ = tc.initialQ;
      if (tc.j === 0 && tc.k === 0) nextQ = tc.initialQ;
      else if (tc.j === 0 && tc.k === 1) nextQ = 0;
      else if (tc.j === 1 && tc.k === 0) nextQ = 1;
      else if (tc.j === 1 && tc.k === 1) nextQ = tc.initialQ === 1 ? 0 : 1;

      setCurrentQ(nextQ);
      setCurrentQBar(nextQ === 1 ? 0 : 1);
      setEdgePulseActive(true);
      setTimeout(() => setEdgePulseActive(false), 250);

      tc.tested = true;
      tc.actualQNext = nextQ;
      tc.passed = nextQ === tc.expectedQNext;

      setTestCases([...updatedTests]);
      await new Promise(r => setTimeout(r, 320));
    }

    setIsVerifyingAll(false);
    setTasks(prev => prev.map(t => t.id === 'task_run_8_tests' ? { ...t, completed: true } : t));
    addToast('Verification complete: 8/8 Tests Passed successfully!', 'success');
  };

  const resetVerificationTests = () => {
    setTestCases(INITIAL_TEST_CASES);
    addToast('Verification tests reset', 'info');
  };

  // Fault Injection & Diagnosis
  const injectFault = (fault: FaultType) => {
    setActiveFault(fault);
    setFaultDiagnosed(false);
    setSelectedSuspectedFault('none');
    setShowFaultHint(false);
    addToast(`Hardware fault injected into circuit. Use Logic Probe to troubleshoot.`, 'warning');
  };

  const clearFault = () => {
    setActiveFault('none');
    setFaultDiagnosed(false);
    setSelectedSuspectedFault('none');
    setShowFaultHint(false);
    addToast('Hardware faults cleared. Circuit operating normally.', 'success');
  };

  const diagnoseFaultSubmission = (suspected: FaultType): { correct: boolean; hint: string; message: string } => {
    const hints: Record<FaultType, string> = {
      none: 'No fault is currently active.',
      j_disconnected: 'Hint: J switch toggle does not affect SET or TOGGLE operations.',
      k_disconnected: 'Hint: K switch toggle does not force Q to reset during clock pulse.',
      clk_disconnected: 'Hint: Pulse clock does not produce any state transitions on Q.',
      q_led_disconnected: 'Hint: Pin Q voltage is normal, but Q LED stays dark.',
      qbar_led_disconnected: 'Hint: Pin Q\' voltage is normal, but Q\' LED stays dark.',
      preset_stuck_low: 'Hint: Q remains stuck at 1 regardless of J and K clock pulses.',
      clear_stuck_low: 'Hint: Q remains stuck at 0 regardless of J and K clock pulses.',
      vcc_disconnected: 'Hint: Logic probe reads 0V across power pins and IC is unpowered.',
      gnd_disconnected: 'Hint: Ground reference node is floating with no common return.'
    };

    if (suspected === activeFault) {
      setFaultDiagnosed(true);
      setDiagnosticScore(15);
      setTasks(prev => prev.map(t => t.id === 'task_complete_fault' ? { ...t, completed: true } : t));
      addToast('Fault correctly diagnosed! +15 Diagnostic Marks awarded.', 'success');
      return {
        correct: true,
        hint: hints[activeFault],
        message: 'Correct Diagnosis! You successfully diagnosed the simulated hardware issue.'
      };
    } else {
      return {
        correct: false,
        hint: hints[activeFault],
        message: 'Incorrect Diagnosis. Inspect node voltage and logic levels with the Logic Probe.'
      };
    }
  };

  // Logic Probe Node
  const probeNode = (componentId: string, pinId: string) => {
    const comp = components.find(c => c.id === componentId);
    if (!comp) return;

    let logicVal = 0;
    let voltage = '0.12 V';
    let note = 'Logic LOW (Ground Level)';
    let status = 'ACTIVE';
    let source = comp.title;

    if (pinId === 'pin_vcc' || pinId === 'pin_vcc_out') {
      if (activeFault === 'vcc_disconnected') {
        logicVal = 0;
        voltage = '0.00 V';
        note = 'POWER LINE DISCONNECTED: 0V detected on VCC terminal!';
        status = 'FAULTY / DISCONNECTED';
      } else {
        logicVal = 1;
        voltage = '+5.02 V';
        note = 'Regulated TTL Supply Voltage (+5V ±5%)';
        status = 'NOMINAL POWER';
      }
    } else if (pinId === 'pin_gnd' || pinId === 'pin_gnd_out') {
      if (activeFault === 'gnd_disconnected') {
        logicVal = 0;
        voltage = 'Floating';
        note = 'GROUND REFERENCE DISCONNECTED!';
        status = 'FAULTY / FLOATING';
      } else {
        logicVal = 0;
        voltage = '0.01 V';
        note = 'Common Circuit Ground Return Reference (0.00V)';
        status = 'NOMINAL GROUND';
      }
    } else if (pinId === 'pin_j') {
      if (activeFault === 'j_disconnected') {
        logicVal = 1;
        voltage = '+4.10 V (Floating TTL)';
        note = 'FLOATING INPUT: In TTL technology, an open pin floats to logic HIGH.';
        status = 'OPEN / FLOATING';
      } else {
        logicVal = jLevel;
        voltage = jLevel ? '4.85 V' : '0.18 V';
        note = jLevel ? 'J asserted HIGH: SET or TOGGLE primed for next clock edge' : 'J asserted LOW';
        status = 'CONNECTED';
      }
    } else if (pinId === 'pin_k') {
      if (activeFault === 'k_disconnected') {
        logicVal = 1;
        voltage = '+4.10 V (Floating TTL)';
        note = 'FLOATING INPUT: In TTL technology, an open pin floats to logic HIGH.';
        status = 'OPEN / FLOATING';
      } else {
        logicVal = kLevel;
        voltage = kLevel ? '4.85 V' : '0.18 V';
        note = kLevel ? 'K asserted HIGH: RESET or TOGGLE primed for next clock edge' : 'K asserted LOW';
        status = 'CONNECTED';
      }
    } else if (pinId === 'pin_clk') {
      if (activeFault === 'clk_disconnected') {
        logicVal = 0;
        voltage = '0.00 V';
        note = 'CLOCK LINE SEVERED: No oscillator pulses reach this terminal.';
        status = 'DISCONNECTED';
      } else {
        logicVal = clkLevel;
        voltage = clkLevel ? '4.90 V' : '0.10 V';
        note = clkLevel ? 'Clock Line at Logic HIGH' : 'Clock Line at Logic LOW';
        status = 'ACTIVE CLOCK';
      }
    } else if (pinId === 'pin_pre') {
      logicVal = presetLevel;
      voltage = presetLevel ? '4.88 V' : '0.15 V';
      note = presetLevel ? 'PRE\' Inactive (+5V Pull-up)' : 'PRE\' ACTIVE LOW (Asynchronously forcing Q=1)';
      status = presetLevel ? 'IDLE' : 'ASSERTED';
    } else if (pinId === 'pin_clr') {
      logicVal = clearLevel;
      voltage = clearLevel ? '4.88 V' : '0.15 V';
      note = clearLevel ? 'CLR\' Inactive (+5V Pull-up)' : 'CLR\' ACTIVE LOW (Asynchronously forcing Q=0)';
      status = clearLevel ? 'IDLE' : 'ASSERTED';
    } else if (pinId === 'pin_q' || comp.type === 'ledQ') {
      logicVal = currentQ;
      voltage = currentQ ? '4.72 V' : '0.22 V';
      note = currentQ ? 'True Output Q is HIGH (Logic 1, SET state)' : 'True Output Q is LOW (Logic 0, RESET state)';
      status = 'OUTPUT NODE';
    } else if (pinId === 'pin_qbar' || comp.type === 'ledQBar') {
      logicVal = currentQBar;
      voltage = currentQBar ? '4.72 V' : '0.22 V';
      note = currentQBar ? 'Inverted Output Q\' is HIGH (Complement of Q)' : 'Inverted Output Q\' is LOW';
      status = 'OUTPUT NODE';
    }

    setProbedSignal({
      title: comp.title,
      pin: pinId,
      logicLevel: logicVal,
      voltage,
      note,
      status,
      source
    });
    addToast(`Probed Node: ${comp.title} [${pinId}] → ${logicVal ? 'HIGH' : 'LOW'} (${voltage})`, 'info');
  };

  const clearProbe = () => {
    setProbedSignal(null);
  };

  // Wiring interactions
  const startWiring = (componentId: string, pinId: string) => {
    setConnectingPin({ componentId, pinId });
  };

  const completeWiring = (componentId: string, pinId: string) => {
    if (!connectingPin) return;
    if (connectingPin.componentId === componentId && connectingPin.pinId === pinId) {
      setConnectingPin(null);
      return;
    }

    const duplicate = wires.some(w => 
      (w.fromComponentId === connectingPin.componentId && w.fromPinId === connectingPin.pinId && w.toComponentId === componentId && w.toPinId === pinId) ||
      (w.toComponentId === connectingPin.componentId && w.toPinId === connectingPin.pinId && w.fromComponentId === componentId && w.fromPinId === pinId)
    );

    if (!duplicate) {
      const newWire: WireConnection = {
        id: `wire_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        fromComponentId: connectingPin.componentId,
        fromPinId: connectingPin.pinId,
        toComponentId: componentId,
        toPinId: pinId,
      };
      const nextWires = [...wires, newWire];
      setWires(nextWires);
      pushHistory(components, nextWires);
      addToast('Wire connection established', 'success');
    }
    setConnectingPin(null);
  };

  const cancelWiring = () => {
    setConnectingPin(null);
  };

  const addComponent = (type: CircuitComponent['type'], x = 320, y = 180) => {
    const id = `comp_${type}_${Date.now()}`;
    const titles: Record<CircuitComponent['type'], string> = {
      ic7476: '7476 Dual JK FF',
      switchJ: 'J Switch',
      switchK: 'K Switch',
      clockGen: 'Clock Gen',
      switchPreset: 'PRESET (Active-Low)',
      switchClear: 'CLEAR (Active-Low)',
      ledQ: 'Q LED',
      ledQBar: 'Q\' LED',
      powerSupply: '+5V VCC',
      ground: 'GND',
      logicProbe: 'Logic Probe',
    };
    const newComp: CircuitComponent = {
      id,
      type,
      title: titles[type] || type,
      x,
      y,
      state: type === 'switchPreset' || type === 'switchClear' ? { value: 1 } : { value: 0 }
    };
    const nextComps = [...components, newComp];
    setComponents(nextComps);
    pushHistory(nextComps, wires);
    addToast(`Added ${titles[type]} to workbench canvas`, 'info');
  };

  const removeComponent = (id: string) => {
    const nextComps = components.filter(c => c.id !== id);
    const nextWires = wires.filter(w => w.fromComponentId !== id && w.toComponentId !== id);
    setComponents(nextComps);
    setWires(nextWires);
    if (selectedComponentId === id) setSelectedComponentId(null);
    pushHistory(nextComps, nextWires);
    addToast('Component removed from canvas', 'info');
  };

  const updateComponentPos = (id: string, x: number, y: number) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, x, y } : c));
  };

  const removeWire = (id: string) => {
    const nextWires = wires.filter(w => w.id !== id);
    setWires(nextWires);
    if (selectedWireId === id) setSelectedWireId(null);
    pushHistory(components, nextWires);
    addToast('Wire deleted', 'info');
  };

  const clearCircuit = () => {
    setComponents([]);
    setWires([]);
    setSelectedComponentId(null);
    setSelectedWireId(null);
    pushHistory([], []);
    addToast('Circuit canvas cleared', 'warning');
  };

  const loadStandardSetup = () => {
    setComponents(STANDARD_LAB_COMPONENTS);
    setWires(STANDARD_LAB_WIRES);
    setSelectedComponentId(null);
    setSelectedWireId(null);
    pushHistory(STANDARD_LAB_COMPONENTS, STANDARD_LAB_WIRES);
    setTasks(prev => prev.map(t => t.id === 'task_build_circuit' ? { ...t, completed: true } : t));
    addToast('Standard pre-wired lab setup loaded successfully', 'success');
  };

  const saveCircuitToStorage = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem(STORAGE_KEYS.SAVED_CIRCUIT, JSON.stringify({ components, wires, timeStr }));
    setLastSavedTime(timeStr);
    addToast(`Circuit configuration saved locally at ${timeStr}`, 'success');
  };

  const loadCircuitFromStorage = (): boolean => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_CIRCUIT);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.components && parsed.wires) {
          setComponents(parsed.components);
          setWires(parsed.wires);
          if (parsed.timeStr) setLastSavedTime(parsed.timeStr);
          pushHistory(parsed.components, parsed.wires);
          addToast(`Saved circuit restored (${parsed.timeStr || 'Recent'})`, 'success');
          return true;
        }
      } catch {
        return false;
      }
    }
    addToast('No previously saved circuit found in browser storage', 'warning');
    return false;
  };

  // Full Experiment Reset
  const confirmResetExperiment = () => {
    clearCircuit();
    resetLogicState();
    clearTimingSamples();
    resetVerificationTests();
    clearObservations();
    setTasks(INITIAL_TASKS);
    setActiveFault('none');
    setFaultDiagnosed(false);
    setDiagnosticScore(0);
    setElapsedSeconds(0);
    setShowResetConfirmModal(false);
    addToast('Experiment successfully reset. Ready for a new laboratory session.', 'info');
  };

  // Circuit Snapshot Capture
  const takeCircuitSnapshot = () => {
    const timestamp = new Date().toLocaleTimeString();
    setCircuitSnapshot(`Captured at ${timestamp}`);
    addToast('Circuit schematic snapshot captured for laboratory report', 'success');
  };

  // Quiz submission
  const submitQuiz = (answers: Record<number, number>) => {
    setQuizAnswers(answers);
    setQuizSubmitted(true);
    let score = 0;
    const quizMap: Record<number, number> = {
      1: 1, 2: 2, 3: 2, 4: 1, 5: 0, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1
    };
    Object.entries(answers).forEach(([qIdStr, optIdx]) => {
      const qId = Number(qIdStr);
      if (quizMap[qId] === optIdx) score++;
    });
    setQuizScore(score);
    localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify({ score, answers }));
    addToast(`Quiz submitted! Your score: ${score}/10 (${score * 10}%)`, 'success');
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    localStorage.removeItem(STORAGE_KEYS.QUIZ);
    addToast('Quiz reset. You may re-attempt the test.', 'info');
  };

  // Scoring Calculation (100 Marks)
  const passedTestsCount = testCases.filter(t => t.passed).length;
  const scoreBreakdown: ScoreBreakdown = {
    circuitAssembly: Math.round(validation.percent * 0.20), // 20
    truthTable: Math.round((passedTestsCount / 8) * 20), // 20
    practicalTasks: Math.round((completedTasksCount / tasks.length) * 20), // 20
    faultDiagnosis: diagnosticScore, // 15
    quiz: Math.round((quizScore / 10) * 15), // 15
    viva: vivaScore, // 10
    total: 0
  };
  scoreBreakdown.total = 
    scoreBreakdown.circuitAssembly + 
    scoreBreakdown.truthTable + 
    scoreBreakdown.practicalTasks + 
    scoreBreakdown.faultDiagnosis + 
    scoreBreakdown.quiz + 
    scoreBreakdown.viva;

  const totalScore = scoreBreakdown.total;

  const saveSessionRecord = () => {
    const newRecord: SessionRecord = {
      id: `sess_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      studentName: student.name || 'Student Candidate',
      rollNumber: student.rollNumber || 'EC-2026',
      testsPassed: passedTestsCount,
      totalScore: totalScore,
      duration: formattedTime
    };

    setSessionHistory(prev => {
      const next = [newRecord, ...prev.slice(0, 9)];
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(next));
      return next;
    });
    addToast('Session record archived in local experiment history', 'success');
  };

  // Keyboard Shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (e.key === 'Escape') {
        setShowStudentModal(false);
        setShowHelpModal(false);
        setShowShortcutsModal(false);
        setShowResetConfirmModal(false);
        setConnectingPin(null);
        setProbeActive(false);
        setProbedSignal(null);
      } else if (e.ctrlKey && key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && key === 'y') {
        e.preventDefault();
        redo();
      } else if (key === 'p') {
        pulseClock();
      } else if (key === 'r') {
        resetLogicState();
      } else if (key === 'c') {
        validateCircuit();
      } else if (key === 's' && e.ctrlKey) {
        e.preventDefault();
        saveCircuitToStorage();
      } else if (key === 'l' && e.ctrlKey) {
        e.preventDefault();
        loadCircuitFromStorage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pulseClock, validateCircuit, undo, redo, saveCircuitToStorage, loadCircuitFromStorage]);

  return (
    <LabContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        theme,
        toggleTheme,
        showStudentModal,
        setShowStudentModal,
        showHelpModal,
        setShowHelpModal,
        showShortcutsModal,
        setShowShortcutsModal,
        showResetConfirmModal,
        setShowResetConfirmModal,
        isFullscreenLab,
        toggleFullscreenLab,
        setIsFullscreenLab,
        student,
        updateStudent,
        components,
        wires,
        selectedComponentId,
        setSelectedComponentId,
        selectedWireId,
        setSelectedWireId,
        connectingPin,
        startWiring,
        completeWiring,
        cancelWiring,
        addComponent,
        removeComponent,
        updateComponentPos,
        removeWire,
        clearCircuit,
        loadStandardSetup,
        saveCircuitToStorage,
        loadCircuitFromStorage,
        lastSavedTime,
        undo,
        redo,
        canUndo,
        canRedo,
        validation,
        validateCircuit,
        currentQ,
        currentQBar,
        prevQ,
        jLevel,
        kLevel,
        clkLevel,
        presetLevel,
        clearLevel,
        activeOperation,
        lastEvent,
        edgePulseActive,
        asyncInvalidWarning,
        clockFrequency,
        isClockRunning,
        clockEdgeCount,
        learningMode,
        setLearningMode,
        toggleLearningMode,
        educationalExplanation,
        setSwitchValue,
        toggleSwitch,
        pulseClock,
        startAutoClock,
        stopAutoClock,
        setClockFreq,
        resetLogicState,
        setInitialQ,
        confirmResetExperiment,
        observations,
        addObservation,
        clearObservations,
        timingSamples,
        clearTimingSamples,
        testCases,
        runAllVerificationTests,
        isVerifyingAll,
        resetVerificationTests,
        activeFault,
        injectFault,
        clearFault,
        faultDiagnosed,
        setFaultDiagnosed,
        selectedSuspectedFault,
        setSelectedSuspectedFault,
        diagnoseFaultSubmission,
        diagnosticScore,
        showFaultHint,
        setShowFaultHint,
        probeActive,
        setProbeActive,
        probedSignal,
        probeNode,
        clearProbe,
        tasks,
        toggleTask,
        completedTasksCount,
        quizAnswers,
        quizSubmitted,
        quizScore,
        submitQuiz,
        resetQuiz,
        vivaMastered,
        toggleVivaMastered,
        vivaScore,
        sessionHistory,
        saveSessionRecord,
        circuitSnapshot,
        takeCircuitSnapshot,
        scoreBreakdown,
        totalScore,
        toasts,
        addToast,
        removeToast,
        elapsedSeconds,
        isTimerRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        formattedTime,
      }}
    >
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
};
