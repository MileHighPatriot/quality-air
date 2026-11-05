# Quality Air

Concept site for 5280 Web Solutions sales calls. Quality Air is a fictional heating and cooling
company in Aurora, CO. The phone number, prices, reviews and license line are samples.

## What it shows

- **Call button everywhere.** A pinned call bar on phones, a sticky header on desktop, and a live
  "Office open now" / "After hours: emergency line on" status in Denver time (`lib/useOfficeStatus.ts`).
- **Aurora right now.** The hero card pulls the current temperature, tonight's low and tomorrow's high
  from Open-Meteo (free, no key) and turns them into advice: book a furnace tune-up, an AC check, or
  call now on a hard-freeze night (`lib/useWeather.ts`, `components/ComfortCard.tsx`). If the weather
  can't load, it falls back to the season message.
- **Repair or replace?** Three questions, a straight answer and a sample price range. "Book this visit"
  fills the booking form with the answers (`data/advisor.ts`, `components/Advisor.tsx`).
- **Before you call** (`/no-heat/`): tick-off checklists for no heat and no cool, including snow on the
  furnace vent pipes and cottonwood fluff on the AC, plus the gas-smell and CO safety box
  (`data/troubleshoot.ts`).
- **Prices** (`/pricing/`): the sample price book, read from the same `ranges` the advisor uses.
- **Maintenance plan**: plan comparison plus a "does a plan pay for itself?" calculator
  (`components/PlanCalculator.tsx`, numbers in `data/plans.ts`).
- Share image (`public/og.jpg`), `HVACBusiness` structured data, sitemap and robots.

## Where things live

- `data/site.ts`: business info (name, phone, hours, cities, license line, map point)
- `data/advisor.ts`: the repair-or-replace questions, rules, and sample price ranges
- `data/plans.ts`: maintenance plans, tune-up steps, FAQ
- `data/troubleshoot.ts`: the Before-you-call checklists
- `data/photos.ts`: photo alt text and built widths

## Commands

```
npm run dev      # local dev
npm run build    # static export into out/
npm run photos   # rebuild public/photos/ from assets/photos/
npm run og       # rebuild public/og.jpg
```

Live at https://milehighpatriot.github.io/quality-air/ (GitHub Pages serves `docs/` on main).

- `npm run pages:github` builds `docs/` for that github.io address. Use this one for now.
- `npm run pages` builds `docs/` for the custom domain `qualityair.5280webs.com`. Only switch to it once
  the DNS record exists (CNAME `qualityair` to `milehighpatriot.github.io`), or the live site breaks.

## Photo credits

All CC0 / public domain. They stand in for a real client's own trucks and techs.

- `snowy-house`: "House covered snow", Rawpixel (CC0).
- `front-steps`: "Free suburban house winter photo", Rawpixel (CC0).
- `tech-panel`: "Computer engineer working" (an electrician at a panel), Rawpixel (CC0).
- `heat-pump`: "Heat pump unit" by Wikideas1, Wikimedia Commons (CC0). The maker's badge is blurred in
  `scripts/photos.mjs` so the fictional company doesn't read as a brand dealer.
