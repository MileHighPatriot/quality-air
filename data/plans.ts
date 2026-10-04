/** Maintenance plans. Every price on this concept site is a sample. */
export type Plan = {
  id: "basic" | "total";
  name: string;
  price: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic Comfort",
    price: "$15/month (sample)",
    blurb: "The two visits that keep a system running.",
    features: [
      "2 tune-ups a year (furnace in the fall, AC in the spring)",
      "A reminder text before each visit",
      "10% off repairs",
      "No overtime charge on weekdays",
    ],
  },
  {
    id: "total",
    name: "Total Comfort",
    price: "$25/month (sample)",
    blurb: "Everything in Basic, plus:",
    features: [
      "Priority scheduling (front of the line)",
      "No overtime charge any day",
      "15% off repairs",
      "Filter delivered each tune-up",
      "A free second-opinion quote on any replacement",
    ],
    featured: true,
  },
];

export const tuneUpSteps = {
  furnace: ["Burner and flame sensor cleaned", "Heat exchanger checked for cracks", "Carbon monoxide (CO) test"],
  ac: ["Coils cleaned", "Refrigerant and electrical check", "Drain line cleared"],
};

export const planReasons = [
  {
    title: "It catches small problems early.",
    body: "A worn part found at a tune-up is a small repair. The same part failing in January is a no-heat call.",
  },
  {
    title: "It keeps the warranty valid.",
    body: "Most manufacturers ask for proof of yearly maintenance. We keep the record for you.",
  },
  {
    title: "You're first in line on the coldest night.",
    body: "When every furnace in town quits at once, plan members get scheduled first.",
  },
];

export const planFaq = [
  {
    q: "Can I cancel?",
    a: "Yes, any time. We just ask for 30 days' notice.",
  },
  {
    q: "What if I have two systems?",
    a: "Each furnace and AC pair counts as one system. A second system is added to the same plan at a reduced rate, and we tune up both on the same visit.",
  },
  {
    q: "Does it cover parts?",
    a: "No. The plan gives you a discount on repairs (10% or 15%), not free parts. You'll see the price range before any work starts.",
  },
  {
    q: "Do you work on any brand?",
    a: "Yes. Our techs service all major furnace, AC, and heat pump brands.",
  },
];
