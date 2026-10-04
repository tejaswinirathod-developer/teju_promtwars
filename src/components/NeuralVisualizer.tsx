import React, { useEffect, useRef } from 'react';

export const NeuralVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
      connections: number[];
      pulse: number;
    }

    const nodeColors = [
      { fill: '#6C4CF1', glow: 'rgba(108, 76, 241, 0.6)' },
      { fill: '#9275FF', glow: 'rgba(146, 117, 255, 0.6)' },
      { fill: '#39D5F6', glow: 'rgba(57, 213, 246, 0.7)' },
      { fill: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.8)' },
    ];

    const nodeCount = Math.min(42, Math.floor((width * height) / 10000) + 15);
    const nodes: Node[] = [];

    // Central clusters representing decision intelligence cortex
    for (let i = 0; i < nodeCount; i++) {
      const colorScheme = nodeColors[i % nodeColors.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 2,
        color: colorScheme.fill,
        glowColor: colorScheme.glow,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, `rgba(146, 117, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(57, 213, 246, ${alpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connection to mouse
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(57, 213, 246, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Update and render nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        // Bounce from boundaries
        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        // Gentle pulse on radius
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.7;

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = n.glowColor;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] lg:min-h-[460px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#101426] via-[#171B36] to-[#0A0D18] border border-[#6C4CF1]/20 shadow-2xl">
      {/* Background radial gradient highlights */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#6C4CF1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#39D5F6]/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

      {/* Central Glassmorphic Cortex Emblem */}
      <div className="relative z-10 pointer-events-none text-center p-6 rounded-2xl glass-panel-dark border border-[#9275FF]/30 shadow-2xl max-w-xs mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] p-[2px] mx-auto mb-3 shadow-lg shadow-[#6C4CF1]/40 animate-pulse">
          <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center">
            <span className="text-xl">👁️</span>
          </div>
        </div>
        <div className="text-sm font-bold text-white tracking-wide">
          Cognitive Neural Engine
        </div>
        <div className="text-xs text-[#39D5F6] font-mono mt-0.5">
          10 Analytical Dimensions
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center space-x-2 text-[10px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Blind Spot Mapping</span>
        </div>
      </div>
    </div>
  );
};
