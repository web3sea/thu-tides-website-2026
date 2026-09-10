import * as React from 'react';
import { PortfolioItem } from 'thu-tides-website';

const buka = {
  id: '1',
  title: 'Reconnect Buka Buka',
  description: 'Intimate island resort photography',
  propertyType: 'Dive Resort',
  location: 'Togean, Sulawesi',
  image: '/reconnect_buka_buka.webp',
  featured: true,
};

const kalanggaman = {
  id: '5',
  title: 'Kalanggaman Beach',
  description: 'Aerial view of a pristine sandbar',
  propertyType: 'Boutique Hotel',
  location: 'Philippines',
  image: '/dji_aerial_beach_kalanggaman.webp',
  featured: true,
};

const casaroro = {
  id: '7',
  title: 'Casaroro Waterfall',
  description: 'Aerial view of a mountain waterfall',
  propertyType: 'Homestay',
  location: 'Negros, Philippines',
  image: '/DJI_arial_waterfall_casaroro.webp',
  featured: false,
};

export const Default = () => <PortfolioItem item={buka} />;

export const Row = () => (
  <div className="flex gap-6 overflow-hidden py-4">
    <PortfolioItem item={buka} />
    <PortfolioItem item={kalanggaman} />
    <PortfolioItem item={casaroro} />
  </div>
);
