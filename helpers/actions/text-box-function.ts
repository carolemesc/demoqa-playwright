import { Page, test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elements-locator'
import gotoIfNeeded from './gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

const TextBox = async (page: Page) => {
  async function fillTextBox({
    fullName: _fullName,
    email: _email,
    address: _address,
    permanentAddress: _permanentAddress,
  }: {
    fullName?: string
    email?: string
    address?: string
    permanentAddress?: string
  }) {
    const fullName = _fullName || faker.person.fullName()
    const email = _email || faker.internet.email()
    const address = _address || faker.location.street()
    const permanentAddress =
      _permanentAddress || faker.location.secondaryAddress()

    await gotoIfNeeded(page, `${data.APP.URL}/text-box`)
    await page.getByRole('textbox', { name: 'Full Name' }).fill(fullName)
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email)
    await page.getByRole('textbox', { name: 'Current Address' }).fill(address)
    await page
      .locator(elementsLocators.permanentAddressInput)
      .fill(permanentAddress)
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText(`Name:${fullName}`)).toBeVisible({
      timeout: 1000,
    })
    await expect(page.getByText(`Email:${email}`)).toBeVisible({
      timeout: 1000,
    })
    await expect(page.getByText(`Current Address :${address}`)).toBeVisible({
      timeout: 1000,
    })
    await expect(
      page.getByText(`Permananet Address :${permanentAddress}`)
    ).toBeVisible({ timeout: 1000 })
  }

  return {
    fillTextBox,
  }
}

const textbox = (page) => TextBox(page)
export default textbox
