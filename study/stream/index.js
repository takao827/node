const fs = require('fs');
const { writeFile } = require('fs/promises');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const readStream = fs.createReadStream(__filename, { encoding: 'utf8', highWaterMark: 64 });
const writeFileName = `${__filename}-${Date.now()}`;

const write = async (chunk) => {
  await sleep(Math.random() * 1000);
  await writeFile(writeFileName, chunk, { flag: 'a' });
};

// let counter = 0;
// readStream.on('data', async (chunk) => {
//     console.log(`${counter} chunks written`);
//     counter++;

//     await write(chunk);
// });

// readStream.on('close', () => {
//     console.log('close');
// });

// readStream.on('error', (err) => {
//     console.error(err);
// });

const main = async () => {
  const stream = fs.createReadStream(__filename, { encoding: 'utf8', highWaterMark: 64 });

  let counter = 0;
  for await (const chunk of stream) {
    console.log(`${counter} chunks written`);
    counter++;
    await write(chunk);
  }

  console.log('close');
};

main().catch((err) => { console.error(err) });
