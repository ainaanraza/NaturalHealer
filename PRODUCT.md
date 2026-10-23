# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

South Asian households who grew up around Ayurveda: the remedies a grandmother reached for, the spice box on the kitchen counter. They open Natural Healer on a phone or laptop when someone at home feels unwell (a cold, indigestion, a restless night) and want a trustworthy reference for what to make and how, plus someone to ask follow-up questions.

## Product Purpose

Natural Healer turns household Ayurvedic knowledge into a dependable reference: common conditions, the home remedies for each, prevention habits, and an AI guide that answers follow-up questions from an Ayurvedic point of view. Success is a user finding a remedy they can make with what is already at home, understanding how to use it, and knowing when a condition needs a doctor instead.

## Positioning

Kitchen-shelf remedies. Every remedy is built from ingredients already in an Indian kitchen (tulsi, haldi, jeera, ajwain, saunf, ginger, honey, ghee), so the product meets people in the place they already practise Ayurveda: the kitchen, not a clinic or a spa.

## Operating Context

- Used at home, often in the moment someone feels unwell, frequently on a phone.
- Browse a library of conditions by category or search by condition, herb, or remedy.
- Open a condition to read remedies, prevention, typical duration, dosha, and severity, and ask a condition-scoped AI question.
- Ask the general AI guide; conversations are saved and can be reopened.
- Save conditions to a personal list.

## Capabilities and Constraints

- React 18 + Vite single-page app; React Router routes `/`, `/login`, `/signup`, `/forgot-password`, `/home`, `/prakriti`.
- Serverless API on Vercel (`/api`); every request is verified against the user's Firebase ID token. See `BACKEND.md`.
- Firebase Authentication (email/password and Google) and Firestore (profiles, favorites, prakriti results, chat history), written only by the API.
- Google Gemini powers the AI guide, called from the server with model fallback; answers stream to the browser. A safety triage step handles emergencies without the AI.
- Content lives in `src/data/diseases.js`: 12 conditions across respiratory, digestive, mental, skin, musculoskeletal, and chronic categories, 60 remedies in total, each with prevention tips, duration, severity, and doshas.
- Favorites are saved to the account and cached in the browser.
- Prakriti (dosha) self-assessment, scored on the server and used to personalise answers.
- Not built: Terms of Service and Privacy pages, progress tracking, video content.

## Brand Commitments

- Product name: "Natural Healer".
- Footer credit: "Made by #AbdullahSlash".
- Everything else (logo, colour, typography) is open to redesign.

## Evidence on Hand

- The remedy library in `src/data/diseases.js` (real content, the product's core material).
- `Documents/NH-succes.pdf` and `Documents/Review-paper.pdf` (project documents, not yet reviewed for usable content).
- No user counts, testimonials, ratings, clinical results, or studies. These must not be invented.

## Product Principles

1. Start from the kitchen: lead with ingredients people already own and recognise by their household names.
2. Honest about limits: remedies complement medical care; serious conditions always say so.
3. Practical over mystical: say what to make, how much, and when, in plain words.
4. Respect the tradition without costuming it: Ayurvedic terms are used accurately and explained, not used as decoration.

## Accessibility & Inclusion

- Readers may be older family members on phones: readable type sizes, strong contrast, generous touch targets.
- Household names for ingredients (haldi, jeera, saunf) appear alongside English names.
