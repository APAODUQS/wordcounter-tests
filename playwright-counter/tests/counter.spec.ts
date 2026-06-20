import { test, expect } from "@playwright/test";
import { config as dotenvConfig } from "dotenv";
import { Counter } from "../src/counter";

dotenvConfig();

const counter = new Counter();
const text = process.env.TEXT ?? "";
const n = 10;

test("counter is correct", async ({ page }) => {
  const [wordsExpexted, charactersExpected, densityExpected] =
    counter.countWords(text);
  await page.goto("");
  await page.locator('[id="box"]').fill(text);
  await page.locator('[id="version-btn"]').click();
  await page.locator('[id="version-btn"]').click();

  const wordsGotten = parseInt(
    (await page.locator('[id="word_count"]').textContent()) ?? "",
    10,
  );
  const charactersGotten = parseInt(
    (await page.locator('[id="character_count"]').textContent()) ?? "",
    10,
  );
  const densityGotten = [];

  for (let i = 0; i < n; i++) {
    densityGotten.push({
      word: (
        (await page
          .locator(`#kwd-accordion-data > a:nth-child(${i + 1}) > span.word`)
          .textContent()) ?? ""
      ).trim(),
      qty: (
        (await page
          .locator(`#kwd-accordion-data > a:nth-child(${i + 1}) > span.badge`)
          .textContent()) ?? ""
      ).trim(),
    });
  }

  densityExpected.length = n;
  expect
    .soft(wordsGotten, `Words count should be ${wordsExpexted}`)
    .toEqual(wordsExpexted);
  expect
    .soft(charactersGotten, `Character count should be ${charactersExpected}`)
    .toEqual(charactersExpected);
  expect(
    densityGotten,
    `Density count should be ${JSON.stringify(densityExpected)} but got ${JSON.stringify(densityGotten)}`,
  ).toEqual(densityExpected);
});
