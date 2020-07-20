
    
    console.log("22");
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

    // 方法1
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