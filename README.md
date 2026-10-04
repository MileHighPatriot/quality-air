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

`npm run pages` builds into `docs/` for GitHub Pages (CNAME `qualityair.5280webs.com`). Not published yet.
