import {Carousel2} from "./carousel.vue";
import {create, Text, Wrapper} from './createElement'

class Carousel {
    constructor(config) { 
        this.children = [];
        this.attributes = new Map();
    }
    set class(v) { //property
        console.log("Parent::class", v);
    } 
    setAttribute(name, value) {  //attribute
        this[name] = value;
    } 
    appendChild(child) {
        this.children.push(child);
        //this.slot.appendChild(child);
    }

    render() {
        console.log(this);
        let children = this.data.map( url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {children }
        </div>
        let position = 0;

        let nextPic = ()=> {
            let nextPosition = (position+1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition]

            current.style.transition = "none"
            next.style.transition = "none"

            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

            setTimeout(() => {
                current.style.transition = ""; // ="" means use css rule
                next.style.transition = ""; // =""

                current.style.transform = `translateX(${- 100 - 100 * position}%)`;
                next.style.transform = `translateX(${- 100 * nextPosition}%)`;

                position = nextPosition;
            }, 16)  //16是一帧的时间  1000/60s
            setTimeout(nextPic, 3000)
        } 
        setTimeout(nextPic, 3000)
        // 第一步修改
        return root;
    }
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}

let component = <Carousel data= {[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
</Carousel>
console.log(component);

component.mountTo(document.body);