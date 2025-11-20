import { expect, test } from '@jest/globals'
import genDiff from '../src/genDiffCal.js'
import { readFile } from '../src/buildAdress.js'

const formats = ['json', 'yml', 'yaml']
const expectedResultFile = 'result.txt'
const expectedResultFile2 = 'result-nested.txt'

const testCases = []

formats.forEach((format1) => {
  formats.forEach((format2) => {
    const description = `${format1}/${format2}`
    const file1 = `filepath1.${format1}`
    const file2 = `filepath2.${format2}`
    testCases.push([description, file1, file2, expectedResultFile])
  })
})

formats.forEach((format1) => {
  formats.forEach((format2) => {
    const description = `${format1}/${format2} - nested`
    const file1 = `filepath1-nested.${format1}`
    const file2 = `filepath2-nested.${format1}`
    testCases.push([description, file1, file2, expectedResultFile2])
  })
})

formats.forEach((format) => {
  const description = format
  const file1 = `filepath1.${format}`
  const file2 = `filepath2.${format}`
  testCases.push([description, file1, file2, expectedResultFile])
})

formats.forEach((format) => {
  const description = `${format}-nested`
  const file1 = `filepath1-nested.${format}`
  const file2 = `filepath2-nested.${format}`
  testCases.push([description, file1, file2, expectedResultFile2])
})

test.each(testCases)('genDiff-%s', (description, file1, file2, result) => {
  const expected = readFile(result).trim()
  const format = 'stylish'
  expect(genDiff(file1, file2, format)).toEqual(expected)
})

test('genDiff-wrong', () => {
  expect(genDiff('filepath1-txt.txt', 'filepath2-txt.txt', 'stylish')).toEqual('Wrong format')
})

test('genDiff-wrong-output', () => {
  const file1 = 'filepath1.json'
  const file2 = 'filepath2.json'
  const wrongFormat = 'xml'
  expect(genDiff(file1, file2, wrongFormat)).toEqual(`Unknown format: ${wrongFormat}`)
})
