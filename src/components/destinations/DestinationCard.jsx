"use client";

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

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
      {half && (
        <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20">
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
        <svg key={`e${i}`} className="w-3.5 h-3.5 text-gray-200 fill-current" viewBox="0 0 20 20">
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

  return (
    <article
      id={`card-${destination.id}`}
      className={`group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl ring-1 ring-gray-100 hover:ring-2 ${status.ring} transition-all duration-300 overflow-hidden`}
    >
      {/* Thumbnail */}
      <div
        className={`relative h-48 bg-gradient-to-br ${destination.imageGradient} overflow-hidden`}
        aria-hidden="true"
      >
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-black/20 blur-3xl" />
        </div>
        {/* Photo placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        {/* Tags overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${region.pill}`}
              >
                {region.label}
              </span>
              {/* Live status pill */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${status.pill}`}
                title={destination.statusNote}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot}`}
                />
                {status.label}
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {destination.tagline}
        </p>

        {/* Status note */}
        <div
          className={`text-xs px-3 py-2 rounded-lg mb-4 ${
            destination.status === "good"
              ? "bg-emerald-50 text-emerald-700"
              : destination.status === "caution"
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <span className="font-semibold">Live Update: </span>
          {destination.statusNote}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <StarRating rating={destination.rating} />
            <span className="text-sm font-bold text-gray-800">
              {destination.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {destination.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        {/* Accommodation accordion */}
        <AccommodationList accommodations={destination.accommodations} />
      </div>
    </article>
  );
}
