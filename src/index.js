import { readFile, compareFileJSON, getFormat } from './utils.js';
import parses from './parser.js';

const genDiff = (filepath1, filepath2, format = getFormat(filepath1, filepath2)) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  // console.log(`data1: ${data1}`);
  // console.log(`data2: ${data2}`);
  const parsesData1 = parses(data1, format);
  const parsesData2 = parses(data2, format);
  const compareFile = compareFileJSON(parsesData1, parsesData2);
  // console.log(`data1: ${data1}`);
  // console.log(`data2: ${data2}`);
  // console.log(`parsesData1: ${data1}`);
  // console.log(`parsesData2: ${data2}`);
  return compareFile;
};

export default genDiff;
