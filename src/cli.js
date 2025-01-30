import { program } from 'commander';

const diff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>', 'path to file')
    .argument('<filepath2>', 'path to file')
    .option('-f, --format[type]', 'output format')

  program.parse();
};

export default diff; 