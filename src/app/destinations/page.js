"use client";

import { useState, useMemo } from "react";
import { mockDestinations } from "@/data/mockDestinations";
import FilterControls from "@/components/destinations/FilterControls";
import DestinationCard from "@/components/destinations/DestinationCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock User Reels for the new Sidebar
const TRENDING_REELS = [
  { id: 1, user: "@travel_diaries", place: "Mohamaya Lake", views: "12k", gradient: "from-blue-500 to-cyan-400" },
  { id: 2, user: "@nature_quest", place: "Khoiyachara Falls", views: "8.5k", gradient: "from-emerald-500 to-teal-400" },
  { id: 3, user: "@bd_explorer", place: "Chandranath Peak", views: "24k", gradient: "from-amber-500 to-orange-400" },
  { id: 4, user: "@hidden_trails", place: "Napittachora", views: "5.2k", gradient: "from-lime-500 to-green-400" },
];

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeActivity, setActiveActivity] = useState("all");
  const [hideAvoid, setHideAvoid] = useState(false);

  const filtered = useMemo(() => {
    return mockDestinations.filter((d) => {
      // 1. Region Match
      const regionMatch = activeRegion === "all" || d.region === activeRegion;
      
      // 2. Avoid Match
      const avoidMatch = hideAvoid ? d.status !== "avoid" : true;
      
      // 3. Activity Match
      // Activities in mock data have emojis, so we check if the string includes the key.
      const activityMatch =
        activeActivity === "all" ||
        d.activities.some((act) => act.includes(activeActivity));

      return regionMatch && avoidMatch && activityMatch;
    });
  }, [activeRegion, activeActivity, hideAvoid]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-800 text-white pt-32 pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-sky-500/15 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-emerald-200/70" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <svg className="w-3.5 h-3.5 text-emerald-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">Explore All Destinations</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-emerald-200 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Status Updates Enabled
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Explore All
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
                  Destinations
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-emerald-100/75 text-base leading-relaxed">
                Trails, waterfalls, hilltops, eco-parks & beaches across the
                <span className="text-emerald-300 font-semibold"> Sitakunda</span> &{" "}
                <span className="text-sky-300 font-semibold">Mirsarai</span> corridor.
              </p>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              {[
                { label: "Total Places", value: mockDestinations.length },
                { label: "Safe to Visit", value: mockDestinations.filter((d) => d.status === "good").length },
                { label: "Community Reviews", value: mockDestinations.reduce((a, d) => a + d.reviewCount, 0).toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-emerald-200/60 mt-0.5 whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky Filter Bar ── */}
      <FilterControls
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
        activeActivity={activeActivity}
        setActiveActivity={setActiveActivity}
        hideAvoid={hideAvoid}
        setHideAvoid={setHideAvoid}
        total={mockDestinations.length}
        filtered={filtered.length}
      />

      {/* ── Main Layout: Grid + Sidebar ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Grid Section */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-6xl mb-4" aria-hidden="true">🗺️</span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations match your filters</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Try adjusting the activity, region, or status filters to see more places.
                </p>
                <button
                  onClick={() => { setActiveRegion("all"); setActiveActivity("all"); setHideAvoid(false); }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            )}
          </div>

          {/* User Reels Sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <div className="sticky top-44 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-xl">📱</span> Trending Reels
                </h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Live</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">See what explorers are experiencing right now.</p>
              
              <div className="flex flex-col gap-4">
                {TRENDING_REELS.map((reel) => (
                  <div key={reel.id} className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity ${reel.gradient}`} />
                    
                    {/* Fake play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xs font-bold truncate">{reel.place}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/80 text-[10px]">{reel.user}</span>
                        <span className="text-white/90 text-[10px] flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {reel.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-gray-200">
                View All Community Media
              </button>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
