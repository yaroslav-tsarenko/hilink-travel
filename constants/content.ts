// Editorial content for the Wildway concept. People and publications are fictional.

export type Person = { name: string; role?: string };

export const GUIDES_TEAM: (Person & { base: string; years: number })[] = [
  { name: 'Ásta Jónsdóttir', role: 'Lead guide, Iceland', base: 'Hella', years: 11 },
  { name: 'Mikkel Strand', role: 'Lead guide, Nordics and Pacific coast', base: 'Tromsø', years: 9 },
  { name: 'Lucía Ferrer', role: 'Lead guide, Patagonia and Utah', base: 'El Chaltén', years: 8 },
  { name: 'Daniel Okafor', role: 'Lead guide, North American lakes', base: 'Ely, Minnesota', years: 7 },
];

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Skills' | 'Gear' | 'Places' | 'Safety';
  readTime: string;
  date: string;
  photo: string;
  photoAlt: string;
  author: string;
  body: { heading: string; text: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'first-wild-camp-checklist',
    title: 'Your first wild camp: what to pack and what to leave',
    excerpt: 'A tested list for two nights out, sorted by what keeps you safe, what keeps you warm and what is simply nice to have.',
    category: 'Skills',
    readTime: '6 min',
    date: '14 Oct 2026',
    photo: '/photos/gear-flatlay.webp',
    photoAlt: 'Backpacking gear laid out on a dark floor',
    author: 'Ásta Jónsdóttir',
    body: [
      { heading: 'Start with the big three', text: 'Shelter, sleep system and pack make up most of the weight you carry. Borrow or rent them for the first trip and buy only once you know how you like to camp. A three-season tent, a bag rated a few degrees below the forecast low and a 50–60 litre pack cover most summer trips.' },
      { heading: 'Layers instead of bulk', text: 'Pack a thin base layer, a fleece or light synthetic jacket and a waterproof shell. Together they handle more weather than one heavy coat and pack into half the space. Keep one dry set of clothes only for sleeping.' },
      { heading: 'Light, water, and a map on paper', text: 'A head torch with spare batteries and a way to treat water are non-negotiable. Download the route offline, then print it anyway: phones die in the cold and paper does not.' },
      { heading: 'What to leave at home', text: 'Camp chairs, a second pair of boots and anything with “just in case” attached to it. If you did not use it last time, it stays.' },
    ],
  },
  {
    slug: 'map-and-compass-basics',
    title: 'Map and compass: the ten-minute refresher',
    excerpt: 'Orienting the map, taking a bearing and walking it through fog. Practise on a sunny day so it is automatic on a grey one.',
    category: 'Safety',
    readTime: '5 min',
    date: '28 Sep 2026',
    photo: '/photos/map-compass.webp',
    photoAlt: 'A baseplate compass on a topographic map of Sarek National Park',
    author: 'Mikkel Strand',
    body: [
      { heading: 'Read the contours first', text: 'Contour lines close together mean steep ground; far apart means flat. Before you look at the compass, find two features on the map you can also see around you — a lake, a ridge, a stream junction.' },
      { heading: 'Set the map', text: 'Turn the map until those features line up with the land. A set map turns every left and right on paper into a left and right on the ground.' },
      { heading: 'Take and walk a bearing', text: 'Lay the compass edge from where you are to where you want to go, turn the dial until the orienting lines match the north grid lines, then follow the direction-of-travel arrow. Pick a rock on that line, walk to it, repeat.' },
      { heading: 'Mind the declination', text: 'Magnetic north is not grid north. In northern Sweden the difference is small; in Patagonia it is over ten degrees east. Check the map margin before you set off.' },
    ],
  },
  {
    slug: 'september-on-the-water',
    title: 'Why September is the best month on the water',
    excerpt: 'Warm lakes, cold nights, no bugs and empty portages. A case for paddling trips at the end of the season.',
    category: 'Places',
    readTime: '7 min',
    date: '9 Sep 2026',
    photo: '/photos/boundary-waters.webp',
    photoAlt: 'A canoe on granite at the edge of a calm lake',
    author: 'Daniel Okafor',
    body: [
      { heading: 'The water holds the summer', text: 'Lakes lose heat far slower than air. In early September the Boundary Waters are often warmer than in June, while nights drop close to freezing — swim in the afternoon, sleep in a warm bag.' },
      { heading: 'Fewer people, more permits', text: 'Entry quotas that sell out in July are usually available after Labor Day, and the best island campsites are free when you arrive.' },
      { heading: 'Pack for both seasons', text: 'Bring a warm hat and gloves for the morning paddle, but keep sun protection: the low sun off the water is stronger than it feels.' },
    ],
  },
  {
    slug: 'choosing-a-backpacking-tent',
    title: 'Choosing a backpacking tent without overthinking it',
    excerpt: 'Capacity, seasons and weight — three questions that narrow hundreds of models down to a handful.',
    category: 'Gear',
    readTime: '5 min',
    date: '21 Aug 2026',
    photo: '/photos/night-tent.webp',
    photoAlt: 'A lit tent on a beach under a starry sky',
    author: 'Lucía Ferrer',
    body: [
      { heading: 'Capacity is generous to the manufacturer', text: 'A two-person tent fits two people and very little else. If you are tall or want your pack inside, size up.' },
      { heading: 'Three seasons is almost always enough', text: 'Four-season tents are built for snow loading and high wind. They are heavier and warmer than you want in summer. For Patagonia, choose a low, well-guyed three-season tent with a strong pole structure.' },
      { heading: 'Weight targets that make sense', text: 'Under 2 kg for a two-person tent is a good aim. Below 1.2 kg you start trading durability and ease of pitching for grams.' },
    ],
  },
  {
    slug: 'leave-no-trace',
    title: 'Leave no trace, explained on one page',
    excerpt: 'Seven principles, and the small habits that make them work on a real trip with a real group.',
    category: 'Safety',
    readTime: '4 min',
    date: '2 Aug 2026',
    photo: '/photos/pack-summit.webp',
    photoAlt: 'A backpack resting on a rock above a green mountain valley',
    author: 'Ásta Jónsdóttir',
    body: [
      { heading: 'Plan ahead', text: 'Know the local rules. Wild camping is a right in Norway and Scotland, restricted to huts in Iceland’s reserves and to designated sites in most US wilderness areas.' },
      { heading: 'Camp on durable ground', text: 'Rock, gravel and dry grass recover; moss and meadows do not. Pitch at least 60 metres from water.' },
      { heading: 'Pack it in, pack it out', text: 'Everything goes home, including food scraps and, where required, human waste. In Coyote Gulch and on many desert routes, pack-out bags are mandatory.' },
      { heading: 'Leave wildlife alone', text: 'Store food in canisters or barrels, never feed animals and give them the trail.' },
    ],
  },
  {
    slug: 'desert-nights',
    title: 'Desert nights: heat, cold and the darkest skies',
    excerpt: 'Deserts swing from 30 °C at noon to near freezing at night. How to stay comfortable at both ends.',
    category: 'Places',
    readTime: '6 min',
    date: '18 Jul 2026',
    photo: '/photos/wadi-rum.webp',
    photoAlt: 'A walker on a red dune in Wadi Rum at dusk',
    author: 'Lucía Ferrer',
    body: [
      { heading: 'Water arithmetic', text: 'Plan at least four litres per person per day when walking, more in shoulder-season heat. On guided Wadi Rum trips the resupply comes to camp; on your own, cache it.' },
      { heading: 'Night temperatures', text: 'Clear desert skies let the day’s heat escape quickly. Bring a bag rated to around 0 °C even in spring.' },
      { heading: 'Looking up', text: 'Give your eyes twenty minutes to adapt, use a red light and look for the Milky Way core low in the south in spring and summer.' },
    ],
  },
];

