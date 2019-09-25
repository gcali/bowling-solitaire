export type suit = 'hearts' | 'spades' | 'clubs' | 'diamonds';

const suitMapper = {
    hearts: 0,
    spades: 20,
    clubs: 40,
    diamonds: 60,
};

export class Card {

    public get id() {
        return this.value - 1 + suitMapper[this.suit];
    }

    public removed: boolean = false;

    public selected: boolean = false;

    public isCentral: boolean = false;
    public isBackRow: boolean = false;
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public suit: suit, public value: number, public covered: boolean = true) {

    }

    public toggleCover() {
        this.covered = !this.covered;
    }
}
