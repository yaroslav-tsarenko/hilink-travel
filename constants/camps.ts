// Trips and camps. Routes, regions and terrain are described from real places;
// prices, dates, ratings and availability are demo data for this concept.

export type Terrain = 'Mountain' | 'Coast' | 'Forest' | 'Lake' | 'Desert' | 'Glacier';
export type Difficulty = 'Easy' | 'Moderate' | 'Hard';

export type Stage = { title: string; km: number; note: string };

export type Camp = {
  slug: string;
  name: string;
  route: string;
  region: string;
  country: string;
  coords: string;
  terrain: Terrain;
  difficulty: Difficulty;
  price: number; // EUR per person per night, demo
  rating: number;
  reviews: number;
  km: number;
  ascent: number; // metres, cumulative
  days: number;
  groupMax: number;
  spotsLeft: number;
  season: string;
  photo: string;
  photoAlt: string;
  guide: string;
  summary: string;
  description: string;
  included: string[];
  highlights: string[];
  profile: number[]; // elevation samples in metres, evenly spaced along the route
  stages: Stage[];
};

export const TERRAINS: Terrain[] = ['Mountain', 'Coast', 'Forest', 'Lake', 'Desert', 'Glacier'];
export const DIFFICULTIES: Difficulty[] = ['Easy', 'Moderate', 'Hard'];

