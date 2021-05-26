import { Injectable } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { IUser, User } from "src/domain/entities";
import { IUserRepository } from "../interfaces";
import { ApplicationRepository } from "./application.repository";


@Injectable()
export class UserRepository extends ApplicationRepository<User> implements IUserRepository {
    constructor() {
        super();
    }

    signup = (entity: User) => {
        return new User();
    };

    signin = (entity: User) => {
        return new User();
    };

    findByUserName = (userName: string) => {
        let user = {
            Id: Guid.create().toString(),
            UserName: userName,
            Password: 'abcde12345-',
        }
        return new User(user);
    };
}