/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Hammer, Wrench, Grid, Activity, BatteryCharging, Droplet, Paintbrush, Share2, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onOpenDetails: (p: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (p: Product) => void;
}

// Map icon string string to actual Lucide react components
export function ProductIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name) {
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Grid':
      return <Grid className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'BatteryCharging':
      return <BatteryCharging className={className} />;
    case 'Droplet':
      return <Droplet className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    default:
      return <Wrench className={className} />;
  }
}

export default function ProductCard({
  product,
  onOpenDetails,
  isCompared = false,
  onToggleCompare
}: ProductCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`Check out ${product.name} at Sri Shanmuga Hardwares!`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  // Assign nice theme colors to categories for visual design
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Power Tools':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hand Tools':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Fasteners & Hardware':
        return 'text-teal-700 bg-teal-50 border-teal-200';
      case 'Electrical & Lighting':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Plumbing':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Paint & Building':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-xl rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between h-full group relative">
      <div>
        {/* Card Header Image */}
        <div className="relative h-40 w-full mb-3 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 p-4">
              <ProductIcon name={product.iconName} className="w-8 h-8 mb-1.5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-550">{product.brand}</span>
            </div>
          ) : (
            <img
              referrerPolicy="no-referrer"
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImageError(true)}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <span className={`absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded border backdrop-blur-md bg-white/90 shadow-sm ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>

          {onToggleCompare && (
            <label className="absolute top-2 right-2 flex items-center space-x-1.5 cursor-pointer backdrop-blur-md bg-white/90 hover:bg-white px-2 py-1 rounded shadow-sm border border-slate-200 transition-colors" title="Compare this item">
              <input
                type="checkbox"
                checked={isCompared}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleCompare(product);
                }}
                className="w-3.5 h-3.5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">Compare</span>
            </label>
          )}
        </div>

        {/* Brand */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</span>
          <ProductIcon name={product.iconName} className="w-3.5 h-3.5 text-slate-300" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors text-sm sm:text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Rating Block */}
        <div className="flex items-center space-x-1.5 mt-2">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
          </div>
          <span className="text-[11px] text-slate-400">({product.reviewsCount} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Quick Specs Preview */}
        <div className="border-t border-slate-100 mt-3 pt-3">
          <dl className="grid grid-cols-2 gap-y-1 gap-x-2 text-[11px]">
            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
              <div key={key} className="flex flex-col">
                <dt className="text-slate-400 font-medium">{key}</dt>
                <dd className="text-slate-700 font-semibold truncate">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-4">
        {/* Bottom CTA bar */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            {/* Quick Specs View Trigger */}
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
              title="See Specifications & Tips"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Share Trigger */}
            <button
              id={`share-${product.id}`}
              onClick={handleShare}
              className={`py-2 px-3 sm:px-4 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                isCopied
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md active:translate-y-0.5'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
