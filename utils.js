let i = 0
export const uniqId = () => {
  i += 1
  return i
}

export const format = (string) => {
  const data = {}
  if (string.indexOf(':') > -1) {
    string.split(/;\s?/).map(property => {
      // Skip empty string
      if (property) {
        const [name, value] = property.split(/:\s?/)
        data[name] = value
      }
    })
  } else {
    data.from = string
  }
  return data
}