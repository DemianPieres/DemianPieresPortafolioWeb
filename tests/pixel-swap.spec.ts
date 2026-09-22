import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`Pixel Swap revela ambos temas a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("/projects");
    const toggle = page.getByRole("button", { name: "Modo oscuro" });
    for (const theme of ["dark", "light"]) {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-pixel-swap", "true");
      await expect(page.locator("html")).toHaveAttribute("data-home-theme", theme);
      await expect.poll(() => page.evaluate(() => document.getAnimations().some(animation => animation instanceof CSSAnimation && animation.animationName === "pixel-swap-hold" && animation.playState === "running"))).toBe(true);
      await page.waitForTimeout(450);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement, "::view-transition-new(root)").maskImage)).toContain("data:image/svg+xml");
      await page.screenshot({ path: `artifacts/screenshots/pixel-swap-${theme}-${width}.png` });
      await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(toggle).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
}

test("tema y control disponibles en todas las rutas, incluido 404", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/skills", "/projects", "/about", "/resume", "/no-existe"]) {
    await page.goto(route);
    const toggle = page.getByRole("button", { name: "Modo oscuro" });
    await expect(toggle).toBeVisible();
    for (const pressed of ["true", "false"]) {
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-pressed", pressed);
      await expect(page.locator(".page-shell")).toHaveCSS("background-color", pressed === "true" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)");
      await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(audit.violations).toEqual([]);
    }
  }
});

test("clics rápidos, resize y navegación limpian la transición", async ({ page }) => {
  await page.goto("/projects");
  const toggle = page.getByRole("button", { name: "Modo oscuro" });
  await toggle.click();
  await toggle.click();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
  await toggle.click();
  await page.getByRole("link", { name: "Skills", exact: true }).click();
  await expect(page).toHaveURL(/skills/);
  await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
  await toggle.click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
});

for (const throws of [false, true]) {
  test(`fallback de API ausente o fallida (${throws})`, async ({ page }) => {
    await page.addInitScript((throws) => {
      Object.defineProperty(document, "startViewTransition", { value: throws ? () => { throw new Error("Unavailable"); } : undefined });
    }, throws);
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Modo oscuro" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).not.toHaveAttribute("data-pixel-swap");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  });
}
