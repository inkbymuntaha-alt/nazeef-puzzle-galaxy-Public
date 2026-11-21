import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const moduleMatch = html.match(/<script\s+type=["']module["']\s*>([\s\S]*?)<\/script>/i);
assert.ok(moduleMatch, 'The page must contain its Three.js module script.');
const temp = join(tmpdir(), `nazif-game-${process.pid}.mjs`);
try {
  writeFileSync(temp, moduleMatch[1]);
  const check = spawnSync(process.execPath, ['--check', temp], { encoding: 'utf8' });
  assert.equal(check.status, 0, `Game JavaScript syntax error:\\n${check.stderr || check.stdout}`);
} finally {
  try { unlinkSync(temp); } catch {}
}

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
const references = new Set([...html.matchAll(/\$\(\s*["']([^"']+)["']\s*\)/g)].map(m => m[1]));
const missing = [...references].filter(id => !ids.has(id));
assert.deepEqual(missing, [], `Missing page elements: ${missing.join(', ')}`);
assert.ok(html.includes('Nazif Puzzle Galaxy 6.1'), 'Page title should identify the current game.');
assert.ok(html.includes('jumping<=0'), 'Trap collision must respect jumping.');
assert.ok(html.includes("e.code==='Space'"), 'Space must trigger a jump.');
assert.ok(html.includes('function saveNow(){try{localStorage.setItem'), 'Saving must fail safely when storage is unavailable.');
assert.ok(html.includes('if(init3D())start(0,1)'), 'Game must handle unavailable WebGL gracefully.');
assert.ok(html.includes('function start(world,lev){w=world;l=lev;clearBoard();generate();buildWorld();'), 'Previous level assets must be cleared before new mission data is generated.');
assert.ok(html.includes('removeVisual(keyMesh);keyMesh=null'), 'The golden key must disappear when collected.');
assert.ok(html.includes('removeVisual(buddyMesh);buddyMesh=null'), 'The rescued buddy must disappear when collected.');
assert.ok(html.includes('jumping<=0&&Math.hypot'), 'A jetpack jump must avoid alien contact.');
assert.ok(html.includes('CINEMATIC 3D ADVENTURE · 6.1'), 'Version label must match the release.');
console.log(`Game validation passed: module syntax, ${ids.size} unique page IDs, ${references.size} DOM references, core controls and safety checks.`);
