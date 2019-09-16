export interface FrameScore {
    prevScore: number;
    score: number;
    rollScores: RollScore[];
    stillToAdd: number;
}
type RollScore = number | 'X' | '/' | '-';

export interface ScoreData {
    frameScores: FrameScore[];
    frame: number;
    currentBallStrike: number;
    currentScore?: FrameScore;
}

export class Score {

    public frameScores: FrameScore[] = [];
    private _frame = 1;
    private _currentBallStrike: number = 0;
    private _currentScore?: FrameScore;

    constructor(
        args?: ScoreData,
    ) {
        if (args) {
            this.frameScores = args.frameScores;
            this._frame = args.frame;
            this._currentBallStrike = args.currentBallStrike;
            this._currentScore = args.currentScore;
        }
    }

    public get frame() {
        return this._frame;
    }

    public getScoreData(): ScoreData {
        return {
            frameScores: this.frameScores,
            frame: this._frame,
            currentBallStrike: this._currentBallStrike,
            currentScore: this._currentScore,
        };
    }

    public ballStrikes(howMany: number) {
        this._currentBallStrike += howMany;
    }

    public get totalScore(): number {
        return this.frameScores.map((s) => s.score).reduce((a, b) => a + b, 0);
    }

    // public get frame(): number {
    //     return this._frameNumber;

    // }

    public get isGameOver() {
        return this._frame > 10 && this.frameScores.map((f) => f.stillToAdd).filter((f) => f > 0).length === 0;
    }

    public get isFirstRound(): boolean {
        return this._currentScore === undefined;
    }

    public ballOut(): boolean {
        this.frameScores.forEach((s) => {
            if (s.stillToAdd) {
                s.score += this._currentBallStrike;
                s.stillToAdd--;
            }
        });
        const wasScoreNull = this._currentScore === undefined;
        if (!this._currentScore) {
            this._currentScore = {
                prevScore: 0,
                score: this._currentBallStrike,
                stillToAdd: 0,
                rollScores: [],
            };
            if (this.frameScores.length < 10) {
                const prevScore = this.frameScores.map((f) => f.score).reduce((a, b) => a + b, 0);
                this._currentScore.prevScore = prevScore;
                this.frameScores.push(this._currentScore);
            }
        } else {
            this._currentScore.score += this._currentBallStrike;
        }
        const isFrameOver = !wasScoreNull || this._currentBallStrike === 10;
        if (isFrameOver) {
            this._frame += 1;
            if (this._currentBallStrike === 10) {
                this._currentScore.stillToAdd = 2;
                this._currentScore.rollScores.push('X');
            } else if (this._currentScore.score === 10) {
                this._currentScore.stillToAdd = 1;
                this._currentScore.rollScores.push('/');
            } else {
                this._currentScore.rollScores.push(this.getFromScore(this._currentBallStrike));
            }

            this._currentScore = undefined;
        } else {
            this._currentScore.rollScores.push(this.getFromScore(this._currentBallStrike));
        }
        this._currentBallStrike = 0;
        return isFrameOver;
    }

    private getFromScore(s: number): RollScore {
        if (s === 0) {
            return '-';
        } else {
            return s;
        }
    }
}
