import { Card, suit } from '@/models/card';
import { PinTable, Pile } from '@/models/deck';

export class GameCore {

    private isFirstRound: boolean = true;
    constructor(public pinTable: PinTable<Card>, public stacks: Pile<Card>[]) { }

    public static generateRandomly(): GameCore {
        const [pinTable, stacks] = this.getPinsAndStacks(this.drawRandomCards());
        const gameCore = new GameCore(pinTable, stacks);
        return gameCore;
    }

    private static drawRandomCards(): Pile<Card> {
        const baseSuits: suit[] = ["hearts", "diamonds"];
        const unflattenedCards = baseSuits.map(s =>
            new Array(10).fill(null).map((e, i) => new Card(s, i + 1, false))
        );
        const cards: Card[] = [];
        unflattenedCards.forEach(cs => cs.forEach(c => cards.push(c)));
        const pile = new Pile<Card>(cards);
        pile.shuffle();
        return pile;
    }

    private static getPinsAndStacks(pile: Pile<Card>): [PinTable<Card>, Pile<Card>[]] {
        const pinTable = new PinTable<Card>(pile.draw(10));
        const draw = [5, 3, 2];
        const stacks = draw.map(d => pile.draw(d));
        stacks.forEach(s =>
            s.slice(0, -1).forEach(c => {
                if (c) {
                    c.covered = true;
                }
            })
        );

        return [pinTable, stacks.map(s => new Pile<Card>(s))];
    }

    private acted() {

    }

    public suggestCard() {

    }

    private getAllSelectableCombinations() {
    }

    public resetCards() {
        const [pinTable, stacks] = GameCore.getPinsAndStacks(GameCore.drawRandomCards());
        this.pinTable = pinTable;
        this.stacks = stacks;
        this.isFirstRound = true;
    }

    public select = (card: Card) => {
        return this.pinTable.select(card, this.isFirstRound);
    }

    public removeTopFromStacks() {
        this.stacks.forEach(s => {
            s.draw(1);
            s.applyTo(-1, c => c.covered = false);
        });
    }

    public removeSelectedWith(card: Card) {
        const pile = this.stacks.filter(s => s.cards.filter(c => c.id === card.id).length > 0)[0];
        const indexOf = pile.cards.indexOf(card);
        if (indexOf < 0) {
            throw Error("Can't find card!");
        }
        if (this.pinTable.canRemoveWith(card.value)) {
            card.removed = true;
            card.selected = false;
            pile.draw(1);
            pile.applyTo(-1, e => e.covered = false);
            this.pinTable.removeSelected();
            this.isFirstRound = false;
        }
    }
}
