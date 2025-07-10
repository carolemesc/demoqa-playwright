// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { alertsFrameWindowsLocators } from '../helpers/locators/alerts-frame-windows-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/nestedframes`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível visualizar o conteúdo de um frame dentro de outro frame', () => {
  test('O conteúdo dos dois frames devem estar visiveis', async () => {
    await expect(page.getByText('Sample Nested Iframe page.')).toBeVisible()
    await expect(
      page
        .locator('#frame1')
        .contentFrame()
        .locator('iframe')
        .contentFrame()
        .getByText('Child Iframe')
    ).toBeVisible()
    await expect(
      page.locator('#frame1').contentFrame().getByText('Parent frame')
    ).toBeVisible()
  })
})
