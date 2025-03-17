import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import { fileURLToPath } from 'url';

const readFile = (filePath) => {
  const cwdFilePath = process.cwd(filePath);
  const allPath = path.resolve(cwdFilePath, filePath);
  const resultRead = fs.readFileSync(allPath);
  // console.log(`cwdFilePath: ${cwdFilePath}`);
  // console.log(`allPath: ${allPath}`);
  // console.log(`resultRead: ${resultRead}`);
  return resultRead;
};

const compareData = (data1, data2) => {
  // console.log(`data1: ${data1}`);
  // console.log(`data2: ${data2}`);
  // const cloneData1 = Object.keys(_.cloneDeep(data1));
  // const cloneData2 = Object.keys(_.cloneDeep(data2));
  const consolidateKey = Object.keys(data1).concat(Object.keys(data2));
  const sortedKeys = _.sortBy(consolidateKey);
  const biult = (data, depth) => {
    data.flatMap((key) => {
      if ((typeof data1[key] === 'object' && !Array.isArray(data1[key]) && data1[key] !== null)
        && (typeof data2[key] === 'object' && !Array.isArray(data2[key]) && data2[key] !== null)) {
        const currentDepth = depth + 1;
        return {
          name: key, type: 'data', children: compareData(data1[key], data2[key]), depth: currentDepth,
        };
      }
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        return {
          name: key, type: 'deleted', value: data1[key], depth,
        };
      }
      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        return {
          name: key, type: 'added', value: data2[key], depth,
        };
      }
      if (data1[key] !== data2[key]) {
        return {
          name: key, type: 'chenged', value: data1[key], chengedValue: data2[key], depth,
        };
      }
      return {
        name: key, type: 'unchenged', value: data2[key], depth,
      };
    });
  };
  console.log(`consolidateKey: ${consolidateKey}`);
  console.log(`sortedKey: ${sortedKeys}`);
  // console.log(`biultChanges: ${JSON.stringify(biult)}`);
  return biult(sortedKeys, 1);
};

const getFormat = (filepaht1, filepath2) => {
  const format1 = path.extname(filepaht1);
  const format2 = path.extname(filepath2);
  if (format1 === format2) {
    const format = format1;
    // console.log(`format: ${format}`);
    return format;
  }
  throw new Error(`Unknow values format: '${filepaht1}' or '${filepath2}'`);
};

export { readFile, compareData, getFormat };
