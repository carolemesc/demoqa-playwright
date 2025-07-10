// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import { alertsFrameWindowsLocators } from '../helpers/locators/alerts-frame-windows-locator'
import { faker } from '@faker-js/faker'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/alerts`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Alertas devem aparecer ao interagir com botões', () => {
  test('Alerta deve ficar visivel ao clicar no botão', async () => {
    page.once('dialog', (dialog) => {
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toBe('You clicked a button')
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.accept().catch(() => {})
    })
    await page.locator(alertsFrameWindowsLocators.alertButton).click()
  })

  test('Alerta deve ser visivel depois de 5 segundos do clique no botão', async () => {
    const start = Date.now()

    const dialogPromise = new Promise<void>((resolve) => {
      page.once('dialog', (dialog) => {
        const duration = Date.now() - start
        expect(duration).toBeGreaterThanOrEqual(5000)
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe('This alert appeared after 5 seconds')
        console.log(`Dialog message: ${dialog.message()}`)
        dialog.accept().catch(() => {})
        resolve()
      })
    })
    await page.locator(alertsFrameWindowsLocators.timerAlertButton).click()
    await dialogPromise
  })

  test('Alerta deve aparecer com botão de confirmação', async () => {
    page.once('dialog', (dialog) => {
      expect(dialog.type()).toBe('confirm')
      expect(dialog.message()).toBe('Do you confirm action?')
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.accept().catch(() => {})
    })
    await page.locator(alertsFrameWindowsLocators.confirmButton).click()
    await expect(page.locator('#confirmResult')).toHaveText('You selected Ok')

    page.once('dialog', (dialog) => {
      expect(dialog.type()).toBe('confirm')
      expect(dialog.message()).toBe('Do you confirm action?')
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.locator(alertsFrameWindowsLocators.confirmButton).click()
    await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel')
  })

  test('Alerta deve aparecer com um input', async () => {
    const name = faker.person.firstName()
    page.once('dialog', (dialog) => {
      expect(dialog.type()).toBe('prompt')
      expect(dialog.message()).toBe('Please enter your name')
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.accept(`${name}`).catch(() => {})
    })
    await page.locator(alertsFrameWindowsLocators.promtButton).click()
    await expect(page.locator('#promptResult')).toHaveText(`You entered ${name}`)

    page.once('dialog', (dialog) => {
      expect(dialog.type()).toBe('prompt')
      expect(dialog.message()).toBe('Please enter your name')
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.locator(alertsFrameWindowsLocators.promtButton).click()
    await expect(page.locator('#promptResult')).not.toBeVisible()
  })
})
