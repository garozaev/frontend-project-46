import _ from 'lodash';

const modifyData = (value) => {
  console.log(`Value: ${value}`);
  if (!_.isObject(value)) {
    return value;
  }

  const iter = (data, depth) => {
    const newObject = Object.keys(data).reduce((acc, key) => {
      if (_.isObject(data[key])) {
        return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: iter(data[key], depth + 1) };
      }
      return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: data[key] };
    }, {});
    return newObject;
  };
  const result = iter(value, 0);
  console.log(`ModifyValue: ${JSON.stringify(result)}`);
  return result;
};
// const sortedKeys = _.sortBy(keys);

const stylish = (data) => {
  console.log(`dataStylish: ${data}`);
  const iter = (node, depth) => {
    const result = node.reduce((acc, obj) => {
      if (obj.type === 'data') {
        return { ...acc, [`${'  '.repeat(depth)}  ${obj.name}`]: iter(obj.children, depth + 1) };
      }
      if (obj.type === 'deleted') {
        return { ...acc, [`${'  '.repeat(depth)}- ${obj.name}`]: modifyData(obj.value) };
      }
      if (obj.type === 'added') {
        return { ...acc, [`${'  '.repeat(depth)}+ ${obj.name}`]: modifyData(obj.value) };
      }
      if (obj.type === 'chenged') {
        return { ...acc, [`${'  '.repeat(depth)}- ${obj.name}`]: modifyData(obj.value), [`${'  '.repeat(depth)}+ ${obj.name}`]: modifyData(obj.chengedValue) };
      }
      return { ...acc, [`${'  '.repeat(depth)}  ${obj.name}`]: obj.value };
    }, {});
    return result;
  };
  const builtChenged = iter(data, 0);
  const strigifyChenged = JSON.stringify(builtChenged, null, 2).replace(/,|"/g, '');
  console.log(`builtChenged: ${strigifyChenged} : ${typeof strigifyChenged}`);
  return strigifyChenged;
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
