import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elementsLocator'

/** @param {import('@playwright/test').Page} page */

const Elements = async (page) => {
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

    await expect(page.getByText(`Name:${fullName}`)).toBeVisible()
    await expect(page.getByText(`Email:${email}`)).toBeVisible()
    await expect(page.getByText(`Current Address :${address}`)).toBeVisible()
    await expect(
      page.getByText(`Permananet Address :${permanentAddress}`)
    ).toBeVisible()
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
        ).toBeVisible()
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
        ).toBeVisible()
        await page.locator('label').filter({ hasText: 'React' }).first().click()
        await expect(
          page.locator(elementsLocators.checkboxName).getByText('notes')
        ).toBeVisible()
        await expect(
          page.locator(elementsLocators.checkboxName).getByText('react')
        ).toBeVisible()
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
          ).toBeVisible()
        }
      }
    }
  }

  async function selectRadioButton({
    likeSite: _likeSite,
  }: {
    likeSite?: 'Yes' | 'Impressive' | 'No'
  }) {
    const likeSite = _likeSite || 'Yes'

    await page.goto(`${data.APP.URL}radio-button`)

    if (likeSite === 'No') {
      await expect(
        page.locator('label').filter({ hasText: 'No' })
      ).toBeDisabled()
    } else {
      await page
        .locator('label')
        .filter({ hasText: `${likeSite}` })
        .click()
      await expect(
        page.getByText(`You have selected ${likeSite}`, { exact: true })
      ).toBeVisible()
    }
  }

  async function addTable({
    firstName: _firstName,
    lastName: _lastName,
    email: _email,
    age: _age,
    salary: _salary,
    department: _department,
  }: {
    firstName?: string
    lastName?: string
    email?: string
    age?: string
    salary?: string
    department?: string
  }) {
    const firstName = _firstName || faker.person.firstName()
    const lastName = _lastName || faker.person.lastName()
    const email = _email || faker.internet.email()
    const age = _age || faker.number.int({ max: 99 }).toString()
    const salary = _salary || faker.number.int({ max: 9999999999 }).toString()
    const department = _department || faker.lorem.words({ min: 1, max: 3 })

    await page.goto(`${data.APP.URL}webtables`)

    await page.locator(elementsLocators.addTable).click()

    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName)
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName)
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email)
    await page.getByRole('textbox', { name: 'Age' }).fill(age)
    await page.getByRole('textbox', { name: 'Salary' }).fill(salary)
    await page.getByRole('textbox', { name: 'Department' }).fill(department)

    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByRole('gridcell', { name: `${firstName}`, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: `${lastName}`, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: `${age}`, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: `${email}`, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: `${salary}`, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: `${department}`, exact: true })
    ).toBeVisible()
  }

  async function editTable({
    newFirstName,
    newLastName,
    newEmail,
    newAge,
    newSalary,
    newDepartment,
  }: {
    newFirstName?: string
    newLastName?: string
    newEmail?: string
    newAge?: string
    newSalary?: string
    newDepartment?: string
  }) {
    await page.goto(`${data.APP.URL}webtables`)

    await page.locator(elementsLocators.firstEditButton).click()

    const oldFirstName = await page
      .getByRole('textbox', { name: 'First Name' })
      .inputValue()
    const oldLastName = await page
      .getByRole('textbox', { name: 'Last Name' })
      .inputValue()
    const oldEmail = await page
      .getByRole('textbox', { name: 'name@example.com' })
      .inputValue()
    const oldAge = await page.getByRole('textbox', { name: 'Age' }).inputValue()
    const oldSalary = await page
      .getByRole('textbox', { name: 'Salary' })
      .inputValue()
    const oldDepartment = await page
      .getByRole('textbox', { name: 'Department' })
      .inputValue()

    if (newFirstName) {
      await page.getByRole('textbox', { name: 'First Name' }).fill(newFirstName)
    }
    if (newLastName) {
      await page.getByRole('textbox', { name: 'Last Name' }).fill(newLastName)
    }
    if (newEmail) {
      await page
        .getByRole('textbox', { name: 'name@example.com' })
        .fill(newEmail)
    }
    if (newAge) {
      await page.getByRole('textbox', { name: 'Age' }).fill(newAge)
    }
    if (newSalary) {
      await page.getByRole('textbox', { name: 'Salary' }).fill(newSalary)
    }
    if (newDepartment) {
      await page
        .getByRole('textbox', { name: 'Department' })
        .fill(newDepartment)
    }

    await page.getByRole('button', { name: 'Submit' }).click()

    if (newFirstName) {
      await expect(
        page.getByRole('gridcell', { name: `${oldFirstName}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newFirstName}`, exact: true })
      ).toBeVisible()
    }
    if (newLastName) {
      await expect(
        page.getByRole('gridcell', { name: `${oldLastName}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newLastName}`, exact: true })
      ).toBeVisible()
    }
    if (newEmail) {
      await expect(
        page.getByRole('gridcell', { name: `${oldEmail}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newEmail}`, exact: true })
      ).toBeVisible()
    }
    if (newAge) {
      await expect(
        page.getByRole('gridcell', { name: `${oldAge}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newAge}`, exact: true })
      ).toBeVisible()
    }
    if (newSalary) {
      await expect(
        page.getByRole('gridcell', { name: `${oldSalary}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newSalary}`, exact: true })
      ).toBeVisible()
    }
    if (newDepartment) {
      await expect(
        page.getByRole('gridcell', { name: `${oldDepartment}`, exact: true })
      ).not.toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: `${newDepartment}`, exact: true })
      ).toBeVisible()
    }
  }

  async function searchTable(params: type) {}

  async function deleteTable(params: type) {}

  return {
    fillTextBox,
    selectCheckbox,
    selectRadioButton,
    addTable,
    editTable,
  }
}

const elements = (page) => Elements(page)
export default elements
