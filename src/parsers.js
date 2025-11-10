import yaml from 'js-yaml'
import { getFixturePath } from './buildAdress.js'
import path from 'node:path'
import process from 'node:process'
import { readFileSync } from 'node:fs'

const parseJS = (filepath) => {
  const file = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'))
  return file
}

const parseYML = (filepath) => {
  const file = yaml.load(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'))
  return file
}

const parseFile = (file) => {
  const fileAdress = getFixturePath(file)
  const format = path.extname(fileAdress)
  if (format === '.json') {
    return parseJS(fileAdress)
  }
  else if (format === '.yml' || format === '.yaml') {
    return parseYML(fileAdress)
  }
  else throw new Error('Wrong format')
}

export default parseFile
