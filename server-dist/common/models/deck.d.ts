import { Card } from './card';
export declare class Pile<T> {
    cards: T[];
    constructor(cards: T[]);
    shuffle(): void;
    drawPile(n: number): Pile<T>;
    draw(n: number): T[];
    applyTo(index: number, callback: ((e: T) => void)): void;
    filter(callback: ((card: T) => boolean)): void;
    readonly length: number;
}
export declare class PinTable<T extends Card> {
    private cards;
    readonly cardRows: T[][];
    private readonly selectedCards;
    readonly currentlySelectedSum: number;
    constructor(cards: T[]);
    removeSelected: () => number;
    canRemoveWith: (n: number) => boolean;
    select: (card: T, isFirstRound: boolean) => void;
    canSelectMultiple: (cards: T[], isFirstRound: boolean) => boolean;
    private getSelectedCount;
    private getRowAndIndexes;
    private canSelect;
}
