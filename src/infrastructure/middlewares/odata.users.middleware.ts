import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { odataQuery } from 'odata-v4-typeorm';
import { User } from 'src/domain/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OdataUsersMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) { }

    use(req: Request, res: Response, next: Function) {
        odataQuery(this.repository)(req, res, next);
    }
}