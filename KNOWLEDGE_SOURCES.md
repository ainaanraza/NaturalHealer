# Knowledge sources: research and unification plan

Researched 23 October 2026. Licences and access terms change, so recheck a source before copying anything new from it. This is a product analysis, not legal advice.

## Summary

- **No single source covers what Natural Healer needs.** Each covers one layer: classical tradition, official standards, modern evidence, or safety.
- **We can combine them, but mostly by linking, not copying.** Several of the best Ayurveda sources are licensed for **non-commercial use only**. Copying their content would bind our whole knowledge base to that licence and rule out any commercial future.
- **Two open sources can be merged directly today, and now are:** Kew's World Checklist of Vascular Plants (CC BY 4.0) and Wikidata (CC0). See [what we built](#what-we-built).
- **The safety layer has free, authoritative US government sources** (NCCIH, LiverTox) for cross-checking our cautions and interactions.
- **The classical layer needs a human.** The Ayurvedic Pharmacopoeia of India and the classical texts are the authority, but their usable form is PDFs and web pages, and checking our entries against them is reviewer work.

## Source by source

Coverage counts refer to our 27 entries (24 of them plants).

### Classical texts

| Source | Access | Licence | Coverage | Verdict |
| --- | --- | --- | --- | --- |
| **Charaka Samhita Online** (carakasamhitaonline.com, Jamnagar edition) | Free, wiki web pages | **CC BY-NC-SA 4.0** (non-commercial, share-alike) | Charaka only, with translation and commentary | **Link only.** Cite chapter and verse and link to the page. Copying text would make our knowledge base non-commercial share-alike. |
| **e-Samhita** (esamhita.ayush.gov.in, Ministry of Ayush / NIIMH) | Free, web reader | Not stated | Brihatrayi (Charaka, Sushruta, Vagbhata) and Laghutrayi | **Link only.** The Sanskrit originals are ancient and not under copyright, but this edition's translations and layout may be. |
| **Ayurvedgranthasamuccaya** (CCRAS e-books) | Free, web reader | Not stated | Major classical compendia, searchable | **Link only.** Useful for reviewers to check citations. |

### Official Indian and WHO standards

| Source | Access | Licence | Coverage | Verdict |
| --- | --- | --- | --- | --- |
| **Ayurvedic Pharmacopoeia of India** (PCIM&H, Ministry of Ayush) | Official book of standards under the Drugs and Cosmetics Act. PCIM&H's site has amendments, but full volumes circulate mainly as unofficial PDFs and old scans. | No reuse terms published | Most of our plant drugs (Part I monographs). Not ghee or honey. | **The reference for classical properties and dose ranges.** Record the facts (rasa, virya, dose) in our own words and cite volume and page; don't copy monograph text. Use an official or purchased copy for review. |
| **Ayurvedic Formulary of India** | As above | As above | Formulations such as Triphala churna | Same approach, for formulations |
| **NAMASTE portal** (namstp.ayush.gov.in) | Free to browse; no confirmed download or API | Not stated | 2,895 Ayurveda morbidity codes plus dravya and pharmacology terms | **Use its codes as identifiers** (a code is a reference, not content). Ask the Ministry about bulk access later. |
| **WHO International Standard Terminologies on Ayurveda** (2022) | Free PDF | **CC BY-NC-SA 3.0 IGO** | About 3,500 standard terms | **Reference only** for spelling and meaning of terms. Don't import it. |
| **ICD-11 Traditional Medicine Module 2** (WHO, launched 10 January 2024; includes Ayurveda) | Free, with an official API | **CC BY-ND 3.0 IGO** (commercial use allowed, no modified versions) | Ayurveda disease and pattern codes | **Use codes on our conditions.** Storing a code is fine; don't redistribute altered ICD content. |
| **TKDL** (CSIR) | Opened in 2022 beyond patent offices, but through a **paid subscription** | Contractual | Hundreds of thousands of formulations | **Not now.** Paid, contract-bound, and built for prior-art search rather than patient guidance. |

### Safety

