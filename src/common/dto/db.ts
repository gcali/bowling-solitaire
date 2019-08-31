import { Card } from '@common/models/card';

export class SerializedGameStatus {
    constructor(public pins: Card[], public stacks: Card[][]) {

    }
}