import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockDestinations } from "@/data/mockDestinations";

/* ─── Status badge config ─── */
const STATUS_CONFIG = {
  good: { label: "Good to Go", pill: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  caution: { label: "Caution", pill: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
  avoid: { label: "Avoid", pill: "bg-red-100 text-red-700", dot: "bg-red-500" },
};
const REGION_CONFIG = {
  sitakunda: { label: "Sitakunda", pill: "bg-violet-100 text-violet-700" },
  mirsarai: { label: "Mirsarai", pill: "bg-sky-100 text-sky-700" },
};

/* ─── Why Choose items ─── */
const WHY_ITEMS = [
  {
    id: "wc-realtime",
    emoji: "📡",
    title: "Real-Time Safety Updates",
    desc: "Community-reported live conditions — trail closures, flood risks, and crowd levels — updated continuously.",
  },
  {
    id: "wc-destinations",
    emoji: "🗺️",
    title: "Curated Destinations",
    desc: "Hand-picked trails, waterfalls, beaches, and eco-parks across the Sitakunda–Mirsarai belt.",
  },
  {
    id: "wc-stays",
    emoji: "🏡",
    title: "Nearby Stays Included",
    desc: "Every destination includes vetted local accommodations with pricing — from eco-resorts to homestays.",
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rafiq Hossain",
    location: "Dhaka",
    rating: 5,
    avatar: "RH",
    avatarBg: "bg-emerald-500",
    text: "Chattogram Trails saved our trip! The live 'Avoid' status on Khayachara Hills warned us about the landslide before we drove 4 hours for nothing. Brilliant app.",
  },
  {
    id: "t2",
    name: "Nusrat Jahan",
    location: "Chittagong",
    rating: 5,
    avatar: "NJ",
    avatarBg: "bg-sky-500",
    text: "Found a cozy homestay 2.8 km from Chandranath Hill through the accommodation section. The price was exactly as listed. Highly recommend for local trekkers!",
  },
  {
    id: "t3",
    name: "Tanvir Ahmed",
    location: "Sylhet",
    rating: 4,
    avatar: "TA",
    avatarBg: "bg-violet-500",
    text: "The Khoiyachara waterfall was absolutely magical and the 'Good to Go' status was spot-on. Crystal clear trails, manageable crowd. Will be back.",
  },
];

function StarRow({ count }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-gray-200"} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── Featured card (homepage mini version) ─── */
function FeaturedCard({ destination }) {
  const status = STATUS_CONFIG[destination.status];
  const region = REGION_CONFIG[destination.region];
  return (
    <Link
      href="/destinations"
      id={`featured-card-${destination.id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300"
    >
      {/* Image thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${destination.imageGradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute bottom-4 right-4 w-28 h-28 rounded-full bg-black/30 blur-3xl" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        {/* Status badge top-right */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.pill} shadow-sm`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot}`} />
            {status.label}
          </span>
        </div>
        {/* Region badge bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${region.pill}`}>
            {region.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">
          {destination.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 flex-1 mb-3">{destination.tagline}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
            <span className="text-sm font-bold text-gray-800">{destination.rating}</span>
            <span className="text-xs text-gray-400">({destination.reviewCount})</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {destination.accommodations.length} stays nearby
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════ */
export default function HomePage() {
  const featuredDestinations = mockDestinations.slice(0, 4);
  const safeCount = mockDestinations.filter((d) => d.status === "good").length;
  const totalReviews = mockDestinations.reduce((a, d) => a + d.reviewCount, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient landscape */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-sky-900" />
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[100px]" />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-teal-700/30 blur-[80px]" />
        </div>
        {/* Animated floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            "top-20 left-[15%] w-4 h-4 bg-emerald-400/40 animate-bounce",
            "top-40 right-[20%] w-3 h-3 bg-sky-400/40 animate-pulse",
            "bottom-32 left-[30%] w-5 h-5 bg-teal-400/30 animate-bounce [animation-delay:1s]",
            "bottom-20 right-[15%] w-2 h-2 bg-emerald-300/50 animate-pulse [animation-delay:0.5s]",
          ].map((cls, i) => (
            <div key={i} className={`absolute rounded-full ${cls}`} />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-emerald-200 font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live conditions for {mockDestinations.length} destinations
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300">
              Next Adventure
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 leading-relaxed mb-10">
            Real-time trail conditions, crowd reports, and curated stays across the
            <span className="text-emerald-300 font-semibold"> Sitakunda</span> &{" "}
            <span className="text-sky-300 font-semibold">Mirsarai</span> highlands of Chattogram.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/destinations"
              id="hero-explore-btn"
              className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30 active:scale-95 transition-all"
            >
              Explore Destinations
            </Link>
            <a
              href="#featured"
              id="hero-featured-btn"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold text-base transition-all"
            >
              View Featured ↓
            </a>
          </div>

          {/* Hero Stats */}
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10">
            {[
              { label: "Destinations", value: mockDestinations.length },
              { label: "Safe Right Now", value: safeCount },
              { label: "Community Reviews", value: totalReviews.toLocaleString() + "+" },
              { label: "Nearby Stays Listed", value: mockDestinations.reduce((a, d) => a + d.accommodations.length, 0) },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll chevron */}
        <a
          href="#featured"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all animate-bounce"
          aria-label="Scroll to featured destinations"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">
                🌿 Editor's Picks
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Featured Destinations
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                Handpicked spots with the best community ratings across the Sitakunda–Mirsarai belt.
              </p>
            </div>
            <Link
              href="/destinations"
              id="featured-view-all-btn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors shrink-0"
            >
              View All Places
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDestinations.map((d) => (
              <FeaturedCard key={d.id} destination={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              Why Chattogram Trails?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Travel Smarter. Explore Safer.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-gray-50 hover:bg-white"
              >
                <span className="text-5xl mb-5">{item.emoji}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              ⭐ Traveler Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              What Travelers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all"
              >
                <StarRow count={t.rating} />
                <p className="mt-4 text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${t.avatarBg} text-white text-sm font-bold shrink-0`}
                  >
                    {t.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="cta-banner"
        className="py-20 bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Check live conditions, discover hidden gems, and find the perfect stay —
            all in one place.
          </p>
          <Link
            href="/destinations"
            id="cta-explore-btn"
            className="inline-block px-10 py-4 rounded-full bg-white text-emerald-800 font-bold text-base hover:bg-emerald-50 active:scale-95 shadow-xl transition-all"
          >
            Explore All Destinations →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
