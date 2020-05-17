const net = require('net');

class Request {
    // method, url = host + port + path
    // body: k/v
    // headers

    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.path = options.path || "/";
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] == "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] == "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join("&");
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }
    //open(method, url)

    toString() {
    //     return `$(this.method) ${this.path} HTTP/1.1\r
    //     Object.keys(this.headers).map(key => \`${key}: ${this.header[key]})\`\r
    //     \r
    //     name=\`$(this.body)\`
    // `;
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, ()=> {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    console.log(parser.response);
                }
                connection.end();
            });

            connection.on('error', (err) => {
                reject(err.toString());
                connection.end();
            });
        })
        
    }
}

class Response {

}

class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE= 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }

    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinish;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    receive(string) {
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char) {
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
            } else if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine  += char;
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } 
        }else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END;
                if (this.headers['Transfer-Encoding'] === 'chunked')
                    this.bodyParser = new TrunkBodyParser();
            } else {
                this.headerName  += char;
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerValue = '';
                this.headerName = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
        }
    }
}

class TrunkBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinish = false;

        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        //console.log(JSON.stringify(char));
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length == 0) {
                    this.isFinish = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length --;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char == "\r") {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char == "\n") {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

//const client = net.createConnection({ port: 8088 }, () => {
  // 'connect' listener.
  //console.log('connected to server!');
//   client.write('POST / HTTP/1.1\r\n');
//   client.write('Content-Type: application/x-www-form-urlencoded\r\n');
//   client.write('Content-Length: 11 \r\n');
//   client.write('\r\n');
//   client.write('name=woowyl\r\n');
//});
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });


void async function() {
    let requst = new Request({
        method: "POST",
        path: "/",
        host: "127.0.0.1",
        port: "8088",
        headers: {
            ["X-Foo2"]: 'customed'
        },
        body: {
            name: "woowyl"
        }
    });
    let response = await requst.send();
}();
