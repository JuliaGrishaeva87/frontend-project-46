import { expect, test } from '@jest/globals'
import genDiff from '../src/genDiffCal.js'
import { readFile } from '../src/buildAdress.js'

const formats = ['json', 'yml', 'yaml']
const expectedResultFile = 'result.txt'

const testCases = []

formats.forEach((format1) => {
  formats.forEach((format2) => {
    const description = `${format1}/${format2}`
    const file1 = `filepath1.${format1}`
    const file2 = `filepath2.${format2}`
    testCases.push([description, file1, file2, expectedResultFile])
  })
})

formats.forEach((format) => {
  const description = format
  const file1 = `filepath1.${format}`
  const file2 = `filepath2.${format}`
  testCases.push([description, file1, file2, expectedResultFile])
})

test.each(testCases)('genDiff-%s', (description, file1, file2, expectedResultFile) => {
  const expected = readFile(expectedResultFile).trim()
  expect(genDiff(file1, file2)).toEqual(expected)
})

test('genDiff-wrong', () => {
  expect(genDiff('filepath1-txt.txt', 'filepath2-txt.txt')).toEqual('Wrong format')
})
