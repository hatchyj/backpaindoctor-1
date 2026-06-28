# Patient Resources — content & publishing guide

A practical workflow for publishing articles to **/patient-resources** at a sustainable cadence (aim: 1 article/month). Articles live in `src/content/patient-resources/` as `.md` or `.mdx` files.

## How to publish a new article

1. Copy `docs/article-template.md` into `src/content/patient-resources/` and rename it to your slug, e.g. `do-you-need-an-mri-for-back-pain.md`.
2. Fill in the frontmatter (see field reference below).
3. **Add a hero image** to `src/images/patient-resources/` that is **at least 1080px wide** — this is enforced by the content schema and the build will fail otherwise. Point the `image:` field at it.
4. Set `draft: false` when ready. Leave `draft: true` to keep it out of the live site.
5. Commit and push — Netlify rebuilds automatically.

## Frontmatter field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The H1 and the basis of the `<title>` tag. Lead with the patient's question or the keyword. |
| `meta_title` | no | Overrides the SEO `<title>` if you want it to differ from the on-page H1. |
| `description` | yes | 150–160 chars. This is the search snippet — make it answer the query and include the locality where natural. |
| `slug` | yes | URL-friendly, hyphenated, keyword-led. Don't change it once published (it breaks links). |
| `image` | yes | Relative path, e.g. `../../images/patient-resources/your-image.jpg`. **Must be ≥1080px wide.** |
| `author` | yes | `Dr Joshua Hatch` (must match the author file title exactly). |
| `date` | yes | `YYYY-MM-DD`. Drives ordering and the published date in schema. |
| `categories` | yes | Array, e.g. `["patient-resources"]`. |
| `references` | no | Array of full citations — strengthens E-E-A-T and is rendered at the foot of the article. |
| `draft` | yes | `false` to publish, `true` to hide. |

## House style (AHPRA-aware)

- **Outcome-honest, never absolute.** "may help reduce pain / aims to", not "cures" or "guarantees lasting relief."
- **No patient testimonials** about clinical services — prohibited under the National Law.
- **Distinguish evidence from opinion.** Where evidence is mixed, say so. Cite where you can.
- **No comparative self-promotion** ("the best in Brisbane") and no claims you can't substantiate.
- The site-wide **medical disclaimer** is rendered automatically at the foot of every article — you don't need to add it.
- Link internally: from an article, link to the relevant `/conditions/...` page and any relevant `/non-surgical-treatments/...` page. This helps both readers and SEO.

## Content backlog (real patient questions — high search intent)

Drafts to work through over coming months:

- Do you need an MRI for back pain? *(published)*
- Cortisone vs PRP for knee osteoarthritis *(published)*
- How long should sciatica take to settle?
- Is it safe to exercise with knee osteoarthritis?
- What actually is a "slipped disc"?
- Shockwave therapy for plantar fasciitis: what to expect
- Tennis elbow that won't go away — what are the options?
- When is shoulder pain a rotator cuff problem?
- Do cortisone injections damage tendons?
- Red flags: back pain symptoms that need urgent review

## Repurposing LinkedIn articles

If adapting an existing LinkedIn article: paste the body, convert headings to Markdown (`##`/`###`), pull any citations into the `references` array, add a keyword-led title/description, attach a ≥1080px hero image, and run a compliance pass against the house-style points above before setting `draft: false`.
