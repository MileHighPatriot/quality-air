import type { IconName } from "@/components/Icon";

export const trustPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "tag",
    title: "Upfront price ranges",
    body: "You hear a range on the phone and a firm number before any work starts.",
  },
  {
    icon: "clock",
    title: "Same-day service when we can",
    body: "Call in the morning and we'll tell you straight whether today is possible.",
  },
  {
    icon: "badge",
    title: "Techs paid hourly, not on commission",
    body: "Nobody earns more by selling you a bigger repair.",
  },
];

export const services: { icon: IconName; tone: "ember" | "sky" | "pine"; title: string; body: string }[] = [
  {
    icon: "flame",
    tone: "ember",
    title: "Furnace repair",
    body: "No heat, short cycling, or strange noises, diagnosed and fixed, usually in one visit.",
  },
  {
    icon: "snow",
    tone: "sky",
    title: "AC repair",
    body: "Warm air, frozen lines, or a unit that won't start, sorted out before the house heats up.",
  },
  {
    icon: "home",
    tone: "pine",
    title: "New system install",
    body: "A furnace, AC, or heat pump sized for your home, with a written quote you can compare.",
  },
  {
    icon: "wrench",
    tone: "pine",
    title: "Tune-ups and maintenance",
    body: "A fall furnace check and a spring AC check that catch small problems before they grow.",
  },
];

export const toolQuestions = ["What kind of system is it?", "About how old is it?", "What's it doing?"];

export const reviews = [
  {
    quote:
      "Furnace quit at 9 on a January night. A real person picked up, a tech was here within two hours, and the bill landed inside the range they quoted on the phone.",
    by: "Homeowner, Southlands",
  },
  {
    quote:
      "Our AC was 17 years old. They gave us the repair price and the replacement price on one page and let us decide. No pressure either way.",
    by: "Homeowner, Mission Viejo",
  },
  {
    quote:
      "I'd never remember a tune-up on my own. The reminder text shows up, I pick a morning, and it's done. Easiest thing on my list.",
    by: "Homeowner, Stonegate",
  },
];

export const concerns = ["No heat", "No cool", "Strange noise or smell", "Tune-up", "New system quote"];
