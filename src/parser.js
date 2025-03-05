import yaml from 'js-yaml';

const parses = (data, format) => {
  if (format === '.json') {
    const parsesJSON = JSON.parse(data);
    console.log(`parsesJSON: ${parsesJSON}`);
    return parsesJSON;
  }
  if (format === '.yml' || format === '.yaml') {
    const parsesYAML = yaml.load(data);
    console.log(`parsesJSON: ${parsesYAML}`);
    return yaml.load(data);
  }
  throw new Error(`Unknow values format: '${format}'`);
  // console.log(`parseFileJson: ${parseFileJson}`);
};

export default parses;
