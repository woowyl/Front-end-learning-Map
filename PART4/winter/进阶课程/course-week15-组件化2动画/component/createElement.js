export function create(Cls, attributes, ...children) {
    
    let o;
    if (typeof Cls === 'string') {
        o = new Wrapper(Cls)
    } else {
        o = new Cls();
    }

    for(let name in attributes) {
        o.setAttribute(name, attributes[name])
    }

    let visit = (children) => {
        for (let child of children) {
            if (typeof child == "object" && child instanceof Array){
                visit(child);
                continue;
            }
            if (typeof child === "string")
                child = new Text(child);
            o.appendChild(child);
        }
    }

    visit(children);

    return o;
}

export class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

export class Wrapper {
    constructor(type) { 
        this.children = [];
        this.root = document.createElement(type);
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this.root.setAttribute(name, value); 
    } 
    appendChild(child) {
        this.children.push(child);
    }

    get style() {
        return this.root.style
    }

    // step 2  为element加addeventlistener 方法
    addEventListener() {
        this.root.addEventListener(...arguments);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}