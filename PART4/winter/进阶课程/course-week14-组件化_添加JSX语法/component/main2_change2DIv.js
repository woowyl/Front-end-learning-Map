
function create(Cls, attributes, ...children) {

    for(let name in attributes) {
        o.setAttribute(name, attributes[name])
    }

    for (let child of children) {
        o.appendChild(child);
    }
    return o;
}

class Div {
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
        this.children.push(child);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}

let component = <Div id="a" class="b" style="height:100px; width:100px; background-color: skyblue;">
        <Div></Div>
        <Div></Div>
        <Div></Div>
    </Div>

console.log(component);

component.mountTo(document.body);