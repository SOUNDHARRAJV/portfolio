import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sendContactEmail } from './server/contact.js';

const contactRequestHandler = async (req, res, env) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  try {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing required fields' }));
      return;
    }

    await sendContactEmail({
      apiKey: env.RESEND_API_KEY,
      from: env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: env.CONTACT_TO_EMAIL || 'soundharrajvellingiri@gmail.com',
      name,
      email,
      subject,
      message,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to send message' }));
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  configureServer(server) {
    server.middlewares.use('/api/contact', (req, res, next) => {
      if (!req.url || req.method !== 'POST') {
        next();
        return;
      }

      void contactRequestHandler(req, res, {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
        CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      });
    });
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
