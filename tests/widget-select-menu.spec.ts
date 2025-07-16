// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/select-menu`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/select-menu`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível selecionar valores nos menus', () => {
  test('Deve ser possível selecionar itens únicos e múltiplos', async () => {
    const selectValue = 'Group 2, option 1'
    const selectOne = 'Ms.'
    const oneColor = 'Blue'
    const colors = ['Green', 'Blue']
    const car = 'audi'

    await page.locator(widgetLocators.selectValueMenu).click()
    await page.getByText(selectValue, { exact: true }).click()
    await expect(
      page
        .locator(widgetLocators.selectValueOption)
        .filter({ hasText: `option ${selectValue},` })
        .first()
    ).toBeVisible()
    await page.locator(widgetLocators.selectOneMenu).click()
    await page.getByText(selectOne, { exact: true }).click()
    await expect(
      page
        .locator(widgetLocators.selectValueOption)
        .filter({ hasText: `${selectOne}` })
        .nth(1)
    ).toBeVisible()
    await page.locator(widgetLocators.oldStyleSelectMenu).selectOption(oneColor)
    await page.locator(widgetLocators.multiselectDropDown).nth(2).click()
    for (const color of colors) {
      await page.locator(widgetLocators.colorOptions[color]).click()
      await expect(page.locator('div').filter({ hasText: new RegExp(`^${color}$`) }).nth(1)).toBeVisible()
    }
    await page.locator('#cars').selectOption(car)
  })
})
