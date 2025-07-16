// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/slider`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/slider`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível interagir com o slider corretamente', () => {
  test('Deve mover o slider até um valor específico e validar o resultado', async () => {
    const value = '89'
    await page.getByRole('slider').fill(value)
    await expect(page.locator(widgetLocators.sliderValue)).toHaveValue(value)
  })
})
