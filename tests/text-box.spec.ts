// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { faker } from '@faker-js/faker'
import textbox from '../helpers/actions/text-box-function'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/elements`)
})

test.describe('O formulário deve ser exibido corretamente', () => {
  test('Deve ser possível preencher todos os campos, fazer o envio e visualizar as informações enviadas', async () => {
    const fullName = faker.person.fullName()
    const email = faker.internet.email()
    const address = faker.location.street()
    const permanentAddress = faker.location.secondaryAddress()

    const TextBox = await textbox(page)
    await TextBox.fillTextBox({
      fullName: fullName,
      email: email,
      address: address,
      permanentAddress: permanentAddress,
    })
  })
})
