"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suitMapper = {
    hearts: 0,
    spades: 20,
    clubs: 40,
    diamonds: 60,
};
class Card {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(suit, value, covered = true) {
        this.suit = suit;
        this.value = value;
        this.covered = covered;
        this.removed = false;
        this.selected = false;
    }
    get id() {
        return this.value - 1 + suitMapper[this.suit];
    }
    toggleCover() {
        this.covered = !this.covered;
    }
}
exports.Card = Card;
//# sourceMappingURL=card.js.map