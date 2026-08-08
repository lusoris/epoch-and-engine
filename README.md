# Epoch & Engine

The static site published at **<https://blog.ancilla.lol>** — long-form
histories of science and technology.

**Writing an article? Read [PUBLISHING.md](PUBLISHING.md).** It is the contract
CI enforces.

## Quick start

```bash
npm ci
npm run check     # unit tests + gate + build
open out/index.html
```

| Command | Does |
| --- | --- |
| `npm test` | unit tests for the publish contract |
| `npm run gate` | validates `content/posts/` against the contract |
| `npm run build` | gate, then render `out/` |
| `deploy/deploy.sh` | build and rsync `out/` to the VPS (CI does this) |

## Layout

```
content/posts/*.md    the articles — the only thing that reaches readers
site.config.json      title, tagline, base URL
build/build.mjs       renders out/
build/gate.mjs        the required content check
build/lib/checks.mjs  the publish contract, with unit tests alongside
static/               copied verbatim into out/ (styles.css)
deploy/deploy.sh      rsync to the blog.ancilla.lol docroot
.gitea/workflows/     quality (required check), auto-merge, deploy
```

The build is plain Node with one pinned dependency (`marked`) and no
framework. Output is a directory per post (`out/posts/<slug>/index.html`) plus
`feed.xml`, `sitemap.xml` and `robots.txt`.

## Deploy chain

`main` → `npm run build` → `deploy/deploy.sh` → rsync → `/var/www/ancilla-blog`

The deploy identity is `blog-deploy@151.80.87.68`, whose `authorized_keys`
pins `command="/usr/bin/rrsync -wo /var/www/ancilla-blog",restrict`: write-only
rsync, chrooted, no shell. Because the chroot root *is* the nginx docroot,
`DEPLOY_PATH` must be `.` — an absolute path fails on mkdir and a subdirectory
writes where nginx does not serve.

One repository secret is required:

| Secret | Used by | Purpose |
| --- | --- | --- |
| `VPS_DEPLOY_SSH_KEY` | `deploy-vps.yml` | the restricted rsync private key |

`auto-merge.yml` also reads `secrets.GITEA_TOKEN`, but that one is **not**
configured here — Gitea Actions injects it automatically per run, the same way
GitHub provides `GITHUB_TOKEN`. Do not add it as a repository secret.

After rsync, the deploy job fetches the homepage over HTTP and fails if it
still serves the placeholder — a write-only key cannot read back what it wrote,
so this is the only way to prove the bytes landed where nginx serves them.
