import { QuizQuestion, TestCase, VivaQuestion, ExperimentTask } from '../types/lab';

export const CREATOR_INFO = {
  name: "Dipak Bhondekar",
  degree: "B.Tech Information Technology",
  role: "Digital Electronics Virtual Lab Developer",
  linkedin: "https://www.linkedin.com/in/dipak-bhondekar/",
  github: "https://github.com/dipak-ops",
  bio: "Passionate about embedded systems, digital logic design, and interactive engineering education tools.",
  copyright: "© 2026 Dipak Bhondekar. Educational Virtual Laboratory."
};

export const INITIAL_TEST_CASES: TestCase[] = [
  { id: 1, j: 0, k: 0, initialQ: 0, expectedQNext: 0, operation: 'HOLD', tested: false },
  { id: 2, j: 0, k: 0, initialQ: 1, expectedQNext: 1, operation: 'HOLD', tested: false },
  { id: 3, j: 0, k: 1, initialQ: 0, expectedQNext: 0, operation: 'RESET', tested: false },
  { id: 4, j: 0, k: 1, initialQ: 1, expectedQNext: 0, operation: 'RESET', tested: false },
  { id: 5, j: 1, k: 0, initialQ: 0, expectedQNext: 1, operation: 'SET', tested: false },
  { id: 6, j: 1, k: 0, initialQ: 1, expectedQNext: 1, operation: 'SET', tested: false },
  { id: 7, j: 1, k: 1, initialQ: 0, expectedQNext: 1, operation: 'TOGGLE', tested: false },
  { id: 8, j: 1, k: 1, initialQ: 1, expectedQNext: 0, operation: 'TOGGLE', tested: false },
];

