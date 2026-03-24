const http = require('http');

const server = http.createServer((req, res) => {
  res.write('HTTP/1.1 200 OK\r\n');
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});