export const PLANS = [
  {
    name: 'Trailhead',
    monthly: 0,
    yearly: 0,
    description: 'Plan and book trips, pay as you go.',
    features: ['Book any guided trip', '2 offline route packs', 'Journal and trail notes', 'Trip planner'],
    cta: 'Create free account',
  },
  {
    name: 'Member',
    monthly: 9,
    yearly: 84,
    popular: true,
    description: 'For people who are out most months.',
    features: ['Unlimited offline route packs', '8% member price on trips', '3 free gear-rental days a year', 'Early access to new departures', 'Weather alerts for your trips'],
    cta: 'Start 30-day trial',
  },
  {
    name: 'Expedition',
    monthly: 19,
    yearly: 180,
    description: 'Long routes, remote regions, small teams.',
    features: ['Everything in Member', '15% member price on trips', 'Satellite messenger on loan', 'Navigation and river-crossing course', 'Priority guide matching'],
    cta: 'Choose Expedition',
  },
];

export const COMPARE_ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: 'Offline route packs', values: ['2', 'Unlimited', 'Unlimited'] },
  { label: 'Member price on trips', values: ['—', '8%', '15%'] },
  { label: 'Free gear-rental days', values: ['—', '3 a year', '7 a year'] },
  { label: 'Weather alerts', values: [false, true, true] },
  { label: 'Satellite messenger on loan', values: [false, false, true] },
  { label: 'Skills course', values: [false, false, true] },
  { label: 'Support', values: ['Email', 'Email, 24 h', 'Phone, same day'] },
];

