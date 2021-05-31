import { Inject, Injectable } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { Md5 } from "md5-typescript";
import { IUserRepository } from "src/data/repositories/interfaces";
import { User } from "src/domain/entities";
import { IUserService } from "../interfaces";
import { Service } from "./service";

@Injectable()
export class UserService extends Service<User> implements IUserService {
    constructor(@Inject('IUserRepository') public repository: IUserRepository) {
        super(repository);
    }

    signup = async (id: string, userName: string, password: string): Promise<User> => {
        var existedUser = await this.findByUserNameAsync(userName);
        if (existedUser)
            return existedUser;
        let user = { Id: id, UserName: userName, Password: password };
        let result = new User(user);
        return await this.repository.signup(result);
    }

    findByUserNameAsync = async (userName: string) => {
        return await this.repository.findByUserNameAsync(userName);
    };
}