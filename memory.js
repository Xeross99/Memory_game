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
    let card = document.getElementById('c' + nr);
    let opacityValue = window.getComputedStyle(card).getPropertyValue('opacity');
    if (opacityValue != 0 && lock == false) {
        lock = true;
        let image = "url(img/" + cards[nr] + ")";

        card.style.backgroundImage = image;
        card.classList.add('cardA');
        card.classList.remove('card');

        if (!oneVisible) {
            // First card
            oneVisible = true;
            visible_nr = nr;
            lock = false;
        } else {
            // Second card
            if (cards[visible_nr] === cards[nr]) {
                setTimeout(function () { hide2Cards(nr, visible_nr); }, 750);
            } else {
                setTimeout(function () { restore2Cards(nr, visible_nr); }, 1000);
            }

            turnCounter++;
            document.querySelector('.score').innerHTML = 'Turn counter: ' + turnCounter;
            oneVisible = false;
        }
    }
}

function hide2Cards(nr1, nr2) {
    let card1 = document.getElementById('c' + nr1);
    let card2 = document.getElementById('c' + nr2);

    card1.style.opacity = '0';
    card2.style.opacity = '0';
    lock = false;
    pairsLeft--;

    if (pairsLeft === 0) {
        document.querySelector('header').style.opacity = '0';
        document.querySelector('.board').innerHTML = `
            </br></br><h1>You win!</h1></br>
            <p>Done in: ${turnCounter} turns</p></br>
            <span onclick="location.reload()">try again!</span>`;
    }
}

function restore2Cards(nr1, nr2) {
    let card1 = document.getElementById('c' + nr1);
    let card2 = document.getElementById('c' + nr2);

    card1.style.backgroundImage = 'url(img/karta.png)';
    card1.classList.add('card');
    card1.classList.remove('cardA');

    card2.style.backgroundImage = 'url(img/karta.png)';
    card2.classList.add('card');
    card2.classList.remove('cardA');

    lock = false;
}