export const FAQ = [
  { q: 'How fit do I need to be?', a: 'Every trip has a grade. Easy means 4–6 hours a day on paths with a light pack. Moderate adds longer days, some steep ground and river fords. Hard means trackless terrain, heavy packs and changeable weather, and we ask about your previous trips before confirming.' },
  { q: 'Is wild camping legal on these routes?', a: 'It depends on the country, and we only camp where it is allowed: under the right to roam in Norway and Sweden, at hut campsites in Iceland, in designated Boofen in Saxon Switzerland and at permitted sites in US and Canadian parks.' },
  { q: 'What is included in the price?', a: 'Guiding, permits and park fees, group equipment, food on the trail and the transfers listed on each trip. Flights and travel insurance are not included. Prices here are demo data.' },
  { q: 'Can I rent gear instead of buying it?', a: 'Yes. Tents, sleeping bags, mats, stoves and packs can be added when you book, and are waiting at the start point.' },
  { q: 'What happens if the weather turns?', a: 'Guides change the plan on the day. If a trip is cancelled for safety before departure, you get a full refund or a new date.' },
];

export const SERVICES = [
  { id: 'guided-trips', title: 'Guided trips', text: 'Small groups of six to ten with certified local guides who know the river levels, the wind and the good pitches.' },
  { id: 'permits', title: 'Permits and logistics', text: 'Wilderness permits, hut reservations, ferries and transfers arranged before you arrive.' },
  { id: 'gear-rental', title: 'Gear rental', text: 'Tents, bags, mats, stoves and packs, cleaned and checked, waiting at the trailhead.' },
  { id: 'route-packs', title: 'Offline route packs', text: 'GPX tracks, printable maps, water sources and bail-out points for every trip.' },
  { id: 'skills', title: 'Skills courses', text: 'Navigation, river crossing and winter camping, taught in a day on real terrain.' },
  { id: 'private', title: 'Private departures', text: 'Any route on your dates for friends, families or teams.' },
];

export const GEAR = [
  { id: 'tent', label: 'Tent, 2 person', detail: '3-season, 1.9 kg', price: 9 },
  { id: 'sleeping-bag', label: 'Sleeping bag', detail: 'Comfort −2 °C', price: 6 },
  { id: 'mat', label: 'Insulated mat', detail: 'R-value 4.2', price: 3 },
  { id: 'stove', label: 'Stove and pot set', detail: 'Gas, 1 L pot', price: 3 },
  { id: 'backpack', label: 'Backpack 60 L', detail: 'Adjustable back', price: 5 },
  { id: 'poles', label: 'Trekking poles', detail: 'Pair, aluminium', price: 2 },
  { id: 'canister', label: 'Bear canister', detail: 'Required in some US parks', price: 3 },
];

