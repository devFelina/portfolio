import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const waitForPortfolio = async (page) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
};

test("desktop portfolio journeys remain functional", async ({ page, request }) => {
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });

  await waitForPortfolio(page);

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  const expectedNavigation = {
    Home: "#hero",
    About: "#about",
    Projects: "#projects",
    Skills: "#skills",
  };

  for (const [label, href] of Object.entries(expectedNavigation)) {
    await expect(primaryNavigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
  }

  await primaryNavigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(primaryNavigation.getByRole("link", { name: "About", exact: true })).toHaveAttribute("aria-current", "location");

  await primaryNavigation.getByRole("link", { name: "Projects", exact: true }).click();
  const projectsSection = page.locator("#projects");
  await expect(projectsSection.locator("article")).toHaveCount(10);
  await expect(
    projectsSection.locator("article").getByText("Showcase", { exact: true }),
  ).toHaveCount(4);
  const featuredImages = projectsSection.locator("article img");
  await expect(featuredImages).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    const image = featuredImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }

  await projectsSection.getByRole("button", { name: /^Python / }).click();
  await expect(projectsSection.getByText("Showing 5 of 10 projects")).toBeVisible();
  await expect(projectsSection.locator("article")).toHaveCount(5);
  await projectsSection.getByRole("button", { name: /^All / }).click();
  await expect(projectsSection.locator("article")).toHaveCount(10);

  const modalTrigger = projectsSection.getByRole("button", { name: "View details for AI House Planner" });
  await modalTrigger.click();
  const dialog = page.getByRole("dialog", { name: "AI House Planner" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img", { name: /HomePlannerAI landing page/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(modalTrigger).toBeFocused();

  const externalLinks = projectsSection.locator('a[target="_blank"]');
  const externalLinkCount = await externalLinks.count();
  expect(externalLinkCount).toBeGreaterThan(0);
  for (let index = 0; index < externalLinkCount; index += 1) {
    await expect(externalLinks.nth(index)).toHaveAttribute("href", /^https:\/\//);
    await expect(externalLinks.nth(index)).toHaveAttribute("rel", /noopener/);
  }

  const resumeLink = page.getByRole("link", { name: "Download CV" });
  const resumeHref = await resumeLink.getAttribute("href");
  expect(resumeHref).toBe("/portfolio/Kushan_Chamikara_Resume.pdf");
  const resumeResponse = await request.get(resumeHref);
  expect(resumeResponse.ok()).toBeTruthy();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByLabel("Name")).toBeFocused();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter your email address.")).toBeVisible();
  await expect(page.getByText("Please enter a message.")).toBeVisible();

  const footerNavigation = page.getByRole("navigation", { name: "Footer navigation" });
  await expect(footerNavigation.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
  await expect(page.getByRole("link", { name: /Back to top/ })).toHaveAttribute("href", "#hero");

  expect(runtimeErrors).toEqual([]);
});

test("mobile menu supports pointer and keyboard dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await waitForPortfolio(page);

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("homepage has no serious automated accessibility violations", async ({ page }) => {
  await waitForPortfolio(page);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const seriousViolations = results.violations.filter(({ impact }) =>
    ["serious", "critical"].includes(impact),
  );
  expect(seriousViolations).toEqual([]);
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`layout remains contained at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await waitForPortfolio(page);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow).toBeFalsy();

    for (const selector of ["#hero", "#about", "#projects", "#experience", "#skills", "#contact"]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1),
      ).toBeFalsy();
    }

    const heroHeadingBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(heroHeadingBox).not.toBeNull();
    expect(heroHeadingBox.x).toBeGreaterThanOrEqual(-1);
    expect(heroHeadingBox.x + heroHeadingBox.width).toBeLessThanOrEqual(width + 1);

    const projectImages = page.locator("#projects article img");
    for (let index = 0; index < (await projectImages.count()); index += 1) {
      const image = projectImages.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
    }

    const modalTrigger = page
      .locator("#projects")
      .getByRole("button", { name: "View details for AI House Planner" });
    await modalTrigger.scrollIntoViewIfNeeded();
    await modalTrigger.click();
    const dialog = page.getByRole("dialog", { name: "AI House Planner" });
    await expect(dialog).toBeVisible();
    const dialogBox = await dialog.boundingBox();
    expect(dialogBox).not.toBeNull();
    expect(dialogBox.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox.x + dialogBox.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Escape");
    await expect(modalTrigger).toBeFocused();

    await page.screenshot({
      path: testInfo.outputPath(`portfolio-${width}px.png`),
      fullPage: true,
    });
  });
}

test("section navigation anchors position content without excessive blank space or header clipping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPortfolio(page);

  const waitForScrollEnd = async () => {
    await page.waitForFunction(() => {
      return new Promise((resolve) => {
        let lastY = window.scrollY;
        let count = 0;
        const interval = setInterval(() => {
          if (Math.abs(window.scrollY - lastY) < 1) {
            count += 1;
          } else {
            count = 0;
            lastY = window.scrollY;
          }
          if (count >= 5) {
            clearInterval(interval);
            resolve(true);
          }
        }, 40);
      });
    }, { timeout: 7000 }).catch(() => {});
  };

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  const header = page.locator("header");

  const sectionsToTest = [
    { id: "about", linkName: "About", headingSelector: '#about span:has-text("About Me")' },
    { id: "projects", linkName: "Projects", headingSelector: '#projects span:has-text("Selected Work")' },
    { id: "skills", linkName: "Skills", headingSelector: '#skills span:has-text("Technical Skills")' },
    { id: "contact", linkName: "Contact", headingSelector: '#contact span:has-text("Contact")' },
    { id: "hero", linkName: "Home", headingSelector: "#hero h1" },
  ];

  for (const { id, linkName, headingSelector } of sectionsToTest) {
    const navLink = primaryNavigation.getByRole("link", { name: linkName, exact: true });
    await navLink.click();
    await waitForScrollEnd();

    const headerBox = await header.boundingBox();
    const headerBottom = headerBox.y + headerBox.height;
    const headingBox = await page.locator(headingSelector).boundingBox();

    expect(headingBox).not.toBeNull();
    // Heading must be fully below the fixed header
    expect(headingBox.y).toBeGreaterThanOrEqual(headerBottom - 2);

    if (id !== "hero") {
      // Content eyebrow begins cleanly below the header without excessive gap (between 20px and 110px)
      const gap = headingBox.y - headerBottom;
      expect(gap).toBeGreaterThanOrEqual(20);
      expect(gap).toBeLessThanOrEqual(110);

      // Section top aligns with header bottom (no exposed previous section content)
      const sectionBox = await page.locator(`#${id}`).boundingBox();
      const exposedGap = sectionBox.y - headerBottom;
      expect(exposedGap).toBeLessThanOrEqual(15);
      expect(exposedGap).toBeGreaterThanOrEqual(-15);
    } else {
      // Hero returns to document top
      const currentScrollY = await page.evaluate(() => window.scrollY);
      expect(currentScrollY).toBeLessThanOrEqual(5);
    }
  }

  // Direct hash navigation
  await page.goto("./#projects");
  await waitForScrollEnd();
  const directHeadingBox = await page.locator('#projects span:has-text("Selected Work")').boundingBox();
  const directHeaderBox = await header.boundingBox();
  expect(directHeadingBox.y).toBeGreaterThanOrEqual(directHeaderBox.y + directHeaderBox.height - 2);

  // History back and forward
  await primaryNavigation.getByRole("link", { name: "About", exact: true }).click();
  await waitForScrollEnd();
  await expect(page).toHaveURL(/#about$/);

  await page.goBack();
  await waitForScrollEnd();
  await expect(page).toHaveURL(/#projects$/);

  await page.goForward();
  await waitForScrollEnd();
  await expect(page).toHaveURL(/#about$/);
});
