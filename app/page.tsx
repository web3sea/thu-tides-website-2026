import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { CarouselGallery } from '@/components/carousel-gallery'

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero
        backgroundImage="/DJI_aerial_hero.JPG"
        backgroundImageAlt="Aerial view of coastal tides"
        title="My Island Life."
        subtitle="Expeditions in shades of blue."
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Let's Connect"
        ctaHref="#contact"
        logos={[]}
      />
      <CarouselGallery
        title="Gallery"
        description="Explore our collection of coastal adventures"
        itemsPerView={3}
        images={[
          {
            src: '/uw_pulau_papan.jpg',
            alt: 'Underwater view of Pulau Papan',
            title: 'Pulau Papan',
          },
          {
            src: '/uw_mariona.jpg',
            alt: 'Underwater exploration at Mariona',
            title: 'Mariona Depths',
          },
          {
            src: '/reconnect_buka_buka.jpg',
            alt: 'Reconnect at Buka Buka',
            title: 'Buka Buka',
          },
          {
            src: '/dji_aerial_top_reef_atoll.JPG',
            alt: 'Aerial view of top reef atoll',
            title: 'Top Reef Atoll',
          },
          {
            src: '/uw_top_reef_atoll.jpg',
            alt: 'Underwater view of top reef atoll',
            title: 'Atoll Underwater',
          },
          {
            src: '/sunset6_reconnect_buka_buka.jpg',
            alt: 'Sunset at Buka Buka',
            title: 'Buka Buka Sunset',
          },
        ]}
      />
    </GigaLayout>
  )
}
