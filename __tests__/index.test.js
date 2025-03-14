import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compare JSON', () => {
  const file1 = getFixturePath('file1-1.json');
  const file2 = getFixturePath('file2-2.json');
  const result = readFixtureFile('text.txt');
  expect(genDiff(file1, file2)).toEqual(result);
});

// test('compare YAML', () => {
//   const file1 = getFixturePath('file1.yml');
//   const file2 = getFixturePath('file2.yml');
//   const result = readFixtureFile('textCheck.txt');
//   expect(genDiff(file1, file2)).toEqual(result);
// });
