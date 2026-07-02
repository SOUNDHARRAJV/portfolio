import { sendContactEmail, validateContactSubmission } from '../../server/contact.js';

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { isValid, errors, value } = validateContactSubmission(body);

    if (!isValid) {
      return jsonResponse(400, { error: 'Validation failed', fields: errors });
    }

    await sendContactEmail({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL,
      ...value,
    });

    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error('Netlify contact function failed:', error);
    return jsonResponse(500, {
      error: 'Unable to send message',
      debug: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};