// @ts-check
import { test, expect } from '@playwright/test'
import data from '../src/fixtures/data'
import  elements  from '../src/actions/elementsAction'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}elements`)
})

test.describe('O radio button deve ser selecionado corretamente', () => {
  test('Apenas um radio button deve ser selecionado por vez e o "No" não é habilitado', async () => {
    const CheckBox = await elements(page)
    await CheckBox.selectRadioButton({})
    await CheckBox.selectRadioButton({likeSite: 'No'})
  })
})
