import { AggregateRoot } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { UserSignUpEvent } from '../events';
import { Prop, Schema } from '@nestjs/mongoose';

export interface IUser {
    Id: string,
    UserName: string,
    Password: string,
    FirstName?: string,
    LastName?: string,
    Birthday?: Date,
    signup: (id: string, userName: string, password: string) => void;
}

@Schema()
export class User extends AggregateRoot implements IUser {
    
    public constructor(init?:Partial<User>) {
        super();
        Object.assign(this, init);
    }

    @Prop()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    UserName: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    Password: string;

    @Prop()
    @IsString()
    FirstName?: string;

    @Prop()
    @IsString()
    LastName?: string;

    @Prop()
    @IsDate()
    Birthday?: Date;

    signup = (id: string, userName: string, password: string) => {
        this.apply(new UserSignUpEvent(id, userName, password));
    };
}