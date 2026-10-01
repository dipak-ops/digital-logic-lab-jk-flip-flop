export type PinType = 'input' | 'output' | 'power' | 'ground' | 'control';

export interface PinDefinition {
  id: string;
  name: string;
  type: PinType;
  x: number; // relative coordinate in component SVG
  y: number;
  label: string;
  description: string;
}

export type ComponentType = 
  | 'ic7476' 
  | 'switchJ' 
  | 'switchK' 
  | 'clockGen' 
  | 'switchPreset' 
  | 'switchClear' 
  | 'ledQ' 
  | 'ledQBar' 
  | 'powerSupply' 
  | 'ground' 
  | 'logicProbe';

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  title: string;
  x: number;
  y: number;
  state: {
    value?: number; // 0 or 1 for switches/clock
    frequency?: number; // for clock generator
    isRunning?: boolean;
    color?: string;
  };
}

export interface WireConnection {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  college: string;
  branch: string;
  semester: string;
  isRegistered: boolean;
}

export interface TimingSample {
  timeIndex: number;
  timestamp: number;
  clk: number;
  j: number;
  k: number;
  preset: number;
  clear: number;
  q: number;
  qBar: number;
  eventNote?: string;
}

export interface TestCase {
  id: number;
  j: number;
  k: number;
  initialQ: number;
  expectedQNext: number;
  operation: 'HOLD' | 'RESET' | 'SET' | 'TOGGLE';
  tested: boolean;
  passed?: boolean;
  actualQNext?: number;
}

export interface ExperimentTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface CircuitValidationStatus {
  powerConnected: boolean;
  groundConnected: boolean;
  jConnected: boolean;
  kConnected: boolean;
  clkConnected: boolean;
  presetConfigured: boolean;
  clearConfigured: boolean;
  qLedConnected: boolean;
  qBarLedConnected: boolean;
  percent: number;
  isValid: boolean;
  messages: string[];
}

export type FaultType = 
  | 'none'
  | 'j_disconnected'
  | 'k_disconnected'
  | 'clk_disconnected'
  | 'q_led_disconnected'
  | 'qbar_led_disconnected'
  | 'preset_stuck_low'
  | 'clear_stuck_low'
  | 'vcc_disconnected'
  | 'gnd_disconnected';

export interface Observation {
  id: string;
  testNumber: number;
  j: number;
  k: number;
  clockEdge: string;
  prevQ: number;
  actualQ: number;
  qBar: number;
  operation: 'HOLD' | 'RESET' | 'SET' | 'TOGGLE';
  result: 'PASS' | 'FAIL';
  timestamp: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  studentName: string;
  rollNumber: string;
  testsPassed: number;
  totalScore: number;
  duration: string;
}

export interface ScoreBreakdown {
  circuitAssembly: number; // 20
  truthTable: number; // 20
  practicalTasks: number; // 20
  faultDiagnosis: number; // 15
  quiz: number; // 15
  viva: number; // 10
  total: number; // 100
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export type NavPage = 
  | 'home'
  | 'registration'
  | 'aim'
  | 'theory'
  | 'operation'
  | 'ic7476'
  | 'components'
  | 'procedure'
  | 'workbench'
  | 'simulation'
  | 'truthtable'
  | 'timing'
  | 'diagnostics'
  | 'quiz'
  | 'viva'
  | 'result'
  | 'report'
  | 'certificate'
  | 'help';
