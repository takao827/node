import { createServer } from 'http';
import { on } from 'events';
import { setTimeout } from 'timers/promises';

const req = on(createServer().listen(3000), 'request');

for await (const [, res] of req) {
  res.write('HTTP/1.1 200 OK\r\n');
  await setTimeout(100);
  res.end();
}