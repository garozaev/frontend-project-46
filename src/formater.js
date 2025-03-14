import _ from 'lodash';

const stylish = (data) => {
  console.log(`data: ${data}`);
  // console.log(`data2: ${data2}`);
  // const cloneData1 = Object.keys(_.cloneDeep(data1));
  // const cloneData2 = Object.keys(_.cloneDeep(data2));
  // const consolidatedData = cloneData2.concat(cloneData1);
  // const sortData = _.sortBy(consolidatedData);
  const reduceData = data.reduce((acc, time) => {
    if (time.type === 'deleted') {
      return { ...acc, [`  - ${time.name}`]: time.value };
    }
    if (time.type === 'added') {
      return { ...acc, [`  + ${time.name}`]: time.value };
    }
    if (time.type === 'chenged') {
      return { ...acc, [`  - ${time.name}`]: time.value, [`  + ${time.name}`]: time.chengedValue };
    }
    if (time.children) {
      return 'chilgren';
    }
    return { ...acc, [`    ${time.name}`]: time.value };
  }, {});
  const dataWithString = Object.entries(reduceData).map((item) => item.join(',').replace(/,/g, ' : '));
  const stringData = `{\n${dataWithString.join().replace(/,/g, '\n')}\n}`;
  // console.log(`consolidatedData: ${consolidatedData}`);
  // console.log(`sortData: ${sortData}`);
  // console.log(`reduceData: ${reduceData}`);
  // console.log(`stringData: ${stringData}`);
  return stringData;
};

export default stylish;