| Source | Access | Licence | Coverage of our herbs | Verdict |
| --- | --- | --- | --- | --- |
| **NCCIH "Herbs at a Glance"** (US NIH) | Free web fact sheets | US government work. NCCIH marks its fact sheets public domain; confirm on each page before quoting. | **8**: aloe, ashwagandha, cinnamon, fenugreek, garlic, ginger, licorice, turmeric | **Cross-check our cautions and interactions; link as a source.** Paraphrase in our own words anyway. |
| **LiverTox** (US NIH, on NCBI Bookshelf) | Free | US government (NIDDK/NLM). Not all NCBI Bookshelf content is public domain, so confirm on each page. | Confirmed: **ashwagandha, turmeric, tinospora (giloy)** | **The authority for herb-related liver injury.** Link it from those entries' liver cautions. |
| **MSK About Herbs** (Memorial Sloan Kettering) | Free web and app, about 290 entries | Copyright MSK, no open licence | Several of ours | **Link only**, as a "further reading" source. |
| **HerbMedPro** (American Botanical Council) | Subscription | Commercial | Many, including tulsi, triphala, neem, bacopa and bitter melon | **Not now.** Worth it later for a reviewer. |

### Research and data

| Source | Access | Licence | Coverage | Verdict |
| --- | --- | --- | --- | --- |
| **PubMed** | Free; search links | Links are fine; abstracts belong to publishers | Everything | **Already used:** each entry links to a PubMed search. Link specific papers only after reading them. |
| **IMPPAT 3.0** (IMSc Chennai, released 30 Sept 2026) | Free web and downloads | The site says **CC BY-NC-ND 4.0**; the 2.0 paper says CC BY-NC 4.0. The stricter reading applies. | 4,154 Indian medicinal plants, 18,314 phytochemicals, 1,576 formulations | **Link only.** No-derivatives rules out building on it. |
| **Dr. Duke's Phytochemical and Ethnobotanical Databases** (USDA) | Free, raw tables downloadable | **CC0** (public domain) | Most of our plants | **Can be merged** (for compounds, later). Data is old and uneven, so treat it as supplementary. |
| **World Checklist of Vascular Plants** (Kew, via GBIF API) | Free API | **CC BY 4.0** (attribution, commercial allowed) | All 24 of our plants | **Merged:** accepted names, authors, families, synonyms. |
| **Wikidata** | Free SPARQL API | **CC0** | All 24 of our plants | **Merged:** item IDs and names in 11 Indian languages. |

## Can we combine them into one knowledge base?

**Yes, as a layered knowledge base that we own, in which each source plays a defined role:**

```
                 ┌──────────────────────────────────────────────┐
                 │  Our curated entry (herbs.js)                │  written by us, reviewed by a practitioner
                 │  classical properties, uses, amounts,        │
                 │  cautions, interactions, evidence summary    │
                 └───────────────┬──────────────────────────────┘
        checked against ↑        │        ↓ enriched with (merged automatically)
  Ayurvedic Pharmacopoeia,       │        Kew WCVP (CC BY): accepted name, family, synonyms
  e-Samhita, Charaka Online,     │        Wikidata (CC0): IDs, names in Indian languages
  NCCIH, LiverTox, MSK           │        Duke (CC0): compounds (later)
                                 │
        identified by ↓          │        linked to ↓
  ICD-11 TM2 / NAMASTE codes     │        PubMed, NCCIH, LiverTox, Charaka Online pages
  (conditions), Wikidata QID,    │
  GBIF key (plants)              │
```

The rule that keeps it robust and legally clean:

| What | How we use it |
| --- | --- |
| **Open data** (CC0, CC BY) | Merge automatically, with attribution, by script |
| **Facts from authoritative books** (API, classics) | Record in our own words, cite volume and page, verified by a reviewer |
| **Non-commercial or no-derivatives content** | Link to it; never copy it |
| **Codes and identifiers** (ICD-11, NAMASTE, Wikidata) | Store as references so our entries line up with official systems |

## What we built

