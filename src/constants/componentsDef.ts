import { CircuitComponent, ComponentType, PinDefinition, WireConnection } from '../types/lab';

export const COMPONENT_PINS: Record<ComponentType, PinDefinition[]> = {
  ic7476: [
    { id: 'pin_j', name: 'J', type: 'input', x: 0, y: 45, label: 'J', description: 'Synchronous Data Input J' },
    { id: 'pin_clk', name: 'CLK', type: 'input', x: 0, y: 95, label: 'CLK', description: 'Clock Input (Active Falling Edge)' },
    { id: 'pin_k', name: 'K', type: 'input', x: 0, y: 145, label: 'K', description: 'Synchronous Data Input K' },
    { id: 'pin_pre', name: 'PRE', type: 'control', x: 90, y: 0, label: 'PRE\'', description: 'Asynchronous Preset (Active LOW)' },
    { id: 'pin_clr', name: 'CLR', type: 'control', x: 90, y: 190, label: 'CLR\'', description: 'Asynchronous Clear (Active LOW)' },
    { id: 'pin_q', name: 'Q', type: 'output', x: 180, y: 55, label: 'Q', description: 'True Flip-Flop Output' },
    { id: 'pin_qbar', name: 'Q\'', type: 'output', x: 180, y: 135, label: 'Q\'', description: 'Inverted Complementary Output' },
    { id: 'pin_vcc', name: 'VCC', type: 'power', x: 40, y: 0, label: 'VCC', description: '+5V Power Supply' },
    { id: 'pin_gnd', name: 'GND', type: 'ground', x: 140, y: 190, label: 'GND', description: 'Circuit Common Ground' },
  ],
  switchJ: [
    { id: 'pin_out', name: 'OUT', type: 'output', x: 80, y: 40, label: 'J OUT', description: 'Logic Level Output (0/1)' }
  ],
  switchK: [
    { id: 'pin_out', name: 'OUT', type: 'output', x: 80, y: 40, label: 'K OUT', description: 'Logic Level Output (0/1)' }
  ],
  clockGen: [
    { id: 'pin_out', name: 'OUT', type: 'output', x: 90, y: 45, label: 'CLK OUT', description: 'Square Wave Pulse Output' }
  ],
  switchPreset: [
    { id: 'pin_out', name: 'OUT', type: 'output', x: 80, y: 40, label: 'PRE OUT', description: 'Active-Low Preset Output (1=Inactive, 0=Active)' }
  ],
  switchClear: [
    { id: 'pin_out', name: 'OUT', type: 'output', x: 80, y: 40, label: 'CLR OUT', description: 'Active-Low Clear Output (1=Inactive, 0=Active)' }
  ],
  ledQ: [
    { id: 'pin_in', name: 'IN', type: 'input', x: 0, y: 40, label: 'Q IN', description: 'LED Cathode/Anode Input' }
  ],
  ledQBar: [
    { id: 'pin_in', name: 'IN', type: 'input', x: 0, y: 40, label: 'Q\' IN', description: 'LED Cathode/Anode Input' }
  ],
  powerSupply: [
    { id: 'pin_vcc_out', name: '+5V', type: 'power', x: 60, y: 40, label: '+5V', description: 'DC Regulated +5.0V Rail' }
  ],
  ground: [
    { id: 'pin_gnd_out', name: 'GND', type: 'ground', x: 60, y: 25, label: 'GND', description: '0V Reference Ground' }
  ],
  logicProbe: [
    { id: 'pin_probe', name: 'PROBE', type: 'input', x: 0, y: 30, label: 'TIP', description: 'High-Impedance Logic Probe Tip' }
  ]
};

