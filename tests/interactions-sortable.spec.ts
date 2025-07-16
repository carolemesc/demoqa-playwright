// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import { interactionsLocators } from '../helpers/locators/interactions-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/sortable`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/sortable`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível reordenar os elementos via drag-and-drop', () => {
  test('Os elementos da lista devem ser reordenados de forma decrescente', async () => {
    await page.getByRole('tab', { name: 'List' }).click()
    const ordemAtual = await page
      .locator(interactionsLocators.listIten)
      .allTextContents()
    const ordemDecrescente = [...ordemAtual].reverse()

    for (let i = 0; i < ordemDecrescente.length; i++) {
      const texto = ordemDecrescente[i]

      const mover = page.getByLabel('List').getByText(texto)
      const ultimoItem = page
        .getByLabel('List')
        .getByText(ordemDecrescente[ordemDecrescente.length - 1])

      if (texto !== ordemDecrescente[ordemDecrescente.length - 1]) {
        await mover.dragTo(ultimoItem)
      }
    }

    const reordenado = await page
      .locator(interactionsLocators.listIten)
      .allTextContents()
    expect(reordenado).toEqual(ordemDecrescente)
  })

  test('Os elementos da grade devem ser reordenados de forma decrescente', async () => {
    await page.getByRole('tab', { name: 'Grid' }).click()
    const ordemAtual = await page
      .locator(interactionsLocators.gridIten)
      .allTextContents()
    console.log(ordemAtual)

    const ordemDecrescente = [...ordemAtual].reverse()

    for (let i = 0; i < ordemDecrescente.length; i++) {
      const texto = ordemDecrescente[i]
      const mover = page.getByLabel('Grid').getByText(texto)
      const ultimoItem = page
        .getByLabel('Grid')
        .getByText(ordemDecrescente[ordemDecrescente.length - 1])

      if (texto !== ordemDecrescente[ordemDecrescente.length - 1]) {
        await mover.dragTo(ultimoItem)
      }
    }

    const reordenado = await page
      .locator(interactionsLocators.gridIten)
      .allTextContents()
    expect(reordenado).toEqual(ordemDecrescente)
  })
})
