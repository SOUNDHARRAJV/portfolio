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

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  const responseData = await emailResponse.json().catch(() => ({}));

  if (!emailResponse.ok) {
    const errorMessage = responseData?.message || 'Resend request failed';
    throw new Error(errorMessage);
  }

  return responseData;
}