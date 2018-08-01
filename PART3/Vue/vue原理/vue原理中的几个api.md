# 看懂原理前首先要熟悉的几个概念

## 1. Object.defineProperty(obj, key, {desp})


## 2. Object.key(obj}


## 3. document.createDocumentFragement()

  1. 结合appenChild使用
  2. 不会直接将documentFragement对象插入 而是将其子元素一并插入，减少dom渲染的次数


## 4. DOM nodeType属性

|值|类型|描述
|---|---|---|
|1|Element|代表元素|
|2|Attr|代表属性|
|3|Text|代表元素或属性中的内容|
|8|comment| 代表注释|
|9|Document|代表整个文档|
|11|DocumentFragment|代表轻量级的 Document 对象，能够容纳文档的某个部分|

## 5. call apply