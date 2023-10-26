import { test, expect } from "@playwright/test";

let context;
let page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  await context.tracing.start({ screenshots: true, snapshots: true });
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.tracing.stop({ path: "./test1.zip" });
  await context.close();
});

test("get started link", async ({ }) => {

  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);

  const getStarted = page.locator("text=Get Started");
  await expect(getStarted).toHaveAttribute("href", "/docs/intro");
  await getStarted.click();

  // Expects the page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("has title", async ({  }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
