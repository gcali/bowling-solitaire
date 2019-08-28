export declare type suit = 'hearts' | 'spades' | 'clubs' | 'diamonds';
export declare class Card {
    suit: suit;
    value: number;
    covered: boolean;
    removed: boolean;
    selected: boolean;
    constructor(suit: suit, value: number, covered?: boolean);
    readonly id: number;
    toggleCover(): void;
}
