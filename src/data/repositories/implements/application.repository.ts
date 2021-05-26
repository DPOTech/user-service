import { Injectable } from "@nestjs/common";
import { IRepository } from "../interfaces";

@Injectable()
export class ApplicationRepository<T> implements IRepository<T>{
    constructor(){}

    create = (entity: T) => {
        return "created " + entity;
    };

    update = (entity: T) => {
        return "updated " + entity;
    };

    delete = (entity: T) => {
        return "deleted " + entity;
    };

}