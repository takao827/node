import { createServer } from 'http';

const server = createServer();

server.on('request', (req, res) => {
  res.write('HTTP/1.1 200 OK\r\n');
  setTimeout(() => {
    res.end();
  }, 100); // 100ms後にレスポンスを送信
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});