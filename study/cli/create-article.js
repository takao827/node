const path = require('path');
const { marked } = require('marked');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { getPackageName } = require('./lib/name');
const { readMarkdownFileSync, writeHtmlFileSync } = require('./lib/file');

const { argv } = yargs(hideBin(process.argv))
  .option('name', {
    description: 'CLI名を表示',
    type: 'boolean',
  })
  .option('file', {
    description: 'Markdownファイルのパス',
    type: 'string',
  })
  .option('out', {
    description: 'HTMLファイルの出力先',
    type: 'string',
    default: 'article.html',
  });

if (argv.name) {
  console.log(getPackageName());

  process.exit(0);
}

if (argv.file) {
  const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
  console.log(markdownStr);

  if (argv.out) {
    const html = marked(markdownStr);
    writeHtmlFileSync(path.resolve(__dirname, argv.out), html);
  }

  process.exit(0);
}

console.log('Invalid command');