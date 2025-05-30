import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elementsLocator'
import gotoIfNeeded from './gotoIfNeeded'

/** @param {import('@playwright/test').Page} page */

const WebTable = async (page) => {

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

    await gotoIfNeeded(page, `${data.APP.URL}webtables`)

    await page.locator(elementsLocators.addTable).click()

    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName)
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName)
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email)
    await page.getByRole('textbox', { name: 'Age' }).fill(age)
    await page.getByRole('textbox', { name: 'Salary' }).fill(salary)
    await page.getByRole('textbox', { name: 'Department' }).fill(department)

    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByRole('button', { name: 'Submit' })).toBeHidden({
      timeout: 1000,
    })

    await expect(
      page.getByRole('gridcell', { name: `${firstName}`, exact: true })
    ).toBeVisible({ timeout: 1000 })
    await expect(
      page.getByRole('gridcell', { name: `${lastName}`, exact: true })
    ).toBeVisible({ timeout: 1000 })
    await expect(
      page.getByRole('gridcell', { name: `${age}`, exact: true })
    ).toBeVisible({ timeout: 1000 })
    await expect(
      page.getByRole('gridcell', { name: `${email}`, exact: true })
    ).toBeVisible({ timeout: 1000 })
    await expect(
      page.getByRole('gridcell', { name: `${salary}`, exact: true })
    ).toBeVisible({ timeout: 1000 })
    await expect(
      page.getByRole('gridcell', { name: `${department}`, exact: true })
    ).toBeVisible({ timeout: 1000 })

    return {
      firstName,
      lastName,
      age,
      email,
      salary,
      department,
    }
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
    await gotoIfNeeded(page, `${data.APP.URL}webtables`)

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
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newFirstName}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
    if (newLastName) {
      await expect(
        page.getByRole('gridcell', { name: `${oldLastName}`, exact: true })
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newLastName}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
    if (newEmail) {
      await expect(
        page.getByRole('gridcell', { name: `${oldEmail}`, exact: true })
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newEmail}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
    if (newAge) {
      await expect(
        page.getByRole('gridcell', { name: `${oldAge}`, exact: true })
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newAge}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
    if (newSalary) {
      await expect(
        page.getByRole('gridcell', { name: `${oldSalary}`, exact: true })
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newSalary}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
    if (newDepartment) {
      await expect(
        page.getByRole('gridcell', { name: `${oldDepartment}`, exact: true })
      ).not.toBeVisible({ timeout: 1000 })
      await expect(
        page.getByRole('gridcell', { name: `${newDepartment}`, exact: true })
      ).toBeVisible({ timeout: 1000 })
    }
  }

  async function searchTable({
    firstName,
    lastName,
    email,
    age,
    salary,
    department,
  }: {
    firstName?: string
    lastName?: string
    email?: string
    age?: string
    salary?: string
    department?: string
  }) {
    await gotoIfNeeded(page, `${data.APP.URL}webtables`)

    if (firstName) {
      await page
        .getByRole('textbox', { name: 'Type to search' })
        .fill(firstName)

      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(1)`)
          .first()
      ).toHaveText(firstName)
    } else if (lastName) {
      await page.getByRole('textbox', { name: 'Type to search' }).fill(lastName)
      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(2)`)
          .first()
      ).toHaveText(lastName)
    } else if (email) {
      await page.getByRole('textbox', { name: 'Type to search' }).fill(email)
      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(4)`)
          .first()
      ).toHaveText(email)
    } else if (age) {
      await page.getByRole('textbox', { name: 'Type to search' }).fill(age)
      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(3)`)
          .first()
      ).toHaveText(age)
    } else if (salary) {
      await page.getByRole('textbox', { name: 'Type to search' }).fill(salary)
      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(5)`)
          .first()
      ).toHaveText(salary)
    } else if (department) {
      await page
        .getByRole('textbox', { name: 'Type to search' })
        .fill(department)
      await expect(
        page
          .locator('.rt-tr[role="row"]')
          .locator(`.rt-td:nth-child(6)`)
          .first()
      ).toHaveText(department)
    } else {
      const searchBy = await page.getByRole('gridcell').first().innerText()
      await page.getByRole('textbox', { name: 'Type to search' }).fill(searchBy)
      await expect(
        page.getByRole('gridcell', { name: `${searchBy}`, exact: true })
      ).toHaveText(searchBy)
    }
  }

  async function deleteTable({
    firstNameDeleted: _firstNameDeleted,
    lastNameDeleted: _lastNameDeleted,
    emailDeleted: _emailDeleted,
    ageDeleted: _ageDeleted,
    salaryDeleted: _salaryDeleted,
    departmentDeleted: _departmentDeleted,
  }: {
    firstNameDeleted?: string
    lastNameDeleted?: string
    emailDeleted?: string
    ageDeleted?: string
    salaryDeleted?: string
    departmentDeleted?: string
  }) {
    await gotoIfNeeded(page, `${data.APP.URL}webtables`)

    const firstNameDeleted = _firstNameDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(1)`)
      .first()
      .inputValue()
    const lastNameDeleted = _lastNameDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(2)`)
      .first()
      .inputValue()
    const emailDeleted = _emailDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(4)`)
      .first()
      .inputValue()
    const ageDeleted = _ageDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(3)`)
      .first()
      .inputValue()
    const salaryDeleted = _salaryDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(5)`)
      .first()
      .inputValue()
    const departmentDeleted = _departmentDeleted || await page
      .locator('.rt-tr[role="row"]')
      .locator(`.rt-td:nth-child(6)`)
      .first()
      .inputValue()

    await page.locator(elementsLocators.firstDeleteButton).click()

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(1)`).first()
    ).not.toHaveText(firstNameDeleted)

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(2)`).first()
    ).not.toHaveText(lastNameDeleted)

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(3)`).first()
    ).not.toHaveText(ageDeleted)

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(4)`).first()
    ).not.toHaveText(emailDeleted)

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(5)`).first()
    ).not.toHaveText(salaryDeleted)

    await expect(
      page.locator('.rt-tr[role="row"]').locator(`.rt-td:nth-child(6)`).first()
    ).not.toHaveText(departmentDeleted)
  }

  return {
    addTable,
    editTable,
    searchTable,
    deleteTable,
  }
}

const webtable = (page) => WebTable(page)
export default webtable
