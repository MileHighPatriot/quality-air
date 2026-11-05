/** "Before you call" checklists. Safe, homeowner-level steps only: nothing that opens a panel or touches gas. */
export type Step = { title: string; body: string };

export const noHeat: Step[] = [
  {
    title: "Thermostat on Heat, set a few degrees up",
    body: "Set it to Heat and about 5° above the room. If the screen is blank, put in fresh batteries.",
  },
  {
    title: "Furnace switch and breaker on",
    body: "Most furnaces have a switch on or near them that looks like a light switch. Make sure it's on, and that the furnace breaker hasn't tripped.",
  },
  {
    title: "Clear snow off the vent pipes outside",
    body: "Newer furnaces vent through two white plastic pipes on an outside wall or the roof. After a big Colorado snow, drifts or ice can block them and shut the furnace off.",
  },
  {
    title: "Swap a clogged filter",
    body: "If you can't see light through the filter, a furnace can overheat and shut itself off. A fresh one costs a few dollars.",
  },
  {
    title: "Close the furnace door all the way",
    body: "The front panel has a safety switch. If it's even a little loose, the furnace won't run.",
  },
  {
    title: "Give it five minutes",
    body: "After you change something, the furnace runs a safety check before it lights. Wait five minutes before trying anything else.",
  },
];

export const noCool: Step[] = [
  {
    title: "Thermostat on Cool, fan on Auto",
    body: "Set it to Cool and a few degrees below the room. If the screen is blank, put in fresh batteries.",
  },
  {
    title: "Both breakers on",
    body: "Central AC usually has two: one for the furnace or air handler inside, and one for the outdoor unit. Check the shutoff box next to the outdoor unit too.",
  },
  {
    title: "Rinse cottonwood fluff off the outdoor unit",
    body: "In early summer, cottonwood fluff mats onto the fins and chokes the unit. Turn the power off at the shutoff box, then rinse gently from the inside out with a garden hose.",
  },
  {
    title: "Swap a clogged filter",
    body: "A dirty filter starves the system of air and can freeze the coil.",
  },
  {
    title: "Ice on the lines? Let it thaw",
    body: "If the copper lines or the indoor coil are frosted, turn cooling off and the fan to On for 2 to 3 hours. Then call: ice means something else is wrong.",
  },
  {
    title: "Check for water in the drain pan",
    body: "If the pan under the indoor coil is full, a float switch may have shut the AC off to stop a leak. That's a call, not a fix-it-yourself.",
  },
];

export const stopAndCall = [
  "A breaker trips again after you reset it",
  "A burning or electrical smell",
  "Water pooling around the furnace",
  "The furnace lights, then shuts off over and over",
];
