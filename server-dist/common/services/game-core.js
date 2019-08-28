"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("@common/models/card");
const deck_1 = require("@common/models/deck");
const sequence_1 = require("@common/utils/sequence");
const score_1 = require("@common/models/score");
class GameCore {
    constructor(pinTable, stacks) {
        this.pinTable = pinTable;
        this.stacks = stacks;
        this._gameOverCallback = null;
        this._isFirstRound = true;
        this._score = new score_1.Score();
        this.select = (card) => {
            return this.pinTable.select(card, this._isFirstRound);
        };
    }
    get frameScores() {
        return this._score.frameScores;
    }
    get isFirstRoll() {
        return this._score.isFirstRound;
    }
    get turnCounter() {
        return this._score.frame;
    }
    get isGameOver() {
        return this._score.isGameOver;
    }
    get totalScore() {
        return this._score.totalScore;
    }
    get selectedSum() {
        return this.pinTable.currentlySelectedSum;
    }
    static generateRandomly() {
        const [pinTable, stacks] = this.getPinsAndStacks(this.drawRandomCards());
        const gameCore = new GameCore(pinTable, stacks);
        return gameCore;
    }
    static drawRandomCards() {
        const baseSuits = ['hearts', 'diamonds'];
        const unflattenedCards = baseSuits.map((s) => new Array(10).fill(null).map((e, i) => new card_1.Card(s, i + 1, false)));
        const cards = [];
        unflattenedCards.forEach((cs) => cs.forEach((c) => cards.push(c)));
        const pile = new deck_1.Pile(cards);
        pile.shuffle();
        return pile;
    }
    static getPinsAndStacks(pile) {
        const pinTable = new deck_1.PinTable(pile.draw(10));
        const draw = [5, 3, 2];
        const stacks = draw.map((d) => pile.draw(d));
        stacks.forEach((s) => s.slice(0, -1).forEach((c) => {
            if (c) {
                c.covered = true;
            }
        }));
        return [pinTable, stacks.map((s) => new deck_1.Pile(s))];
    }
    setGameOverCallback(callback) {
        this._gameOverCallback = callback;
    }
    suggestCard() {
        this.getAllSelectableCombinations();
    }
    endBall() {
        const isFrameOver = this._score.ballOut();
        if (!isFrameOver) {
            this.removeTopFromStacks();
        }
        else {
            this.endTurn();
        }
        if (this.isGameOver && this._gameOverCallback) {
            this._gameOverCallback();
        }
        // this.removeTopFromStacks();
    }
    removeSelectedWith(card) {
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
    getAllSelectableCombinations() {
        const cardSubsets = sequence_1.allSubsets(this.pinTable.cardRows
            .flatMap((e) => e)
            .filter((e) => !e.removed))
            .filter((s) => s.length <= 3 && s.length >= 1);
        const pinTable = new deck_1.PinTable(this.pinTable.cardRows.flatMap((e) => e));
        const values = cardSubsets
            .filter((s) => pinTable.canSelectMultiple(s, this._isFirstRound))
            .map((s) => [s, s.reduce((acc, curr) => acc + curr.value, 0)]);
        const possibleChoices = this.stacks
            .filter((s) => s.length > 0)
            .map((s) => s.cards.filter((c) => !c.covered)[0].value % 10);
    }
    endTurn() {
        this.resetCards();
    }
    resetCards() {
        const [pinTable, stacks] = GameCore.getPinsAndStacks(GameCore.drawRandomCards());
        this.pinTable = pinTable;
        this.stacks = stacks;
        // this._isFirstRound = true;
        this.getAllSelectableCombinations();
    }
    removeTopFromStacks() {
        this.stacks.forEach((s) => {
            s.draw(1);
            s.applyTo(-1, (c) => c.covered = false);
        });
        this._isFirstRound = false;
    }
}
exports.GameCore = GameCore;
//# sourceMappingURL=game-core.js.map