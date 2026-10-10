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
- **`assets/`** — the studio's own media (everything local, no external image hosts):
  - `artwork-01.jpeg` … `artwork-12.jpeg` — paintings shown in the gallery and hero
  - `poster-zumba-bollywood.jpeg` — the Zumba & Bollywood poster
  - `dance-1..3.mp4`, `dance-4.mp4`, `dance-garba.mp4` (+ `-poster.jpeg`) — dance clips
  - `music-guitar.mp4`, `music-harmonium-tabla.mp4`, `music-tabla-harmonium.mp4` (+ posters) — music clips
  - `competition-*.jpeg` — competition-day photos (9)
  - `competition-judging.mp4`, `competition-drawing-1..3.mp4` (+ posters) — competition-day clips
  - `instructor-shefali.jpeg` / `instructor-shefali.mp4` (+ poster) — Shefali's card photo and clip
  - `instructor-ayush.jpeg` / `instructor-ayush.mp4` (+ poster) — Ayush Kumar's card photo and clip
  - `logo.svg` — the emblem for the header, footer, watermark and favicon
  - `design/DESIGN.md` — the "Candy" design language
- **`assets/newfiles/`** — the raw media drop this content came from. It is now
  redundant (the videos are duplicated by the compressed `assets/*.mp4` files)
  and holds the one clip that is deliberately **not** used
  (`noneedtoincludeyoutubercoverageofevent.mp4`). Safe to delete once you're happy;
  it is untracked, so it is not in git unless you add it.
- **`sitemap.xml` / `robots.txt`** — search-engine crawling (live URL: `https://artbeat-labs.github.io/ArtBeat/`)
- **`llms.txt`** — machine-readable studio facts for AI assistants and answer engines
- **`README.md`** — this file

## SEO & structured data
The page ships with three JSON-LD blocks — `LocalBusiness` (address, hours,
phone, map), `Event` (the opening day, 2 October) and `FAQPage` (six common
questions, mirrored by the on-page FAQ section) — plus canonical and Open Graph
tags. Validate after deploying at https://search.google.com/test/rich-results
and request indexing in Google Search Console.

## Sections
- Sticky header with nav, mobile menu and an active-section highlight
- Scrolling announcement ticker
- Hero
- **Choose Your Creative Jam** — Art, Music and Fusion programme cards
- **Explore Our Music Lessons** — interactive sound toy plus the studio music clips
- **The Studio** — studio space and facilities
- **Student Creations** — masonry gallery of the studio's artwork
- **Meet the Studio Dreamers** — Shefali (founder, art), Ankit (art),
  Ayush Kumar and Rishabh (music)
- **Instructors In Action** — short video clips from the teaching team
- **Schedule of Chaos &amp; Creation** — weekly classes
- **Move to the Beat** — dance: the Zumba &amp; Bollywood poster plus video clips
- **Our Opening Day** — the opening day celebration on 2 October, with the
  enquiry form
- **Competition Highlights** — photo gallery and clips from the event
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

Ayush Kumar's own Instagram (`https://www.instagram.com/ayushk_1618`) is linked
from **his** instructor card only — deliberately not in the footer, so it is kept
apart from the studio's own social links.

Direct contact is also available:
- WhatsApp: `(+91) 93363 33394`
- Email: `artbeat.labs@gmail.com`
- Instagram: https://www.instagram.com/artbeat.labs
- Facebook: https://www.facebook.com/people/Art-Beat/pfbid029pBv6zrQX1CXxX1bg6A6xA9pGb4oVgXokmpw2YtRo86ySBZtdvxTaK6AojekMqhRl/

## Outstanding / to replace
- **Instructor photos** — Shefali and **Ayush Kumar** have photos. **Ankit**
  and **Rishabh** still use monogram placeholders; drop photos in as
  `assets/instructor-<name>.jpeg`, then uncomment the `<img>` line already
  prepared inside each card and delete the monogram `<span>`.
- **Dance instructor** — no photo or clip yet. The *Instructors In Action*
  section reuses `dance-garba.mp4` as a clearly-labelled stand-in; swap in the
  real clip and photo when they arrive.
- **Competition details** — categories, age groups, entry fee, rules and
  registration deadline are not yet on the site.
- **`Event` structured data** — it now describes the past opening day
  (2 October). Past events generally do not earn Google's event rich result, so
  either remove that JSON-LD block or repoint it at the next event once you
  announce one.
- **Video encoding** — all clips are H.264 (CRF 27, AAC 96 kbps, `+faststart`),
  except `competition-drawing-3.mp4` which needed CRF 31 because its source was
  already heavily compressed. Everything loads only on play, so the page itself
  stays light.

## Adding more images and videos
The gallery and dance sections use plain, copy-paste friendly markup:
- **Artwork:** copy one `<figure>` block inside the `#gallery` masonry in
  `index.html`, then change `src`, `alt`, `width` and `height`. Name new files
  `artwork-13.jpeg`, `artwork-14.jpeg`, … and use the real pixel dimensions.
- **Video:** copy one `<video>` card inside `#dance`, then change the `poster` and
  `<source src>` paths. Name new files `dance-4.mp4`, `dance-5.mp4`, …. Compress
  and make a poster with:
  ```bash
  ffmpeg -i new.mp4 -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p \
    -c:a aac -b:a 96k -movflags +faststart dance-4.mp4
  ffmpeg -ss 1 -i dance-4.mp4 -frames:v 1 -q:v 4 dance-4-poster.jpeg
  ```
  Set the `<video>` `width`/`height` to the clip's **display** size (a portrait
  phone clip is e.g. `720` × `1280`); get it with
  `ffprobe -select_streams v:0 -show_entries stream=width,height new.mp4`.
