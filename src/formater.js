import _ from 'lodash';

const stylish = (data) => {
  console.log(`dataStylish: ${data}`);
  const iter = (node, depth) => {
    const result = node.flatMap((obj) => {
      if (obj.type === 'data') {
        return `\n${'  '.repeat(depth)}  ${obj.name}: {${iter(obj.children, depth + 2)}\n  ${'  '.repeat(depth)}}`;
      }
      if (obj.type === 'deleted') {
        if (_.isObject(obj.value)) {
          return `\n${'  '.repeat(depth)}- ${obj.name}: ${JSON.stringify(obj.value, null, '        ')}`;
        }
        return `\n${'  '.repeat(depth)}- ${obj.name}: ${obj.value}`;
      }
      if (obj.type === 'added') {
        if (_.isObject(obj.value)) {
          return `\n${'  '.repeat(depth)}+ ${obj.name}: ${JSON.stringify(obj.value, null, '        ')}`;
        }
        return `\n${'  '.repeat(depth)}+ ${obj.name}: ${obj.value}`;
      }
      if (obj.type === 'chenged') {
        return `\n${'  '.repeat(depth)}- ${obj.name}: ${obj.value}\n${'  '.repeat(depth)}+ ${obj.name}: ${obj.chengedValue}`;
      }
      return `\n${'  '.repeat(depth)}  ${obj.name}: ${obj.value}`;
    });
    return result.join('');
  };
  const builtChenged = iter(data, 1);
  console.log(`builtChenged: ${builtChenged} : ${typeof builtChenged}`);
  return builtChenged.replace(/,|"/g, '');
};

export default stylish;

// const sortedFormattedChenges = _.sortBy(formattedChenges);
// console.log(`sortedFormattedChenges: ${sortedFormattedChenges} : ${typeof sortedFormattedChenges}`);
// const ChengesToString = JSON.stringify(formattedChenges);
// console.log(`ChengesToString: ${ChengesToString}: ${typeof ChengesToString}`);
// const dataWithString = Object.entries(formattedChenges).map((item) => item.join(',').replace(/,/g, ': '));
// const stringСhenges = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
// console.log(`consolidatedData: ${consolidatedData}`);
// console.log(`dataWithString: ${dataWithString}`);
// console.log(`stringСhenges: ${stringСhenges}`);
