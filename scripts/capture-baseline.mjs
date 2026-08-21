import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:4321";
const OUT_DIR = path.resolve("previews/baseline");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const viewports = [
  { name: "320", width: 320, height: 700 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
];

const routes = [
  { path: "/", name: "home" },
  { path: "/kegiatan", name: "kegiatan-archive" },
  { path: "/kegiatan/decompe-5-resmi-dibuka", name: "kegiatan-detail" },
  { path: "/projects", name: "projects-archive" },
  { path: "/projects/codequest", name: "projects-detail" },
  { path: "/404", name: "404" },
];

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Launching browser for baseline capture...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const route of routes) {
    console.log(`\n=== Capturing Route: ${route.name} (${route.path}) ===`);
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: "networkidle0",
          timeout: 10000,
        });
      } catch (err) {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: "domcontentloaded",
        });
      }
      await delay(600);

      // Trigger motion reveals so all content is visible
      await page.evaluate(() => {
        document.querySelectorAll("[data-reveal]").forEach((el) => {
          el.classList.add("is-in");
        });
        document.querySelectorAll(".lineMask").forEach((el) => {
          el.classList.add("is-in");
        });
      });
      await delay(200);

      const filePath = path.join(OUT_DIR, `${route.name}_${vp.width}px.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved: ${route.name}_${vp.width}px.png`);
    }

    // Special states
    if (route.name === "home") {
      // Mobile Drawer open at 390px
      await page.setViewport({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await delay(500);
      try {
        await page.click("#burger");
        await delay(500);
        await page.screenshot({
          path: path.join(OUT_DIR, `home_drawer_open_390px.png`),
          fullPage: false,
        });
        console.log(`Saved: home_drawer_open_390px.png`);
      } catch (e) {
        console.log("Drawer trigger note:", e.message);
      }
    }

    if (route.name === "projects-archive") {
      // Modal open at 1440px
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}/projects`, {
        waitUntil: "domcontentloaded",
      });
      await delay(500);
      try {
        await page.evaluate(() => {
          const card = document.querySelector(".pcard");
          if (card) card.click();
        });
        await delay(500);
        await page.screenshot({
          path: path.join(OUT_DIR, `projects_modal_open_1440px.png`),
          fullPage: false,
        });
        console.log(`Saved: projects_modal_open_1440px.png`);
      } catch (e) {
        console.log("Modal trigger note:", e.message);
      }
    }
  }

  await browser.close();
  console.log("\nBaseline capture complete in previews/baseline/");
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
