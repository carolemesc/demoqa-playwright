// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/elements`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/elements`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Ao visualizar a tela, as imagens válidas e quebradas são apresentadas como esperado', () => {
  test('Deve ser possível visualizar a imagem válida corretamente', async () => {
    const imageLocator = page.locator('img').nth(2)
    await expect(imageLocator).toHaveAttribute('src', '/images/Toolsqa.jpg')
    const imageUrl = await imageLocator.getAttribute('src')
    const response = await page.request.get(`${data.APP.URL}${imageUrl}`)
    expect(response.status()).toBe(200)
  })

  test('Deve ser possível visualizar a imagem quebrada corretamente', async () => {
    const imageLocator = page.locator('img').nth(3)
    await expect(imageLocator).toHaveAttribute('src', '/images/Toolsqa_1.jpg')
    const imageUrl = await imageLocator.getAttribute('src')
    const response = await page.request.get(`${data.APP.URL}${imageUrl}`)
    expect(response.status()).toBe(200)
  })
})

test.describe('Ao clicar nos links, o usuário deve ser redirecionado corretamente para a página em que a imagem é apresentada', () => {
  test('Deve ser possível visualizar a imagem corretamente ao clicar em um link válido', async () => {
    await page.getByRole('link', { name: 'Click Here for Valid Link' }).click()
    await expect(page).toHaveURL(`${data.APP.URL}`)
  })

  test('Usuário é direcionado para uma página de erro ao clicar em um link inválido', async () => {
    await page.getByRole('link', { name: 'Click Here for Broken Link' }).click()
    await expect(page).toHaveURL('http://the-internet.herokuapp.com/status_codes/500')
    const statusText = await page.locator('body').innerText()
    expect(statusText).toContain('500')
    expect(statusText).toContain('This page returned a 500 status code')
  })
})
