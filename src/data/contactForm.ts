// The public endpoint receives inquiries only after server-side Turnstile validation.
// Set PUBLIC_CONTACT_ENDPOINT to the deployed Cloudflare Worker URL for each build.
export const contactForm = {
  endpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
  siteKey: import.meta.env.DEV ? '1x00000000000000000000AA' : '0x4AAAAAAFAig1ytvTFyI6TL',
} as const;
