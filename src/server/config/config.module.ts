import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(
      `server.${process.env.NODE_ENV || 'development'}.env`,
      `server.${process.env.NODE_ENV || 'development'}.env.local`,
    ),
  }],
  exports: [ConfigService],
})
export class ConfigModule { }
