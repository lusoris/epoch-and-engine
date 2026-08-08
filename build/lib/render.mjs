// HTML shell and page templates. Plain template literals rather than a
// framework: the output is a handful of static pages served by nginx.
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function readingTime(wordCount) {
  return Math.max(1, Math.round(wordCount / 220));
}

// The first tag doubles as the article's section label in the kicker.
function kicker(post) {
  const tag = (post.data.tags || [])[0];
  return tag ? tag.replace(/-/g, ' ') : 'History';
}

function sourceLink(source) {
  const parts = source.trim().split(/\s+/);
  const index = parts.findIndex((part) => /^https?:\/\//.test(part));
  if (index === -1) return escapeHtml(source);
  const url = parts[index];
  const label = parts.slice(0, index).join(' ').replace(/[—–-]\s*$/, '').trim() || url;
  return `<a href="${escapeHtml(url)}" rel="noopener nofollow">${escapeHtml(label)}</a>`;
}

// Sets a drop cap on the first body paragraph. Articles usually open with an
// "##" section heading, so this matches the first <p> wherever it falls rather
// than only at position 0. String.replace without /g hits the first match only.
function withDropCap(html) {
  return html.replace(/<p>([A-Za-z])/, '<p class="lede"><span class="dropcap">$1</span>');
}

function layout(site, { title, description, canonical, body, image, bodyClass = '' }) {
  return `<!doctype html>
<html lang="${escapeHtml(site.language)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.title)}" href="/feed.xml">
<link rel="stylesheet" href="/styles.css">
<meta name="theme-color" content="#f7f4ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#12100e" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(site.title)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
${image ? `<meta property="og:image" content="${escapeHtml(site.baseUrl + image)}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="masthead-inner">
    <a class="wordmark" href="/">Epoch<span class="amp">&amp;</span>Engine</a>
    <p class="masthead-tagline">${escapeHtml(site.tagline)}</p>
  </div>
  <div class="masthead-rule"><span></span><span></span></div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <p class="footer-wordmark">Epoch<span class="amp">&amp;</span>Engine</p>
      <p class="footer-blurb">${escapeHtml(site.description)}</p>
    </div>
    <nav class="footer-links" aria-label="Site">
      <p class="footer-heading">Elsewhere</p>
      <ul>
        <li><a href="/feed.xml">RSS feed</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </nav>
  </div>
  <p class="colophon">Every article is sourced and dated. Images are public domain or openly
  licensed, with provenance recorded in the repository.</p>
</footer>
</body>
</html>
`;
}

function card(post, { featured = false } = {}) {
  const href = `/posts/${escapeHtml(post.slug)}/`;
  const level = featured ? '2' : '3';
  const cover = post.data.cover
    ? `<a class="card-media" href="${href}" tabindex="-1" aria-hidden="true"><img src="${escapeHtml(
        post.data.cover,
      )}" alt="" loading="${featured ? 'eager' : 'lazy'}" decoding="async"></a>`
    : '';
  return `<article class="card${featured ? ' card-featured' : ''}">
  ${cover}
  <div class="card-body">
    <p class="kicker">${escapeHtml(kicker(post))}</p>
    <h${level} class="card-title"><a href="${href}">${escapeHtml(post.data.title)}</a></h${level}>
    <p class="card-summary">${escapeHtml(post.data.summary)}</p>
    <p class="byline"><time datetime="${escapeHtml(post.data.date)}">${escapeHtml(
      formatDate(post.data.date),
    )}</time> <span class="dot">·</span> ${readingTime(post.wordCount)} min read</p>
  </div>
</article>`;
}

