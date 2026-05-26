import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductIcon } from './ProductCard';

interface CompareModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

function CompareProductImage({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-2">
        <ProductIcon name={product.iconName} className="w-6 h-6 mb-1 text-amber-500" />
        <span className="text-[9px] font-black uppercase text-slate-500">{product.brand}</span>
      </div>
    );
  }
  
  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      onError={() => setImageError(true)}
      className="max-h-full max-w-full object-contain"
      referrerPolicy="no-referrer"
    />
  );
}

export default function CompareModal({ products, onClose, onRemove, onClearAll }: CompareModalProps) {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Collect all unique spec keys across all products to build the table rows
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Compare Products</h2>
            <p className="text-sm text-slate-500 mt-1">Side-by-side specifications</p>
          </div>
          <div className="flex items-center space-x-4">
            {products.length > 1 && (
              <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={highlightDifferences}
                  onChange={(e) => setHighlightDifferences(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700">Highlight Differences</span>
              </label>
            )}
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors uppercase tracking-wide px-3 py-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">No items selected to compare.</div>
          ) : (
            <div className="min-w-max">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 w-48 border-b border-r border-slate-100 bg-slate-50 align-bottom">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Details</span>
                    </th>
                    {products.map((product) => (
                      <th key={product.id} className="p-4 w-64 border-b border-slate-100 relative align-top">
                        <button
                          onClick={() => onRemove(product.id)}
                          className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="h-32 w-full bg-white rounded-lg overflow-hidden border border-slate-100 mb-3 p-2 flex items-center justify-center">
                          <CompareProductImage product={product} />
                        </div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{product.brand}</span>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mt-1">{product.name}</h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{product.description}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Category & Rating */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-r border-slate-100 font-semibold text-slate-800 text-xs uppercase tracking-wide">Category</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 border-b border-slate-100 text-slate-600">
                        {product.category}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-r border-slate-100 font-semibold text-slate-800 text-xs uppercase tracking-wide">Rating</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 border-b border-slate-100 text-slate-600 font-medium">
                        {product.rating} <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Specs */}
                  {allSpecKeys.map((specKey) => {
                    const values = products.map((p) => p.specs[specKey] || '-');
                    const isDifferent = new Set(values).size > 1;
                    const rowClass = highlightDifferences && isDifferent ? 'bg-amber-50/60 hover:bg-amber-100/60' : 'hover:bg-slate-50';
                    
                    return (
                      <tr key={specKey} className={rowClass}>
                        <td className={`p-4 border-b border-r border-slate-100 font-semibold text-xs uppercase tracking-wide ${highlightDifferences && isDifferent ? 'text-amber-900' : 'text-slate-800'}`}>
                          {specKey}
                        </td>
                        {products.map((product) => (
                          <td key={product.id} className={`p-4 border-b border-slate-100 ${highlightDifferences && isDifferent ? 'text-amber-800 font-medium' : 'text-slate-600'}`}>
                            {product.specs[specKey] || <span className="text-opacity-50">-</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  
                  {/* Features */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-r border-slate-100 font-semibold text-slate-800 text-xs uppercase tracking-wide align-top">
                      Key Features
                    </td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 border-b border-slate-100 text-slate-600 align-top">
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          {product.features.slice(0, 3).map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
