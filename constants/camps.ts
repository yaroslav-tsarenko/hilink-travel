export type Terrain = 'Forest' | 'Lake' | 'Mountain' | 'Desert' | 'Coast' | 'Snow';
export type Difficulty = 'Easy' | 'Moderate' | 'Hard';

export type Camp = {
  slug: string;
  name: string;
  location: string;
  country: string;
  terrain: Terrain;
  difficulty: Difficulty;
  price: number;
  rating: number;
  reviews: number;
  elevation: string;
  distance: string;
  duration: string;
  joined: number;
  photo?: string;
  palette: number;
  description: string;
  amenities: string[];
  highlights: string[];
};

export const TERRAINS: Terrain[] = ['Forest', 'Lake', 'Mountain', 'Desert', 'Coast', 'Snow'];
export const DIFFICULTIES: Difficulty[] = ['Easy', 'Moderate', 'Hard'];

export const CAMPS: Camp[] = [
  {
    slug: 'putuk-truno',
    name: 'Putuk Truno Camp',
    location: 'Prigen, Pasuruan',
    country: 'Indonesia',
    terrain: 'Forest',
    difficulty: 'Easy',
    price: 24,
    rating: 4.9,
    reviews: 1284,
    elevation: '1.120 km',
    distance: '12.4 mi',
    duration: '2 days',
    joined: 54,
    photo: '/img-1.webp',
    palette: 0,
    description:
      'A quiet pine forest camp next to the Putuk Truno waterfall. Wake up to birdsong, swim in cold mountain pools and fall asleep under a sky full of stars.',
    amenities: ['Fire pit', 'Fresh water', 'Toilets', 'Parking', 'Guided walks'],
    highlights: ['30 m waterfall 10 minutes away', 'Ideal for first-time campers', 'Family friendly trails'],
  },
  {
    slug: 'mountain-view',
    name: 'Mountain View Camp',
    location: 'Somewhere in the Wilderness',
    country: 'Canada',
    terrain: 'Lake',
    difficulty: 'Moderate',
    price: 36,
    rating: 4.8,
    reviews: 932,
    elevation: '1.860 km',
    distance: '28.9 mi',
    duration: '3 days',
    joined: 61,
    photo: '/img-2.webp',
    palette: 1,
    description:
      'Pitch your tent on the shore of a glacier lake framed by endless spruce forest. Kayak at sunrise, fish for dinner and watch the mountains turn pink at dusk.',
    amenities: ['Lake access', 'Kayak rental', 'Fire pit', 'Bear lockers'],
    highlights: ['Sunrise kayak tours', 'Wildlife spotting', 'Crystal-clear swimming water'],
  },
  {
    slug: 'aguas-calientes',
    name: 'Aguas Calientes Base',
    location: 'Cusco Region',
    country: 'Peru',
    terrain: 'Mountain',
    difficulty: 'Hard',
    price: 48,
    rating: 4.9,
    reviews: 2210,
    elevation: '2.040 km',
    distance: '173.28 mi',
    duration: '5 days',
    joined: 120,
    palette: 2,
    description:
      'The legendary gateway to Machu Picchu. A challenging multi-day route through cloud forest, ancient Inca paths and dramatic river canyons.',
    amenities: ['Hot springs', 'Porters', 'Mountain hut', 'First aid'],
    highlights: ['Inca trail sections', 'Natural hot springs', 'Sunrise over the ruins'],
  },
  {
    slug: 'red-rock-canyon',
    name: 'Red Rock Canyon',
    location: 'Moab, Utah',
    country: 'USA',
    terrain: 'Desert',
    difficulty: 'Moderate',
    price: 30,
    rating: 4.7,
    reviews: 641,
    elevation: '1.230 km',
    distance: '18.6 mi',
    duration: '2 days',
    joined: 38,
    palette: 3,
    description:
      'Sleep among sandstone arches and wake up to a desert sunrise that paints the canyon walls deep red. One of the darkest night skies on the continent.',
    amenities: ['Shade shelters', 'Water refill', 'Stargazing deck', 'Parking'],
    highlights: ['Dark-sky certified', 'Arch scrambles', 'Golden hour photo spots'],
  },
  {
    slug: 'kayak-bay',
    name: 'Kayak Bay Retreat',
    location: 'Lofoten Islands',
    country: 'Norway',
    terrain: 'Coast',
    difficulty: 'Easy',
    price: 42,
    rating: 4.8,
    reviews: 518,
    elevation: '0.040 km',
    distance: '9.2 mi',
    duration: '3 days',
    joined: 44,
    photo: '/boat.webp',
    palette: 4,
    description:
      'Paddle through calm fjords between granite peaks, camp on white sand beaches and chase the midnight sun or the northern lights depending on the season.',
    amenities: ['Kayak rental', 'Sauna', 'Fresh water', 'Boat transfer'],
    highlights: ['Midnight sun in summer', 'Northern lights in winter', 'Sea eagle colonies'],
  },
  {
    slug: 'alpine-ridge',
    name: 'Alpine Ridge Hut',
    location: 'Zakopane, Tatra',
    country: 'Poland',
    terrain: 'Snow',
    difficulty: 'Hard',
    price: 39,
    rating: 4.6,
    reviews: 403,
    elevation: '1.987 km',
    distance: '14.1 mi',
    duration: '2 days',
    joined: 29,
    palette: 5,
    description:
      'A high-altitude hut on the ridge of Dolina Kondratowa. Crampons recommended in winter; in summer the meadows are covered with wild crocuses.',
    amenities: ['Heated hut', 'Kitchen', 'Gear storage', 'Mountain rescue'],
    highlights: ['360° summit panorama', 'Winter ski touring', 'Crocus meadows in spring'],
  },
  {
    slug: 'pine-hollow',
    name: 'Pine Hollow',
    location: 'Black Forest',
    country: 'Germany',
    terrain: 'Forest',
    difficulty: 'Easy',
    price: 22,
    rating: 4.5,
    reviews: 287,
    elevation: '0.860 km',
    distance: '7.8 mi',
    duration: '1 day',
    joined: 23,
    palette: 6,
    description:
      'A cosy forest clearing with wooden platforms for tents, a short loop trail and the best wild blueberries you will ever taste.',
    amenities: ['Tent platforms', 'Fire pit', 'Toilets', 'Picnic tables'],
    highlights: ['Blueberry picking', 'Short kid-friendly loop', 'Easy public transport access'],
  },
  {
    slug: 'mount-pilatus',
    name: 'Mount Pilatus Camp',
    location: 'Alpnach, Lucerne',
    country: 'Switzerland',
    terrain: 'Mountain',
    difficulty: 'Moderate',
    price: 54,
    rating: 4.9,
    reviews: 1102,
    elevation: '2.132 km',
    distance: '21.3 mi',
    duration: '3 days',
    joined: 72,
    palette: 7,
    description:
      'Camp beneath the dragon mountain with views over Lake Lucerne. Take the steepest cogwheel railway in the world down when your legs give up.',
    amenities: ['Mountain hut', 'Cogwheel railway', 'Restaurant', 'Showers'],
    highlights: ['Lake Lucerne panorama', 'Ibex sightings', 'Dragon trail'],
  },
  {
    slug: 'dune-oasis',
    name: 'Dune Oasis',
    location: 'Wadi Rum',
    country: 'Jordan',
    terrain: 'Desert',
    difficulty: 'Moderate',
    price: 45,
    rating: 4.8,
    reviews: 765,
    elevation: '0.950 km',
    distance: '32.0 mi',
    duration: '3 days',
    joined: 51,
    palette: 8,
    description:
      'Bedouin-style camp in the Valley of the Moon. Jeep across red dunes, climb sandstone bridges and share dinner cooked under the sand.',
    amenities: ['Bedouin tents', 'Jeep tours', 'Traditional dinner', 'Camel rides'],
    highlights: ['Valley of the Moon', 'Zarb underground dinner', 'Milky Way views'],
  },
  {
    slug: 'glacier-point',
    name: 'Glacier Point',
    location: 'Patagonia',
    country: 'Argentina',
    terrain: 'Snow',
    difficulty: 'Hard',
    price: 58,
    rating: 4.9,
    reviews: 896,
    elevation: '1.405 km',
    distance: '41.7 mi',
    duration: '6 days',
    joined: 64,
    palette: 9,
    description:
      'An expedition-style route along the edge of the Southern Patagonian Ice Field. Blue ice caves, granite towers and wind you will remember forever.',
    amenities: ['Expedition guide', 'Crampons', 'Satellite phone', 'Hot meals'],
    highlights: ['Ice cave visit', 'Fitz Roy viewpoints', 'Glacier trekking'],
  },
];

export function getCamp(slug: string) {
  return CAMPS.find((c) => c.slug === slug);
}
