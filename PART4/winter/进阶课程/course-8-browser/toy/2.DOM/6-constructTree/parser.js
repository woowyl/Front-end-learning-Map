let currentToken = null;
let currentAttribute = null;

let stack = [{
    type: "document",
    children: []
}]

const EOF = Symbol("EOF");  //end of file

function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type == "startTag") {
        let elememt = {
            type: "element",
            children: [],
            attributes: []
        }

        elememt.tagName = token.tagName;

        for (let p in token){
            if (p != "type" && p != "tagName") {
                elememt.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        top.children.push(elememt);
        elememt.parent = top;

        if (!token.isSelfClosting) {
            stack.push(elememt);
        }

    } else if (token == "endTag") {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end does not match");
        } else {
            stack.pop();
        }
    }
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
    } else if (c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
        // 抛出错误   <html =22>
    } else {
        currentAttribute= {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c == "/" || c == ">" || c == EOF || c.match(/^[\n\t\f ]$/)) {
        return afterAttributeName(c);
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c =="'" || c == "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) {
  return data;
}
 
function beforeAttributeValue(c) {
    if (c == "/" || c == ">" || c == EOF || c.match(/^[\n\t\f ]$/)) {
        return beforeAttributeValue;
    } else if (c == "\"") {
        return doubleQuotedAttributeValue;
    } else if (c == "'") {
        return singleQuotedAttributeValue;
    } else if (c == ">") {

    } else {
        return unQuotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c =="'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c == "'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c =="'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}


function afterQuotedAttributeValue(c) {
    if (c.match(/^[\n\t\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function unQuotedAttributeValue(c) {
    if (c.match(/^[\n\t\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c =="'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return unQuotedAttributeValue;
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