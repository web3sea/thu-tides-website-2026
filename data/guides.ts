// Travel guides sold on thutides.com. Each guide is its own mobile web app on a
// subdomain; the storefront here links to a Stripe Payment Link and, after
// payment, Stripe sends the buyer to the guide app to open it.
export type GuideStatus = 'available' | 'next' | 'planned'

export type Guide = {
  slug: string
  title: string
  region: string
  tagline: string
  description: string
  status: GuideStatus
  image: string
  imageAlt: string
  /** Display price, only for guides that are on sale. */
  price?: string
  /** Stripe Payment Link. Stripe redirects to the guide app after payment. */
  buyUrl?: string
  /** Where existing buyers sign in. */
  appUrl?: string
  chapters?: { title: string; intro: string }[]
  /** Search and social description for the sales page. */
  seoDescription?: string
  /** "How it works" cards on the sales page. Material Symbols icon names. */
  highlights?: { icon: string; title: string; text: string }[]
}

export const guides: Guide[] = [
  {
    slug: 'raja-ampat',
    title: 'Raja Ampat',
    region: 'West Papua, Indonesia',
    tagline: 'The reefs that made Raja Ampat famous, planned day by day.',
    description:
      'A mobile guide built from our own trips: seasons and permits, a 12-day itinerary with a real budget, and the islands we would go back to. Reads like a friend who has been there, works offline on your phone.',
    status: 'available',
    image: '/guides/raja-ampat-cover.webp',
    imageAlt: 'Limestone islands and turquoise lagoons of Raja Ampat from the air',
    price: '$12',
    buyUrl: 'https://buy.stripe.com/dRm5kE1uweQH9x96djdMI0j',
    appUrl: 'https://rajaampat.thutides.com',
    seoDescription:
      'A mobile guide to Raja Ampat from Thu Tides: seasons and permits, a 12-day itinerary with a real budget, Kri, Arborek, Piaynemo, Misool and where to stay. US$12, reads on two devices.',
    highlights: [
      { icon: 'phone_iphone', title: 'Built for your phone', text: 'A small web app you open with a code from your email. No app store, no PDF to pinch and zoom.' },
      { icon: 'devices', title: 'Two devices', text: 'Register the phone and tablet you will actually read on. Both stay signed in for 30 days at a time.' },
      { icon: 'payments', title: 'A real budget', text: 'What a 12-day trip cost us, line by line, and how to trim it or spend more where it matters.' },
      { icon: 'sailing', title: 'Homestay to liveaboard', text: 'Honest notes on the three ways to sleep in Raja Ampat and what each changes about your trip.' },
    ],
    chapters: [
      { title: 'Useful info', intro: 'Seasons, visas, getting there, permits, money, data, packing and where to stay.' },
      { title: 'Itinerary & budget', intro: 'Sorong, Waisai, how to build a budget, and three itineraries we would do again.' },
      { title: 'Kri & the Dampier Strait', intro: 'The reefs that made Raja Ampat famous, and where to sleep beside them.' },
      { title: 'Arborek', intro: 'A village island with the most photographed jetty in Indonesia.' },
      { title: 'Piaynemo & Fam', intro: 'The karst viewpoint, the star lagoon and the Fam reefs.' },
      { title: 'Misool', intro: 'The wild south: soft coral walls, hidden lagoons and ancient rock art.' },
      { title: 'Where to stay', intro: 'Homestays, resorts and liveaboards, and what each one changes.' },
    ],
  },
  {
    slug: 'lombok',
    title: 'Lombok',
    region: 'West Nusa Tenggara, Indonesia',
    tagline: 'Surf, waterfalls and the Gilis without the Bali crowds.',
    description: 'The next guide in the series. Sign up on the Raja Ampat guide and we will let you know when it launches.',
    status: 'next',
    image: '/DJI_arial_island_balicasa.webp',
    imageAlt: 'Aerial view of a tropical island coastline',
  },
  {
    slug: 'bali',
    title: 'Bali',
    region: 'Indonesia',
    tagline: 'The quiet corners of an island everyone thinks they know.',
    description: 'Planned after Lombok.',
    status: 'planned',
    image: '/DJI_aerial_hero.webp',
    imageAlt: 'Aerial view of a coastline at golden hour',
  },
]

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug)

/** Guides with a sales page: on sale, with a Stripe link. */
export const guidesOnSale = () => guides.filter((g) => g.status === 'available' && g.buyUrl)
