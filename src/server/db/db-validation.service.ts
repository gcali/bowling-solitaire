import { Injectable } from '@nestjs/common';

@Injectable()
export class DbValidationService {
    public isDuplicateException(error: any) {
        return error.code === '23505';
    }
}
