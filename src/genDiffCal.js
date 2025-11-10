import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  try {
    const data1 = parseFile(filepath1)
    const data2 = parseFile(filepath2)
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort((a, b) => a.localeCompare(b))
    const result = ['{\r\n']
    for (const key of keys) {
      if (data1[key] !== undefined && data2[key] !== undefined) {
        if (data1[key] === data2[key]) {
          result.push(`    ${key}: ${data2[key]}\r\n`)
        }
        else {
          result.push(`  - ${key}: ${data1[key]}\r\n`, `  + ${key}: ${data2[key]}\r\n`)
        }
      }
      else if (data1[key] !== undefined) {
        result.push(`  - ${key}: ${data1[key]}\r\n`)
      }
      else {
        result.push(`  + ${key}: ${data2[key]}\r\n`)
      }
    }
    result.push('}')
    return result.join('')
  }
  catch (error) {
    return error.message
  }
}

export default genDiff
