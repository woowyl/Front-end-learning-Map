# css

## 标准 2.1的语法

- ![https://www.w3.org/TR/CSS21/grammar.html#q25.0](https://www.w3.org/TR/CSS21/grammar.html#q25.0)
- ![https://www.w3.org/TR/css-syntax-3/](https://www.w3.org/TR/css-syntax-3/)

## 总体结构
- @charset
- @import
- rules
  - @media
  - @page
  - rule

## 所有的at rule


## 普通CSS 规则

- Selector
 - https://www.w3.org/TR/selectors-3/
 - https://www.w3.org/TR/selectors-4/
 
- Key
 - Properties
 - Variables
- Value
 - https://www.w3.org/TR/css-values-4/


## 获取代码

``` js
var lis = document.getElementById("container").children

var result = [];

for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/))
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
}
console.log(result)
```

```js
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);


function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}


void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();
```
## 梳理知识
- postcss
- vw 