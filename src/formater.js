import _ from 'lodash';

// const objToString = (obj, depth) => {
//   obj.reduce((acc, key) => {
//     if (_.isObject(key)) {
//       return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: objToString(obj.children, depth + 1) }
//     }
//     return   ...acc, [`${'  '.repeat(depth)}  ${obj.key}`] ;
// }, { });
// }

const stylish = ([tree, keys]) => {
  console.log(`dataStylish: ${tree}`);
  const iter = (node, depth) => {
    const result = keys.reduce((acc, key) => {
      if (_.isObject(tree[key]) && !tree.type) {
        return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: iter(key, depth + 1) };
      }
      if (tree.type === 'data') {
        return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: iter(key, depth + 1) };
      }
      if (tree.type === 'deleted') {
        if (_.isObject(tree[key])) {
          return {
            ...acc, [`${'  '.repeat(depth)}- ${key}`]: iter(key, depth + 1),
          };
        }
        return { ...acc, [`${'  '.repeat(depth)}- ${key}`]: tree[key] };
      }
      if (tree.type === 'added') {
        if (_.isObject(tree[key])) {
          return {
            ...acc, [`${'  '.repeat(depth)}+ ${key}`]: iter(key, depth + 1),
          };
        }
        return { ...acc, [`${'  '.repeat(depth)}+ ${key}`]: tree[key] };
      }
      if (tree.type === 'chenged') {
        return { ...acc, [`${'  '.repeat(depth)}- ${key}`]: tree[key], [`${'  '.repeat(depth)}+ ${key}`]: tree.chengedValue };
      }
      return { ...acc, [`${'  '.repeat(depth)}  ${key}`]: tree[key] };
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
