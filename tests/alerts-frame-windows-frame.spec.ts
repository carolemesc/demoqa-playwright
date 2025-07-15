// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { alertsFrameWindowsLocators } from '../helpers/locators/alerts-frame-windows-locator'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/frames`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/frames`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível visualizar o conteúdo do frame', () => {
  test('O conteúdo dos dois frames devem estar visiveis', async () => {
    await expect(
      page
        .locator(alertsFrameWindowsLocators.frame1)
        .contentFrame()
        .getByRole('heading', { name: 'This is a sample page' })
    ).toBeVisible()
    await expect(
      page
        .locator(alertsFrameWindowsLocators.frame2)
        .contentFrame()
        .getByRole('heading', { name: 'This is a sample page' })
    ).toBeVisible()
  })
})
