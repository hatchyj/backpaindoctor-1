# Netlify Visual Editor — setup & usage

This repo is configured for the **Netlify Visual Editor** (a click-to-edit UI over the site's content). The in-repo configuration is done; the steps below cover enabling it on Netlify and running it.

## What's already in the repo

- **`stackbit.config.ts`** — the Visual Editor configuration. Uses a **Git content source** (edits write straight back to the markdown/JSON files in this repo) and defines editable models for the homepage, About, Patient Journey, Book Appointment, the Treatments index + treatment pages, the Conditions index + condition pages, the Resources index + articles, authors, and the site config (footer, CTA band, credential strip, business/NAP details).
- **`astro.config.mjs`** — a dev-only `vite.server.hmr` tweak so the editor container can live-refresh. No effect on the production build.
- **Dev dependencies** — `@stackbit/types`, `@stackbit/cms-git`, `@stackbit/cli` (in `devDependencies`).

## Enable it on Netlify (dashboard — one-time)

> The Visual Editor is a Netlify feature gated by plan entitlement. **Confirm it's included on your plan first** (Netlify dashboard → the project → look for *Visual editor*, or check current plan features). If it isn't included, the repo config is harmless and will simply sit unused until you enable it.

1. In the Netlify dashboard, open the **backpaindoctor** project.
2. Find **Visual editor** (under the project, or via *Add Visual Editor* / the Visual Editor section).
3. Connect it to this repository and choose the branch to edit — start with **`site-overhaul-draft`** (or `main` once merged). Editing a non-production branch is the safe default.
4. Netlify spins up a cloud container, runs the Astro dev server using the `devCommand` in `stackbit.config.ts`, and opens the editor.

## Run it locally (optional, for testing)

```bash
# terminal 1 — Astro dev server
yarn dev

# terminal 2 — Visual Editor (default port 3000; point it at Astro's port)
npx stackbit dev --port 4321
```

Then open the URL the `stackbit dev` command prints.

## What you can edit

Every modelled page appears in the editor's sidebar/sitemap. You can edit text, lists (treatment cards, FAQs, symptoms, credentials), and images through forms, and the changes are written back as commits to the connected branch. Page body prose (the markdown under the frontmatter) is editable on treatment and condition pages.

## Good to know / caveats

- **`stackbit validate` reports "0 models".** This is expected: the CLI's `validate` command does not introspect Git `contentSources`, so it can't see models defined there. The config still loads (`✔ configuration is valid`). Don't rely on `validate` for this setup — verify in `stackbit dev` instead.
- **First run may need field tweaks.** The models were authored against the content structure but not yet exercised in the live editor. If a field doesn't appear or maps oddly, adjust the matching entry in `stackbit.config.ts`.
- **Unmodelled fields are preserved.** Editing a page won't strip frontmatter fields that aren't in the model — the Git source round-trips the whole file.
- **MDX articles.** Resource articles are `.mdx`. Frontmatter (title, description, references, etc.) edits cleanly; editing the article body inline can be fussy if the MDX contains components. The two current articles are plain prose and are fine.
- **Images.** Image fields use static assets from `public/` (served at `/images/...`). The Resources hero images use a different relative convention (`src/images/...`) and are modelled as plain path strings, so set those by path.
- **Legacy/demo files aren't modelled** (e.g. `pricing/`, `__careers/`, `__case-studies/`, the theme demo pages). They aren't part of the live site, so they're intentionally not editable in the Visual Editor.

## Reference

- Astro + Visual Editor: https://docs.netlify.com/manage/visual-editor/frameworks/astro/
- Git content source: https://docs.netlify.com/manage/visual-editor/content-sources/git/
