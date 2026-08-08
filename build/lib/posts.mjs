// Frontmatter parsing and post loading. Deliberately a small hand-rolled
// subset of YAML rather than a dependency: the schema is fixed and validated
// by gate.mjs, so anything the subset cannot express is a post that should be
// rejected, not silently reinterpreted.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const POSTS_DIR = 'content/posts';

const SCALAR_KEYS = new Set([
  'title',
  'date',
  'summary',
  'author',
  'slug',
  // Cover image and its provenance. The org's editorial floor is "never text
  // without images", and an image without recorded rights is a liability, so
  // the credit fields are mandatory wherever a cover is set.
  'cover',
  'coverAlt',
  'coverCaption',
  'coverCredit',
  'coverLicense',
  'coverSource',
]);
const LIST_KEYS = new Set(['tags', 'sources']);

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && /^(".*"|'.*')$/s.test(trimmed)) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// Returns {data, body}. Throws on a malformed block so a bad post fails the
// gate loudly instead of publishing with empty metadata.
export function parseFrontmatter(raw, file = '<string>') {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) {
    throw new Error(`${file}: missing opening --- frontmatter fence`);
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) {
    throw new Error(`${file}: missing closing --- frontmatter fence`);
  }
  const block = text.slice(4, end + 1);
  const body = text.slice(end + 4).replace(/^\n/, '');

  const data = {};
  let currentList = null;
  for (const [index, line] of block.split('\n').entries()) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue;
    const where = `${file}:${index + 2}`;

    const item = /^\s*-\s+(.*)$/.exec(line);
    if (item) {
      if (!currentList) throw new Error(`${where}: list item outside of a list key`);
      data[currentList].push(stripQuotes(item[1]));
      continue;
    }

    const pair = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!pair) throw new Error(`${where}: cannot parse frontmatter line: ${line}`);
    const [, key, rest] = pair;

    if (key in data) throw new Error(`${where}: duplicate frontmatter key "${key}"`);

    if (LIST_KEYS.has(key)) {
      currentList = key;
      const inline = rest.trim();
      if (inline === '') {
        data[key] = [];
      } else if (inline.startsWith('[') && inline.endsWith(']')) {
        const inner = inline.slice(1, -1).trim();
        data[key] = inner === '' ? [] : inner.split(',').map(stripQuotes).filter((v) => v !== '');
        currentList = null;
      } else {
        throw new Error(`${where}: "${key}" must be a block list or [a, b] inline list`);
      }
      continue;
    }

    if (!SCALAR_KEYS.has(key)) throw new Error(`${where}: unknown frontmatter key "${key}"`);
    if (rest.trim() === '') throw new Error(`${where}: "${key}" has no value`);
    data[key] = stripQuotes(rest);
    currentList = null;
  }

  return { data, body };
}

export function slugFromFilename(file) {
  return file.replace(/\.md$/, '');
}

export function listPostFiles(dir = POSTS_DIR) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries
    .filter((f) => f.endsWith('.md') && statSync(join(dir, f)).isFile())
    .sort();
}

export function loadPosts(dir = POSTS_DIR) {
  return listPostFiles(dir).map((file) => {
    const raw = readFileSync(join(dir, file), 'utf8');
    const { data, body } = parseFrontmatter(raw, file);
    return {
      file,
      slug: data.slug || slugFromFilename(file),
      data,
      body,
      wordCount: countWords(body),
    };
  });
}

// Counts prose words only: fenced code, inline code, URLs and markdown
// punctuation must not inflate a thin post past the length floor.
export function countWords(body) {
  const prose = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_~|-]/g, ' ');
  const words = prose.match(/[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’-]*/g);
  return words ? words.length : 0;
}
