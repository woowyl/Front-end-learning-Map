// step1 
const css = require('css');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{
    type: "document",
    children: []
}]

const EOF = Symbol("EOF");  //end of file

// step1 加入一个新的函数，addClassRules, 这里我们把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text) {
    var ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "  "));
    rules.push(...ast.stylesheet.rules);
}

// step2 
function computeCSS(elememt) {
    //step 3 匹配顺序是从子到父
    var elememts = stack.slice().reverse();
}

function emit(token) {
    let top = stack[stack.length - 1];
    
    if (token.type == "startTag") {
        let elememt = {
            type: "element",
            children: [],
            attributes: []
        };

        elememt.tagName = token.tagName;

        for (let p in token){
            if (p != "type" && p != "tagName") {
                elememt.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }
        
        // step2 
        computeCSS(elememt);

        top.children.push(elememt);
        elememt.parent = top;

        if (!token.isSelfClosting) {
            stack.push(elememt);
        }

        currentTextNode = null;

    } else if (token.type == "endTag") {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end does not match");
        } else {
            // step1:  遇到style标签时，执行添加CSS规则的操作
            if (top.tagName === "style") {
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }

        currentTextNode = null;
        
    } else if (token.type == "text") {
        if (currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            },
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
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
        emit({
            type: "text",
            content: c
        });
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
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
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
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        // 抛出错误   <html =22>
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute= {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
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
    if (c == "\'") {
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
        emit(currentToken);
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
    return stack[0];

}