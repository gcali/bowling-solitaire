export type suit = 'hearts' | 'spades' | 'clubs' | 'diamonds';

const suitMapper = {
    hearts: 0,
    spades: 20,
    clubs: 40,
    diamonds: 60,
};

export class Card {

    public selected: boolean = false;
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public suit: suit, public value: number, public covered: boolean = true) {

    }

    public get id() {
        return this.value - 1 + suitMapper[this.suit];
    }

    public toggleCover() {
        this.covered = !this.covered;
    }
}
