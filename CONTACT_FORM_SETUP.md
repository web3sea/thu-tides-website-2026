# Contact Form Integration Setup

This guide will help you set up the contact form to send inquiries to Slack and integrate with Brevo for email marketing.

## Prerequisites

1. A Slack workspace with admin access
2. A Brevo (formerly Sendinblue) account
3. Access to your `.env.local` file

---

## Step 1: Set up Slack Webhook

### Create an Incoming Webhook

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Click **"Create New App"** → **"From scratch"**
3. Give it a name (e.g., "Thu Tides Contact Form")
4. Select your workspace
5. Click **"Incoming Webhooks"** in the sidebar
6. Toggle **"Activate Incoming Webhooks"** to ON
7. Click **"Add New Webhook to Workspace"**
8. Select the channel where you want to receive notifications (e.g., #inquiries)
9. Click **"Allow"**
10. Copy the **Webhook URL** (looks like `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX`)

### Add to Environment Variables

Open `.env.local` and add:
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## Step 2: Set up Brevo Integration

### Get Your API Key

1. Log in to [Brevo](https://app.brevo.com)
2. Go to **Settings** → **SMTP & API** → **API Keys**
3. Click **"Generate a new API key"**
4. Give it a name (e.g., "Thu Tides Website")
5. Copy the API key

### Create a Contact List

1. In Brevo, go to **Contacts** → **Lists**
2. Click **"Create a list"**
3. Name it (e.g., "Website Inquiries")
4. After creation, note the **List ID** (visible in the URL or list settings)

### Create a Welcome Email Template

1. Go to **Campaigns** → **Templates** → **Create a new template**
2. Choose **"Transactional template"**
3. Design your welcome email
4. Use the variable `{{ params.NAME }}` to personalize with the contact's name
5. Save the template and note the **Template ID** (visible in the URL or settings)

### Add to Environment Variables

Open `.env.local` and add:
```
BREVO_API_KEY=your-api-key-here
BREVO_LIST_ID=123
BREVO_WELCOME_TEMPLATE_ID=456
```

---

## Step 3: Test the Integration

1. Restart your Next.js development server:
   ```bash
   pnpm dev
   ```

2. Navigate to your contact form (usually at `/#contact`)

3. Fill out and submit the form

4. Verify:
   - ✅ You receive a notification in your Slack channel
   - ✅ The contact appears in your Brevo list
   - ✅ The user receives a welcome email

---

## Environment Variables Summary

Your `.env.local` should have:

```env
# Slack Integration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Brevo Integration
BREVO_API_KEY=your-api-key-here
BREVO_LIST_ID=123
BREVO_WELCOME_TEMPLATE_ID=456
```

---

## Troubleshooting

### Slack notifications not appearing
- Verify the webhook URL is correct
- Check that the webhook is still active in Slack API settings
- Check browser console and server logs for errors

### Brevo contact not added
- Verify API key has the correct permissions
- Check that the list ID is correct (should be a number)
- Look for 400 errors (might indicate duplicate contact, which is OK)

### Welcome email not sent
- Verify the template ID is correct
- Ensure the template is published and active
- Check that the sender email is verified in Brevo

### Server errors
- Check the terminal/console for detailed error messages
- Verify all environment variables are set correctly
- Ensure you restarted the dev server after adding env vars

---

## Production Deployment

When deploying to Vercel (or other platforms):

1. Add environment variables in your platform's dashboard
2. For Vercel: **Settings** → **Environment Variables**
3. Add all three variables (SLACK_WEBHOOK_URL, BREVO_API_KEY, BREVO_LIST_ID, BREVO_WELCOME_TEMPLATE_ID)
4. Redeploy your application

---

## API Endpoint Details

**Endpoint:** `/api/contact`
**Method:** `POST`
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "+62 123 456 7890",
  "inquiry": "I'm interested in your photography services..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Error Response:**
```json
{
  "error": "Failed to process contact form"
}
```
