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

function sourceLink(source) {
  const parts = source.trim().split(/\s+/);
  const index = parts.findIndex((part) => /^https?:\/\//.test(part));
  if (index === -1) return escapeHtml(source);
  const url = parts[index];
  const label = parts.slice(0, index).join(' ').replace(/[—–-]\s*$/, '').trim() || url;
  return `<a href="${escapeHtml(url)}" rel="noopener nofollow">${escapeHtml(label)}</a>`;
}

function layout(site, { title, description, canonical, body, image }) {
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
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
${image ? `<meta property="og:image" content="${escapeHtml(site.baseUrl + image)}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
</head>
<body>
<header class="site">
  <a class="wordmark" href="/">${escapeHtml(site.title)}</a>
  <p class="tagline">${escapeHtml(site.tagline)}</p>
</header>
<main>
${body}
</main>
<footer class="site">
  <p>${escapeHtml(site.title)} · <a href="/feed.xml">RSS</a></p>
</footer>
</body>
</html>
`;
}

export function renderIndex(site, posts) {
  const items = posts
    .map(
      (post) => `  <li class="entry">
    ${
      post.data.cover
        ? `<a class="thumb" href="/posts/${escapeHtml(post.slug)}/"><img src="${escapeHtml(
            post.data.cover,
          )}" alt="${escapeHtml(post.data.coverAlt)}" loading="lazy" decoding="async"></a>`
        : ''
    }
    <div class="entry-text">
      <p class="meta"><time datetime="${escapeHtml(post.data.date)}">${escapeHtml(formatDate(post.data.date))}</time></p>
      <h2><a href="/posts/${escapeHtml(post.slug)}/">${escapeHtml(post.data.title)}</a></h2>
      <p class="summary">${escapeHtml(post.data.summary)}</p>
    </div>
  </li>`,
    )
    .join('\n');

  return layout(site, {
    title: `${site.title} — ${site.tagline}`,
    description: site.description,
    canonical: `${site.baseUrl}/`,
    image: posts.find((post) => post.data.cover)?.data.cover,
    body: `<p class="intro">${escapeHtml(site.description)}</p>\n<ul class="entries">\n${items}\n</ul>`,
  });
}

export function renderPost(site, post) {
  const tags = (post.data.tags || [])
    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
    .join('');
  const sources = (post.data.sources || [])
    .map((source) => `<li>${sourceLink(source)}</li>`)
    .join('\n    ');

  const cover = post.data.cover
    ? `<figure class="cover">
    <img src="${escapeHtml(post.data.cover)}" alt="${escapeHtml(post.data.coverAlt)}" loading="eager" decoding="async">
    <figcaption>
      ${post.data.coverCaption ? `<span class="cap">${escapeHtml(post.data.coverCaption)}</span> ` : ''}
      <span class="credit"><a href="${escapeHtml(post.data.coverSource)}" rel="noopener nofollow">${escapeHtml(
        post.data.coverCredit,
      )}</a> · ${escapeHtml(post.data.coverLicense)}</span>
    </figcaption>
  </figure>`
    : '';

  const body = `<article>
  <header class="post">
    <p class="meta"><time datetime="${escapeHtml(post.data.date)}">${escapeHtml(formatDate(post.data.date))}</time></p>
    <h1>${escapeHtml(post.data.title)}</h1>
    <p class="summary">${escapeHtml(post.data.summary)}</p>
    ${tags ? `<ul class="tags">${tags}</ul>` : ''}
  </header>
  ${cover}
  ${marked.parse(post.body)}
  <section class="sources">
    <h2>Sources</h2>
    <ol>
    ${sources}
    </ol>
  </section>
</article>
<p class="back"><a href="/">← All articles</a></p>`;

  return layout(site, {
    title: `${post.data.title} — ${site.title}`,
    description: post.data.summary,
    canonical: `${site.baseUrl}/posts/${post.slug}/`,
    image: post.data.cover,
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
