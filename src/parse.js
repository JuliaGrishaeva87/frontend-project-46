import path from 'node:path';
import { readFileSync  } from 'node:fs';
//import _ from 'lodash';

const parseObjects = (filepath1, filepath2) => {
    const way1 = path.resolve(process.cwd(), filepath1);
    const way2 = path.resolve(process.cwd(), filepath2);
    const file1 = JSON.parse(readFileSync(way1, 'utf-8'));
    const file2 = JSON.parse(readFileSync(way2, 'utf-8'));
    console.log(file1);
    console.log(file2);
};

export default parseObjects;