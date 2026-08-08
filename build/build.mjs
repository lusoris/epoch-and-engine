#!/usr/bin/env node
// Renders content/posts/*.md into out/ as a static tree.
//
// URL shape is directory-per-post (out/posts/<slug>/index.html) because the
// nginx vhost for blog.ancilla.lol resolves with `try_files $uri $uri/ ...`,
// so /posts/<slug>/ serves without a redirect.
import { mkdirSync, readFileSync, rmSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { loadPosts } from './lib/posts.mjs';
import { renderFeed, renderIndex, renderPost, renderSitemap } from './lib/render.mjs';

const OUT = 'out';

function write(relativePath, contents) {
  const target = join(OUT, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
  return target;
}

function main() {
  const site = JSON.parse(readFileSync('site.config.json', 'utf8'));
  const posts = loadPosts().sort((a, b) => {
    if (a.data.date !== b.data.date) return a.data.date < b.data.date ? 1 : -1;
    return a.slug < b.slug ? -1 : 1;
  });

  if (posts.length === 0) {
    console.error('build: refusing to publish an empty site');
    process.exit(1);
  }

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  write('index.html', renderIndex(site, posts));
  for (const post of posts) {
    write(join('posts', post.slug, 'index.html'), renderPost(site, post));
  }
  write('feed.xml', renderFeed(site, posts));
  write('sitemap.xml', renderSitemap(site, posts));
  write(
    'robots.txt',
    `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`,
  );

  if (existsSync('static')) {
    cpSync('static', OUT, { recursive: true });
  }

  console.log(`build: wrote ${posts.length} post(s) to ${OUT}/`);
}

main();
