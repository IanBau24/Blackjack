/* 2C = Two of clubs
* 2D = Two of diamonds
* 2H = Two of hearts
* 2S = Two of spades
*/

let deck = [];
const cardSuits = ['C', 'D', 'H', 'S'];
const letterCards = ['A', 'J', 'Q', 'K'];
let playerScore = 0, computerScore = 0;
let totalPlayerScore = 0;
let totalCompScore = 0;

// Reference to html
const btnNewGame = document.querySelector('#btnNewGame');
const btnHitMe = document.querySelector('#btnHitMe');
const btnQuit = document.querySelector('#btnQuit');

let scoreHTML = document.querySelectorAll('small'); // saves all the smalls in an array to scoreHTML
let divPlayerCard = document.querySelector('#player-cards');
let divComputerCard = document.querySelector('#computer-cards');
// let totalPlayerScore = document.querySelector('#totalPlayerScore');
// let totalCompScore = document.querySelector('#totalCompScore');


// create deck
const createDeck = () =>{
    console.log({deck});
    for(let i = 2; i <=10 ; i++){ // for loop to fill the deck, cards are from 2-10 plus letter cards
        for(let suit of cardSuits){
            deck.push(i + suit); // used an of loop and the suits so all the suits for the current i are made
        }
    }
    for(let suit of cardSuits){ // loops through the suits
        for(let letter of letterCards){
            deck.push(letter + suit); // creates each letter card for each suit
        }
    }
    // using underscore library
    deck = _.shuffle(deck);
    return deck;
}

createDeck(); //created deck and suffled it


const hitMe = () => {
    if(deck.length === 0){ // will not work if deck is empty
        throw 'Not enough cards in deck';
    }
    return deck.pop(); // this function pops a card from the deck and returns it
}

const cardVal = (card) =>{
    const value = card.substring(0,card.length-1); // trims the last letter, works for 10D and for 1D regardless
    return (isNaN(value)) ? ((value=== "A") ? 11:10): (value*1); // nested ternary
    // isNaN checks if it is not a number and returns true if true, multiply value * 1 to parse string into int
}

// Computer turn
const compTurn = (minScore) =>{
    // Do while since the computer has to play at least once before trying to match the player's score
    do {
        const card = hitMe();
        computerScore += cardVal(card);
        scoreHTML[1].innerText = computerScore;
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('card'); 
        divComputerCard.append(imgCard);
        if(minScore > 21){ //game will stop so the computer will just draw one card and win
            break;
        }
    } while (minScore <= 21 && computerScore < minScore); // computer will try to match player score unless player goes past 21

    // To prevent the alert from showing earlier than the cards display
    setTimeout(() =>{ // pauses for 1000 ms and then evaluates the if statement
    if(computerScore === minScore){
        alert('Draw');
    } else if(minScore > 21 || (computerScore > minScore && computerScore <= 21)){
        alert('You lose');
        totalCompScore++;
        scoreHTML[3].innerText = totalCompScore;

    } else if(computerScore > 21){
        alert('You win');
        totalPlayerScore++;
        scoreHTML[2].innerText = totalPlayerScore;
    }
    }, 1000);
}




// Events
// Will display the card, remove it form the deck, add and add it to the player score
btnHitMe.addEventListener('click', () => { // 'listens' to a click on the button
    const card = hitMe(); // when clicked, a card will be taken from the deck
    playerScore += cardVal(card); // update player score
    scoreHTML[0].innerText = playerScore; // uses the html reference and sets the first value (first score) to player score

    const imgCard = document.createElement('img'); // creates the card in memory, we still need to append it to the html
    imgCard.src = `assets/cartas/${card}.png`; // uses the card to reference it in the assets
    imgCard.classList.add('card'); // add the card class for styling
    divPlayerCard.append(imgCard); // will add the card to the corresponding div so it displays on the page

    if(playerScore > 21){
        console.warn('You lost');
        btnHitMe.disabled = true; // disables button
        btnQuit.disabled = true;
        compTurn(playerScore);
        
    } else if (playerScore === 21){
        console.warn('Nice');
        btnHitMe.disabled = true;
        btnQuit.disabled = true;
        compTurn(playerScore);
    }
});

btnQuit.addEventListener('click', () =>{ // hold button will disable hit me and itself and call the computer to play
    btnHitMe.disabled = true;
    btnQuit.disabled = true;
    compTurn(playerScore);
});

btnNewGame.addEventListener('click', () =>{
    console.clear();

    deck = [];
    deck = createDeck();
    playerScore = 0;
    computerScore = 0;
    scoreHTML[0].innerText = 0;
    scoreHTML[1].innerText = 0;

    divComputerCard.innerHTML = '';
    divPlayerCard.innerHTML = '';

    btnHitMe.disabled = false;
    btnQuit.disabled = false;

});