export const COMPONENT_CATALOG: {
  type: ComponentType;
  title: string;
  category: 'IC' | 'INPUTS' | 'OUTPUTS' | 'POWER' | 'INSTRUMENT';
  description: string;
  defaultState: CircuitComponent['state'];
}[] = [
  {
    type: 'ic7476',
    title: 'IC 7476 JK Flip-Flop',
    category: 'IC',
    description: 'Dual J-K Flip-Flop with individual Preset and Clear controls.',
    defaultState: {}
  },
  {
    type: 'switchJ',
    title: 'J Logic Switch',
    category: 'INPUTS',
    description: 'Manual toggle switch generating digital LOW (0) or HIGH (1) for J input.',
    defaultState: { value: 0 }
  },
  {
    type: 'switchK',
    title: 'K Logic Switch',
    category: 'INPUTS',
    description: 'Manual toggle switch generating digital LOW (0) or HIGH (1) for K input.',
    defaultState: { value: 0 }
  },
  {
    type: 'clockGen',
    title: 'Clock Pulse Generator',
    category: 'INPUTS',
    description: 'Selectable 0.5-5Hz auto oscillator or manual single-pulse push button.',
    defaultState: { value: 0, frequency: 1, isRunning: false }
  },
  {
    type: 'switchPreset',
    title: 'Preset Switch (Active LOW)',
    category: 'INPUTS',
    description: 'Asynchronous Preset switch. Normal operation is 1 (inactive). 0 sets Q=1.',
    defaultState: { value: 1 }
  },
  {
    type: 'switchClear',
    title: 'Clear Switch (Active LOW)',
    category: 'INPUTS',
    description: 'Asynchronous Clear switch. Normal operation is 1 (inactive). 0 clears Q=0.',
    defaultState: { value: 1 }
  },
  {
    type: 'ledQ',
    title: 'LED Indicator Q',
    category: 'OUTPUTS',
    description: 'Bright digital LED emitting emerald green when output Q is HIGH (1).',
    defaultState: { color: '#22c55e' }
  },
  {
    type: 'ledQBar',
    title: 'LED Indicator Q\'',
    category: 'OUTPUTS',
    description: 'Bright digital LED emitting electric cyan when output Q\' is HIGH (1).',
    defaultState: { color: '#06b6d4' }
  },
  {
    type: 'powerSupply',
    title: '+5V Power Rail (VCC)',
    category: 'POWER',
    description: 'Regulated TTL logic supply rail delivering nominal +5.00V DC.',
    defaultState: {}
  },
  {
    type: 'ground',
    title: 'Ground Rail (GND)',
    category: 'POWER',
    description: '0V chassis/ground potential node for common reference.',
    defaultState: {}
  }
];

export const STANDARD_LAB_COMPONENTS: CircuitComponent[] = [
  { id: 'comp_ic', type: 'ic7476', title: '7476 Dual JK FF', x: 380, y: 170, state: {} },
  { id: 'comp_sw_j', type: 'switchJ', title: 'J Switch', x: 80, y: 130, state: { value: 0 } },
  { id: 'comp_clk', type: 'clockGen', title: 'Clock Gen', x: 70, y: 250, state: { value: 0, frequency: 1, isRunning: false } },
  { id: 'comp_sw_k', type: 'switchK', title: 'K Switch', x: 80, y: 390, state: { value: 0 } },
  { id: 'comp_sw_pre', type: 'switchPreset', title: 'PRESET (Active-Low)', x: 340, y: 30, state: { value: 1 } },
  { id: 'comp_sw_clr', type: 'switchClear', title: 'CLEAR (Active-Low)', x: 340, y: 440, state: { value: 1 } },
  { id: 'comp_led_q', type: 'ledQ', title: 'Q Output LED', x: 670, y: 150, state: { color: '#22c55e' } },
  { id: 'comp_led_qbar', type: 'ledQBar', title: 'Q\' Output LED', x: 670, y: 320, state: { color: '#06b6d4' } },
  { id: 'comp_vcc', type: 'powerSupply', title: '+5V VCC', x: 180, y: 40, state: {} },
  { id: 'comp_gnd', type: 'ground', title: 'GND', x: 570, y: 450, state: {} },
];

export const STANDARD_LAB_WIRES: WireConnection[] = [
  { id: 'wire_j', fromComponentId: 'comp_sw_j', fromPinId: 'pin_out', toComponentId: 'comp_ic', toPinId: 'pin_j' },
  { id: 'wire_clk', fromComponentId: 'comp_clk', fromPinId: 'pin_out', toComponentId: 'comp_ic', toPinId: 'pin_clk' },
  { id: 'wire_k', fromComponentId: 'comp_sw_k', fromPinId: 'pin_out', toComponentId: 'comp_ic', toPinId: 'pin_k' },
  { id: 'wire_pre', fromComponentId: 'comp_sw_pre', fromPinId: 'pin_out', toComponentId: 'comp_ic', toPinId: 'pin_pre' },
  { id: 'wire_clr', fromComponentId: 'comp_sw_clr', fromPinId: 'pin_out', toComponentId: 'comp_ic', toPinId: 'pin_clr' },
  { id: 'wire_q', fromComponentId: 'comp_ic', fromPinId: 'pin_q', toComponentId: 'comp_led_q', toPinId: 'pin_in' },
  { id: 'wire_qbar', fromComponentId: 'comp_ic', fromPinId: 'pin_qbar', toComponentId: 'comp_led_qbar', toPinId: 'pin_in' },
  { id: 'wire_vcc', fromComponentId: 'comp_vcc', fromPinId: 'pin_vcc_out', toComponentId: 'comp_ic', toPinId: 'pin_vcc' },
  { id: 'wire_gnd', fromComponentId: 'comp_ic', fromPinId: 'pin_gnd', toComponentId: 'comp_gnd', toPinId: 'pin_gnd_out' },
];
