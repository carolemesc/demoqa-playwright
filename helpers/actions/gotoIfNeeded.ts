const gotoIfNeeded = async (page, url) => {
  const currentPageUrl = page.url()
  if (new URL(currentPageUrl).pathname !== new URL(url).pathname) {
    await page.goto(url)
    await page.waitForLoadState()
  }
}

export default gotoIfNeeded