interface FrameScore {
    score: number;
    stillToAdd: number;
    strike: boolean;
    spare: boolean;
}
export class Score {

    private frameScores: FrameScore[] = [];
    private _frameNumber = 1;
    private _currentBallStrike: number = 0;
    private _rollNumber = 1;
    private _currentScore?: FrameScore;

    public ballStrikes(howMany: number) {
        this._currentBallStrike += howMany;
    }

    public get totalScore(): number {
        return this.frameScores.map(s => s.score).reduce((a, b) => a + b, 0);
    }

    public get frame(): number {
        return this._frameNumber;

    }

    public get isGameOver() {
        return this.frame > 10 && this.frameScores.map(f => f.stillToAdd).filter(f => f > 0).length == 0;
    }

    public get isFirstRound(): boolean {
        return this._currentScore === undefined;
    }

    public ballOut(): boolean {
        this.frameScores.forEach(s => {
            if (s.stillToAdd) {
                s.score += this._currentBallStrike;
                s.stillToAdd--;
            }
        });
        const wasScoreNull = this._currentScore === undefined;
        if (!this._currentScore) {
            this._currentScore = {
                score: this._currentBallStrike,
                stillToAdd: 0,
                spare: false,
                strike: false
            };
            if (this.frameScores.length < 10) {
                this.frameScores.push(this._currentScore);
            }
        }
        else {
            this._currentScore.score += this._currentBallStrike;
        }
        const isFrameOver = !wasScoreNull || this._currentBallStrike == 10;
        if (isFrameOver) {
            this._frameNumber += 1;
            // this.frameScores.push(this._currentScore);
            if (this._currentBallStrike == 10) {
                this._currentScore.strike = true;
                this._currentScore.stillToAdd = 2;
            } else if (this._currentScore.score == 10) {
                this._currentScore.spare = true;
                this._currentScore.stillToAdd = 1;
            }
            this._currentScore = undefined;
        }
        this._currentBallStrike = 0;
        return isFrameOver;
    }
}