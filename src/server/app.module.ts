import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [HelloModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
