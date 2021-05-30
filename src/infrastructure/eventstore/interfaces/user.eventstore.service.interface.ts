import { AppendResult, JSONEventData } from "@eventstore/db-client";
import { User } from "src/domain/entities";
import { UserEventType } from "../types/users";

export interface IUserEventStoreService{
    readStreamAsync(userName: string): Promise<User>;
    appendToStreamAsync(streamName: string, event: JSONEventData<UserEventType>): Promise<AppendResult>;
}