import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, countWords } from './lib/posts.mjs';
import { checkPost, checkCollection, MIN_WORDS } from './lib/checks.mjs';

const prose = (n) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ');

function post(overrides = {}, bodyOverride) {
  const data = {
    title: 'The Rise of Germ Theory',
    date: '2026-08-08',
    summary: 'A long enough summary of the article that clears the sixty character floor comfortably.',
    tags: ['medicine'],
    sources: ['https://example.org/a', 'https://example.org/b'],
    cover: '/images/germ-theory.jpg',
    coverAlt: 'A nineteenth-century engraving of a hospital ward with rows of iron beds.',
    coverCredit: 'Wellcome Collection',
    coverLicense: 'Public domain',
    coverSource: 'https://example.org/file/germ-theory',
    ...overrides,
  };
  const body = bodyOverride ?? `## Opening\n\n${prose(MIN_WORDS)}`;
  return { file: 'germ-theory.md', slug: 'germ-theory', data, body, wordCount: countWords(body) };
}

test('a complete post passes', () => {
  assert.deepEqual(checkPost(post()), []);
});

test('rejects the future-tense dossier that the org actually submitted', () => {
  const body = `## Overview\n\nThis dossier examines the emergence of quantum mechanics.\n\n## Research Methodology\n\nThis research will utilize original scientific papers.\n\n## Verification Plan\n\nCross-reference original papers.\n\n${prose(MIN_WORDS)}`;
  const errors = checkPost(post({}, body));
  assert.ok(errors.some((e) => /research methodology/i.test(e)), errors.join('\n'));
  assert.ok(errors.some((e) => /will utilize|unwritten-work/i.test(e)), errors.join('\n'));
});

test('rejects a post that is too short', () => {
  const errors = checkPost(post({}, '## Hi\n\nToo short.'));
  assert.ok(errors.some((e) => /minimum is 800/.test(e)), errors.join('\n'));
});

test('rejects missing frontmatter keys', () => {
  const p = post();
  delete p.data.sources;
  const errors = checkPost(p);
  assert.ok(errors.some((e) => /missing "sources"/.test(e)), errors.join('\n'));
});

test('rejects a single source', () => {
  const errors = checkPost(post({ sources: ['https://example.org/only'] }));
  assert.ok(errors.some((e) => /needs at least 2/.test(e)), errors.join('\n'));
});

test('rejects a source with no URL', () => {
  const errors = checkPost(post({ sources: ['Some book, page 12', 'https://example.org/b'] }));
  assert.ok(errors.some((e) => /no absolute http\(s\) URL/.test(e)), errors.join('\n'));
});

test('accepts a labelled source that contains a URL', () => {
  const errors = checkPost(post({ sources: ['Nature — https://example.org/a', 'https://example.org/b'] }));
  assert.deepEqual(errors, []);
});

test('rejects a non-ISO date', () => {
  assert.ok(checkPost(post({ date: '8 August 2026' })).some((e) => /YYYY-MM-DD/.test(e)));
});

test('rejects a body H1', () => {
  const errors = checkPost(post({}, `# Title again\n\n${prose(MIN_WORDS)}`));
  assert.ok(errors.some((e) => /uses an H1/.test(e)), errors.join('\n'));
});

test('rejects a colon in the filename, as the org PRs contained', () => {
  const p = post();
  p.file = 'articles/article-1-research-dossier:-the-rise-of-germ-theory.md';
  assert.ok(checkPost(p).some((e) => /unsafe in paths/.test(e)));
});

test('code blocks and URLs do not count toward the word floor', () => {
  const body = `## Code\n\n\`\`\`\n${prose(2000)}\n\`\`\`\n\n${prose(10)}`;
  assert.ok(countWords(body) < 100, `counted ${countWords(body)}`);
});

test('rejects an article with no cover image', () => {
  const p = post();
  delete p.data.cover;
  assert.ok(checkPost(p).some((e) => /missing "cover"/.test(e)));
});

test('rejects a cover with no rights record', () => {
  const p = post();
  delete p.data.coverLicense;
  delete p.data.coverCredit;
  const errors = checkPost(p);
  assert.ok(errors.some((e) => /missing "coverLicense"/.test(e)), errors.join('\n'));
  assert.ok(errors.some((e) => /missing "coverCredit"/.test(e)), errors.join('\n'));
});

test('rejects a non-commercial or no-derivatives licence', () => {
  for (const licence of ['CC BY-NC 4.0', 'CC BY-ND 4.0', 'Fair use', 'Unknown', 'All rights reserved']) {
    const errors = checkPost(post({ coverLicense: licence }));
    assert.ok(
      errors.some((e) => /does not clearly permit commercial use/.test(e)),
      `${licence} should have been rejected`,
    );
  }
});

test('accepts public domain and CC BY-SA', () => {
  for (const licence of ['Public domain (published 1858)', 'CC BY-SA 4.0', 'CC BY 4.0']) {
    assert.deepEqual(checkPost(post({ coverLicense: licence })), [], licence);
  }
});

test('rejects a hot-linked cover', () => {
  const errors = checkPost(post({ cover: 'https://upload.wikimedia.org/x.jpg' }));
  assert.ok(errors.some((e) => /never hot-linked/.test(e)), errors.join('\n'));
});

test('rejects unusable cover alt text', () => {
  assert.ok(checkPost(post({ coverAlt: 'photo' })).some((e) => /coverAlt is \d+ chars/.test(e)));
});

test('detects duplicate slugs and titles', () => {
  const a = post();
  const b = { ...post(), file: 'other.md' };
  const errors = checkCollection([a, b]);
  assert.ok(errors.some((e) => /duplicate slug/.test(e)), errors.join('\n'));
  assert.ok(errors.some((e) => /duplicate title/.test(e)), errors.join('\n'));
});

test('frontmatter parses block and inline lists', () => {
  const { data, body } = parseFrontmatter(
    '---\ntitle: X\ntags: [a, b]\nsources:\n  - https://example.org/a\n  - https://example.org/b\n---\nBody here\n',
  );
  assert.deepEqual(data.tags, ['a', 'b']);
  assert.deepEqual(data.sources, ['https://example.org/a', 'https://example.org/b']);
  assert.equal(body.trim(), 'Body here');
});

test('frontmatter rejects unknown keys and missing fences', () => {
  assert.throws(() => parseFrontmatter('---\nbogus: 1\n---\nx\n'), /unknown frontmatter key/);
  assert.throws(() => parseFrontmatter('no fence\n'), /missing opening/);
  assert.throws(() => parseFrontmatter('---\ntitle: a\ntitle: b\n---\nx\n'), /duplicate frontmatter key/);
});
