# Knowledge base

The knowledge base is what Vanya answers from. It lives in `src/data/knowledge/`, so the website and the API always use the same content:

| File | Contents |
| --- | --- |
| `herbs.js` | Herbs, spices and kitchen substances (27 entries) |
| `vocabulary.js` | The fixed vocabularies entries must use, and plain-English meanings for classical terms |
| `../diseases.js` | The conditions library, also searched by Vanya |

All entries are currently **drafts**: no qualified Ayurvedic practitioner has reviewed them yet. The site shows this on every herb page, and Vanya is told to say so when giving amounts or herb-specific advice.

## Herb entry fields

| Field | What goes in it |
| --- | --- |
| `id` | Short, stable, lowercase id (also the URL: `/herbs/<id>`) |
| `name`, `hindi`, `sanskrit`, `english`, `latin` | Every name people might use. All of them are searchable. |
| `kind`, `part` | `herb`, `spice`, `food` or `formulation`; the part used |
| `properties` | `rasa`, `guna`, `virya`, `vipaka` (classical terms from `GLOSSARY`), plus the doshas it `pacifies` and `aggravates`. Use `null` or `[]` when unsure. |
| `actions`, `traditionalUses` | Plain-language lists |
| `kitchenUse` | How it is used at home, in a sentence or two |
| `typicalUse` | `forms`, `adultAmount` (always adults; never give amounts for children) and an optional `note` |
| `cautions` | `{ group, note }`, where `group` comes from `CAUTION_GROUPS` (pregnancy, children, surgery and so on) |
| `interactions` | `{ drugClass, effect, level }`, where `drugClass` comes from `DRUG_CLASSES` and `level` is `caution` or `avoid` |
| `evidence` | `level` from `EVIDENCE_LEVELS`, a one- or two-sentence `summary`, and a `pubmedQuery` search link |
| `sources` | Where the information comes from (see the rules below) |
| `review` | `{ status: 'draft' or 'reviewed', reviewer, reviewedAt }` |

The fixed vocabularies matter. A later safety layer will match `cautions[].group` and `interactions[].drugClass` against a person's profile (pregnancy, medicines and so on), so free text there would be silently missed.

## Editorial rules

1. **Never invent a source.** Name a source only at the level you are sure of, such as "Bhavaprakasha Nighantu" or "Ayurvedic Pharmacopoeia of India, Part I". Add verse or page numbers only after checking them in the actual book.
2. **No invented studies or numbers.** Evidence is a plain-language summary plus a PubMed search link. Link to a specific paper only after reading it.
3. **Leave unknowns empty.** If texts disagree or you are unsure (for example, fennel's virya), leave the field `null` and explain in `typicalUse.note`.
4. **Safety outranks tradition.** Record known risks even if classical texts do not mention them: liver injury reports, infant poisoning, interactions.
5. **Never claim a cure.** India's Drugs and Magic Remedies Act prohibits claims to cure listed diseases, and it is also simply not honest.
6. **Doses are for adults.** For children, pregnancy and anyone on regular medicine, the answer is "check with a practitioner".

## Review workflow

When a qualified practitioner (BAMS or higher) reviews an entry:

1. Correct the entry and add exact references (text, chapter and verse; pharmacopoeia volume and page).
2. Set `review: { status: 'reviewed', reviewer: '<name, qualification>', reviewedAt: 'YYYY-MM-DD' }`.
3. Run `npm test`. The tests reject a `reviewed` status without a named reviewer and date, unknown vocabulary keys, and missing fields.

## How Vanya uses it

1. `server/lib/knowledge/corpus.js` turns every herb into two passages (overview, and safety and interactions) and every condition into one.
2. `server/lib/knowledge/search.js` ranks passages for the question with keyword scoring (BM25). An everyday-language dictionary maps words like "bloated", "warfarin" or "can't sleep" onto the terms the entries use. Safety passages for every herb that comes up are always added.
3. The passages go into the prompt as numbered excerpts. Vanya must cite them as `[1]`, `[2]` and so on, may only state doses and classical properties found in them, and must say when the knowledge base does not cover a question.
4. The sources Vanya actually cited are saved with the answer and shown under it, linking to the herb or condition page.

Retrieval needs no AI calls, so it is fast, free and covered by tests (`server/test/knowledge.test.js`). If you add an entry, add a test question that should find it.

## Adding an entry

1. Copy an existing entry in `herbs.js` with a similar kind.
2. Fill every field, following the rules above. Keep `review.status: 'draft'`.
3. If people call it by words the dictionary does not know, add them to `SYNONYMS` in `server/lib/knowledge/search.js`.
4. Add a retrieval case to `EXPECT` in `server/test/knowledge.test.js`, then run `npm test`.
