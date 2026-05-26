/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, CheckCircle, ShieldCheck, Truck, Sparkles, X } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: readonly string[];
  totalProductsCount: number;
}

// Map icon string string to actual Lucide react components for custom fallbacks inside 3D
function ProductIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  return <Sparkles className={className} />;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalProductsCount
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let baseAngleX = 0.6;
    let baseAngleY = 0.4;

    // 3D Hexagonal Nut Math Coordinates
    const r1 = 110;    // Outer hex radius
    const r2 = 65;     // Inner circle/hex hole radius
    const depth = 40;  // Extrusion half-thickness

    const vertices: { x: number; y: number; z: number }[] = [];
    
    // Top Outer Hex (0..5)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: r1 * Math.cos(angle), y: r1 * Math.sin(angle), z: -depth });
    }
    // Top Inner Hex (6..11)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: r2 * Math.cos(angle), y: r2 * Math.sin(angle), z: -depth });
    }
    // Bottom Outer Hex (12..17)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: r1 * Math.cos(angle), y: r1 * Math.sin(angle), z: depth });
    }
    // Bottom Inner Hex (18..23)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: r2 * Math.cos(angle), y: r2 * Math.sin(angle), z: depth });
    }

    // Connect structural wireframe edges
    const edges: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      edges.push([i, next]);           // Top Outer
      edges.push([i + 6, next + 6]);   // Top Inner
      edges.push([i + 12, next + 12]); // Bottom Outer
      edges.push([i + 18, next + 18]); // Bottom Inner
      edges.push([i, i + 12]);         // Vertical Outer Pillar
      edges.push([i + 6, i + 18]);     // Vertical Inner Pillar
      edges.push([i, i + 6]);          // Top Connector Spokes
      edges.push([i + 12, i + 18]);    // Bottom Connector Spokes
    }

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow dynamic spin + reactive mouse parallax displacement
      baseAngleX += 0.0025;
      baseAngleY += 0.0018;
      
      const angleX = baseAngleX + mouse.y * 0.35;
      const angleY = baseAngleY + mouse.x * 0.35;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const fov = 350;
      const cx = canvas.width * 0.78; // offset to the right side of the banner
      const cy = canvas.height * 0.45;

      const projected = vertices.map(v => {
        // Rotate X axis
        const y1 = v.y * cosX - v.z * sinX;
        const z1 = v.y * sinX + v.z * cosX;

        // Rotate Y axis
        const x2 = v.x * cosY + z1 * sinY;
        const z2 = -v.x * sinY + z1 * cosY;

        const scale = fov / (fov + z2);
        return {
          x: x2 * scale + cx,
          y: y1 * scale + cy,
          visible: z2 > -fov
        };
      });

      // Draw wireframe connector lines
      ctx.lineWidth = 1.25;
      edges.forEach(([p1, p2]) => {
        const pt1 = projected[p1];
        const pt2 = projected[p2];

        if (pt1.visible && pt2.visible) {
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          
          const grad = ctx.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y);
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.25)'); // Glowing Amber
          grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.12)'); // Darker Orange
          grad.addColorStop(1, 'rgba(245, 158, 11, 0.25)');
          
          ctx.strokeStyle = grad;
          ctx.stroke();
        }
      });

      // Draw metallic nodes
      projected.forEach((p, idx) => {
        if (p.visible) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = idx < 12 ? 'rgba(245, 158, 11, 0.75)' : 'rgba(249, 115, 22, 0.75)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mouse]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-8 py-12 px-6 sm:px-12 shadow-2xl"
    >
      {/* Absolute Decorative Background Panels */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(51,65,85,0.6),transparent_50%)] pointer-events-none" />
      
      {/* Interactive 3D Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Steel Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Sparkle Tag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-1 px-3 py-1 mb-5 bg-slate-800/80 border border-slate-700/60 rounded-full text-amber-500 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>INDUSTRIAL GRADE TOUGHNESS</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
          className="text-3xl sm:text-5xl font-black tracking-tight font-sans leading-tight"
        >
          Tools, Hardware & Heavy Materials
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
            Forged to Endure.
          </span>
        </motion.h1>

        {/* Tagline text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium"
        >
          Source trusted contractor-grade equipment, precision tools, and leak-proof fitting solutions. Backed by 100% replacement policies and support for your DIY weekend blueprints.
        </motion.p>

        {/* Central Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-md opacity-20 group-focus-within:opacity-40 transition-all duration-300 pointer-events-none" />
          <div className="relative flex items-center bg-slate-800/90 border-2 border-slate-700 focus-within:border-amber-400 focus-within:bg-slate-950 rounded-2xl p-1 shadow-inner transition-all">
            <Search className="w-5.5 h-5.5 text-slate-400 ml-3 shrink-0" />
            <input
              id="hero-search-input"
              type="text"
              placeholder="Search wood screws, drill sets, multimeters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm px-3 py-2.5 placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md shrink-0 cursor-pointer">
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick Stats/Count Info */}
        <p className="mt-3 text-xs text-slate-400 font-medium">
          {searchQuery ? (
            <span>Showing results for &ldquo;{searchQuery}&rdquo; &bull; Found {totalProductsCount} match(es)</span>
          ) : (
            <span>Browse our collection of {totalProductsCount} premium hardwares & materials</span>
          )}
        </p>

        {/* Quick Categories list in Hero for fast jumping */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-slate-800/80 hover:bg-slate-755 border border-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Trust badging footer */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-6 text-xs text-slate-300 z-10 relative"
      >
        <div className="flex items-center space-x-3 bg-slate-800/45 p-3 rounded-2xl border border-slate-800/80 w-full sm:w-auto">
          <Truck className="w-5 h-5 text-amber-500" />
          <div className="text-left">
            <h4 className="font-extrabold text-white">Free Curbside Pickup</h4>
            <p className="text-[10px] text-slate-400">Ready in 2 Hours or less</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-slate-800/45 p-3 rounded-2xl border border-slate-800/80 w-full sm:w-auto">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <div className="text-left">
            <h4 className="font-extrabold text-white">Contractor Grade</h4>
            <p className="text-[10px] text-slate-400">Tested in extreme operations</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-slate-800/45 p-3 rounded-2xl border border-slate-800/80 w-full sm:w-auto">
          <CheckCircle className="w-5 h-5 text-amber-500" />
          <div className="text-left">
            <h4 className="font-extrabold text-white">Lifetime Support Guarantee</h4>
            <p className="text-[10px] text-slate-400">Easy returns if unsatisifed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
