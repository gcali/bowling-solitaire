import { Module } from '@nestjs/common';
import { UserService } from '@server/user/user.service';
import { UserController } from './user.controller';
import { DbModule } from '@server/db/db.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [DbModule],
  //   imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule { }
