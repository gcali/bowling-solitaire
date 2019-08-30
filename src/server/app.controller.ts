import { Controller, Get, Query } from '@nestjs/common';
import { HelloService } from './hello/hello.service';

@Controller()
export class AppController {
  constructor(private readonly helloService: HelloService) { }

  @Get()
  public getHello(): object {
    return this.helloService.getHello();
    // return baseMessage;
  }
}
