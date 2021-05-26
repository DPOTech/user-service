import { AggregateRoot } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString, IsDate, isNotEmpty, IsUppercase } from 'class-validator';
import { exception } from 'console';
import { Guid } from 'guid-typescript'
import { UserSignUpEvent } from '../events';
import { Md5 } from "md5-typescript";

export interface IUser {
    Id: string,
    UserName: string,
    Password: string,
    FirstName?: string,
    LastName?: string,
    Birthday?: Date,
    SignUp: (userName: string, password: string) => void;
}

export class User extends AggregateRoot implements IUser {
    public constructor(init?:Partial<User>) {
        super();
        Object.assign(this, init);
    }

    @IsNotEmpty()
    @IsString()
    Id: string;

    @IsNotEmpty()
    @IsString()
    UserName: string;

    @IsNotEmpty()
    @IsString()
    Password: string;

    @IsString()
    FirstName?: string;

    @IsString()
    LastName?: string;

    @IsDate()
    Birthday?: Date;

    SignUp = (userName: string, password: string) => {
        if (!userName)
            throw new exception("username can't be null.");
        if (!password)
            throw new exception("password can't be null.");
        let id = Guid.create().toString();
        let hashPassword = Md5.init(password);
        this.apply(new UserSignUpEvent(id, userName, hashPassword));
    };
}