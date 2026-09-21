import { test, expect } from "@playwright/test";

test("partículas se dispersan con hover y se detienen al salir de pantalla o reducir movimiento", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as unknown as { particleFrames: number };
    state.particleFrames = 0;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (x, y, width, height) {
      if (this.canvas instanceof HTMLCanvasElement && this.canvas.classList.contains("particle-text__canvas")) state.particleFrames++;
      clear.call(this, x, y, width, height);
    };
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const brand = page.locator(".home-brand");
  const canvas = brand.locator("canvas");
  await expect(brand.locator('[data-ready="true"]')).toHaveCount(1);
  const outsideText = () => canvas.evaluate((element: HTMLCanvasElement) => {
    const data = element.getContext("2d")!.getImageData(0, 0, element.width, element.height).data;
    const ratio = Math.min(devicePixelRatio, 2);
    let count = 0;
    for (let i = 3; i < data.length; i += 4) {
      const y = Math.floor(i / 4 / element.width) / ratio;
      if ((y < 200 || y > 272) && data[i] > 128) count++;
    }
    return count;
  });
  await expect.poll(outsideText).toBeLessThan(30);
  await brand.hover();
  await expect.poll(outsideText).toBeGreaterThan(100);
  await page.screenshot({ path: "artifacts/screenshots/particle-name-scattered.png" });
  await page.mouse.move(1400, 700);
  await expect.poll(outsideText).toBeLessThan(30);
  await page.screenshot({ path: "artifacts/screenshots/particle-name-gathered.png" });

  const framesOverInterval = () => page.evaluate(async () => {
    const state = window as unknown as { particleFrames: number };
    const start = state.particleFrames;
    await new Promise((resolve) => setTimeout(resolve, 200));
    return state.particleFrames - start;
  });
  await expect.poll(framesOverInterval).toBeGreaterThan(0);
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect.poll(framesOverInterval).toBe(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(framesOverInterval).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(framesOverInterval).toBe(0);
  await expect.poll(outsideText).toBeLessThan(30);
  await brand.hover();
  await expect.poll(framesOverInterval).toBe(0);
  await page.getByRole("link", { name: "Skills", exact: true }).click();
  await expect(canvas).toHaveCount(0);
  await expect.poll(framesOverInterval).toBe(0);
});

test("partículas cambian de negro a blanco con el tema y se adaptan al redimensionar", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const canvas = page.locator(".home-brand canvas");
  const ink = () => canvas.evaluate((element: HTMLCanvasElement) => {
    const { data } = element.getContext("2d")!.getImageData(0, 0, element.width, element.height);
    // Las partículas pequeñas usan antialiasing: no tienen píxeles totalmente opacos.
    for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 64) return data[i];
    return -1;
  });
  await expect.poll(ink).toBe(0);
  await page.getByRole("button", { name: "Modo oscuro" }).click();
  await expect.poll(ink).toBe(255);
  await page.setViewportSize({ width: 375, height: 900 });
  await expect.poll(ink).toBe(255);
  await expect(page.locator(".home-brand-fallback")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
