export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Tips' | 'Gear' | 'Destinations' | 'Safety';
  readTime: string;
  date: string;
  palette: number;
  author: { name: string; avatar: string };
  body: { heading: string; text: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'first-camping-trip-checklist',
    title: 'Your first camping trip: the only checklist you need',
    excerpt: 'From tent to headlamp — everything a beginner should pack, and the things you can safely leave at home.',
    category: 'Tips',
    readTime: '6 min',
    date: 'Oct 12, 2025',
    palette: 0,
    author: { name: 'Samsul Udin', avatar: '/person-1.png' },
    body: [
      { heading: 'Start with the big three', text: 'Shelter, sleep system and backpack make up most of the weight you carry. Rent them for your first trip — Hilink partners offer gear at every camp — and buy only once you know what you like.' },
      { heading: 'Layers beat bulk', text: 'Instead of one heavy jacket, pack a base layer, a fleece and a waterproof shell. You can combine them for any weather and they pack down small.' },
      { heading: 'Light and water', text: 'A headlamp with spare batteries and a way to filter water are non-negotiable. Everything else is comfort.' },
      { heading: 'Download your map', text: 'Before you lose signal, save the trail offline in the Hilink app. Your blue dot keeps working with GPS only.' },
    ],
  },
  {
    slug: 'offline-navigation-explained',
    title: 'How offline navigation keeps you on the trail',
    excerpt: 'GPS works without internet. Here is how Hilink turns that into turn-by-turn guidance in the middle of nowhere.',
    category: 'Safety',
    readTime: '4 min',
    date: 'Sep 28, 2025',
    palette: 2,
    author: { name: 'Maya Lestari', avatar: '/person-2.png' },
    body: [
      { heading: 'GPS is not the internet', text: 'Your phone talks to satellites directly. All it needs is a map stored locally — that is what offline packs are.' },
      { heading: 'Contour-aware routing', text: 'Hilink maps include elevation data, so the app warns you about steep sections and estimates realistic time, not just distance.' },
      { heading: 'Battery tips', text: 'Airplane mode plus GPS uses surprisingly little power. Dim your screen and keep the phone warm in cold weather.' },
    ],
  },
  {
    slug: 'best-lake-camps-autumn',
    title: '7 lake camps that are even better in autumn',
    excerpt: 'Fewer crowds, golden forests and mirror-flat water. Our community picks for the season.',
    category: 'Destinations',
    readTime: '8 min',
    date: 'Sep 10, 2025',
    palette: 1,
    author: { name: 'Rizky Pratama', avatar: '/person-3.png' },
    body: [
      { heading: 'Why autumn', text: 'Water stays warm long after the air cools down, insects are gone and campsites are half empty.' },
      { heading: 'Mountain View Camp', text: 'Our most-loved lake camp. Book a sunrise kayak tour and bring a thermos.' },
      { heading: 'Kayak Bay Retreat', text: 'Lofoten in October means the first northern lights reflected in the fjord.' },
    ],
  },
  {
    slug: 'choosing-a-backpacking-tent',
    title: 'Choosing a backpacking tent without overthinking it',
    excerpt: 'Weight, space, weather — a simple framework for picking the tent that fits your trips.',
    category: 'Gear',
    readTime: '5 min',
    date: 'Aug 21, 2025',
    palette: 6,
    author: { name: 'Dewi Anggraini', avatar: '/person-4.png' },
    body: [
      { heading: 'Capacity', text: 'Tents are rated tightly. A two-person tent fits two people and no gear; size up if you want comfort.' },
      { heading: 'Seasons', text: 'Three-season tents cover most trips. Four-season models are heavier and only worth it for snow and high wind.' },
      { heading: 'Weight', text: 'Under 2 kg for a two-person tent is a great target for hiking trips.' },
    ],
  },
  {
    slug: 'leave-no-trace',
    title: 'Leave no trace: 7 principles every hiker should know',
    excerpt: 'Small habits that keep wild places wild for the next generation of adventurers.',
    category: 'Safety',
    readTime: '5 min',
    date: 'Aug 2, 2025',
    palette: 5,
    author: { name: 'Samsul Udin', avatar: '/person-1.png' },
    body: [
      { heading: 'Plan ahead', text: 'Know the rules of the area, check the weather and prepare for emergencies.' },
      { heading: 'Pack it in, pack it out', text: 'Everything you bring goes home with you, including food scraps.' },
      { heading: 'Respect wildlife', text: 'Observe from a distance and never feed animals.' },
    ],
  },
  {
    slug: 'desert-camping-guide',
    title: 'Desert camping: heat, cold and the best stars of your life',
    excerpt: 'Deserts swing from scorching days to freezing nights. Here is how to enjoy both.',
    category: 'Destinations',
    readTime: '7 min',
    date: 'Jul 15, 2025',
    palette: 3,
    author: { name: 'Maya Lestari', avatar: '/person-2.png' },
    body: [
      { heading: 'Water math', text: 'Plan at least 4 litres per person per day, more if you are hiking.' },
      { heading: 'Night temperatures', text: 'A desert night can drop below 5 °C. Bring a warm sleeping bag even in summer.' },
      { heading: 'Stargazing', text: 'Let your eyes adapt for 20 minutes, use a red light and look for the Milky Way core.' },
    ],
  },
];

