const path = require('path');
const { readMarkdownFileSync } = require('./file');

test('readMarkdownFileSync', () => {
  readMarkdownFileSync(path.resolve(__dirname, '../fixtures/test.md'));
});
