const gotoIfNeeded = async (page, url) => {
  const currentPageUrl = page.url()
  if (!currentPageUrl.endsWith(url)) {
    await page.goto(url)
    await page.waitForLoadState()
  }
}

export default gotoIfNeeded