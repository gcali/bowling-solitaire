import { Injectable, NotImplementedException } from '@nestjs/common';
import crypto from 'crypto';
import { ArgumentOutOfRangeError } from 'rxjs';

class Game {

    public isOver: boolean = false;
    public constructor(
        public id: string,
        public userName: string
    ) { }
}



const guidGenerator = () => crypto.randomBytes(30).toString('base64');

class GameDatabase {

    private readonly data: { [key: string]: Game } = {};
    public saveGame(game: Game) {
        this.data[game.id] = game;
    }

    public loadGame(id: string): Game {
        return this.data[id];
    }

    public searchGames(userName: string): Game[] {
        return Object.values(this.data).filter(game => game.userName === userName);
    }
}

@Injectable()
export class GameService {
    public close(id: string): void {
        const game = this._database.loadGame(id);
        if (!game) {
            throw new ArgumentOutOfRangeError();
        }
        game.isOver = true;
        this._database.saveGame(game);
    }
    public search(userName: string): object {
        return {
            ids: this._database.searchGames(userName).map(g => g.id)
        };
    }
    public getStatus(id: string): Game {
        return this._database.loadGame(id);
    }
    public createGame(userName: string): string {
        const newGame = new Game(guidGenerator(), userName);
        this._database.saveGame(newGame);
        return newGame.id;
    }

    private readonly _database: GameDatabase;
    public constructor() {
        this._database = new GameDatabase();
    }

}
