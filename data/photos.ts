/**
 * Photos and their built widths (see scripts/photos.mjs). All are CC0 / public domain,
 * credited in README.md. They're stand-ins: a real client's site would use their own trucks and techs.
 */
export const photos = {
  snowyHouse: {
    src: "/photos/snowy-house",
    widths: [480, 800, 1024],
    w: 1024,
    h: 683,
    alt: "A brick and gray-sided house after a heavy snow, warm light in the windows",
  },
  frontSteps: {
    src: "/photos/front-steps",
    widths: [480, 800, 1024],
    w: 1024,
    h: 683,
    alt: "Snow piled on the shrubs beside a front porch",
  },
  heatPump: {
    src: "/photos/heat-pump",
    widths: [480, 800, 1200, 1600],
    w: 3024,
    h: 4032,
    alt: "An outdoor heat pump unit on a stand beside gray siding and river rock",
  },
  techPanel: {
    src: "/photos/tech-panel",
    widths: [480, 681],
    w: 681,
    h: 1024,
    alt: "A technician checking the wiring in an electrical panel",
  },
} as const;

export type PhotoKey = keyof typeof photos;
