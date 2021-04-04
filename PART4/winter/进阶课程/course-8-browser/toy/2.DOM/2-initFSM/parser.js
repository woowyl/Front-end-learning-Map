const EOF = Symbol("EOF");  //EOF: end of file

function data(c) {

}

module.exports.parseHTML = function(html) {
    let state = data;

    for (let char of html) {
        state = state(c)
    }

    state = state(EOF);

}