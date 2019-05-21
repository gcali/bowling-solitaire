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
        return this.cards.splice(0, n);
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
        const pins = new Pile<T>(this.cards);
        const result: T[][] = [];
        for (let i = 4; i > 0; i--) {
            result.push(pins.draw(i));
        }
        return result;
    }

    constructor(private cards: T[] = []) {
        if (this.cards.length !== 10) {
            throw new Error('PinTable must have 10 cards');
        }
    }

    public select = (card: T) => {
        if (card.selected) {
            card.selected = false;
        } else {
            if (this.canSelect(card)) {
                card.selected = true;
            }
        }
    }

    private canSelect = (card: T) => {
        card = this.cards.find((c) => c.id === card.id)!;
        const selectedCount = this.cards.filter((c) => c.selected).length;
        if (selectedCount === 0) {
            return true;
        } else if (selectedCount >= 3) {
            return false;
        }
        const rows = this.cardRows;
        const row = rows.find((r) => r.indexOf(card) >= 0)!;
        const indexInRow = row.indexOf(card);
        const rowIndex = rows.indexOf(row);
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
