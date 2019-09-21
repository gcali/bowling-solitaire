import { Module } from '@nestjs/common';
import { DbValidationService } from './db-validation.service';

@Module({
  providers: [DbValidationService],
  exports: [DbValidationService],
})
export class DbModule { }
