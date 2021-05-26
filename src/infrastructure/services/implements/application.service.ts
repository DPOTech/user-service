import { IRepository } from "src/data/repositories/interfaces";
import { User } from "src/domain/entities";
import { IService } from "../interfaces";

export class ApplicationService<T> implements IService<T>{
    constructor(public repository: IRepository<T>) {

    }
}