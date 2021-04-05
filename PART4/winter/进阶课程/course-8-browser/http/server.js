const http = require('http');

// Server has a 5 seconds keep-alive timeout by default
const server = http.createServer((req, res) => {
    console.log("request, received");
    console.log(req.headers);
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello');
    res.end();
})
server.listen(3000);