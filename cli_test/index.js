const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv))
  .option('name', {
    description: 'CLI名を表示',
    type: 'boolean',
  })
  .option('file', {
    description: 'Markdownファイルのパス',
    type: 'string',
  });

if (argv.name) {
  const packageStr = fs.readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf8' });
  const packageJson = JSON.parse(packageStr);
  console.log(packageJson.name);

  process.exit(0);
} else if (argv.file) {
  const markdownStr = fs.readFileSync(path.resolve(__dirname, argv.file), { encoding: 'utf8' });
  console.log(markdownStr);
} else {
  console.log(packageJson);
}