export const CAMPS: Camp[] = [
  {
    slug: 'laugavegur',
    name: 'Laugavegur',
    route: 'Landmannalaugar to Þórsmörk',
    region: 'Fjallabak, Highlands',
    country: 'Iceland',
    coords: '63.99° N, 19.06° W',
    terrain: 'Mountain',
    difficulty: 'Moderate',
    price: 95,
    rating: 4.9,
    reviews: 412,
    km: 55,
    ascent: 1300,
    days: 4,
    groupMax: 8,
    spotsLeft: 3,
    season: 'Late Jun – early Sep',
    photo: '/photos/laugavegur.webp',
    photoAlt: 'Hikers crossing a snowfield between steaming rhyolite hills near Landmannalaugar',
    guide: 'Ásta Jónsdóttir',
    summary: 'Rhyolite hills, steam vents and black-sand deserts on Iceland’s best-known hut-to-hut line.',
    description:
      'Four days across the Fjallabak highlands, from the hot spring at Landmannalaugar over the obsidian fields of Hrafntinnusker, down to the lake at Álftavatn and through the Mælifellssandur desert into the birch woods of Þórsmörk. We pitch at the campsites beside each mountain hut — wild camping is not permitted inside the reserve — and carry light, with a support vehicle moving the heavy food bags.',
    included: ['Certified lead guide', 'Hut campsite fees', 'Highland bus transfers', 'Shared cook tent', 'River-crossing shoes on loan'],
    highlights: ['Hot spring soak at Landmannalaugar', 'Obsidian ridge at 1,050 m', 'Wading the Bláfjallakvísl', 'Last night in Þórsmörk birch valley'],
    profile: [600, 680, 790, 900, 1010, 1050, 980, 860, 720, 560, 540, 560, 520, 510, 490, 450, 380, 300, 240, 210],
    stages: [
      { title: 'Landmannalaugar to Hrafntinnusker', km: 12, note: 'Steady climb through rhyolite and steam vents to the highest hut.' },
      { title: 'Hrafntinnusker to Álftavatn', km: 12, note: 'Snow patches, then a long descent to the lakeshore camp.' },
      { title: 'Álftavatn to Emstrur', km: 16, note: 'Two river fords and the black Mælifellssandur plain.' },
      { title: 'Emstrur to Þórsmörk', km: 15, note: 'Canyon views of Markarfljót, ending in the birch woods.' },
    ],
  },
  {
    slug: 'kvalvika',
    name: 'Kvalvika Beach',
    route: 'Innerpollen to Kvalvika and Ryten',
    region: 'Flakstadøya, Lofoten',
    country: 'Norway',
    coords: '68.08° N, 13.07° E',
    terrain: 'Coast',
    difficulty: 'Moderate',
    price: 85,
    rating: 4.8,
    reviews: 267,
    km: 9,
    ascent: 650,
    days: 2,
    groupMax: 8,
    spotsLeft: 5,
    season: 'Jun – Aug, midnight sun',
    photo: '/photos/kvalvika.webp',
    photoAlt: 'Surf rolling onto the sand of a steep-sided Lofoten cove',
    guide: 'Mikkel Strand',
    summary: 'A short, steep walk to a hidden Arctic cove, then sunset from the top of Ryten.',
    description:
      'Kvalvika is a sandy bay walled in by granite on the ocean side of Flakstadøya. The path climbs over a boggy saddle and drops to the beach, where we camp under Norway’s right to roam. In the evening we climb Ryten (543 m) for the famous view straight down onto the cove — in June and July the sun never sets.',
    included: ['Lofoten-based guide', 'Tents and sleeping mats', 'Dinner and breakfast on the beach', 'Transfer from Reine'],
    highlights: ['Sleeping on an Arctic beach', 'Ryten summit at midnight', 'Sea eagles over the headland'],
    profile: [40, 130, 220, 250, 160, 60, 10, 10, 120, 300, 450, 543, 420, 260, 120, 40],
    stages: [
      { title: 'Innerpollen to Kvalvika', km: 3, note: 'Over the saddle and down to the bay. Camp set by early afternoon.' },
      { title: 'Ryten and back to the road', km: 6, note: 'Ridge walk to the summit, return via Fredvang.' },
    ],
  },
  {
    slug: 'sarek',
    name: 'Sarek Traverse',
    route: 'Aktse through Rapadalen to Kvikkjokk',
    region: 'Sarek National Park, Lapland',
    country: 'Sweden',
    coords: '67.15° N, 17.70° E',
    terrain: 'Mountain',
    difficulty: 'Hard',
    price: 120,
    rating: 4.9,
    reviews: 98,
    km: 76,
    ascent: 2400,
    days: 6,
    groupMax: 6,
    spotsLeft: 2,
    season: 'Mid Jul – early Sep',
    photo: '/photos/sarek.webp',
    photoAlt: 'A lone hiker on autumn tundra below snow-dusted Lapland peaks',
    guide: 'Mikkel Strand',
    summary: 'Six days without huts, bridges or waymarks through Europe’s last great wilderness.',
    description:
      'Sarek has no marked trails and no huts. From the Kungsleden hut at Aktse we follow the braided Rapaätno river into Rapadalen, cross the Ruohtesvagge pass and come out at Kvikkjokk. Navigation is by map and compass, river crossings are part of the day, and the weather can bring snow in August. Recommended only after a previous multi-day trip.',
    included: ['Two guides for six walkers', 'Satellite messenger', 'Freeze-dried meals', 'Boat crossing at Laitaure', 'Expedition tents'],
    highlights: ['Skierffe viewpoint over the Rapa delta', 'Moose and reindeer in Rapadalen', 'Fully self-supported wild camps'],
    profile: [520, 600, 880, 1179, 700, 560, 610, 680, 720, 830, 980, 1120, 1020, 860, 700, 560, 450, 340],
    stages: [
      { title: 'Aktse and Skierffe', km: 10, note: 'Climb to the 1,179 m cliff for the view over the delta.' },
      { title: 'Into Rapadalen', km: 14, note: 'Trackless birch and willow along the river.' },
      { title: 'Rapadalen to Bielavallda', km: 13, note: 'Glacier streams and the first serious ford.' },
      { title: 'Over Ruohtesvagge', km: 15, note: 'Highest pass of the trip, often in cloud.' },
      { title: 'Down to Pårek', km: 12, note: 'Old Sámi summer settlement, wide views south.' },
      { title: 'Out to Kvikkjokk', km: 12, note: 'Back on a path, then the bus south.' },
    ],
  },
  {
    slug: 'malerweg',
    name: 'Malerweg',
    route: 'Pirna-Liebethal to Schmilka, stages 1–4',
    region: 'Saxon Switzerland',
    country: 'Germany',
    coords: '50.96° N, 14.07° E',
    terrain: 'Forest',
    difficulty: 'Easy',
    price: 70,
    rating: 4.7,
    reviews: 331,
    km: 52,
    ascent: 1700,
    days: 4,
    groupMax: 10,
    spotsLeft: 6,
    season: 'Apr – Oct',
    photo: '/photos/malerweg.webp',
    photoAlt: 'Sandstone towers rising out of a pine forest in Saxon Switzerland',
    guide: 'Lena Vogt',
    summary: 'Sandstone towers, ladders and nights in the park’s legal overhang shelters.',
    description:
      'The Painters’ Way follows the route 19th-century artists took through the Elbe Sandstone Mountains. We walk the first half, past the Bastei bridge and the Schrammsteine ridge, and sleep in “Boofen” — the rock overhangs where the national park allows overnight stays. Short days, good bakeries in the villages, and plenty of time to scramble.',
    included: ['Local guide', 'Elbe ferry tickets', 'Lunch packs', 'Head torches and bivvy bags'],
    highlights: ['Bastei bridge at first light', 'Schrammsteine ridge ladders', 'Sleeping in a sandstone Boofe'],
    profile: [130, 180, 260, 305, 220, 140, 120, 230, 330, 380, 300, 200, 170, 260, 400, 417, 330, 210, 130],
    stages: [
      { title: 'Liebethal to Stadt Wehlen', km: 11, note: 'The Liebethaler Grund gorge and the Elbe.' },
      { title: 'Stadt Wehlen to Hohnstein', km: 13, note: 'Bastei bridge and the Schwedenlöcher gorge.' },
      { title: 'Hohnstein to Altendorf', km: 14, note: 'Brand viewpoint and the Polenz valley.' },
      { title: 'Altendorf to Schmilka', km: 14, note: 'Schrammsteine ridge, ladders and iron steps.' },
    ],
  },
  {
    slug: 'wadi-rum',
    name: 'Wadi Rum',
    route: 'Rum village to Burdah Arch',
    region: 'Wadi Rum Protected Area',
    country: 'Jordan',
    coords: '29.57° N, 35.42° E',
    terrain: 'Desert',
    difficulty: 'Moderate',
    price: 75,
    rating: 4.8,
    reviews: 289,
    km: 38,
    ascent: 700,
    days: 3,
    groupMax: 8,
    spotsLeft: 4,
    season: 'Oct – Apr',
    photo: '/photos/wadi-rum.webp',
    photoAlt: 'A walker resting on a red dune below sandstone cliffs at dusk',
    guide: 'Salem Al-Zalabieh',
    summary: 'Red sand, sandstone domes and nights in the open with a Zalabia Bedouin guide.',
    description:
      'Three days on foot through the valley T. E. Lawrence wrote about, guided by a family from Rum village. We walk between the domes of Jebel Umm Ishrin and Jebel Burdah, scramble up to the Burdah rock bridge, and sleep on mats under rock overhangs. Water and dinner are brought out to camp by 4x4 each evening.',
    included: ['Bedouin guide', 'Protected area entry', 'All meals and water resupply', 'Sleeping mats and blankets'],
    highlights: ['Burdah rock bridge scramble', 'Sunset from the red dunes', 'Dinner cooked in the sand'],
    profile: [950, 980, 1010, 1040, 1000, 960, 990, 1060, 1120, 1240, 1380, 1290, 1120, 1020, 980, 960],
    stages: [
      { title: 'Rum village to Khazali', km: 13, note: 'Lawrence’s Spring and the inscriptions at Khazali Siq.' },
      { title: 'Khazali to Burdah', km: 14, note: 'Red dunes and the scramble to the arch.' },
      { title: 'Burdah to Um Fruth', km: 11, note: 'Small bridge at Um Fruth, pick-up at noon.' },
    ],
  },
  {
    slug: 'fitz-roy',
    name: 'Fitz Roy Circuit',
    route: 'El Chaltén, Laguna de los Tres and Laguna Torre',
    region: 'Los Glaciares, Patagonia',
    country: 'Argentina',
    coords: '49.27° S, 73.04° W',
    terrain: 'Glacier',
    difficulty: 'Hard',
    price: 110,
    rating: 4.9,
    reviews: 356,
    km: 52,
    ascent: 1900,
    days: 4,
    groupMax: 8,
    spotsLeft: 1,
    season: 'Nov – Mar',
    photo: '/photos/fitz-roy.webp',
    photoAlt: 'The granite spires of Fitz Roy above the turquoise Laguna de los Tres',
    guide: 'Lucía Ferrer',
    summary: 'Granite spires, hanging glaciers and the steep last kilometre to Laguna de los Tres.',
    description:
      'From El Chaltén we walk up to the free national park camps at Laguna Capri and Poincenot, climb before dawn to Laguna de los Tres for first light on Fitz Roy, then traverse past Laguna Madre e Hija to the De Agostini camp below Cerro Torre. Patagonian wind is the real difficulty: expect days you walk bent forward.',
    included: ['Bilingual mountain guide', '4-season tents', 'All trail meals', 'Transfer from El Calafate'],
    highlights: ['Sunrise at Laguna de los Tres', 'Piedras Blancas glacier', 'Cerro Torre from De Agostini'],
    profile: [400, 520, 650, 760, 750, 760, 820, 1170, 900, 760, 720, 700, 640, 620, 640, 700, 620, 520, 400],
    stages: [
      { title: 'El Chaltén to Laguna Capri', km: 8, note: 'Short first day with the first view of the massif.' },
      { title: 'Capri to Poincenot', km: 5, note: 'Afternoon side trip to the Piedras Blancas glacier.' },
      { title: 'Laguna de los Tres to De Agostini', km: 19, note: '4 a.m. start, 400 m of steep scree, then the lake traverse.' },
      { title: 'Laguna Torre to El Chaltén', km: 20, note: 'Glacier lake at dawn, then down the Fitz Roy river valley.' },
    ],
  },
  {
    slug: 'boundary-waters',
    name: 'Boundary Waters',
    route: 'Moose Lake loop by canoe',
    region: 'Superior National Forest, Minnesota',
    country: 'USA',
    coords: '47.98° N, 91.50° W',
    terrain: 'Lake',
    difficulty: 'Easy',
    price: 90,
    rating: 4.8,
    reviews: 204,
    km: 46,
    ascent: 120,
    days: 4,
    groupMax: 9,
    spotsLeft: 5,
    season: 'Jun – Sep',
    photo: '/photos/boundary-waters.webp',
    photoAlt: 'A yellow canoe pulled up on granite beside a calm forested lake',
    guide: 'Daniel Okafor',
    summary: 'Four days of paddling and portages between granite islands and loon calls.',
    description:
      'The Boundary Waters Canoe Area Wilderness has no roads and no motors on most lakes. From the Moose Lake entry point near Ely we paddle a loop through Newfound, Ensign and Vera lakes, carrying canoes over the portages and camping at the designated sites with a fire grate and a wilderness latrine. Ideal for a first multi-day trip.',
    included: ['Wilderness permit and quota fee', 'Kevlar canoes and paddles', 'Bear-proof food barrels', 'All meals', 'Paddling instruction'],
    highlights: ['Loons at dusk', 'Swimming off granite slabs', 'Dark skies, sometimes aurora'],
    profile: [430, 430, 432, 445, 432, 432, 440, 452, 438, 436, 436, 448, 434, 432, 430, 430],
    stages: [
      { title: 'Moose Lake to Ensign', km: 13, note: 'Three short portages, island campsite.' },
      { title: 'Ensign to Vera', km: 11, note: 'The longest carry: 1.2 km through pine.' },
      { title: 'Vera to Ensign', km: 10, note: 'Lazy day, fishing for walleye.' },
      { title: 'Ensign to Moose Lake', km: 12, note: 'Back to the outfitter by lunch.' },
    ],
  },
  {
    slug: 'hoh-rain-forest',
    name: 'Hoh River',
    route: 'Hoh Rain Forest to Olympus Guard Station',
    region: 'Olympic National Park, Washington',
    country: 'USA',
    coords: '47.86° N, 123.93° W',
    terrain: 'Forest',
    difficulty: 'Easy',
    price: 80,
    rating: 4.7,
    reviews: 188,
    km: 29,
    ascent: 250,
    days: 3,
    groupMax: 10,
    spotsLeft: 7,
    season: 'May – Oct',
    photo: '/photos/hoh-rain-forest.webp',
    photoAlt: 'Moss-draped maples and ferns in a temperate rain forest',
    guide: 'Daniel Okafor',
    summary: 'A gentle river trail through one of the wettest temperate rain forests on Earth.',
    description:
      'The Hoh valley gets over 3.5 m of rain a year, and it shows: Sitka spruce and bigleaf maples hung with moss, nurse logs, ferns at shoulder height. The trail is nearly flat as it follows the glacial river to Olympus Guard Station. We camp on the gravel bars, where Roosevelt elk often wander past in the evening.',
    included: ['Wilderness camping permit', 'Bear canisters', 'Tents and rain tarps', 'All meals'],
    highlights: ['Hall of Mosses loop', 'Roosevelt elk on the river bars', 'Views of Mount Tom glacier'],
    profile: [175, 185, 195, 210, 220, 240, 260, 280, 300, 320, 345, 365, 380, 370, 345, 300, 240, 190],
    stages: [
      { title: 'Visitor Center to Five Mile Island', km: 8, note: 'Old-growth spruce and the first river bar camp.' },
      { title: 'To Olympus Guard Station and back', km: 13, note: 'Lewis Meadow and the ranger station, light packs.' },
      { title: 'Five Mile Island to trailhead', km: 8, note: 'Out by early afternoon, Hall of Mosses on the way.' },
    ],
  },
  {
    slug: 'coyote-gulch',
    name: 'Coyote Gulch',
    route: 'Hurricane Wash to the Escalante River',
    region: 'Grand Staircase-Escalante, Utah',
    country: 'USA',
    coords: '37.43° N, 111.03° W',
    terrain: 'Desert',
    difficulty: 'Moderate',
    price: 95,
    rating: 4.9,
    reviews: 147,
    km: 40,
    ascent: 400,
    days: 3,
    groupMax: 8,
    spotsLeft: 3,
    season: 'Apr – May, Sep – Oct',
    photo: '/photos/coyote-gulch.webp',
    photoAlt: 'Cottonwoods along a creek at the bottom of a red sandstone canyon',
    guide: 'Lucía Ferrer',
    summary: 'Wading a desert creek beneath arches, overhangs and cottonwood shade.',
    description:
      'From the Hurricane Wash trailhead a dry sandy wash narrows into Coyote Gulch, where a shallow creek runs between overhanging red walls. We walk in the water past Jacob Hamblin Arch and Coyote Natural Bridge to the Escalante River confluence, camping on sandy benches. Pack-out toilet bags are required here and supplied.',
    included: ['Glen Canyon backcountry permit', 'Wading shoes on loan', 'Waste bags', 'All meals and water filters'],
    highlights: ['Jacob Hamblin Arch', 'Coyote Natural Bridge', 'Petroglyph panel near the confluence'],
    profile: [1380, 1350, 1310, 1270, 1240, 1220, 1200, 1180, 1160, 1150, 1140, 1160, 1190, 1230, 1280, 1330, 1380],
    stages: [
      { title: 'Hurricane Wash to Jacob Hamblin Arch', km: 13, note: 'Open wash, then into the canyon and the creek.' },
      { title: 'Arch to the Escalante and back', km: 14, note: 'Natural bridge, waterfalls, the confluence.' },
      { title: 'Out via Hurricane Wash', km: 13, note: 'Sandy climb out before the afternoon heat.' },
    ],
  },
  {
    slug: 'west-coast-trail',
    name: 'West Coast Trail',
    route: 'Pachena Bay to Gordon River',
    region: 'Pacific Rim, Vancouver Island',
    country: 'Canada',
    coords: '48.65° N, 124.80° W',
    terrain: 'Coast',
    difficulty: 'Hard',
    price: 130,
    rating: 4.8,
    reviews: 173,
    km: 75,
    ascent: 2100,
    days: 6,
    groupMax: 8,
    spotsLeft: 2,
    season: 'May – Sep',
    photo: '/photos/west-coast-trail.webp',
    photoAlt: 'Two backpackers walking over driftwood logs on a pebble beach',
    guide: 'Mikkel Strand',
    summary: 'Ladders, cable cars and surge channels on the old shipwreck rescue route.',
    description:
      'Built after the wreck of the Valencia in 1906, the trail runs 75 km along the outer coast of Pacific Rim National Park Reserve. Days alternate between beach walking timed to the tides and muddy rain forest with more than 70 ladders. We camp on beaches at Michigan Creek, Tsusiat Falls, Cribs and Thrasher Cove.',
    included: ['Overnight use permit and reservation', 'Tide tables and route brief', 'Ferry crossings at Nitinat and Gordon River', 'All meals'],
    highlights: ['Tsusiat Falls onto the beach', 'Sea lions at Pachena Point', 'Cable cars over the creeks'],
    profile: [10, 60, 40, 20, 10, 30, 80, 20, 10, 40, 120, 60, 20, 10, 100, 180, 90, 30, 10],
    stages: [
      { title: 'Pachena Bay to Michigan Creek', km: 12, note: 'Lighthouse and sea lion rocks.' },
      { title: 'Michigan Creek to Tsusiat Falls', km: 13, note: 'Long beach sections, check the tide table.' },
      { title: 'Tsusiat to Cribs Creek', km: 17, note: 'Nitinat Narrows ferry and the crab shack.' },
      { title: 'Cribs Creek to Walbran', km: 10, note: 'Shelf rock and the first cable cars.' },
      { title: 'Walbran to Thrasher Cove', km: 14, note: 'Ladders and boulders around Owen Point at low tide.' },
      { title: 'Thrasher Cove to Gordon River', km: 9, note: 'Short climb and the ferry to Port Renfrew.' },
    ],
  },
];

export function getCamp(slug: string) {
  return CAMPS.find((c) => c.slug === slug);
}

export const PRICE_MIN = 60;
export const PRICE_MAX = 140;
