// @ts-check
import { Page, test, expect } from '@playwright/test'
import data from '../helpers/fixtures/data'
import file from '../helpers/actions/upload-and-download'

/** @type {import('@playwright/test').Page} */
let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(`${data.APP.URL}/upload-download`)
})

test.beforeEach(async () => {
  await page.goto(`${data.APP.URL}/upload-download`)
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Deve ser possível fazer upload e download corretamente', () => {
  test('Deve ser possível fazer o download do arquivo', async () => {
    const downloadButton = page.getByRole('link', { name: 'Download' })
    const localPath = 'helpers/fixtures/downloads/simpleFile.jpeg'

    const DownloadFile = await file(page)
    await DownloadFile.downloadFile({
      downloadButton: downloadButton,
      localPath: localPath,
    })
  })

  test('Deve ser possível fazer upload de arquivo', async () => {
    const fileName = 'simpleFile.jpeg'
    const localPath = `helpers/fixtures/downloads/${fileName}`
    const uploadButton = page.locator('#uploadFile')

    const DownloadFile = await file(page)
    await DownloadFile.uploadFile({
      localPath: localPath,
      uploadButton: uploadButton,
    })
  })
})