The open layer is now live in the codebase:

- **`npm run kb:enrich`** (`scripts/kb/enrich.mjs`) queries Kew's checklist through GBIF and Wikidata for every plant in the knowledge base. It writes `src/data/knowledge/enrichment.js`, which credits its sources at the top.
- **It found a real error:** our aloe entry used *Aloe barbadensis*, which Kew lists as a synonym. The accepted name is *Aloe vera* (L.) Burm.f. That's now fixed, and the matcher prefers accepted records, because *Aloe vera* L. (Linnaeus's name) refers to a different plant.
- **Every plant now has:** its accepted name with author, family, up to 15 older botanical names, a Wikidata ID, and names in up to 11 Indian languages (243 names in total).
- **Search understands them.** "மஞ்சள் பால்" (Tamil for turmeric milk) finds haldi, and the old name *Ocimum sanctum* finds tulsi.
- **Herb pages show them** in a "Names and botany" section, with source links and licences.
- **A test fails** if any plant's Latin name stops matching Kew's accepted name. Rerun the script whenever herbs change.

## Safety cross-check (done)

Every herb that NCCIH or LiverTox covers was compared against those sources, and the entries were corrected. The notes are in our own words, and each herb's page links the source.

| Herb | What changed |
| --- | --- |
| Haldi | Liver warning now names highly absorbable curcumin products and the warning signs; supplements may be unsafe in pregnancy; breastfeeding added; evidence lowered to "limited", since NCCIH finds it inconclusive |
| Ashwagandha | Added breastfeeding (avoid), hormone-sensitive prostate cancer, and interactions with blood pressure and anti-seizure medicines |
| Methi | Pregnancy above food amounts linked to birth defects; serious allergic reactions; breastfeeding and children added |
| Mulethi | Even small amounts risky with high blood pressure or a salty diet; irregular heartbeat; pregnancy and breastfeeding |
| Lahsun | Supplements in pregnancy and breastfeeding; chemical burns from raw garlic on the skin |
| Aloe | Oral use in pregnancy and breastfeeding; acute hepatitis linked to oral leaf extracts; whole-leaf extract a possible carcinogen (IARC); interaction with digoxin |
| Adrak, Dalchini | Breastfeeding and skin notes; evidence summaries aligned with NCCIH |
| Brahmi, Giloy, Karela | LiverTox monographs linked |

**NCCIH fact sheets used** (public domain, as each page states): turmeric, ashwagandha, licorice root, ginger, fenugreek, garlic, cinnamon, aloe vera.

**LiverTox monographs linked:** ashwagandha, turmeric, tinospora, fenugreek, bacopa, bitter melon, aloe vera, cinnamon, ginger. NCBI blocks automated reading with a CAPTCHA, so only the summaries visible in search results were used. Please read the monographs themselves during review.

## Condition codes (done)

`src/data/knowledge/conditionCodes.js` gives each library condition its closest ICD-11 code (release 2026-01), checked against the published code listings. Each code appears in a "Classification" note on its condition page.

- **ICD-11 codes:** all 12 conditions are coded.
- **Ayurveda codes (ICD-11 TM2, SK00–SR0Z):** recorded only at the level of the body-system group, and only for the 9 conditions with an unambiguous match. Diabetes, high blood pressure and insomnia are left blank. Choosing exact TM2 disorder codes is a clinical judgement for a practitioner; using the official ICD API needs an account you would register.

## Remaining steps (need you)

1. **Get an official copy of the API volumes** for whoever reviews entries, so classical properties and doses can be cited by volume and page.
2. **Decide the commercial question.** If Natural Healer will always be non-commercial, we could also quote from Charaka Samhita Online and the WHO terminologies (with share-alike obligations). If it might become commercial, keep them link-only, as now.
3. **Register for the ICD API** (free, at icd.who.int) if you want exact TM2 codes looked up automatically.
4. **Scale the herb list** using the API Part I index as the checklist of single drugs, prioritising herbs covered by NCCIH or LiverTox so safety data is available from day one.