export const PLANS = [
  {
    name: 'Explorer',
    monthly: 0,
    yearly: 0,
    description: 'Everything you need for weekend adventures.',
    features: ['Browse all camps', '3 offline maps', 'Community access', 'Basic trip planner'],
    cta: 'Start free',
  },
  {
    name: 'Adventurer',
    monthly: 9,
    yearly: 84,
    popular: true,
    description: 'For hikers who go out every month.',
    features: ['Unlimited offline maps', 'AR trail guidance', 'Group trip scheduling', '10% off camp bookings', 'Weather alerts'],
    cta: 'Try 14 days free',
  },
  {
    name: 'Expedition',
    monthly: 19,
    yearly: 180,
    description: 'Serious multi-day trips and teams.',
    features: ['Everything in Adventurer', 'Satellite SOS check-ins', 'Expedition guides chat', '20% off camp bookings', 'Priority support'],
    cta: 'Go Expedition',
  },
];

export const COMPARE_ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: 'Offline maps', values: ['3', 'Unlimited', 'Unlimited'] },
  { label: 'AR trail guidance', values: [false, true, true] },
  { label: 'Group scheduling', values: [false, true, true] },
  { label: 'Camp booking discount', values: ['—', '10%', '20%'] },
  { label: 'Weather alerts', values: [false, true, true] },
  { label: 'Satellite SOS', values: [false, false, true] },
  { label: 'Support', values: ['Community', 'Email', 'Priority 24/7'] },
];

export const FAQ = [
  { q: 'Do offline maps really work without signal?', a: 'Yes. Maps are stored on your phone and your position comes from GPS satellites, which do not need mobile data.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Of course. Cancel in one tap from settings and keep access until the end of your billing period.' },
  { q: 'How do camp bookings work?', a: 'Pick dates and guests on any camp page and confirm. You pay the camp directly on arrival; Hilink never charges booking fees.' },
  { q: 'Is Hilink available on Android and iOS?', a: 'Yes, Hilink is available on both App Store and Google Play, and your trips sync between devices.' },
  { q: 'Can I plan trips with friends?', a: 'Create a group trip, invite friends with a link and vote on dates. Everyone gets the same offline map and schedule.' },
];

export const SERVICES = [
  { id: 'offline-maps', icon: '/map.svg', title: 'Offline maps', text: 'Topographic maps with contour lines, water sources and campsites that work with zero signal.' },
  { id: 'ar-navigation', icon: '/tech.svg', title: 'AR navigation', text: 'Point your camera at the trail and follow floating arrows to the summit — no internet required.' },
  { id: 'trip-scheduling', icon: '/calendar.svg', title: 'Trip scheduling', text: 'Plan group adventures, vote on dates and get reminders with the weather forecast.' },
  { id: 'camp-booking', icon: '/folded-map.svg', title: 'Camp booking', text: 'Reserve spots at 1,200+ partner camps worldwide with transparent prices and no fees.' },
  { id: 'gear-rental', icon: '/camp.svg', title: 'Gear rental', text: 'Tents, sleeping bags and stoves waiting for you at the camp. Return them when you leave.' },
  { id: 'local-guides', icon: '/location.svg', title: 'Local guides', text: 'Certified guides who know every shortcut, viewpoint and story of their mountains.' },
];

