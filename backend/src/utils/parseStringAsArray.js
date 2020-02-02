module.exports = function parseStringAsArray(stringAsArray = '') {
  return stringAsArray.split(',').map(item => item.trim());
};
