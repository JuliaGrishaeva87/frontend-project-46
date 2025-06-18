import path from 'node:path';
import { readFileSync  } from 'node:fs';
import _ from 'lodash';

const parseObjects = (filepath) => {
    const file = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
    return file;
};

const genDiff = (filepath1, filepath2) => {
    const data1 = parseObjects(filepath1);
    const data2 = parseObjects(filepath2);
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.sortBy(_.union(keys1, keys2));
  
    const result = ['{\n'];
    for (const key of keys) {
      if (!Object.hasOwn(data1, key)) {
        result.push(`  + ${key}: ${data2[key]}\n`);
      } else if (!Object.hasOwn(data2, key)) {
        result.push(`  - ${key}: ${data1[key]}\n`);
      } else if (data1[key] !== data2[key]) {
        result.push(`  - ${key}: ${data1[key]}\n`);
        result.push(`  + ${key}: ${data2[key]}\n`);
      } else {
        result.push(`    ${key}: ${data2[key]}\n`);
      }
    }
    result.push('}');
    return result.join('');
  };

export default genDiff;