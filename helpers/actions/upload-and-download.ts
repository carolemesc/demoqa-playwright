import { Page, test, expect } from '@playwright/test'
import fs from 'fs'
import { elementsLocators } from '../locators/elementsLocator'

/** @type {import('@playwright/test').Page} */
let page: Page

const File = async (page: Page) => {
  async function uploadFile({
    localPath,
    uploadButton,
    fileName,
  }: {
    localPath
    uploadButton
    fileName
  }) {
    await page.locator(uploadButton).setInputFiles(localPath)
    await expect(page.locator(elementsLocators.uploadedFilePath)).toContainText(
      fileName
    )
  }

  async function downloadFile({
    localPath,
    downloadButton,
  }: {
    localPath
    downloadButton
  }) {
    const downloadPromise = page.waitForEvent('download')

    await downloadButton.click()

    const download = await downloadPromise
    await download.saveAs(localPath)

    const fileExists = fs.existsSync(localPath)
    expect(fileExists).toBe(true)
  }

  return {
    uploadFile,
    downloadFile,
  }
}

const file = (page) => File(page)
export default file
