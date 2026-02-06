# Thu Tides — Data Model

This document defines the core entities and relationships for the Thu Tides landing page.

---

## Entities

### Portfolio Item

Represents a single project/collaboration showcased in the portfolio gallery.

**Fields:**
- `id` — Unique identifier
- `title` — Project or location name
- `description` — Brief description of the project
- `propertyType` — Type of property (e.g., "Boutique Hotel", "Dive Resort", "Homestay", "Liveaboard")
- `location` — Geographic location
- `images` — Array of image URLs
- `videos` — Array of video URLs (optional)
- `featured` — Boolean indicating if this should be highlighted
- `tags` — Array of tags for filtering (e.g., "coastal", "diving", "sunset")
- `instagramUrl` — Link to Instagram post(s) featuring this work (optional)
- `dateCompleted` — Date of project completion

**Relationships:**
- None (standalone entity)

---

### Service

Represents a service offering (e.g., photography, video, Instagram promotion).

**Fields:**
- `id` — Unique identifier
- `title` — Service name (e.g., "Photography", "Video Content", "Instagram Promotion")
- `description` — Detailed description of the service
- `icon` — Icon identifier or URL
- `benefits` — Array of key benefits
- `featured` — Boolean indicating if this is a primary service

**Relationships:**
- None (standalone entity)

---

### Testimonial

Represents a testimonial from a hospitality partner.

**Fields:**
- `id` — Unique identifier
- `quote` — The testimonial text
- `author` — Name of the person providing the testimonial
- `title` — Author's role/title
- `propertyName` — Name of the hotel/resort/property
- `propertyType` — Type of property
- `location` — Property location
- `image` — Author or property image URL (optional)
- `featured` — Boolean indicating if this should be prominently displayed

**Relationships:**
- May reference a `Portfolio Item` (optional)

---

### Contact Inquiry

Represents a collaboration inquiry submitted through the contact form.

**Fields:**
- `id` — Unique identifier (generated on submission)
- `name` — Contact's full name
- `email` — Contact's email address
- `propertyName` — Name of their property/business
- `propertyType` — Type of property (dropdown: Boutique Hotel, Homestay, Dive Resort, Liveaboard, Other)
- `location` — Property location
- `partnershipType` — Preferred partnership model (Barter, Paid, Either, Not Sure)
- `message` — Additional details/message
- `instagramHandle` — Their Instagram handle (optional)
- `website` — Their website URL (optional)
- `timestamp` — Submission date/time
- `source` — Where they found Thu Tides (optional)

**Integrations:**
- **Brevo**: All contact inquiries are sent to Brevo for email marketing automation
- **HubSpot**: All contact inquiries are sent to HubSpot CRM for lead tracking and relationship management

**Relationships:**
- None (standalone entity, integrates with external systems)

---

## Data Flow

### Portfolio Items
- Static content managed in the codebase
- Displayed in the Portfolio section
- Can be filtered by property type or tags

### Services
- Static content managed in the codebase
- Displayed in the Services section

### Testimonials
- Static content managed in the codebase
- Displayed throughout the site (About section, potentially in other sections)
- Can rotate or be featured

### Contact Inquiries
- User submits form on Collaboration section
- Data is validated client-side
- On successful submission:
  1. Data sent to Brevo via API for email automation
  2. Data sent to HubSpot via API for CRM tracking
  3. Confirmation message displayed to user
  4. Optional: Send confirmation email to inquirer

---

## Notes

- **Static vs. Dynamic**: Portfolio Items, Services, and Testimonials are static content that lives in the codebase. Contact Inquiries are dynamic and integrate with third-party services.
- **No Database Required**: Since this is a static website, all content (except Contact Inquiries) is managed through code/configuration files.
- **API Integration**: Contact form requires API keys and endpoints for Brevo and HubSpot.
- **Privacy**: Contact inquiry data should be handled according to privacy policies and GDPR compliance.
