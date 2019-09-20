import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController, UserController],
})
export class AppModule { }
