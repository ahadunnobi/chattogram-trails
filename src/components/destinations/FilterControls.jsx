"use client";

const REGION_TABS = [
  { key: "all", label: "All Places" },
  { key: "sitakunda", label: "Sitakunda" },
  { key: "mirsarai", label: "Mirsarai" },
];

const STATUS_OPTIONS = [
  { key: "all", label: "All Statuses" },
  { key: "good", label: "✅ Good to Go" },
  { key: "caution", label: "⚠️ Caution" },
  { key: "avoid", label: "🚫 Avoid / Bad" },
];

/**
 * @param {{
 *   activeRegion: string,
 *   setActiveRegion: (r: string) => void,
 *   activeStatus: string,
 *   setActiveStatus: (s: string) => void,
 *   total: number,
 *   filtered: number,
 * }} props
 */
export default function FilterControls({
  activeRegion,
  setActiveRegion,
  activeStatus,
  setActiveStatus,
  total,
  filtered,
}) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        {/* Region Tabs */}
        <nav
          className="flex items-center gap-1 bg-gray-100 rounded-xl p-1"
          aria-label="Region filter"
        >
          {REGION_TABS.map((tab) => (
            <button
              key={tab.key}
              id={`region-tab-${tab.key}`}
              onClick={() => setActiveRegion(tab.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                activeRegion === tab.key
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="status-filter"
            className="text-sm text-gray-500 font-medium whitespace-nowrap"
          >
            Live Status:
          </label>
          <select
            id="status-filter"
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
            className="text-sm rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors hover:border-gray-300"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Result Count */}
        <p className="sm:ml-auto text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-700">{filtered}</span> of{" "}
          <span className="font-semibold text-gray-700">{total}</span> places
        </p>
      </div>
    </div>
  );
}
