# Design

## Visual theme

A temple library at night. Dark cosmic sections (void and deep navy glow) alternate with aged parchment reading rooms. Gold is light, never decoration for its own sake. Color strategy: Committed on dark sections (void carries the surface, gold is the light source), Restrained on parchment (ink with burnished gold).

Scene sentence: a seeker on a phone at midnight, in a dark room, opening a link someone shared, slowly deciding whether these records are worth their attention.

## Color

| Token | Hex | Role |
|---|---|---|
| void | #06060A | Dark canvas |
| surface | #0D0D12 | Cards and raised surfaces on dark |
| navy | #0D1B2A | Depth glows only |
| gold | #C5A55A | Light, rules, icons, primary buttons (never text on parchment) |
| gold-hover | #D4B86A | Hover state |
| parchment | #F3EAD3 | Reading-room canvas; primary text on dark |
| parchment-dim | #CFC4AC | Secondary text on dark (derived) |
| earth | #8A7D6B | Quiet captions on dark |
| ink | #1C160E | Text on parchment |
| ink-2 | #4A3F30 | Secondary text on parchment |
| burnished | #7A5E22 | Gold text and line art on parchment |

Gradients: gold-family or black to navy only, subtle.

## Typography

- Cinzel: wordmark, eyebrows, labels, buttons. Uppercase, tracking 0.2–0.42em.
- Cormorant Garamond: headings and italic display lines.
- EB Garamond: body, 18–19px, line-height 1.7, measure at most 68ch.
- No sans faces anywhere; every family is a serif.

## Components

- Buttons: radius 0, min height 48px. Primary = gold fill, void text. Secondary = transparent, 1px gold border, gold text (burnished on parchment).
- Cards: radius at most 2px, 1px gold hairline border at low opacity, no shadows beyond a faint gold glow on hover.
- Hairlines: 1px gold, tapered with a gradient.
- Header: sticky, at most 76px tall, blurred void.

## Layout

Mobile first at 390, then 820 (iPad), then 1440. Fluid type with clamp(). Section rhythm varies: dark sections breathe wider than parchment reading rooms.

## Motion

Slow fade-and-rise reveals, faint star twinkle, a breathing beam of light. Ease-out-quart. All motion off under prefers-reduced-motion.
