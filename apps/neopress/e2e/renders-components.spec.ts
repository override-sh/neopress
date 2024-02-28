import {
    expect,
    test,
} from "@playwright/test";

test("has mock meta", async ({ page }) => {
    await page.goto("/");

    // Expect h1 to contain a substring.
    await expect(page.locator("meta[name='mock-component']")).toHaveAttribute("content", "mock content");
});
