var RegresiveCount;
var colorList = ["red", "blue", "green", "yellow"];
var windowList = [];
var actualWindow = null;
var openedWindows = 0;

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function checkColors(ventana) {
    console.log("funciona")
    if (actualWindow == null) {
        actualWindow = ventana;
    } else {
        color1 = actualWindow.document.getElementById("colorText").getHTML();
        color2 = ventana.document.getElementById("colorText").getHTML();
        if (ventana == actualWindow) {
            windowGenerator(1);
        }
        if (color1 == color2 && ventana != actualWindow) {
            ventana.close();
            actualWindow.close();
            actualWindow = null;

            let index1 = windowList.indexOf(actualWindow);
            windowList.splice(index1, 1);
            let index2 = windowList.indexOf(ventana);
            windowList.splice(index2, 1);

            console.log(windowList)
        } else {
            actualWindow = null
        }
    }
}

function windowGenerator(rand) {
    for (let index = 0; index < rand; index++) {
        let randColor = randomNumber(0, 4);
        let color = colorList[randColor]
        let ventana = window.open(
            "colorWindow.html",
            "_blank",
            `width=400,height=200,left=${randomNumber(0, screen.width)},top=${randomNumber(0, screen.height)},resizable=no,scrollbars=no`
        )
        openedWindows++;

        ventana.addEventListener("load", () => {
            ventana.document.getElementById("colorText").innerHTML = color;
            ventana.document.body.style.backgroundColor = color;
            ventana.addEventListener("click", () => checkColors(ventana));
            windowList.push(ventana);
        })
    }
    console.log(windowList)
}

function startGame() {
    var time = 30;
    var count = document.getElementById("count")

    if (RegresiveCount == null) {
        console.log("starting game")
        count.innerHTML = time;
        let timeToSpawn = time - 3;
        RegresiveCount = setInterval(() => {
            if (time == 0) {
                clearInterval(RegresiveCount);
                windowList.forEach(element => {
                    element.close()
                });
                console.log(openedWindows);
                alert("Se acabó!")
            }
            if (time == 1) {
                let rand = randomNumber(3, 5);
                console.log(rand)
                windowGenerator(rand);
            }
            time--;
            count.innerHTML = time;
        }, 1000);
    } else {
        console.log("There's an active interval")
    }

}