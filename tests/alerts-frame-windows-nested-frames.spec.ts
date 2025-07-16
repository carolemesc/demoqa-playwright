// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { alertsFrameWindowsLocators } from '../helpers/locators/alerts-frame-windows-locator'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/nestedframes`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/nestedframes`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível visualizar o conteúdo de um frame dentro de outro frame', () => {
  test('O conteúdo dos dois nested frames devem estar visiveis', async () => {
    await expect(page.getByText('Sample Nested Iframe page.')).toBeVisible()
    await expect(
      page
        .locator(alertsFrameWindowsLocators.frame1)
        .contentFrame()
        .locator('iframe')
        .contentFrame()
        .getByText('Child Iframe')
    ).toBeVisible()
    await expect(
      page.locator(alertsFrameWindowsLocators.frame1).contentFrame().getByText('Parent frame')
    ).toBeVisible()
  })
})
