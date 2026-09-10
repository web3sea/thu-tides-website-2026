import * as React from 'react';
import { Caption } from 'thu-tides-website';

export const Default = () => <Caption>Thresher shark at Monad Shoal, 6:14 am.</Caption>;

export const UnderImage = () => (
  <figure className="max-w-md">
    <img src="https://www.thutides.com/_next/image?url=%2Fuw_malapascua.webp&w=1200&q=75" alt="Thresher shark at Monad Shoal" className="aspect-[4/3] w-full rounded-lg object-cover" />
    <Caption className="mt-2">Thresher shark, Monad Shoal, Malapascua. Sony A7R V, 16-35mm, natural light.</Caption>
  </figure>
);

export const Centered = () => <Caption className="text-center">Aerial: Kalanggaman sandbar, Leyte, Philippines</Caption>;
