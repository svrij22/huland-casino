export function getCard(rank, suit, isVisible) {
    let rank_c = rank;
    let suit_c = suit;

    switch (rank) {
        case 'jack': rank_c = 'J'; break;
        case 'queen': rank_c = 'Q'; break;
        case 'king': rank_c = 'K'; break;
        case 'ace': rank_c = 'A'; break;
    }

    switch (suit) {
        case 'clubs': suit_c = 'C'; break;
        case 'spades': suit_c = 'S'; break;
        case 'hearts': suit_c = 'H'; break;
        case 'diamonds': suit_c = 'D'; break;
    }

    if (!isVisible) {
        return require('./cards/yellow_back.png')
    }
    return require('./cards/'+rank_c+suit_c+'.png')
}