// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { elementsLocators } from '../helpers/locators/elements-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/dynamic-properties`)
})

test.beforeEach(async () => {
  await page.goto(`${data.APP.URL}/dynamic-properties`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível fazer upload e download corretamente', () => {
  test('Validar propriedades dinâmicas', async () => {
    //usado somente para pegar a class do elemento e validar esse valor em um tempo < 5s
    const HTMLAntes = await page
      .locator(elementsLocators.colorDynamicButton)
      .getAttribute('class')
    // console.log('HTMLAntes', HTMLAntes)

    await expect(
      page.locator(elementsLocators.enableDynamicButton)
    ).toBeEnabled({ timeout: 6000 })

    //text-danger é adicionada dinamicamente, e é essa classe que define o estilo de cor vermelha (rgb(220, 53, 69))
    await expect(page.locator(elementsLocators.colorDynamicButton)).toHaveCSS(
      'color',
      'rgb(220, 53, 69)',
      { timeout: 6000 }
    )
    await expect(page.locator(elementsLocators.colorDynamicButton)).toHaveClass(
      /text-danger/,
      { timeout: 6000 }
    )

    const HTMLDepois = await page
      .locator(elementsLocators.colorDynamicButton)
      .getAttribute('class')
    console.log('HTMLAntes', HTMLDepois)

    await expect(
      page.locator(elementsLocators.visibleDynamicButton)
    ).toBeVisible({ timeout: 6000 })
  })
})
