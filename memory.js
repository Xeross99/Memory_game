let cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

shuffleArray(cards);

for (let i = 0; i < cards.length; i++) {
    document.getElementById('c' + i).addEventListener("click", function () { showCard(i); });
}

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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