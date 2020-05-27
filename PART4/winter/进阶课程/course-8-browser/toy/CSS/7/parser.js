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
    // console.log(JSON.stringify(ast, null, "  "));
    rules.push(...ast.stylesheet.rules);
}

// step4
function match(elememt, selector) {
    //step5 补充match中的内容
    if (!selector || !element.attributes)
        return false;
    
    if (selector.charAt(0) == "#") {
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace("#", ""))
            return true;
    } else if (selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace(".", ""))
            return true;
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }

    return false;
}

// step 6
function specificity() {
    //step 7
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");

    for (var part of selectorParts) {
        if (part.charAt(0) == "#") {
            p[1] += 1;
        } else if (part.charAt(0) == ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

//step 7
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1]) 
        return sp1[1] - sp1[1];
    if (sp1[2] - sp2[2]) 
        return sp1[2] - sp1[2];

    return sp1[3] - sp2[3];
}


// step2 
function computeCSS(elememt) {
    //step 3
    var elememts = stack.slice().reverse();
    //step 4
    if (!elememt.computedStyle) {
        elememt.computedStyle = {};
    }

    for (let rule of rules) {
        var selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorParts[0])) 
            continue;

        let matched = false;

        var j = 1;
        for (var i = 0; i < elememts.length; i++) {
            if (match(elememts[i], selectorParts[j])) {
                j++;
            }
        }

        if (j >= selectorParts.length)
            matched = true;

        if (matched) {
            //如果匹配到 则加入
            // step 6
            //console.log("Element", element, "matched rule", rule);
            var sp = specificity(rule.selector[0]);
            var computedStyle = element.computedStyle;
            for (var declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
        }
    }
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