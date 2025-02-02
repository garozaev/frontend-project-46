import readFile from './utils.js'
const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  console.log(`file1: ${file1}`);
  console.log(`file2: ${file2}`);
};

export default genDiff;
