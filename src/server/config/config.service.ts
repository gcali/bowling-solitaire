import fs from 'fs';
import dotenv, { DotenvConfigOptions, DotenvParseOptions, DotenvParseOutput } from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import { parseBoolean } from '@server/utils/parse';

@Injectable()
export class ConfigService {
    private readonly parsed: any;
    constructor(...paths: string[]) {
        let dotenvParsed: DotenvParseOutput = {};
        paths.forEach((path) => {
            try {
                const parsed = dotenv.parse(fs.readFileSync(path));
                Logger.log(parsed.DATABASE_HOST);
                dotenvParsed = { ...dotenvParsed, ...parsed };
            } catch (e) {
                Logger.warn('Could not load config ' + path);
            }
        });

        this.parsed = { ...dotenvParsed, ...(process.env || {}) };
    }

    public get dbHost(): string {
        return this.parsed.DATABASE_HOST as string;
    }

    public get dbPassword(): string {
        return this.parsed.DATABASE_PASSWORD as string;
    }

    public get dbPort(): number {
        return parseInt(this.parsed.DATABASE_PORT as string, 10);
    }

    public get dbUser(): string {
        return this.parsed.DATABASE_USER as string;
    }
    public get dbName(): string {
        return this.parsed.DATABASE_NAME as string;
    }
    public get dbSync(): boolean {
        return parseBoolean(this.parsed.DATABASE_SYNC as string, false);
    }
}
