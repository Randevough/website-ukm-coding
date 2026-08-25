import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const routes = [
  { name: 'home', path: '/' },
  { name: 'kegiatan', path: '/kegiatan' },
  { name: 'kegiatan-detail', path: '/kegiatan/decompe-5-resmi-dibuka' },
  { name: 'projects', path: '/projects' },
  { name: 'projects-detail', path: '/projects/codequest' },
  { name: '404', path: '/404' },
];

const baseUrl = 'http://localhost:4321';
const outDir = path.resolve(__dirname, '../docs/ai-cycle/evidence/fase-2');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  
  for (const route of routes) {
    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });
      const url = `${baseUrl}${route.path}`;
      console.log(`Navigating to ${url} at ${vp.name}...`);
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        const filePath = path.join(outDir, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Saved screenshot to ${filePath}`);
      } catch (err) {
        console.error(`Failed to capture ${url}: ${err.message}`);
      }
      await page.close();
    }
  }
  
  await browser.close();
  console.log('Screenshots captured successfully.');
}

run().catch(console.error);
