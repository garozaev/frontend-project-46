import { readFile, compareData, getFormat } from './utils.js';
import parses from './parser.js';
import stylish from './formater.js';

const genDiff = (filepath1, filepath2, format = getFormat(filepath1, filepath2)) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsesData1 = parses(data1, format);
  const parsesData2 = parses(data2, format);
  const diff = compareData(parsesData1, parsesData2);
  console.log(`diff: ${diff}`);
  // const fpormattedDiff = formater(diff);
  // console.log(`data1: ${data1}`);
  // console.log(`data2: ${data2}`);
  // console.log(`parsesData1: ${parsesData1}`);
  // console.log(`parsesData2: ${parsesData2}`);
  // console.log(`diff: ${diff}`);
  // console.log(`fpormattedDiff: ${fpormattedDiff}`);
  return diff;
};

export default genDiff;
