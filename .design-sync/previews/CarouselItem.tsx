import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'thu-tides-website';

const slides = [
  { src: 'https://www.thutides.com/_next/image?url=%2FDJI_aerial_hero.webp&w=1200&q=75', label: 'Togean atoll, aerial' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fuw_turtle.webp&w=1200&q=75', label: 'Green turtle, Apo Island' },
  { src: 'https://www.thutides.com/_next/image?url=%2Fvilla_sunrise_reconnect.webp&w=1200&q=75', label: 'Villa Athena at sunrise' },
];


export const FullWidthSlide = () => (
  <div className="mx-12 max-w-xl">
    <Carousel>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src}>
            <figure>
              <img src={s.src} alt={s.label} className="aspect-video w-full rounded-lg object-cover" />
              <figcaption className="mt-2 text-sm text-muted-foreground">{s.label}</figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const HalfWidthSlides = () => (
  <div className="mx-12 max-w-xl">
    <Carousel>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.src} className="md:basis-1/2">
            <img src={s.src} alt={s.label} className="aspect-square w-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);
