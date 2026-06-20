import { Before, After, Status, setDefaultTimeout, ITestCaseHookParameter } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

export interface CustomPage {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  attach: (executable: string | Buffer, mimeType: string) => void | Promise<void>;
}

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomPage) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomPage, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, "image/png");
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});