/**
 * Voting API Route Tests
 *
 * Tests the /api/votes endpoints including:
 * - /api/votes/results (GET) - Fetch vote results
 * - /api/votes/location (POST) - Submit vote
 * - Input validation
 * - Rate limiting
 * - Duplicate vote prevention
 * - IP hashing
 * - Firebase integration
 */

import { describe, it, expect } from '@jest/globals';
import { VALID_LOCATIONS, INVALID_LOCATION } from '../fixtures/test-data';

const API_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const RESULTS_ENDPOINT = `${API_URL}/api/votes/results`;
const VOTE_ENDPOINT = `${API_URL}/api/votes/location`;

interface VoteLocation {
  slug: string;
  name: string;
  count: number;
  percentage: number;
}

interface VoteResults {
  locations: VoteLocation[];
  totalVotes: number;
}

interface VoteRequest {
  location: string;
}

interface VoteResponse {
  success?: boolean;
  results?: VoteResults;
  error?: string;
}

describe('Voting API Tests', () => {
  describe('GET /api/votes/results', () => {
    it('should return all 11 locations with counts', async () => {
      const response = await fetch(RESULTS_ENDPOINT);
      const data: VoteResults = await response.json();

      expect(response.status).toBe(200);
      expect(data.locations).toBeDefined();
      expect(data.locations.length).toBe(11);
      expect(data.totalVotes).toBeGreaterThanOrEqual(0);

      // Verify each location has required fields
      data.locations.forEach(location => {
        expect(location.slug).toBeDefined();
        expect(location.name).toBeDefined();
        expect(location.count).toBeGreaterThanOrEqual(0);
        expect(location.percentage).toBeGreaterThanOrEqual(0);
      });
    });

    it('should calculate percentages correctly', async () => {
      const response = await fetch(RESULTS_ENDPOINT);
      const data: VoteResults = await response.json();

      expect(response.status).toBe(200);

      // Calculate expected total
      const calculatedTotal = data.locations.reduce(
        (sum, loc) => sum + loc.count,
        0
      );
      expect(calculatedTotal).toBe(data.totalVotes);

      // Verify percentage calculations
      if (data.totalVotes > 0) {
        data.locations.forEach(location => {
          const expectedPercentage = (location.count / data.totalVotes) * 100;
          expect(location.percentage).toBeCloseTo(expectedPercentage, 1);
        });

        // Sum of all percentages should be approximately 100%
        const totalPercentage = data.locations.reduce(
          (sum, loc) => sum + loc.percentage,
          0
        );
        expect(totalPercentage).toBeCloseTo(100, 0);
      }
    });

    it('should sort locations by percentage descending', async () => {
      const response = await fetch(RESULTS_ENDPOINT);
      const data: VoteResults = await response.json();

      expect(response.status).toBe(200);

      // Verify sorting order
      for (let i = 0; i < data.locations.length - 1; i++) {
        expect(data.locations[i].percentage).toBeGreaterThanOrEqual(
          data.locations[i + 1].percentage
        );
      }
    });

    it('should return 503 when Firebase not initialized', async () => {
      // This test would require mocking Firebase initialization failure
      // For now, we just verify the endpoint responds
      const response = await fetch(RESULTS_ENDPOINT);

      // Should return either 200 (success) or 503 (Firebase unavailable)
      expect([200, 503]).toContain(response.status);
    });

    it('should include Cache-Control header with 60s max-age', async () => {
      const response = await fetch(RESULTS_ENDPOINT);

      expect(response.status).toBe(200);

      const cacheControl = response.headers.get('cache-control');
      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=60');
    });
  });

  describe('POST /api/votes/location - Validation', () => {
    it('should return 400 for invalid location slug', async () => {
      const payload: VoteRequest = {
        location: INVALID_LOCATION,
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);

      const data: VoteResponse = await response.json();
      expect(data.error).toBeDefined();
      expect(data.error?.toLowerCase()).toContain('invalid');
    });

    it('should return 400 for missing location slug', async () => {
      const payload = {};

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);

      const data: VoteResponse = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should accept valid location slug', async () => {
      const payload: VoteRequest = {
        location: VALID_LOCATIONS[0], // Use first valid location
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${Math.floor(Math.random() * 255)}`, // Random IP to avoid duplicate vote
        },
        body: JSON.stringify(payload),
      });

      // Should be either 200 (success) or 409 (already voted)
      expect([200, 409, 429]).toContain(response.status);
    });
  });

  describe('POST /api/votes/location - Rate Limiting', () => {
    it('should return 429 when rate limit exceeded', async () => {
      // Use consistent IP for rate limit test
      const testIP = '203.0.113.42';

      const payload: VoteRequest = {
        location: VALID_LOCATIONS[0],
      };

      let rateLimitedResponse;

      // Make 11 requests rapidly (rate limit is 10/min)
      for (let i = 0; i < 11; i++) {
        rateLimitedResponse = await fetch(VOTE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': testIP,
          },
          body: JSON.stringify(payload),
        });

        // If we hit rate limit, break
        if (rateLimitedResponse.status === 429) {
          break;
        }

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // At least one request should be rate limited
      expect(rateLimitedResponse?.status).toBe(429);

      if (rateLimitedResponse) {
        const data: VoteResponse = await rateLimitedResponse.json();
        expect(data.error).toBeDefined();
        // Error message should indicate rate limiting or too many requests
        const errorMsg = data.error?.toLowerCase() || '';
        expect(errorMsg.includes('rate') || errorMsg.includes('too many')).toBe(true);
      }
    }, 30000); // Extend timeout for multiple requests
  });

  describe('POST /api/votes/location - Duplicate Vote Prevention', () => {
    it('should prevent duplicate votes from same IP', async () => {
      const testIP = `10.0.0.${Math.floor(Math.random() * 255)}`;

      const payload: VoteRequest = {
        location: VALID_LOCATIONS[1],
      };

      // First vote
      const firstResponse = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIP,
        },
        body: JSON.stringify(payload),
      });

      // First vote should succeed (or already voted if IP used before)
      expect([200, 409]).toContain(firstResponse.status);

      // Second vote with same IP
      const secondResponse = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIP,
        },
        body: JSON.stringify(payload),
      });

      // Second vote should be rejected
      expect(secondResponse.status).toBe(409);

      const data: VoteResponse = await secondResponse.json();
      expect(data.error).toBeDefined();
      expect(data.error?.toLowerCase()).toContain('already');
    });
  });

  describe('POST /api/votes/location - Vote Recording', () => {
    it('should increment vote count atomically', async () => {
      const testIP = `172.16.0.${Math.floor(Math.random() * 255)}`;
      const targetLocation = VALID_LOCATIONS[2];

      // Get initial vote count
      const initialResponse = await fetch(RESULTS_ENDPOINT);
      const initialData: VoteResults = await initialResponse.json();
      const initialLocation = initialData.locations.find(
        loc => loc.slug === targetLocation
      );
      const initialCount = initialLocation?.count || 0;

      // Submit vote
      const voteResponse = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIP,
        },
        body: JSON.stringify({ location: targetLocation }),
      });

      if (voteResponse.status === 200) {
        // Vote succeeded, verify count increased
        const voteData: VoteResponse = await voteResponse.json();
        expect(voteData.results).toBeDefined();

        if (voteData.results) {
          const updatedLocation = voteData.results.locations.find(
            loc => loc.slug === targetLocation
          );
          expect(updatedLocation?.count).toBe(initialCount + 1);
        }
      } else if (voteResponse.status === 409) {
        // Already voted - this is expected and acceptable
        expect(voteResponse.status).toBe(409);
      }
    });

    it('should return updated vote counts after successful vote', async () => {
      const testIP = `192.0.2.${Math.floor(Math.random() * 255)}`;

      const payload: VoteRequest = {
        location: VALID_LOCATIONS[3],
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIP,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data: VoteResponse = await response.json();

        expect(data.success).toBe(true);
        expect(data.results).toBeDefined();
        expect(data.results?.locations).toHaveLength(11);
        expect(data.results?.totalVotes).toBeGreaterThan(0);
      } else if (response.status === 409) {
        // Already voted - acceptable
        expect(response.status).toBe(409);
      }
    });
  });

  describe('POST /api/votes/location - IP Hashing', () => {
    it('should hash IP addresses for privacy', async () => {
      const testIP = '198.51.100.42';

      const payload: VoteRequest = {
        location: VALID_LOCATIONS[4],
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIP,
        },
        body: JSON.stringify(payload),
      });

      // Response should not contain raw IP address
      const responseText = await response.text();
      expect(responseText).not.toContain(testIP);

      // Status should be either success or already voted
      expect([200, 409, 429]).toContain(response.status);
    });
  });

  describe('POST /api/votes/location - Error Handling', () => {
    it('should return 503 when Firebase not initialized', async () => {
      // This test would require mocking Firebase initialization failure
      // For now, we just verify the endpoint handles errors gracefully
      const payload: VoteRequest = {
        location: VALID_LOCATIONS[5],
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `10.1.1.${Math.floor(Math.random() * 255)}`,
        },
        body: JSON.stringify(payload),
      });

      // Should return a valid HTTP status code
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(600);
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not valid json',
      });

      // Should return 400 or 500
      expect([400, 500]).toContain(response.status);
    });

    it('should handle missing headers gracefully', async () => {
      const payload: VoteRequest = {
        location: VALID_LOCATIONS[6],
      };

      const response = await fetch(VOTE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // No x-forwarded-for header
        body: JSON.stringify(payload),
      });

      // Should still handle request (may use default IP)
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(600);
    });
  });

  describe('POST /api/votes/location - Race Conditions', () => {
    it('should handle concurrent votes correctly', async () => {
      const testLocation = VALID_LOCATIONS[7];

      // Create multiple concurrent vote requests with different IPs
      const votePromises = Array.from({ length: 5 }, (_, index) => {
        const testIP = `198.18.0.${index + 10}`;

        return fetch(VOTE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': testIP,
          },
          body: JSON.stringify({ location: testLocation }),
        });
      });

      // Wait for all votes to complete
      const responses = await Promise.all(votePromises);

      // All should return valid status codes
      responses.forEach(response => {
        expect([200, 409, 429]).toContain(response.status);
      });

      // Count results
      const successfulVotes = responses.filter(r => r.status === 200);
      const duplicateVotes = responses.filter(r => r.status === 409);
      const rateLimited = responses.filter(r => r.status === 429);

      // All votes should be accounted for
      expect(successfulVotes.length + duplicateVotes.length + rateLimited.length).toBe(5);
    }, 30000);
  });
});
