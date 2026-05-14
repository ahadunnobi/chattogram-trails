/**
 * @typedef {'sitakunda' | 'mirsarai'} Region
 * @typedef {'good' | 'caution' | 'avoid'} VisitStatus
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
 * @property {VisitStatus} status
 * @property {string} statusNote
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} tags
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
    status: "good",
    statusNote: "Trails are clear. Crowd levels normal. Great weather.",
    rating: 4.8,
    reviewCount: 312,
    tags: ["Waterfall", "Trekking", "Nature"],
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
      {
        id: "acc-k3",
        name: "Baraiarhat Guest House",
        type: "Guest House",
        distance: "5.0 km away",
        priceRange: "৳600 – ৳1,000/night",
      },
    ],
  },
  {
    id: "chandranath-hill",
    name: "Chandranath Hill",
    region: "sitakunda",
    tagline:
      "Sacred hilltop temple with panoramic views of the Bay of Bengal.",
    imageGradient: "from-emerald-600 via-green-500 to-lime-400",
    status: "caution",
    statusNote:
      "Heavy rain forecast. Trails may be slippery. High crowd on weekends.",
    rating: 4.6,
    reviewCount: 547,
    tags: ["Temple", "Hiking", "Panoramic View"],
    accommodations: [
      {
        id: "acc-c1",
        name: "Sitakunda Traveller's Inn",
        type: "Hotel",
        distance: "1.2 km away",
        priceRange: "৳1,500 – ৳3,000/night",
      },
      {
        id: "acc-c2",
        name: "Hill Breeze Homestay",
        type: "Homestay",
        distance: "2.8 km away",
        priceRange: "৳700 – ৳1,100/night",
      },
    ],
  },
  {
    id: "nafakhum-eco-park",
    name: "Mirsarai Eco Park",
    region: "mirsarai",
    tagline:
      "A vast eco-park with deer, peacocks, and serene lake boating.",
    imageGradient: "from-sky-500 via-blue-400 to-indigo-500",
    status: "good",
    statusNote: "Park is open. All zones accessible. Water levels normal.",
    rating: 4.4,
    reviewCount: 198,
    tags: ["Eco Park", "Wildlife", "Boating", "Family Friendly"],
    accommodations: [
      {
        id: "acc-n1",
        name: "Lakeview Cottages",
        type: "Cottage",
        distance: "0.5 km away",
        priceRange: "৳3,000 – ৳5,500/night",
      },
      {
        id: "acc-n2",
        name: "Forest Rest House",
        type: "Rest House",
        distance: "1.8 km away",
        priceRange: "৳1,200 – ৳2,000/night",
      },
    ],
  },
  {
    id: "sitakunda-botanical-garden",
    name: "Sitakunda Botanical Garden",
    region: "sitakunda",
    tagline:
      "A rich botanical reserve with rare orchids and medicinal plants.",
    imageGradient: "from-lime-500 via-green-400 to-teal-500",
    status: "good",
    statusNote: "Gardens fully open. Spring bloom season — ideal time to visit.",
    rating: 4.2,
    reviewCount: 134,
    tags: ["Botanical", "Nature Walk", "Educational"],
    accommodations: [
      {
        id: "acc-b1",
        name: "Green Canopy Lodge",
        type: "Lodge",
        distance: "0.8 km away",
        priceRange: "৳2,000 – ৳3,500/night",
      },
      {
        id: "acc-b2",
        name: "Sitakunda Circuit House",
        type: "Circuit House",
        distance: "3.5 km away",
        priceRange: "৳900 – ৳1,500/night",
      },
    ],
  },
  {
    id: "khayachara-hills",
    name: "Khayachara Hills",
    region: "mirsarai",
    tagline:
      "Remote highland trails offering misty sunrise vistas year-round.",
    imageGradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    status: "avoid",
    statusNote:
      "Flash flood risk in lower trails. Access road closed due to landslide.",
    rating: 4.5,
    reviewCount: 89,
    tags: ["Hills", "Sunrise", "Remote", "Adventure"],
    accommodations: [
      {
        id: "acc-kh1",
        name: "Mirsarai Hillside Camp",
        type: "Camping Site",
        distance: "4.2 km away",
        priceRange: "৳500 – ৳800/night",
      },
    ],
  },
  {
    id: "guliakhali-sea-beach",
    name: "Guliakhali Sea Beach",
    region: "sitakunda",
    tagline:
      "A tranquil mangrove-fringed beach with crystal tidal pools.",
    imageGradient: "from-sky-400 via-cyan-300 to-teal-400",
    status: "caution",
    statusNote:
      "Jellyfish alert active. Tidal currents stronger than usual this week.",
    rating: 4.7,
    reviewCount: 423,
    tags: ["Beach", "Mangrove", "Tidal Pools", "Photography"],
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
      {
        id: "acc-g3",
        name: "Fishermen's Rest Inn",
        type: "Inn",
        distance: "3.1 km away",
        priceRange: "৳600 – ৳950/night",
      },
    ],
  },
];
