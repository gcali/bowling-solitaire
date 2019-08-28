"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const randomshuffle_1 = tslib_1.__importDefault(require("randomshuffle"));
const shuffler = randomshuffle_1.default();
class Pile {
    constructor(cards) {
        this.cards = cards;
    }
    shuffle() {
        this.cards = shuffler(this.cards);
    }
    drawPile(n) {
        return new Pile(this.draw(n));
    }
    draw(n) {
        const startIndex = Math.max(this.cards.length - n, 0);
        const result = this.cards.splice(startIndex, n);
        return result;
    }
    applyTo(index, callback) {
        if (this.cards.length === 0) {
            return;
        }
        index = (this.cards.length + index) % this.cards.length;
        callback(this.cards[index]);
    }
    filter(callback) {
        this.cards = this.cards.filter(callback);
    }
    get length() {
        return this.cards.length;
    }
}
exports.Pile = Pile;
class PinTable {
    constructor(cards) {
        this.cards = cards;
        this.removeSelected = () => {
            let counter = 0;
            this.cards.forEach((c) => {
                if (c.selected) {
                    counter++;
                    c.removed = true;
                    c.selected = false;
                }
            });
            return counter;
        };
        this.canRemoveWith = (n) => {
            const expected = this.currentlySelectedSum;
            // const expected = this.cards.filter(c => c.selected).map(c => c.value).reduce((curr, next) => curr + next, 0);
            return expected > 0 && ((expected % 10) === (n % 10));
        };
        this.select = (card, isFirstRound) => {
            if (card.selected) {
                card.selected = false;
                const selectedCards = this.cards.filter((c) => c.selected);
                selectedCards.forEach((c) => c.selected = false);
                if (this.canSelectMultiple(selectedCards, isFirstRound)) {
                    selectedCards.forEach((c) => c.selected = true);
                }
            }
            else {
                if (this.canSelect(card, isFirstRound)) {
                    card.selected = true;
                }
            }
        };
        this.canSelectMultiple = (cards, isFirstRound) => {
            if (cards.length === 0) {
                return true;
            }
            for (let i = 0; i < cards.length; i++) {
                if (this.canSelect(cards[i], isFirstRound)) {
                    this.select(cards[i], isFirstRound);
                    const canSelect = this.canSelectMultiple(cards.slice(0, i).concat(cards.slice(i + 1)), isFirstRound);
                    this.select(cards[i], isFirstRound);
                    if (canSelect) {
                        return true;
                    }
                }
            }
            return false;
        };
        // private canSelect = (card: T, isFirstRound: boolean) => {
        this.canSelect = (card, isFirstRound) => {
            card = this.cards.find((c) => c.id === card.id);
            if (card.removed) {
                return false;
            }
            const selectedCount = this.getSelectedCount(); // this.cards.filter((c) => c.selected && !c.removed).length;
            const rows = this.cardRows;
            const [row, rowIndex, indexInRow] = this.getRowAndIndexes(card);
            if (isFirstRound && selectedCount === 0 && rowIndex === 1 && indexInRow === 1) {
                return false;
            }
            if (isFirstRound && rowIndex === 0) {
                return false;
            }
            if (selectedCount === 0) {
                return true;
            }
            else if (selectedCount >= 3) {
                return false;
            }
            if (indexInRow > 0) {
                if (row[indexInRow - 1].selected) {
                    return true;
                }
            }
            if (indexInRow < row.length - 1 && row[indexInRow + 1].selected) {
                return true;
            }
            if (rowIndex > 0) {
                if (rows[rowIndex - 1][indexInRow].selected) {
                    return true;
                }
                if (rows[rowIndex - 1][indexInRow + 1].selected) {
                    return true;
                }
            }
            if (rowIndex < rows.length - 1) {
                const nextRow = rows[rowIndex + 1];
                if (indexInRow < nextRow.length && nextRow[indexInRow].selected) {
                    return true;
                }
                if (indexInRow > 0) {
                    if (nextRow[indexInRow - 1].selected) {
                        return true;
                    }
                }
            }
            return false;
        };
        if (this.cards.length > 10) {
            throw new Error('PinTable must have at most 10 cards');
        }
        this.cards = this.cards.reverse();
    }
    get cardRows() {
        const pins = new Pile([...this.cards]);
        const result = [];
        for (let i = 4; i > 0; i--) {
            result.push(pins.draw(i));
        }
        return result;
    }
    get selectedCards() {
        return this.cards.filter((c) => c.selected);
    }
    get currentlySelectedSum() {
        const selectedCards = this.selectedCards;
        return selectedCards
            .map((c) => c.value)
            .reduce((curr, next) => curr + next, 0);
    }
    getSelectedCount() {
        const selectedCount = this.cards.filter((c) => c.selected && !c.removed).length;
        return selectedCount;
    }
    getRowAndIndexes(card) {
        const rows = this.cardRows;
        const row = rows.find((r) => r.indexOf(card) >= 0);
        const indexInRow = row.indexOf(card);
        const rowIndex = rows.indexOf(row);
        return [row, rowIndex, indexInRow];
    }
}
exports.PinTable = PinTable;
//# sourceMappingURL=deck.js.map