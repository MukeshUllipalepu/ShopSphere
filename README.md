# ShopSphere • Product Listing Page

Responsive SSR Product Listing Page based on the [Figma design](https://www.figma.com/file/N0Tv7yYLf3kfMLQjUncUlx/Design-Task---PLP?type=design&node-id=0-1&mode=design), with client-side sorting/filtering, FakeStoreAPI integration, and a lightweight JWT/bcrypt auth flow.

## Tech stack
- Next.js 14 (App Router, SSR)
- React 18 + TypeScript + Tailwind CSS
- Jest + Testing Library
- bcryptjs + JWT (httpOnly cookies)

## Live links
- Web app: _pending deployment (requires Vercel/Netlify credentials in this environment)_
- Static HTML preview: `/static-html/index.html`

## Getting started
1) Install deps (Node >= 18.17 recommended):
```bash
npm install
```

2) Create `.env.local`:
```
JWT_SECRET=replace-with-strong-secret
BCRYPT_SALT_ROUNDS=10
```

3) Run locally:
```bash
npm run dev
```

4) Tests & lint:
```bash
npm test
npm run lint   # requires Node >= 18.17
```

## Features
- SSR product listing and detail pages with graceful FakeStoreAPI fallback (`data/fallback-products.json`).
- Client-side filters: category, price sort (asc/desc), search, and load-more pagination.
- Auth: `/auth/signup` + `/auth/signin` issue JWT stored in httpOnly cookies; passwords hashed with bcrypt; `/profile` protected server-side.
- API routes: `POST /api/auth/signup`, `POST /api/auth/signin`, `POST /api/auth/signout`, `GET /api/auth/me`.
- Responsive layout (mobile/tablet/desktop) + accessible semantics and alt text.
- Static HTML/CSS version for review in `static-html/`.

## Deployment
- Ready for Vercel/Netlify. Build command: `npm run build`, output: `.next`.
- Set env vars (`JWT_SECRET`, `BCRYPT_SALT_ROUNDS`) in hosting dashboard.
- Ensure Node runtime >= 18.17 in deployment settings.

## Notes
- Fallback data ships in `data/fallback-products.json` so the PLP renders even if FakeStoreAPI is unreachable.
- User records persist to `data/users.json` for demo purposes only—swap with a real DB for production.
