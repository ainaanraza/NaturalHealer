---
name: Natural Healer
description: Vanaspati, an Ayurvedic materia medica. Evidence-led reference with botanical line plates, one adult anime vaidya (Vanya) who voices the AI, and quiet motion.
colors:
  paper: "#F6F1E4"
  paper-2: "#EFE7D3"
  card: "#FFFDF7"
  ink: "#22301F"
  ink-2: "#4C5A45"
  ink-3: "#6E7865"
  leaf-900: "#1F3A24"
  leaf-700: "#2F6B3A"
  leaf-500: "#5E8C4A"
  leaf-100: "#E6EFDB"
  sandal: "#E9D8A6"
  clay: "#C9733B"
  haldi: "#E3A31A"
  chilli: "#B3361F"
typography:
  display: "Cormorant Garamond 600, clamp(2.8rem, 6vw, 5rem)"
  body: "Manrope 400-800, 1.0625rem / 1.65 (Mukta for Devanagari)"
  label: "Manrope 700, 0.75rem, 0.12-0.16em tracking, uppercase (eyebrows, data labels)"
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  leaf: "28px 6px 28px 6px"
  full: "999px"
---

# Natural Healer design system: Vanaspati

A credible, evidence-led Ayurveda reference. Cream handmade paper is the ground, deep leaf green carries text and actions, and brass and clay warm it. Chilli red is only for "see a doctor" and errors. The tone is a materia medica, not a storybook.

## Illustration

- **Vanya** (`src/components/Vaidya.jsx`) is the one figure: an adult vaidya drawn in anime style with realistic proportions, at a table with a brass khal-batta, a bowl of haldi and a glass flask. She voices the AI guide. `crop="portrait"` frames her face for avatars (`VaidyaAvatar`).
- **Botanical plates** (`src/components/Botanicals.jsx`) are procedurally drawn herbarium line art for tulsi, saunf, brahmi, haldi, adrak, neem and a mortar for "All". `HerbMark` is the small round version used beside conditions.
- Categories map to herbs in `beds` in `src/data/kitchen.js`, which also records each herb's species, the part used and its studied compounds. Compounds are listed as "studied", never as proof of effect.

## Evidence rules

- State only what the library or well-established botany supports: species names, plant parts and commonly studied constituents.
- Don't publish statistics, accuracy rates or study claims unless their sources are verified. The PDFs in `Documents/` have unresolved citations and are not a source.
- Every condition shows severity and duration. Serious ones lead with the doctor notice.

## Motion

Motion settles; it never bounces. `--ease-spring` is deliberately overshoot-free.

- Vanya breathes, blinks, and her braid and earring drift a little. Bubbles rise in the flask.
- Botanical strokes ink themselves in on reveal (`.ink-stroke`, `pathLength=1`), then a pale wash fades in.
- Mandalas turn very slowly (240–300s per turn). Sections rise 16px and fade in on scroll (`[data-reveal]`, `useReveal`). The hero has light parallax (`useParallax`).
- With reduced motion, the ink is drawn immediately, mandalas stop, and entrances become fades.

## Components

- Buttons: `btn-leaf` is the single primary action, `btn-paper` is secondary, `btn-ghost` is quiet. All have 8px corners.
- `HerbPlates` is the landing category picker (numbered herbarium cards, Latin name, count), with a monograph strip for the selected herb. `HerbRail` is the dashboard filter.
- Sections: hero with jharokha arch and example consult, Method (three plain commitments), Materia medica and the condition ledger, Ingredients shelf (`ClayBowl`), Tridosha, a dark closing statement.
