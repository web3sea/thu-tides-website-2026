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
        src: '/dive 8.webp',
        alt: 'Dive scene',
        title: 'Dive Adventure 1',
      },
      {
        src: '/dive 9.webp',
        alt: 'Dive scene',
        title: 'Dive Adventure 2',
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
      {
        src: '/common 19.webp',
        alt: 'Common dive scene',
        title: 'Marine Life',
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
        src: '/AC 2.webp',
        alt: 'Accommodation view',
        title: 'Coastal Room',
      },
      {
        src: '/AC 5.webp',
        alt: 'Accommodation view',
        title: 'Ocean View',
      },
      {
        src: '/Athena 10.webp',
        alt: 'Athena property',
        title: 'Athena',
      },
      {
        src: '/Coco 8.webp',
        alt: 'Coco property',
        title: 'Coco',
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
        src: '/Sunrise 2.webp',
        alt: 'Sunrise view',
        title: 'Dawn',
      },
      {
        src: '/sunset6_reconnect_buka_buka.webp',
        alt: 'Sunset at Buka Buka',
        title: 'Buka Buka Sunset',
      },
      {
        src: '/DSC00012.webp',
        alt: 'Landscape view',
        title: 'Coastal Scene',
      },
      {
        src: '/DSC00057.webp',
        alt: 'Landscape view',
        title: 'Island Vista',
      },
      {
        src: '/DSC00090.webp',
        alt: 'Landscape view',
        title: 'Beach Panorama',
      },
      {
        src: '/DSC00366.webp',
        alt: 'Landscape view',
        title: 'Tropical Paradise',
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
        src: '/LUS03355-2.webp',
        alt: 'Nature scene',
        title: 'Natural Beauty',
      },
      {
        src: '/DJI_20251117042317_0009_D.webp',
        alt: 'Aerial nature view',
        title: 'From Above',
      },
      {
        src: '/uw_jellyfish_mariona.webp',
        alt: 'Jellyfish at Mariona',
        title: 'Jellyfish',
      },
      {
        src: '/uw_buka_buka.webp',
        alt: 'Marine life at Buka Buka',
        title: 'Marine Ecosystem',
      },
      {
        src: '/common 19.webp',
        alt: 'Wildlife scene',
        title: 'Biodiversity',
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
    src: '/dive 8.webp',
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
