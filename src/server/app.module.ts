import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 8998,
      username: 'postgres',
      password: 'password',
      database: 'db',
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
