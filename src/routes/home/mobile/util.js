export const filterString = str => {
  if (str) {
    let result = ''
    const strList = str.split(' ')
    strList.map((s, i) => {
      if (i < 20) {
        result += ` ${s}`
      }
    })

    result += strList.length > 20 ? '...' : ''

    return result
  }
  return ''
}
