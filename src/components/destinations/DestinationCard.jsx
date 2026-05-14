"use client";

import { useState, useEffect } from "react";
import AccommodationList from "./AccommodationList";

const STATUS_CONFIG = {
  good: {
    label: "Good to Go",
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    ring: "ring-emerald-400/30",
  },
  caution: {
    label: "Caution",
    dot: "bg-amber-400",
    pill: "bg-amber-100 text-amber-700 ring-amber-200",
    ring: "ring-amber-400/30",
  },
  avoid: {
    label: "Avoid / Bad",
    dot: "bg-red-500",
    pill: "bg-red-100 text-red-700 ring-red-200",
    ring: "ring-red-400/30",
  },
};

const REGION_CONFIG = {
  sitakunda: {
    label: "Sitakunda",
    pill: "bg-violet-100 text-violet-700",
  },
  mirsarai: {
    label: "Mirsarai",
    pill: "bg-sky-100 text-sky-700",
  },
};

const DIFFICULTY_CONFIG = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
      {half && (
        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="w-4 h-4 text-gray-200 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * @param {{ destination: import('@/data/mockDestinations').Destination }} props
 */
export default function DestinationCard({ destination }) {
  const status = STATUS_CONFIG[destination.status];
  const region = REGION_CONFIG[destination.region];
  const difficultyClass = DIFFICULTY_CONFIG[destination.difficulty];

  const [isHovered, setIsHovered] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Fake Media Player Transition Effect on Hover
  useEffect(() => {
    let interval;
    if (isHovered && destination.hoverGradients) {
      interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % destination.hoverGradients.length);
      }, 1500);
    } else {
      setBgIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, destination.hoverGradients]);

  const currentGradient = isHovered && destination.hoverGradients
    ? destination.hoverGradients[bgIndex]
    : destination.imageGradient;

  return (
    <article
      id={`card-${destination.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl ring-1 ring-gray-100 hover:ring-2 ${status.ring} transition-all duration-300 overflow-hidden`}
    >
      {/* Thumbnail / Media Player */}
      <div
        className={`relative h-56 bg-gradient-to-br transition-all duration-1000 ease-in-out ${currentGradient} overflow-hidden`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-20 transition-transform duration-1000 group-hover:scale-110">
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-black/20 blur-3xl" />
        </div>
        
        {/* Play Icon / Reel Indicator overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
           <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
             <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
               <path d="M8 5v14l11-7z" />
             </svg>
           </div>
           <span className="text-white text-xs font-semibold mt-2 tracking-wide drop-shadow-md">Preview Reel</span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-start">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${region.pill} shadow-sm backdrop-blur-md bg-opacity-90`}>
            {region.label}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 shadow-sm backdrop-blur-md bg-opacity-95 ${status.pill}`}
            title={destination.statusNote}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Header & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">
            {destination.name}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={destination.rating} />
          <span className="text-sm font-bold text-gray-800">{destination.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">/ {destination.reviewCount} reviews</span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {destination.tagline}
        </p>

        {/* Activities & Difficulty Grid */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Badge */}
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${difficultyClass}`}>
               {destination.difficulty}
            </span>
            {/* Activity Badges */}
            {destination.activities.map((act) => (
              <span key={act} className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                {act}
              </span>
            ))}
          </div>
        </div>

        {/* Status note banner */}
        <div
          className={`text-xs px-3 py-2.5 rounded-lg mb-4 border ${
            destination.status === "good"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : destination.status === "caution"
              ? "bg-amber-50 text-amber-700 border-amber-100"
              : "bg-red-50 text-red-700 border-red-100"
          }`}
        >
          <span className="font-bold block mb-0.5">Live Update:</span>
          {destination.statusNote}
        </div>

        {/* Accommodation accordion */}
        <AccommodationList accommodations={destination.accommodations} />
      </div>
    </article>
  );
}
