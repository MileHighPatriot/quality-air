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
  cities: ["Aurora", "Centennial", "Parker", "Denver (east)", "Englewood"],
  license: "Colorado mechanical license #000000 (sample)",
  reviewsLabel: "Sample reviews. Quality Air is a concept company.",
  formThanks:
    "Thanks! This is a concept site, so nothing was sent. On a real Quality Air site, this goes straight to the office.",
};

export type Site = typeof site;
