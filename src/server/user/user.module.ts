import { Module } from '@nestjs/common';
import { UserService } from '@server/user/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  //   imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule { }
