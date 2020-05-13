const net = require('net');

class Requst {
    // method, url = host + port + path
    // body: k/v
    // headers

    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.path = options.host || "/";
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] == "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] == "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`.join("&"))
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }
    //open(method, url)

    toString() {
    //     return `$(this.method) $(this.path) HTTP/1.1\r
    //     Object.keys(this.headers).map(key => \`${key}: ${this.header[key]})\`\r
    //     \r
    //     name=\`$(this.body)\`
    // `;
    return `${this.method} / HTTP/1.1\r\nHost: 127.0.0.1\r\n${Object.keys(
        this.headers,
      )
        .map((key) => `${key}: ${this.headers[key]}`)
        .join('\r\n')}\r\n\r\n${this.bodyText}\r\n\r\n`;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
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
                resolve(data.toString());
                connection.end();
            });

            connection.on('error', (err) => {
                reject(data.toString());
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
        this.WAITING_HEADER_VALUE= 3;
        this.WAITING_HEADER_LINE_END = 4;
        
        this.WAITING_HEADER_BLOCK_END = 4;

        this.curreent = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
    }
    receive(string) {
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char) {
        if (this.curreent === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.curreent = this.WAITING_HEADER_LINE_END;
            } else {
                this.statusLine  += char;
            }
        }
    }
}

class TrunkBodyParser {
    constructor() {
       
    }
    receive(string) {

    }
}

// const client = net.createConnection({ port: 8088 }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');
//   client.write('POST / HTTP/1.1\r\n');
//   client.write('Content-Type: application/x-www-form-urlencoded\r\n');
//   client.write('Content-Length: 11 \r\n');
//   client.write('\r\n');
//   client.write('name=woowyl\r\n');
// });
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
            ["X-Foo2"]: ''
        },
        body: {
            name: "woowyl"
        }
    })

}


requst.send();

console.log(requst.toString());

