
function create(Cls, attributes, ...children) {
    
    let o;
    if (typeof Cls === 'string') {
        o = new Wrapper(Cls)
    } else {
        o = new Cls();
    }

    for(let name in attributes) {
        o.setAttribute(name, attributes[name])
    }

    for (let child of children) {
        if (typeof child === "string")
            child = new Text(child)
        o.appendChild(child);
    }
    return o;
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Wrapper {
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
    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}

class Carousel {
    constructor(config) { 
        this.children = [];
        this.attributes = new Map();
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this.attributes.set(name, value);
    } 
    appendChild(child) {
        this.children.push(child);
        //this.slot.appendChild(child);
    }

    render() {
        return <div>
           { this.data.map(url = > {
               let element = document.createElement("img");
           })}
        </div>
    }
    mountTo(parent) {
        this.slot = <div></div>
        //parent.appendChild(this.root);
        for (let child of this.children) {
            this.slot.appendChild(child)
            //child.mountTo(this.slot);
        }
        this.render().mountTo(parent);
    }
}
/**

class MyComponent {
    constructor(config) { 
        this.children = [];
        this.attributes = new Map();
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this.attributes.set(name, value);
    } 
    appendChild(child) {
        this.children.push(child);
        //this.slot.appendChild(child);
    }

    render() {
        return <article>
            <header>I am a header</header>
            {this.slot}
            <footer>I am a footer</footer>
        </article>
    }
    mountTo(parent) {
        this.slot = <div></div>
        //parent.appendChild(this.root);
        for (let child of this.children) {
            this.slot.appendChild(child)
            //child.mountTo(this.slot);
        }
        this.render().mountTo(parent);
    }
}
 * 
 */




/*let component = <div id="a" class="b" style="height:100px; width:100px; background-color: skyblue;">
        <div></div>
        <div></div>
        <div></div>
        <p></p>
        <span></span>
    </div>
**/


let component = <MyComponent>
    <div>hello wrold</div>
</MyComponent>
console.log(component);

component.mountTo(document.body);