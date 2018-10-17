const http = require('http');
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request comming', request.url);
    const html = fs.readFileSync('test.html', 'utf-8');
    if (request.url === "/") {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html);
    }

    if (request.url === "/script.js") {
        
        const etag = request.headers['if-none-match'];
        // 请求的etag和本地的文件戳是否相同
        if (etag === "777") {
            response.writeHead(304)
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=20000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('console.log("script loaded twice")');
        }
    }
}).listen(8888);
console.log('server listenning in 8888');