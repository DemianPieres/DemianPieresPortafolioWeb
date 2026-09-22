import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 390, 768, 1024, 1440]) {
  test(`Inicio invierte el tema sin overflow a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Modo oscuro" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    const box = await toggle.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toBeFocused();
    await expect(page.locator(".home .page-shell")).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await expect(page.locator(".home .page-shell")).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(page.locator(".editorial-footer")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".editorial-footer")).toHaveCSS("color", "rgb(0, 0, 0)");
    await expect(page.locator(".navbar")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".project-cover").last()).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".portrait")).toHaveCSS("filter", "none");
    await expect(page.locator('.home-brand [data-ready="true"]')).toHaveCount(1);
    const brand = await page.locator(".home-brand").boundingBox();
    expect(Math.abs(brand!.y + brand!.height / 2 - box!.y - box!.height / 2)).toBeLessThan(1);
    expect(brand!.x + brand!.width).toBeLessThan(box!.x - 12);
    await expect(page.locator(".home-brand .particle-text")).toHaveCSS("touch-action", "pan-y");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `artifacts/screenshots/home-dark-${width}.png`, fullPage: true });
    if (width === 390 || width === 1440) {
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(audit.violations).toEqual([]);
    }
    await toggle.press("Space");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".home .page-shell")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    expect(errors).toEqual([]);
  });
}

test("preferencia global persistente y navegación", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Modo oscuro" });
  await toggle.click();
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".home .page-shell")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await page.getByRole("link", { name: "Proyectos", exact: true }).click();
  await expect(page.locator(".page-shell")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Inicio", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("animación interrumpible y funcionamiento sin localStorage", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Almacenamiento bloqueado"); } });
  });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Modo oscuro" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => toggle.locator("svg").evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  await toggle.click();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(toggle.locator("svg")).toHaveCSS("transform", "none");
  await expect(page.locator(".theme-toggle-ripple")).toHaveCSS("opacity", "0");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(toggle.locator("svg")).toHaveCSS("transform", "none");
});
