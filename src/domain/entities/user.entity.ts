import { AggregateRoot } from '@nestjs/cqrs';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { jsonEvent } from '@eventstore/db-client';
import { UserEventType } from 'src/infrastructure/eventstore/types/users';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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

@Entity()
export class User extends AggregateRoot implements IUser {

    public constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }

    @ObjectIdColumn() id: ObjectID;

    @Column()
    @IsNotEmpty()
    @IsString()
    Id: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    UserName: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    Password: string;

    @Column()
    @IsString()
    FirstName?: string;

    @Column()
    @IsString()
    LastName?: string;

    @Column()
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