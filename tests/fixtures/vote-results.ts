/**
 * Canned /api/votes/results payload for browser tests.
 *
 * The voting E2E suite mocks the vote API inside the browser (Puppeteer request
 * interception) so it never writes real votes to production Firestore and does
 * not need Firebase credentials. Keep the shape in sync with types/votes.ts.
 */

const LOCATIONS = [
  ['maldives', 'Maldives'],
  ['misool', 'Misool'],
  ['java', 'Java'],
  ['lombok-sumba', 'Lombok & Sumba'],
  ['california', 'California'],
  ['flores', 'Flores'],
  ['kalimantan', 'Kalimantan'],
  ['namibia', 'Namibia'],
  ['mauritius', 'Mauritius'],
  ['banggai', 'Banggai'],
  ['togean', 'Togean'],
] as const;

const COUNTS = [8, 7, 6, 5, 5, 4, 3, 3, 2, 2, 1];

export function buildResults(extraVoteFor?: string) {
  const counts = LOCATIONS.map(([slug], i) => COUNTS[i] + (slug === extraVoteFor ? 1 : 0));
  const totalVotes = counts.reduce((a, b) => a + b, 0);
  const locations = LOCATIONS.map(([slug, name], i) => ({
    slug,
    name,
    count: counts[i],
    percentage: (counts[i] / totalVotes) * 100,
  })).sort((a, b) => b.percentage - a.percentage);
  return { locations, totalVotes, lastUpdated: '2026-09-12T00:00:00.000Z' };
}

export const LOCATION_COUNT = LOCATIONS.length;
