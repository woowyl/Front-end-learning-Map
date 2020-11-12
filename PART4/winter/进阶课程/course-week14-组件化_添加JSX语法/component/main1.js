
function create(Cls, attributes, ...children) {
    
    let o = new Cls({
        timer: 2
    });

    for(let name in attributes) {
        o.setAttribute(name, attributes[name])
    }

    for (let child of children) {
        o.appendChild(child);
    }
    return o;
}

class Parent {
    constructor(config) {
        this.children = [];
        this.root = document.createElement("div");
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this.root.setAttribute(name, value);
    } 
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Child {
    constructor(config) {
        this.children = [];
        this.root = document.createElement("div");
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

let component = <Parent id="a" class="b">
        <Child></Child>
        <Child></Child>
        <Child></Child>
    </Parent>

console.log(component);

component.mountTo(document.body);