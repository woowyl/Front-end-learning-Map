// 处理属性 attribute

let currentToken = null
let currentAttribute = null

function emit(token) {
  if (token.type != "text") 
    console.log(token)
}

const EOF = Symbol("EOF")

function data(char) {
  if (char == "<") {
    return tagOpen
  } else if (char == EOF) {
    emit({
      type: "EOF"
    })
    return 
  } else {
    emit({
      type: "text",
      content: char
    })
    return data
  }
}


// 1. 开始标签
// 2. 结束标签
// 3. 自封闭标签
function tagOpen(char) {
  if (char == "/") { // 结束标签
    return endTagOpen
  } else if (char.match(/^[a-zA-Z]$/)) { // 开始标签
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(char)
  } else {
    // return data
  }
}


function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(char)
  } else if (char == ">") {
    // return data
  } else if(char == EOF) {
    // return data
  }
}


function tagName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName(char)
  } else if (char == "/") {
    return selfClosingStartTag
  } else if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char.toLowerCase()
    return tagName
  } else if (char == ">") {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}


function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char == ">" || char == "/" || char == EOF) {
    return afterAttributeName(char)
  } else if (char == "=") {
    return 
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(char)
  }
}

function afterAttributeName(char) {
  if (char == "/") {
    return selfClosingStartTag
  } else if (char == EOF) {
    return 
  } else {
    emit(currentToken)
    return data
  }
}

function attributeName(char) {
  if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) { 
    return afterAttributeName(char)
  } else if (char == "=") {
    return beforeAttributeValue
  } else if (char == "\u0000") {
    // return data
  } else if (char == "\"" || char == "\'" || char == "<") {
    return attributeName
  } else {
    currentAttribute.name += char
    return attributeName
  }
}

function beforeAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) { 
    return beforeAttributeValue
  } else if (char == "\"") {
    return doubleQuotedAttributeValue
  } else if (char == "\'") {
    return singleQuotedAttributeValue
  } else if (char == ">") {
    emit(currentToken)
    // return data
  } else {
    return UnquotedAttributeValue(char)
  }
}

function doubleQuotedAttributeValue(char) {
  if (char == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (char == "\u0000") {
    // return data
  } else if (char == EOF) {
    // return data
  } else {
    currentAttribute.value += char
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(char) {
  if (char == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (char == "\u0000") {
    // return data
  } else if (char == EOF) {
    // return data
  } else {
    currentAttribute.value += char
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char == "/") {
    return selfClosingStartTag
  } else if (char ==">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (char == EOF) {
    // return data
  } else {
    // return data
  }
}

function UnquotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    // emit(currentToken)
    return beforeAttributeName
  } else if (char == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value
    // emit(currentToken)
    return selfClosingStartTag
  } else if (char == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (char == "\u0000") {
    // return data
  } else if (char == "\"" || char == "\'" || char == "<" || char == "=" || char == "`") {
    // return data
  } else if (char == EOF) {
    // return data
  } else {
    currentAttribute.value += char
    return UnquotedAttributeValue
  }
}


function selfClosingStartTag(char) {
  if (char == ">" || char == "/") {
    currentToken.isSelfClosing = true
    currentToken.type = "selfClosingTag"
    emit(currentToken)
    return data
  } else if (char == "EOF") {
    // return data
  } else {
    // return data
  }
}

module.exports.parseHTML = function parseHTML(html){

  let state = data

  for (let char of html) {
    state = state(char)
    // console.log(state)
  }

  state = state(EOF)
  
}