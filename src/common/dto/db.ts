import { Card } from '@common/models/card';
import { ScoreData } from '@common/models/score';

export class SerializedGameStatus {
    constructor(public pins: Card[], public stacks: Card[][], public score: ScoreData) {

    }
}