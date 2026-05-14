"use client";

import { useRef, useState, useEffect } from "react";

const REGION_TABS = [
  { key: "all", label: "All Places" },
  { key: "sitakunda", label: "Sitakunda" },
  { key: "mirsarai", label: "Mirsarai" },
];

const ACTIVITIES = [
  { key: "all", label: "All Activities" },
  { key: "Trekking", label: "🥾 Trekking" },
  { key: "Extreme Trekking", label: "🥾 Extreme Trekking" },
  { key: "Hill Climbing", label: "🧗 Hill Climbing" },
  { key: "Photo Spot", label: "🖼️ Photo Spot" },
  { key: "Kayaking", label: "🚣 Kayaking" },
  { key: "Camping", label: "🏕️ Camping" },
  { key: "Nature Walk", label: "🚶 Nature Walk" },
];

/**
 * @param {{
 *   activeRegion: string,
 *   setActiveRegion: (r: string) => void,
 *   activeActivity: string,
 *   setActiveActivity: (a: string) => void,
 *   hideAvoid: boolean,
 *   setHideAvoid: (v: boolean) => void,
 *   total: number,
 *   filtered: number,
 * }} props
 */
export default function FilterControls({
  activeRegion,
  setActiveRegion,
  activeActivity,
  setActiveActivity,
  hideAvoid,
  setHideAvoid,
  total,
  filtered,
}) {
  const carouselRef = useRef(null);

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-4">
        
        {/* Top Row: Regions, Status Toggle, Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Region Tabs */}
          <nav className="flex items-center gap-1 bg-gray-100 rounded-xl p-1" aria-label="Region filter">
            {REGION_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveRegion(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none ${
                  activeRegion === tab.key
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {/* Status Toggle */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={hideAvoid}
                  onChange={(e) => setHideAvoid(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${hideAvoid ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${hideAvoid ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                Hide "Avoid/Bad" Spots
              </span>
            </label>

            {/* Result Count */}
            <p className="hidden sm:block text-sm text-gray-400">
              <span className="font-semibold text-gray-700">{filtered}</span> / {total} places
            </p>
          </div>
        </div>

        {/* Bottom Row: Activity Carousel */}
        <div className="relative flex items-center group">
          <button
            onClick={() => scrollCarousel(-1)}
            className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white backdrop-blur shadow-sm rounded-full border border-gray-100 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            ←
          </button>
          
          <div
            ref={carouselRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-4 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ACTIVITIES.map((act) => (
              <button
                key={act.key}
                onClick={() => setActiveActivity(act.key)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeActivity === act.key
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-gray-50"
                }`}
              >
                {act.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel(1)}
            className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white backdrop-blur shadow-sm rounded-full border border-gray-100 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
}
