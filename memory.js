let cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

let c0 = document.getElementById("c0")
let c1 = document.getElementById("c1")
let c2 = document.getElementById("c2")
let c3 = document.getElementById("c3")
let c4 = document.getElementById("c4")
let c5 = document.getElementById("c5")
let c6 = document.getElementById("c6")
let c7 = document.getElementById("c7")
let c8 = document.getElementById("c8")
let c9 = document.getElementById("c9")
let c10 = document.getElementById("c10")
let c11 = document.getElementById("c11")

for (let i = 0; i < cards.length; i++) {
    document.getElementById('c' + i).addEventListener("click", function () { showCard(i); });
}

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

function showCard(nr) {
    let opacityValue = $('#c' + nr).css('opacity');
    if (opacityValue != 0 && lock == false) {
        lock = true;
        let image = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', image);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).removeClass('card');

        if (oneVisible == false) {
            //first card
            oneVisible = true;
            visible_nr = nr;
            lock = false;
        }
        else {
            //second card
            if (cards[visible_nr] == cards[nr]) {
                setTimeout(function () { hide2Cards(nr, visible_nr) }, 750);
            }
            //wrong card
            else {
                setTimeout(function () { restore2Cards(nr, visible_nr) }, 1000);
            }

            turnCounter++;
            $('.score').html('Turn counter: ' + turnCounter);
            oneVisible = false;
        }
    }
}

function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', 0);
    $('#c' + nr2).css('opacity', 0);
    lock = false;
    pairsLeft--;

    if (pairsLeft == 0) {
        $('header').css('opacity', 0);
        $('.board').html('</br></br><h1>You win!</h1></br><p>Done in: ' + turnCounter + ' turns</p></br><span onclick="location.reload()">try again!</span>');
    }
}
function restore2Cards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url(img/karta.png)');
    $('#c' + nr1).addClass('card');
    $('#c' + nr1).removeClass('cardA');

    $('#c' + nr2).css('background-image', 'url(img/karta.png)');
    $('#c' + nr2).addClass('card');
    $('#c' + nr2).removeClass('cardA');
    lock = false;
}