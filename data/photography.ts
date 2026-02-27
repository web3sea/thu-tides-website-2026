export type PhotoCategory = {
  id: string
  title: string
  description: string
  slug: string
  displayComponent: 'masonry' | 'grid' | 'carousel'
  images: Array<{
    src: string
    alt: string
    title?: string
    caption?: string
  }>
  galleryConfig?: {
    columns?: 2 | 3 | 4
    hoverEffect?: 'zoom' | 'overlay' | 'lift' | 'none'
    itemsPerView?: 1 | 2 | 3
  }
}

export const photoCategories: PhotoCategory[] = [
  {
    id: '1',
    title: 'Underwater',
    description: 'Dive into the depths and discover vibrant marine life',
    slug: 'underwater',
    displayComponent: 'masonry',
    images: [
      {
        src: '/uw_buka_buka.webp',
        alt: 'Underwater at Buka Buka',
        title: 'Buka Buka',
      },
      {
        src: '/uw_malapascua.webp',
        alt: 'Underwater at Malapascua',
        title: 'Malapascua',
      },
      {
        src: '/uw_moalboal.webp',
        alt: 'Underwater at Moalboal',
        title: 'Moalboal',
      },
      {
        src: '/uw_dauin.webp',
        alt: 'Underwater at Dauin',
        title: 'Dauin',
      },
      {
        src: '/uw_jellyfish_mariona.webp',
        alt: 'Jellyfish at Mariona',
        title: 'Mariona Jellyfish',
      },
      {
        src: '/uw_napalin.webp',
        alt: 'Underwater at Napalin',
        title: 'Napalin',
      },
      {
        src: '/uw_mariona.webp',
        alt: 'Underwater at Mariona',
        title: 'Mariona',
      },
      {
        src: '/uw_pulau_papan.webp',
        alt: 'Underwater at Pulau Papan',
        title: 'Pulau Papan',
      },
      {
        src: '/uw_top_reef_atoll.webp',
        alt: 'Underwater at Top Reef Atoll',
        title: 'Top Reef Atoll',
      },
    ],
    galleryConfig: {
      hoverEffect: 'zoom',
    },
  },
  {
    id: '2',
    title: 'Aerial',
    description: 'Stunning drone photography and aerial perspectives',
    slug: 'aerials',
    displayComponent: 'grid',
    images: [
      {
        src: '/dji_aerial_beach_kalanggaman.webp',
        alt: 'Aerial view of Kalanggaman Beach',
        title: 'Kalanggaman Beach',
      },
      {
        src: '/DJI_arial_island_balicasa.webp',
        alt: 'Aerial view of Balicasa Island',
        title: 'Balicasa Island',
      },
      {
        src: '/DJI_arial_waterfall_casaroro.webp',
        alt: 'Aerial view of Casaroro Waterfall',
        title: 'Casaroro Waterfall',
      },
      {
        src: '/DJI_arial_waterfall_pasalan.webp',
        alt: 'Aerial view of Pasalan Waterfall',
        title: 'Pasalan Waterfall',
      },
      {
        src: '/dji_aerial_top_reef_atoll.webp',
        alt: 'Aerial view of top reef atoll',
        title: 'Top Reef Atoll',
      },
      {
        src: '/DJI_aerial_hero.webp',
        alt: 'Aerial coastal view',
        title: 'Coastal Tides',
      },
    ],
    galleryConfig: {
      columns: 3,
      hoverEffect: 'zoom',
    },
  },
  {
    id: '3',
    title: 'Dive Photography',
    description: 'Exploring marine life and diving adventures',
    slug: 'dive',
    displayComponent: 'grid',
    images: [
      {
        src: '/dive_shop_reconnect.webp',
        alt: 'Dive shop at Reconnect Resort',
        title: 'Dive Shop',
      },
      {
        src: '/dive_tanks_reconnect.webp',
        alt: 'Dive tanks at Reconnect Resort',
        title: 'Dive Tanks',
      },
      {
        src: '/pier_reconnect.webp',
        alt: 'Pier at Reconnect Resort',
        title: 'Pier',
      },
      {
        src: '/uw_mariona.webp',
        alt: 'Underwater at Mariona',
        title: 'Mariona',
      },
      {
        src: '/uw_pulau_papan.webp',
        alt: 'Underwater at Pulau Papan',
        title: 'Pulau Papan',
      },
      {
        src: '/uw_top_reef_atoll.webp',
        alt: 'Underwater at Top Reef Atoll',
        title: 'Top Reef Atoll',
      },
    ],
    galleryConfig: {
      columns: 3,
      hoverEffect: 'lift',
    },
  },
  {
    id: '4',
    title: 'Properties',
    description: 'Coastal hospitality spaces and resort photography',
    slug: 'properties',
    displayComponent: 'grid',
    images: [
      {
        src: '/reconnect_buka_buka.webp',
        alt: 'Reconnect at Buka Buka',
        title: 'Buka Buka Resort',
      },
      {
        src: '/villa_bath_reconnect_buka_buka.webp',
        alt: 'Villa bathroom at Buka Buka',
        title: 'Villa Bath',
      },
      {
        src: '/villa_reconnect.webp',
        alt: 'Villa at Reconnect Resort',
        title: 'Villa',
      },
      {
        src: '/villa_sign_reconnect.webp',
        alt: 'Villa sign at Reconnect Resort',
        title: 'Villa Sign',
      },
      {
        src: '/villa_athena_reconnect.webp',
        alt: 'Villa Athena at Reconnect Resort',
        title: 'Villa Athena',
      },
      {
        src: '/villa_coco_reconnect.webp',
        alt: 'Villa Coco at Reconnect Resort',
        title: 'Villa Coco',
      },
    ],
    galleryConfig: {
      columns: 2,
      hoverEffect: 'overlay',
    },
  },
  {
    id: '5',
    title: 'Sunset & Landscape',
    description: 'Golden hour moments and breathtaking vistas',
    slug: 'landscape',
    displayComponent: 'carousel',
    images: [
      {
        src: '/villa_sunrise_reconnect.webp',
        alt: 'Sunrise at Reconnect Resort',
        title: 'Dawn',
      },
      {
        src: '/villa_sunset_reconnect_buka_buka.webp',
        alt: 'Sunset at Buka Buka',
        title: 'Buka Buka Sunset',
      },
      {
        src: '/DJI_arial_waterfall_casaroro.webp',
        alt: 'Aerial view of Casaroro Waterfall',
        title: 'Casaroro Falls',
      },
      {
        src: '/DJI_arial_waterfall_pasalan.webp',
        alt: 'Aerial view of Pasalan Waterfall',
        title: 'Pasalan Falls',
      },
      {
        src: '/DJ_aerial_reconnect.webp',
        alt: 'Aerial view of Reconnect Resort',
        title: 'Coastal Aerial',
      },
      {
        src: '/maison_coco_reconnect.webp',
        alt: 'Maison Coco at Reconnect Resort',
        title: 'Maison Coco',
      },
    ],
    galleryConfig: {
      itemsPerView: 3,
    },
  },
  {
    id: '6',
    title: 'Wildlife & Nature',
    description: 'Natural wonders and biodiversity',
    slug: 'wildlife',
    displayComponent: 'grid',
    images: [
      {
        src: '/tarsier_bohol.webp',
        alt: 'Tarsier in Bohol',
        title: 'Tarsier',
      },
      {
        src: '/uw_jellyfish_mariona.webp',
        alt: 'Jellyfish at Mariona',
        title: 'Jellyfish',
      },
      {
        src: '/uw_jacks.webp',
        alt: 'School of jacks underwater',
        title: 'Jacks',
      },
      {
        src: '/uw_seafan.webp',
        alt: 'Sea fan coral',
        title: 'Sea Fan',
      },
      {
        src: '/uw_turtle.webp',
        alt: 'Sea turtle underwater',
        title: 'Sea Turtle',
      },
      {
        src: '/uw_buka_buka.webp',
        alt: 'Marine life at Buka Buka',
        title: 'Marine Ecosystem',
      },
    ],
    galleryConfig: {
      columns: 3,
      hoverEffect: 'zoom',
    },
  },
]

// Featured images for homepage preview (one from each category)
export const featuredPhotos = [
  {
    src: '/uw_buka_buka.webp',
    alt: 'Underwater photography',
    title: 'Underwater',
    href: '/photography#underwater',
  },
  {
    src: '/dji_aerial_beach_kalanggaman.webp',
    alt: 'Aerial photography',
    title: 'Aerial',
    href: '/photography#aerials',
  },
  {
    src: '/dive_shop_reconnect.webp',
    alt: 'Dive photography',
    title: 'Dive Photography',
    href: '/photography#dive',
  },
  {
    src: '/reconnect_buka_buka.webp',
    alt: 'Property photography',
    title: 'Properties',
    href: '/photography#properties',
  },
  {
    src: '/sunset6_reconnect_buka_buka.webp',
    alt: 'Sunset & landscape photography',
    title: 'Sunset & Landscape',
    href: '/photography#landscape',
  },
  {
    src: '/tarsier_bohol.webp',
    alt: 'Wildlife & nature photography',
    title: 'Wildlife & Nature',
    href: '/photography#wildlife',
  },
]
