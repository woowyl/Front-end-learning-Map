// 在字符串中找到“abcd” 状态机写法

function match(string) {
    let state = start;
    for (let char of string) {
        state = state(char);
    }

    return state == end;
}

function start(c) {
    if (c == 'a') {
        return foundA;
    } else {
        return start
    }
}

function end() {
    return end;
}

function foundA(c) {
    if (c == 'b') {
        return foundB;
    } else {
        return start(c);
    }
}


function foundB(c) {
    if (c == 'c') {
        return foundC;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if (c == 'd') {
        return end;
    } else {
        return start(c);
    }
}



console.log(match('gegabcdef'));
console.log(match('aaaabcdef'));
console.log(match('aaaabcdef'));