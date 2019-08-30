import { Card, suit } from '@common/models/card';
import { PinTable, Pile } from '@common/models/deck';
import { allSubsets } from '@common/utils/sequence';
import { Score } from '@common/models/score';

export class GameCore {

    public get frameScores() {
        return this._score.frameScores;
    }

    public get isFirstRoll(): boolean {
        return this._score.isFirstRound;
    }

    public get turnCounter(): number {
        return this._score.frame;
    }

    public get isGameOver() {
        return this._score.isGameOver;
    }
    public get totalScore() {
        return this._score.totalScore;
    }

    public get selectedSum(): number {
        return this.pinTable.currentlySelectedSum;
    }

    public static generateRandomly(): GameCore {
        const [pinTable, stacks] = this.getPinsAndStacks(this.drawRandomCards());
        const gameCore = new GameCore(pinTable, stacks);
        return gameCore;
    }

    private static drawRandomCards(): Pile<Card> {
        const baseSuits: suit[] = ['hearts', 'diamonds'];
        const unflattenedCards = baseSuits.map((s) =>
            new Array(10).fill(null).map((e, i) => new Card(s, i + 1, false)),
        );
        const cards: Card[] = [];
        unflattenedCards.forEach((cs) => cs.forEach((c) => cards.push(c)));
        const pile = new Pile<Card>(cards);
        pile.shuffle();
        return pile;
    }

    private static getPinsAndStacks(pile: Pile<Card>): [PinTable<Card>, Array<Pile<Card>>] {
        const pinTable = new PinTable<Card>(pile.draw(10));
        const draw = [5, 3, 2];
        const stacks = draw.map((d) => pile.draw(d));
        stacks.forEach((s) =>
            s.slice(0, -1).forEach((c) => {
                if (c) {
                    c.covered = true;
                }
            }),
        );

        return [pinTable, stacks.map((s) => new Pile<Card>(s))];
    }
    private _gameOverCallback: (() => void) | null = null;

    private _isFirstRound: boolean = true;
    private _score: Score = new Score();
    constructor(public pinTable: PinTable<Card>, public stacks: Array<Pile<Card>>) { }

    public setGameOverCallback(callback: (() => void)) {
        this._gameOverCallback = callback;
    }

    public suggestCard() {
        this.getAllSelectableCombinations();
    }

    public endBall() {
        const isFrameOver = this._score.ballOut();
        if (!isFrameOver) {
            this.removeTopFromStacks();
        } else {
            this.endTurn();
        }
        if (this.isGameOver && this._gameOverCallback) {
            this._gameOverCallback();
        }
        // this.removeTopFromStacks();
    }

    public select = (card: Card) => {
        return this.pinTable.select(card, this._isFirstRound);
    }

    public removeSelectedWith(card: Card) {
        const pile = this.stacks.filter((s) => s.cards.filter((c) => c.id === card.id).length > 0)[0];
        const indexOf = pile.cards.indexOf(card);
        if (indexOf < 0) {
            throw Error('Can\'t find card!');
        }
        if (this.pinTable.canRemoveWith(card.value)) {
            card.removed = true;
            card.selected = false;
            pile.draw(1);
            pile.applyTo(-1, (e) => e.covered = false);
            const removed = this.pinTable.removeSelected();
            this._isFirstRound = false;
            this._score.ballStrikes(removed);
        }
    }

    private getAllSelectableCombinations() {
        const cardSubsets = allSubsets(
            this.pinTable.cardRows
                .flatMap((e) => e)
                .filter((e) => !e.removed),
        )
            .filter((s) => s.length <= 3 && s.length >= 1);

        const pinTable = new PinTable<Card>(this.pinTable.cardRows.flatMap((e) => e));
        const values = cardSubsets
            .filter((s) => pinTable.canSelectMultiple(s, this._isFirstRound))
            .map((s) => [s, s.reduce((acc, curr) => acc + curr.value, 0)]);
        const possibleChoices = this.stacks
            .filter((s) => s.length > 0)
            .map((s) => s.cards.filter((c) => !c.covered)[0].value % 10);
    }

    private endTurn() {
        this.resetCards();
    }

    private resetCards() {
        const [pinTable, stacks] = GameCore.getPinsAndStacks(GameCore.drawRandomCards());
        this.pinTable = pinTable;
        this.stacks = stacks;
        // this._isFirstRound = true;
        this.getAllSelectableCombinations();
    }


    private removeTopFromStacks() {
        this.stacks.forEach((s) => {
            s.draw(1);
            s.applyTo(-1, (c) => c.covered = false);
        });
        this._isFirstRound = false;
    }
}
