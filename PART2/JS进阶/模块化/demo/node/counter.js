
var counter = 1;
var objCounter = {
    num: 5
}

function addCounter() {
    counter ++;
    objCounter.num++;
}

module.exports = {
    objCounter: objCounter,
    counter: counter,
    addCounter: addCounter
}