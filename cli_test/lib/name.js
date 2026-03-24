const path = require('path');
const fs = require('fs');

const packageStr = fs.readFileSync(path.resolve(__dirname, '../../package.json'), { encoding: 'utf8' });
const package = JSON.parse(packageStr);

exports.getPackageName = () => {
  return package.name;
};