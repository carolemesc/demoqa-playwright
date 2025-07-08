// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/browser-windows`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Novas janelas devem ser abertas ao interagir com botões', () => {
  test('New tab deve ser aberta', async () => {
    const newTabPromise = page.waitForEvent('popup')
    await page.getByRole('button', { name: 'New Tab' }).click()
    const newTab = await newTabPromise
    await expect(
      newTab.getByRole('heading', { name: 'This is a sample page' })
    ).toBeVisible()
  })

  test('New window deve ser aberta', async () => {
    const newWindowPromise = page.waitForEvent('popup')
    await page.getByRole('button', { name: 'New Window', exact: true }).click()
    const newWindow = await newWindowPromise
    await expect(
      newWindow.getByRole('heading', { name: 'This is a sample page' })
    ).toBeVisible()
  })
  
  test('New window message deve ser visivel em nova janela', async () => {
    const newWindowPromise = page.waitForEvent('popup')
    await page.getByRole('button', { name: 'New Window Message' }).click()
    const newWindow = await newWindowPromise
    await expect(newWindow.getByText('Knowledge increases by')).toBeVisible()
  })
})
