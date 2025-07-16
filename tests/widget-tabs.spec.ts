// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/tabs`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/tabs`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível navegar entre as abas', () => {
  test('Deve mostrar o conteúdo de cada aba corretamente', async () => {
    await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible()
    await page.getByRole('tab', { name: 'Origin' }).click()
    await expect(page.getByText('Contrary to popular belief,')).toBeVisible()
    await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible()
    await page.getByRole('tab', { name: 'Use' }).click()
    await expect(page.getByText('It is a long established fact')).toBeVisible()
    await expect(page.getByText('Contrary to popular belief,')).not.toBeVisible()
    await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible()
  })
})
