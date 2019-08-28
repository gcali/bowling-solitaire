"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Score {
    constructor() {
        this.frameScores = [];
        this._frameNumber = 1;
        this._currentBallStrike = 0;
    }
    ballStrikes(howMany) {
        this._currentBallStrike += howMany;
    }
    get totalScore() {
        return this.frameScores.map((s) => s.score).reduce((a, b) => a + b, 0);
    }
    get frame() {
        return this._frameNumber;
    }
    get isGameOver() {
        return this.frame > 10 && this.frameScores.map((f) => f.stillToAdd).filter((f) => f > 0).length === 0;
    }
    get isFirstRound() {
        return this._currentScore === undefined;
    }
    ballOut() {
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
        }
        else {
            this._currentScore.score += this._currentBallStrike;
        }
        const isFrameOver = !wasScoreNull || this._currentBallStrike === 10;
        if (isFrameOver) {
            this._frameNumber += 1;
            if (this._currentBallStrike === 10) {
                this._currentScore.stillToAdd = 2;
                this._currentScore.rollScores.push('X');
            }
            else if (this._currentScore.score === 10) {
                this._currentScore.stillToAdd = 1;
                this._currentScore.rollScores.push('/');
            }
            else {
                this._currentScore.rollScores.push(this.getFromScore(this._currentBallStrike));
            }
            this._currentScore = undefined;
        }
        else {
            this._currentScore.rollScores.push(this.getFromScore(this._currentBallStrike));
        }
        this._currentBallStrike = 0;
        return isFrameOver;
    }
    getFromScore(s) {
        if (s === 0) {
            return '-';
        }
        else {
            return s;
        }
    }
}
exports.Score = Score;
//# sourceMappingURL=score.js.map