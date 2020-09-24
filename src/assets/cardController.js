export function getCard(rank, suit, isVisible) {
    let rank_c = rank;
    let suit_c = suit;

    switch (rank) {
        case 'Jack': rank_c = 'J'; break;
        case 'Queen': rank_c = 'Q'; break;
        case 'King': rank_c = 'K'; break;
        case 'Ace': rank_c = 'A'; break;
    }

    switch (suit) {
        case 'Clubs': suit_c = 'C'; break;
        case 'Spades': suit_c = 'S'; break;
        case 'Hearts': suit_c = 'H'; break;
        case 'Diamonds': suit_c = 'D'; break;
    }

    if (!isVisible) {
        return require('./cards/yellow_back.png')
    }
    return require('./cards/'+rank_c+suit_c+'.png')
}