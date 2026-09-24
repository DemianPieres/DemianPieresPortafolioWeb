import { test, expect } from "@playwright/test";

test("Inicio muestra las portadas reales y ofrece destinos válidos", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(4);
  await expect(page.getByText("Borrador · Por confirmar", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Portada pendiente", { exact: true })).toHaveCount(0);
  await expect(cards.first().getByRole("heading")).toHaveText("eCOMERCE-Web inteligente");
  await expect(cards.first().getByRole("img")).toHaveAttribute("alt", "Vista de eCOMERCE-Web inteligente");
  await expect.poll(() => cards.first().locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(cards.nth(1).getByRole("heading")).toHaveText("App Android para complejo de fútbol");
  await expect.poll(() => cards.nth(1).locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(cards.nth(2).getByRole("heading")).toHaveText("Sistema de web scraping para captar clientes potenciales");
  await cards.nth(2).scrollIntoViewIfNeeded();
  await expect.poll(() => cards.nth(2).locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(cards.nth(3).getByRole("heading")).toHaveText("PWA para gestionar tus finanzas personales");
  await cards.nth(3).scrollIntoViewIfNeeded();
  await expect.poll(() => cards.nth(3).locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(cards.locator("a")).toHaveCount(0);
  await expect(page.locator(".home-intro a")).toHaveAttribute("href", "/about");
  await expect(page.locator(".featured-heading a")).toHaveAttribute("href", "https://github.com/DemianPieres");
  await page.getByRole("link", { name: "Explorar más proyectos" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(cards).toHaveCount(4);
  await page.getByRole("link", { name: "Volver al inicio de la página" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("revelados, cambios de movimiento reducido y regreso a Inicio", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const card of await page.locator(".project-card").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
  }

  // Cambiar la preferencia durante la sesión debe revertir todo estilo animado.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const element of await page.locator(".portrait, [data-home-reveal], .contact h2, .footer-top > p, .project-card").all()) {
    await expect(element).toHaveCSS("opacity", "1");
    await expect(element).toHaveCSS("transform", "none");
    await expect(element).toHaveCSS("filter", "none");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (let visit = 0; visit < 2; visit++) {
    await page.getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page).toHaveURL(/\/skills$/);
    await page.getByRole("link", { name: "Inicio", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    const last = page.locator(".project-card").last();
    await last.scrollIntoViewIfNeeded();
    await expect(last).toHaveCSS("opacity", "1");
  }
});

for (const width of [390, 1440]) {
  test(`texto vinculado al scroll y reversible a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const heading = page.locator("#featured-title");
    await expect(heading).toHaveCSS("filter", "blur(10px)");
    const top = await heading.evaluate((element) => element.getBoundingClientRect().top + window.scrollY - 50);
    await page.evaluate((y) => window.scrollTo({ top: y - innerHeight * 0.5, behavior: "instant" }), top);
    await expect(heading).toHaveCSS("filter", "blur(0px)");
    await page.screenshot({ path: `artifacts/screenshots/home-text-clear-${width}.png` });
    await page.evaluate((y) => window.scrollTo({ top: y - innerHeight * 0.95, behavior: "instant" }), top);
    await expect.poll(async () => heading.evaluate((element) => parseFloat(getComputedStyle(element).filter.replace("blur(", "")))).toBeGreaterThan(5);
    await page.screenshot({ path: `artifacts/screenshots/home-text-blur-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(heading).toHaveCSS("filter", "none");
    await expect(heading).toHaveCSS("transform", "none");
  });
}

test("Inicio mantiene contenido y navegación sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".home-brand-fallback")).toBeVisible();
  await expect(page.locator(".home-brand-fallback")).toHaveText("DemianPieres.Dev");
  for (const card of await page.locator(".project-card").all()) {
    await expect(card).toHaveCSS("opacity", "1");
  }
  await page.getByRole("link", { name: "Explorar más proyectos" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await context.close();
});
