import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elementsLocator'

/** @param {import('@playwright/test').Page} page */

const Elements = async (page) => {
  async function fillTextBox(
    {
      fullName: _fullName,
      email: _email,
      address: _address,
      permanentAddress: _permanentAddress,
    } = {
      fullName: string,
      email: string,
      address: string,
      permanentAddress: string,
    }
  ) {
    const fullName = _fullName || faker.person.fullName()
    const email = _email || faker.internet.email()
    const address = _address || faker.location.street()
    const permanentAddress =
      _permanentAddress || faker.location.secondaryAddress()

    await page.goto(`${data.APP.URL}text-box`)
    await page.getByRole('textbox', { name: 'Full Name' }).fill(fullName)
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email)
    await page.getByRole('textbox', { name: 'Current Address' }).fill(address)
    await page.locator(elementsLocators.permanentAddressInput).fill(permanentAddress)
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText(`Name:${fullName}`)).toBeVisible()
    await expect(page.getByText(`Email:${email}`)).toBeVisible()
    await expect(page.getByText(`Current Address :${address}`)).toBeVisible()
    await expect(
      page.getByText(`Permananet Address :${permanentAddress}`)
    ).toBeVisible()
  }

  return {
    fillTextBox,
  }
}

const elements = (page) => Elements(page)
export default elements
