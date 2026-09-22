import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("descarga el PDF original por teclado y permite repetir", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("link", { name: "Descargar CV (PDF)" });
  await button.focus();
  const pending = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const download = await pending;
  expect(download.suggestedFilename()).toBe("DemianPieres.pdf");
  expect(await download.failure()).toBeNull();
  expect(await readFile((await download.path())!)).toEqual(await readFile("docs/DemianPieres.pdf"));
  await expect(button).toBeFocused();
  await expect.poll(async () => (await button.boundingBox())!.width).toBeLessThan(100);
  await expect(button).toHaveCSS("width", "196px");
  const repeat = page.waitForEvent("download");
  await button.click();
  expect(await (await repeat).failure()).toBeNull();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button).toHaveCSS("width", "196px");
  await expect(button.locator(".cv-download__title")).toHaveCSS("opacity", "1");
});

for (const width of [375, 390, 768, 1024, 1440]) {
  test(`CV centrado, ambos temas y sin solapamiento a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const theme of ["light", "dark"]) {
      if (theme === "dark") await page.getByRole("button", { name: "Modo oscuro" }).click();
      const button = page.getByRole("link", { name: "Descargar CV (PDF)" });
      const box = (await button.boundingBox())!;
      const nav = (await page.locator("nav").boundingBox())!;
      expect(Math.abs(box.x + box.width / 2 - (nav.x + nav.width / 2))).toBeLessThan(1);
      expect(nav.y - box.y - box.height).toBeGreaterThanOrEqual(16);
      expect(box.y).toBeGreaterThan(90);
      if (width >= 768 && width <= 1100) {
        const portrait = (await page.locator(".portrait").boundingBox())!;
        expect(box.y).toBeGreaterThan(portrait.y + portrait.height);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `artifacts/screenshots/cv-${theme}-${width}.png` });
    }
    await page.goto("/resume");
    await expect(page.getByRole("link", { name: "Descargar CV (PDF)" })).toHaveCount(0);
  });
}

test("descarga sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  const pending = page.waitForEvent("download");
  await page.getByRole("link", { name: "Descargar CV (PDF)" }).click();
  expect(await (await pending).failure()).toBeNull();
  await context.close();
});
