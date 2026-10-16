#!/usr/bin/env node
/**
 * Standalone Browser-Driven Website Cloner & Harvester
 * Captures complete DOM, CSS, JS bundles, fonts, images, 3D models,
 * unpacks JavaScript source maps into src/, sanitizes trackers, and creates server.py.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');
const { SourceMapConsumer } = require('source-map');

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

function getChromePath() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No supported Chrome/Chromium installation found. Please ensure Google Chrome is installed.');
}

function sanitizePath(pathname) {
  let clean = decodeURIComponent(pathname.split('?')[0].split('#')[0]);
  if (!clean || clean === '/' || clean.endsWith('/')) {
    clean += 'index.html';
  }
  clean = clean.replace(/^[/\\]+/, '');
  clean = clean.replace(/\.\.[/\\]/g, '');
  return clean;
}

async function unpackSourceMap(mapContent, outDir) {
  try {
    const rawMap = typeof mapContent === 'string' ? JSON.parse(mapContent) : mapContent;
    await SourceMapConsumer.with(rawMap, null, async (consumer) => {
      for (const sourcePath of consumer.sources) {
        const content = consumer.sourceContentFor(sourcePath, true);
        if (content) {
          let rel = sourcePath
            .replace(/^webpack:\/\/[^/]*\//, '')
            .replace(/^webpack:\/\//, '')
            .replace(/^\/+/, '')
            .replace(/\.\.[/\\]/g, '');
          const dest = path.join(outDir, rel);
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.writeFileSync(dest, content, 'utf8');
        }
      }
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function cloneSite(targetUrl, outputFolderName, port = 8085) {
  const targetParsed = new URL(targetUrl);
  const baseOrigin = targetParsed.origin;
  const siteName = outputFolderName || targetParsed.hostname.replace(/^www\./, '');
  const outDir = path.resolve(process.cwd(), siteName);
  const srcDir = path.join(outDir, 'src');

  console.log(`\n============================================================`);
  console.log(`🌐 Cloning: ${targetUrl}`);
  console.log(`📁 Destination: ${outDir}`);
  console.log(`🔌 Local Server Port: ${port}`);
  console.log(`============================================================`);

  fs.mkdirSync(outDir, { recursive: true });

  const executablePath = getChromePath();
  const tempUserData = path.join('/tmp', `chrome_clone_${Date.now()}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    userDataDir: tempUserData,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  const downloadedAssets = new Map();
  const externalDomains = new Set();
  const jsFilesWithSourceMaps = [];

  page.on('response', async (res) => {
    try {
      const resUrl = res.url();
      const status = res.status();
      if (status >= 400 || resUrl.startsWith('data:') || resUrl.startsWith('blob:')) {
        return;
      }

      const resParsed = new URL(resUrl);
      const isSameOrigin = resParsed.origin === baseOrigin;
      const contentType = (res.headers()['content-type'] || '').toLowerCase();

      // Skip unwanted trackers during download
      if (
        resUrl.includes('google-analytics') ||
        resUrl.includes('googletagmanager') ||
        resUrl.includes('doubleclick') ||
        resUrl.includes('fathom') ||
        resUrl.includes('hotjar') ||
        resUrl.includes('segment.io')
      ) {
        return;
      }

      let filePath;
      if (isSameOrigin) {
        filePath = path.join(outDir, sanitizePath(resParsed.pathname));
      } else {
        externalDomains.add(resParsed.hostname);
        const extPath = path.join('_external', resParsed.hostname, sanitizePath(resParsed.pathname));
        filePath = path.join(outDir, extPath);
      }

      // Root HTML will be captured after full scroll
      if (contentType.includes('text/html') && (resParsed.pathname === '/' || resParsed.pathname === '')) {
        return;
      }

      const buffer = await res.buffer();
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
      downloadedAssets.set(resUrl, filePath);

      // Check for source maps
      if (contentType.includes('javascript') || resParsed.pathname.endsWith('.js')) {
        const text = buffer.toString('utf8');
        const match = text.match(/\/\/[#@]\s*sourceMappingURL=([^\s'"]+)/);
        if (match && match[1]) {
          const mapUrl = new URL(match[1], resUrl).href;
          jsFilesWithSourceMaps.push({ jsUrl: resUrl, mapUrl, filePath });
        }
      }
    } catch (e) {}
  });

  console.log(`⏳ Loading page: ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {
    console.warn(`⚠️ Network timeout reached, continuing with rendered DOM...`);
  });

  console.log(`📜 Scrolling page to activate lazy-loaded assets & 3D canvases...`);
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 150);
    });
  });

  await new Promise((r) => setTimeout(r, 4000));

  console.log(`📄 Capturing fully rendered DOM...`);
  const rawHtml = await page.content();
  const $ = cheerio.load(rawHtml);

  // Relativize external CDN script/link/image tags
  $('script[src], link[href], img[src]').each((_, el) => {
    const attr = el.tagName === 'link' ? 'href' : 'src';
    const val = $(el).attr(attr);
    if (!val) return;
    try {
      const parsed = new URL(val, baseOrigin);
      if (parsed.origin !== baseOrigin && externalDomains.has(parsed.hostname)) {
        $(el).attr(attr, `/_external/${parsed.hostname}${parsed.pathname}`);
      }
    } catch (e) {}
  });

  fs.writeFileSync(path.join(outDir, 'index.html'), $.html(), 'utf8');

  // Search & unpack Source Maps
  if (jsFilesWithSourceMaps.length > 0) {
    console.log(`🔍 Checking ${jsFilesWithSourceMaps.length} JS files for public Source Maps...`);
    let unpackedCount = 0;
    for (const item of jsFilesWithSourceMaps) {
      try {
        const mapRes = await page.evaluate(async (url) => {
          try {
            const resp = await fetch(url);
            if (!resp.ok) return null;
            return await resp.text();
          } catch (err) {
            return null;
          }
        }, item.mapUrl);

        if (mapRes && mapRes.length > 50) {
          const mapPath = item.filePath + '.map';
          fs.writeFileSync(mapPath, mapRes, 'utf8');
          const unpacked = await unpackSourceMap(mapRes, srcDir);
          if (unpacked) unpackedCount++;
        }
      } catch (err) {}
    }
    if (unpackedCount > 0) {
      console.log(`✨ Successfully unpacked ${unpackedCount} Source Maps into ${srcDir}`);
    }
  }

  await browser.close();
  try {
    fs.rmSync(tempUserData, { recursive: true, force: true });
  } catch (e) {}

  // Run clean.py sanitizer
  const cleanPy = path.join(__dirname, 'clean.py');
  if (fs.existsSync(cleanPy)) {
    try {
      execSync(`python3 "${cleanPy}" "${outDir}"`, { stdio: 'inherit' });
    } catch (e) {}
  }

  // Generate server.py
  const serverTplPath = path.join(__dirname, 'server_template.py');
  if (fs.existsSync(serverTplPath)) {
    let tpl = fs.readFileSync(serverTplPath, 'utf8');
    tpl = tpl.replace(/\{\{SITE_NAME\}\}/g, siteName).replace(/\{\{PORT\}\}/g, String(port));
    const destServer = path.join(outDir, 'server.py');
    fs.writeFileSync(destServer, tpl, 'utf8');
    try {
      fs.chmodSync(destServer, '755');
    } catch (e) {}
    console.log(`  ✓ Generated ${siteName}/server.py (port ${port})`);
  }

  // Generate README.md
  const readmeContent = `# ${siteName} — Local Offline Mirror

Cloned from: ${targetUrl}
Downloaded on: ${new Date().toISOString()}

## 📁 Directory Structure
- \`index.html\`: Clean, formatted DOM snapshot with animations and layout intact.
- Assets (\`_next/\`, \`assets/\`, \`css/\`, \`_external/\`): All downloaded styles, fonts, images, and models.
${fs.existsSync(srcDir) ? '- `src/`: Reconstructed original React / TypeScript / JavaScript source components from Source Maps.\n' : ''}
- \`server.py\`: Standalone local development server.

## 🚀 Running Locally
\`\`\`bash
cd ${siteName}
python3 server.py
# Open http://localhost:${port}/
\`\`\`
Or run with any custom port:
\`\`\`bash
python3 server.py 9000
\`\`\`
`;
  fs.writeFileSync(path.join(outDir, 'README.md'), readmeContent, 'utf8');

  console.log(`\n🎉 DONE! Website mirrored to: ${outDir}`);
  console.log(`Run locally: cd ${siteName} && python3 server.py\n`);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node clone.js <url> [target_folder] [port]');
  process.exit(1);
}

const targetUrl = args[0];
const targetFolder = args[1] || null;
const port = args[2] ? parseInt(args[2], 10) : 8085;

cloneSite(targetUrl, targetFolder, port).catch((err) => {
  console.error('Fatal error cloning site:', err);
  process.exit(1);
});
