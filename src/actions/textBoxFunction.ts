import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elementsLocator'

/** @param {import('@playwright/test').Page} page */

const TextBox = async (page) => {
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

    await page.goto(`${data.APP.URL}text-box`)
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

  async function selectCheckbox({
    type: _type,
    names,
  }: {
    type?: 'todos' | 'aleatorio' | 'especifico'
    names?: string[]
  }) {
    const type = _type || 'aleatorio'

    await page.goto(`${data.APP.URL}checkbox`)

    let btnsFechados = await page
      .locator(elementsLocators.btnsFechadosSelector)
      .first()
      .isVisible()

    const textosEsperados = [
      'You have selected :',
      'home',
      'desktop',
      'notes',
      'commands',
      'documents',
      'workspace',
      'react',
      'angular',
      'veu',
      'office',
      'public',
      'private',
      'classified',
      'general',
      'downloads',
      'wordFile',
      'excelFile',
    ]

    if (type === 'todos') {
      await page.locator('label').click()
      for (const texto of textosEsperados) {
        await expect(
          page
            .locator(elementsLocators.checkboxName)
            .getByText(texto, { exact: true })
        ).toBeVisible({ timeout: 1000 })
      }
    } else {
      while (btnsFechados) {
        await page
          .locator(elementsLocators.btnsFechadosSelector)
          .first()
          .click()
        await page.waitForTimeout(500)
        btnsFechados = await page
          .locator(elementsLocators.btnsFechadosSelector)
          .first()
          .isVisible()
      }

      if (type === 'aleatorio') {
        await page.locator('label').filter({ hasText: 'Notes' }).first().click()
        await expect(
          page.locator(elementsLocators.checkboxName).getByText('notes')
        ).toBeVisible({ timeout: 1000 })
        await page.locator('label').filter({ hasText: 'React' }).first().click()
        await expect(
          page.locator(elementsLocators.checkboxName).getByText('notes')
        ).toBeVisible({ timeout: 1000 })
        await expect(
          page.locator(elementsLocators.checkboxName).getByText('react')
        ).toBeVisible({ timeout: 1000 })
      }

      if (type === 'especifico' && names) {
        for (const nome of names) {
          await page
            .locator('label')
            .filter({ hasText: `${names}` })
            .first()
            .click()
          await expect(
            page.locator(elementsLocators.checkboxName).getByText(`${nome}`)
          ).toBeVisible({ timeout: 1000 })
        }
      }
    }
  }

  return {
    fillTextBox,
    selectCheckbox,
  }
}

const textbox = (page) => TextBox(page)
export default textbox
