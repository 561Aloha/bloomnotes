# 🌸 BloomNotes

**A digital bouquet builder — pick your blooms, arrange them, write a note, and share it.**

🔗 **Live Demo:** [bloomnotes.vercel.app](https://bloomnotes.vercel.app)

---

## Overview

BloomNotes is a multi-step web app that lets you build a personalized floral arrangement, pair it with a handwritten-style message, and share it with someone via a unique link. The bouquet and note are stored in Supabase and rendered for the recipient in a read-only share view.

---

## Features

- **Flower Selection** — Choose 4–6 blooms from a curated gallery with tap-to-select interactions and live count badges
- **Bouquet Arrangement** — Shuffle layout, cycle through greenery styles, and resize individual flowers by tapping them
- **Message Composer** — Write a note to your recipient with a "Dear / Message / Yours truly" card format
- **Share Link** — Generates a unique short link backed by Supabase; recipient sees a read-only bouquet + letter view
- **Responsive Design** — Fully optimized for mobile and desktop with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript, React |
| Styling | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + Row-Level Security) |
| Deployment | Vercel |

---

## Performance

### Lighthouse (bloomnotes.vercel.app)

| Metric | Score |
|---|---|
| Performance | 97 |
| Accessibility | 95 |
| Best Practices | 73 |
| SEO | 91 |

### Load Testing — Grafana k6

Staged ramp-up to **500 concurrent virtual users** over 2 minutes.

| Metric | Result |
|---|---|
| Total Requests | 27,123 |
| Throughput | ~224 req/sec |
| Avg Response Time | 3.76ms |
| p(95) Latency | 11.55ms |
| Error Rate | 0.00% |
| p(95) < 500ms threshold | ✅ Passed |
| Failure rate < 1% threshold | ✅ Passed |

---

## Project Structure

```
src/
├── components/
│   ├── SelectionStep.tsx     # Flower picker grid
│   ├── ArrangementStep.tsx   # Bouquet preview + greenery carousel
│   ├── BouquetPreview.tsx    # Reusable bouquet render (interactive + static)
│   ├── MessageStep.tsx       # Note composer
│   └── ShareStep.tsx         # Share link generator + recipient view
├── App.tsx                   # Step router + global state
├── constants.ts              # Flower and holder data
├── supabaseClient.ts         # Supabase initialization
└── types.ts                  # Shared TypeScript interfaces
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/561Aloha/digital-bouquet-maker.git
cd digital-bouquet-maker

# Install dependencies
npm install

# Add your Supabase credentials
cp .env.example .env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start the dev server
npm run dev
```

### Supabase Setup

Create a `bouquet_links` table:

```sql
create table bouquet_links (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null,
  created_at timestamp with time zone default now()
);
```

---

## Author

Built by [@MadeByDianna](https://madebydianna.com)
