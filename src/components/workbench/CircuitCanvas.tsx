import React, { useState, useRef, useEffect } from 'react';
import { useLab } from '../../context/LabContext';
import { COMPONENT_PINS } from '../../constants/componentsDef';
import { CircuitComponent, PinDefinition, WireConnection } from '../../types/lab';
import { Zap, Play, Square, AlertCircle, Trash2, Power, Radio, RefreshCw } from 'lucide-react';

export const CircuitCanvas: React.FC = () => {
  const {
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
    updateComponentPos,
    removeComponent,
    removeWire,
    setSwitchValue,
    toggleSwitch,
    pulseClock,
    startAutoClock,
    stopAutoClock,
    isClockRunning,
    clockFrequency,
    setClockFreq,
    currentQ,
    currentQBar,
    jLevel,
    kLevel,
    clkLevel,
    presetLevel,
    clearLevel,
    edgePulseActive,
    validation,
    probeActive,
    probeNode
  } = useLab();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Track mouse movements across canvas
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (draggingCompId) {
      // Snap to 10px grid
      const snappedX = Math.max(10, Math.min(rect.width - 150, Math.round((x - dragOffset.x) / 10) * 10));
      const snappedY = Math.max(10, Math.min(rect.height - 120, Math.round((y - dragOffset.y) / 10) * 10));
      updateComponentPos(draggingCompId, snappedX, snappedY);
    }
  };

  const handleMouseUp = () => {
    setDraggingCompId(null);
  };

  const startDragComp = (e: React.MouseEvent, comp: CircuitComponent) => {
    e.stopPropagation();
    if (probeActive) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    setDraggingCompId(comp.id);
    setSelectedComponentId(comp.id);
    setSelectedWireId(null);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Helper to get pin coordinate in canvas
  const getPinCoordinate = (componentId: string, pinId: string): { x: number; y: number } | null => {
    const comp = components.find(c => c.id === componentId);
    if (!comp) return null;
    const pinList = COMPONENT_PINS[comp.type] || [];
    const pin = pinList.find(p => p.id === pinId);
    if (!pin) return null;
    return {
      x: comp.x + pin.x,
      y: comp.y + pin.y
    };
  };

  // Determine wire color & glow based on logic level
  const getWireStyle = (wire: WireConnection) => {
    const fromComp = components.find(c => c.id === wire.fromComponentId);
    const toComp = components.find(c => c.id === wire.toComponentId);
    const isSelected = selectedWireId === wire.id;

    // Check which signal flows through this wire
    let isHigh = false;
    let isClock = false;

    if (
      wire.fromPinId === 'pin_vcc_out' || 
      wire.toPinId === 'pin_vcc' ||
      wire.fromPinId === 'pin_vcc'
    ) {
      isHigh = true;
    } else if (
      wire.fromPinId === 'pin_gnd_out' || 
      wire.toPinId === 'pin_gnd' ||
      wire.fromPinId === 'pin_gnd'
    ) {
      isHigh = false;
    } else if (
      fromComp?.type === 'clockGen' || 
      toComp?.type === 'clockGen' || 
      wire.fromPinId === 'pin_clk' || 
      wire.toPinId === 'pin_clk'
    ) {
      isClock = true;
      isHigh = clkLevel === 1;
    } else if (wire.fromPinId === 'pin_q' || wire.toPinId === 'pin_q' || toComp?.type === 'ledQ') {
      isHigh = currentQ === 1;
    } else if (wire.fromPinId === 'pin_qbar' || wire.toPinId === 'pin_qbar' || toComp?.type === 'ledQBar') {
      isHigh = currentQBar === 1;
    } else if (fromComp?.type === 'switchJ' || wire.fromPinId === 'pin_j' || wire.toPinId === 'pin_j') {
      isHigh = jLevel === 1;
    } else if (fromComp?.type === 'switchK' || wire.fromPinId === 'pin_k' || wire.toPinId === 'pin_k') {
      isHigh = kLevel === 1;
    } else if (fromComp?.type === 'switchPreset' || wire.fromPinId === 'pin_pre' || wire.toPinId === 'pin_pre') {
      isHigh = presetLevel === 1;
    } else if (fromComp?.type === 'switchClear' || wire.fromPinId === 'pin_clr' || wire.toPinId === 'pin_clr') {
      isHigh = clearLevel === 1;
    }

    if (isSelected) {
      return { stroke: '#f59e0b', strokeWidth: 4, filter: 'drop-shadow(0 0 8px #f59e0b)' };
    }
    if (isClock) {
      return { 
        stroke: isHigh ? '#38bdf8' : '#0369a1', 
        strokeWidth: 3.5, 
        filter: isHigh ? 'drop-shadow(0 0 6px #38bdf8)' : 'none' 
      };
    }
    if (isHigh) {
      return { 
        stroke: '#22c55e', 
        strokeWidth: 3, 
        filter: 'drop-shadow(0 0 5px #22c55e)' 
      };
    }
    return { 
      stroke: '#475569', 
      strokeWidth: 2.5, 
      filter: 'none' 
    };
  };

  const handlePinClick = (e: React.MouseEvent, componentId: string, pinId: string) => {
    e.stopPropagation();

    if (probeActive) {
      probeNode(componentId, pinId);
      return;
    }

    if (!connectingPin) {
      startWiring(componentId, pinId);
    } else {
      completeWiring(componentId, pinId);
    }
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        if (connectingPin) cancelWiring();
        setSelectedComponentId(null);
        setSelectedWireId(null);
      }}
      className={`relative w-full h-[580px] rounded-2xl border border-cyan-900/50 bg-slate-950 overflow-hidden select-none bg-circuit-grid ${
        probeActive ? 'cursor-crosshair' : 'cursor-default'
      }`}
    >
      {/* Circuit Board Header Indicators */}
      <div className="absolute top-3 left-4 z-20 flex items-center space-x-2 pointer-events-none">
        <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400/80">
          PROTOTYPE WORKBENCH [24x24 MATRIX]
        </span>
      </div>

      {/* Edge pulse alert banner on canvas */}
      {edgePulseActive && (
        <div className="absolute top-3 right-4 z-20 flex items-center space-x-2 rounded-lg border border-cyan-400 bg-cyan-950/80 px-3 py-1 shadow-lg shadow-cyan-500/30 animate-edge">
          <Zap className="h-4 w-4 text-cyan-300 animate-bounce" />
          <span className="font-mono text-xs font-bold text-cyan-200">
            CLOCK EDGE DETECTED → J/K SAMPLED → STATE UPDATED
          </span>
        </div>
      )}

      {/* SVG Wire Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Render all existing wires */}
        {wires.map((wire) => {
          const start = getPinCoordinate(wire.fromComponentId, wire.fromPinId);
          const end = getPinCoordinate(wire.toComponentId, wire.toPinId);
          if (!start || !end) return null;

          const dx = end.x - start.x;
          const dy = end.y - start.y;
          // Smooth cubic bezier path
          const pathD = `M ${start.x} ${start.y} C ${start.x + dx * 0.4} ${start.y}, ${end.x - dx * 0.4} ${end.y}, ${end.x} ${end.y}`;
          const style = getWireStyle(wire);

          return (
            <g key={wire.id} className="pointer-events-auto cursor-pointer">
              {/* Invisible thicker stroke for easy wire clicking */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth="16"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWireId(wire.id);
                  setSelectedComponentId(null);
                }}
              />
              {/* Visible rendered glowing wire */}
              <path
                d={pathD}
                fill="none"
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                style={{ filter: style.filter }}
                strokeLinecap="round"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWireId(wire.id);
                  setSelectedComponentId(null);
                }}
              />
              {/* Wire center indicator dot */}
              <circle
                cx={(start.x + end.x) / 2}
                cy={(start.y + end.y) / 2}
                r="3"
                fill={style.stroke}
              />
            </g>
          );
        })}

        {/* Render Pending Wire (from connecting pin to current mouse cursor) */}
        {connectingPin && (() => {
          const start = getPinCoordinate(connectingPin.componentId, connectingPin.pinId);
          if (!start) return null;
          const dx = mousePos.x - start.x;
          const pathD = `M ${start.x} ${start.y} C ${start.x + dx * 0.4} ${start.y}, ${mousePos.x - dx * 0.4} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`;

          return (
            <path
              d={pathD}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              className="animate-pulse"
            />
          );
        })()}
      </svg>

      {/* Render Component Blocks */}
      {components.map((comp) => {
        const isSelected = selectedComponentId === comp.id;
        const pins = COMPONENT_PINS[comp.type] || [];

        return (
          <div
            key={comp.id}
            onMouseDown={(e) => startDragComp(e, comp)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponentId(comp.id);
              setSelectedWireId(null);
            }}
            style={{ left: `${comp.x}px`, top: `${comp.y}px` }}
            className={`absolute z-10 transition-shadow select-none ${
              isSelected ? 'ring-2 ring-cyan-400 shadow-xl shadow-cyan-500/20' : ''
            }`}
          >
            {/* 1. IC 7476 Chip Component */}
            {comp.type === 'ic7476' && (
              <div className="relative w-[180px] h-[190px] rounded-xl border-2 border-cyan-500 bg-slate-900 shadow-2xl p-2.5 flex flex-col justify-between">
                {/* Chip Notch */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-3 rounded-b-full bg-slate-950 border border-cyan-500/50" />
                
                {/* Header */}
                <div className="text-center mt-1">
                  <div className="font-mono text-xs font-extrabold text-cyan-300 tracking-wider">SN7476N</div>
                  <div className="text-[9px] font-semibold text-slate-400">DUAL JK FLIP-FLOP</div>
                </div>

                {/* Center Logic Display */}
                <div className="my-auto rounded-lg border border-slate-800 bg-slate-950/80 p-2 text-center space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono">STATE MACHINE</div>
                  <div className="flex items-center justify-around font-mono text-sm font-bold">
                    <span className={currentQ ? "text-emerald-400" : "text-slate-500"}>Q={currentQ}</span>
                    <span className="text-slate-600">|</span>
                    <span className={currentQBar ? "text-cyan-400" : "text-slate-500"}>Q'={currentQBar}</span>
                  </div>
                  <div className="text-[9px] text-cyan-400 font-semibold uppercase">
                    {jLevel === 0 && kLevel === 0 ? 'HOLD' :
                     jLevel === 0 && kLevel === 1 ? 'RESET' :
                     jLevel === 1 && kLevel === 0 ? 'SET' : 'TOGGLE'}
                  </div>
                </div>

                {/* Render IC Pins */}
                {pins.map((p) => {
                  const isConnectingThis = connectingPin?.componentId === comp.id && connectingPin?.pinId === p.id;
                  let pinStyle = "bg-slate-700 border-slate-500 text-slate-300";
                  if (p.type === 'power') pinStyle = "bg-rose-950 border-rose-500 text-rose-300";
                  if (p.type === 'ground') pinStyle = "bg-slate-800 border-slate-400 text-slate-400";
                  if (p.type === 'output') pinStyle = "bg-emerald-950 border-emerald-500 text-emerald-300";
                  if (p.name === 'CLK') pinStyle = "bg-blue-950 border-blue-400 text-blue-300";

                  return (
                    <div
                      key={p.id}
                      onClick={(e) => handlePinClick(e, comp.id, p.id)}
                      style={{ left: `${p.x}px`, top: `${p.y}px` }}
                      title={`${p.label} - ${p.description}`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-mono font-bold transition hover:scale-125 cursor-pointer ${pinStyle} ${
                        isConnectingThis ? 'ring-4 ring-cyan-400 animate-ping' : ''
                      }`}
                    >
                      {p.label}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. J Switch */}
            {comp.type === 'switchJ' && (
              <div className="relative w-[110px] h-[80px] rounded-xl border border-emerald-500/40 bg-slate-900/90 p-2.5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">J INPUT</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSwitch(comp.id);
                    }}
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold transition ${
                      jLevel === 1 ? 'bg-emerald-500 text-slate-950 glow-green' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {jLevel === 1 ? 'HIGH (1)' : 'LOW (0)'}
                  </button>
                </div>
                <div className="text-[10px] text-slate-400">Set Data Pin</div>
                {/* Pin OUT */}
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400 bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    OUT
                  </div>
                ))}
              </div>
            )}

            {/* 3. K Switch */}
            {comp.type === 'switchK' && (
              <div className="relative w-[110px] h-[80px] rounded-xl border border-emerald-500/40 bg-slate-900/90 p-2.5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">K INPUT</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSwitch(comp.id);
                    }}
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold transition ${
                      kLevel === 1 ? 'bg-emerald-500 text-slate-950 glow-green' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {kLevel === 1 ? 'HIGH (1)' : 'LOW (0)'}
                  </button>
                </div>
                <div className="text-[10px] text-slate-400">Reset Data Pin</div>
                {/* Pin OUT */}
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400 bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    OUT
                  </div>
                ))}
              </div>
            )}

            {/* 4. Clock Generator */}
            {comp.type === 'clockGen' && (
              <div className="relative w-[140px] h-[100px] rounded-xl border-2 border-cyan-500 bg-slate-900/95 p-2.5 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300">CLOCK GEN</span>
                  <span className="font-mono text-[10px] text-cyan-400">
                    CLK={clkLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      pulseClock();
                    }}
                    title="Manual Pulse (Key: P)"
                    className="flex-1 rounded bg-cyan-500 hover:bg-cyan-400 px-2 py-1 text-[10px] font-extrabold text-slate-950 transition active:scale-95"
                  >
                    PULSE (P)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isClockRunning) stopAutoClock();
                      else startAutoClock();
                    }}
                    className={`rounded p-1 text-xs font-bold transition ${
                      isClockRunning ? 'bg-rose-500 text-white' : 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                    }`}
                  >
                    {isClockRunning ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Freq:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 5].map(f => (
                      <button
                        key={f}
                        onClick={(e) => {
                          e.stopPropagation();
                          setClockFreq(f);
                        }}
                        className={`rounded px-1 font-mono text-[9px] font-bold ${
                          clockFrequency === f ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {f}Hz
                      </button>
                    ))}
                  </div>
                </div>

                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400 bg-cyan-950 text-cyan-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    CLK
                  </div>
                ))}
              </div>
            )}

            {/* 5. Preset Switch (Active LOW) */}
            {comp.type === 'switchPreset' && (
              <div className="relative w-[120px] h-[75px] rounded-xl border border-amber-500/40 bg-slate-900/90 p-2 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">PRESET (PRE')</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSwitch(comp.id);
                    }}
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition ${
                      presetLevel === 0 ? 'bg-amber-500 text-slate-950 glow-orange' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {presetLevel === 0 ? '0 (ACTIVE)' : '1 (IDLE)'}
                  </button>
                </div>
                <div className="text-[9px] text-slate-400">Active LOW Override</div>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400 bg-amber-950 text-amber-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    PRE
                  </div>
                ))}
              </div>
            )}

            {/* 6. Clear Switch (Active LOW) */}
            {comp.type === 'switchClear' && (
              <div className="relative w-[120px] h-[75px] rounded-xl border border-rose-500/40 bg-slate-900/90 p-2 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-400">CLEAR (CLR')</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSwitch(comp.id);
                    }}
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition ${
                      clearLevel === 0 ? 'bg-rose-500 text-white glow-red' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {clearLevel === 0 ? '0 (ACTIVE)' : '1 (IDLE)'}
                  </button>
                </div>
                <div className="text-[9px] text-slate-400">Active LOW Override</div>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-rose-400 bg-rose-950 text-rose-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    CLR
                  </div>
                ))}
              </div>
            )}

            {/* 7. LED Q Indicator */}
            {comp.type === 'ledQ' && (
              <div className="relative w-[100px] h-[90px] rounded-xl border border-slate-800 bg-slate-900/95 p-2 flex flex-col items-center justify-between shadow-xl">
                <span className="font-mono text-xs font-bold text-slate-200">LED Q</span>
                {/* Glowing LED Bulb */}
                <div className={`h-8 w-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-mono text-xs font-extrabold ${
                  currentQ === 1 
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 glow-green' 
                    : 'bg-slate-950 border-slate-700 text-slate-600'
                }`}>
                  {currentQ}
                </div>
                <span className="text-[9px] font-mono text-slate-400">{currentQ ? 'HIGH (1)' : 'LOW (0)'}</span>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400 bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    IN
                  </div>
                ))}
              </div>
            )}

            {/* 8. LED Q' Indicator */}
            {comp.type === 'ledQBar' && (
              <div className="relative w-[100px] h-[90px] rounded-xl border border-slate-800 bg-slate-900/95 p-2 flex flex-col items-center justify-between shadow-xl">
                <span className="font-mono text-xs font-bold text-slate-200">LED Q'</span>
                {/* Glowing LED Bulb */}
                <div className={`h-8 w-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-mono text-xs font-extrabold ${
                  currentQBar === 1 
                    ? 'bg-cyan-500 border-cyan-300 text-slate-950 glow-cyan' 
                    : 'bg-slate-950 border-slate-700 text-slate-600'
                }`}>
                  {currentQBar}
                </div>
                <span className="text-[9px] font-mono text-slate-400">{currentQBar ? 'HIGH (1)' : 'LOW (0)'}</span>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400 bg-cyan-950 text-cyan-300 text-[9px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    IN
                  </div>
                ))}
              </div>
            )}

            {/* 9. +5V Power Supply */}
            {comp.type === 'powerSupply' && (
              <div className="relative w-[85px] h-[60px] rounded-xl border border-rose-500/40 bg-slate-900/90 p-2 flex flex-col justify-between shadow-lg">
                <div className="font-mono text-[11px] font-bold text-rose-400 flex items-center space-x-1">
                  <Power className="h-3 w-3" />
                  <span>+5V VCC</span>
                </div>
                <div className="text-[9px] text-slate-400">TTL Rail</div>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-rose-500 bg-rose-950 text-rose-300 text-[8px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    +5V
                  </div>
                ))}
              </div>
            )}

            {/* 10. Ground (GND) */}
            {comp.type === 'ground' && (
              <div className="relative w-[75px] h-[50px] rounded-xl border border-slate-700 bg-slate-900/90 p-2 flex flex-col justify-between shadow-lg">
                <div className="font-mono text-[11px] font-bold text-slate-300">GND (0V)</div>
                <div className="text-[9px] text-slate-500">Earth Ref</div>
                {pins.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePinClick(e, comp.id, p.id)}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 bg-slate-950 text-slate-300 text-[8px] font-mono font-bold hover:scale-125 cursor-pointer shadow"
                  >
                    GND
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Toolbar for selected element deletion */}
      {(selectedComponentId || selectedWireId) && (
        <div className="absolute bottom-4 left-4 z-30 flex items-center space-x-2 rounded-xl border border-rose-500/40 bg-slate-900/95 p-2 shadow-xl backdrop-blur-md">
          <span className="text-xs font-mono text-slate-300">
            Selected: <span className="text-cyan-300 font-bold">{selectedComponentId ? 'Component' : 'Wire'}</span>
          </span>
          <button
            onClick={() => {
              if (selectedComponentId) removeComponent(selectedComponentId);
              if (selectedWireId) removeWire(selectedWireId);
            }}
            className="flex items-center space-x-1 rounded-lg bg-rose-600 hover:bg-rose-500 px-3 py-1 text-xs font-bold text-white transition shadow"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
