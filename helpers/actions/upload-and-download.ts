import { Page, test, expect } from '@playwright/test'
import fs from 'fs'
import { elementsLocators } from '../locators/elements-locator'

/** @type {import('@playwright/test').Page} */
let page: Page

const File = async (page: Page) => {
  async function uploadFile({
    localPath,
    uploadButton,
  }: {
    localPath
    uploadButton
  }) {
    await uploadButton.setInputFiles(localPath)
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
