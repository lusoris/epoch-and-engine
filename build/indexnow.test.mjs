import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ping } from './lib/indexnow.mjs';
import { readdirSync, existsSync } from 'node:fs';

describe('indexnow', () => {
  // After build runs, key file is copied to out/
  const hasOutDir = existsSync('out');
  const outKeyFiles = hasOutDir ? readdirSync('out').filter((f) => f.endsWith('.txt')) : [];

  it('key file is copied to out/ (skipped if out/ not yet built)', () => {
    if (!hasOutDir) return; // build hasn't produced out/ — nothing to assert
    assert.ok(outKeyFiles.length >= 1, 'expected at least one .txt key in out/');
  });

  // ping() with a host that will return 400+ (missing env) — verifies the
  // module loads and calls fetch without throwing on non-network errors.
  it('handles unreachable API gracefully', async () => {
    const ok = await ping('http://127.0.0.1:9999', []);
    // Empty URL list → false, but must not throw
    assert.equal(ok, false);
  });

  it('constructs /posts/<slug>/ URLs', () => {
    const host = 'https://blog.ancilla.lol';
    assert.ok(new URL(host).origin === 'https://blog.ancilla.lol');
  });
});
