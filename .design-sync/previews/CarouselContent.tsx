import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'thu-tides-website';

const slides = [
  { src: 'https://www.thutides.com/_next/image?url=%2FDJI_aerial_hero.webp&w=1200&q=75', label: 'Togean atoll, aerial' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fuw_turtle.webp&w=1200&q=75', label: 'Green turtle, Apo Island' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fvilla_sunrise_reconnect.webp&w=1200&q=75', label: 'Villa Athena at sunrise' },
];


export const HorizontalTrack = () => (
  <div className="mx-12 max-w-2xl">
    <Carousel>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src} className="md:basis-1/2">
            <img src={s.src} alt={s.label} className="aspect-[4/3] w-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const TightGutter = () => (
  <div className="mx-12 max-w-2xl">
    <Carousel>
      <CarouselContent className="-ml-1">
        {slides.map((s) => (
          <CarouselItem key={s.src} className="md:basis-1/2 lg:basis-1/3 pl-1">
            <img src={s.src} alt={s.label} className="aspect-square w-full rounded-md object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);
