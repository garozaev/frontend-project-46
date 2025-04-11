import _ from 'lodash';

const modifyData = (value, curentDepth) => {
  console.log(`Value: ${value}`);
  if (!_.isObject(value)) {
    return value;
  }

  const iter = (data, depth) => {
    const newObject = Object.keys(data).flatMap((key) => {
      if (_.isObject(data[key])) {
        return `*\n${'  '.repeat(depth)}      ${key}: {${iter(data[key], depth + 2)}\n      ${'  '.repeat(depth)}}`;
      }
      return `\n${'  '.repeat(depth)}      ${key}: ${data[key]}`;
    });
    return newObject;
  };
  const result = iter(value, curentDepth);
  console.log(`ModifyValue: ${JSON.stringify(result)}`);
  return result;
};

const stylish = (data) => {
  console.log(`dataStylish: ${data}`);
  const iter = (node, depth) => {
    const result = node.flatMap((obj) => {
      if (obj.type === 'data') {
        return `*\n${'  '.repeat(depth)}  ${obj.name}: {${iter(obj.children, depth + 2)}\n  ${'  '.repeat(depth)}}`;
      }
      if (obj.type === 'deleted') {
        return `\n${'  '.repeat(depth)}- ${obj.name}: ${modifyData(obj.value, depth)}`;
      }
      if (obj.type === 'added') {
        return `\n${'  '.repeat(depth)}+ ${obj.name}: ${modifyData(obj.value, depth)}`;
      }
      if (obj.type === 'chenged') {
        return `\n${'  '.repeat(depth)}- ${obj.name}: ${modifyData(obj.value, depth)}\n${'  '.repeat(depth)}+ ${obj.name}: ${modifyData(obj.chengedValue, depth)}`;
      }
      return `\n${'  '.repeat(depth)}  ${obj.name}: ${modifyData(obj.value, depth)}`;
    });
    return result;
  };
  const builtChenged = iter(data, 1);
  console.log(`builtChenged: ${builtChenged} : ${typeof builtChenged}`);
  return builtChenged.join('#').replace(/,|"/g, '');
};

export default stylish;

// const strigifyChenged = JSON.stringify(builtChenged, null, 4).replace(/,|"/g, '');

// const sortedFormattedChenges = _.sortBy(formattedChenges);
// console.log(`sortedFormattedChenges: ${sortedFormattedChenges} : ${typeof sortedFormattedChenges}`);
// const ChengesToString = JSON.stringify(formattedChenges);
// console.log(`ChengesToString: ${ChengesToString}: ${typeof ChengesToString}`);
// const dataWithString = Object.entries(formattedChenges).map((item) => item.join(',').replace(/,/g, ': '));
// const stringСhenges = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
// console.log(`consolidatedData: ${consolidatedData}`);
// console.log(`dataWithString: ${dataWithString}`);
// console.log(`stringСhenges: ${stringСhenges}`);
