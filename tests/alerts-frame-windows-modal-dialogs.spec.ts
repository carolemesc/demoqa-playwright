// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { alertsFrameWindowsLocators } from '../helpers/locators/alerts-frame-windows-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/modal-dialogs`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível visualizar o conteúdo do modal', () => {
  test('O conteúdo do modal pequeno deve ser visualizado normalmente', async () => {
    await page.getByRole('button', { name: 'Small modal' }).click()
    await expect(
      page.getByText('This is a small modal. It has very less content')
    ).toBeVisible()
    await page.locator(alertsFrameWindowsLocators.closeSmallModal).click()
  })

  test('O conteúdo do modal maior deve ser visualizado normalmente e de forma completa', async () => {
    await page.getByRole('button', { name: 'Large modal' }).click()
    await expect(
      page.getByText(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      )
    ).toBeVisible()
    await page.locator(alertsFrameWindowsLocators.closeLargeModal).click()
  })
})
