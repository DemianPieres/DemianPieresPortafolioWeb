import { test, expect } from "@playwright/test";

for (const index of [0, 1]) {
  test(`portada ${index + 1}: calidad, hover reversible y movimiento reducido`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const cover = page.locator(".project-cover--image").nth(index);
    await cover.scrollIntoViewIfNeeded();
    await expect(page.locator(".project-card").nth(index)).toHaveCSS("opacity", "1");
    await expect(cover.locator("img")).toHaveAttribute("src", /q=95/);
    await expect(cover.locator("img")).toHaveJSProperty("complete", true);
    await expect(cover).not.toHaveCSS("box-shadow", "none");
    await cover.hover({ position: { x: 60, y: 60 } });
    await expect.poll(() => cover.evaluate(el => Number(getComputedStyle(el).getPropertyValue("--cover-glow")))).toBeGreaterThan(0.2);
    await expect(cover.locator("img")).not.toHaveCSS("transform", "none");
    await page.screenshot({ path: `artifacts/screenshots/project-cover-hover-${index + 1}.png` });
    await page.mouse.move(0, 0);
    await expect.poll(() => cover.evaluate(el => Number(getComputedStyle(el).getPropertyValue("--cover-glow")))).toBe(0);
    await cover.hover();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(cover).toHaveCSS("transform", "none");
    await expect(cover.locator("img")).toHaveCSS("transform", "none");
    await page.getByRole("link", { name: "Inicio", exact: true }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Modo oscuro" }).click();
    await cover.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `artifacts/screenshots/project-cover-dark-${index + 1}.png` });
  });

  test(`portada ${index + 1}: scroll táctil sin inclinación`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    const cover = page.locator(".project-cover--image").nth(index);
    await cover.scrollIntoViewIfNeeded();
    await cover.tap();
    await expect(cover).toHaveCSS("transform", "none");
    await expect(cover.locator("img")).toHaveCSS("transform", "none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await cover.screenshot({ path: `artifacts/screenshots/project-cover-mobile-${index + 1}.png` });
    await context.close();
  });

}
