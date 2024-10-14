deckId = '';
remaining = 0;

function newDeck(url){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data =>
    {
        if(!data.success){
            console.console.error('Failed to create a new deck');
            return;
        }

        deckId = data.deck_id;

        document.getElementById('deck-title').innerText = `Remaining:${data.remaining}`;

        console.log(`New deck id: ${deckId}`);
    })
    .catch(err => console.log(err))
}

function reshuffle(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then(res => res.json())
    .then(data =>
    {
        if(!data.success){
            console.console.error('Failed to shuffle deck');
            return;
        }

        document.getElementById('deck-title').innerText = `Remaining:${data.remaining}`;

        console.log('Deck reshuffled');
    })
    .catch(err => console.log(err))
}

function drawACard() {
    drawCards(1);
}

function drawCards(count){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
    .then(res => res.json())
    .then(data =>
    {
        if(!data.success){
            console.console.error('Failed to create a new deck');
            return;
        }

        let code = data.cards[0].code;
        let image = data.cards[0].image;
        let value = data.cards[0].value;
        let suit = data.cards[0].suit;

        document.getElementById('card-img').src = image;
        document.getElementById('card-img').alt = `${value} of ${suit}`;
        document.getElementById('card-title').innerText = `${value} of ${suit}`;

        document.getElementById('deck-title').innerText = `Remaining:${data.remaining}`;

        console.log(`Card: ${value} of ${suit}`);
    })
    .catch(err => console.log(err))
}

//getApi('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');