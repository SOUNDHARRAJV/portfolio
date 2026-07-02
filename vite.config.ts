import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sendContactEmail, validateContactSubmission } from './server/contact.js';

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
    const { isValid, errors, value } = validateContactSubmission(body);

    if (!isValid) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Validation failed', fields: errors }));
      return;
    }

    await sendContactEmail({
      apiKey: env.RESEND_API_KEY,
      from: env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: env.CONTACT_TO_EMAIL,
      ...value,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error('Local contact endpoint failed:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Unable to send message',
      debug: error instanceof Error ? error.message : 'Unknown error',
    }));
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    configureServer(server) {
    server.middlewares.use('/api/contact', (req, res, next) => {
      if (!req.url || req.method !== 'POST') {
        next();
        return;
      }

      void contactRequestHandler(req, res, {
        RESEND_API_KEY: env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: env.RESEND_FROM_EMAIL,
        CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
      });
    });
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
