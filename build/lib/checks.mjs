// The publish contract for content/posts/*.md.
//
// This exists because the org's first two pull requests contained "research
// dossiers" — documents written entirely in the future tense ("this research
// will utilise primary sources", "all sources will be properly cited") plus a
// pipeline script to produce articles later. They described work instead of
// doing it, and nothing publishable was ever committed. Every rule below is
// mechanical and rejects that class of submission at CI time.

export const MIN_WORDS = 800;
export const MIN_SOURCES = 2;
export const REQUIRED_KEYS = [
  'title',
  'date',
  'summary',
  'tags',
  'sources',
  // "Never publish text first and add images later" is the org's stated
  // editorial floor. Enforcing it here means an article cannot ship without a
  // cover, and a cover cannot ship without the rights record that makes it
  // safe to publish commercially.
  'cover',
  'coverAlt',
  'coverCredit',
  'coverLicense',
  'coverSource',
];

// Licences that permit commercial use with modification. Anything else — NC,
// ND, "fair use", "all rights reserved", unknown — must not reach the site.
const FORBIDDEN_LICENCE = /\b(non-?commercial|noncommercial|\bNC\b|no-?derivatives|\bND\b|fair use|all rights reserved|unknown|unclear|copyrighted)\b/i;

// Phrases that mean "the article has not been written yet". Matched
// case-insensitively against the body.
export const PLACEHOLDER_PATTERNS = [
  /\bthis (?:dossier|document|research|article) will\b/i,
  /\bwill (?:be (?:written|added|cited|sourced|expanded|completed|determined))\b/i,
  /\b(?:research methodology|verification plan|article outline|research dossier)\b/i,
  /\bto be (?:determined|written|added|confirmed)\b/i,
  /\bT\.?B\.?D\.?\b/,
  /\b(?:lorem ipsum|placeholder|coming soon|stub article)\b/i,
  /\bTODO\b/,
  /\[\s*(?:insert|add|fill in)[^\]]*\]/i,
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Returns an array of human-readable violation strings; empty means publishable.
export function checkPost(post) {
  const errors = [];
  const where = post.file;
  const { data, body } = post;

  if (/[:\\?*"<>|]/.test(post.file)) {
    errors.push(`${where}: filename contains a character that is unsafe in paths and URLs`);
  }
  if (!SLUG.test(post.slug)) {
    errors.push(`${where}: slug "${post.slug}" must be lowercase kebab-case`);
  }

  for (const key of REQUIRED_KEYS) {
    const value = data[key];
    const missing = value === undefined || (Array.isArray(value) ? value.length === 0 : String(value).trim() === '');
    if (missing) errors.push(`${where}: frontmatter is missing "${key}"`);
  }

  if (data.date !== undefined) {
    if (!ISO_DATE.test(data.date)) {
      errors.push(`${where}: date "${data.date}" must be YYYY-MM-DD`);
    } else if (Number.isNaN(Date.parse(`${data.date}T00:00:00Z`))) {
      errors.push(`${where}: date "${data.date}" is not a real calendar date`);
    }
  }

  if (data.summary !== undefined) {
    const length = data.summary.trim().length;
    if (length < 60 || length > 300) {
      errors.push(`${where}: summary is ${length} chars, must be 60-300`);
    }
  }

  const sources = data.sources || [];
  if (sources.length > 0 && sources.length < MIN_SOURCES) {
    errors.push(`${where}: has ${sources.length} source(s), needs at least ${MIN_SOURCES}`);
  }
  for (const source of sources) {
    // "Title — https://example.org/page": accept a label as long as a URL is present.
    const url = source.trim().split(/\s+/).find(isHttpUrl);
    if (!url) errors.push(`${where}: source "${source}" contains no absolute http(s) URL`);
  }

  if (data.cover !== undefined && !/^\/images\/[A-Za-z0-9._-]+\.(jpg|jpeg|png|webp)$/.test(data.cover)) {
    errors.push(
      `${where}: cover "${data.cover}" must be a site-root path like /images/name.jpg — ` +
        'images are committed to static/images/ and served locally, never hot-linked',
    );
  }
  if (data.coverAlt !== undefined) {
    const length = data.coverAlt.trim().length;
    if (length < 30 || length > 250) {
      errors.push(`${where}: coverAlt is ${length} chars, must be 30-250`);
    }
  }
  if (data.coverLicense !== undefined && FORBIDDEN_LICENCE.test(data.coverLicense)) {
    errors.push(
      `${where}: coverLicense "${data.coverLicense}" does not clearly permit commercial use ` +
        'with modification',
    );
  }
  if (data.coverSource !== undefined && !isHttpUrl(data.coverSource.trim())) {
    errors.push(`${where}: coverSource must be the absolute URL of the image's description page`);
  }

  if (post.wordCount < MIN_WORDS) {
    errors.push(`${where}: ${post.wordCount} words of prose, minimum is ${MIN_WORDS}`);
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    const hit = pattern.exec(body);
    if (hit) {
      errors.push(
        `${where}: contains unwritten-work marker ${JSON.stringify(hit[0])} — ` +
          'publish the finished article, not a plan to write one',
      );
    }
  }

  // H1 belongs to the layout, which renders frontmatter.title. A body H1
  // produces two competing top-level headings on the page.
  if (/^#\s+\S/m.test(body)) {
    errors.push(`${where}: body uses an H1 — start sections at "##", the layout renders the title`);
  }

  return errors;
}

export function checkCollection(posts) {
  const errors = [];
  const bySlug = new Map();
  const byTitle = new Map();

  for (const post of posts) {
    const slug = post.slug;
    if (bySlug.has(slug)) {
      errors.push(`${post.file}: duplicate slug "${slug}" (also ${bySlug.get(slug)})`);
    } else {
      bySlug.set(slug, post.file);
    }

    const title = (post.data.title || '').trim().toLowerCase();
    if (title) {
      if (byTitle.has(title)) {
        errors.push(`${post.file}: duplicate title "${post.data.title}" (also ${byTitle.get(title)})`);
      } else {
        byTitle.set(title, post.file);
      }
    }
  }

  return errors;
}

export function checkAll(posts) {
  return [...posts.flatMap(checkPost), ...checkCollection(posts)];
}
