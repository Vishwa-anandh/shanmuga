/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Table, ToggleLeft, ToggleRight, Hammer, Check, CheckSquare, Square } from 'lucide-react';
import { calculateProjectMaterials, EST_PROJECTS, PRODUCTS } from '../data/hardwareData';
import { Product } from '../types';

interface DiyEstimatorProps {
  onOpenDetails: (p: Product) => void;
}

export default function DiyEstimator({
  onOpenDetails
}: DiyEstimatorProps) {
  const [projectKey, setProjectKey] = useState<keyof typeof EST_PROJECTS>('PAINTING');
  const [width, setWidth] = useState<number>(12);
  const [length, setLength] = useState<number>(14);
  const [height, setHeight] = useState<number>(8); // Only for painting
  const [units, setUnits] = useState<'feet' | 'meters'>('feet');

  // Perform calculation of materials
  const calculation = calculateProjectMaterials(projectKey, { width, length, height, units });

  // Map product names mock lists to exact live store Products to allow click details or additions
  const resolveStoreProduct = (pId: string): Product | undefined => {
    return PRODUCTS.find(p => p.id === pId);
  };

  return (
    <section id="diy-estimator-section" className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-black text-slate-950 tracking-tight font-sans">
            DIY Materials Plan Estimator
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Avoid second-trip hardware runs. Choose your standard housing scope coordinates, and we&rsquo;ll calculate required weights, items, and accessories automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: configure coordinates */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center">
              <Table className="w-4 h-4 mr-2 text-slate-400" />
              <span>1. Choose Project Scope</span>
            </h3>

            {/* Select Project Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Project Type</label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(EST_PROJECTS).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setProjectKey(key as keyof typeof EST_PROJECTS);
                      // Set logical defaults based on project
                      if (key === 'PAINTING') { setWidth(12); setLength(14); setHeight(8); }
                      else if (key === 'DECKING') { setWidth(10); setLength(16); }
                      else if (key === 'DRYWALL') { setWidth(14); setLength(20); }
                    }}
                    className={`p-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                      projectKey === key
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-800/10'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{name}</span>
                    <ArrowRight className="w-4 h-4 opacity-75" />
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Units (Feet vs Meters) */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-800">Unit Coordinates</span>
                <p className="text-[10px] text-slate-400 leading-tight">Switch between metric and imperial dimensions</p>
              </div>
              <button
                onClick={() => setUnits(u => u === 'feet' ? 'meters' : 'feet')}
                className="flex items-center space-x-1 bg-white border border-slate-250 py-1 px-3 rounded-lg text-xs font-bold shadow-sm cursor-pointer hover:bg-slate-50"
              >
                <span>{units === 'feet' ? 'Imperial (Feet)' : 'Metric (Meters)'}</span>
              </button>
            </div>

            {/* Dimensional Coordinates */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dimension Coordinates</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 mb-1 block">Width ({units === 'feet' ? 'ft' : 'm'})</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 mb-1 block">Length ({units === 'feet' ? 'ft' : 'm'})</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={length}
                    onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {projectKey === 'PAINTING' && (
                <div>
                  <label className="text-[11px] font-bold text-slate-600 mb-1 block">Wall Height ({units === 'feet' ? 'ft' : 'm'})</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={height}
                    onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right panel: dynamic outcomes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Hammer className="w-32 h-32" />
              </div>

              <div className="relative">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">AUTOMATED ESTIMATE ANALYSIS</span>
                <h3 className="font-extrabold text-lg flex items-center text-white">
                  <span>Bill of Materials Statement</span>
                </h3>
                
                <p className="text-xs text-slate-300 mt-3 font-normal leading-relaxed italic bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                  &ldquo;{calculation.message}&rdquo;
                </p>

                {/* Materials List */}
                <div className="mt-6 space-y-3">
                  {calculation.items.map((item, idx) => {
                    const storeProd = resolveStoreProduct(item.primaryProductId);
                    return (
                      <div 
                        key={idx} 
                        className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-600 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950">
                              QTY {item.qtyNeeded}
                            </span>
                            <h4 className="text-xs font-bold text-white">{item.itemName}</h4>
                          </div>
                          <p className="text-[11px] text-slate-450 leading-normal font-medium">{item.explanation}</p>
                        </div>

                        {storeProd && (
                          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                            {/* Fast View */}
                            <button
                              onClick={() => onOpenDetails(storeProd)}
                              className="text-[10px] font-extrabold text-slate-300 hover:text-white border border-slate-650 hover:bg-slate-700 py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
                            >
                              Check Specs
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* End Analysis */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
