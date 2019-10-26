const http = require('http');

http.createServer(function(request, response) {
    console.log('request comming', request.url);

    response.writeHead(200, {
        "Access-Control-Allow-Origin": '*'
    });
    response.end('hello http server2'+request.url);
}).listen(8887);
console.log('server listenning in 8887');