# Aztec Nodes & Stats Dashboard (Vercel)

A simple, privacy‑preserving dashboard inspired by dashtec.xyz that:
- shows *where* Aztec nodes are running (regional approximation by default, opt‑in exact locations),
- shows high‑level stats: **accounts** and **total transactions**.

> You can deploy now — it ships with demo data and upgrades itself when you plug real sources.

## 1) One‑time setup

1. **Create repo**: push these files to GitHub/GitLab.
2. **Deploy to Vercel**: import the repo in Vercel → Deploy.
3. **Env vars (optional):**
   - `STATS_JSON_URL` → a JSON URL that returns `{ "accounts": number, "transactions": number }`.
   - `NODE_LIST_JSON_URL` → a JSON URL with an array of `{ lat, lng, city?, country? }` to plot exact points (opt‑in data!).
   - `BEACON_TOKEN` → any string. If set, you can POST opt‑in nodes to `/api/nodes`.

## 2) Data sources

- **Regional node distribution** is *best‑effort* parsed from Nethermind’s Aztec P2P Explorer (if reachable). If the HTML can’t be parsed, the app falls back to safe demo points so your site still works. For exact markers, use `NODE_LIST_JSON_URL` or the opt‑in beacon.
- **Accounts & transactions** default to demo numbers. When an official Aztec explorer exposes totals, set `STATS_JSON_URL` to that endpoint (or your own JSON).

## 3) Opt‑in beacon (optional)

You can collect exact locations from volunteers running nodes. Ask them to send a request like:

```bash
curl -X POST https://YOUR_DOMAIN/api/nodes       -H "x-beacon-token: $BEACON_TOKEN"       -H 'content-type: application/json'       -d '{"lat":6.5244,"lng":3.3792,"city":"Lagos","country":"Nigeria"}'
```

> In production, persist this to a database (Vercel KV / Postgres). This starter only echoes the payload.

## 4) Local dev

```bash
npm i
npm run dev
```

Open http://localhost:3000

## 5) Notes on privacy & limits

- The app does **not** collect IP addresses. It uses aggregated regions by default.
- Mapping raw peer IPs without consent may be invasive and unreliable. Prefer opt‑in submissions or published aggregates.

## 6) Customization

- Replace demo styling in `components/`.
- Swap the map tiles if needed.
