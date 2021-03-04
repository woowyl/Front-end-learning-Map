
// 深度优先  拿到新元素后直接放入set


var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];

var deepSet = new Set();
var uniSet = new Set();
// 用于存antv格式的列表
var antObjList = [];

objects.forEach(o => {
    // 对于 Atomics JSON  Math Reflect 这样的静态对象无法通过o.name拿到 name值
    var objName = o.name || o.toString();
    // 首先将对象名称放入set中
    deepSet.add(objName)
    uniSet.add(o);
    
    var curNode = {
        id: objName,
        children: []
    }
    // 遍历此对象中是否有 并将其放入set中
    getChildObj(o, objName, curNode.children);

    antObjList.push(curNode)
});


function getChildObj(o, path, children) {
    
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        
        if (["number", "string", "boolean", "undefined"].indexOf(typeof d.value) > -1) {
            //deepSet.add(path+"."+p);
            //uniSet.add(d.value);
            continue;
        }
    
        if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function") 
            && !uniSet.has(d.value)) {
            deepSet.add(path+"."+p);
            uniSet.add(d.value);

            var curNode = {
                id: p,
                children: []
            }
            getChildObj(d.value, path+"."+p, curNode.children);
            children.push(curNode)
        }
        if(d.get && !uniSet.has(d.get)) {
            deepSet.add(path+"."+p);
            uniSet.add(d.get);
            var curNode = {
                id: p,
                children: []
            }
            getChildObj(d.get, path+"."+p, curNode.children);
            children.push(curNode)
        }
        if(d.set && !uniSet.has(d.set)) {
            deepSet.add(path+"."+p);
            uniSet.add(d.set);
            var curNode = {
                id: p,
                children: []
            }
            getChildObj(d.set, path+"."+p, curNode.children);
            children.push(curNode)
        }
    }
}


let demoUrl = "https://codesandbox.io/s/purple-shape-bu11r?file=/index.js";





var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];

// 广度优先，拿到的新元素之间push到数组最后
var wideSet = new Set();
objects.forEach(o => wideSet.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!wideSet.has(d.value))
                wideSet.add(d.value), objects.push(d.value);
        if( d.get )  // 为什么get 和 set也算是固有对象？
            if(!wideSet.has(d.get))
                wideSet.add(d.get), objects.push(d.get);
        if( d.set )
            if(!wideSet.has(d.set))
                wideSet.add(d.set), objects.push(d.set);
    }
}

