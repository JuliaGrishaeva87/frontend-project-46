import _ from 'lodash'

const stylish = (value) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`
    }

    const indentSize = depth * 4 - 2
    const currentIndent = ' '.repeat(indentSize)
    const bracketIndent = ' '.repeat(indentSize - 2)
    const lines = Object.entries(currentValue)
    const newlines = lines.map(([key, val]) => {
      switch (val.status) {
        case 'NESTED':
          return `${currentIndent}  ${key}: ${iter(val.children, depth + 1)}`
        case 'DELETED':
          return `${currentIndent}- ${key}: ${iter(val.value, depth + 1)}`
        case 'ADDED':
          return `${currentIndent}+ ${key}: ${iter(val.value, depth + 1)}`
        case 'CHANGED':
        {
          const lineDel = `${currentIndent}- ${key}: ${iter(val.deleted, depth + 1)}`
          const lineAdd = `${currentIndent}+ ${key}: ${iter(val.added, depth + 1)}`
          return `${lineDel}\n${lineAdd}`
        }
        case 'UNCHANGED':
          return `${currentIndent}  ${key}: ${iter(val.value, depth + 1)}`
        default:
          return `${currentIndent}  ${key}: ${iter(val, depth + 1)}`
      }
    })

    return [
      '{',
      ...newlines,
      `${bracketIndent}}`,
    ].join('\n')
  }
  return iter(value, 1)
}

export default stylish
