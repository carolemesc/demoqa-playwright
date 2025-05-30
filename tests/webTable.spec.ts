// @ts-check
import { test, expect } from '@playwright/test'
import data from '../src/fixtures/data'
import  webtable  from '../src/actions/webTableFunction'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}elements`)
})

test.describe('As informações da tabela devem ser visualizadas, editadas, excluídas, buscadas e criadas', () => {
  test('Deve ser possível adicionar novas informações para a tabela', async () => {
    const WebTable = await webtable(page)
    await WebTable.addTable({})
  })

  test('Deve ser possível editar informações da tabela', async () => {
    const WebTable = await webtable(page)
    await WebTable.editTable({newEmail: 'email@mail.com'})
  })

  test('Deve ser possível buscar informações da tabela', async () => {
    const WebTable = await webtable(page)
    const {department} = await WebTable.addTable({})
    await WebTable.searchTable({department})
  })

  test('Deve ser possível deletar informações da tabela', async () => {
    const WebTable = await webtable(page)
    await WebTable.deleteTable({})
  })
})