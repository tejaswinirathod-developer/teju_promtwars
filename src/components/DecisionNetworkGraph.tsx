import React, { useState } from 'react';
import { AnalysisResult, DecisionInput } from '../types';
import { Eye, AlertTriangle, AlertCircle, Sparkles, HelpCircle, Layers, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface DecisionNetworkGraphProps {
  decision: DecisionInput;
  analysis: AnalysisResult;
}

interface NetworkNode {
  id: string;
  type: 'decision' | 'assumption' | 'risk' | 'opportunity' | 'missing' | 'perspective';
  label: string;
  title: string;
  detail: string;
  actionOrMitigation?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  x: number;
  y: number;
}

export const DecisionNetworkGraph: React.FC<DecisionNetworkGraphProps> = ({
  decision,
  analysis,
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Generate node positions in an organic concentric radial distribution
  const nodes: NetworkNode[] = [];

  // Center node: Decision
  const centerNode: NetworkNode = {
    id: 'center-decision',
    type: 'decision',
    label: 'Decision Core',
    title: decision.title,
    detail: decision.description || 'Core decision focal point analyzed across 10 dimensions.',
    actionOrMitigation: decision.expectedOutcome,
    color: '#39D5F6',
    bgColor: '#101426',
    borderColor: '#39D5F6',
    x: 500,
    y: 300,
  };
  nodes.push(centerNode);

  // Satellite nodes
  const satellites: Array<{
    type: 'assumption' | 'risk' | 'opportunity' | 'missing' | 'perspective';
    title: string;
    detail: string;
    actionOrMitigation?: string;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }> = [];

  (analysis.hidden_assumptions || []).slice(0, 3).forEach((ha, idx) => {
    satellites.push({
      type: 'assumption',
      label: `Assumption ${idx + 1}`,
      title: ha.assumption,
      detail: ha.why_unsupported,
      actionOrMitigation: `Verification: ${ha.verification_step}`,
      color: '#9275FF',
      bgColor: '#101426',
      borderColor: '#6C4CF1',
    });
  });

  (analysis.risks || []).slice(0, 3).forEach((r, idx) => {
    satellites.push({
      type: 'risk',
      label: `Risk ${idx + 1}`,
      title: r.risk,
      detail: `Impact: ${r.impact} | Likelihood: ${r.likelihood}`,
      actionOrMitigation: `Mitigation: ${r.mitigation}`,
      color: '#EF4444',
      bgColor: '#101426',
      borderColor: '#EF4444',
    });
  });

  (analysis.opportunities || []).slice(0, 2).forEach((op, idx) => {
    satellites.push({
      type: 'opportunity',
      label: `Opportunity ${idx + 1}`,
      title: op.opportunity,
      detail: op.potential_upside,
      actionOrMitigation: `Capture: ${op.how_to_capture}`,
      color: '#10B981',
      bgColor: '#101426',
      borderColor: '#10B981',
    });
  });

  (analysis.missing_information || []).slice(0, 2).forEach((mi, idx) => {
    satellites.push({
      type: 'missing',
      label: `Data Gap ${idx + 1}`,
      title: mi.missing_factor,
      detail: mi.why_critical,
      actionOrMitigation: `Source: ${mi.how_to_obtain}`,
      color: '#39D5F6',
      bgColor: '#101426',
      borderColor: '#39D5F6',
    });
  });

  (analysis.alternative_perspectives || []).slice(0, 2).forEach((ap, idx) => {
    satellites.push({
      type: 'perspective',
      label: ap.stakeholder,
      title: `Viewpoint of ${ap.stakeholder}`,
      detail: ap.viewpoint,
      actionOrMitigation: `Question: "${ap.key_question}"`,
      color: '#A855F7',
      bgColor: '#101426',
      borderColor: '#A855F7',
    });
  });

  // Calculate circular coordinates
  const totalSatellites = satellites.length;
  satellites.forEach((sat, index) => {
    const angle = (index / totalSatellites) * (Math.PI * 2) - Math.PI / 2;
    // Vary radius slightly for dynamic cluster look
    const radius = index % 2 === 0 ? 210 : 235;
    nodes.push({
      id: `node-${sat.type}-${index}`,
      type: sat.type,
      label: sat.label,
      title: sat.title,
      detail: sat.detail,
      actionOrMitigation: sat.actionOrMitigation,
      color: sat.color,
      bgColor: sat.bgColor,
      borderColor: sat.borderColor,
      x: 500 + Math.cos(angle) * radius,
      y: 300 + Math.sin(angle) * radius,
    });
  });

  const filteredNodes = filterType === 'all' 
    ? nodes 
    : nodes.filter((n) => n.type === 'decision' || n.type === filterType);

  return (
    <div className="bg-[#101426] rounded-2xl border border-[#6C4CF1]/20 shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C4CF1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#39D5F6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#39D5F6] bg-[#39D5F6]/10 px-2.5 py-1 rounded-full border border-[#39D5F6]/20 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#39D5F6]" />
            <span>Interactive Node Topology</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Decision Neural Topology Graph
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Click on any node to inspect interconnected dependencies, vulnerabilities, and mitigations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-[#6C4CF1] to-[#9275FF] text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Connections
          </button>
          <button
            onClick={() => setFilterType('assumption')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
              filterType === 'assumption' ? 'bg-[#9275FF]/30 text-[#9275FF] border border-[#9275FF]' : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#9275FF]" />
            <span>Assumptions</span>
          </button>
          <button
            onClick={() => setFilterType('risk')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
              filterType === 'risk' ? 'bg-[#EF4444]/30 text-[#EF4444] border border-[#EF4444]' : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span>Risks</span>
          </button>
          <button
            onClick={() => setFilterType('opportunity')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
              filterType === 'opportunity' ? 'bg-[#10B981]/30 text-[#10B981] border border-[#10B981]' : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Opportunities</span>
          </button>
          <button
            onClick={() => setFilterType('missing')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
              filterType === 'missing' ? 'bg-[#39D5F6]/30 text-[#39D5F6] border border-[#39D5F6]' : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#39D5F6]" />
            <span>Data Gaps</span>
          </button>
        </div>
      </div>

      {/* SVG Network Viewport */}
      <div className="relative w-full h-[520px] my-4 overflow-hidden rounded-xl border border-white/5 bg-[#0B0E1B]/60 flex items-center justify-center">
        <svg
          viewBox="200 60 600 480"
          className="w-full h-full select-none cursor-default"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C4CF1" />
              <stop offset="50%" stopColor="#9275FF" />
              <stop offset="100%" stopColor="#39D5F6" />
            </linearGradient>

            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines from Center to Satellites */}
          {filteredNodes
            .filter((n) => n.id !== 'center-decision')
            .map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g key={`edge-${node.id}`}>
                  <line
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={isSelected ? '#39D5F6' : node.color}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    strokeDasharray={node.type === 'missing' ? '4,4' : 'none'}
                  />
                  {/* Pulse along line */}
                  <circle
                    r={isSelected ? 3 : 2}
                    fill={node.color}
                    opacity="0.8"
                  >
                    <animate
                      attributeName="cx"
                      values={`${centerNode.x};${node.x}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${centerNode.y};${node.y}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}

          {/* Satellite Nodes */}
          {filteredNodes
            .filter((n) => n.id !== 'center-decision')
            .map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform duration-200"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  {/* Outer pulse */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 26 : 20}
                    fill={node.color}
                    opacity={isSelected ? 0.25 : 0.12}
                  />

                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 18 : 14}
                    fill="#101426"
                    stroke={node.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    filter={isSelected ? 'url(#glow)' : undefined}
                  />

                  {/* Inner Node Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 6 : 4}
                    fill={node.color}
                  />

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9px"
                    fontWeight="600"
                    opacity={isSelected ? 1 : 0.8}
                    className="select-none pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

          {/* Center Decision Node */}
          <g
            onClick={() => setSelectedNode(centerNode)}
            className="cursor-pointer"
          >
            {/* Outer halo */}
            <circle
              cx={centerNode.x}
              cy={centerNode.y}
              r={52}
              fill="url(#centerGradient)"
              opacity="0.25"
            />
            {/* Mid ring */}
            <circle
              cx={centerNode.x}
              cy={centerNode.y}
              r={42}
              fill="#101426"
              stroke="#39D5F6"
              strokeWidth="2"
              filter="url(#glow)"
            />
            {/* Core icon text */}
            <text
              x={centerNode.x}
              y={centerNode.y + 4}
              textAnchor="middle"
              fill="#39D5F6"
              fontSize="14px"
              fontWeight="bold"
              className="select-none"
            >
              DECISION
            </text>
            <text
              x={centerNode.x}
              y={centerNode.y + 16}
              textAnchor="middle"
              fill="#9275FF"
              fontSize="8px"
              fontWeight="bold"
              className="select-none"
            >
              CORE FOCUS
            </text>
          </g>
        </svg>

        {/* Overlay instruction */}
        <div className="absolute bottom-3 left-4 text-[10px] text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39D5F6] animate-pulse" />
          <span>Click any node in the topology network to inspect details</span>
        </div>
      </div>

      {/* Selected Node Inspector Drawer / Card */}
      {selectedNode ? (
        <div className="bg-[#171B36] p-5 rounded-xl border border-white/15 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedNode.color }}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  {selectedNode.type} &mdash; {selectedNode.label}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                {selectedNode.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            {selectedNode.detail}
          </p>

          {selectedNode.actionOrMitigation && (
            <div className="mt-3 p-3 rounded-lg bg-black/40 border border-white/10 text-xs flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#39D5F6] shrink-0 mt-0.5" />
              <span className="text-white">
                {selectedNode.actionOrMitigation}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#171B36]/60 p-4 rounded-xl border border-white/5 text-center text-xs text-gray-400">
          Tip: Click on any satellite node to reveal its underlying rationale, risk level, or verification plan.
        </div>
      )}
    </div>
  );
};
