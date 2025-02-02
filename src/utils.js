import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const readFile = (filePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(`filename: ${__filename}`);
  console.log(`dirname: ${__dirname}`);
  const fullPath = path.resolve(__dirname, filePath);
  const resultRead = fs.readFileSync(fullPath)
  console.log(resultRead);
  return resultRead;
};

export default readFile;