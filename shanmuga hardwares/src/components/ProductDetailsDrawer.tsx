/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Share2, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductCard';

interface ProductDetailsDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsDrawer({
  product,
  onClose
}: ProductDetailsDrawerProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [product]);

  if (!product) return null;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`Check out ${product.name} at Sri Shanmuga Hardwares!`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop blur */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md md:max-w-lg transform transition-transform duration-300 ease-out translate-x-0">
          <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll border-l border-slate-200">
            {/* Header */}
            <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-slate-800 rounded-xl text-amber-500">
                  <ProductIcon name={product.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-amber-500">Product Blueprint</h2>
                  <p className="text-xs text-slate-300">Detailed Spec Sheet</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 px-6 py-6 space-y-6">
              {/* Product Intro */}
              <div>
                {/* Product Image Component */}
                <div className="relative h-56 w-full mb-5 overflow-hidden rounded-xl bg-slate-100 shadow-inner flex items-center justify-center">
                  {imageError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 p-4">
                      <ProductIcon name={product.iconName} className="w-12 h-12 mb-2 text-amber-500 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-550">{product.brand}</span>
                    </div>
                  ) : (
                    <img
                      referrerPolicy="no-referrer"
                      src={product.imageUrl}
                      alt={product.name}
                      onError={() => setImageError(true)}
                      className="object-cover w-full h-full"
                    />
                  )}
                  <span className="absolute top-3 left-3 text-[10px] shadow-sm font-bold uppercase px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-800 border border-slate-100">
                    {product.category}
                  </span>
                </div>


                <div className="flex items-center space-x-2 text-amber-600 mb-1 font-black uppercase tracking-widest text-xs">
                  {product.brand}
                </div>
                
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3.5 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-slate-850">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount} verified reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Aisle Overview</h3>
                <p className="text-sm text-slate-650 leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {/* Specs Table */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Technical Specifications</h3>
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs text-left text-slate-700">
                    <tbody>
                      {Object.entries(product.specs).map(([label, value], idx) => (
                        <tr 
                          key={label} 
                          className={`border-b border-slate-200/60 last:border-none ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-500 w-1/3 border-r border-slate-200/40">{label}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Commercial Features</h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-700 font-medium">
                      <span className="p-0.5 bg-emerald-100 rounded text-emerald-700 mr-2.5 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Tips & Safety */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4.5 space-y-2.5">
                <div className="flex items-center text-amber-800 space-x-1.5 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4.5 h-4.5 text-amber-600" />
                  <span>Trade Tips & Safety Guidelines</span>
                </div>
                <div className="space-y-2 text-xs text-slate-650">
                  {product.usageTips.map((tip, idx) => (
                    <p key={idx} className="flex items-start pl-1">
                      <span className="text-amber-500 mr-2 font-black">&bull;</span>
                      <span>{tip}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Cart Action */}
            <div className="bg-slate-50 border-t border-slate-200 p-5 sticky bottom-0 z-10">
              <button
                onClick={handleShare}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow ${
                  isCopied
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black tracking-wide active:translate-y-0.5'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black tracking-wide active:translate-y-0.5'
                }`}
              >
                {isCopied ? <Check className="w-4 h-4 text-slate-950" /> : <Share2 className="w-4 h-4 text-slate-950" />}
                <span>{isCopied ? 'Link Copied to Clipboard!' : 'Share Hardware item'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
