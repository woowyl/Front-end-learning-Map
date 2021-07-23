class MyComponent {

}


function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === 'string') {
        e = document.createElement(tagName);
    } else {
        e = new type;
    }
    
    for (let arr in attributes) {
        e.setAttribute(arr, attributes[arr]);
    }

    for (let child of children) {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e;
}

document.body.appendChild(<MyComponent id="a" class="c">
    <div>abc</div>
    <div></div>
    <div></div>
</MyComponent>)