export const JOBS = [
  { title: 'Lead Guide, Iceland', team: 'Guiding', location: 'Hella, Iceland', type: 'Seasonal', text: 'Run Laugavegur and Fimmvörðuháls departures from June to September. AIMG or equivalent required.' },
  { title: 'Front-end Engineer', team: 'Product', location: 'Remote, Europe', type: 'Full-time', text: 'Build booking, route pages and offline route packs in React and TypeScript.' },
  { title: 'Trip Operations Coordinator', team: 'Operations', location: 'Tromsø, Norway', type: 'Full-time', text: 'Permits, transfers and the hundred small things that make a departure run on time.' },
  { title: 'Cartographer', team: 'Product', location: 'Remote', type: 'Contract', text: 'Turn elevation data and field notes into clear printable maps for every route.' },
  { title: 'Partnerships Lead, Americas', team: 'Partnerships', location: 'Remote, Americas', type: 'Full-time', text: 'Work with outfitters and guide associations in Utah, Washington and Patagonia.' },
];

export const TEAM: Person[] = [
  { name: 'Ingrid Halvorsen', role: 'Co-founder, operations' },
  { name: 'Tomás Rivera', role: 'Co-founder, guiding' },
  { name: 'Noor Haddad', role: 'Head of product' },
  { name: 'Erik Lund', role: 'Cartography' },
];

export const PRESS = [
  { outlet: 'Trail Quarterly', date: 'Oct 2026', title: 'Small groups, legal pitches: a new model for guided wild camping' },
  { outlet: 'Northbound', date: 'Aug 2026', title: 'Inside a six-day Sarek traverse with no huts and no signal' },
  { outlet: 'The Outdoor Desk', date: 'Jun 2026', title: 'Why guiding companies are publishing their camp rules' },
  { outlet: 'Field & Fjord', date: 'Mar 2026', title: 'Wildway opens departures in Utah and Patagonia' },
];

export type GroupId = 'ridges' | 'long-trails' | 'families';

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: 'ridges', label: 'Ridges and summits' },
  { id: 'long-trails', label: 'Long trails' },
  { id: 'families', label: 'Families outdoors' },
];

export type Post = {
  id: number;
  group: GroupId;
  author: string;
  camp: string;
  text: string;
  likes: number;
  comments: number;
  photo?: string;
  time: string;
};

export const POSTS: Post[] = [
  { id: 1, group: 'long-trails', author: 'Hanna Berg', camp: 'Laugavegur', text: 'Day two over Hrafntinnusker in thick cloud, then it lifted at the edge of the plateau and the whole of Álftavatn opened up below us. Worth every wet sock.', likes: 248, comments: 31, photo: '/photos/laugavegur.webp', time: '2 h' },
  { id: 2, group: 'ridges', author: 'Jonas Weber', camp: 'Fitz Roy Circuit', text: 'Left Poincenot at 4:10, reached the lake as the first light hit the spires. The last kilometre is as steep as everyone says.', likes: 512, comments: 64, photo: '/photos/fitz-roy.webp', time: '5 h' },
  { id: 3, group: 'families', author: 'Priya Nair', camp: 'Hoh River', text: 'Our two (7 and 10) carried their own sleeping bags all the way to Five Mile Island. Elk walked through camp at dinner.', likes: 189, comments: 22, photo: '/photos/hoh-rain-forest.webp', time: '1 d' },
  { id: 4, group: 'ridges', author: 'Ola Nordmann', camp: 'Kvalvika Beach', text: 'Ryten at midnight. Not a single cloud, sun sitting on the horizon, tents tiny on the beach below.', likes: 376, comments: 40, photo: '/photos/kvalvika.webp', time: '1 d' },
  { id: 5, group: 'long-trails', author: 'Sam Carter', camp: 'West Coast Trail', text: 'Counted 41 ladders on day five. Owen Point at low tide was the highlight of the whole trip.', likes: 421, comments: 37, photo: '/photos/west-coast-trail.webp', time: '2 d' },
  { id: 6, group: 'families', author: 'Marta Kowalska', camp: 'Boundary Waters', text: 'First canoe trip for all four of us. The kids now do loon calls at breakfast.', likes: 298, comments: 19, photo: '/photos/boundary-waters.webp', time: '3 d' },
];
