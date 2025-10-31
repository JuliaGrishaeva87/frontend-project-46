import path from 'node:path'
import process from 'node:process'
import { readFileSync } from 'node:fs'
import _ from 'lodash'
import { getFixturePath } from '../src/buildAdress.js'

const parseObjects = (filepath) => {
  const file = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'))
  return file
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseObjects(getFixturePath(filepath1))
  const data2 = parseObjects(getFixturePath(filepath2))
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.sortBy(_.union(keys1, keys2))

  const result = ['{\r\n']
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result.push(`  + ${key}: ${data2[key]}\r\n`)
    }
    else if (!Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}\r\n`)
    }
    else if (data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}\r\n`)
      result.push(`  + ${key}: ${data2[key]}\r\n`)
    }
    else {
      result.push(`    ${key}: ${data2[key]}\r\n`)
    }
  }
  result.push('}')
  return result.join('')
}

export default genDiff
