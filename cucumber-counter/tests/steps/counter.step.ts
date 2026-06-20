import { Given, When, Then } from '@cucumber/cucumber';
import { CustomPage } from "../global-setup";
import { expect } from 'playwright/test';

let wordsGotten = 0;
let charactersGotten = 0;
const densityGotten: any[] = []

Given('the user navigates to the url: {string}', async function (this: CustomPage, url: string) {
    await this.page.goto(url);
});

Given('the user types in the textbox field: {string}', async function (this: CustomPage, text: string) {
    await this.page.locator('[id="box"]').fill(text);
});

When('the counter validate text', async function (this: CustomPage) {
  await this.page.locator('[id="version-btn"]').click()
  await this.page.locator('[id="version-btn"]').click()

  wordsGotten = parseInt(await this.page.locator('[id="word_count"]').textContent() ?? "", 10);
  charactersGotten = parseInt(await this.page.locator('[id="character_count"]').textContent() ?? "", 10);

  for (let i=0; i<3; i++){
    densityGotten.push({
      word: (await this.page.locator(`#kwd-accordion-data > a:nth-child(${i+1}) > span.word`).textContent() ?? "").trim(),
      qty: (await this.page.locator(`#kwd-accordion-data > a:nth-child(${i+1}) > span.badge`).textContent() ?? "").trim()
    })
  }
});

Then('the application returns the text has {int} words and {int} characters', async function (
    this: CustomPage, words: number, characters: number) {
    expect.soft(wordsGotten, `Words count should be ${words}`).toEqual(words);
    expect.soft(charactersGotten, `Character count should be ${characters}`).toEqual(characters);
});

Then('the keyword {int} density for the word {string} is {string}', async function (
    this: CustomPage, i: number, word: string, density: string) {
    expect(densityGotten[i - 1].qty, `Density for the word ${densityGotten[i - 1].word} count should be ${density}`).toEqual(density)
});
