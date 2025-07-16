// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import checkbox from '../helpers/actions/check-box-function'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/checkbox`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/checkbox`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('O checkbox deve ser selecionado corretamente', () => {
  test('Deve ser possível selecionar checkboxs e validar essa seleção', async () => {
    const CheckBox = await checkbox(page)
    await CheckBox.selectCheckbox({ type: 'especifico', names: ['office'] })
  })

  test('Checkbox desmarcados não devem aparecer na lista de seleção', async () => {
    const CheckBox = await checkbox(page)
    await CheckBox.selectCheckbox({ type: 'especifico', names: ['office'] })
    await CheckBox.deselectCheckbox({names: ['office', 'Public', 'ExcelFile']})
  })
})
