// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../src/fixtures/data'
import { elementsLocators } from '../src/locators/elementsLocator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/links`)
})

test.describe('Ao clicar nos links, o usuário deve ser redirecionado corretamente para outra página', () => {
  test('Deve abrir "Home" em nova aba', async () => {
    const pagePromise = page.context().waitForEvent('page')
    await page.locator(elementsLocators.homeLink).click()
    const newPage = await pagePromise
    await newPage.waitForLoadState()
    await expect(newPage).toHaveURL(`${data.APP.URL}`)
  })

  test('Deve abrir "HomeURMqO" em nova aba', async () => {
    const pagePromise = page.context().waitForEvent('page')
    await page.locator(elementsLocators.homeURMqOLink).click()
    const newPage = await pagePromise
    await newPage.waitForLoadState()
    await expect(newPage).toHaveURL(`${data.APP.URL}`)
  })
})

test.describe('Ao clicar nos links, deve ser realizada a requisição API esperada', () => {
  test('Retorna 201 ao clicar em "Created"', async () => {
    await page.locator(elementsLocators.createdLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 201
    )

    expect(response.status()).toBe(201)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 201 and status text Created'
    )
  })

  test('Retorna 204 ao clicar em "No Content"', async () => {
    await page.locator(elementsLocators.noContentLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 204
    )

    expect(response.status()).toBe(204)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 204 and status text No Content'
    )
  })

  test('Retorna 301 ao clicar em "Moved"', async () => {
    await page.locator(elementsLocators.movedLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 301
    )

    expect(response.status()).toBe(301)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 301 and status text Moved Permanently'
    )
  })

  test('Retorna 400 ao clicar em "Bad Request"', async () => {
    await page.locator(elementsLocators.badRequestLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 400
    )

    expect(response.status()).toBe(400)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 400 and status text Bad Request'
    )
  })

  test('Retorna 401 ao clicar em "Unauthorized"', async () => {
    await page.locator(elementsLocators.unauthorizedLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 401
    )

    expect(response.status()).toBe(401)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 401 and status text Unauthorized'
    )
  })

  test('Retorna 403 ao clicar em "Forbidden"', async () => {
    await page.locator(elementsLocators.forbiddenLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 403
    )

    expect(response.status()).toBe(403)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 403 and status text Forbidden'
    )
  })

  test('Retorna 404 ao clicar em "Not Found"', async () => {
    await page.locator(elementsLocators.notFoundLink).click()
    const response = await page.waitForResponse(
      (response) => response.status() === 404
    )

    expect(response.status()).toBe(404)

    await expect(page.locator(elementsLocators.linkResponse)).toHaveText(
      'Link has responded with staus 404 and status text Not Found'
    )
  })
})
