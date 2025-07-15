// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/accordian`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/accordian`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível expandir e visualizar todos os itens do acordeão com sucesso', () => {
  test('Um item deve ser expandido por vez enquanto os outros ficam reduzidos', async () => {
    await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible()
    await page.getByText('Where does it come from?').click()
    await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible()
    await expect(page.getByText('Contrary to popular belief,')).toBeVisible()
    await page.getByText('Why do we use it?').click()
    await expect(page.getByText('Contrary to popular belief,')).not.toBeVisible()
    await expect(page.getByText('It is a long established fact')).toBeVisible()
  })
})
