let RENDER_TO_DOM = Symbol("render to dom");
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(component) {
        let range = document.createRange();
        range.setStart(this.root, 0);
        range.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](range);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}


class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}


export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) {
        this.children.push(component);
    }
    [RENDER_TO_DOM](range) {
        this.render()[RENDER_TO_DOM](range);
    }
}

export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === 'string') {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }
    
    for (let arr in attributes) {
        e.setAttribute(arr, attributes[arr]);
    }

    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if ((typeof child === "object") && (child instanceof Array)){
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);
    return e;
}


export function render(component, parentEle) {
    let range = document.createRange();
    range.setStart(parentEle, 0);
    range.setEnd(parentEle, parentEle.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}