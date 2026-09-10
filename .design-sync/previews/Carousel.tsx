import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Card, CardContent } from 'thu-tides-website';

const slides = [
  { src: 'https://www.thutides.com/_next/image?url=%2FDJ_aerial_reconnect.webp&w=1200&q=75', label: 'Reconnect Resort, Buka Buka' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fuw_malapascua.webp&w=1200&q=75', label: 'Evolution Divers, Malapascua' },
  { src: 'https://www.thutides.com/_next/image?url=%2FDJI_arial_waterfall_casaroro.webp&w=1200&q=75', label: 'Casaroro Falls, Negros' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fvilla_coco_reconnect.webp&w=1200&q=75', label: 'Villa Coco' },
];

export const Single = () => (
  <div className="mx-12 max-w-lg">
    <Carousel>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src}>
            <img src={s.src} alt={s.label} className="aspect-video w-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const ThreeUp = () => (
  <div className="mx-12 max-w-3xl">
    <Carousel opts={{ align: 'start', loop: true }}>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src} className="md:basis-1/2 lg:basis-1/3">
            <Card size="sm">
              <img src={s.src} alt={s.label} className="aspect-[4/3] w-full object-cover" />
              <CardContent>
                <p className="text-sm font-medium">{s.label}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const Vertical = () => (
  <div className="my-16 max-w-sm">
    <Carousel orientation="vertical" className="w-full">
      <CarouselContent className="h-64">
        {slides.slice(0, 3).map((s) => (
          <CarouselItem key={s.src} className="md:basis-1/2">
            <img src={s.src} alt={s.label} className="h-32 w-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);
