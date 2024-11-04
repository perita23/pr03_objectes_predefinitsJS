/* Cookies functions */
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

/* Funciones del juego */
function startGame() {
    document.getElementById("history").innerHTML = ""

    var randomNumber = Math.round(Math.random() * 10);
    var colorDiv = document.getElementById("colorBasedNum");
    var intentos = new Array();
    console.log("Número aleatorio generado:", randomNumber); // por si no lo adivinas :)

    colorDiv.style.backgroundColor = randomNumber >= 5 ? "green" : "red";

    var encertaHtml = window.open("encerta.html", "_blank", "width=600,height=400");
    var RegresiveCount;
    encertaHtml.onload = function () {
        var encertaHtmlDocument = encertaHtml.document;
        var countText = encertaHtmlDocument.getElementById("cron");

        encertaHtml.adivinarNum = adivinarNum; //--> Recordatorio => Esto asigna la funcion a la window del otro html, para que se pueda llamar desde ahi!
        var tiempo = 10;
        RegresiveCount = setInterval(() => {
            countText.innerHTML = tiempo;
            tiempo--;
            if (tiempo < 0) {
                clearInterval(RegresiveCount);
                encertaHtml.close();
                document.getElementById("history").innerHTML = "<h1>Historial</h1><br><br>" + intentos
                console.log(document.cookie.split("; "));
                document.cookie = intentos.toString();
            }
        }, 1000);
    };

    function adivinarNum() {
        var encertaHtmlDocument = encertaHtml.document;
        var clientNum = parseInt(encertaHtmlDocument.getElementById("newNum").value);

        if (clientNum === randomNumber) {
            intentos.push("<b>Numero insertado =></b> " + clientNum + " -> correcto!<br>");
            encertaHtml.clearInterval(RegresiveCount)
            encertaHtml.close();
            document.getElementById("history").innerHTML = intentos
        } else {
            intentos.push("<b>Numero insertado =></b> " + clientNum + " -> erroneo!<br>");
        }
    }
}
