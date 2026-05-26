/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hammer, Clock, ShieldAlert, Award, ChevronRight, Play } from 'lucide-react';
import { DIY_PROJECTS, PRODUCTS } from '../data/hardwareData';
import { Product } from '../types';

interface DiyGuideSectionProps {
  onOpenDetails: (p: Product) => void;
}

export default function DiyGuideSection({ onOpenDetails }: DiyGuideSectionProps) {
  const resolveProduct = (pId: string): Product | undefined => {
    return PRODUCTS.find(p => p.id === pId);
  };

  const getDifficultyStyle = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Pro':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <section id="diy-guides-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 mb-2 bg-slate-100 border border-slate-200 rounded text-slate-700 text-[10.5px] font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>DIY Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight font-sans">
            DIY Builder Blueprints & Guides
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Step-by-step master guides for home repairs and wood crafts. Click the required tools to examine detailed guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {DIY_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col justify-between bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 h-full"
          >
            {/* Project Header */}
            <div className="p-6 border-b border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getDifficultyStyle(project.difficulty)}`}>
                  {project.difficulty}
                </span>

                <div className="flex items-center text-[11px] text-slate-500 font-bold">
                  <Clock className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
                  <span>{project.timeNeeded}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Steps & Walkthrough */}
            <div className="p-6 flex-1 bg-slate-50/50 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Project Steps</span>
              
              <ul className="space-y-3.5">
                {project.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-700">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-amber-500 text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Hardware / Material Attachment */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Required Materials</span>
              
              <div className="flex flex-wrap gap-1.5">
                {project.requiredItems.map((itemId) => {
                  const resolvedProduct = resolveProduct(itemId);
                  if (!resolvedProduct) return null;
                  return (
                    <button
                      key={itemId}
                      onClick={() => onOpenDetails(resolvedProduct)}
                      className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-950 border border-slate-200 hover:border-amber-300 text-[11px] font-bold text-slate-700 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{resolvedProduct.name.split(' ')[0]} {resolvedProduct.name.split(' ')[1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
