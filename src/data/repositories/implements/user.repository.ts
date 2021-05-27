import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Guid } from "guid-typescript";
import { Model } from "mongoose";
import { IUser, User } from "src/domain/entities";
import { UserDocument } from "src/schemas";
import { IUserRepository } from "../interfaces";
import { Repository } from "./repository";


@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super();
    }

    signup = async (entity: User) => {
        return await this.userModel.create(entity);
    };

    signin = (entity: User) => {
        return new User();
    };

    findByUserName = async (userName: string) => {
        let user = { UserName: userName }
        return await this.userModel.findOne(user);
    };
}