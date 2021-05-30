import { AggregateRoot } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import { jsonEvent } from '@eventstore/db-client';
import { UserEventType } from 'src/infrastructure/eventstore/types/users';

export interface IUser {
    Id: string,
    UserName: string,
    Password: string,
    FirstName?: string,
    LastName?: string,
    Birthday?: Date,
    signup: (id: string, userName: string, password: string) => void;
    changeInformation: (id: string, userName: string, password: string) => void;
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
        let event = jsonEvent<UserEventType>({
            type: 'user-signup',
            data: {
                Id: id,
                UserName: userName,
                Password: password
            }
        })
        this.apply(event);
    };

    changeInformation = (id: string, userName: string, password: string) => {
        let event = jsonEvent<UserEventType>({
            type: 'user-change-infomation',
            data: {
                Id: id,
                UserName: userName,
                Password: password
            }
        })
        this.apply(event);
    };
}