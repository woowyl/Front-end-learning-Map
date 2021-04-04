let currentToken = null;

const EOF = Symbol("EOF");  //end of file

function emit(token) {
    //if (token.type != "text") {
        console.log(token); 
   // }
}

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) { 
        emit({
            type: "EOF"
        });
        return;
    } else {
        emit({
            type: "text",
            content: c
        });
        return data;
    }
}

function tagOpen(c) {
    if (c =="/") {
        return endtagOpen;  // </的情况
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
        // return tagName;  注意区分两者的区别 用于表结构的直接吃掉并流转到下一个状态，不加括号；用于表意的不能吃掉，需要传递给下一个。
    } else {
        return;
    }
}

function endtagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c == ">") {

    } else if (c == EOF){

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "=") {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else {
        return beforeAttributeName
    }
}


function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosting = true;
        return data;
    } else if (c == EOF) {

    } else {

    }
}


module.exports.parseHTML = function(html) {
    let state = data;

    for (let char of html) {
        state = state(char)
    }

    state = state(EOF);

}