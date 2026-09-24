const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

async function testPage(host, postStatus = 200, netlifyProcessed = false) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const posts = [];
  await page.addInitScript(() => {
    window.__mailDrafts = [];
    window.open = (url) => { window.__mailDrafts.push(url); return null; };
  });
  await page.route('**/*', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname !== host) return route.fulfill({ status: 204, body: '' });
    if (req.method() === 'POST') {
      posts.push({ pathname: url.pathname, body: req.postData(), contentType: req.headers()['content-type'] });
      return route.fulfill({ status: postStatus, contentType: 'text/plain', body: 'test response' });
    }
    const pathname = url.pathname === '/' || url.pathname === '/German/' ? '/index.html' : url.pathname.replace(/^\/German/, '');
    const file = path.join(root, pathname.replace(/^\//, ''));
    try {
      let body = await fs.readFile(file);
      // Netlify removes this marker when form detection processed the HTML.
      if (netlifyProcessed && file.endsWith('index.html')) {
        body = Buffer.from(body.toString('utf8').replace(' data-netlify="true"', ''));
      }
      const contentType = file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream';
      return route.fulfill({ status: 200, body, contentType });
    } catch {
      return route.fulfill({ status: 404, body: '' });
    }
  });
  await page.goto(`https://${host}${host === 'floskinou.github.io' ? '/German/' : '/'}`, { waitUntil: 'load' });
  await page.locator('#consent-reject').click();
  return { browser, page, posts };
}

test('Netlify-processed contact form POSTs URL-encoded fields and confirms only after 2xx', async () => {
  const { browser, page, posts } = await testPage('german-guarino.netlify.app', 200, true);
  try {
    await page.locator('#cf_nombre').fill('Prueba Ficticia');
    await page.locator('#cf_email').fill('prueba@example.invalid');
    await page.locator('#contactForm button[type="submit"]').click();
    assert.equal(posts.length, 1, 'must POST once to Netlify, not prepare a mail draft');
    assert.equal(posts[0].pathname, '/');
    assert.match(posts[0].contentType, /^application\/x-www-form-urlencoded/);
    const data = new URLSearchParams(posts[0].body);
    assert.equal(data.get('form-name'), 'contact');
    assert.equal(data.get('name'), 'Prueba Ficticia');
    assert.equal(data.get('email'), 'prueba@example.invalid');
    assert.equal(data.get('bot-field'), '');
    assert.match(await page.locator('#contactFormStatus').innerText(), /Tu solicitud fue recibida en el sitio/);
    assert.deepEqual(await page.evaluate(() => window.__mailDrafts), []);
  } finally {
    await browser.close();
  }
});

test('unprocessed form never treats a static 200 as a captured submission', async () => {
  const { browser, page, posts } = await testPage('german-guarino.netlify.app');
  try {
    await page.locator('#cf_nombre').fill('Prueba Ficticia');
    await page.locator('#cf_email').fill('prueba@example.invalid');
    await page.locator('#contactForm button[type="submit"]').click();
    assert.deepEqual(posts, []);
    assert.equal((await page.evaluate(() => window.__mailDrafts)).length, 1);
    assert.match(await page.locator('#contactFormStatus').innerText(), /este sitio no puede confirmar su recepción/);
  } finally {
    await browser.close();
  }
});

test('processed form server failure cannot display a success confirmation', async () => {
  const { browser, page, posts } = await testPage('german-guarino.netlify.app', 503, true);
  try {
    await page.locator('#cf_nombre').fill('Prueba Ficticia');
    await page.locator('#cf_email').fill('prueba@example.invalid');
    await page.locator('#contactForm button[type="submit"]').click();
    assert.equal(posts.length, 1);
    assert.match(await page.locator('#contactFormStatus').innerText(), /No se pudo enviar/);
  } finally {
    await browser.close();
  }
});
