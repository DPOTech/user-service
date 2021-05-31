import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/entities";
import { MongoRepository } from "typeorm";
import { IUserService } from "../interfaces";

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectRepository(User) private readonly repository: MongoRepository<User>) {
    }

    signup = async (id: string, userName: string, password: string): Promise<User> => {
        var existedUser = await this.findByUserNameAsync(userName);
        if (existedUser)
            return existedUser;
        let user = { Id: id, UserName: userName, Password: password };
        let result = new User(user);
        return await this.repository.save(result);
    }

    findByUserNameAsync = async (userName: string) => {
        let query = { UserName: userName };
        return await this.repository.findOne(query);
    };
}