import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(body = {}) {
  const errors = {};

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!subject) {
    errors.subject = 'Subject is required';
  }

  if (!message) {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value: { name, email, subject, message },
  };
}

export async function sendContactEmail({
  apiKey,
  from,
  to,
  name,
  email,
  subject,
  message,
}) {
  if (!apiKey) {
    throw new Error('Missing Resend API key');
  }

  if (!to) {
    throw new Error('Missing contact recipient email (CONTACT_TO_EMAIL)');
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (result.error) {
    console.error('Resend email send failed:', result.error);
    throw new Error(result.error.message || 'Resend request failed');
  }

  return result.data;
}