#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to file')
  .argument('<filepath2>', 'path to file')
  .option('-f, --format[type]', 'output format')
  .action((filepath1, filepath2, option) => {
    const result = genDiff(filepath1, filepath2, option.format);
    return console.log(result);
  });

program.parse();