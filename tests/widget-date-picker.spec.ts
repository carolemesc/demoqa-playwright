// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import gotoIfNeeded from '../helpers/actions/gotoIfNeeded'
import datefunction from '../helpers/actions/date'
import { widgetLocators } from '../helpers/locators/widget-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/date-picker`)
})

test.beforeEach(async () => {
  await gotoIfNeeded(page, `${data.APP.URL}/date-picker`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível selecionar uma data e uma data/hora corretamente', () => {
  test('Os valores nos placeholders devem mostrar data e hora atual', async () => {
    const dateFunction = datefunction()
    const [dateNow, dateNowPlusOne] = await dateFunction.dateAndHour()
    const date = await dateFunction.date()

    await expect(page.locator(widgetLocators.datePickerMonthYearInput)).toHaveValue(
      date
    )

    expect([dateNow, dateNowPlusOne]).toContain(
      await page.locator(widgetLocators.dateAndTimePickerInput).inputValue()
    )
  })

  test('Deve ser possível selecionar a data', async () => {
    const date = '02/17/2021'
    const [month, day, year] = date.split('/')

    await page.locator(widgetLocators.datePickerMonthYearInput).click()
    await page
      .locator('div')
      .filter({
        hasText:
          /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/,
      })
      .getByRole('combobox')
      .selectOption((+month - 1).toString())
    await page.getByRole('combobox').nth(1).selectOption(year)
    await page
      .getByRole('option', {
        name: new RegExp(`Choose .* ${parseInt(day)}(st|nd|rd|th),`),
      })
      .click()
    await expect(page.locator(widgetLocators.datePickerMonthYearInput)).toHaveValue(date)
  })

  test('Deve ser possível selecionar a data e hora', async () => {
    const date = '02/17/2021 8:00 PM'
    const parsedDate = new Date(date)
    const dateFunction = datefunction()
    const expectedValue = await dateFunction.formatFixedDate(date)

    const monthName = parsedDate.toLocaleString('en-US', { month: 'long' })
    const day = parsedDate.getDate()
    const year = parsedDate.getFullYear().toString()

    const hours = parsedDate.getHours().toString().padStart(2, '0')

    await page.locator(widgetLocators.dateAndTimePickerInput).click()

    await page.locator(widgetLocators.dateAndTimePicker).first().click()

    await page.getByText(monthName).click()

    await page
      .locator('div')
      .filter({ hasText: /^2025$/ })
      .nth(1)
      .click()
    await page.getByText(year, { exact: true }).click()

    await page
      .getByRole('option', {
        name: new RegExp(`Choose \\w+, ${monthName} ${day}th,`),
      })
      .click()

    await page.getByText(`${hours}:00`).click()

    await expect(page.locator(widgetLocators.dateAndTimePickerInput)).toHaveValue(`${expectedValue}`)
  })
})
