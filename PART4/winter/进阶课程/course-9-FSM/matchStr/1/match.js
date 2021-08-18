// 在字符串中找到 "a"  
function match(str, char) {
    for (let c of str) {
        if (c == char) {
            return true; 
        } 
    }
    return false;
}


let str = 'I am a robot';

let result = match(str, 'a')