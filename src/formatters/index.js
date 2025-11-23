import stylish from './stylish.js'
import plain from './plain.js'
import makeJSON from './json.js'

const formatter = (comparedObj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(comparedObj)
    case 'plain':
      return plain(comparedObj)
    case 'json':
      return makeJSON(comparedObj)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default formatter
