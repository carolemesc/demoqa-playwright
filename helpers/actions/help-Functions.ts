import { ElementHandle, Page } from '@playwright/test'

/**
@param {Page} page - A instância da página do Playwright
@param {string} url - A URL para navegar
*/

const gotoIfNeeded = async (page: Page, url: string) => {
  const currentPageUrl = page.url()
  if (new URL(currentPageUrl).pathname !== new URL(url).pathname) {
    await page.goto(url)
    await page.waitForLoadState()
  }
}

/**
@param {Page} page - A instância da página do Playwright
@param {ElementHandle} locator
@param {string} path
*/

const uploadFile = async (page: Page, locator: any, path: any) => {
  const fileChoosePromise = page.waitForEvent('filechooser')
  await locator.click()
  const fileChooser = await fileChoosePromise
  await fileChooser.setFiles(path)
}

/**
@param {number} size - A instância da página do Playwright
*/

const testId = (size: number = 10) => {
  return Date.now().toString().slice(size * -1)
}

const Helper = {
  gotoIfNeeded,
  uploadFile,
  testId,
}