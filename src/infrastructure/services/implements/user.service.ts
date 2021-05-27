import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/data/repositories/interfaces";
import { User } from "src/domain/entities";
import { IUserService } from "../interfaces";
import { Service } from "./service";

@Injectable()
export class UserService extends Service<User> implements IUserService {
    constructor(@Inject('IUserRepository') public repository: IUserRepository) {
        super(repository);
    }
    findByUserName = (userName: string): User => {
        return this.repository.findByUserName(userName);
    };
}