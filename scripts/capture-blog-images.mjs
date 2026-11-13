import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "images");
fs.mkdirSync(outDir, { recursive: true });

const base = process.env.DEMO_URL ?? "http://localhost:3010";

async function shot(page, name) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: true });
  console.log("SAVED", name);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 960, height: 1100 },
  deviceScaleFactor: 1.5,
});

// --- Combobox ---
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "3단계 카테고리 선택기" }).waitFor();
await shot(page, "01-combobox-idle.png");

const combo = page.locator('[data-slot="combobox-input"]');
await combo.click();
await combo.fill("채소");
await page.waitForTimeout(500);
await shot(page, "02-combobox-filter-vegetable.png");

await page.keyboard.press("Enter");
await page.waitForTimeout(400);
await shot(page, "03-combobox-selected.png");

// --- Command ---
await page.goto(`${base}/command`, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "커맨드 팔레트" }).waitFor();
await shot(page, "04-command-idle.png");

await page.locator('[data-slot="dialog-trigger"]').click();
await page.locator('[data-slot="command-input"]').waitFor();
await page.waitForTimeout(400);
await shot(page, "05-command-open-suggested.png");

await page.locator('[data-slot="command-input"]').fill("카테고리");
await page.waitForTimeout(500);
await shot(page, "06-command-filter-category.png");

await page.keyboard.press("Enter");
await page.waitForTimeout(500);
await shot(page, "07-command-after-run.png");

await browser.close();
console.log("done");
