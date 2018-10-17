const http = require('http');
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request comming', request.url);
    const html = fs.readFileSync('test.html', 'utf-8');
    if (request.url === "/") {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-cookie': ['id=123; max-age=2; domain="fanli.com"', 'abc=456; HttpOnly']
        })
        response.end(html);
    }
}).listen(8889);
console.log('server listenning in 8888');