import puppeteer from "puppeteer";
import http from "http";
import fs from "fs";
import path from "path";

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
};

const server = http.createServer((request, response) => {
  let filePath = "." + request.url.split("?")[0];
  if (filePath == "./") filePath = "./index.html";
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || "application/octet-stream";
  fs.readFile(filePath, (error, content) => {
    if (!error) {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    } else {
      response.writeHead(404);
      response.end();
    }
  });
});

const OUT_DIR = path.resolve("docs/audit/baseline-screenshots");

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture(page, name, width, height) {
  await page.setViewport({ width, height });
  await delay(1000);
  const filename = path.join(OUT_DIR, `${name}_${width}x${height}.png`);
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`Saved ${filename}`);
}

async function runAudit() {
  console.log("Starting server...");
  await new Promise((resolve) => {
    server.listen(0, () => {
      resolve();
    });
  });

  const port = server.address().port;
  const BASE_URL = `http://localhost:${port}`;
  console.log(`Server listening on ${BASE_URL}`);

  console.log("Starting puppeteer...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`[Browser Error]: ${msg.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    console.log(`[Browser Exception]: ${error.message}`);
  });

  const routes = [
    { path: "/", name: "home" },
    { path: "/berita.html", name: "berita" },
    { path: "/showcase.html", name: "showcase" },
    {
      path: "/berita-detail.html?slug=decompe-5-resmi-dibuka",
      name: "berita-detail",
    },
    { path: "/showcase-detail.html?slug=codequest", name: "showcase-detail" },
  ];

  for (const route of routes) {
    console.log(`Visiting ${route.name}...`);
    try {
      await page.goto(`${BASE_URL}${route.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 5000,
      });
    } catch (e) {
      console.log(`Timeout ignored for ${route.name}`);
    }

    await capture(page, route.name, 1440, 900);
    await capture(page, route.name, 390, 844);

    if (route.name === "home") {
      await page.setViewport({ width: 390, height: 844 });
      await page.click("#burger");
      await delay(1000);
      await page.screenshot({
        path: path.join(OUT_DIR, `home_drawer_open_390x844.png`),
      });
      console.log(`Saved drawer open state.`);
      await page.click(".drawer__close");
      await delay(500);
    }

    if (route.name === "showcase") {
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluate(() => {
        document.querySelector(".pcard").click();
      });
      await delay(1000);
      await page.screenshot({
        path: path.join(OUT_DIR, `showcase_modal_open_1440x900.png`),
      });
      console.log(`Saved modal open state.`);
    }
  }

  await browser.close();
  server.close();
  console.log("Audit complete.");
}

runAudit().catch(console.error);
