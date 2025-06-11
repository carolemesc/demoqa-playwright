import { Page, test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elementsLocator'
import gotoIfNeeded from './gotoIfNeeded'
import file from './upload-and-download'
import { formsLocators } from '../locators/formsLocator'

/** @type {import('@playwright/test').Page} */
let page: Page

const Form = async (page: Page) => {
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
    await page.getByRole('form', { name: 'Full Name' }).fill(fullName)
    await page.getByRole('form', { name: 'name@example.com' }).fill(email)
    await page.getByRole('form', { name: 'Current Address' }).fill(address)
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

  async function fillForms({
    firstName,
    lastName,
    email,
    gender,
    mobileNumber,
    birthday,
    subject,
    hobbies,
    pictureName,
    address,
    state,
    city,
  }: {
    firstName?: string
    lastName?: string
    email?: string
    gender?: 'Male' | 'Female' | 'Other'
    mobileNumber?: string
    birthday?: {
      fullDate: string
      year: number
      month: string
      day: number
    }
    subject?:
      | 'Math'
      | 'Accounting'
      | 'Arts'
      | 'Social Studies'
      | 'Biology'
      | 'Physics'
      | 'Chemistry'
      | 'Computer Science'
      | 'Commerce'
    hobbies?: 'Sports' | 'Reading' | 'Music'
    pictureName?: string
    address?: string
    state?: 'NCR' | 'Uttar Pradesh' | 'Haryana' | 'Rajasthan'
    city?:
      | 'Delhi'
      | 'Gurgaon'
      | 'Noida'
      | 'Agra'
      | 'Lucknow'
      | 'Merrut'
      | 'Karnal'
      | 'Panipat'
      | 'Jaiselmer'
      | 'Jaipur'
  }) {
    if (firstName) {
      await page.locator(formsLocators.firstNameInput).fill(firstName)
      await page.waitForTimeout(500)
    }

    if (lastName) {
      await page.locator(formsLocators.lastNameInput).fill(lastName)
      await page.waitForTimeout(500)
    }

    if (email) {
      await page.locator(formsLocators.userEmailInput).fill(email)
      await page.waitForTimeout(500)
    }

    if (gender) {
      if (gender === 'Male') {
        await page.getByText('Male', { exact: true }).click()
      } else if (gender === 'Female') {
        await page.getByText('Female').click()
      } else if (gender === 'Other') {
        await page.getByText('Other').click()
      }
      await page.waitForTimeout(500)
    }

    if (mobileNumber && mobileNumber.length === 10) {
      await page.locator(formsLocators.phoneNumberInput).fill(mobileNumber)
      await page.waitForTimeout(500)
    }

    if (birthday) {
      await page.locator(formsLocators.birthdayDateInput).click()
      await page
        .locator('div')
        .filter({
          hasText:
            /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/,
        })
        .getByRole('combobox')
        .selectOption(birthday.month)
      await page.waitForTimeout(500)
      await page
        .getByRole('combobox')
        .nth(1)
        .selectOption(birthday.year.toString())
      await page.waitForTimeout(500)
      await page
        .getByRole('option', { name: `${birthday.month} ${birthday.day}` })
        .click()
      await page.waitForTimeout(500)
    }

    if (subject) {
      await page.locator(formsLocators.subjectInput).fill(subject)
      await page.waitForTimeout(500)
      await page.locator(formsLocators.subjectInput).press('ArrowDown')
      await page.locator(formsLocators.subjectInput).press('Enter')
      await page.waitForTimeout(500)
    }

    if (hobbies) {
      if (hobbies === 'Sports') {
        await page.getByText('Sports').click()
      } else if (hobbies === 'Reading') {
        await page.getByText('Reading').click()
      } else if (hobbies === 'Music') {
        await page.getByText('Music').click()
      }
      await page.waitForTimeout(500)
    }

    if (pictureName) {
      const localPath = `helpers/fixtures/downloads/${pictureName}`
      const uploadButton = page.locator('#uploadPicture')

      const DownloadFile = await file(page)
      await DownloadFile.uploadFile({
        localPath: localPath,
        uploadButton: uploadButton,
      })
      await page.waitForTimeout(500)
    }

    if (address) {
      await page.locator(formsLocators.currentAddresInput).fill(address)
      await page.waitForTimeout(500)
    }

    if (state) {
      if (state === 'NCR') {
        await page.locator(formsLocators.stateDropdown).click()
        await page.getByText('NCR', { exact: true }).click()
        if (city) {
          if (city === 'Delhi') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Delhi', { exact: true }).click()
          } else if (city === 'Gurgaon') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Gurgaon', { exact: true }).click()
          } else if (city === 'Noida') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Noida', { exact: true }).click()
          }
          await page.waitForTimeout(500)
        }
      } else if (state === 'Uttar Pradesh') {
        await page.locator(formsLocators.stateDropdown).click()
        await page.getByText('Uttar Pradesh', { exact: true }).click()
        if (city) {
          if (city === 'Agra') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Agra', { exact: true }).click()
          } else if (city === 'Lucknow') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Lucknow', { exact: true }).click()
          } else if (city === 'Merrut') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Merrut', { exact: true }).click()
          }
          await page.waitForTimeout(500)
        }
      } else if (state === 'Haryana') {
        await page.locator(formsLocators.stateDropdown).click()
        await page.getByText('Haryana', { exact: true }).click()
        if (city) {
          if (city === 'Karnal') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Karnal', { exact: true }).click()
          } else if (city === 'Panipat') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Panipat', { exact: true }).click()
          }
          await page.waitForTimeout(500)
        }
      } else if (state === 'Rajasthan') {
        await page.locator(formsLocators.stateDropdown).click()
        await page.getByText('Rajasthan', { exact: true }).click()
        if (city) {
          if (city === 'Jaipur') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Jaipur', { exact: true }).click()
          } else if (city === 'Jaiselmer') {
            await page.locator(formsLocators.cityDropdown).click()
            await page.getByText('Jaiselmer', { exact: true }).click()
          }
          await page.waitForTimeout(500)
        }
      }
      await page.waitForTimeout(500)
    }

    await page.getByRole('button', { name: 'Submit' }).click()

    return {
      firstName,
      lastName,
      email,
      gender,
      mobileNumber,
      birthday,
      subject,
      hobbies,
      pictureName,
      address,
      state,
      city,
    }
  }

  async function validateFormData({
    firstName,
    lastName,
    email,
    gender,
    mobileNumber,
    birthday,
    subject,
    hobbies,
    pictureName,
    address,
    state,
    city,
  }) {
    if (firstName && lastName && gender && mobileNumber) {
      await expect(
        page.getByText('Thanks for submitting the form')
      ).toBeVisible({ timeout: 2000 })
      await expect(
        page.getByRole('cell', { name: `${firstName} ${lastName}` })
      ).toBeVisible()
      await expect(page.getByRole('cell', { name: `${gender}` })).toBeVisible()
      await expect(
        page.getByRole('cell', { name: `${mobileNumber}` })
      ).toBeVisible()
    } else {
      await expect(
        page.getByText('Thanks for submitting the form')
      ).not.toBeVisible({ timeout: 2000 })
    }

    if (email) {
      await expect(page.getByRole('cell', { name: `${email}` })).toBeVisible()
    }

    if (birthday) {
      await expect(
        page.getByRole('cell', { name: `${birthday.month},${birthday.year}` })
      ).toBeVisible()
    }

    if (subject) {
      await expect(page.getByRole('cell', { name: `${subject}` })).toBeVisible()
    }

    if (hobbies) {
      await expect(page.getByRole('cell', { name: `${hobbies}` })).toBeVisible()
    }

    if (pictureName) {
      await expect(
        page.getByRole('cell', { name: `${pictureName}` })
      ).toBeVisible()
    }

    if (address) {
      await expect(page.getByRole('cell', { name: `${address}` })).toBeVisible()
    }

    if (state && city) {
      await expect(
        page.getByRole('cell', { name: `${state} ${city}` })
      ).toBeVisible()
    }
  }

  return {
    fillTextBox,
    fillForms,
    validateFormData,
  }
}

const form = (page) => Form(page)
export default form
