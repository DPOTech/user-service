import { User } from "src/domain/entities";
import { IService } from "./IService";

export interface IUserService extends IService<User> {
    findByUserName: (userName: string) => User;
}