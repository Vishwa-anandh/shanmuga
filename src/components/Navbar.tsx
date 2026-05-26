/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Hammer, Clock, MapPin, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onScrollToEstimator: () => void;
  onScrollToGuides: () => void;
}

export default function Navbar({
  onScrollToEstimator,
  onScrollToGuides
}: NavbarProps) {
  const [storeStatus, setStoreStatus] = useState({ state: 'Open', message: 'Closes at 8 PM', color: 'text-emerald-500 bg-emerald-50' });

  useEffect(() => {
    // Determine dynamic store status based on current hour
    const checkStoreHours = () => {
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDay(); // 0 is Sunday, 6 is Saturday

      if (currentDay === 0) {
        // Sunday
        if (currentHour >= 9 && currentHour < 17) {
          setStoreStatus({ state: 'Open', message: 'Sunday Hours (9 AM - 5 PM)', color: 'text-emerald-500 bg-emerald-500/10' });
        } else {
          setStoreStatus({ state: 'Closed', message: 'Opens Monday 7 AM', color: 'text-rose-500 bg-rose-500/10' });
        }
      } else {
        // Mon - Sat
        if (currentHour >= 7 && currentHour < 20) {
          if (currentHour >= 7 && currentHour < 9) {
            setStoreStatus({ state: 'Open', message: 'Contractor Pro Hours (7 AM - 9 AM)', color: 'text-amber-500 bg-amber-500/10' });
          } else {
            setStoreStatus({ state: 'Open', message: 'Closes at 8 PM', color: 'text-emerald-500 bg-emerald-500/10' });
          }
        } else {
          setStoreStatus({ state: 'Closed', message: 'Opens tomorrow at 7 AM', color: 'text-rose-500 bg-rose-500/10' });
        }
      }
    };

    checkStoreHours();
    const interval = setInterval(checkStoreHours, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center h-12 sm:h-14 overflow-hidden">
              <img src="./logo.png" alt="Sri Shanmuga Hardwares" className="h-full w-auto object-contain" />
            </div>
          </div>

          {/* Center Info / Fast Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <button
              onClick={onScrollToEstimator}
              className="text-slate-600 hover:text-slate-950 font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>DIY Materials Estimator</span>
            </button>
            <button
              onClick={onScrollToGuides}
              className="text-slate-600 hover:text-slate-950 font-semibold transition-colors cursor-pointer"
            >
              DIY Project Guides
            </button>

            {/* Real-time Status */}
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-6 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Pro Desk Bay Area</span>
              </div>
              <div className={`flex items-center py-1 px-2.5 rounded-full ${storeStatus.color} font-bold transition-all`}>
                <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>
                  {storeStatus.state} &bull; <span className="font-semibold">{storeStatus.message}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Support Phone */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block text-right">
              <p className="text-[11px] font-bold text-slate-400 leading-tight">PRO TEAM HELPLINE</p>
              <p className="text-xs font-semibold text-slate-900">1-800-FORGE-DIY</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
