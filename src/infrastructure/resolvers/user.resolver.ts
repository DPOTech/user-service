import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { User } from 'src/domain/entities';
import { MongoRepository } from 'typeorm';

@Resolver(of => User)
export class UsersResolver {
    constructor(@InjectRepository(User) private readonly repository: MongoRepository<User>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this.repository.find();
    }
}