import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { GameService } from './game.service';

class NewGamePayload {
    readonly userName!: string;
}

class MoveIdentifier {
    readonly selectedCards!: number[];
    readonly ballCard!: number;
}

class Search {
    readonly userName!: string;
}

@Controller('game')
export class GameController {

    constructor(private readonly _gameService: GameService) {

    }
    @Post()
    public NewGame(@Body() payload: NewGamePayload): object {
        const id = this._gameService.createGame(payload.userName);
        return { id };
    }

    @Post(':id/select')
    public Move(@Param('id') id: string, @Body() payload: MoveIdentifier): object {
        return {
            id,
            payload
        };
    }

    @Post(':id/end-roll')
    public Roll(@Param('id') id: string): object {
        return {
            message: 'Roll done'
        };
    }

    @Delete(':id')
    public Quit(@Param('id') id: string) {
        this._gameService.close(id);
    }

    @Get()
    public Find(@Query() query: Search): object {
        return this._gameService.search(query.userName);
    }

    @Get(':id')
    public Status(@Param('id') id: string): object {
        return this._gameService.getStatus(id);
    }


}
