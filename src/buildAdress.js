import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getFixturePath = file => path.join(dirname, '..', '__fixtures__', file)
const readFile = file => fs.readFileSync(getFixturePath(file), 'utf-8')

export { getFixturePath, readFile }
