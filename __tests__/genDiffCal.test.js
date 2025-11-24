import { expect, test } from '@jest/globals'
import genDiff from '../src/genDiffCal.js'
import { readFile } from '../src/buildAdress.js'

const formats = ['json', 'yml']
const expectedStylishFlat = readFile('result.txt').trim()
const expectedStylishNested = readFile('result-nested.txt').trim()
const expectedPlainNested = readFile('result-plain.txt').trim()
const expectedJSONNested = readFile('result-json(nested).txt').trim()

formats.forEach((ext1) => {
  formats.forEach((ext2) => {
    test(`genDiff stylish flat ${ext1}/${ext2}`, () => {
      const file1 = `filepath1.${ext1}`
      const file2 = `filepath2.${ext2}`
      expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylishFlat)
    })
  })
})

formats.forEach((ext1) => {
  test(`genDiff stylish nested ${ext1}`, () => {
    const file1 = `filepath1-nested.${ext1}`
    const file2 = `filepath2-nested.${ext1}`
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylishNested)
  })
})

formats.forEach((ext1) => {
  test(`genDiff plain nested ${ext1}`, () => {
    const file1 = `filepath1-nested.${ext1}`
    const file2 = `filepath2-nested.${ext1}`
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlainNested)
  })
})

formats.forEach((ext1) => {
  test(`genDiff json nested ${ext1}`, () => {
    const file1 = `filepath1-nested.${ext1}`
    const file2 = `filepath2-nested.${ext1}`
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJSONNested)
  })
})

test('genDiff-wrong-input', () => {
  expect(genDiff('filepath1-txt.txt', 'filepath2-txt.txt', 'stylish')).toEqual('Wrong format')
})

test('genDiff uses stylish as default format', () => {
  const file1 = 'filepath1.json'
  const file2 = 'filepath2.json'
  const expected = readFile('result.txt').trim()
  expect(genDiff(file1, file2)).toEqual(expected)
})

test('genDiff-wrong-output', () => {
  const file1 = 'filepath1.json'
  const file2 = 'filepath2.json'
  const wrongFormat = 'xml'
  expect(genDiff(file1, file2, wrongFormat)).toEqual(`Unknown format: ${wrongFormat}`)
})
