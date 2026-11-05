// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/how-it-works', key: 'how_hilink_work', label: 'How Hilink Works' },
  { href: '/camps', key: 'camps', label: 'Camps' },
  { href: '/services', key: 'services', label: 'Services' },
  { href: '/pricing', key: 'pricing', label: 'Pricing' },
  { href: '/contact', key: 'contact_us', label: 'Contact Us' },
];

// CAMP SECTION
export const PEOPLE_URL = ['/person-1.png', '/person-2.png', '/person-3.png', '/person-4.png'];

// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Real maps can be offline',
    icon: '/map.svg',
    variant: 'green',
    href: '/services#offline-maps',
    description:
      'We provide a solution for you to be able to use our application when climbing, yes offline maps you can use at any time there is no signal at the location',
  },
  {
    title: 'Set an adventure schedule',
    icon: '/calendar.svg',
    variant: 'green',
    href: '/how-it-works#planner',
    description:
      "Schedule an adventure with friends. On holidays, there are many interesting offers from Hilink. That way, there's no more discussion",
  },
  {
    title: 'Technology using augment reality',
    icon: '/tech.svg',
    variant: 'green',
    href: '/services#ar-navigation',
    description:
      'Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection',
  },
  {
    title: 'Many new locations every month',
    icon: '/location.svg',
    variant: 'orange',
    href: '/camps',
    description:
      'Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      { label: 'About Hilink', href: '/about' },
      { label: 'Press Releases', href: '/press' },
      { label: 'Environment', href: '/environment' },
      { label: 'Jobs', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'All camps', href: '/camps' },
      { label: 'Trail guides', href: '/guides' },
      { label: 'Get the app', href: '/app' },
      { label: 'Saved camps', href: '/favorites' },
    ],
  },
  {
    title: 'Our Community',
    links: [
      { label: 'Climbing xixixi', href: '/community?group=climbing' },
      { label: 'Hiking hilink', href: '/community?group=hiking' },
      { label: 'Hilink kinthill', href: '/community?group=kinthill' },
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Admin Officer', value: '123-456-7890', href: 'tel:1234567890' },
    { label: 'Email Officer', value: 'hilink@akinthil.com', href: 'mailto:hilink@akinthil.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    { icon: '/facebook.svg', label: 'Facebook', href: 'https://facebook.com' },
    { icon: '/instagram.svg', label: 'Instagram', href: 'https://instagram.com' },
    { icon: '/twitter.svg', label: 'Twitter', href: 'https://twitter.com' },
    { icon: '/youtube.svg', label: 'YouTube', href: 'https://youtube.com' },
    { icon: '/wordpress.svg', label: 'Blog', href: '/guides' },
  ],
};
