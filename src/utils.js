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
  console.log(`data1: ${data1}`);
  console.log(`data2: ${data2}`);
  const cloneData1 = Object.keys(_.cloneDeep(data1));
  const cloneData2 = Object.keys(_.cloneDeep(data2));
  const consolidatedData = cloneData2.concat(cloneData1);
  const sortData = _.sortBy(consolidatedData);
  const biultData = sortData.flatMap((key) => {
    if ((typeof data1[key] === 'object' && !Array.isArray(data1[key]) && data1[key] !== null)
      && (typeof data2[key] === 'object' && !Array.isArray(data2[key]) && data2[key] !== null)) {
      return { name: key, type: 'data', children: compareData(data1[key], data2[key]) };
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        name: key, type: 'chenged', value: data1[key], chengedValue: data2[key],
      };
    }
    return { name: key, type: 'unchenged', [`${key}`]: data2[key] };
  });
  console.log(`consolidatedData: ${consolidatedData}`);
  console.log(`sortData: ${sortData}`);
  console.log(`biultData: ${JSON.stringify(biultData)}`);
  return biultData;
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
