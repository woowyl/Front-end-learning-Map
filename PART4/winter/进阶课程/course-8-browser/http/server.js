const http = require('http');

// Server has a 5 seconds keep-alive timeout by default
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello\n');
    res.end();
})
server.listen(3000);