# TRYVORA
Next.js 14: landing (`public/landing.html`, served at `/`), live try-on demo (`/demo`), token API, Stripe test hooks.
## Run
1. `npm install`
2. `cp .env.example .env.local`, set `DECART_API_KEY` (server-side only, never NEXT_PUBLIC_)
3. `npm run dev` -> http://localhost:3000/demo, allow camera, click Start
## Decart wiring
`/api/tokens` creates a short-lived client token from your permanent key; the browser opens WebRTC with it (model `lucy-vton-latest`). Realtime try-on is billed per second in Decart credits. Demo cap: 3 sessions/IP/month (`lib/usage.ts`). To change provider, implement `lib/ai/provider.ts`.
## Stripe (test mode)
Create 3 recurring prices, set `STRIPE_PRICE_*`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`; webhook URL `/api/stripe/webhook` (currently only logs).
## Deploy
Vercel: import repo, add env vars, add domain.
## Not built
Auth/roles, Supabase DB, client dashboard, admin panel, Shopify widget, legal docs, photo try-on, persistent quotas.
## Untested
Written without network access. Run `npm install && npm run build` and fix any SDK typing differences.
