/**
 * @typedef {'sitakunda' | 'mirsarai'} Region
 * @typedef {'good' | 'caution' | 'avoid'} VisitStatus
 * @typedef {'Easy' | 'Moderate' | 'Hard'} Difficulty
 *
 * @typedef {Object} Accommodation
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} distance
 * @property {string} priceRange
 *
 * @typedef {Object} Destination
 * @property {string} id
 * @property {string} name
 * @property {Region} region
 * @property {string} tagline
 * @property {string} imageGradient
 * @property {string[]} hoverGradients
 * @property {VisitStatus} status
 * @property {string} statusNote
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} tags
 * @property {string[]} activities
 * @property {Difficulty} difficulty
 * @property {Accommodation[]} accommodations
 */

/** @type {Destination[]} */
export const mockDestinations = [
  {
    id: "khoiyachara-waterfall",
    name: "Khoiyachara Waterfall",
    region: "mirsarai",
    tagline: "A cascading 9-tier waterfall hidden deep in the Mirsarai hills.",
    imageGradient: "from-cyan-500 via-teal-400 to-emerald-600",
    hoverGradients: [
      "from-cyan-400 via-teal-500 to-emerald-500",
      "from-teal-500 via-emerald-400 to-cyan-500",
    ],
    status: "good",
    statusNote: "Trails are clear. Crowd levels normal. Great weather.",
    rating: 4.8,
    reviewCount: 312,
    tags: ["Waterfall", "Nature"],
    activities: ["🥾 Trekking", "🧗 Hill Climbing", "🖼️ Photo Spot"],
    difficulty: "Moderate",
    accommodations: [
      {
        id: "acc-k1",
        name: "Mirsarai Eco Resort",
        type: "Eco Resort",
        distance: "2.1 km away",
        priceRange: "৳2,500 – ৳4,500/night",
      },
      {
        id: "acc-k2",
        name: "Green Hill Homestay",
        type: "Homestay",
        distance: "3.4 km away",
        priceRange: "৳800 – ৳1,200/night",
      },
    ],
  },
  {
    id: "chandranath-hill",
    name: "Chandranath Hill",
    region: "sitakunda",
    tagline: "Sacred hilltop temple with panoramic views of the Bay of Bengal.",
    imageGradient: "from-emerald-600 via-green-500 to-lime-400",
    hoverGradients: [
      "from-green-500 via-lime-400 to-emerald-500",
      "from-lime-500 via-emerald-500 to-green-600",
    ],
    status: "caution",
    statusNote: "Heavy rain forecast. Trails may be slippery. High crowd on weekends.",
    rating: 4.6,
    reviewCount: 547,
    tags: ["Temple", "Panoramic View"],
    activities: ["🥾 Extreme Trekking", "🧗 Hill Climbing", "🖼️ Photo Spot"],
    difficulty: "Hard",
    accommodations: [
      {
        id: "acc-c1",
        name: "Sitakunda Traveller's Inn",
        type: "Hotel",
        distance: "1.2 km away",
        priceRange: "৳1,500 – ৳3,000/night",
      },
    ],
  },
  {
    id: "mohamaya-lake",
    name: "Mohamaya Lake",
    region: "mirsarai",
    tagline: "Vast serene lake surrounded by lush green mountains.",
    imageGradient: "from-sky-500 via-blue-400 to-indigo-500",
    hoverGradients: [
      "from-blue-400 via-indigo-500 to-sky-400",
      "from-indigo-400 via-sky-500 to-blue-500",
    ],
    status: "good",
    statusNote: "Perfect weather for kayaking and camping.",
    rating: 4.9,
    reviewCount: 842,
    tags: ["Lake", "Family Friendly"],
    activities: ["🚣 Kayaking", "🏕️ Camping", "🖼️ Photo Spot"],
    difficulty: "Easy",
    accommodations: [
      {
        id: "acc-m1",
        name: "Lakeview Campsite",
        type: "Camping Site",
        distance: "0.1 km away",
        priceRange: "৳500 – ৳1,500/night",
      },
    ],
  },
  {
    id: "napittachora-waterfall",
    name: "Napittachora Waterfall",
    region: "mirsarai",
    tagline: "Hidden cascading beauty featuring three magnificent drops.",
    imageGradient: "from-lime-500 via-green-400 to-teal-500",
    hoverGradients: [
      "from-green-400 via-teal-500 to-lime-400",
      "from-teal-400 via-lime-500 to-green-500",
    ],
    status: "avoid",
    statusNote: "Flash flood risks. Trail is completely washed out.",
    rating: 4.7,
    reviewCount: 201,
    tags: ["Waterfall", "Hidden Gem"],
    activities: ["🥾 Extreme Trekking", "🧗 Hill Climbing"],
    difficulty: "Hard",
    accommodations: [
      {
        id: "acc-n1",
        name: "Hillside Rest House",
        type: "Rest House",
        distance: "4.5 km away",
        priceRange: "৳1,000 – ৳2,000/night",
      },
    ],
  },
  {
    id: "sitakunda-botanical-garden",
    name: "Sitakunda Botanical Garden",
    region: "sitakunda",
    tagline: "A rich botanical reserve with rare orchids and medicinal plants.",
    imageGradient: "from-emerald-400 via-teal-300 to-cyan-500",
    hoverGradients: [
      "from-teal-300 via-cyan-500 to-emerald-400",
      "from-cyan-400 via-emerald-500 to-teal-400",
    ],
    status: "good",
    statusNote: "Gardens fully open. Spring bloom season — ideal time to visit.",
    rating: 4.2,
    reviewCount: 134,
    tags: ["Botanical", "Educational"],
    activities: ["🚶 Nature Walk", "🖼️ Photo Spot"],
    difficulty: "Easy",
    accommodations: [
      {
        id: "acc-b1",
        name: "Green Canopy Lodge",
        type: "Lodge",
        distance: "0.8 km away",
        priceRange: "৳2,000 – ৳3,500/night",
      },
    ],
  },
  {
    id: "guliakhali-sea-beach",
    name: "Guliakhali Sea Beach",
    region: "sitakunda",
    tagline: "A tranquil mangrove-fringed beach with crystal tidal pools.",
    imageGradient: "from-sky-400 via-cyan-300 to-teal-400",
    hoverGradients: [
      "from-cyan-300 via-teal-400 to-sky-400",
      "from-teal-300 via-sky-400 to-cyan-500",
    ],
    status: "caution",
    statusNote: "Jellyfish alert active. Tidal currents stronger than usual this week.",
    rating: 4.7,
    reviewCount: 423,
    tags: ["Beach", "Mangrove", "Tidal Pools"],
    activities: ["🏕️ Camping", "🖼️ Photo Spot", "🚶 Nature Walk"],
    difficulty: "Easy",
    accommodations: [
      {
        id: "acc-g1",
        name: "Seabreeze Beach Resort",
        type: "Resort",
        distance: "1.0 km away",
        priceRange: "৳3,500 – ৳6,000/night",
      },
      {
        id: "acc-g2",
        name: "Coastal Homestay",
        type: "Homestay",
        distance: "2.3 km away",
        priceRange: "৳1,000 – ৳1,800/night",
      },
    ],
  },
];
