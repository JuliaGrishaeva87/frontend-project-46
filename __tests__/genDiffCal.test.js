import { expect, test } from '@jest/globals'
import { genDiff, makeDiff } from '../src/genDiffCal.js'
import { readFile } from '../src/buildAdress.js'

test('genDiff', () => {
  expect(genDiff('filepath1.json', 'filepath2.json')).toEqual(readFile('result.txt').trim())
})

test('empty', () => {
  expect(makeDiff({}, {})).toEqual(('{\r\n}').trim())
})
