"use client";

import { useState } from "react";

const TYPE_ICON = {
  "Eco Resort": "🌿",
  Homestay: "🏡",
  "Guest House": "🛏️",
  Hotel: "🏨",
  Cottage: "🛖",
  "Rest House": "🏠",
  Lodge: "⛺",
  "Circuit House": "🏛️",
  "Camping Site": "🔥",
  Resort: "🏖️",
  Inn: "🚪",
};

/**
 * @param {{ accommodations: import('@/data/mockDestinations').Accommodation[] }} props
 */
export default function AccommodationList({ accommodations }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 mt-4 pt-4">
      <button
        id={`accordion-stays-${accommodations[0]?.id}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
          <span className="text-base">🏕️</span>
          Nearby Staying Places
          <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
            {accommodations.length}
          </span>
        </span>
        <span
          className={`text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {accommodations.map((acc) => (
            <li
              key={acc.id}
              className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100/60 px-3 py-2.5 hover:border-emerald-200 transition-colors"
            >
              <span className="text-xl mt-0.5" aria-hidden="true">
                {TYPE_ICON[acc.type] ?? "🏠"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {acc.name}
                </p>
                <p className="text-xs text-gray-500">{acc.type}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-sky-600">{acc.distance}</p>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  {acc.priceRange}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
