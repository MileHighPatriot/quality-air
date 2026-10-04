# Quality Air

Concept site for 5280 Web Solutions sales calls. Quality Air is a fictional heating and cooling
company in Aurora, CO. Three pages: home, a repair-or-replace tool, and a maintenance plan.

- `data/site.ts`: business info (name, phone, cities, license line)
- `data/advisor.ts`: the repair-or-replace questions, rules, and sample price ranges
- `data/plans.ts`: maintenance plans, tune-up steps, FAQ

```
npm run dev      # local dev
npm run build    # static export into out/
npx serve out -l 3000
```

Live at https://milehighpatriot.github.io/quality-air/ (GitHub Pages serves `docs/` on main).

- `npm run pages:github` builds `docs/` for that github.io address. Use this one for now.
- `npm run pages` builds `docs/` for the custom domain `qualityair.5280webs.com`. Only switch to it once
  the DNS record exists (CNAME `qualityair` to `milehighpatriot.github.io`), or the live site breaks.
