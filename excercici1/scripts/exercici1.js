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
        var tiempo = 7;
        RegresiveCount = setInterval(() => {
            countText.innerHTML = tiempo;
            tiempo--;
            if (tiempo < 0) {
                clearInterval(RegresiveCount);
                encertaHtml.close();
                document.getElementById("history").innerHTML = "<h1>Historial</h1><br><br>" + intentos
                console.log(document.cookie.split("; "));
            }
        }, 1000);
    };

    function adivinarNum() {
        var encertaHtmlDocument = encertaHtml.document;
        var clientNum = parseInt(encertaHtmlDocument.getElementById("newNum").value);

        if (clientNum === randomNumber) {
            console.log("correcto");
            intentos.push("<b>Numero insertado =></b> " + clientNum + " -> correcto!<br>");
            encertaHtml.clearInterval(RegresiveCount)
            encertaHtml.close();
            console.log(document.cookie.split("; "));
            document.getElementById("history").innerHTML = intentos
        } else {
            console.log("incorrecto");
            intentos.push("<b>Numero insertado =></b> " + clientNum + " -> erroneo!<br>");
        }
        document.cookie = intentos;
    }
}
