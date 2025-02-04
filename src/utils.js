import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const readFile = (filePath) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(filePath);
  // console.log(`filename: ${__filename}`);
  // console.log(`dirname: ${__dirname}`);
  const cwdFilePath = process.cwd(filePath);
  console.log(`cwdFilePath: ${cwdFilePath}`);
  const fullPath = path.resolve(cwdFilePath, filePath);
  const resultRead = fs.readFileSync(fullPath)
  console.log(`resultRead: ${resultRead}`);
  return resultRead;
};

export default readFile;