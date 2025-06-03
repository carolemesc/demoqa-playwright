// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import checkbox from '../helpers/actions/check-box-function'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/elements`)
})

test.describe('O checkbox deve ser selecionado corretamente', () => {
  test('Deve ser possível selecionar checkboxs e validar essa seleção', async () => {
    const CheckBox = await checkbox(page)
    await CheckBox.selectCheckbox({ type: 'especifico', names: ['office'] })
  })
})
