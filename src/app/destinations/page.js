"use client";

import { useState, useMemo } from "react";
import { mockDestinations } from "@/data/mockDestinations";
import FilterControls from "@/components/destinations/FilterControls";
import DestinationCard from "@/components/destinations/DestinationCard";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-emerald-600/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-emerald-200/80" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <svg className="w-3.5 h-3.5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">Destination Explorer</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-emerald-100 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Status Updates
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Destination
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
                  Explorer
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-emerald-100/80 text-base sm:text-lg leading-relaxed">
                Discover trails, waterfalls, hilltops, and beaches across the
                <span className="text-emerald-300 font-semibold"> Sitakunda</span> &{" "}
                <span className="text-sky-300 font-semibold">Mirsarai</span> belt of Chattogram, Bangladesh — with real-time safety conditions.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[
                { label: "Destinations", value: mockDestinations.length },
                {
                  label: "Safe to Visit",
                  value: mockDestinations.filter((d) => d.status === "good").length,
                },
                {
                  label: "Total Reviews",
                  value: mockDestinations
                    .reduce((acc, d) => acc + d.reviewCount, 0)
                    .toLocaleString(),
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-emerald-200/70 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <FilterControls
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        total={mockDestinations.length}
        filtered={filtered.length}
      />

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <span className="text-6xl mb-4" aria-hidden="true">🗺️</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No destinations match your filters
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Try selecting a different region or status to explore more places.
            </p>
            <button
              onClick={() => {
                setActiveRegion("all");
                setActiveStatus("all");
              }}
              className="mt-6 px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-10 py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-600">Chattogram Trails</span> — Community-powered travel intelligence for the Sitakunda–Mirsarai corridor.
        </p>
      </footer>
    </div>
  );
}
