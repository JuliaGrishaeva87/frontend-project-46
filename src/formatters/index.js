import stylish from './stylish.js'
import plain from './plain.js'

const formatter = (comparedObj, format) => {
  if (format === 'stylish') {
    return stylish(comparedObj)
  }
  if (format === 'plain') {
    return plain(comparedObj)
  }
  else {
    throw new Error(`Unknown format: ${format}`)
  }
}

export default formatter
