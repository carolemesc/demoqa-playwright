// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import form from '../helpers/actions/forms-function'
import { faker } from '@faker-js/faker'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/automation-practice-form`)
})

test.afterEach(async () => {
  await page.close()
})

test.describe('O formulário deve ser preenchido e validado', () => {
  test('Todos os campos preenchidos devem ser validados', async () => {
    const FillForm = await form(page)

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other'])
    const mobileNumber = faker.string.numeric(10)
    const birthdayDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    const birthday = {
      fullDate: birthdayDate.toString(),
      year: birthdayDate.getFullYear(),
      month: birthdayDate.toLocaleString('en-US', { month: 'long' }),
      day: birthdayDate.getDate(),
    }
    const subject = faker.helpers.arrayElement([
      'Math',
      'Accounting',
      'Arts',
      'Social Studies',
      'Biology',
      'Physics',
      'Chemistry',
      'Computer Science',
      'Commerce',
    ])
    const hobbies = faker.helpers.arrayElement(['Reading', 'Sports', 'Music'])
    const pictureName = 'simpleFile.jpeg'
    const address = faker.location.street()
    type State = 'NCR' | 'Uttar Pradesh' | 'Haryana' | 'Rajasthan'
    type City =
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

    const stateCityMap: Record<State, City[]> = {
      NCR: ['Delhi', 'Gurgaon', 'Noida'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
      Haryana: ['Karnal', 'Panipat'],
      Rajasthan: ['Jaiselmer', 'Jaipur'],
    }

    const state: State = faker.helpers.arrayElement(
      Object.keys(stateCityMap) as State[]
    )

    const city: City = faker.helpers.arrayElement(stateCityMap[state])

    const input = await FillForm.fillForms({
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
    })

    await FillForm.validateFormData(input)
  })

  test('Mensagem de erro ao enviar campos obrigatórios vazios', async () => {
    const FillForm = await form(page)
    const input = await FillForm.fillForms({})
    await FillForm.validateFormData(input)
  })
})
