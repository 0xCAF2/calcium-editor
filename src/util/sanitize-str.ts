export function sanitizeStr(inputStr: string): string {
  // sanitize value: remove unescaped double quotes, keep escaped ones like \"
  let result = ""
  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr[i]
    if (char === '"') {
      // count preceding consecutive backslashes
      let j = i - 1
      let countOfBackslashes = 0
      while (j >= 0 && inputStr[j] === "\\") {
        countOfBackslashes++
        j--
      }
      // if odd number of backslashes, the quote is escaped -> keep it
      if (countOfBackslashes % 2 === 1) {
        result += '"'
      } else {
        // skip unescaped quote
      }
    } else {
      result += char
    }
  }
  return result
}
