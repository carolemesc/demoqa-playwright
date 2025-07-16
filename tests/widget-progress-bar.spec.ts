// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/progress-bar`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/progress-bar`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível interagir com a barra de progresso corretamente', () => {
  test('Deve mover a barra até um valor específico quando clicar em "stop" e validar o resultado', async () => {
    await page.getByRole('button', { name: 'Start' }).click()
    await page.waitForFunction(
      () => {
        const progress = document.querySelector(widgetLocators.progressBar)
        return progress?.textContent?.includes('24%')
      },
      { timeout: 10000 }
    )

    await page.getByRole('button', { name: 'Stop' }).click()
    await expect(page.locator(widgetLocators.progressBar)).toContainText('24%')
  })
})
