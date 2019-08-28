export interface FrameScore {
    prevScore: number;
    score: number;
    rollScores: RollScore[];
    stillToAdd: number;
}
declare type RollScore = number | 'X' | '/' | '-';
export declare class Score {
    frameScores: FrameScore[];
    private _frameNumber;
    private _currentBallStrike;
    private _currentScore?;
    ballStrikes(howMany: number): void;
    readonly totalScore: number;
    readonly frame: number;
    readonly isGameOver: boolean;
    readonly isFirstRound: boolean;
    ballOut(): boolean;
    private getFromScore;
}
export {};
