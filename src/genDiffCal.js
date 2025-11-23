import _ from 'lodash'
import parseFile from './parsers.js'
import formatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const data1 = parseFile(filepath1)
    const data2 = parseFile(filepath2)
    const comparedObj = compare(data1, data2)
    return formatter(comparedObj, format)
  }
  catch (error) {
    return error.message
  }
}

const compare = (tree1, tree2) => {
  const keys = [...new Set([...Object.keys(tree1), ...Object.keys(tree2)])].sort((a, b) => a.localeCompare(b))
  return keys.reduce((acc, key) => {
    const value1 = tree1[key]
    const value2 = tree2[key]
    if (_.has(tree1, key) && _.has(tree2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return { ...acc, [key]: { status: 'NESTED', children: compare(value1, value2) } }
      }
      else if (value1 === value2) {
        return { ...acc, [key]: { status: 'UNCHANGED', value: value1 } }
      }
      else {
        return { ...acc, [key]: { status: 'CHANGED', deleted: value1, added: value2 } }
      }
    }
    else if (_.has(tree1, key)) {
      return { ...acc, [key]: { status: 'DELETED', value: value1 } }
    }
    else {
      return { ...acc, [key]: { status: 'ADDED', value: value2 } }
    }
  }, {})
}

export default genDiff
