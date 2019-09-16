import { GameCore } from '@common/models/game-core';
import { SerializedGameStatus } from '@common/dto/db';
import { PinTable, Pile } from '@common/models/deck';
import { Card } from '@common/models/card';
import { ScoreData, Score } from '@common/models/score';

export class Serializer {
    public serializeDbGameCore(core: GameCore): SerializedGameStatus {
        const status = new SerializedGameStatus(
            core.pinTable.flatCards,
            core.stacks.map((s) => s.cards),
            this.serializeScoreData(core.score),
        );
        return status;
    }

    public deserializedDbGameCore(status: SerializedGameStatus): GameCore {
        const core = new GameCore(
            new PinTable<Card>(status.pins),
            status.stacks.map((s) => new Pile<Card>(s)),
            this.deserializeScoreData(status.score),
        );
        return core;
    }

    public serializeScoreData(score: Score): ScoreData {
        const data = score.getScoreData();
        return data;
    }

    public deserializeScoreData(data: ScoreData): Score {
        const score = new Score(data);
        return score;
    }
}
