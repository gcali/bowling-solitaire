import { Card } from '@common/models/card';
import { PinTable, Pile } from '@common/models/deck';
export declare class GameCore {
    pinTable: PinTable<Card>;
    stacks: Array<Pile<Card>>;
    readonly frameScores: import("../models/score").FrameScore[];
    readonly isFirstRoll: boolean;
    readonly turnCounter: number;
    readonly isGameOver: boolean;
    readonly totalScore: number;
    readonly selectedSum: number;
    static generateRandomly(): GameCore;
    private static drawRandomCards;
    private static getPinsAndStacks;
    private _gameOverCallback;
    private _isFirstRound;
    private _score;
    constructor(pinTable: PinTable<Card>, stacks: Array<Pile<Card>>);
    setGameOverCallback(callback: (() => void)): void;
    suggestCard(): void;
    endBall(): void;
    select: (card: Card) => void;
    removeSelectedWith(card: Card): void;
    private getAllSelectableCombinations;
    private endTurn;
    private resetCards;
    private removeTopFromStacks;
}
