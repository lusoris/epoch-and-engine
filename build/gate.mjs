#!/usr/bin/env node
// Fails the build when content/posts does not satisfy the publish contract.
// Runs before every build and as its own CI check, so an unpublishable post
// can never reach the VPS.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadPosts, POSTS_DIR } from './lib/posts.mjs';
import { checkAll } from './lib/checks.mjs';

// checks.mjs stays pure so it can be unit-tested without a filesystem; the
// "does the referenced file actually exist" half lives here.
function checkCoverFiles(posts) {
  return posts.flatMap((post) => {
    const cover = post.data.cover;
    if (!cover || !cover.startsWith('/images/')) return [];
    const onDisk = join('static', cover.replace(/^\//, ''));
    return existsSync(onDisk)
      ? []
      : [`${post.file}: cover "${cover}" has no file at ${onDisk}`];
  });
}

function main() {
  let posts;
  try {
    posts = loadPosts();
  } catch (error) {
    console.error(`gate: ${error.message}`);
    process.exit(1);
  }

  if (posts.length === 0) {
    console.error(`gate: no posts found in ${POSTS_DIR}/ — the site would publish empty`);
    process.exit(1);
  }

  const errors = [...checkAll(posts), ...checkCoverFiles(posts)];
  if (errors.length > 0) {
    console.error(`gate: ${errors.length} problem(s) in ${posts.length} post(s):\n`);
    for (const error of errors) console.error(`  - ${error}`);
    console.error('\nSee PUBLISHING.md for the contract.');
    process.exit(1);
  }

  const words = posts.reduce((sum, post) => sum + post.wordCount, 0);
  console.log(`gate: ${posts.length} post(s) OK, ${words} words of prose`);
}

main();
