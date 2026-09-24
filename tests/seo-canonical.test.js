const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const origin = 'https://german-guarino.netlify.app';

async function read(file) {
  return fs.readFile(path.join(root, file), 'utf8');
}

test('canonical, Open Graph and structured-data URL point to the Netlify home page', async () => {
  const html = await read('index.html');
  assert.match(html, new RegExp(`<link rel="canonical" href="${origin}/">`));
  assert.match(html, new RegExp(`<meta property="og:url" content="${origin}/">`));
  const jsonld = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(jsonld, 'Psychologist structured data must be present');
  assert.equal(JSON.parse(jsonld[1]).url, `${origin}/`);
});

test('privacy canonical, sitemap and robots use the same Netlify origin', async () => {
  assert.match(await read('privacidad.html'), new RegExp(`<link rel="canonical" href="${origin}/privacidad.html">`));
  const sitemap = await read('sitemap.xml');
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`));
  assert.ok(sitemap.includes(`<loc>${origin}/privacidad.html</loc>`));
  assert.equal((await read('robots.txt')).trim().split('\n').at(-1).trim(), `Sitemap: ${origin}/sitemap.xml`);
});
