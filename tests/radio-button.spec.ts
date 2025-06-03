// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import radiobutton from '../helpers/actions/radio-button-function'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/elements`)
})

test.describe('O radio button deve ser selecionado corretamente', () => {
  test('Apenas um radio button deve ser selecionado por vez e o "No" não é habilitado', async () => {
    const CheckBox = await radiobutton(page)
    await CheckBox.selectRadioButton({})
    await CheckBox.selectRadioButton({ likeSite: 'No' })
  })
})
