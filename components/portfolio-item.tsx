/**
 * Memoized Portfolio Item Component
 *
 * Prevents unnecessary re-renders when sibling items change.
 * Only re-renders if the item data itself changes.
 */

import * as React from 'react';
import Image from 'next/image';
import { H3, P } from '@/components/typography';
import type { PortfolioItem as PortfolioItemType } from '@/data/portfolio';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

const PortfolioItemComponent: React.FC<PortfolioItemProps> = ({ item }) => {
  return (
    <div
      className="group relative flex-shrink-0 w-[400px] h-[300px] overflow-hidden rounded-lg bg-gray-900 cursor-pointer hover:scale-105 transition-transform duration-500"
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
            <span className="material-symbols-outlined text-base">
              location_on
            </span>
            <span>{item.location}</span>
            <span className="mx-2">•</span>
            <span>{item.propertyType}</span>
          </div>
          <H3 className="mb-2 text-white">{item.title}</H3>
          <P className="text-sm text-gray-200 font-light">
            {item.description}
          </P>
        </div>
      </div>
    </div>
  );
};

// Memoize with custom comparison for precise re-render control
export const PortfolioItem = React.memo(
  PortfolioItemComponent,
  (prevProps, nextProps) => {
    // Only re-render if item core properties change
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.image === nextProps.item.image &&
      prevProps.item.title === nextProps.item.title &&
      prevProps.item.description === nextProps.item.description
    );
  }
);
