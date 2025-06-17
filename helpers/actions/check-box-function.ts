import { Page, test, expect } from '@playwright/test'
import data from '../fixtures/data'
import { elementsLocators } from '../locators/elementsLocator'
import gotoIfNeeded from './gotoIfNeeded'

/** @type {import('@playwright/test').Page} */
let page: Page

const CheckBox = async (page: Page) => {
  async function selectCheckbox({
    type: _type,
    names,
  }: {
    type?: 'todos' | 'aleatorio' | 'especifico'
    names?: string[]
  }) {
    const type = _type || 'aleatorio'

    await gotoIfNeeded(page, `${data.APP.URL}/checkbox`)

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

    const filhosPorPai: Record<string, string[]> = {
      office: ['Public', 'Private', 'Classified', 'General'],
      desktop: ['Notes', 'Commands'],
      documents: ['Workspace'],
      workspace: ['React', 'Angular', 'Veu'],
      downloads: ['WordFile', 'ExcelFile'],
    }

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

          const filhos = filhosPorPai[nome] || []
          for (const filho of filhos) {
            await expect(
              page.locator(elementsLocators.checkboxName).getByText(filho)
            ).toBeVisible({ timeout: 1000 })
          }
        }
      }
    }
  }

  async function deselectCheckbox({ names }: { names: string[] }) {
    await gotoIfNeeded(page, `${data.APP.URL}/checkbox`)

    let btnsFechados = await page
      .locator(elementsLocators.btnsFechadosSelector)
      .first()
      .isVisible()

    const filhosPorPai: Record<string, string[]> = {
      office: ['Public', 'Private', 'Classified', 'General'],
      desktop: ['Notes', 'Commands'],
      documents: ['Workspace'],
      workspace: ['React', 'Angular', 'Veu'],
      downloads: ['WordFile', 'ExcelFile'],
    }

    while (btnsFechados) {
      await page.locator(elementsLocators.btnsFechadosSelector).first().click()
      await page.waitForTimeout(500)
      btnsFechados = await page
        .locator(elementsLocators.btnsFechadosSelector)
        .first()
        .isVisible()
    }

    for (const nome of names) {
      const checkBoxLocator = page
        .locator('label')
        .filter({ hasText: `${nome}` })
        .locator(elementsLocators.checkBoxSelect)

      const checkBoxIsChecked = await checkBoxLocator.isVisible()

      if (checkBoxIsChecked) {
        await page
          .locator('label')
          .filter({ hasText: `${nome}` })
          .first()
          .click()

        await expect(
          page.locator(elementsLocators.checkboxName).getByText(`${nome}`)
        ).not.toBeVisible({ timeout: 1000 })

        const filhos = filhosPorPai[nome] || []
        
        for (const filho of filhos) {
          await expect(
            page.locator(elementsLocators.checkboxName).getByText(`${filho}`)
          ).not.toBeVisible({ timeout: 1000 })
        }
      }
    }
  }

  return {
    selectCheckbox,
    deselectCheckbox,
  }
}

const checkbox = (page) => CheckBox(page)
export default checkbox
