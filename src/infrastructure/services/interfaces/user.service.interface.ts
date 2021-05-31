import { User } from "src/domain/entities";

export interface IUserService {
    findByUserNameAsync(userName: string): Promise<User>;
    signup(id: string, userName: string, password: string): Promise<User>;
}