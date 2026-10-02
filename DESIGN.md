# Design

## Visual theme

A temple library at dawn. A painted valley opens the page: navy night sky, a gold sunrise behind the walled city, the sea of glass, olive trees. Night-navy sections then alternate with warm parchment reading rooms. Gold is light, never decoration for its own sake.

Direction set by the Seer on 2026-10-02: keep the sealed words, match the look of the reference page he built (painted hero, upright serif with an italic second line, visible menu, hairline cards, sans reading text). This supersedes the serif-only rule of the first build.

Scene sentence: a seeker on a phone at midnight, in a dark room, opening a link someone shared, slowly deciding whether these records are worth their attention.

## Color

| Token | Hex | Role |
|---|---|---|
| night | #0A111D | Main dark canvas, header, lead card |
| night-2 | #0D1B2A | Depth glows and the Architecture band |
| void | #06060A | Deepest shadow |
| gold | #C5A55A | Eyebrows, icons, rules on dark |
| gold-hi | #D4B86A | Primary buttons, hero eyebrow, star rule |
| cream | #F6EEDB | Headings and display text on dark |
| parchment | #F3EAD3 | Reading-room light; body text on dark |
| parchment-dim | #CFC4AC | Secondary text on dark |
| earth | #8A7D6B | Quiet captions on dark |
| ink | #1C160E | Headings and lede on parchment |
| ink-2 | #4A3F30 | Body text on parchment |
| burnished | #7A5E22 | Eyebrows and line art on parchment |
| numeral | #937434 | Large scroll numerals on parchment |

Parchment is a soft radial (#F5ECD7 to #E5D5B2) with fine paper noise. Gradients stay gold-family or night-to-navy.

## Typography

- Cormorant Garamond (400/500, upright and italic): wordmark in tracked caps, hero title in caps with an italic "Light", every heading as two lines where the second line is italic, ledes, numerals (lining figures).
- Manrope (300–600): body, nav, eyebrows, buttons, labels. Eyebrows and buttons are uppercase, tracked 0.2–0.42em.
- Body 16–17px, line-height 1.75–1.85, measure at most 62ch.

## Imagery

- Hero and free-scroll backdrop: Higgsfield painting (GPT Image 2.5), luminist oil style, no people, no text. Files: assets/hero-1280.webp, hero-1920.webp, hero-portrait.webp (phone crop), hero-1280.jpg fallback.
- Book II cover art: Higgsfield painting of the obsidian hall, the empty throne, the descending gold thread and the broken chain. Title is typeset in HTML over it (assets/book-ii-cover.webp).
- Line geometry (the twelve-gate ring, the Holy City plan) sits over the paintings and parchment as faint gold watermarks.

## Components

- Buttons: radius 0, min height 52px. Primary = gold-hi fill, night text. Ghost = translucent night, cream text, hairline border. Ink = transparent with ink border on parchment.
- Cards: radius 0, 1px hairline border (cream at 13% on night, ink at 15% on parchment). The lead scroll card is inverted to night.
- Header: sticky, 64px phone / 76px wide, solid night. Inline nav from 1080px; below that, the full-screen menu.

## Layout

Mobile first at 390, then 820 (iPad), then 1440. Fluid type with clamp(). Split layouts (heading left, reading text right) on parchment; centered heads over card grids on night.

## Motion

Slow fade-and-rise reveals, a breathing glow at the horizon, a falling light in the "Enter the Library" cue. Ease-out-quart. All motion off under prefers-reduced-motion.
