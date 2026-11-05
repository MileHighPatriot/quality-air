/**
 * Single edit point for business details. Quality Air is a fictional company
 * built as a portfolio concept. The phone uses the 555-01xx fiction range, the
 * license number is a placeholder, and the location stays at city level on purpose.
 */
export const site = {
  name: "Quality Air",
  descriptor: "Heating & Cooling",
  tagline: "Comfortable all year, from the first freeze to the hottest week.",
  url: "https://qualityair.5280webs.com",
  description:
    "Furnace and AC repair, replacement, and tune-ups across Aurora and the east metro. Upfront price ranges, and a real person on the phone.",
  locale: "en_US",
  phone: "(303) 555-0172",
  phoneHref: "tel:+13035550172",
  email: "hello@qualityair.example",
  homeCity: "Aurora, CO",
  /** Aurora, for the live weather card. */
  geo: { lat: 39.7294, lon: -104.8319 },
  cities: ["Aurora", "Centennial", "Parker", "Denver (east)", "Englewood"],
  /** Office hours in Denver time. 24-hour clock; `days` uses 0 = Sunday. */
  hours: { days: [1, 2, 3, 4, 5, 6], open: 7, close: 19, label: "Mon–Sat, 7am–7pm" },
  emergency: "No heat tonight? We answer 24/7.",
  /** Xcel Energy's real gas emergency line (same as the Headgate concept). */
  xcelGasEmergency: "1-800-895-2999",
  xcelGasEmergencyHref: "tel:+18008952999",
  license: "Colorado mechanical license #000000 (sample)",
  reviewsLabel: "Sample reviews. Quality Air is a concept company.",
  formThanks:
    "Thanks! This is a concept site, so nothing was sent. On a real Quality Air site, this goes straight to the office.",
};

export type Site = typeof site;

/**
 * Where this build actually lives: the github.io address for `npm run pages:github`, the custom
 * domain otherwise. Share images, the sitemap and structured data all use it.
 */
export const liveUrl = process.env.NEXT_PUBLIC_BASE_PATH
  ? `https://milehighpatriot.github.io${process.env.NEXT_PUBLIC_BASE_PATH}`
  : site.url;
