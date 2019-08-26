import shufflerFactory from 'randomshuffle';
import { Card } from './card';

const shuffler = shufflerFactory();
export class Pile<T> {
    constructor(public cards: T[]) {
    }

    public shuffle(): void {
        this.cards = shuffler(this.cards);
    }

    public drawPile(n: number): Pile<T> {
        return new Pile<T>(this.draw(n));
    }

    public draw(n: number): T[] {
        const startIndex = Math.max(this.cards.length - n, 0);
        const result = this.cards.splice(startIndex, n);
        return result;
    }

    public applyTo(index: number, callback: ((e: T) => void)) {
        if (this.cards.length === 0) {
            return;
        }
        index = (this.cards.length + index) % this.cards.length;
        callback(this.cards[index]);
    }

    public filter(callback: ((card: T) => boolean)) {
        this.cards = this.cards.filter(callback);
    }

    public get length(): number {
        return this.cards.length;
    }
}

interface ICard {
    selected: boolean;
}

export class PinTable<T extends Card> {

    public get cardRows(): T[][] {
        const pins = new Pile<T>([...this.cards]);
        const result: T[][] = [];
        for (let i = 4; i > 0; i--) {
            result.push(pins.draw(i));
        }
        return result;
    }

    private get selectedCards(): T[] {
        return this.cards.filter((c) => c.selected);
    }

    public get currentlySelectedSum(): number {
        const selectedCards = this.selectedCards;
        return selectedCards
            .map((c) => c.value)
            .reduce((curr, next) => curr + next, 0);
    }

    constructor(private cards: T[]) {
        if (this.cards.length > 10) {
            throw new Error('PinTable must have at most 10 cards');
        }
        this.cards = this.cards.reverse();
    }

    public removeSelected = () => {
        let counter = 0;
        this.cards.forEach((c) => {
            if (c.selected) {
                counter++;
                c.removed = true;
                c.selected = false;
            }
        });
        return counter;
    }

    public canRemoveWith = (n: number) => {
        const expected = this.currentlySelectedSum;
        // const expected = this.cards.filter(c => c.selected).map(c => c.value).reduce((curr, next) => curr + next, 0);
        return expected > 0 && ((expected % 10) === (n % 10));
    }

    public select = (card: T, isFirstRound: boolean) => {
        if (card.selected) {
            card.selected = false;
            const selectedCards = this.cards.filter((c) => c.selected);
            selectedCards.forEach((c) => c.selected = false);
            if (this.canSelectMultiple(selectedCards, isFirstRound)) {
                selectedCards.forEach((c) => c.selected = true);
            }
        } else {
            if (this.canSelect(card, isFirstRound)) {
                card.selected = true;
            }
        }
    }

    public canSelectMultiple = (cards: T[], isFirstRound: boolean) => {
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
    }

    private getSelectedCount(): number {
        const selectedCount = this.cards.filter((c) => c.selected && !c.removed).length;
        return selectedCount;
    }

    private getRowAndIndexes(card: T): [T[], number, number] {
        const rows = this.cardRows;
        const row = rows.find((r) => r.indexOf(card) >= 0)!;
        const indexInRow = row.indexOf(card);
        const rowIndex = rows.indexOf(row);
        return [row, rowIndex, indexInRow];
    }

    // private canSelect = (card: T, isFirstRound: boolean) => {
    private canSelect = (card: T, isFirstRound: boolean) => {
        card = this.cards.find((c) => c.id === card.id)!;
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
        } else if (selectedCount >= 3) {
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
    }
}