export const GEAR = [
  { id: 'tent', label: 'Tent (2 persons)', price: 8 },
  { id: 'sleeping-bag', label: 'Sleeping bag', price: 4 },
  { id: 'mat', label: 'Sleeping mat', price: 2 },
  { id: 'stove', label: 'Camping stove', price: 3 },
  { id: 'backpack', label: 'Backpack 50 L', price: 5 },
  { id: 'headlamp', label: 'Headlamp', price: 1 },
];

export const JOBS = [
  { title: 'Senior React Native Engineer', team: 'Engineering', location: 'Remote · Europe', type: 'Full-time', text: 'Build the offline map engine and AR navigation used by millions of hikers.' },
  { title: 'Product Designer', team: 'Design', location: 'Bali, Indonesia', type: 'Full-time', text: 'Own the trip planning experience from first idea to the summit selfie.' },
  { title: 'Community Manager', team: 'Community', location: 'Remote', type: 'Part-time', text: 'Grow and support our worldwide community of climbers and hikers.' },
  { title: 'Cartography Specialist', team: 'Maps', location: 'Zurich, Switzerland', type: 'Full-time', text: 'Turn raw elevation data into beautiful, readable trail maps.' },
  { title: 'Camp Partnerships Lead', team: 'Partnerships', location: 'Remote · Americas', type: 'Full-time', text: 'Onboard new camps and help them welcome Hilink travellers.' },
];

export const TEAM = [
  { name: 'Samsul Udin', role: 'Co-founder & CEO', avatar: '/person-1.png' },
  { name: 'Maya Lestari', role: 'Co-founder & Head of Maps', avatar: '/person-2.png' },
  { name: 'Rizky Pratama', role: 'CTO', avatar: '/person-3.png' },
  { name: 'Dewi Anggraini', role: 'Head of Community', avatar: '/person-4.png' },
];

export const PRESS = [
  { outlet: 'Outdoor Weekly', date: 'Oct 2025', title: 'Hilink passes 2 million downloaded offline trail maps' },
  { outlet: 'Tech Trail', date: 'Aug 2025', title: 'AR hiking navigation that works without the internet' },
  { outlet: 'Green Journal', date: 'Jun 2025', title: 'Hilink plants a tree for every completed trip' },
  { outlet: 'Travel Daily', date: 'Mar 2025', title: 'The camping app that wants you to put your phone away' },
];

export type Post = {
  id: number;
  group: 'climbing' | 'hiking' | 'kinthill';
  author: string;
  avatar: string;
  camp: string;
  text: string;
  likes: number;
  comments: number;
  palette: number;
  time: string;
};

export const POSTS: Post[] = [
  { id: 1, group: 'hiking', author: 'Maya Lestari', avatar: '/person-2.png', camp: 'Mountain View Camp', text: 'Sunrise kayak was absolutely worth the 5 am alarm. The lake was a mirror!', likes: 248, comments: 31, palette: 1, time: '2h' },
  { id: 2, group: 'climbing', author: 'Rizky Pratama', avatar: '/person-3.png', camp: 'Aguas Calientes Base', text: 'Day 3 of 5. Legs are gone, views are unreal. The offline map saved us twice in the fog.', likes: 512, comments: 64, palette: 2, time: '5h' },
  { id: 3, group: 'kinthill', author: 'Dewi Anggraini', avatar: '/person-4.png', camp: 'Pine Hollow', text: 'Took the kids on their first overnight trip. Blueberries everywhere 🫐', likes: 189, comments: 22, palette: 6, time: '1d' },
  { id: 4, group: 'climbing', author: 'Samsul Udin', avatar: '/person-1.png', camp: 'Alpine Ridge Hut', text: 'Crampons on, ridge done. Tatras in winter are something else.', likes: 376, comments: 40, palette: 5, time: '1d' },
  { id: 5, group: 'hiking', author: 'Maya Lestari', avatar: '/person-2.png', camp: 'Red Rock Canyon', text: 'Darkest sky I have ever seen. Counted 14 shooting stars before falling asleep.', likes: 421, comments: 37, palette: 3, time: '2d' },
  { id: 6, group: 'kinthill', author: 'Rizky Pratama', avatar: '/person-3.png', camp: 'Kayak Bay Retreat', text: 'Midnight sun paddling session. Nobody wanted to go to bed.', likes: 298, comments: 19, palette: 4, time: '3d' },
];
