import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Info, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { buildKnowledgeGraph } from '../services/conceptMatcher';

export default function KnowledgeGraphView({ 
  primaryConcept, 
  secondaryConcepts = [], 
  onSelectConcept 
}) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState(null);

  if (!primaryConcept) return null;

  const { nodes, edges } = buildKnowledgeGraph(primaryConcept, secondaryConcepts);

  // Layout calculation: place nodes in an aesthetically pleasing radial/bipartite network
  // Canvas coordinate system: 800 x 420
  const width = 800;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  const positionedNodes = nodes.map(node => {
    let x = centerX;
    let y = centerY;

    if (node.type === 'primary') {
      x = centerX;
      y = centerY;
    } else if (node.type === 'question') {
      x = centerX;
      y = centerY - 140;
    } else if (node.type === 'prerequisite') {
      // Position prerequisites on the left side
      const prereqs = nodes.filter(n => n.type === 'prerequisite');
      const idx = prereqs.findIndex(n => n.id === node.id);
      const total = prereqs.length;
      const step = total > 1 ? 220 / (total - 1) : 0;
      x = centerX - 240;
      y = centerY - 110 + (idx * step);
    } else if (node.type === 'successor') {
      // Position successors on the right side
      const succs = nodes.filter(n => n.type === 'successor');
      const idx = succs.findIndex(n => n.id === node.id);
      const total = succs.length;
      const step = total > 1 ? 200 / (total - 1) : 0;
      x = centerX + 240;
      y = centerY - 90 + (idx * step);
    } else if (node.type === 'secondary') {
      // Position secondary related concepts at the bottom
      const secs = nodes.filter(n => n.type === 'secondary');
      const idx = secs.findIndex(n => n.id === node.id);
      x = centerX - 90 + (idx * 180);
      y = centerY + 130;
    }

    return { ...node, x, y };
  });

  const getNodePos = (id) => positionedNodes.find(n => n.id === id) || { x: centerX, y: centerY };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 relative">
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            Interactive Knowledge Graph
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
            Prerequisites & Extension Hierarchy
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Question
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Prerequisite
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500"></span> Primary Concept
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span> Successor
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-x-auto bg-slate-950/60 rounded-xl border border-slate-850 p-2">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto min-w-[650px] select-none"
        >
          <defs>
            {/* Arrowhead marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
            </marker>
            {/* Highlighted Arrowhead marker */}
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
            </marker>
            {/* Glow Filter for primary node */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* EDGES / CONNECTIONS */}
          {edges.map((edge, idx) => {
            const start = getNodePos(edge.from);
            const end = getNodePos(edge.to);
            const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

            return (
              <g key={idx}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isHighlighted ? '#818cf8' : '#334155'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={edge.style === 'dashed' ? '5,5' : edge.style === 'dotted' ? '2,4' : 'none'}
                  markerEnd={isHighlighted ? 'url(#arrow-active)' : 'url(#arrow)'}
                  className="transition-all duration-300"
                />
                {/* Edge Label */}
                {edge.label && (
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 - 6}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                    className="font-mono select-none"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* NODES */}
          {positionedNodes.map(node => {
            const isHovered = hoveredNode === node.id;
            const isPrimary = node.type === 'primary';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => {
                  setHoveredNode(node.id);
                  setSelectedNodeInfo(node);
                }}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  if (node.type !== 'question' && onSelectConcept) {
                    onSelectConcept(node.id);
                  }
                }}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                {/* Pulsing ring for primary concept */}
                {isPrimary && (
                  <circle
                    r={node.size + 8}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="animate-ping"
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  r={node.size}
                  fill={isPrimary ? '#312e81' : '#0f172a'}
                  stroke={node.color}
                  strokeWidth={isHovered ? 3 : 2}
                  filter={isPrimary ? 'url(#glow)' : 'none'}
                />

                {/* Node Text Label */}
                <text
                  textAnchor="middle"
                  dy={node.size + 16}
                  fill={isHovered ? '#ffffff' : '#cbd5e1'}
                  fontSize={isPrimary ? "11" : "10"}
                  fontWeight={isPrimary ? "700" : "500"}
                  className="select-none pointer-events-none drop-shadow"
                >
                  {node.label.length > 22 ? `${node.label.substring(0, 20)}...` : node.label}
                </text>

                {/* Inner Icon / Letter */}
                <text
                  textAnchor="middle"
                  dy="4"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  className="pointer-events-none font-mono"
                >
                  {node.type === 'question' ? '?' : node.type === 'prerequisite' ? 'REQ' : node.type === 'successor' ? 'NXT' : '★'}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip / Node Detail card */}
        {selectedNodeInfo && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs p-3 rounded-xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-md animate-fade-in text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white">{selectedNodeInfo.label}</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                {selectedNodeInfo.type}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {selectedNodeInfo.type === 'question' && 'The practice problem provided as input to the semantic matcher.'}
              {selectedNodeInfo.type === 'primary' && 'Target Core Concept detected with highest confidence.'}
              {selectedNodeInfo.type === 'prerequisite' && 'Foundational prerequisite topic you must master before this concept.'}
              {selectedNodeInfo.type === 'successor' && 'Advanced topic that directly builds on top of this foundation.'}
              {selectedNodeInfo.type === 'secondary' && 'Interconnected concept frequently co-occurring in exam problems.'}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
        <span>Click any prerequisite or successor node to navigate knowledge tree</span>
        <span className="text-indigo-400 font-medium">Auto-generated Prerequisite Hierarchy</span>
      </div>

    </div>
  );
}
