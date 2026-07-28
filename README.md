# Abdul Rafay — Portfolio

A portfolio for a Senior React Native Engineer, built as a product rather than a template.
Dark, motion-led, and fully static.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of every route
npm run typecheck
```

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15, App Router | Every route prerenders; no server at runtime |
| Language | TypeScript, strict | Data layer is the contract for the whole UI |
| Styling | Tailwind CSS 3.4 | Design tokens live in `tailwind.config.ts` |
| Motion | Framer Motion 12 | Scroll-linked values, variants, shared-layout |
| Scroll | Lenis | One instance, one rAF loop, shared via context |
| Background | Hand-written WebGL | ~4 KB of GLSL instead of a 600 KB 3D library |
| Icons | Lucide | Tree-shaken per icon |

## Structure

```
src/
  app/                 routes, metadata, sitemap, robots
    work/[slug]/       one prerendered case study per project
  components/
    layout/            header, footer, preloader, scroll progress
    sections/          one file per homepage section
    work/              project media + case study template
    interaction/       cursor, magnetic, text reveal, parallax, tilt
    visuals/           aurora shader, particle field, ambient blobs
    ui/                button and shared primitives
    providers/         Lenis + MotionConfig
  hooks/               media queries, pointer tracking
  lib/
    data/              projects, career, skills, services
    motion.ts          the single motion vocabulary
    site.ts            profile, nav, contact
```

All copy and project data live in `src/lib/data/`. Nothing is hard-coded in a component,
so editing a case study never means touching JSX.

## Motion

Every easing curve, duration and spring comes from `src/lib/motion.ts`. Components import
from there rather than inventing their own, which is what keeps ~40 distinct animations
feeling like one system.

Things that run on every frame — the cursor, the particle field, the aurora, the stat
counters — write to `transform`/`textContent` directly inside a single `requestAnimationFrame`
loop and never touch React state. Pointer-reactive lighting is done with CSS custom
properties for the same reason.

Both canvases pause via `IntersectionObserver` when scrolled offscreen, and the aurora
renders at 40–62% resolution (the noise is low-frequency, so it is visually free).

## Performance

- 13 MB of optimised assets, down from ~280 MB of source material. Videos were transcoded
  to 720p H.264 with `+faststart`; images to WebP at 1600px.
- Project previews use `preload="none"` and only attach a `src` on first hover, so the
  homepage downloads no video until a visitor shows interest.
- ~213 KB First Load JS on the homepage, 176 KB on a case study.

## Accessibility

- One `<h1>` per page, unbroken heading order, real landmarks.
- All text meets WCAG AA against the background (verified per-node, including the
  per-project accent colours, which are lightened for label-size text).
- `prefers-reduced-motion` is honoured in three places: the CSS media query, Framer Motion's
  `reducedMotion="user"`, and early returns in Lenis, the aurora, the particles, the cursor
  and the preloader.
- The custom cursor only activates for `(hover: hover) and (pointer: fine)`.
- Keyboard focus is always visible; there is a skip link to `#main`.

## Content

Career history, projects and skills come from the résumé in `public/Abdul-Rafay-Resume.pdf`
and from the previous portfolio, rewritten. Repository data on the homepage is fetched live
from the public GitHub API at runtime and degrades to a plain profile link if that request
fails.
