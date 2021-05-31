import { User } from "src/domain/entities";
import { IService } from "./service.interface";

export interface IUserService extends IService<User> {
    findByUserNameAsync(userName: string): Promise<User>;
    signup(id: string, userName: string, password: string): Promise<User>;
}