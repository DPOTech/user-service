import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/data/repositories/implements";
import { IUser, User } from "src/domain/entities";
import { IUserService } from "../interfaces";
import { ApplicationService } from "./application.service";

@Injectable()
export class UserService extends ApplicationService<User> implements IUserService {
    constructor(public repository: UserRepository) {
        super(repository);
    }
    findByUserName = (userName: string): User => {
        return this.repository.findByUserName(userName);
    };
}