import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Does it now?';
  }

  public getNew(): any {
    return {
      message: 'What happens if I return an obj?'
    };
  }
}
