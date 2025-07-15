// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/auto-complete`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/auto-complete`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível preencher valores no campo de autocompletar', () => {
  test('Deve ser possível preencher múltiplos valores no campo de `Type multiple color names`', async () => {
    const color1 = 'Black'
    const color2 = 'Purple'
    await page.locator(widgetLocators.autoCompleteMultipleInput).fill(color1)
    await page
      .locator(widgetLocators.selectOptionMultiple, { hasText: `${color1}` })
      .click()
    await expect(page.getByText(`${color1}`, { exact: true })).toBeVisible()
    await expect(
      page
        .locator('#autoCompleteContainer div')
        .filter({ hasText: `${color1}` })
        .nth(1)
    ).toBeVisible()
    await expect(
      page
        .locator('div')
        .filter({ hasText: new RegExp(`^${color1}$`) })
        .nth(1)
    ).toBeVisible()
    await page.locator(widgetLocators.autoCompleteMultipleInput).fill(color2)
    await page
      .locator(widgetLocators.selectOptionMultiple, { hasText: `${color2}` })
      .click()
    await expect(page.getByText(`${color2}`, { exact: true })).toBeVisible()
    await expect(page.getByText(`${color1}${color2}`)).toBeVisible()
  })

  test('Deve ser possível preencher um único valor no campo de `Type single color name`', async () => {
    const singleColor = 'Black'
    await page.locator(widgetLocators.autoCompleteSingleInput).fill(singleColor)
    await page.locator(widgetLocators.selectOptionSingle, { hasText: `${singleColor}`}).click()
    await expect(
      page
        .locator(widgetLocators.autoCompleteSingleContainer)
        .filter({ hasText: `${singleColor}` })
        .nth(1)
    ).toBeVisible()
  })
})
