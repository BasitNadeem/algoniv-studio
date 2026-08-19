/**
 * Single source of truth for the details that appear in more than one place.
 * Changing an address here changes it everywhere it is rendered.
 */

export const SITE = {
  name: "Algoniv",
  domain: "algoniv.com",
  url: "https://algoniv.com",
  email: "info@algoniv.com",
  tagline: "AI-first software production lab",
  location: "Lahore, Pakistan",
  /** Public product, listed as fact rather than pitched. */
  product: { name: "Innflo", url: "https://innflo.co" },
} as const;

export const MAILTO = `mailto:${SITE.email}`;
