import { Module } from '@nestjs/common';
import { UserService } from '@client/service/user';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
//   imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
