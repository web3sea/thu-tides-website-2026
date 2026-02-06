# Testimonials - Update with Your Real Data

## Location
`components/testimonials-section.tsx` - Lines 11-38

## How to Update

Replace the placeholder testimonials with your actual client testimonials. Each testimonial needs:

```typescript
{
  quote: "The full testimonial quote from your client",
  author: "Client Name",
  role: "Their job title",
  property: "Property/Business Name",
  location: "City, Country",
}
```

## Example Structure

```typescript
const testimonials: Testimonial[] = [
  {
    quote: "Your client's actual testimonial goes here. Keep it authentic and focused on specific results or benefits.",
    author: "John Doe",
    role: "General Manager",
    property: "Paradise Dive Resort",
    location: "Komodo, Indonesia",
  },
  // Add 2-5 more testimonials
]
```

## Tips for Great Testimonials

1. **Be Specific**: Include results (e.g., "increased bookings by 40%")
2. **Mix Locations**: Show both Indonesia and Philippines properties
3. **Vary Property Types**: Hotels, dive resorts, homestays, liveaboards
4. **Highlight Different Services**: Some focus on photography, others on video or Instagram promotion
5. **Keep It Real**: Authentic testimonials perform better than generic praise

## Trust Badge Update

Line 74: Update the number "20+" with your actual number of partner properties.

```typescript
<P className="text-sm font-semibold text-gray-900">
  Trusted by 20+ Properties  {/* Update this number */}
</P>
```

## Current Status

✅ Component created and added to homepage
✅ Styled to match your design system
✅ Responsive for mobile/desktop
✅ SEO-friendly markup

⏳ **TODO**: Replace placeholder testimonials with your real client quotes
