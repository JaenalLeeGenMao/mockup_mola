/**
 *
 * @param {"magical string"} str
 * @param {number of string to be trimed} n
 */
export const filterString = (str, n = 20) => {
  if (str) {
    let result = ''
    const strList = str.split(' ')
    strList.map((s, i) => {
      if (i < n) {
        result += ` ${s}`
      }
    })

    result += strList.length > n ? '...' : ''

    return result
  }
  return ''
}
