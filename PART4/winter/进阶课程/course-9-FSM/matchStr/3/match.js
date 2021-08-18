//在字符串中找到”abcdef“

function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;

    for (let char of string) {
        if (char == 'a') {
            foundA = true;
        } else if (foundA && char == 'b') {
            foundB = true;
        } else if (foundB && char == 'c') {
            foundC = true;
        } else if (foundC && char == 'd') {
            foundD = true;
        } else if (foundD && char == 'e') {
            return true;
        } else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
        }
    }
    return false;
}


console.log(match("hello abcdedfg"));
console.log(match("hello abcdg"));