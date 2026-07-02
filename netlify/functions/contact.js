import { sendContactEmail } from '../../server/contact.js';

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
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return jsonResponse(400, { error: 'Missing required fields' });
    }

    await sendContactEmail({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL || 'soundharrajvellingiri@gmail.com',
      name,
      email,
      subject,
      message,
    });

    return jsonResponse(200, { ok: true });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : 'Unable to send message',
    });
  }
};