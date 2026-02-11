/**
 * Test data fixtures for contact form and voting system
 */

import { ContactFormData } from '../helpers/form-helpers';

// Valid contact form submissions
export const VALID_CONTACT_FORM: ContactFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  whatsapp: '+1234567890',
  inquiry: 'I would like to inquire about your photography services for our boutique hotel in Bali.',
};

export const VALID_CONTACT_EMAIL_ONLY: ContactFormData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  whatsapp: '',
  inquiry: 'Interested in collaborating on content creation for our diving resort.',
};

export const VALID_CONTACT_WHATSAPP_ONLY: ContactFormData = {
  name: 'Bob Johnson',
  email: '',
  whatsapp: '+628123456789',
  inquiry: 'Looking for aerial photography for our beach resort in the Philippines.',
};

// Invalid contact form submissions
export const INVALID_EMAIL_FORMAT: Partial<ContactFormData> = {
  name: 'Invalid Email User',
  email: 'not-an-email',
  whatsapp: '',
  inquiry: 'Test inquiry',
};

export const MISSING_NAME: Partial<ContactFormData> = {
  name: '',
  email: 'test@example.com',
  whatsapp: '',
  inquiry: 'Test inquiry',
};

export const MISSING_INQUIRY: Partial<ContactFormData> = {
  name: 'Test User',
  email: 'test@example.com',
  whatsapp: '',
  inquiry: '',
};

export const MISSING_CONTACT_METHOD: Partial<ContactFormData> = {
  name: 'Test User',
  email: '',
  whatsapp: '',
  inquiry: 'Test inquiry with no contact method',
};

export const WHITESPACE_ONLY_FIELDS: Partial<ContactFormData> = {
  name: '   ',
  email: '   ',
  whatsapp: '   ',
  inquiry: '   ',
};

export const EXCEEDS_NAME_LENGTH: Partial<ContactFormData> = {
  name: 'A'.repeat(201), // Max is 200
  email: 'test@example.com',
  whatsapp: '',
  inquiry: 'Test inquiry',
};

export const EXCEEDS_INQUIRY_LENGTH: Partial<ContactFormData> = {
  name: 'Test User',
  email: 'test@example.com',
  whatsapp: '',
  inquiry: 'A'.repeat(5001), // Max is 5000
};

// Location voting test data
export const VALID_LOCATIONS = [
  'maldives',
  'misool',
  'java',
  'lombok-sumba',
  'california',
  'flores',
  'kalimantan',
  'namibia',
  'mauritius',
  'banggai',
  'togean',
] as const;

export const INVALID_LOCATION = 'invalid-location-slug';

export type LocationSlug = typeof VALID_LOCATIONS[number];

// Mock API responses
export const MOCK_VOTE_RESULTS = {
  locations: VALID_LOCATIONS.map((slug, index) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' & '),
    count: Math.floor(Math.random() * 100),
    percentage: Math.random() * 100,
  })),
  totalVotes: 100,
};

export const MOCK_SLACK_SUCCESS = {
  ok: true,
  status: 200,
  statusText: 'OK',
};

export const MOCK_BREVO_SUCCESS = {
  id: 123,
  email: 'test@example.com',
};

// Environment variable mocks
export const MOCK_ENV_VARS = {
  SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/TEST/WEBHOOK/URL',
  BREVO_API_KEY: 'test-brevo-api-key',
  BREVO_LIST_ID: '1',
  BREVO_WELCOME_TEMPLATE_ID: '1',
  NEXT_PUBLIC_FIREBASE_API_KEY: 'test-firebase-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'test.appspot.com',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '123456789',
  NEXT_PUBLIC_FIREBASE_APP_ID: '1:123456789:web:abcdef',
  FIREBASE_SERVICE_ACCOUNT_KEY: 'test-service-account-key',
};
