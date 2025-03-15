import _ from 'lodash';

const stylish = (data) => {
  console.log(`dataStylish: ${data}`);
  // console.log(`data2: ${data2}`);
  // const cloneData1 = Object.keys(_.cloneDeep(data1));
  // const cloneData2 = Object.keys(_.cloneDeep(data2));
  // const consolidatedData = cloneData2.concat(cloneData1);
  // const sortData = _.sortBy(consolidatedData);
  const formattedChenges = data.reduce((acc, obj) => {
    if (obj.type === 'deleted') {
      if (_.isObject(obj.value)) {
        return { ...acc, [`  - ${obj.name}`]: JSON.stringify(obj.value) };
      }
      return { ...acc, [`  - ${obj.name}`]: obj.value };
    }
    if (obj.type === 'added') {
      if (_.isObject(obj.value)) {
        return { ...acc, [`  + ${obj.name}`]: JSON.stringify(obj.value) };
      }
      return { ...acc, [`  + ${obj.name}`]: obj.value };
    }
    if (obj.type === 'chenged') {
      return { ...acc, [`  - ${obj.name}`]: obj.value, [`  + ${obj.name}`]: obj.chengedValue };
    }
    if (obj.type === 'data') {
      return { ...acc, [`   ch ${obj.name}`]: stylish(obj.children) };
    }
    return { ...acc, [`    ${obj.name}`]: obj.value };
  }, {});
  // const dataWithString = Object.entries(formattedChenges).map((item) => item.join(',').replace(/,/g, ': '));
  // const stringСhenges = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
  // console.log(`consolidatedData: ${consolidatedData}`);
  console.log(`formattedChenges: ${JSON.stringify(formattedChenges)}`);
  // console.log(`dataWithString: ${dataWithString}`);
  // console.log(`stringСhenges: ${stringСhenges}`);
  return formattedChenges;
};

export default stylish;
