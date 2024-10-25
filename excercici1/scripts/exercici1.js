/* Funciones del juego */
function startGame() {
    var randomNumber = Math.round(Math.random() * 10);
    var colorDiv = document.getElementById("colorBasedNum");
    console.log("Número aleatorio generado:", randomNumber); // por si no lo adivinas :)

    colorDiv.style.backgroundColor = randomNumber >= 5 ? "green" : "red";

    var encertaHtml = window.open("encerta.html", "_blank", "width=600,height=400");
    var RegresiveCount;
    encertaHtml.onload = function () {
        var encertaHtmlDocument = encertaHtml.document;
        var countText = encertaHtmlDocument.getElementById("cron");

        encertaHtml.adivinarNum = adivinarNum; //--> Recordatorio => Esto asigna la funcion a la window del otro html, para que se pueda llamar desde ahi!
        var tiempo = 30;
        RegresiveCount = setInterval(() => {
            countText.innerHTML = tiempo;
            tiempo--;
            if (tiempo < 0) {
                clearInterval(RegresiveCount);
                encertaHtml.close();
            }
        }, 1000);
    };

    function adivinarNum() {
        var encertaHtmlDocument = encertaHtml.document;
        var clientNum = parseInt(encertaHtmlDocument.getElementById("newNum").value);

        if (clientNum === randomNumber) {
            console.log("correcto")
            encertaHtml.clearInterval(RegresiveCount)
            encertaHtml.close();
        } else {
            console.log("incorrecto")
        }
    }
}
