// @ts-check
import { test, expect } from '@playwright/test'
import data from '../src/fixtures/data'
import { faker } from '@faker-js/faker'
import  elements  from '../src/actions/elementsAction'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}elements`)
})

test.describe('O checkbox deve ser selecionado corretamente', () => {
  test('Deve ser possível selecionar checkboxs e validar essa seleção', async () => {
    const CheckBox = await elements(page)
    await CheckBox.selecionarCheckbox({tipo: 'especifico', nomes: ['office']})
  })
})
