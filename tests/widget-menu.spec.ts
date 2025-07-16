// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/menu`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/menu`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve exibir os itens menus ao passar o mouse sobre o elemento', () => {
  test('Deve exibir todos os itens e subitens ao passar pelos menus', async () => {
    await expect(page.getByText('Main Item 1')).toBeVisible()
    await expect(page.getByText('Main Item 2')).toBeVisible()
    await expect(page.getByText('Main Item 3')).toBeVisible()
    await page.getByText('Main Item 2').hover()
    await expect(page.getByText('Sub Item').first()).toBeVisible()
    await expect(page.getByText('Sub Item').nth(1)).toBeVisible()
    await expect(page.getByText('SUB SUB LIST »')).toBeVisible()
    await page.getByText('Main Item 2').hover()
    await page.getByText('SUB SUB LIST »').hover()
    await expect(page.getByText('Sub Sub Item 1')).toBeVisible()
    await expect(page.getByText('Sub Sub Item 2')).toBeVisible()    
  })
})
