import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import { fileURLToPath } from 'url';

const readFile = (filePath) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(filePath);
  // console.log(`filename: ${__filename}`);
  // console.log(`dirname: ${__dirname}`);
  const cwdFilePath = process.cwd(filePath);
  // console.log(`cwdFilePath: ${cwdFilePath}`);
  const allPath = path.resolve(cwdFilePath, filePath);
  // console.log(`allPath: ${allPath}`);
  const resultRead = fs.readFileSync(allPath);
  // console.log(`resultRead: ${resultRead}`);
  return resultRead;
};

const compareFileJSON = (data1, data2) => {
  // console.log(`data1: ${data1}`);
  // console.log(`data2: ${data2}`);
  const cloneData1 = Object.keys(_.cloneDeep(data1));
  const cloneData2 = Object.keys(_.cloneDeep(data2));
  const consolidatedData = cloneData2.concat(cloneData1);
  const sortData = _.sortBy(consolidatedData);
  const reduceData = sortData.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { ...acc, [`  - ${key}`]: data1[key] };
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return { ...acc, [`  + ${key}`]: data2[key] };
    }
    if (data1[key] !== data2[key]) {
      return { ...acc, [`  - ${key}`]: data1[key], [`  + ${key}`]: data2[key] };
    }
    if (data1[key] === data2[key]) {
      return { ...acc, [`    ${key}`]: data1[key] };
    }
    return { ...acc, ...data1, ...data2 };
  }, {});
  const dataWithString = Object.entries(reduceData).map((item) => item.join(',').replace(/,/g, ' : '));
  const stringData = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
  // console.log(`consolidatedData: ${consolidatedData}`);
  // console.log(`sortData: ${sortData}`);
  // console.log(`reduceData: ${reduceData}`);
  // console.log(`stringData: ${stringData}`);
  return stringData;
};

export { readFile, compareFileJSON };
