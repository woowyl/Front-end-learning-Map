
    let greenLight = document.getElementsByClassName("green");
    let redLight = document.getElementsByClassName("red");
    let yellowLight = document.getElementsByClassName("yellow");
    let lights= document.getElementsByClassName("light");
    
    function green() {
        for (let i=0 ; i < lights.length; i++) {
            lights[i].classList.remove("lighted");
        }
        greenLight[0].classList.add("lighted");
    }
    
    function red() {
        for (let i=0 ; i < lights.length; i++) {
            lights[i].classList.remove("lighted");
        }
        redLight[0].classList.add("lighted");
    }
    
    function yellow() {
        for (let i=0 ; i < lights.length; i++) {
            lights[i].classList.remove("lighted");
        }
        yellowLight[0].classList.add("lighted");
    }

    // 方法 settime时序
    function go1() {
        green();
        setTimeout(() => {
            yellow();
        }, 1000);
        setTimeout(() => {
            red();
        }, 2000);
        setTimeout(() => {
            go1();
        }, 3000);
    }

    // 方法2  settimeout 嵌套
    function go2() {
        green();
        setTimeout(() => {
            yellow();
            setTimeout(() => {
                red();
                setTimeout(() => {
                    go2();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    // 方法3 promise  链式表达
    function go3() {
        green();
        sleep(1000).then(() => {
            yellow();
            return sleep(1000);
        }).then(() => {
            red();
            return sleep(1000);
        }).then(go3)
    }

    function sleep(t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, t);
        })
    }

    // 方法4 await async + 递归异步编程
    async function go4() {
        green();
        await sleep(2000);
        yellow();
        await sleep(1000);
        red();
        await sleep(2000);
        go4();
    }

    // 方法5 await async + while 异步编程
    async function go5() {
        while (true) {
            green();
            await sleep(2000);
            yellow();
            await sleep(1000);
            red();
            await sleep(2000);
        }
    }

    // 手动控制
    function happen(ele, event) {
        return new Promise((resolve, reject) => {
            ele.addEventListener(event, resolve, {once: true})
        })
    }

    async function go6() {
        while (true) {
            green();
            await happen(document.getElementById("next"), "click");
            yellow();
            await happen(document.getElementById("next"), "click");
            red();
            await happen(document.getElementById("next"), "click");
        }
    }

    // generator 版本
    
    function* go7() {
        while (true) {
            green();
            yield sleep(2000);
            yellow();
            yield sleep(1000);
            red();
            yield sleep(2000);
        }
    }

    function co(iterator) {
        let {value, done} = iterator.next();
        if (done) return;
        if (value instanceof Promise) {
            value.then(() => {
                co(iterator)
            })
        }
    }

    //co(go7())

    // generator 改进版本

    function* go8() {
        while (true) {
            green();
            yield sleep(2000);
            yellow();
            yield sleep(1000);
            red();
            yield sleep(2000);
        }
    }

    function run(iterator) {
        let {value, done} = iterator.next();
        if (done) return;
        if (value instanceof Promise) {
            value.then(() => {
                run(iterator)
            })
        }
    }

    function co2(generator) {
        return function() {
            return run(generator())
        }
    }

    go8 = co2(go8)

    // 无线循环的例子
    async function* g() {
        let i = 0;
        while (true) {
            await sleep(1000);
            yield i++;
        }
    }

    //执行一下js

    // for await(let v of g()) {
    //     console.log(v);
    // }