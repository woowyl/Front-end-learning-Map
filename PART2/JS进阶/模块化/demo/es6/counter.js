
var counter = 1;
var objCounter = {
    num: 5
}

function addCounter() {
    counter ++;
    objCounter.num++;
}

export default {
    counter,
    objCounter,
    addCounter
}