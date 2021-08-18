//在字符串中找到”a“

function match(string) {
    let matchA = false;
    for (let char of string) {
        if (char == "a") {
            matchA = true
        } else if (matchA && char == "b") {
            return true;
        } else {
            matchA = false;
        }
    }
    return false
}

console.log(match('hello abcde'));