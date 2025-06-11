const testId = (size: number = 10) => {
  return Date.now().toString().slice(size * -1)
}

export default testId