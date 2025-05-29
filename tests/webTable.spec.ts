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

test.describe('As informações da tabela devem ser visualizadas, editadas, excluídas, buscadas e criadas', () => {
  test('Deve ser possível adicionar novas informações para a tabela', async () => {
    const WebTable = await elements(page)
    await WebTable.addTable({})
  })

  test('Deve ser possível editar informações da tabela', async () => {
    const WebTable = await elements(page)
    await WebTable.editTable({newEmail: 'email@mail.com'})
  })

  // test('Deve ser possível buscar informações da tabela', async () => {
  //   const WebTable = await elements(page)
  //   await WebTable.searchTable({})
  // })

  // test('Deve ser possível deletar informações da tabela', async () => {
  //   const WebTable = await elements(page)
  //   await WebTable.deleteTable({})
  // })
})