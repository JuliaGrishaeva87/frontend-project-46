import path from 'node:path'
import process from 'node:process'
import { readFileSync } from 'node:fs'
import { getFixturePath } from '../src/buildAdress.js'

const parseObjects = (filepath) => {
  const file = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'))
  return file
}
const genDiff = (filepath1, filepath2) => {
  const data1 = parseObjects(getFixturePath(filepath1))
  const data2 = parseObjects(getFixturePath(filepath2))
  return makeDiff(data1, data2)
}

const makeDiff = (data1, data2) => {
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
    else if (data2[key] !== undefined) {
      result.push(`  + ${key}: ${data2[key]}\r\n`)
    }
  }
  result.push('}')
  return result.join('')
}

export { genDiff, makeDiff }
