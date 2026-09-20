import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/skills", "/projects", "/about", "/resume"];
for (const width of [375, 390, 768, 1024, 1440]) {
  test(`shell responsive y rutas a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('nav [aria-current="page"]')).toHaveAttribute("href", route);
      await expect(page.locator("nav a")).toHaveCount(7);
      await expect(page.locator("nav")).toHaveCSS("opacity", "1");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const link of await page.locator("nav a").all()) {
        const box = await link.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `artifacts/screenshots/${route === "/" ? "home" : route.slice(1)}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test("teclado, navegación y enlaces externos", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Saltar al contenido")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("link", { name: "Skills", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page.locator('nav [aria-current="page"]')).toHaveAccessibleName("Skills");
  for (const brand of ["GitHub", "LinkedIn"]) {
    const link = page.getByRole("link", { name: `${brand} (se abre en otra pestaña)`, exact: true });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator(".contact-cta")).toHaveAttribute("href", "mailto:drkdemianpieres@gmail.com");
});

test("accesibilidad en ambas variantes y movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/skills"]) {
    await page.goto(route);
    await expect(page.locator("nav")).toHaveCSS("opacity", "1");
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
    const cta = page.locator(".contact-cta");
    await cta.hover();
    await expect(cta).toHaveCSS("transform", "none");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  }
});
