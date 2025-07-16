// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { interactionsLocators } from '../helpers/locators/interactions-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/selectable`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/selectable`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível selecionar os elementos após o clique', () => {
  test('Os elementos da lista devem ser selecionados após o clique', async () => {
    await page.getByRole('tab', { name: 'List' }).click()
    await page.getByText('Cras justo odio').click()
    await expect(page.getByText('Cras justo odio')).toHaveClass(/active/)
    await expect(page.getByText('Dapibus ac facilisis in')).not.toHaveClass(
      /active/
    )
  })

  test('Os elementos da grade devem ser selecionados após o clique', async () => {
    await page.getByRole('tab', { name: 'Grid' }).click()
    const itemsToSelect = ['Two', 'Six', 'Nine']
    for (const item of itemsToSelect) {
      await page.getByText(item).click()
    }

    for (const item of itemsToSelect) {
      await expect(page.getByText(item)).toHaveClass(/active/)
    }

    const todos = await page.locator(interactionsLocators.gridItenSelectable).all()

    for (const item of todos) {
      const texto = (await item.textContent())?.trim()
      if (!itemsToSelect.includes(texto || '')) {
        await expect(item).not.toHaveClass(/active/)
      }
    }
  })
})
