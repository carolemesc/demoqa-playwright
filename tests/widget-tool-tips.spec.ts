// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/tool-tips`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/tool-tips`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve exibir a tooltip correta ao passar o mouse sobre o elemento', () => {
  test('Deve exibir a tooltip correta ao passar o mouse sobre cada um dos elementos', async () => {
    await page.getByRole('button', { name: 'Hover me to see' }).hover()
    await expect(page.getByText('You hovered over the Button')).toBeVisible()
    await page.getByRole('textbox', { name: 'Hover me to see' }).hover()
    await expect(page.getByText('You hovered over the text field')).toBeVisible()
    await page.getByRole('link', { name: 'Contrary' }).hover()
    await expect(page.getByText('You hovered over the Contrary')).toBeVisible()
    await page.getByRole('link', { name: '1.10.32' }).hover()
    await expect(page.getByText('You hovered over the 1.10.32')).toBeVisible()
  })
})
