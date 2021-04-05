const { time } = require('console');
const net = require('net');

class Request {
    // method, url = host + port +path
    // body key:value
    // headers
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if ( this.headers["Content-Type"] === "application/x-www-form-urlencoded") 
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')


        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser(); 
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, ()=> {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data)=> {
                parser.receive(data.toString());
                if (parser.isFinish) {
                    resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (err)=> {
                reject(err.toString());
                connection.end();
            });
        })
        
    }
}

class Response {
    constructor() {
        this.parser = new ResponseParser()
    }
    receive(string) {
        
    }
}


class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END  = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headersName = "";
        this.headersValue = "";
        this.bodyparser = null;
    }

    get isFinish() {
        return this.bodyparser && this.bodyparser.isFinish;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyparser.content.join("")
        }
    }
    receive(string) {
        for (let char of string) {
            this.receiveChar(char);
        }
    }
    receiveChar(char) {
        if (this.current == this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
            } else if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine += char;
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === "\n") {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END;
                if (this.headers["Transfer-Encoding"] === "chunked")
                this.bodyparser = new ChunkedBodyParser();
            } else if (char === ":") {
                this.current = this.WAITING_HEADER_SPACE;
            } else  {
                this.headersName += char;
            }  
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === " ") {
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === "\r") {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headersName] = this.headersValue;
                this.headersName = '';
                this.headersValue = ''
            } else  {
                this.headersValue += char;
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current == this.WAITING_HEADER_BLOCK_END) {
            if (char === "\n") {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current == this.WAITING_BODY) {
            this.bodyparser.receiveChar(char);
        }
    }
}


class ChunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END  = 1;
        this.READING_CHUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;


        this.isFinish = false;
        this.length = 0;
        this.content = [];
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {

                if (this.length === 0) {
                    this.isFinish = true;
                    return;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                // this.length *= 10;
                // this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
                // length 这里是16进制需要修改
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_CHUNK;
            }
        } else if (this.current === this.READING_CHUNK) {
            this.content.push(char);
            this.length --;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

/*
const client = net.createConnection({ 
    host: '127.0.0.1',
    port: 3000 }, () => {
    // 'connect' listener.
    console.log('connected to server!');
    
    //client.write('world!\r\n');  //这样写的格式是不符合request的格式的，所以server会返回400 bad request
    
//     client.write(`
// POST / HTTP/1.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 11\r
// \r
// name=woowyl`);




    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 3000,
        path: '/',
        headers: {
            ["X-Foo2"]: 'customeer'
        },
        body: {
            name: 'woowyl'
        }
    })
//console.log(request.toString());
    client.write(request.toString());
 });

 */
/*

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('error', (err) => {
    console.log(err);
})

// net.connect({
//     host: "127.0.0.1",
//     port: 3000,
//     onread: {

//     }
// })

*/

void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 3000,
        path: '/',
        headers: {
            ["X-Foo2"]: 'customeer'
        },
        body: {
            name: 'woowyl'
        }
    })
    let response = await request.send();
    console.log(response);
}();

