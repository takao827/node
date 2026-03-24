const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { getPackageName } = require('./lib/name');
const { readMarkdownFileSync } = require('./lib/file');

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
  console.log(getPackageName());

  process.exit(0);
}

if (argv.file) {
  const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
  console.log(markdownStr);

  process.exit(0);
}

console.log('Invalid command');