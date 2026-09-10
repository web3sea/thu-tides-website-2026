import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'thu-tides-website';

const slides = [
  { src: 'https://www.thutides.com/_next/image?url=%2FDJI_aerial_hero.webp&w=1200&q=75', label: 'Togean atoll, aerial' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fuw_turtle.webp&w=1200&q=75', label: 'Green turtle, Apo Island' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fvilla_sunrise_reconnect.webp&w=1200&q=75', label: 'Villa Athena at sunrise' },
];


export const OutsideDefault = () => (
  <div className="mx-12 max-w-lg">
    <Carousel opts={{ loop: true }}>
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

export const InsideBrand = () => (
  <div className="max-w-lg">
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src}>
            <img src={s.src} alt={s.label} className="aspect-video w-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="brand" size="icon" className="left-4" />
      <CarouselNext variant="brand" size="icon" className="right-4" />
    </Carousel>
  </div>
);
