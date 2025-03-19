import _ from 'lodash';

const stylish = (data) => {
  console.log(`dataStylish: ${data}`);
  const formattedChenges = data.reduce((acc, obj) => {
    if (obj.type === 'data') {
      return [...acc, `\n${'  '.repeat(obj.depth)}  ${obj.name}:${stylish(obj.children)}`];
    }
    if (obj.type === 'deleted') {
      if (_.isObject(obj.value)) {
        return [...acc, `\n${'  '.repeat(obj.depth)}- ${obj.name}: ${JSON.stringify(obj.value)}`];
      }
      return [...acc, `\n${'  '.repeat(obj.depth)}- ${obj.name}:${obj.value}\n${'  '.repeat(obj.depth)}`];
    }
    if (obj.type === 'added') {
      if (_.isObject(obj.value)) {
        return [...acc, `\n${'  '.repeat(obj.depth)}+ ${obj.name}: ${JSON.stringify(obj.value)}`];
      }
      return [...acc, `\n${'  '.repeat(obj.depth)}+ ${obj.name}:${obj.value}\n${'  '.repeat(obj.depth)}`];
    }
    if (obj.type === 'chenged') {
      return [...acc, `\n${'  '.repeat(obj.depth)}- ${obj.name}:${obj.value}\n${'  '.repeat(obj.depth)}+ ${obj.name}:${obj.chengedValue}\n${'  '.repeat(obj.depth)}`];
    }
    return [...acc, `\n${'  '.repeat(obj.depth)}  ${obj.name}:${obj.value}\n${'  '.repeat(obj.depth)}`];
  }, []);
  console.log(`formattedChenges: ${formattedChenges} : ${typeof formattedChenges}`);
  const sortedFormattedChenges = _.sortBy(formattedChenges);
  console.log(`sortedFormattedChenges: ${sortedFormattedChenges} : ${typeof sortedFormattedChenges}`);
  return sortedFormattedChenges;
};

export default stylish;

// const ChengesToString = JSON.stringify(formattedChenges);
// console.log(`ChengesToString: ${ChengesToString}: ${typeof ChengesToString}`);
// const dataWithString = Object.entries(formattedChenges).map((item) => item.join(',').replace(/,/g, ': '));
// const stringСhenges = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
// console.log(`consolidatedData: ${consolidatedData}`);
// console.log(`dataWithString: ${dataWithString}`);
// console.log(`stringСhenges: ${stringСhenges}`);
