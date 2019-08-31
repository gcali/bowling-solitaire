import { GameCore } from '@common/models/game-core';
import { SerializedGameStatus } from '@common/dto/db';
import { PinTable, Pile } from '@common/models/deck';
import { Card } from '@common/models/card';

export class Serializer {
    public serializeDbGameCore(core: GameCore): SerializedGameStatus {
        const status = new SerializedGameStatus(core.pinTable.flatCards, core.stacks.map(s => s.cards));
        return status;
    }

    public deserializedDbGameCore(status: SerializedGameStatus): GameCore {
        const core = new GameCore(new PinTable<Card>(status.pins), status.stacks.map(s => new Pile<Card>(s)));
        return core;
    }
}