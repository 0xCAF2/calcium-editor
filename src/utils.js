export function parseFullWidthNumber(str) {
  function _parse(char) {
    switch (char) {
      case '１':
        return 1
      case '２':
        return 2
      case '３':
        return 3
      case '４':
        return 4
      case '５':
        return 5
      case '６':
        return 6
      case '７':
        return 7
      case '８':
        return 8
      case '９':
        return 9
      case '０':
        return 0
      default:
        return char
    }
  }
  let resultStr = ''
  for (let i = 0; i < str.length; ++i) {
    resultStr += _parse(str[i])
  }
  try {
    const num = parseFloat(resultStr)
    if (isNaN(num)) {
      throw new Error()
    } else {
      return num.toString()
    }
  } catch (_) {
    const num = parseInt(resultStr)
    if (isNaN(num)) {
      throw new Error('cannot parse as integer')
    } else {
      return num.toString()
    }
  }
}
