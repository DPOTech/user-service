import { EventStoreDBClient, JSONEventData } from "@eventstore/db-client";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities";
import { IUserEventStoreService } from "../interfaces";
import { UserEventType } from "../types/users";

@Injectable()
export class UserEventStoreService implements IUserEventStoreService {
    private readonly _client: EventStoreDBClient;

    constructor() {
        this._client = EventStoreDBClient.connectionString("esdb://admin:changeit@103.199.18.93:2113?tls=false");
    }

    readStreamAsync = async (userName: string) => {
        try {
            let streamName = 'user_' + userName;
            let events = await this._client.readStream<UserEventType>(streamName);
            let user = events.reduce<Partial<User>>((user, { event }) => {
                switch (event.type) {
                    case 'user-signup':
                        return {
                            ...user,
                            Id: event.data.Id,
                            UserName: event.data.UserName,
                            Password: event.data.Password
                        };
                    default:
                        return user;
                }
            }, {});
            return new User(user);
        } catch (error) {
            if (error.type === 'stream-not-found')
                return undefined;
            else
                throw error;
        }
    }

    appendToStreamAsync = async (streamName: string, event: JSONEventData<UserEventType>) => {
        try {
            return await this._client.appendToStream(streamName, event);
        } catch (error) {
            throw error;
        }
    }
}