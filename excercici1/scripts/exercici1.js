/* Funciones del juego */
function startGame() {
    var randomNumber = Math.round(Math.random() * 10);
    var colorDiv = document.getElementById("colorBasedNum");
    console.log(randomNumber); // --> Debug en la consola

    if (randomNumber >= 5) {
        colorDiv.style.backgroundColor = "green";
    } else {
        colorDiv.style.backgroundColor = "red";
    }

    var encertaHtml = window.open("encerta.html", "_blank", "width=600,height=400");

    encertaHtml.onload = function () {
        var encertaHtmlDocument = encertaHtml.document;
        var countText = encertaHtmlDocument.getElementById("cron");
        var tiempo = 1000;

        var RegresiveCount = setInterval(() => {
            countText.innerHTML = tiempo;
            tiempo--;

            if (tiempo < 0) {
                clearInterval(RegresiveCount);
                encertaHtml.close();
            }
        }, 1000);
    };

    encertaHtml.adivinarNum = adivinarNum;
    function adivinarNum() {
        var encertaHtmlDocument = encertaHtml.document;
        var clientNum = parseInt(encertaHtmlDocument.getElementById("newNum"))
        if (clientNum == randomNumber){
            encertaHtml.close();
        }else{
            alert("error");
        }
    }

}


