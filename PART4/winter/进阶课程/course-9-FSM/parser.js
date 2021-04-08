const EOF = Symbol("EOF"); //EOF:End of File ?为什么String不可以

function data(c) {
    if (c == '<') {
        return tagOpen;
    } else if (c == EOF) {
        return;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    } else {
        return;
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName(c);
    } else if (c == "/") {
        
    }
}

function beforeAttributeName(c) {

}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for(let c of html) {
        state = state(c);
    } 
    state = state(EOF)
}