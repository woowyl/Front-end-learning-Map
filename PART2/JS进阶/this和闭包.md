# this 闭包

## 代码比较

```js

function likeGen(){
    let i = 0;
    return {
      value: i,
      next: function() {
           i++;
           return {
              value: i,
              done: false
            }
       }
    }
}
```

```js

function likeGen2(){
    this.i = 0;
    return {
      value: this.i,
      next: function() {
           i++;
           return {
              value: this.i,
              done: false
            }
       }
    }
}
```


```js

function likeGen3() {
   this.value = 1;
   this.next = function() {
     this.i++;
     console.log(this.i);
  }
}
```