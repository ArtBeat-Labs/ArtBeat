# ART BEAT — Art, Music &amp; Dance Studio

A static website for ART BEAT, built as a single self-contained HTML file
(handwritten Tailwind config plus a small amount of CSS and JavaScript).
No build step, no framework, no backend.

## Getting started

### Open locally
Open `index.html` directly in a browser.

### With a local server
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

### Deploy
Fully static — publish with GitHub Pages (Settings → Pages → deploy from the
`main` branch, root folder).

## Project structure
- **`index.html`** — the entire site (markup, config, styles and scripts inline)
- **`assets/design/DESIGN.md`** — the "Candy" design language
- **`sitemap.xml` / `robots.txt`** — search-engine crawling (live URL: `https://artbeat-labs.github.io/ArtBeat/`)
- **`llms.txt`** — machine-readable studio facts for AI assistants and answer engines
- **`README.md`** — this file

## SEO & structured data
The page ships with three JSON-LD blocks — `LocalBusiness` (address, hours,
phone, map), `Event` (the 2 October competition) and `FAQPage` (six common
questions, mirrored by the on-page FAQ section) — plus canonical and Open Graph
tags. Validate after deploying at https://search.google.com/test/rich-results
and request indexing in Google Search Console.

## Sections
- Sticky header with nav, mobile menu and an active-section highlight
- Scrolling announcement ticker
- Hero
- **Choose Your Creative Jam** — Art, Music and Fusion programme cards
- **The Studio** — studio space and facilities
- **Meet the Studio Dreamers** — Shefali (founder, art), Ankit (art),
  Ayush and Rishabh (music)
- **Schedule of Chaos &amp; Creation** — weekly classes
- **ART BEAT Open Competition** — 2 October, from 11:00 AM, at
  Eldeco Saubhagyam Club, with the enquiry form
- Footer with hours and contact details

## Location
Eldeco Saubhagyam Club House, Sector 9, Vrindavan Colony, Lucknow,
Uttar Pradesh 226029 (near LPS School). Studio open every day; individual
classes run on alternate days per batch.

## Enquiry form
The query form posts to [Web3Forms](https://web3forms.com), a free
form-to-email service that needs no server (free plan: 250 submissions/month).

**Already configured.** The access key is in `index.html` and submissions are
delivered to `artbeat.labs@gmail.com`. The key is a public key and is safe in
client-side code; rotate it at https://web3forms.com if it is ever abused.

Direct contact is also available:
- WhatsApp: `(+91) 93363 33394`
- Email: `artbeat.labs@gmail.com`

## Outstanding / to replace
These still come from the original template and need the studio's real details:
- **Photographs** — the images are hotlinked placeholders, not the studio's own.
  (One template image was dead — a Google 403 — and is temporarily swapped for a
  duplicate of a working one; replace both when the real photos arrive.)
- **Instructor photos** — the team cards use monogram placeholders.
- **Competition details** — categories, age groups, entry fee, rules and
  registration deadline are not yet on the site.
