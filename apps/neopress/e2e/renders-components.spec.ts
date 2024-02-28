import {
    expect,
    test,
} from "@playwright/test";

test("has mock meta", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("meta[name='mock-component']")).toHaveAttribute("content", "mock content");
});

test("has mock providers", async ({ page }) => {
    await page.goto("/");

    expect(page.locator("#mock-component-providers")).toBeDefined();
});

test("has mock before body", async ({ page }) => {
    await page.goto("/");

    expect(page.locator("#mock-component-before-body")).toBeDefined();
});

test("has mock after body", async ({ page }) => {
    await page.goto("/");

    expect(page.locator("#mock-component-after-body")).toBeDefined();
});
