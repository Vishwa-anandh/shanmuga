/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, CheckCircle, ShieldCheck, Truck, ShieldAlert, Sparkles, X } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: readonly string[];
  totalProductsCount: number;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalProductsCount
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-8 py-12 px-6 sm:px-12 shadow-2xl">
      {/* Absolute Decorative Background Panels */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(51,65,85,0.7),transparent_50%)]" />
      
      {/* Steel Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Sparkle Tag */}
        <div className="inline-flex items-center space-x-1 px-3 py-1 mb-5 bg-slate-800/80 border border-slate-700/60 rounded-full text-amber-500 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INDUSTRIAL GRADE TOUGHNESS</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans leading-tight">
          Tools, Hardware & Heavy Materials
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
            Forged to Endure.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
          Source trusted contractor-grade equipment, precision tools, and leak-proof fitting solutions. Backed by 100% replacement policies and support for your DIY weekend blueprints.
        </p>

        {/* Central Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-md opacity-30 group-focus-within:opacity-50 transition-all duration-300" />
          <div className="relative flex items-center bg-slate-800 border-2 border-slate-700 focus-within:border-amber-400 focus-within:bg-slate-950 rounded-2xl p-1 shadow-inner transition-all">
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
        </div>

        {/* Quick Stats/Count Info */}
        <p className="mt-3 text-xs text-slate-400 font-medium">
          {searchQuery ? (
            <span>Showing results for &ldquo;{searchQuery}&rdquo; &bull; Found {totalProductsCount} match(es)</span>
          ) : (
            <span>Browse our collection of {totalProductsCount} premium hardwares & materials</span>
          )}
        </p>

        {/* Quick Categories list in Hero for fast jumping */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
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
        </div>
      </div>

      {/* Trust badging footer */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-6 text-xs text-slate-300">
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
      </div>
    </div>
  );
}
