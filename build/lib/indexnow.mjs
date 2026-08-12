// POST all post URLs to IndexNow after deploy.
// Safe to call repeatedly — duplicates are ignored by the API.
// Environment: INDEXNOW_HOST (required), site key file in static/.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';

function findKeyFile(dir) {
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry.endsWith('.txt') && /^[0-9a-f]{32}$/.test(entry.replace('.txt', ''))) {
        const path = join(dir, entry);
        return { filename: entry, path };
      }
    }
  } catch {
    // directory doesn't exist or is unreadable — skip it
  }
  return null;
}

function sendPing(host, key, urls) {
  const body = JSON.stringify({
    host,
    key,
    urlList: urls,
  });
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export async function ping(host, posts) {
  const baseUrl = new URL(host).origin;
  const slugs = posts.map((p) => p.slug);
  const urls = slugs.map((slug) => `${baseUrl}/posts/${slug}`);

  // Try the built output first, then source static/
  const keyFileDir = findKeyFile('out') || findKeyFile('static');
  if (!keyFileDir) {
    console.error('indexnow: no valid key file found in out/ or static/');
    return false;
  }

  const key = readFileSync(keyFileDir.path, 'utf8').trim();

  // IndexNow allows up to 100 URLs per request; batch if needed
  const BATCH = 100;
  let ok = true;
  for (let i = 0; i < urls.length; i += BATCH) {
    const slice = urls.slice(i, i + BATCH);
    try {
      const res = await sendPing(baseUrl, key, slice);
      if (!res.ok) {
        const text = await res.text();
        console.error(`indexnow: HTTP ${res.status} — ${text}`);
        ok = false;
      } else {
        console.log(`indexnow: pinged ${slice.length} URL(s) (batch ${(i / BATCH) + 1})`);
      }
    } catch (err) {
      console.error(`indexnow: request failed — ${err.message}`);
      ok = false;
    }
  }

  if (urls.length === 0) {
    console.error('indexnow: no URLs to ping');
    return false;
  }

  return ok;
}
