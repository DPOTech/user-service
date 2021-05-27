import { User } from "src/domain/entities";
import { IRepository } from "./repository.interface";

export interface IUserRepository extends IRepository<User> {
    signup: (entity: User) => Promise<User>;
    signin: (entity: User) => User;
    findByUserNameAsync: (userName: string) => Promise<User>;
}