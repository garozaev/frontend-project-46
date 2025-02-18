const parses = (data) => {
  const parseFileJson = JSON.parse(data);
  // console.log(`parseFileJson: ${parseFileJson}`);
  return parseFileJson;
};

export default parses;
