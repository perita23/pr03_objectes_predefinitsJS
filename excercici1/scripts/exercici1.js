
function startGame() {
    var colorDiv = document.getElementById("colorBasedNum");
    var randomNumber = Math.round((Math.random() * 10));
    console.log(randomNumber);

    if (randomNumber >= 5) {
        colorDiv.style.backgroundColor = "green"
    } else {
        colorDiv.style.backgroundColor = "red"
    }

    var newWindow = window.open("encerta.html", "_blank", "width=600,height=400");
    newWindow.onload = function () {
        var newDoc = newWindow.document;
        
    }


}