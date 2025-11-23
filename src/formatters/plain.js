import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (tree) => {
  const iter = (currentValue, parentPath) => {
    const lines = Object.entries(currentValue)
      .filter(([, val]) => val.status !== 'UNCHANGED')
      .map(([key, val]) => {
        const currentPath = parentPath ? `${parentPath}.${key}` : key
        switch (val.status) {
          case 'NESTED':
            return iter(val.children, currentPath)
          case 'DELETED':
            return `Property '${currentPath}' was removed`
          case 'ADDED':
            return `Property '${currentPath}' was added with value: ${formatValue(val.value)}`
          case 'CHANGED':
          {
            const formattedDeleted = formatValue(val.deleted)
            const formattedAdded = formatValue(val.added)
            return `Property '${currentPath}' was updated. From ${formattedDeleted} to ${formattedAdded}`
          }
        }
      })
    return lines.join('\n')
  }
  return iter(tree, '')
}

export default plain
