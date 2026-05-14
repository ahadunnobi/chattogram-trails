"use client";

import { useState, useMemo } from "react";
import { mockDestinations } from "@/data/mockDestinations";
import FilterControls from "@/components/destinations/FilterControls";
import DestinationCard from "@/components/destinations/DestinationCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  const filtered = useMemo(() => {
    return mockDestinations.filter((d) => {
      const regionMatch = activeRegion === "all" || d.region === activeRegion;
      const statusMatch = activeStatus === "all" || d.status === activeStatus;
      return regionMatch && statusMatch;
    });
  }, [activeRegion, activeStatus]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-800 text-white pt-32 pb-14">
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-sky-500/15 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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
                <span className="text-sky-300 font-semibold">Mirsarai</span> corridor — with real-time safety conditions.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 shrink-0">
              {[
                { label: "Total Places", value: mockDestinations.length },
                { label: "Safe to Visit", value: mockDestinations.filter((d) => d.status === "good").length },
                {
                  label: "Community Reviews",
                  value: mockDestinations.reduce((a, d) => a + d.reviewCount, 0).toLocaleString(),
                },
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
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        total={mockDestinations.length}
        filtered={filtered.length}
      />

      {/* ── Destination Grid ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <span className="text-6xl mb-4" aria-hidden="true">🗺️</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations match your filters</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Try selecting a different region or status to explore more places.
            </p>
            <button
              id="reset-filters-btn"
              onClick={() => { setActiveRegion("all"); setActiveStatus("all"); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
