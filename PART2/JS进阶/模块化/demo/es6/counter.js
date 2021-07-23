
let counter = 1;
let objCounter = {
    num: 5
}

function addCounter() {
    counter ++;
    objCounter.num++;
}

// export default {
//     counter,
//     objCounter,
//     addCounter
// }

export {
    counter,
    objCounter,
    addCounter
}