export const INITIAL_TASKS: ExperimentTask[] = [
  { id: 'task_build_circuit', title: 'Task 1: Build the Standard Circuit', description: 'Assemble or load the 7476 JK Flip-Flop with power, switches, and LEDs.', completed: false },
  { id: 'task_verify_hold', title: 'Task 2: Verify HOLD Mode (J=0, K=0)', description: 'Pulse clock with J=0, K=0 and verify Q remains unchanged.', completed: false },
  { id: 'task_verify_reset', title: 'Task 3: Verify RESET Mode (J=0, K=1)', description: 'Pulse clock with J=0, K=1 and observe Q forced to 0, Q\' to 1.', completed: false },
  { id: 'task_verify_set', title: 'Task 4: Verify SET Mode (J=1, K=0)', description: 'Pulse clock with J=1, K=0 and observe Q forced to 1, Q\' to 0.', completed: false },
  { id: 'task_verify_toggle', title: 'Task 5: Verify TOGGLE Mode (J=1, K=1)', description: 'Pulse clock with J=1, K=1 and observe deterministic state inversion.', completed: false },
  { id: 'task_verify_preset', title: 'Task 6: Verify PRESET\' Control (Active LOW)', description: 'Set PRESET\'=0 and observe Q immediately forced to 1 without clock.', completed: false },
  { id: 'task_verify_clear', title: 'Task 7: Verify CLEAR\' Control (Active LOW)', description: 'Set CLEAR\'=0 and observe Q immediately forced to 0 without clock.', completed: false },
  { id: 'task_run_8_tests', title: 'Task 8: Run All Eight Automated Tests', description: 'Complete 8/8 automated verification in the Truth Table test suite.', completed: false },
  { id: 'task_observe_timing', title: 'Task 9: Observe Timing Diagram', description: 'Inspect multichannel oscilloscope traces and clock edge transitions.', completed: false },
  { id: 'task_complete_fault', title: 'Task 10: Complete Fault Diagnosis', description: 'Diagnose and resolve an injected hardware fault in the diagnostic lab.', completed: false },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a JK Flip-Flop in digital electronics?",
    options: [
      "A combinational circuit without any internal feedback",
      "A bistable sequential multivibrator with memory capability and race-condition elimination",
      "An analog amplifier with high input impedance",
      "A read-only non-volatile semiconductor memory cell"
    ],
    correctIndex: 1,
    explanation: "A JK flip-flop is a bistable sequential logic circuit capable of storing one bit of information. Unlike the basic SR flip-flop, it eliminates the undefined/invalid condition when both control inputs are active."
  },
  {
    id: 2,
    question: "What do the J and K inputs stand for or control?",
    options: [
      "Joule and Kelvin thermal sensors",
      "Jack and King connectors",
      "Control inputs that dictate Set (J) and Reset (K) operations",
      "Junction and Kinetic timing delay parameters"
    ],
    correctIndex: 2,
    explanation: "J acts analogously to the 'Set' input (setting Q=1 when J=1, K=0) while K acts analogously to the 'Reset' input (clearing Q=0 when J=0, K=1). Named in honor of Jack Kilby."
  },
  {
    id: 3,
    question: "What happens to the output Q upon a clock pulse when J=0 and K=0?",
    options: [
      "Q is forced to logic 0 immediately",
      "Q toggles to its complement",
      "HOLD state: Q maintains its current state without changing (Qnext = Q)",
      "The circuit enters an undefined metastable state"
    ],
    correctIndex: 2,
    explanation: "When J=0 and K=0, neither Set nor Reset is requested. The flip-flop operates in HOLD (No Change) mode: Q(next) = Q."
  },
  {
    id: 4,
    question: "What is the next state of Q when J=0 and K=1 after an active clock edge?",
    options: [
      "Q = 1 (SET)",
      "Q = 0 (RESET)",
      "Q = Q (HOLD)",
      "Q = Q' (TOGGLE)"
    ],
    correctIndex: 1,
    explanation: "When J=0 and K=1, the K input asserts a RESET command on the triggering clock transition, driving Q to logic 0 (and Q' to logic 1)."
  },
  {
    id: 5,
    question: "What is the next state of Q when J=1 and K=0 after an active clock edge?",
    options: [
      "Q = 1 (SET)",
      "Q = 0 (RESET)",
      "Q = Q (HOLD)",
      "Q = 0 and Q' = 0"
    ],
    correctIndex: 0,
    explanation: "When J=1 and K=0, the J input asserts a SET command on the triggering clock transition, driving Q to logic 1 (and Q' to logic 0)."
  },
  {
    id: 6,
    question: "What unique behavior occurs in a JK Flip-Flop when J=1 and K=1?",
    options: [
      "Invalid state where both Q and Q' become 1",
      "TOGGLE state: Q inverts its previous value (Qnext = Q')",
      "The chip automatically disconnects power",
      "HOLD state where no change occurs"
    ],
    correctIndex: 1,
    explanation: "In an SR latch, S=1, R=1 produces an invalid state. In a JK flip-flop, internal cross-feedback converts J=1, K=1 into a deterministic TOGGLE operation: Q(next) = Q'."
  },
  {
    id: 7,
    question: "What is the fundamental role of the Clock (CLK) input?",
    options: [
      "To supply DC operating voltage to internal transistors",
      "To synchronize state transitions strictly at active clock edges",
      "To continuously reset the internal memory",
      "To measure ambient laboratory temperature"
    ],
    correctIndex: 1,
    explanation: "The clock synchronizes operations across digital systems. Inputs J and K are only sampled at the active clock edge (e.g. falling edge), preventing asynchronous race conditions."
  },
  {
    id: 8,
    question: "What does the standard TTL IC 7476 package contain?",
    options: [
      "Four independent 2-input NAND gates",
      "Two independent JK Flip-Flops with individual Preset, Clear, and Clock pins",
      "An 8-bit asynchronous binary ripple counter",
      "A dual decimal-to-seven-segment decoder driver"
    ],
    correctIndex: 1,
    explanation: "IC 7476 is a Dual Master-Slave (or negative-edge-triggered) J-K Flip-Flop with individual J, K, CLK, Preset (active low), and Clear (active low) pins for each flip-flop."
  },
  {
    id: 9,
    question: "What is the mathematical and logical relationship between outputs Q and Q'?",
    options: [
      "Q' is always identical to Q",
      "Q' is the Boolean complement (inverted state) of Q under normal operation",
      "Q' represents the analog derivative of Q",
      "Q' is only enabled when J and K are both 0"
    ],
    correctIndex: 1,
    explanation: "Q is the true output and Q' (Q-bar) is the inverted/complementary output. When Q=1, Q'=0; when Q=0, Q'=1."
  },
  {
    id: 10,
    question: "What is the difference between synchronous inputs (J, K) and asynchronous inputs (PRESET, CLEAR)?",
    options: [
      "Synchronous inputs work without power, asynchronous require power",
      "Synchronous inputs (J, K) only take effect on the clock edge, while asynchronous inputs (PRESET, CLEAR) override immediately regardless of the clock",
      "Asynchronous inputs can only operate at 100 MHz or higher",
      "There is no functional difference in modern digital ICs"
    ],
    correctIndex: 1,
    explanation: "Synchronous inputs J and K are gated and require an active clock transition to alter state. Asynchronous inputs PRESET and CLEAR act directly on the internal bistable latch immediately, overriding the clock."
  }
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: "What is a JK flip-flop?",
    answer: "A JK flip-flop is a clocked, bistable sequential logic storage element that stores 1 bit of information. It features two data inputs (J for Set and K for Reset), a clock input, and complementary outputs (Q and Q'). It refines the basic SR latch by eliminating the undefined state when both inputs are asserted simultaneously.",
    keyPoints: [
      "Stores 1 bit of digital binary state (0 or 1)",
      "Synchronous clocked operation",
      "Eliminates forbidden state of the SR latch"
    ]
  },
  {
    id: 2,
    question: "What happens when J = K = 1?",
    answer: "When both J and K are logic 1, the flip-flop operates in TOGGLE mode. Upon each active falling clock edge, the output Q inverts to its complement: Q(next) = NOT(Q). If Q was 0 it becomes 1, and if Q was 1 it becomes 0.",
    keyPoints: [
      "Operates in deterministic TOGGLE mode",
      "Q(next) = Q' (inversion)",
      "Forms the foundation of binary frequency dividers and ripple counters"
    ]
  },
  {
    id: 3,
    question: "What is the purpose of the clock?",
    answer: "The clock provides timing synchronization across digital electronic circuits. It defines discrete instants (active transitions) when data inputs are sampled and states update, preventing uncontrolled propagation delays and race-around hazards.",
    keyPoints: [
      "Synchronizes state transitions",
      "Restricts state changes to the active clock edge (falling edge for 7476)",
      "Prevents asynchronous timing skew and metastability"
    ]
  },
  {
    id: 4,
    question: "What is the difference between SET and RESET?",
    answer: "SET forces the true output Q to logic 1 (high level, ~5V) and Q' to 0. RESET forces the true output Q to logic 0 (low level, ~0V) and Q' to 1. In synchronous operation, SET occurs when J=1, K=0 on clock edge, while RESET occurs when J=0, K=1.",
    keyPoints: [
      "SET: Q = 1, Q' = 0 (triggered by J=1, K=0 or PRESET'=0)",
      "RESET: Q = 0, Q' = 1 (triggered by J=0, K=1 or CLEAR'=0)",
      "Outputs remain complementary under both operations"
    ]
  },
  {
    id: 5,
    question: "What does PRESET̅ do?",
    answer: "PRESET' (active LOW) is an asynchronous control input. When asserted LOW (0V), it instantaneously forces Q to logic 1 and Q' to logic 0, completely overriding clock pulses and J/K inputs.",
    keyPoints: [
      "Asynchronously forces Q = 1 and Q' = 0",
      "Active-low polarity (asserted at 0V / logic 0)",
      "Overrides clock and data inputs immediately"
    ]
  },
  {
    id: 6,
    question: "What does CLEAR̅ do?",
    answer: "CLEAR' (active LOW) is an asynchronous control input. When asserted LOW (0V), it instantaneously forces Q to logic 0 and Q' to logic 1, completely overriding clock pulses and J/K inputs.",
    keyPoints: [
      "Asynchronously forces Q = 0 and Q' = 1",
      "Active-low polarity (asserted at 0V / logic 0)",
      "Used for power-on reset and deterministic circuit initialization"
    ]
  },
  {
    id: 7,
    question: "Why are PRESET and CLEAR called asynchronous?",
    answer: "They are termed 'asynchronous' because their action takes effect immediately without waiting for a clock pulse. Unlike synchronous inputs (J and K) which are gated by the clock, PRESET and CLEAR act directly on the cross-coupled NAND gates.",
    keyPoints: [
      "Independent of clock pulse transitions",
      "Instantaneous response determined solely by propagation delay",
      "Highest priority over all clocked logic"
    ]
  },
  {
    id: 8,
    question: "What is Q̅?",
    answer: "Q' (Q-bar) is the inverted or complementary output of the flip-flop. Under normal operating conditions, it always holds the opposite Boolean logic state of output Q (Q' = NOT Q).",
    keyPoints: [
      "Complementary output: Q' = NOT Q",
      "When Q = 1, Q' = 0; when Q = 0, Q' = 1",
      "Both become 1 only during the prohibited PRESET'=0 and CLEAR'=0 fault condition"
    ]
  },
  {
    id: 9,
    question: "What is the characteristic equation of the JK flip-flop?",
    answer: "The characteristic equation is Q(next) = J·Q' + K'·Q. It mathematically dictates the next state as a function of data inputs J, K and the present state Q.",
    keyPoints: [
      "Q(next) = J·Q' + K'·Q",
      "Derived from Karnaugh Map reduction of next-state truth table",
      "Used in formal sequential state machine synthesis"
    ]
  },
  {
    id: 10,
    question: "What is IC 7476?",
    answer: "IC 7476 is a classic TTL integrated circuit containing two independent J-K flip-flops. Each flip-flop has its own J, K, CLK, active-low PRESET, and active-low CLEAR pins, running on standard +5V VCC and GND rails.",
    keyPoints: [
      "Dual JK flip-flop in 16-pin DIP package",
      "Standard TTL logic family with negative-edge clock triggering",
      "Contains independent asynchronous active-low Preset and Clear inputs"
    ]
  }
];

export const IC7476_SPECS = {
  name: "SN7476 / 74LS76",
  description: "Dual J-K Flip-Flop with Individual Set (Preset), Clear, and Clock",
  technology: "TTL (Transistor-Transistor Logic)",
  package: "16-pin Dual In-line Package (DIP)",
  supplyVoltage: "4.75V to 5.25V (Nominal 5.0V)",
  activeClockEdge: "Negative (Falling) Edge Triggered (HIGH to LOW transition)",
  asyncPolarity: "Active LOW for both Preset (PRE') and Clear (CLR')",
  propagationDelay: "Typical 15 ns to 25 ns",
  maxClockFrequency: "25 MHz - 45 MHz (LS version)"
};
