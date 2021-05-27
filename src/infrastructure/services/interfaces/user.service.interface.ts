import { User } from "src/domain/entities";
import { IService } from "./service.interface";

export interface IUserService extends IService<User> {
    findByUserName(userName: string): User;
}