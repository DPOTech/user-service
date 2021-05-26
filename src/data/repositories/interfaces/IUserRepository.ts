import { User } from "src/domain/entities";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<User> {
    signup: (entity: User) => User;
    signin: (entity: User) => User;
    findByUserName: (userName: string) => User;
}