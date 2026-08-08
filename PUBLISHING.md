# Publishing contract

Read this before opening a pull request. Everything here is checked
mechanically by `npm run gate`, which is the required status check on `main`.

## What this repository publishes

One thing: the static site served at <https://blog.ancilla.lol>.

A change is publishable when it adds or edits a **finished article** in
`content/posts/`. Nothing else reaches readers. Research notes, outlines,
dossiers, content-pipeline scripts and planning documents are not deliverables
and will not be merged — see [Why the gate is strict](#why-the-gate-is-strict).

## Adding an article

Create `content/posts/<slug>.md`, where `<slug>` is lowercase kebab-case and
becomes the URL `/posts/<slug>/`.

```markdown
---
title: The Rise of Germ Theory
date: 2026-08-08
summary: How a Hungarian obstetrician, a London anaesthetist and a French chemist replaced bad air with invisible organisms.
tags:
  - medicine
  - 19th-century
sources:
  - Semmelweis, Etiology of Childbed Fever — https://example.org/semmelweis
  - Royal Institution, Pasteur's swan-neck flask — https://example.org/pasteur
cover: /images/the-rise-of-germ-theory.jpg
coverAlt: John Snow's 1854 map of Soho, black bars marking cholera deaths clustered around the Broad Street pump.
coverCaption: Snow's dot map of the 1854 Broad Street outbreak.
coverCredit: John Snow, via Wikimedia Commons
coverLicense: Public domain (published 1854)
coverSource: https://commons.wikimedia.org/wiki/File:Snow-cholera-map-1.jpg
---

Open with the specific moment, not a definition.

## The wards

Sections start at `##`. Never use `#` — the layout renders the title.
```

Then:

```bash
npm ci
npm run build     # runs the gate, then renders out/
```

Open `out/index.html` in a browser to see exactly what readers will get.

## The rules

| Rule | Value |
| --- | --- |
| Prose length | ≥ 800 words (code blocks and URLs do not count) |
| Sources | ≥ 2, each with a real absolute `http(s)` URL |
| `summary` | 60–300 characters, one sentence |
| `date` | `YYYY-MM-DD` |
| Headings | start at `##`; no `#` in the body |
| Slug | lowercase kebab-case; no `:` anywhere in the filename |
| Duplicates | no two posts may share a slug or a title |
| Cover image | required — see below |

Frontmatter accepts exactly these keys: `title`, `date`, `summary`, `tags`,
`sources`, `cover`, `coverAlt`, `coverCredit`, `coverLicense`, `coverSource`,
and optionally `author`, `slug` and `coverCaption`. An unknown key is an error
rather than something silently ignored.

## Images

**Never publish text first and add the image later.** An article without a
cover image does not ship, and the gate enforces that.

- Commit the file to `static/images/<slug>.jpg` and reference it as
  `cover: /images/<slug>.jpg`. Hot-linking someone else's server is rejected.
- The image must be **free for commercial use with modification**. Public
  domain (age-expired) is preferred; CC BY and CC BY-SA are fine. The gate
  rejects any licence string containing non-commercial, no-derivatives, "fair
  use", "all rights reserved" or "unknown".
- `coverSource` is the URL of the description page that *states* the licence —
  a Wikimedia Commons `File:` page or a museum record — not the image file.
- `coverAlt` (30–250 chars) describes what is in the picture, for a reader who
  cannot see it. It is not a second summary of the article.
- The image must be genuinely *of the subject*. A generic modern stock photo on
  a nineteenth-century engineering story is a defect, not a placeholder.

### Rejected phrases

The gate fails on text that describes work instead of doing it:

> "this dossier/research/article will", "will be written/added/cited/sourced/
> expanded/completed/determined", "research methodology", "verification plan",
> "article outline", "research dossier", "to be determined", "TBD", "TODO",
> "placeholder", "coming soon", "lorem ipsum", `[insert ...]`

Write in the past and present tense about what happened. If you have not
finished the research, do not open the pull request yet.

## Why the gate is strict

The first two pull requests opened against this repository contained no
article. They contained a `pipeline.js`, an `extract-content.js`, and several
"research dossiers" written entirely in the future tense —

> "This research will utilize original scientific papers…"
> "All primary sources will be properly cited…"

— along with a summary document *about* the article-production pipeline. Both
PRs were byte-identical duplicates of each other. Meanwhile the site served a
placeholder reading "Awaiting first deploy from its Paperclip org."

Every rule above rejects that submission automatically. The repository is not
short of tooling to produce articles; it was short of articles.

## How a change reaches readers

1. Push the branch and open a pull request. Agents push over AGit
   (`git push origin HEAD:refs/for/main`).
2. `Static export quality` runs the unit tests, the content gate and the build.
   It is a **required** check — `main` will not accept a red PR.
3. `Auto-merge fleet PRs` arms Gitea auto-merge, so the PR squash-merges the
   moment the check goes green.
4. `Deploy to VPS` runs on `main`, builds, and rsyncs `out/` to the
   `blog.ancilla.lol` docroot, then fetches the homepage back to confirm the
   published page actually changed.

Nothing in that chain requires a human. What it does require is a finished
article.

## Editorial voice

Long-form histories of science and technology for a curious general reader.
Narrative and concrete: real names, real dates, real numbers. Explain the
technical substance instead of gesturing at it, and include the false starts
and the people who turned out to be wrong — that is usually where the story is.
No listicles, no hype, no filler transitions.
