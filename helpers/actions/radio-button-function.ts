import { Page, test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { faker } from '@faker-js/faker'
import { elementsLocators } from '../locators/elements-locator'
import gotoIfNeeded from './gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

const RadioButton = async (page: Page) => {
  async function selectRadioButton({
    likeSite: _likeSite,
  }: {
    likeSite?: 'Yes' | 'Impressive' | 'No'
  }) {
    const likeSite = _likeSite || 'Yes'

    await gotoIfNeeded(page, `${data.APP.URL}/radio-button`)

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
      ).toBeVisible({ timeout: 1000 })
    }
  }

  return {
    selectRadioButton,
  }
}

const radiobutton = (page) => RadioButton(page)
export default radiobutton
