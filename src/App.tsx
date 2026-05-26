/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  HelpCircle, 
  ChevronRight, 
  Hammer, 
  Wrench, 
  Activity, 
  Cpu, 
  Sparkles, 
  SlidersHorizontal,
  RotateCcw,
  CheckCircle,
  Truck,
  Heart,
  Briefcase,
  Layers,
  Flame
} from 'lucide-react';

import { Product } from './types';
import { PRODUCTS, CATEGORIES } from './data/hardwareData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsDrawer from './components/ProductDetailsDrawer';
import DiyEstimator from './components/DiyEstimator';
import DiyGuideSection from './components/DiyGuideSection';
import CompareModal from './components/CompareModal';
import { motion, AnimatePresence } from 'motion/react';

function CompareThumbnail({ product }: { product: Product; key?: string }) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-amber-400 select-none" title={product.name}>
        <span className="text-[8px] font-black tracking-tighter">{product.brand.slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }
  
  return (
    <img
      src={product.imageUrl}
      onError={() => setImageError(true)}
      referrerPolicy="no-referrer"
      alt={product.name}
      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover bg-white"
    />
  );
}

export default function App() {
  // Main catalog states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Departments');
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Comparison states
  const [selectedForCompare, setSelectedForCompare] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (product: Product) => {
    setSelectedForCompare((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 items max.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  // Advanced query sorting state
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Extract unique brands
  const uniqueBrands = useMemo(() => {
    const brands = new Set(PRODUCTS.map(p => p.brand));
    return ['All Brands', ...Array.from(brands).sort()];
  }, []);

  // Filter & Sort Logic Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Department Filter
      const matchesCategory = selectedCategory === 'All Departments' || product.category === selectedCategory;

      // 2. Brand Filter
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;

      // 3. Keyword Search Integration
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.features.some(f => f.toLowerCase().includes(query)) ||
        Object.entries(product.specs).some(([k, v]) => k.toLowerCase().includes(query) || v.toLowerCase().includes(query));

      return matchesCategory && matchesBrand && matchesSearch;
    }).sort((a, b) => {
      // 4. Sorting directives
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // relevance / standard index list default
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  // Smooth layout navigation scrolling helpers
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-slate-900">
      
      {/* Corporate Nav Menu */}
      <Navbar 
        onScrollToEstimator={() => handleScrollToSection('diy-estimator-section')}
        onScrollToGuides={() => handleScrollToSection('diy-guides-section')}
      />

      <div className="max-w-7xl mx-auto pb-16">
        
        {/* Banner Hero Showcase with integrated filters */}
        <Hero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
          totalProductsCount={filteredProducts.length}
        />

        {/* Main Content layout Area */}
        <div className="px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Advanced Side Filters Widget */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-500" />
                  <span>Trade Filters</span>
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Departments');
                    setSelectedBrand('All Brands');
                    setSortBy('relevance');
                  }}
                  className="text-amber-600 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset Queries"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Department Navigation */}
              <div className="space-y-2">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest block">Departments</label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-100 text-slate-950 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Navigation */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest block">Brands</label>
                <div className="space-y-1">
                  {uniqueBrands.map((brand) => {
                    const isSelected = selectedBrand === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`w-full text-left py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-100 text-slate-950 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>{brand}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pro Desk Fast Pickup Prompt */}
              <div className="bg-slate-950 text-white rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-slate-900/40 rounded-full" />
                <h4 className="text-xs font-bold text-amber-400 flex items-center">
                  <Flame className="w-4 h-4 mr-1.5" />
                  <span>Aisle Locator Assist</span>
                </h4>
                <p className="text-[10.5px] text-slate-355 leading-normal font-medium leading-relaxed">
                  Every product listed on our smart catalog carries dynamic warehouse coordinates so you can inspect physical boxes in Bay compartments.
                </p>
              </div>

            </div>
          </div>

          {/* Right panel: Active Product listing Showcase */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Catalog Subbar (Sort & Count information) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3 text-slate-550">
                <span className="font-bold text-slate-800">Department:</span>
                <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg">
                  {selectedCategory}
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-bold text-slate-600">{filteredProducts.length} unique materials listed</span>
              </div>

              {/* Sort selector */}
              <div className="flex items-center space-x-2 w-full sm:w-auto self-stretch sm:self-auto justify-between sm:justify-start">
                <span className="font-semibold text-slate-500 shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-250 hover:bg-white text-slate-800 font-bold py-1.5 px-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="relevance">Relevance Standard</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Grid of Products */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl py-24 text-center space-y-3 px-6">
                <div className="text-slate-350 flex justify-center">
                  <Wrench className="w-12 h-12 stroke-1" />
                </div>
                <div>
                  <h3 className="text-slate-800 font-bold text-sm sm:text-base">No Hardware Items Match Your Search</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-normal font-medium">
                    Try adjusting your structural filters, or search with less specific keywords.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Departments');
                    setSelectedBrand('All Brands');
                  }}
                  className="bg-slate-900 text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors inline-block"
                >
                  Clear Active Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={setSelectedProduct}
                    isCompared={selectedForCompare.some((p) => p.id === product.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Section: DIY plan materials Calculator estimator */}
        <div className="mt-16">
          <DiyEstimator 
            onOpenDetails={setSelectedProduct}
          />
        </div>

        {/* Section: Detailed hardware walkthrough step guides */}
        <div className="mt-16">
          <DiyGuideSection 
            onOpenDetails={setSelectedProduct}
          />
        </div>

        {/* Professional Services section - Bento Grid */}
        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            {/* Absolute backgrounds */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-800/20 to-transparent rounded-full blur-2xl" />

            <div className="relative text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">Pro Desk Logistics</span>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">Sri Shanmuga Hardwares Store Services</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-medium">
                We do more than stock boxes. Stop by our in-store workshops or consult with our physical contractors at the Pro Desk for professional custom fabrication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  title: 'Precise Key Cutting',
                  description: 'Duplicate house, auto, or padlocks with high-precision computer tooling in under two minutes.',
                  icon: Hammer,
                  tag: 'Station A'
                },
                {
                  title: 'Custom Paint Color match',
                  description: 'Bring any fabric flake, paper cutting, or flake. Our spectro-analyzer mixes formulas perfectly.',
                  icon: SlidersHorizontal,
                  tag: 'Station B'
                },
                {
                  title: 'Pipe Threading & Cutting',
                  description: 'Black steel, galvanized, or PVC threaded to your custom dimensional blueprint specs manually.',
                  icon: Wrench,
                  tag: 'Plumbing Bay'
                },
                {
                  title: 'Jobsite Delivery',
                  description: 'Have heavy lumber, framing studs, or cement loadout dispatched directly to your construction zone.',
                  icon: Truck,
                  tag: 'Shipping Dock'
                }
              ].map((serv, index) => (
                <div 
                  key={index} 
                  className="bg-slate-850 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all group"
                >
                  <span className="text-[10px] font-bold text-amber-500 uppercase bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-800 tracking-wider">
                    {serv.tag}
                  </span>
                  <div className="mt-4 p-2.5 bg-slate-905 w-fit rounded-xl text-amber-500 group-hover:scale-105 transition-transform">
                    <serv.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base mt-4">{serv.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{serv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Slide-out details drawer */}
      <ProductDetailsDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Humbler footer block */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-slate-800 text-amber-500 flex items-center justify-center">
              <img src="./logo.png" alt="Logo" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-black text-white uppercase tracking-wider">Sri Shanmuga Hardwares Showcase</span>
          </div>
          <p className="text-slate-500">&copy; 2026 Sri Shanmuga Hardwares Co. All Rights Reserved. Licensed for Trade Pro Blueprints.</p>
        </div>
      </footer>

      {/* Floating Compare Button */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center space-x-3 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <div className="flex -space-x-2">
              {selectedForCompare.map(p => (
                <CompareThumbnail key={p.id} product={p} />
              ))}
            </div>
            <span>Compare {selectedForCompare.length} Item{selectedForCompare.length !== 1 ? 's' : ''}</span>
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <CompareModal 
            products={selectedForCompare} 
            onClose={() => setIsCompareModalOpen(false)}
            onRemove={(id) => {
              setSelectedForCompare(prev => prev.filter(p => p.id !== id));
              if (selectedForCompare.length === 1) { // if this is the last one being removed
                setIsCompareModalOpen(false);
              }
            }}
            onClearAll={() => {
              setSelectedForCompare([]);
              setIsCompareModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
