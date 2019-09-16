import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot(
      {
      host: 'localhost',
      type: 'postgres',
      port: 8998,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    },
    ),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
