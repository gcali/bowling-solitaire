import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    public getHello(): object {
        return {
            message: "I'm a very happy message"
        };
    }
}
