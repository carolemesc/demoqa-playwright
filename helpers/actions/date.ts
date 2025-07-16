import { Page } from '@playwright/test'

/** @type {import('@playwright/test').Page} */
let page: Page

const DateFunction = () => {
  async function dateAndHour(inputDate?: string): Promise<[string, string]> {
    const now = inputDate ? new Date(inputDate) : new Date()

    const formatDate = (d: Date) =>
      `${d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })} ${d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`

    const current = formatDate(now)

    const plusOne = new Date(now.getTime() + 60000)
    const nextMinute = formatDate(plusOne)

    return [current, nextMinute]
  }

  async function date() {
    const d = new Date()
    const z = (n: number) => n.toString().padStart(2, '0')
    return `${z(d.getMonth() + 1)}/${z(d.getDate())}/${d.getFullYear()}`
  }

  async function formatFixedDate(inputDate: string): Promise<string> {
    const parsedDate = new Date(inputDate)
    const formatted = `${parsedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })} ${parsedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`
    return formatted
  }

  return {
    date,
    dateAndHour,
    formatFixedDate,
  }
}

const datefunction = () => DateFunction()
export default datefunction