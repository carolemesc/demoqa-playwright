// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../src/fixtures/data'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/elements`)
})

test.describe('Os botões devem ser ativados com cliques específicos', () => {
  test('Deve ser possível ativar os três botões', async () => {
    await page.goto(`${data.APP.URL}/buttons`)
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick()
    await expect(page.getByText('You have done a double click')).toBeVisible({
      timeout: 1000,
    })
    await page
      .getByRole('button', { name: 'Right Click Me' })
      .click({ button: 'right' })

    await expect(page.getByText('You have done a right click')).toBeVisible({
      timeout: 1000,
    })

    await page.getByRole('button', { name: 'Click Me', exact: true }).click()
    await expect(page.getByText('You have done a dynamic click')).toBeVisible({
      timeout: 1000,
    })
  })
})