export function renderIndex(site, posts) {
  const [lead, ...rest] = posts;
  const grid = rest.map((post) => card(post)).join('\n');

  const body = `<section class="hero">
  <p class="hero-eyebrow">${escapeHtml(site.description)}</p>
</section>
${lead ? `<section class="lead-story">\n${card(lead, { featured: true })}\n</section>` : ''}
${
  rest.length
    ? `<section class="archive">
  <h2 class="section-heading"><span>More from the archive</span></h2>
  <div class="card-grid">
${grid}
  </div>
</section>`
    : ''
}`;

  return layout(site, {
    title: `${site.title} — ${site.tagline}`,
    description: site.description,
    canonical: `${site.baseUrl}/`,
    image: posts.find((post) => post.data.cover)?.data.cover,
    bodyClass: 'page-home',
    body,
  });
}

export function renderPost(site, post, related = []) {
  const tags = (post.data.tags || [])
    .map((tag) => `<li>${escapeHtml(tag.replace(/-/g, ' '))}</li>`)
    .join('');
  const sources = (post.data.sources || [])
    .map((source) => `<li>${sourceLink(source)}</li>`)
    .join('\n      ');

  const cover = post.data.cover
    ? `<figure class="cover">
  <img src="${escapeHtml(post.data.cover)}" alt="${escapeHtml(post.data.coverAlt)}" loading="eager" decoding="async">
  <figcaption>
    ${post.data.coverCaption ? `<span class="cap">${escapeHtml(post.data.coverCaption)}</span>` : ''}
    <span class="credit"><a href="${escapeHtml(post.data.coverSource)}" rel="noopener nofollow">${escapeHtml(
      post.data.coverCredit,
    )}</a> · ${escapeHtml(post.data.coverLicense)}</span>
  </figcaption>
</figure>`
    : '';

  const more = related.length
    ? `<section class="related">
  <h2 class="section-heading"><span>Keep reading</span></h2>
  <div class="card-grid">
${related.map((r) => card(r)).join('\n')}
  </div>
</section>`
    : '';

  const body = `<article class="post">
  <header class="post-header">
    <p class="kicker">${escapeHtml(kicker(post))}</p>
    <h1>${escapeHtml(post.data.title)}</h1>
    <p class="standfirst">${escapeHtml(post.data.summary)}</p>
    <p class="byline"><time datetime="${escapeHtml(post.data.date)}">${escapeHtml(
      formatDate(post.data.date),
    )}</time> <span class="dot">·</span> ${readingTime(post.wordCount)} min read</p>
  </header>
  ${cover}
  <div class="prose">
${withDropCap(marked.parse(post.body).trim())}
  </div>
  <section class="sources">
    <h2>Sources</h2>
    <ol>
      ${sources}
    </ol>
  </section>
  ${tags ? `<ul class="tags">${tags}</ul>` : ''}
</article>
${more}`;

  return layout(site, {
    title: `${post.data.title} — ${site.title}`,
    description: post.data.summary,
    canonical: `${site.baseUrl}/posts/${post.slug}/`,
    image: post.data.cover,
    bodyClass: 'page-post',
    body,
  });
}

export function renderFeed(site, posts) {
  const items = posts
    .map(
      (post) => `  <item>
    <title>${escapeHtml(post.data.title)}</title>
    <link>${escapeHtml(site.baseUrl)}/posts/${escapeHtml(post.slug)}/</link>
    <guid isPermaLink="true">${escapeHtml(site.baseUrl)}/posts/${escapeHtml(post.slug)}/</guid>
    <pubDate>${new Date(`${post.data.date}T00:00:00Z`).toUTCString()}</pubDate>
    <description>${escapeHtml(post.data.summary)}</description>
  </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeHtml(site.title)}</title>
  <link>${escapeHtml(site.baseUrl)}/</link>
  <description>${escapeHtml(site.description)}</description>
  <language>${escapeHtml(site.language)}</language>
  <atom:link href="${escapeHtml(site.baseUrl)}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`;
}

export function renderSitemap(site, posts) {
  const urls = [`${site.baseUrl}/`, ...posts.map((post) => `${site.baseUrl}/posts/${post.slug}/`)];
  const entries = urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}
