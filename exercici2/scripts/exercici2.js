/*Global Var 
 * @param RegresiveCount => Cuenta atras
 * @param colorList => array de colores
 * @param windowList => array de ventanas abiertas
 * @param actualWindow => ventana clicada en la primera vez, esta se usa para verificar si se habia clicado una ventana antes o no
 * @param openedWindows => contador del total de ventanas que se han abierto durante la partida
 * @param ventanasUnclosed => contador de ventanas sin cerrar durante el juego, se usa para saber si has ganado o perdido
 */
var regresiveCount;
var colorList = ["red", "blue", "green", "yellow"];
var windowList = [];
var actualWindow = null;
var openedWindows = 0;
var ventanasUnclosed = 0;
var isCenter = false;
var cookieCont = document.getElementById("cookieCont");

cookieCont.innerHTML = getCookie("lastTry")

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

/** Generador de numeros random
 * @param min => valor minimo que puede devolver la funcion
 * @param max => valor maximo que puede devovler la funcion
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

/**
 * Recibe una ventana, verifica si ya hay una ventana guardada y decide si comparar o esperar a la siguiente ventana
 * 
 * @param ventana => ventana que recibe la funcion, al llamar a esta funcion se pasa la ventana desde la cual se ha llamado a la funcion
 */
function checkColors(ventana) {
    if (actualWindow == null) {
        actualWindow = ventana;
    } else {
        color1 = actualWindow.document.getElementById("colorText").getHTML();
        color2 = ventana.document.getElementById("colorText").getHTML();
        if (ventana == actualWindow) {
            let randColor = randomNumber(0, 4);
            ventana.document.getElementById("colorText").innerHTML = colorList[randColor];
            ventana.document.body.style.backgroundColor = colorList[randColor];
            windowGenerator(1);
        }
        if (color1 == color2 && ventana != actualWindow) {
            let index1 = windowList.indexOf(actualWindow);
            windowList.splice(index1, 1);
            let index2 = windowList.indexOf(ventana);
            windowList.splice(index2, 1);

            ventana.close();
            actualWindow.close();
            actualWindow = null;

            console.log("validando activeWindows")
            validateActiveWindows()
        } else {
            actualWindow = null
        }
    }
}
/** Generador de ventanas
 * @param rand => numero de ventanas que se han de generar
 */
function windowGenerator(rand) {
    for (let index = 0; index < rand; index++) {
        let randColor = randomNumber(0, 4);
        let color = colorList[randColor]
        let randX = randomNumber(0, screen.width);
        let randY = randomNumber(0, screen.height)
        if (!isCenter) {
            randX = screen.width / 2;
            randY = screen.height / 2;
            isCenter = true;
        }
        let ventana = window.open(
            "colorWindow.html",
            "_blank",
            `width=400,height=200,left=${randX},top=${randY},resizable=no,scrollbars=no`
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
/**
 * Empieza el juego, empieza la cuenta atras y el interval que se ejecuta cada segundo.
 * Durante los tres primeros segundos se van a generar nuemeros aleatorios de ventanas.
 */
function startGame() {
    var TIME = 220;
    var spawnTime = TIME - 3;
    ventanasUnclosed = 0;

    var count = document.getElementById("count");
    var btnText = document.getElementById("btnText");
    var infoGame = document.getElementById("infoGame");

    infoGame.innerHTML = "";

    if (regresiveCount == null) {
        btnText.innerHTML = "Jugando...";
        count.innerHTML = TIME;

        regresiveCount = setInterval(() => {
            if (TIME >= spawnTime) {
                let rand = randomNumber(1, 5);
                windowGenerator(rand);
            }

            if (TIME == 0) {
                finishGame()
            }
            TIME--;
            count.innerHTML = TIME;
        }, 1000);
    } else {
        console.log("There's an active interval")
    }

}
/**
 * Valida cuantas ventanas activas hay, si son 0 (es decir no hay ventanas activas) finaliza el juego
 */
function validateActiveWindows() {
    ventanasUnclosed = 0;
    windowList.forEach(element => {
        if (element != null) {
            ventanasUnclosed++
        }
    })
    console.log(ventanasUnclosed)
    if (ventanasUnclosed == 0) {
        finishGame()
    }
}
/**
 * Acaba el juego, limpia el intervalo y cierra todas las ventanas que han quedado abiertas (No quiero explotarle el pc al profe :c )
 */
function finishGame() {
    let state;
    closeAllWindows();

    if (ventanasUnclosed == 0 && regresiveCount) {
        state = "Ganada"
        infoGame.innerHTML = "Has ganado!";
    } else if (regresiveCount) {
        state = "Perdida"
        infoGame.innerHTML = "Se acabó el tiempo <br>Has perdido!"
    }
    if (regresiveCount) {
        setCookie("lastTry", "Estado de la ultima partida:" + state + "<br>Ventanas abiertas:" + openedWindows, 1);
        cookieCont.innerHTML = getCookie("lastTry");
        btnText.innerHTML = "Reintentar";
    }
    clearInterval(regresiveCount)
    regresiveCount = null;
}
/**
 * cierra todas las ventanas activas
 */
function closeAllWindows() {
    windowList.forEach(element => {
        if (element != null) {
            ventanasUnclosed++;
            element.close()
        }
    });
}